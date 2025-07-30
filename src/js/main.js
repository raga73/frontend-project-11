// Import our custom CSS
import '../scss/styles.scss';
import _ from 'lodash';
import watcher from './utils/view.js';
import validator from './utils/validator.js';
import parser from './utils/parser.js';
import axios from 'axios';

export default (i18nInstance) => {
  
  const state = {
    urls: [],
    feeds: [],
    currentFeedId: '',
    error: '',
    linkStatus: '',
    modalWindowStatus: '',
    posts: [],
    viewedPostsId: new Set(),
    clickedPostId: '',
  };

  const form = document.querySelector('form');
  const button = document.querySelector('button');
  const posts = document.querySelector('.posts');

  const loader = (url, state) => {
    state.linkStatus = 'loading';
    axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
      .then(response => {
        const data = parser(response);
        if (data === 'notARSS') {
                      state.error = 'notARSS';
      state.linkStatus = 'failed';
        } else {
        const { feed, posts } = data;
        feed.id = _.uniqueId();
        feed.link = url;
        state.feeds.push(feed);
        state.posts = posts.map((post) => {
         return { ...post, 
            id: _.uniqueId(), 
            feedId: feed.id,
          }
        }
        )
        state.currentFeedId = feed.id;
         watchedState.linkStatus = 'successed';
      }
      })
      .catch(() => {
        state.linkStatus = 'failed';
        state.error = 'networkError';
      })
  };

  const refresh = (state) => {
    state.feeds.map(({id, link}) => {
      axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${link}`)
        .then(response => {
          const data = parser(response);
          const { posts } = data;
          const oldPostsTitles = state.posts
            .filter((post) => post.feedId === id)
            .map((post) => post.title);
          const newPosts = posts
            .filter((post) => !oldPostsTitles.includes(post.title))
            .reverse();
          newPosts.map((post) => {
            state.posts = [{ ...post, 
            id: _.uniqueId(), 
            feedId: id,
            }, ...state.posts]
          });
          state.linkStatus = 'update';
          setTimeout(() => {
            state.linkStatus = '';
            refresh(state)
          }, 5000);
        })
      });
  };
  
  const watchedState = watcher(state, form, button, i18nInstance);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    validator(url, watchedState.urls)
      .then((error) => {
        if (error) {
          watchedState.error = error;
        }
        else {
        watchedState.urls = [...watchedState.urls, url];
        loader(url,watchedState);
        setTimeout(() => {
          refresh(watchedState)
        }, 5000);
       }
      }
      )
      })

  posts.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-sm')) {
      watchedState.clickedPostId = e.target.getAttribute("data-id");
      watchedState.viewedPostsId.add(e.target.getAttribute("data-id"));
      watchedState.modalWindowStatus = 'open';
        }
  })
        document.addEventListener('click', (e) => {
         if (e.target.classList.contains('fade')
          || e.target.classList.contains('btn-close')
          || e.target.classList.contains('btn-secondary') ) {
             watchedState.modalWindowStatus = 'close';
        watchedState.clickedPostId = '';
         }
      })
    state.error = '';
};
// Import our custom CSS
import _ from 'lodash';
import '../scss/styles.scss';
import watcher from './utils/view.js';
import validator from './utils/validator.js';
import axios from 'axios';


export default (i18nInstance) => {
  
  const state = {
    feedsList: {},
    currentFeedId: '',
    error: '',
    linkStatus: '',
    posts: {},
  };

  const form = document.querySelector('form');
  const button = document.querySelector('button');

  const watchedState = watcher(state, form, button, i18nInstance);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    validator(url, watchedState.feedsList)
      .then((error) => {
        if (error) {
          watchedState.error = error;
        } else {
          watchedState.linkStatus = 'loading';
        axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
          .then(response => {
            //console.log(response)
            const parser = new DOMParser();
            const xmlString = response.data.contents;
            const doc = parser.parseFromString(xmlString, "application/xml");
            const errorNode = doc.querySelector("parsererror");
            if (errorNode) {
              watchedState.linkStatus = 'failed';
              watchedState.error = 'notARSS';
            } else {

              const feedId = _.uniqueId();
            
              watchedState.feedsList[url] = {
                id: feedId,
                title: doc.querySelector('title'),
                feedDescription: doc.querySelector('description'),
              };
                
       watchedState.posts = Array.from(doc.querySelectorAll('item')).map((item) => {
        return {
          feedId,
          title: item.querySelector('title'),
          link: item.querySelector('link'),
          description: item.querySelector('description'),
          id: _.uniqueId(),}
      },)
           watchedState.currentFeedId = feedId;
                 watchedState.linkStatus = 'successed';
            }
    })
    .catch(() => {
      watchedState.linkStatus = 'failed';
      watchedState.error = 'networkError';
    })
        }
      })
    state.error = '';
  });
}


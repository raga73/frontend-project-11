import onChange from 'on-change';

const render = (path, value, state, form, button, instance) => {
  const feedBack = document.querySelector('.feedback');
  const input = form.querySelector('input');
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');
  const feedsDiv = document.createElement('div');
  const postsDiv = document.createElement('div');

  feedsDiv.classList.add('card', 'border-0');
  feedsDiv.innerHTML = `<div class="card-body">\n
    <h2 class="card-title h4">Фиды</h2></div>`;
  postsDiv.classList.add('card', 'border-0');
  postsDiv.innerHTML = `<div class="card-body">\n
    <h2 class="card-title h4">Посты</h2></div>`;
  feedBack.textContent = '';

  switch (path) {
    case 'error':
      feedBack.textContent = instance.t(`errors.${state.error}`);
      input.classList.add('is-invalid');
      break;
    case 'linkStatus':
      switch (value) {
        case 'loading':
          button.classList.add('disabled');
          break;
        case 'failed':
          button.classList.remove('disabled');
          break;
        case 'successed': {
          feeds.textContent = '';
          posts.textContent = '';
          input.classList.remove('is-invalid');
          button.classList.remove('disabled');
          const feedsList = document.createElement('ul');
          feedsList.classList.add('list-group', 'border-0', 'rounded-0');
          const postsList = document.createElement('ul');
          postsList.classList.add('list-group', 'border-0', 'rounded-0');

          Object.values(state.feedsList).map((link) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'border-0', 'border-end-0');
            li.innerHTML = `<h3 class="h6 m-0">${link.title.textContent}</h3>\n
            <p class="m-0 small text-black-50">${link.feedDescription.textContent}\n</p>\n`;
            feedsList.prepend(li);
          });
          console.log(state.posts)
          Object.values(state.posts)
            .filter((post) => post.feedId === state.currentFeedId)
            .map((post) => {
              const li = document.createElement('li');
              li.classList.add('list-group-item',
                               'd-flex',
                               'justify-content-between',
                               'align-items-start',
                               'border-0',
                               'border-end-0');
              li.innerHTML = `<a href="${post.link.textContent}" class="fw-bold"
                data-id="${post.id}" target="_blank" rel="noopener noreferrer">${post.title.textContent}</a>`;
              postsList.append(li);
          });
   
          feedsDiv.append(feedsList);
          feeds.append(feedsDiv);
          postsDiv.append(postsList);
          posts.append(postsDiv);
          input.focus();
          form.reset();
          break; 
        }
      }
      break;
    }
};

export default (state, form, button, instance) => {
  return onChange(state, (path, value) => {
      render(path, value, state, form, button, instance)
  });
};


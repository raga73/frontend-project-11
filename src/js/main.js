// Import our custom CSS
import '../scss/styles.scss';
import watcher from './utils/view.js';
import validator from './utils/validator.js';
import pageRender from './utils/pageRender.js';

export default (i18nInstance) => {
  pageRender(i18nInstance);
  
  const state = {
    feedsList: [],
    error: '',
  };

  const form = document.querySelector('form');

  const watchedState = watcher(state, form, i18nInstance);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validator(url, watchedState, i18nInstance);
    state.error = '';
  });
}


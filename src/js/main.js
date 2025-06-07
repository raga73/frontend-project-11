// Import our custom CSS
import '../scss/styles.scss'
import view from './utils/view.js'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

const state = {
    formStatus: '',
    userUrl: '',
    feedsList: [],
    errors: [],
};

const form = document.querySelector('form');
const feedBack = document.querySelector('.feedback');
const input = form.querySelector('input');

input.addEventListener('input', (e) => {
  state.userUrl = e.target.value
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  view(state,feedBack,input);
  form.reset();
  input.focus();
  state.formStatus = '';
  state.errors = [];
});


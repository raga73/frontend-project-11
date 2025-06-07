import * as yup from 'yup';
import onChange from 'on-change';

export default (state, feedBack, input) => {
  
  const render = () => {
  feedBack.textContent = '';
  if (state.errors.length !== 0) {
    feedBack.textContent = state.errors
    input.classList.add('is-invalid')
  } else {
    input.classList.remove('is-invalid')
  }
};

const watchedState = onChange(state, () => render());

const validateForm = () => {
    const userSchema = yup.string()
      .required()
      .url('Ссылка должна быть валидным URL')
      .matches(/(\.rss|\.xml)/, 'Ресурс не содержит валидный RSS')
      .notOneOf(state.feedsList, 'RSS уже существует');
    userSchema.validate(state.userUrl)
      .then(validUrl => {
        watchedState.feedsList = [...watchedState.feedsList, validUrl];
      })
      .catch(e => {
        [watchedState.errors] = e.errors;
      })
};
validateForm();
};


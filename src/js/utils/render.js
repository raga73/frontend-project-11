  export default (feedBack, state, input) => {
  feedBack.textContent = '';
  if (state.errors.length !== 0) {
    feedBack.textContent = state.errors;
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid')
  }
};
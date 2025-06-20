import onChange from 'on-change';

const urlFieldRender = (path, value, state, form, instance) => {
  const feedBack = document.querySelector('.feedback');
  const input = form.querySelector('input');
  feedBack.textContent = '';
  if (path === 'error') {
    feedBack.textContent = instance.t(`errors.${state.error}`);
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
    input.focus();
    form.reset();
  }
};

export default (state, form, instance) => {
  return onChange(state, (path, value) => {
      urlFieldRender(path, value, state, form, instance)
  });
};


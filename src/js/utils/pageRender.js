export default (instanse) => {
  const header = document.querySelector('h1');
  const description = document.querySelector('.lead');
  const label = document.querySelector('label');
  const addButton = document.querySelector('[area-label=add]');
  header.textContent = instanse.t('header');
  description.textContent = instanse.t('description');
  label.textContent = instanse.t('label');
  addButton.textContent = instanse.t('buttons.addButton');
}  
  
  

/* eslint-disable */

const getCategories = async () => {
  const url = '/v1/categories';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const createCategoryDropdown = async () => {
  const categories = await getCategories();

  const categorySelect = document.getElementById('category');
  categories.results.map((category) => categorySelect.options.add(new Option(category.title, category.id)));
};
  

const addColorInput = () => {
  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group');

  const formField = `<input class="form-control" name="colors" placeholder="Color" type="color" />`;
  formGroup.innerHTML = formField;
  const colorContainer = document.getElementById('color-container');

  colorContainer.parentNode.insertBefore(formGroup, colorContainer.nextSibling);
};

const submitForm = () => {
  const form = document.querySelector('form');
  const data = Object.fromEntries(new FormData(form).entries());

  return false;
};

const init = () => {
  createCategoryDropdown();
};

init();

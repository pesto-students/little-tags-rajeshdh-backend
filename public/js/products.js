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

const addColorInput = (index) => {
  const currentIndex = index + 1;
  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group');

  const formField = `<div class="input-group input-group-alternative mb-3" >
    <input class="form-control" name="color[${currentIndex}]" placeholder="Color" type="color" />
    <input type="button" value="Add" onclick="addColorInput(${currentIndex})"/>
  </div>`;
  formGroup.innerHTML = formField;
  const colorContainer = document.getElementById('color-container');

  colorContainer.parentNode.insertBefore(formGroup, colorContainer.nextSibling);
};

const init = () => {
  createCategoryDropdown();
};

init();

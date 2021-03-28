const { categoryService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const pick = require('../../utils/pick');

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategories(filter, options);
  res.render('category/index', result);
});

const createCategory = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategories(filter, options);
  const category = await categoryService.createCategory(req.body);
  const data = {};
  if (category) {
    data.error = false;
    data.message = 'Category Created';
  } else {
    data.error = true;
    data.message = 'An error occurred';
  }
  res.render('category/index', { ...data, ...result });
});

const updateCategory = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategories(filter, options);
  const category = await categoryService.updateCategoryById(req.params.id, req.body)
  const data = {};
  if (category) {
    data.error = false;
    data.message = 'Category Updated';
  } else {
    data.error = true;
    data.message = 'An error occurred';
  }

  res.render('category/index', { ...data, ...result });
});

const getCategoryCount = () => categoryService.getCategoryCount();

module.exports = {
  getCategoryCount,
  getCategories,
  createCategory,
  updateCategory,
};

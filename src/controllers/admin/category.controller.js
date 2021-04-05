const queryString = require('querystring');

const { categoryService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const pick = require('../../utils/pick');

const categoryDetails = (req) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  return categoryService.queryCategories(filter, options);
};

const getCategories = catchAsync(async (req, res) => {
  const result = await categoryDetails(req);
  const queries = { ...req.query };
  res.render('category/index', { ...result, ...queries });
});

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  let query = '';
  console.log(category);
  if (category) {
    query = queryString.stringify({
      error: false,
      message: 'Category Created',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/category?${query}`);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.id, req.body);
  let query = '';
  if (category) {
    query = queryString.stringify({
      error: false,
      message: 'Category Updated',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/category?${query}`);
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await categoryService.deleteCategoryById(req.params.id);
  let query = '';
  if (category) {
    query = queryString.stringify({
      error: false,
      message: 'Category Deleted',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/category?${query}`);
});

const getCategoryCount = () => categoryService.getCategoryCount();

module.exports = {
  getCategoryCount,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

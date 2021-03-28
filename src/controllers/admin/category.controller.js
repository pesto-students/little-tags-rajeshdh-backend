const { categoryService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const pick = require('../../utils/pick');

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategories(filter, options);
  res.render('category/index', result);
});

const getCategoryCount = () => categoryService.getCategoryCount();

module.exports = {
  getCategoryCount,
  getCategories,
};

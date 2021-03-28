const { categoryService } = require('../services');

const getCategoryCount = () => categoryService.getCategoryCount();

module.exports = {
  getCategoryCount,
};

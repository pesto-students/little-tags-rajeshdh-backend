const { Category } = require('../models');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<category>}
 */
const createCategory = async (categoryBody) => {
  if (await Category.isCategoryTaken(categoryBody.name)) {
    return false;
  }
  return Category.create(categoryBody);
};

/**
 * Query for categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = (filter, options) => {
  return Category.paginate(filter, options);
};

const getCategoryCount = () => Category.estimatedDocumentCount();

module.exports = {
  getCategoryCount,
  queryCategories,
  createCategory,
};

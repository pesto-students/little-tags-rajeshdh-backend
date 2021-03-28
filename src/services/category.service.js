const { Category } = require('../models');

const getCategoryCount = () => Category.estimatedDocumentCount();
/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Product>}
 */
const createCategory = async (categoryBody) => {
  const category = await Category.create(categoryBody);
  return category;
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
const queryCategories = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

module.exports = {
  getCategoryCount,
  queryCategories,
  createCategory,
};

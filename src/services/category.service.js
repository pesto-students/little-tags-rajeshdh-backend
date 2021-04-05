const { Category } = require('../models');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<category>}
 */
const createCategory = async (categoryBody) => {
  if (await Category.isCategoryTaken(categoryBody.title)) {
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

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = (id) => {
  return Category.findById(id);
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    return false;
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete product by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Product>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    return false;
  }
  await category.remove();
  return category;
};

const getCategoryCount = () => Category.estimatedDocumentCount();

module.exports = {
  getCategoryCount,
  queryCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};

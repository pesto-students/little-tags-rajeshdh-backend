const { Category } = require('../models');

const getCategoryCount = () => Category.estimatedDocumentCount();

module.exports = {
  getCategoryCount,
};

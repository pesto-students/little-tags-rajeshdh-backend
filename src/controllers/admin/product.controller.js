const queryString = require('querystring');

const { productService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const pick = require('../../utils/pick');

const productDetails = (req) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  return productService.queryProducts(filter, options);
};

const getProducts = catchAsync(async (req, res) => {
  const result = await productDetails(req);
  const queries = { ...req.query };
  res.render('products/index', { ...result, ...queries });
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  let query = '';
  if (product) {
    query = queryString.stringify({
      error: false,
      message: 'Product Created',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/products?${query}`);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.id, req.body);
  let query = '';
  if (product) {
    query = queryString.stringify({
      error: false,
      message: 'Product Updated',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/products?${query}`);
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProductById(req.params.id);
  let query = '';
  if (product) {
    query = queryString.stringify({
      error: false,
      message: 'Product Deleted',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/products?${query}`);
});

const getProductCount = () => productService.getProductCount();

module.exports = {
  getProductCount,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

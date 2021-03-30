const queryString = require('querystring');

const { imageService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const pick = require('../../utils/pick');

const imageDetails = (req) => {
  const filter = pick(req.query, ['title', 'brand']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  return imageService.queryImages(filter, options);
};

const getImages = catchAsync(async (req, res) => {
  const result = await imageDetails(req);

  const queries = { ...req.query };
  res.render('images/index', { ...result, ...queries });
});

const createImage = catchAsync(async (req, res) => {
  const image = await imageService.createImage(req.body);
  let query = '';
  if (image) {
    query = queryString.stringify({
      error: false,
      message: 'Image Created',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/images?${query}`);
});

const updateImage = catchAsync(async (req, res) => {
  const image = await imageService.updateImageById(req.params.id, req.body);
  let query = '';
  if (image) {
    query = queryString.stringify({
      error: false,
      message: 'Image Updated',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/images?${query}`);
});

const deleteImage = catchAsync(async (req, res) => {
  const image = await imageService.deleteImageById(req.params.id);
  let query = '';
  if (image) {
    query = queryString.stringify({
      error: false,
      message: 'Image Deleted',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/images?${query}`);
});

const getImageCount = () => imageService.getImageCount();

module.exports = {
  getImageCount,
  getImages,
  createImage,
  updateImage,
  deleteImage,
};

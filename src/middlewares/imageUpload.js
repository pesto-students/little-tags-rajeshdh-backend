const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'product-images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    // TODO: add transformations
    //   transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const uploadImage = multer({ storage: imageStorage }).single('image');

const deleteImage = async (publicId) => await cloudinary.uploader.destroy(publicId);

module.exports = { uploadImage, deleteImage };

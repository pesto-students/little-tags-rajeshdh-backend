const express = require('express');

const { getImages, createImage, updateImage, deleteImage } = require('../../controllers/admin/image.controller');
const { getImageById } = require('../../services/image.service');

const router = express.Router();

router.get('/', getImages);

router.get('/create', (req, res) => {
  res.render('images/create');
});

router.post('/create', createImage);

router.get('/update/:id', async (req, res) => {
  const image = await getImageById(req.params.id);
  res.render('images/update', image);
});

router.post('/update/:id', updateImage);

router.post('/delete/:id', deleteImage);

module.exports = router;

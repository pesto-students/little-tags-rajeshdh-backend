const express = require('express');

const { getCategories, createCategory, updateCategory } = require('../../controllers/admin/category.controller');
const { getCategoryById } = require('../../services/category.service');

const router = express.Router();

router.get('', getCategories);

router.get('/create', (req, res) => {
  res.render('category/form');
});

router.post('/create', createCategory);

router.get('/update/:id', async (req, res) => {
  const category = await getCategoryById(req.params.id);
  res.render('category/form', category);
});

router.post('/update/:id', updateCategory)


module.exports = router;

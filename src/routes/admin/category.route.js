const express = require('express');

const { getCategories, createCategory } = require('../../controllers/admin/category.controller');

const router = express.Router();

router.get('', getCategories);

router.get('/create', (req, res) => {
  res.render('category/form');
});

router.post('/create', createCategory);

module.exports = router;

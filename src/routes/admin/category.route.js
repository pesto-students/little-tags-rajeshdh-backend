const express = require('express');

const { getCategories } = require('../../controllers/admin/category.controller');

const router = express.Router();

router.get('', getCategories);

module.exports = router;

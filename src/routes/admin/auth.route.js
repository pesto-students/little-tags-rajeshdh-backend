const express = require('express');
const router = express.Router();

const { login } = require('../../controllers/admin/auth.controller');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', login);
module.exports = router;
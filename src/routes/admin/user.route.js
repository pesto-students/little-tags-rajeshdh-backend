const express = require('express');

const router = express.Router();

router.get('', (req, res) => {
  res.render('users/index');
});

// router.post('/login', login);
module.exports = router;

var express = require('express');
var router = express.Router();


router.get('/__test', function(req, res, next) {
  res.send("Hello World")
});

module.exports = router;

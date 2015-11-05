var express = require('express');
var router = express.Router();
var spotify = require('./spotify');

router.use('/spotify', spotify);

module.exports = router;
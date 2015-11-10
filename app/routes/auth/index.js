var express = require('express');
var router = express.Router();
var spotify = require('./spotify');
var google = require('./google');

router.use('/spotify', spotify);
router.use('/google', google);

module.exports = router;

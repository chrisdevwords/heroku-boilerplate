var express = require('express');
var router = express.Router();
var path = require('path');
var spotify = require('./spotify');
var youtube = require('./youtube');
var mixtape = require('./mixtape');

var DATA_DIR = path.join(__dirname, '../../../', 'data');

router.use('/spotify', spotify);
router.use('/youtube', youtube);
router.use('/mixtape', mixtape);

router.get('*', function(req, res) {
    res.sendfile(path.join(DATA_DIR, req.url));
});

module.exports = router;
'use strict';

var express = require('express');
var router = express.Router();
var YouTube = require('youtube-node');
var model = require('../../model');
var conf = model.getConf('youtube');
var youtube = new YouTube();

youtube.setKey(conf.key);
youtube.addParam('type', 'video');
youtube.addParam('videoEmbeddable', 'true');

router.get('/', function (req, res) {
    var q = req.param('q') || '';
    var count = Number(req.param('count')) || 10;
    youtube.search(q, count, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;

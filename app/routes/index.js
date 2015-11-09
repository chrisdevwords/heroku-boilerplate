'use strict';

var express = require('express');
var router = express.Router();
var model = require('../model');
var auth = require('./auth');
var api = require('./api');
var _ = require('underscore');

router.get('/', function(req, res) {

    var spotifyData = JSON.parse(req.cookies.spotify || null);

    model.loadStaticData()
        .done(function(data){
            data.spotify = spotifyData ? {
                id: spotifyData.id,
                name: spotifyData.name
            } : null;
            if (data.spotify) {
                res.render('app', {data:data});
            } else {
                res.render('login', {data: data});
            }
        })
        .fail(function(error){
            res.render('error', {
                message : error.message,
                error : error
        });
    })
});

router.use('/auth', auth);
router.use('/api', api);

module.exports = router;

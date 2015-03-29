'use strict';

var express = require('express');
var router = express.Router();
var model = require('../model');

router.get('/', function(req, res){
    model.loadStaticData()
        .done(function(data){
            res.render('index', data);
        })
        .fail(function(error){
            res.render('error', {
                message : error.message,
                error : error
        });
    })
});

module.exports = router;
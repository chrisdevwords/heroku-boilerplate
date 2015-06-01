'use strict';

var express = require('express');
var logger = require('morgan');
var cookies = require('cookie-parser');
var body    = require('body-parser');
var favicon = require('serve-favicon');
var auth = require('http-auth');
var swig = require('swig');
var path = require('path');
var routes = require('./app/routes')
var api = require('./app/routes/api');
var app = express();

// set views to render with swig
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', path.join(__dirname, 'app', 'views'));

// set up logging
app.use(logger('dev'));

// json parsing
app.use(body.json());
app.use(body.urlencoded({extended : false}));

// cookies
app.use(cookies());

//basic auth
app.use(
    auth.connect(auth.basic({
        realm: 'PSI Auth Testing',
        file: path.join(__dirname , 'data/users.htpasswd')
    })
));

// routes
app.use('/api', api);
app.use('/', routes);

// static assets
app.use(favicon(path.join(__dirname , 'public/img/favicon.ico')));
app.use('/', express.static(path.join(__dirname , 'public')));
app.use('/', express.static(path.join(__dirname , 'public/bower_components/')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handling server errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message : err.message,
        error : err
    });
});

module.exports = app;

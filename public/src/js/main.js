"use strict";

var root = window || global;
var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = root.jQuery = root.$ = $;

var AppView = require('./view/AppView');
var app = {};

$(function () {
    app.view = new AppView({SV: root.__SERVER_VARS});
    window.app = app;
});

module.exports = app;

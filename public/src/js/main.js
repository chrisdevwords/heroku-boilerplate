"use strict";

var root = window || global;
var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = root.jQuery = root.$ = $;

var AppView = require('./view/AppView');
var app = {};

$(function () {
    var SV = root.__SERVER_VARS;
    if (SV.spotify && SV.spotify.id) {
        app.view = new AppView({
            SV: SV
        })
    }
    window.app = app;
});

module.exports = app;

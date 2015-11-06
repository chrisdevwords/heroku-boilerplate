'use strict';

var fs = require('fs');
var path = require('path');
var $ = require('jquery-deferred');

var DATA_DIR = path.join(__dirname, '../../', 'data');
var conf;
/**
 * module for loading site data either from static JSON, databases or 3rd party services
 * @type {{loadJSON: Function, loadStaticData: Function}}
 */
module.exports = {

    /**
     * loads a json file from /data directory
     * @param {string} file
     * @returns {jquery-deferred} promise resolves with parsed data, rejects with error
     */
    loadJSON : function (file) {
        var def = $.Deferred();
        var cb = function(err, data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(JSON.parse(data));
            }
        };
        fs.readFile(path.join(DATA_DIR, file), cb);
        return def.promise();
    },

    /**
     * loads base static json for bootstrapping or parsing in the swig template
     * @returns {jquery-deferred} promise resolves with parsed data, rejects with error
     */
    loadStaticData : function () {

        var def = $.Deferred();
        var $meta = this.loadJSON('meta.json');
        var $nav = this.loadJSON('nav.json');

        $.when($meta, $nav).done(function (meta, nav){
            def.resolve({
                meta : meta,
                nav : nav
            });
        }).fail(function(err){
            def.reject(err);
        });

        return def.promise();

    },

    getConf : function (key) {
        if (!conf) {
            conf = {};
            conf.spotify = {
                stateKey: process.env['SPOTIFY_STATE_KEY'],
                clientId: process.env['SPOTIFY_CLIENT_ID'],
                clientSecret: process.env['SPOTIFY_CLIENT_SECRET'],
                redirectUri: process.env['SPOTIFY_REDIRECT_URI']
            };
            conf.youtube = {
                key: process.env['YOUTUBE_KEY']
            };
        }
        return key ? conf[key] : conf;
    }
};

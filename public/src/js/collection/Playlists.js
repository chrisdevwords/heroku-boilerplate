

var Backbone = require('backbone');
var Playlist = require('../model/Playlist');

var Playlists =  Backbone.Collection.extend({

    model: Playlist,

    initialize: function(models, options) {
        this.userId = options.userId;
    },

    parse: function (data) {
        return data.items;
    },

    url: function () {
        return "/api/spotify/" + this.userId + "/playlists";
    }

});

module.exports = Playlists;

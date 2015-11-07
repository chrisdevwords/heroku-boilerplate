

var Backbone = require('backbone');
var Playlist = require('../model/Playlist');

var Playlists =  Backbone.Collection.extend({

    model: Playlist,

    initialize: function(models, options) {
        this.userId = options.userId;
    },

    parse: function (data) {
        this.next = data.next ? data.next.split('?').pop() : null;
        return data.items;
    },

    url: function () {
        var qs = this.next ? "?" + this.next : '';
        return "/api/spotify/" + this.userId + "/playlists" + qs;
    }

});

module.exports = Playlists;

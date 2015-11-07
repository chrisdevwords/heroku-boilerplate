

var Backbone = require('backbone');
var Track = require('../model/Track');

var Tracks = Backbone.Collection.extend({

    model: Track,

    initialize: function(models, options) {
        this.userId = options.userId;
        this.playlistId = options.playlistId;
    },

    parse: function (data) {
        this.next = data.next ? data.next.split('?').pop() : null;
        return data.items;
    },

    url: function () {
        var qs = this.next ? "?" + this.next : '';
        return "/api/spotify/" + this.userId + "/playlists/" + this.playlistId + '/tracks' + qs;
    }

});

module.exports = Tracks;

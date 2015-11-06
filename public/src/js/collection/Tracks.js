

var Backbone = require('backbone');
var Track = require('../model/Track');

var Tracks = Backbone.Collection.extend({

    model: Track,

    initialize: function(models, options) {
        this.userId = options.userId;
        this.playlistId = options.playlistId;
        this.offset = 0;
        this.limit = 50;
    },

    parse: function (data) {
        this.limit = data.limit;
        this.offset = data.offset;
        this.next = data.next;
        return data.items;
    },

    url: function () {
        var qs = '';
        if (this.next) {
            qs = '?' + this.next.split('?').pop();
        }
        return "/api/spotify/" + this.userId + "/playlists/" + this.playlistId + '/tracks' + qs;
    }

});

module.exports = Tracks;

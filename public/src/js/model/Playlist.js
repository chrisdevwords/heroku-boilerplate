var Backbone = require('backbone');
var Tracks = require('../collection/Tracks');

var Playlist = Backbone.Model.extend({

    defaults : {
        owner : {}
    },

    initialize : function (atts) {

        this.set('tracks', new Tracks([], {
            userId : (this.get('owner') || {}).id,
            playlistId : this.get('id')
        }));

        if (!atts) {
            this.on('change:owner', function (model, value) {
                this.get('tracks').userId = value;
            });
            this.on('change:id', function (model, value) {
                this.get('tracks').playlistId =  value;
            });
        }
    }

});

module.exports = Playlist;

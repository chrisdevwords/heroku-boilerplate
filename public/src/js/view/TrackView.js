'use strict';

var Backbone = require('backbone');
var templates = require('../../templates/playlists.html');

var TrackView = Backbone.View.extend({

    events: {
        'click' : function () {
            this.$el.trigger('trackSelected', this.model)
        }
    },

    tagName: "li",
    className: 'track',
    template: templates.track,

    render: function () {
        var data = _.extend(this.model.toJSON(), {artist:this.model.getArtists()});
        this.$el.html(this.template(data));
        return this;
    }
});

module.exports = TrackView;

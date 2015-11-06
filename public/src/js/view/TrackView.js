'use strict';

var Backbone = require('Backbone');
var templates = require('../../templates/spotify.html');

var TrackView = Backbone.View.extend({

    events: {},

    tagName: "li",
    className: 'track',
    template: templates.track,

    initialize: function (options) {},

    render: function () {
        var data = _.extend(this.model.toJSON(), {artist:this.model.getArtists()});
        this.$el.html(this.template(data));
        return this;
    }
});

module.exports = TrackView;

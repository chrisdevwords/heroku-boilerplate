'use strict';

var Backbone = require('backbone');
var templates = require('../../templates/search.html');

var YouTubeView = Backbone.View.extend({

    template:templates.youtubeResult,
    tagName:'li',
    className:'search__result',

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.data('videoId', this.model.get('videoId'));
        return this;
    }
});

module.exports = YouTubeView;

'use strict';

var Backbone = require('Backbone');
var templates = require('../../templates/spotify.html');
var Tracks = require('../collection/Tracks');
var TrackView = require('../view/TrackView');

var PlaylistView = Backbone.View.extend({

    events : {
        'click h1' : 'toggle',
        'click .load-more': 'loadTracks'
    },

    tagName: "article",
    className: 'playlist',
    template: templates.playlist,

    initialize : function (options) {
        this.tracks = new Tracks([], {
            userId: this.model.get('owner').id,
            playlistId: this.model.get('id')
        });
        this.trackViews = [];
        this.tracks.bind('add', this.addTrack, this);
    },


    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    toggle: function () {
        if (this.$el.hasClass('open')) {
            this.close();
        } else {
            this.open();
        }
    },

    open : function () {
        this.$el.addClass('open');
        if (!this.tracks.length) {
            this.loadTracks();
        }
    },

    close : function () {
        this.$el.removeClass('open');
    },

    loadTracks : function () {
        var _this = this;
        this.$el.addClass('loading');
        this.tracks.fetch().done(function () {
            _this.onTracksLoaded();
        });
    },

    addTrack : function (model) {
        this.trackViews.push(new TrackView({model:model}).render().$el);
    },

    onTracksLoaded : function () {
        this.$el.removeClass('loading');
        this.$el.find('.playlist__tracks').append(this.trackViews);
        this.$el.toggleClass('loaded', !this.tracks.next);
        this.trackViews = [];
    }

});

module.exports = PlaylistView;

'use strict';

var Backbone = require('backbone');
var templates = require('../../templates/playlists.html');
var TrackView = require('../view/TrackView');

var PlaylistView = Backbone.View.extend({

    events : {
        'click h1' : 'toggle',
        'click .load-more': 'loadTracks'
    },

    tagName: "article",
    className: 'playlist',
    template: templates.playlist,

    initialize : function () {
        this.trackEls = [];
        this.collection.bind('add', this.addTrack, this);
    },


    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.$footer = this.$el.find('.playlist__footer');
        this.$tracks = this.$el.find('.playlist__tracks')
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
        if (!this.collection.length) {
            this.loadTracks();
        }
    },

    close : function () {
        this.$el.removeClass('open');
    },

    loadTracks : function () {
        var _this = this;
        this.$footer.addClass('loading');
        this.collection.fetch().done(function () {
            _this.onTracksLoaded();
        });
    },

    addTrack : function (model) {
        this.trackEls.push(
            new TrackView({model:model}).render().$el
        );
    },

    onTracksLoaded : function () {
        this.$footer.removeClass('loading');
        this.$tracks.append(this.trackEls);
        this.$footer.toggleClass('loaded', !this.collection.next);
        this.trackEls = [];
    }

});

module.exports = PlaylistView;

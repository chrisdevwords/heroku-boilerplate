
var Backbone = require('backbone');
var Playlists = require('../collection/Playlists');
var PlaylistView = require('./Playlistview');

var AppView = Backbone.View.extend({

    el: '#main-view',
    playlistViews: [],

    initialize: function (options) {
        var _this = this;
        this.playlists = new Playlists([], {userId:options.SV.spotify.id});
        this.playlists.bind('add', this.addPlaylist, this);
        this.playlists.fetch().done(function () {
            _this.render();
        })
    },

    addPlaylist : function (playlist) {
        // create the views but dont append
        this.playlistViews.push(new PlaylistView({model:playlist}).render().$el);

        console.log('renderPlaylist',playlist.get('name'));
    },

    render : function () {
        // append created views
        this.$el.append(this.playlistViews);
        console.log('got em, goob!');
    }

});

module.exports = AppView;

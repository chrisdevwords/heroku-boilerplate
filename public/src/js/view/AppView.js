
var Backbone = require('backbone');
var Playlists = require('../collection/Playlists');
var SearchView = require('./SearchView');
var PlaylistBrowseView = require('./PlaylistBrowseView');

var AppView = Backbone.View.extend({

    el: '#app-view',

    events : {
        'click .search-btn' : function () {
            this.searchView.open();
        }
    },

    initialize: function (options) {
        this.searchView = new SearchView({});

        this.spotifyView = new PlaylistBrowseView({
            el: '#spotify-view',
            collection: new Playlists([], {userId:options.SV.spotify.id})
        });
        this.searchView.bind('trackRequested', this.requestToMixtape, this);
        this.spotifyView.bind('trackSelected', this.convertToYouTubeClip, this);
        this.spotifyView.loadPlaylists();
    },

    convertToYouTubeClip : function (track) {
        this.searchView.search(track.getArtists() + ' ' + track.get('name'));
    },

    requestToMixtape : function (id) {
        $.get('/api/mixtape/add?track=' + id).always(function(resp){
            alert(resp.message);
        });
    }
});

module.exports = AppView;

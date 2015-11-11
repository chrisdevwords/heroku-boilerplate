
var Backbone = require('backbone');
var Playlists = require('../collection/Playlists');
var SearchView = require('./SearchView');
var PlaylistBrowseView = require('./PlaylistBrowseView');
var NowPlayingView = require('./NowPlayingView');
var NowPlaying = require('../model/NowPlaying');

var AppView = Backbone.View.extend({

    el: '#app-view',

    events : {
        'click .search-btn' : function () {
            this.searchView.open();
        }
    },

    initialize: function (options) {
        this.searchView = new SearchView({});
        this.nowPlayingView = new NowPlayingView({model: new NowPlaying()});
        this.searchView.bind('trackRequested', this.requestToMixtape, this);
        if (options.SV.spotify) {
            this.spotifyView = new PlaylistBrowseView({
                el: '#spotify-view',
                collection: new Playlists([], {userId:options.SV.spotify.id})
            });
            this.spotifyView.bind('trackSelected', this.convertToYouTubeClip, this);
            this.spotifyView.loadPlaylists();
        }
        this.nowPlayingView.refresh();
    },

    convertToYouTubeClip : function (track) {
        this.searchView.search(track.getArtists() + ' ' + track.get('name'));
    },

    requestToMixtape : function (tube) {
        this.searchView.close();
        if (confirm("Are you sure you want to request " + tube.get('snippet').title + '?')) {
            $.get('/api/mixtape/add?track=' + tube.get('videoId')).always(function(resp){
                alert(resp.message);
            });
        }

    }
});

module.exports = AppView;

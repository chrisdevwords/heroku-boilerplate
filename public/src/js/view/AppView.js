
var Backbone = require('backbone');
var Playlists = require('../collection/Playlists');
var PlaylistView = require('./PlaylistView');
var SearchView = require('./SearchView');

var AppView = Backbone.View.extend({

    el: '#main-view',

    events : {
        'click .search-btn' : function () {
            this.searchView.open();
        },
        'click .track' : function (event) {
            this.searchView.search(event.currentTarget.textContent);
        },
        'click .spotify__footer >.load-more': 'loadPlaylists'
    },

    initialize: function (options) {
        this.searchView = new SearchView();
        this.searchView.bind('trackRequested', this.requestToMixtape, this);
        this.playlistEls = [];
        this.playlists = new Playlists([], {userId:options.SV.spotify.id});
        this.playlists.bind('add', this.addPlaylist, this);
        this.loadPlaylists();

    },

    loadPlaylists: function () {
        var _this = this;
        this.$el.find('.spotify__footer').addClass('loading');
        this.playlists.fetch().done(function () {
            _this.render();
        });
    },

    requestToMixtape : function (id) {
        $.get('/api/mixtape/add?track=' + id).always(function(resp){
            alert(resp.message);
        });
    },

    addPlaylist : function (playlist) {
        this.playlistEls.push(new PlaylistView({model:playlist}).render().$el);
    },

    render : function () {
        this.$el.find('.spotify__footer').removeClass('loading');
        this.$el.find('.spotify__footer').toggleClass('loaded', !this.playlists.next);
        this.$el.find('.spotify__playlists').append(this.playlistEls);
        this.playlistEls = [];
        return this;
    }

});

module.exports = AppView;

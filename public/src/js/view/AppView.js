
var Backbone = require('backbone');
var Playlists = require('../collection/Playlists');
var PlaylistView = require('./Playlistview');
var SearchView = require('./SearchView');

var AppView = Backbone.View.extend({

    el: '#main-view',

    events : {
        'click .track' : function (event) {
            this.searchView.search(event.currentTarget.textContent);
        }
    },

    initialize: function (options) {
        var _this = this;
        this.searchView = new SearchView();
        this.searchView.bind('trackRequested', this.requestToMixtape, this);
        this.playlistViews = [];
        this.playlists = new Playlists([], {userId:options.SV.spotify.id});
        this.playlists.bind('add', this.addPlaylist, this);
        this.playlists.fetch().done(function () {
            _this.render();
        })
    },

    requestToMixtape : function (id) {
        $.get('/api/mixtape/add?track=' + id).always(function(resp){
            alert(resp.message);
        });
    },

    addPlaylist : function (playlist) {
        this.playlistViews.push(new PlaylistView({model:playlist}).render().$el);
    },

    render : function () {
        this.$el.append(this.playlistViews);
        return this;
    }

});

module.exports = AppView;

var Backbone = require('backbone');
var PlaylistView = require('./PlaylistView');

var PlaylistBrowseView = Backbone.View.extend({

    events : {
        'click .spotify__footer >.load-more': 'loadPlaylists',
        'trackSelected' : function (event, track) {
            this.trigger('trackSelected', track);
        }
    },

    initialize: function () {
        this.$playlists = this.$el.find('.playlists');
        this.$footer = this.$el.find('footer');
        this.playlistEls = [];
        this.collection.bind('add', this.addPlaylist, this);
    },

    loadPlaylists: function () {
        var _this = this;
        this.$footer.addClass('loading');
        this.collection.fetch().done(function () {
            _this.render();
        });
    },

    addPlaylist : function (playlist) {
        var view = new PlaylistView({
            model: playlist,
            collection: playlist.get('tracks')
        });
        this.playlistEls.push(view.render().$el);
    },

    render : function () {
        this.$footer.removeClass('loading');
        this.$footer.toggleClass('loaded', !this.collection.next);
        this.$playlists.append(this.playlistEls);
        this.playlistEls = [];
        return this;
    }

});

module.exports = PlaylistBrowseView;
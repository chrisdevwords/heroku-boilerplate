var Backbone = require('backbone');
var templates = require('../../templates/mixtape.html');
var NowPlayingView = Backbone.View.extend({

    el: '#now-playing',
    template: templates.nowPlaying,
    events : {
        'click .toggle' : 'toggle'
    },

    initialize : function () {
        this.model.bind('change', this.render, this);
    },

    toggle : function () {
       this.$el.toggleClass('open');
    },

    refresh : function () {
        var _this = this;
        this.model.fetch()
            .done(function () {
                setTimeout(function () {
                    _this.refresh();
                }, 20000)
            });
    },

    render : function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

module.exports = NowPlayingView;

'use strict';

var Backbone = require('backbone');
var YouTubeSearch = require('../collection/YouTubeSearch');
var SearchResultsView = require('./SearchResultsView');

var SearchView = Backbone.View.extend({

    el: '#youtubeSearch',
    events : {
        'click .close-btn' : 'close',
        'submit' : 'onSearchFormSubmit',
        'trackRequested' : function (event, tube) {
            this.trigger('trackRequested', tube);
        }
    },

    initialize : function (options) {
        this.searchResults = new YouTubeSearch();
        this.$searchInput = $('#search-query');
        this.resultsView = new SearchResultsView({collection:this.searchResults});
    },

    onSearchFormSubmit : function (event) {
        event.preventDefault();
        this.search();
    },

    close : function () {
        this.$el.removeClass('open');
    },

    open : function () {
        var _this = this;
        $('html,body').stop().animate({
            scrollTop:this.$el.offset().top
        }, 350, function () {
            _this.$el.addClass('open');
        });
    },

    search : function (query) {
        var _this = this;

        if (query) {
            this.$searchInput.val(query);
        } else {
            query = this.$searchInput.val();
        }

        this.$el.addClass('loading');
        this.open();

        this.searchResults.reset();
        this.searchResults.query = query;
        this.searchResults.fetch().done(function(){
            _this.$el.removeClass('loading');
            _this.render();
            _this.resultsView.render();
        });
    },

    render : function () {
        return this;
    }
});

module.exports = SearchView;


'use strict';

var Backbone = require('backbone');
var templates = require('../../templates/search.html');
var YouTubeResultView = require('./YouTubeResultView');

var SearchResultsView = Backbone.View.extend({

    el: '#search-results',
    template: templates.results,

    initialize : function (options) {
        this.elsToAppend = [];
        this.collection.bind('add', this.addSearchResult, this);
        this.collection.bind('reset', this.clearResults, this);
    },

    addSearchResult : function (model) {
        this.elsToAppend.push(new YouTubeResultView({model:model}).render().$el);
    },

    clearResults : function () {
        this.$el.find('.search__results').html('');
    },

    render : function () {
        this.$el.html(this.template({
            query: this.collection.query,
            length: this.collection.length
        }))
        this.$el.find('.search__results').append(this.elsToAppend);
        this.elsToAppend = [];
        return this;
    }
});

module.exports = SearchResultsView;

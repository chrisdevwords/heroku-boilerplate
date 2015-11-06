var Backbone = require('backbone');
var YouTube = require('../model/YouTube');

var YouTubeSearch = Backbone.Collection.extend({

    model: YouTube,

    initialize : function (models, options) {
        options = options || {};
        this.query = options.query;
    },

    parse: function (data) {
        return data.items;
    },

    url: function () {
        return "/api/youtube/?q=" + this.query
    }

});

module.exports = YouTubeSearch;

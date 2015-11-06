var Backbone = require('backbone');
var _ = require('underscore');

var YouTube = Backbone.Model.extend({

    idAttribute: 'videoId',

    parse: function (data) {
        data.videoId = data.id.videoId;
        return data;
    }

});

module.exports = YouTube;

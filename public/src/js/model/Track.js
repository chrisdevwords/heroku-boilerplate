var Backbone = require('backbone');
var _ = require('underscore');

var Track = Backbone.Model.extend({
    parse: function (data) {
        return data.track;
    },
    getArtists : function () {
        return _.pluck(this.get('artists'), 'name').join(', ');
    }
});

module.exports = Track;

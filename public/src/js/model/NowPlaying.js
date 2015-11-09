var Backbone = require('backbone');

var NowPlaying = Backbone.Model.extend({
   url: '/api/mixtape/playing'
});

module.exports = NowPlaying;


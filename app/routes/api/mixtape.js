'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');

function mockHipChatMessage(message, username, name) {
    return {
        event: 'room_message',
        item: {
            message: {
                date: new Date().toISOString(),
                from: {
                    id: '666',
                    'mention_name': username,
                    name: name
                },
                id: '666',
                mentions: [],
                message: message,
                type: 'message'
            },
            room: {
                id: '173376',
                name: 'Mixtape'
            }
        },
        'webhook_id': '666'
    };
}

router.get('/add', function (req, res) {

    var spotifyData = JSON.parse(req.cookies.spotify || '{}');
    var track = req.query.track;
    var message = mockHipChatMessage('/mixtape add ' + track, spotifyData.id, spotifyData.name);

    var options = {
        method: 'post',
        body: message,
        json: true,
        url: 'http://apps.10covert.com/mixtape?a=Command'
    };

    request(options, function (err, resp, body) {
       if (err) {
           res.json({error:{message:err.message}});
       } else {
           res.json(body);
       }
    });

});

module.exports = router;

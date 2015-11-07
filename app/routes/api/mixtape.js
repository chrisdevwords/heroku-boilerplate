'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var model = require('../../model');
var conf = model.getConf('mixtape');

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

function notifyRoom (message) {
    request({
        method: 'post',
        body: message,
        json: true,
        url: "https://huge.hipchat.com/v2/room/" + conf.roomId +
        "/notification?auth_token=" + conf.roomToken
    }, function (err, resp, body){
        if (err) {
            console.log(err);
        } else {
            console.log(body);
        }
    });
}

router.get('/add', function (req, res) {

    var spotifyData = JSON.parse(req.cookies.spotify || '{}');
    var track = req.query.track;
    var options;

    if (!spotifyData.id || !spotifyData.name) {
        res.status(530).json({
            message: 'You must be logged in to Spotify to request a track.'
        })
        return;
    }

    options = {
        method: 'post',
        body: mockHipChatMessage('/mixtape add ' + track, spotifyData.id, spotifyData.name),
        json: true,
        url: 'http://apps.10covert.com/mixtape?a=Command'
    };

    request(options, function (err, resp, body) {
       if (err) {
           res.json({error:{message:err.message}});
       } else {
           if (body.color === 'green') {
               notifyRoom(body);
           }
           res.json(body);
       }
    });

});

module.exports = router;

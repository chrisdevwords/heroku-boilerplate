

var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');
var model = require('../../model')

function refreshToken (req, res) {
    res.redirect('/auth/spotify/refresh?' +
        querystring.stringify({
            path: 'api/spotify' + req.path,
            query: encodeURIComponent(querystring.stringify(req.query))
        })
    );
}

function buildOptions (endpoint, req) {

    var spotifyCookies = JSON.parse(req.cookies.spotify || '{}');
    var access_token = spotifyCookies.access_token;

    return {
        url: endpoint,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
}

function handleReqRes (req, res, err, response, body) {
    if (err) {
        res.json({
            status: response ? response.statusCode : 500,
            error: {
                message: error.message
            }
        });
    } else if (response.statusCode === 401) {
        refreshToken(req, res);
    } else {
        res.json(body);
    }
}

router.get('/:userId/playlists', function (req, res){

    var endpoint = 'https://api.spotify.com/v1/users/'
        + req.params.userId + '/playlists?' +
            querystring.stringify({
                limit:req.query.limit || '50',
                offset : req.query.offset || '0'
            })
    var options = buildOptions(endpoint, req);

    request.get(options, function (err, response, body) {
        handleReqRes(req, res, err, response, body);
    });

});

router.get('/:userId/playlists/:playlistId/tracks', function(req, res) {

    var endpoint = 'https://api.spotify.com/v1/users/' +
        req.params.userId + '/playlists/'+ req.params.playlistId +
        '/tracks?' + querystring.stringify({
            limit:req.query.limit || '50',
            offset : req.query.offset || '0'
        });
    var options = buildOptions(endpoint, req);

    request.get(options, function (err, response, body) {
        handleReqRes(req, res, err, response, body);
    });
});



module.exports = router;

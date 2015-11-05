var express = require('express');
var router = express.Router();
var request = require('request');
var randomstring = require('randomstring');
var querystring = require('querystring');

// should all go in a conf
var conf  = {
    stateKey: process.env['SPOTIFY_STATE_KEY'],
    clientID: process.env['SPOTIFY_CLIENT_ID'],
    clientSecret: process.env['SPOTIFY_CLIENT_SECRET'],
    redirectUri: process.env['SPOTIFY_REDIRECT_URI']
};

router.get('/login', function (req, res){
    var state = randomstring.generate(16);
    res.cookie(conf.stateKey, state);
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: conf.clientID,
            scope:  'playlist-read-private playlist-read-collaborative',
            redirect_uri: conf.redirectUri,
            state: state
        }));
});

router.get('/callback', function (req, res) {

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[conf.stateKey] : null;
    var authOptions;

    if (state === null || state !== storedState) {

        res.redirect('/auth/spotify/error?' +
            querystring.stringify({
                msg: 'State mismatch.'
            }));

       // res.render('auth/spotify', {data:{error:'state mismatch', state:state, storedState:storedState}});
    } else {
        res.clearCookie(conf.stateKey);

        authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: conf.redirectUri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(conf.clientID + ':' + conf.clientSecret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {

            if (!error && response.statusCode === 200) {

                var access_token = body.access_token;
                var refresh_token = body.refresh_token;

                res.redirect('/auth/spotify/success?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/auth/spotify/error?' +
                    querystring.stringify({
                        error: 'invalid_token',
                        msg: error ? error.message : response.body
                    }));
            }
        });

    }

});

router.get('/error', function (req, res) {
   res.render('error', {message:req.query.msg})
});


router.get('/success', function (req, res){

    var refresh_token = req.query.refresh_token;
    var access_token = req.query.access_token || "";

    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    request.get(options, function(error, response, body) {
        if (error) {
            res.redirect('/auth/spotify/error?' +
                querystring.stringify({
                    error: 'invalid_token',
                    msg: error ? error.message : response.body
                }));
        } else {
            res.cookie('spotify', JSON.stringify({
                id: body.id,
                access_token: access_token,
                refresh_token: refresh_token
            }));
            res.redirect('/');
        }
    });
});

module.exports = router;

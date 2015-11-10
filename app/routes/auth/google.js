var express = require('express');
var router = express.Router();
var model = require('../../model');
var conf  = model.getConf('google');
var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(conf.clientId, conf.clientSecret, 'https' + '://' + conf.redirectUri);

google.options({auth: oauth2Client});

router.get('/login', function (req, res) {

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // will return a refresh token
        scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
    });
    res.redirect(url);
});

router.get('/callback', function (req, res) {

    var code = req.query.code;

    oauth2Client.getToken(code, function(err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if(!err) {
            oauth2Client.setCredentials(tokens);
            plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, data) {
                // handle err and response
                if (err) {
                    res.render('error', {message:err.message});
                } else {
                    res.cookie('gplus', JSON.stringify({
                        name: data.displayName,
                        img: data.image.url
                    }));
                    res.redirect('/');
                }
            });
        } else {
            res.render('error', {message:err.message});

        }
    });
});




module.exports = router;

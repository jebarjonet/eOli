var express = require('express');
var _ = require('lodash');
var passport = require('passport');
var parameters = require('../../../config/parameters').google;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = auth;

function auth() {
    passport.serializeUser(function (user, done) {
        done(null, userEmailFromGoogle(user));
    });

    passport.deserializeUser(function (email, done) {
        /**
         * No need to send the complete user for now
         */
        // User.findOne({email: email}, function(err, user){
        //     done(err, user);
        // });
        done(null, email);
    });

    passport.use(new GoogleStrategy({
            clientID: parameters.clientId,
            clientSecret: parameters.clientSecret,
            callbackURL: parameters.googleRedirectUri + '/auth/google/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            var email = userEmailFromGoogle(profile);
            User.findOne({email: email}, function(err, user){
                if(err) {
                    return done(err);
                }

                if(!user) {
                    return done(null, false);
                }

                return done(null, profile);
            });
        }
    ));

    var router = express.Router();

    // sending
    router.get('/google',
        passport.authenticate('google', {scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]}));

    // callback
    router.get('/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/admin',
            failureRedirect: '/#/auth'
        }));

    return router;
}

function userEmailFromGoogle(profile) {
    var email = _.find(profile.emails, function(email) {
        return email.type === 'account';
    }).value;
    if(!email) {
        email = profile.emails[0].value;
    }
    return email;
}
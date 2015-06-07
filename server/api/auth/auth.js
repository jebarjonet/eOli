var express = require('express');
var controller = require('./controller/auth');

var auth = express();
module.exports = auth;

auth.use('/auth', controller());

auth.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// frontend auth validation
auth.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : false);
});
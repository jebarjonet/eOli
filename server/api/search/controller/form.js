var express = require('express');
var mongoose = require('mongoose');
var helper = require('../../helper');
var Mood = mongoose.model('Mood');

module.exports = form;

function form() {
    var router = express.Router();

    router.get('/form', function(req, res, next) {
        Mood.find(function(err, moods){
            if(err) {
                return next(helper.mongooseError(err));
            }

            res.json({
                moods: moods
            });
        });
    });

    return router;
}
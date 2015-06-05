var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var ObjectId = mongoose.Types.ObjectId;
var helper = require('./../service/helper');
var Place = require('mongoose').model('Place');
var Mood = require('mongoose').model('Mood');

module.exports = search;

/**
 * Search places for public search query
 * @param search params
 * @returns res
 */
function search() {
    var router = express.Router();

    router.post('/search', categoriesFromMoods);
    //router.get('/search', near);

    return router;
}

function categoriesFromMoods(req, res, next) {
    var moods = ['5571705be54945f715eb388a', '557172b3d09aa7221a56499b'];
    moods = _.map(moods, function(id) {
        return new ObjectId(id);
    });

    Mood.aggregate([
        {
            $match: {
                _id: {
                    $in: moods
                }
            }
        }, {
            $unwind: '$categories'
        }, {
            $project: {
                _id: 0,
                category: '$categories'
            }
        }, {
            $group: {
                _id: '$category'
            }
        }
    ], function(err, categories){
        if(err) {
            return next(helper.mongooseError(err));
        }

        categories = _.map(categories, function(category) {
            return category._id;
        });
        res.json(categories);
    });
}

/**
 * Find places in a squared area of X kilometers around a geographic point
 */
function near(req, res, next) {
    var limit = req.query.limit || 10;

    // convert kilometers distance to angle
    var distance = parseFloat(req.query.distance) || 1;
    var distances = {
        longitude: distance * 0.014143,
        latitude: distance * 0.008992
    };

    // get coordinates [ <longitude> , <latitude> ] of polygon to search in
    var coords = [];
    var transform = [[-1.0, 1.0], [1.0, 1.0], [1.0, -1.0], [-1.0, -1.0], [-1.0, 1.0]];
    transform.forEach(function(t) {
        coords.push([
            parseFloat(req.query.longitude) + (t[0] * distances.longitude),
            parseFloat(req.query.latitude) + (t[1] * distances.latitude)
        ]);
    });

    // find a location in the area
    Place.find({
        loc: {
            $geoWithin: {
                $geometry: {
                    type: 'Polygon',
                    coordinates: [
                        coords
                    ]
                }
            }
        }
    })
        .limit(limit)
        .exec(function(err, places) {
            if(err) {
                return next(helper.mongooseError(err));
            }

            res.json(places);
        });
}
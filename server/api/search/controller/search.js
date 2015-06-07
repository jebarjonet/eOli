var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment-timezone');
var _ = require('lodash');
var helper = require('../../helper');
var ObjectId = mongoose.Types.ObjectId;
var Place = mongoose.model('Place');
var Mood = mongoose.model('Mood');
var Link = mongoose.model('Link');
var Period = mongoose.model('Period');

module.exports = search;

/**
 * Search places for public search query
 * @param search params
 * @returns res
 */
function search() {
    var router = express.Router();

    router.post('/', temporary);

    return router;
}

function temporary(req, res, next) {
    Place.find(function(err, data){
        if(err) {
            return next(helper.mongooseError(err));
        }

        res.json(data);
    });
}

/**
 * Retrieve categories for passed moods
 */
function categoriesFromMoods(req, res, next) {
    var moods = req.body.moods;
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
        res.json(_.shuffle(categories));
    });
}

/**
 * Give the time the user wants the search to be done according to its frontend time choice
 */
function timeFromSelection(req, res, next) {

}

/**
 * Find the period corresponding to the current time
 */
function periodFromTime(req, res, next) {
    // offset in minutes
    var offset = 30;
    var time = new Date(Date.now() + offset * 60000);
    time = moment(time).tz('Europe/Paris').format('H');

    Period.aggregate([
        {
            $unwind: '$startAt'
        },
        {
            $sort: {
                startAt: 1
            }
        }
    ], function(err, periods) {
        if(err) {
            return next(helper.mongooseError(err));
        }

        var found = _.findIndex(periods, function(period) {
            return period.startAt > time;
        });
        var period = _.last(periods);
        if(~found) {
            period = periods[found-1];
        }

        res.json({time: time, periods: periods, period: period});
    });
}

/**
 * Find a category linked with one of the categories from moods at the current period of time
 */
function linkCategory(req, res, next) {
    var category = new ObjectId('556cd7394e203db01d2a2a70');
    var period = new ObjectId('55708d869e87fc241f5beb5e');

    Link.aggregate([
        {
            $project: {
                relations: 1,
                categories: 1,
                found: {
                    $cond: [{
                        $setIsSubset:
                            [
                                [category],
                                '$categories'
                            ]
                    },
                        true,
                        false
                    ]
                }
            }
        }, {
            $unwind: '$relations'
        }, {
            $match: {
                found: true,
                'relations.period': period
            }
        }, {
            $project: {
                _id: 0,
                value: '$relations.value',
                categories: '$categories'
            }
        }
    ], function(err, links){
        if(err) {
            return next(helper.mongooseError(err));
        }

        var total = 0;
        // adding values for picking a link
        links = _.map(links, function(link) {
            total += link.value;
            link.value = total;
            return link;
        });
        // fictive limit to pick a link
        var limit = _.random(1, total);
        // picking a link using the fictive limit
        var selected = _.find(links, function(link) {
            return link.value >= limit;
        })
        // removing sent category from categories of the picked link
        selected.categories = _.filter(selected.categories, function(cat) {
            return !cat.equals(category);
        });
        // keeping the ID of the picked category
        selected.category = selected.categories[0];
        delete selected.categories;

        links.push({
            limit: limit,
            selected: selected
        });
        res.json(links);
    });
}

/**
 * Find places in a squared area of X kilometers around a geographic point
 */
function findNear(req, res, next) {
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
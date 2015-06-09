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

    var model = {
        time: 'now',
        moods: [],
        distance: 0.8,
        loc: {
            lat: 48.864365,
            lng: 2.334042
        }
    };

    router.post('/', function(req, res, next) {
        var request = _.merge(_.cloneDeep(model), req.body);

        // getting a 'time' according to the selected time
        var time = timeFromSelection(request.time);
        // getting a period according to the time
        periodFromTime(time, function(err, period) {
            if(err) {
                return next(helper.mongooseError(err));
            }

            if(request.moods.length === 0) {
                Mood.find(function(err, moods){
                    if(err) {
                        return next(helper.mongooseError(err));
                    }

                    moods = _.pluck(moods, '_id');

                    categoriesFromMoods(moods, continuefromMoods);
                });
            } else {
                categoriesFromMoods(request.moods, continuefromMoods);
            }

            function continuefromMoods(err, categories) {
                if(err) {
                    return next(helper.mongooseError(err));
                }

                linkCategories(_.shuffle(categories)[0], period._id, function(err, selected) {
                    if(err) {
                        return next(helper.mongooseError(err));
                    }

                    if(selected) {
                        categories = _.union(categories, [selected]);
                    }

                    findNear(request.loc.lat, request.loc.lng, request.distance, categories, function(err, places) {
                        if(err) {
                            return next(helper.mongooseError(err));
                        }

                        res.json(places);
                    });
                });
            }
        });
    });

    return router;
}

/**
 * Give the time the user wants the search to be done according to its frontend time choice
 */
function timeFromSelection(selected) {
    // offset in minutes
    var offset = 30;
    var time = null;

    switch(selected) {
        case 'later':
            offset += 120;
            break;
        case 'tonight':
            time = (new Date()).setHours(20);
            break;
    }

    if(!time) {
        time = new Date(Date.now() + offset * 60000);
    }
    time = moment(time).tz('Europe/Paris').format('H');

    return time;
}

/**
 * Find the period corresponding to the current time
 */
function periodFromTime(time, cb) {
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
            return cb(err);
        }

        var found = _.findIndex(periods, function(period) {
            return period.startAt > time;
        });
        var period = _.last(periods);
        if(~found) {
            period = periods[found-1];
        }

        return cb(null, period);
    });
}

/**
 * Retrieve a random category for each passed mood
 */
function categoriesFromMoods(moods, cb) {
    moods = _.map(moods, function(id) {
        return new ObjectId(id);
    });

    Mood.find({_id: { $in: moods}}, function(err, found){
        if(err) {
            return cb(err);
        }

        var categories = [];
        _.forEach(found, function(mood) {
            categories.push(_.shuffle(mood.categories)[0]._id);
        });

        return cb(null, categories);
    });
}

/**
 * Find a category linked with one of the categories from moods at the current period of time
 */
function linkCategories(category, period, cb) {
    category = new ObjectId(category);
    period = new ObjectId(period);

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
            return cb(err);
        }

        if(links.length === 0) {
            return cb(null, null);
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
        });
        // removing sent category from categories of the picked link
        selected.categories = _.filter(selected.categories, function(cat) {
            return !cat.equals(category);
        });

        return cb(null, selected.categories[0]);
    });
}

/**
 * Find places in a squared area of X kilometers around a geographic point, one for each searched category
 */
function findNear(latitude, longitude, distance, categories, cb) {
    categories = _.map(categories, function(id) {
        return new ObjectId(id);
    });

    // convert kilometers distance to angle
    distance = parseFloat(distance) || 1;
    var distances = {
        longitude: distance * 0.014143,
        latitude: distance * 0.008992
    };

    // get coordinates [ <longitude> , <latitude> ] of polygon to search in
    var coords = [];
    var transform = [[-1.0, 1.0], [1.0, 1.0], [1.0, -1.0], [-1.0, -1.0], [-1.0, 1.0]];
    transform.forEach(function(t) {
        coords.push([
            parseFloat(longitude) + (t[0] * distances.longitude),
            parseFloat(latitude) + (t[1] * distances.latitude)
        ]);
    });

    // find a location in the area
    Place.find({
        category: {
            $in: categories
        },
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
        .exec(function(err, found) {
            if(err) {
                return cb(err);
            }

            var places = [];
            _.forEach(_.shuffle(found), function(place) {
                var index = _.findIndex(categories, place.category._id);
                if(~index) {
                    places.push(place);
                }
                _.pullAt(categories, index);
            });

            return cb(null, places);
        });
}
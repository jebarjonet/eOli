var helper = require('./../service/helper');
var Place = require('mongoose').model('Place');
var Category = require('mongoose').model('Category');

module.exports = {
    remove: remove,
    count: count,
    countAll: countAll
};

/**
 * Prevent Category removing if at least one Place is using it
 */
function remove(req, res, next) {
    Place.find({category: req.entity._id}, function(err, places) {
        if(err) {
            return next(helper.mongooseError(err));
        }

        if(places.length) {
            return next(helper.notAllowed('Cette catégorie est utilisée par des lieux.'));
        }

        next();
    });
}


/**
 * Count of places using this category
 */
function count(req, res, next) {
    Place.where({ category: req.entity._id }).count(function (err, count) {
        if(err) {
            return next(helper.mongooseError(err));
        }

        res.send(count.toString());
    });
}

/**
 * Count of places using existing categories
 */
function countAll(req, res, next) {
    Place.aggregate([
        {
            $project: {
                _id: 0,
                category: 1
            }
        }, {
            $group: {
                _id: '$category',
                count: {
                    $sum: 1
                }
            }
        }],
        function(err, counts) {
            if(err) {
                return next(helper.mongooseError(err));
            }

            res.json(counts);
        });
}
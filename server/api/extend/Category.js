var helper = require('./../service/helper');
var Place = require('mongoose').model('Place');
var Category = require('mongoose').model('Category');

module.exports = {
    remove: remove,
    total: total,
    totalAll: totalAll
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
function total(req, res, next) {
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
function totalAll(req, res, next) {
    Place.aggregate([
        {
            $project: {
                _id: 0,
                category: 1
            }
        }, {
            $group: {
                _id: '$category',
                total: {
                    $sum: 1
                }
            }
        }],
        function(err, totals) {
            if(err) {
                return next(helper.mongooseError(err));
            }

            res.json(totals);
        });
}
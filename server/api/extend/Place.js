var helper = require('./../service/helper');
var Place = require('mongoose').model('Place');

module.exports = {
    near: near
};

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
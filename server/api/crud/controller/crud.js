var _ = require('lodash');
var helper = require('../../helper');

module.exports = function(Model) {
    return {
        paramConverter: paramConverter,
        get: get,
        getAll: getAll,
        create: create,
        update: update,
        remove: remove
    };

    /**
     * Check if element exists in database if 'id' provided
     */
    function paramConverter(req, res, next, id) {
        Model.findById(id)
            .exec(function(err, entity) {
                if(err) {
                    return next(helper.mongooseError(err));
                }

                if(!entity) {
                    return next(helper.notFound(Model.modelName));
                }

                req.entity = entity;
                next();
            });
    }

    /**
     * Crud functions
     */
    // GET all objects
    function getAll(req, res, next) {
        var filter = {};
        if(req.query.filter) {
            filter.name = new RegExp(req.query.filter, 'i');
        }
        var query = Model.find(filter);
        if(req.query.limit) {
            query = query.limit(req.query.limit);
        }
        query.exec(function(err, data){
            if(err) {
                return next(helper.mongooseError(err));
            }

            res.json(data);
        });
    }

    // ADD object
    function create(req, res, next) {
        (new Model(req.body)).save(function(err) {
            if(err) {
                return next(helper.mongooseError(err));
            }

            res.json({
                status: 201,
                message: Model.modelName + ' successfully added.'
            });
        });
    }

    // GET object
    function get(req, res) {
        res.json(req.entity);
    }

    // UPDATE object
    function update(req, res, next) {
        Model.findOneAndUpdate(
            { _id: req.entity.id },
            { $set: req.body },
            { runValidators: true },
            function(err) {
                if(err) {
                    return next(helper.mongooseError(err));
                }

                res.json({
                    status: 200,
                    message: Model.modelName + ' successfully updated.'
                });
            }
        );
    }

    // REMOVE object
    function remove(req, res, next) {
        Model.findOneAndRemove(
            { _id: req.entity.id },
            function(err) {
                if(err) {
                    return next(helper.mongooseError(err));
                }

                res.json({
                    status: 200,
                    message: Model.modelName + ' successfully removed.'
                });
            }
        );
    }
};
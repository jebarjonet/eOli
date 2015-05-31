var _ = require('lodash');
var helper = require('./../service/helper');

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
    function getAll(req, res, next) {
        // GET all objects
        Model.find(function(err, data){
            if(err) {
                return next(helper.mongooseError(err));
            }

            res.json(data);
        });
    }

    function create(req, res, next) {
        // ADD object
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

    function get(req, res) {
        // GET object
        res.json(req.entity);
    }

    function update(req, res, next) {
        // UPDATE object
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

    function remove(req, res, next) {
        // REMOVE object
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
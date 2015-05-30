var express = require('express');
var _ = require('lodash');
var config = require('../config/config');
var helper = require('./utils/helper');

module.exports = function(Model) {
    var router = express.Router();

    /**
     * Check if element exists in database if id provided
     */
    router.param('id', function(req, res, next, id) {
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
    });

    router.route('/')
        .get(function(req, res, next) {
            // GET all objects
            Model.find(function(err, data){
                if(err) {
                    return next(helper.mongooseError(err));
                }

                res.json(data);
            });
        })
        .post(function(req, res, next) {
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
        });

    router.route('/:id')
        .get(function(req, res) {
            // GET object
            res.json(req.entity);
        })
        .put(function(req, res, next) {
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
        })
        .delete(function(req, res, next) {
            // DELETE object
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
        });

    return router;
};
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var crudConfig = require('../api/config/config');

module.exports = registerCrud;

/**
 * Register actions and middleware for CRUD calls
 * @param crudModel from API config
 * @returns router
 */
function registerCrud(crudModel) {
    var router = express.Router();
    var crud = require('../api/controller/crud')(mongoose.model(crudModel.model));

    // param converter
    router.param('id', crud.paramConverter);

    // import crud or rest extensions
    if(crudModel.hasOwnProperty('crudExtend') || crudModel.hasOwnProperty('restExtend')) {
        var extension = require('../api/extend/'+crudModel.model);
    }

    // REST EXTENSIONS
    if(crudModel.hasOwnProperty('restExtend')) {
        _.forEach(crudModel.restExtend, function(action) {
            router[action.method](action.path,
                extension[action.function]
            );
        });
    }

    // CRUD
    _.forEach(crudConfig.crudActions, function(action, key) {
        var middleware = [crud[action.function]];

        // add crud extension to basic function if there is one
        if(crudModel.hasOwnProperty('crudExtend') && ~crudModel.crudExtend.indexOf(key)) {
            middleware.unshift(extension[key]);
        }

        router[action.method](action.path,
            middleware
        );
    });

    return router;
};
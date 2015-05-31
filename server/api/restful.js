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

    // import extensions
    if(crudModel.hasOwnProperty('crudExtend')) {
        var extension = require('../api/extend/'+crudModel.model);
    }

    _.forEach(crudConfig.crudActions, function(action, key) {
        // add extension to basic crud function if there is one
        var middleware = [crud[action.crudFunction]];
        if(crudModel.hasOwnProperty('crudExtend') && ~crudModel.crudExtend.indexOf(key)) {
            middleware.unshift(extension[key]);
        }

        router[action.method](action.path,
            middleware
        );
    });

    return router;
};
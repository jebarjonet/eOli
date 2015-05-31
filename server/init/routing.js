var express = require('express');
var path = require('path');
var _ = require('lodash');
var restful = require('../api/restful');
var crudConfig = require('../api/config/config');

module.exports = init;

function init(app) {
    _.forEach(crudConfig.crudModels, function(crudModel) {
        app.use('/api/'+crudModel.endpoint, restful(crudModel));
    });
    app.use(express.static(path.join(__dirname, '../../public')));
    app.use(notFound);
    app.use(logErrors);
    app.use(errorHandler);
}

function notFound(req, res, next) {
    var err = {
        status: 404
    };

    next(err);
}

function logErrors(err, req, res, next) {
    if(err.stack) {
        console.error(err.stack);
    }

    next(err);
}

function errorHandler(err, req, res, next) {
    err.status = err.status || 500;
    res.status(err.status);

    if (req.xhr || true) {
        if(err.error === undefined) {
            switch(err.status) {
                case 400:
                    err.error = 'bad_request';
                    break;
                case 401:
                    err.error = 'unauthorized';
                    break;
                case 404:
                    err.error = 'not_found';
                    err.message = err.message || 'This page does not exist.';
                    break;
                case 500:
                    err.error = 'internal_error';
                    err.message = err.message || 'Something went wrong.';
                    break;
            }
        }

        res.json(err);
    } else {
        res.render(err.status, { error: err });
    }
}
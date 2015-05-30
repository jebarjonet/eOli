var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

module.exports = init;

function init(config) {
    initConnection(config);
    initModels();
}

function initConnection(config) {
    var connect = function () {
        var options = { server: { socketOptions: { keepAlive: 1 } } };
        mongoose.connect('mongodb://' + config.host + '/' + config.database, options);
    };

    mongoose.connection.on('error', function(err) {
        console.log(err);
        process.exit(1);
    });

    mongoose.connection.on('disconnected', connect);

    connect();
}

function initModels() {
    var modelDir = path.join(__dirname, '../models');

    fs.readdirSync(modelDir).forEach(function (file) {
        if (~file.indexOf('.js') && !~file.indexOf('.swp'))
            require(path.join(modelDir, file));
    });
}
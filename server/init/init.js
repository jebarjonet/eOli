var parameters = require('../config/parameters.js');

module.exports = init;

function init(app) {
    require('./db')(parameters.mongodb);
    require('./routing')(app);
}
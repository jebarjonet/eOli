var config = require('../config/config.js');

module.exports = init;

function init(app) {
    require('./db')(config.mongodb);
    require('./routing')(app);
}
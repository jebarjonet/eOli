var express = require('express');
var form = require('./controller/form');
var controller = require('./controller/search');

var search = express();
module.exports = search;

search.use('/search', form());

search.use('/search', controller());
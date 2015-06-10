var program = require('commander');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('lodash');
var ProgressBar = require('progress');
var faker = require('faker');

// Setup database
var parameters = require(path.join(__dirname, '../server/config/parameters.js'));
require(path.join(__dirname, '../server/init/db'))(parameters.mongodb);
var Category = mongoose.model('Category');
var Place = mongoose.model('Place');

// Setup command
program
    .version('1.0.0')
    .usage('[options]')
    .option('-q, --quantity [quantity]', 'Number of places to generate')
    .option('-c, --clear', 'Clear database before importing')
    .parse(process.argv);

if(program.quantity === undefined){
    console.error('You must specify a quantity');
    process.exit(1);
}

program.quantity = parseInt(program.quantity);
if(program.quantity < 1){
    console.error('Quantity must be a positive integer');
    process.exit(1);
}

var generatePlaces = function(categories){
    // Init
    var validationErrors = dbErrors = 0;
    var bar = new ProgressBar('Generating [:bar] :current / :total', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: program.quantity
    });

    var i=0;

    var add = function() {
        var place = new Place({
            name: faker.name.firstName(),
            category: _.sample(categories)._id,
            description: faker.lorem.sentence(),
            address: faker.address.streetAddress(),
            loc: [
                _.random(0.347573) + 2.174767,
                _.random(0.167392) + 48.770272
            ],
            activated: true
        });

        place.save(function (err) {
            if (err) {
                if (err.name === 'ValidationError') {
                    validationErrors++;
                } else {
                    dbErrors++;
                }
            }

            i++;

            if(i%39 === 38) {
                bar.tick(39);
            }

            if(i === program.quantity) {
                bar.tick(++i % 39 -1);
                console.log(program.quantity - validationErrors - dbErrors + ' places generated');
                console.log(validationErrors + ' validation errors');
                console.log(dbErrors + ' database errors');
                process.exit(1);
            }
            add();
        });
    };

    add();
};

if (program.clear) {
    console.log('Removing existing places...');
    Place.remove({}, function(err) {
        Category.find(function(err, categories) {
            generatePlaces(categories);
        });
    });
}
else {
    Category.find(function(err, categories) {
        generatePlaces(categories);
    });
}
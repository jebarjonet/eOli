var program = require('commander');
var path = require('path');
var mongoose = require('mongoose');

// Setup database
var parameters = require(path.join(__dirname, '../server/config/parameters.js'));
require(path.join(__dirname, '../server/init/db'))(parameters.mongodb);
var User = mongoose.model('User');

// Setup command
program
    .version('1.0.0')
    .usage('[options]')
    .option('-e, --email [email]', 'Email of user')
    .parse(process.argv);

if(program.email === undefined){
    console.error('You must specify an email');
    process.exit(1);
}

var user = new User({
    email: program.email
});

user.save(function(err) {
    if(err) {
        console.log('User could not be created.');
        console.log(err);
        process.exit(1);
    }
    else {
        console.log('User created.');
        process.exit(1);
    }
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        required: 'L\'email ne doit pas être vide.',
        trim: true
    }
});

mongoose.model('User', UserSchema);
var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        type: String,
        required: 'Le nom ne doit pas être vide.',
        trim: true
    },
    color: {
        type: String,
        required: 'La couleur ne doit pas être vide.',
        trim: true,
        minlength: 3,
        maxlength: 6
    }
});

mongoose.model('Category', CategorySchema);
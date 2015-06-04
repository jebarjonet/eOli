var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Validator = require('../validation/Validator');

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
        validate: Validator.color
    },
    icon: {
        type: String,
        required: 'L\'icone ne doit pas être vide',
        trim: true
    }
});

mongoose.model('Category', CategorySchema);
var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var Schema = mongoose.Schema;
var Validator = require('../validation/Validator');

var MoodSchema = new Schema({
    name: {
        type: String,
        required: 'Le nom ne doit pas être vide.',
        trim: true
    },
    categories: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }],
        required: 'Les catégories ne doivent pas être vides.',
        autopopulate: true
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
}).plugin(autopopulate);

mongoose.model('Mood', MoodSchema);
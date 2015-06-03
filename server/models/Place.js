var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    name: {
        type: String,
        required: 'Le nom ne doit pas être vide.',
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: 'La catégorie ne doit pas être vide.',
        autopopulate: true
    },
    description: {
        type: String,
        required: 'La description ne doit pas être vide.',
        trim: true
    },
    address: {
        type: String,
        required: 'L\'adresse ne doit pas être vide.',
        trim: true
    },
    lat: {
        type: String,
        required: 'La latitude ne doit pas être vide.',
        trim: true
    },
    lng: {
        type: String,
        required: 'La longitude ne doit pas être vide.',
        trim: true
    },
    activated: {
        type: Boolean,
        required: 'Il faut indiquer si ce lieu est actif ou non',
        default: true
    }
}).plugin(autopopulate);

mongoose.model('Place', PlaceSchema);
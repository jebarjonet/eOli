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
    loc: {
        type: [Number],
        index: '2d',
        required: 'Les coordonnées ne doivent pas être vides.',
    },
    activated: {
        type: Boolean,
        required: 'Il faut indiquer si ce lieu est actif ou non',
        default: true
    }
}).plugin(autopopulate);

mongoose.model('Place', PlaceSchema);
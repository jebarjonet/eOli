var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var Schema = mongoose.Schema;
var Validator = require('../validation/Validator');

var LinkSchema = new Schema({
    categories: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }],
        required: 'Les catégories ne doivent pas être vides.',
        autopopulate: true,
        validate: Validator.couple
    },
    relations: [
        {
            period: {
                type: Schema.Types.ObjectId,
                ref: 'Period'
            },
            value: {
                type: Number
            }
        }
    ]
}).plugin(autopopulate);

mongoose.model('Link', LinkSchema);
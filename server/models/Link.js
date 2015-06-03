var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
    categories: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }],
        required: 'Les catégories ne doivent pas être vides.'
    },
    relations: [
        new Schema({
            period: {
                type: Schema.Types.ObjectId,
                ref: 'Period'
            },
            value: {
                type: Number
            }
        })
    ]
});

mongoose.model('Link', LinkSchema);
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
    value: {
        type: Number,
        required: 'La valeur du lien ne doit pas être vide.'
    },
    period: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Period'
        }],
        required: 'La période du lien ne doit pas être vide.'
    }
});

mongoose.model('Link', LinkSchema);
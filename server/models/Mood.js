var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var Schema = mongoose.Schema;

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
    }
}).plugin(autopopulate);

mongoose.model('Mood', MoodSchema);
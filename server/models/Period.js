var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PeriodSchema = new Schema({
    name: {
        type: String,
        required: 'Le nom ne doit pas être vide.',
        trim: true
    },
    startAt: {
        type: [Number],
        required: 'L\'heure de début ne doit pas être vide.'
    }
});

mongoose.model('Period', PeriodSchema);
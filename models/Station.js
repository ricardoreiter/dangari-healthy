var mongoose = require('mongoose');

var StationSchema = new mongoose.Schema({
    name: String,
    photo: String,
    location: String,
    pending: Boolean,
    scoreAverage: Number,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    timestamps: true
});

mongoose.model('Station', StationSchema);

var mongoose = require('mongoose');

var StationSchema = new mongoose.Schema({
  	name: String,
    photo: Buffer,
    location: String,
    locationLng: String,
    locationLat: String,
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

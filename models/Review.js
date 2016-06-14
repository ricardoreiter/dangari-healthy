var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  	description: String,
  	scoreGeneral: Number,
  	scoreAttendence: Number,
  	scoreReception: Number,
  	scoreStructure: Number,
  	scorePunctuality: Number,
  	user: {type: String, ref: 'User'},
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
  	comment: String
}, {
  timestamps: true
});

mongoose.model('Review', ReviewSchema);

var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  	description: String,
  	scoreGeneral: Number,
  	scoreAttendence: Number,
  	scoreReception: Number,
  	scoreStructure: Number,
  	scorePunctuality: Number,
  	user: {type: String, ref: 'User'},
  	comment: String

});

mongoose.model('Review', ReviewSchema);
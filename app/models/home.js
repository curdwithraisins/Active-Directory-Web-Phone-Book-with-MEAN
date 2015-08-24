var mongoose = require('mongoose');

var HomeSchema = new mongoose.Schema({
	displayName: String,
	physicalDeliveryOfficeName: String,
	telephoneNumber: String
});

module.exports = mongoose.model('Hometest', HomeSchema);
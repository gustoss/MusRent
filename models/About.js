module.exports = function(app){
	var mongoose = require("mongoose"),
		Schema = mongoose.Schema;

	var aboutSchema = new Schema({
		comments: [{like: Boolean, description: String}]
	});

	return mongoose.model("About", aboutSchema);
}
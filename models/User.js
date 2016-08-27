module.exports = function(app){
	var mongoose = require("mongoose"),
		Schema = mongoose.Schema,
		bcrypt = require("bcrypt-nodejs");

	var UserSchema = new Schema({
		_id: {type: String, require: true, index: {unique: true}},
		username: {type: String, require: true, index: {unique: true}},
		password: {type: String, require: true, select: false},
		idGroup: {type: Schema.Types.ObjectId, ref: "Group", require: true}
	});

	UserSchema.pre("save", function (next) {
		var user = this;
		if(!user.isModified("password")) return next();
		bcrypt.hash(user.password, null, null, function(error, hash){
			if(error) return next(error);
			user.password = hash;
			next();
		});
	});

	UserSchema.methods.comparePassword = function(pass){
		var user = this;
		return bcrypt.compareSync(pass, user.password);
	}

	return mongoose.model("User", UserSchema);
}
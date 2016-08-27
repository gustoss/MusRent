module.exports = function (app) {
    var mongoose = require("mongoose"),
        Schema = mongoose.Schema;

    var groupSchema = new Schema({
        groupName: {type: String, require: true},
        phones: [{phone: String}],
        emails: [{email: String}],
        description: String,
        members: [{
            name: {type: String, require: true},
            instrument: {type: String, require: true},
            description: String
        }],
        packages: [{
            amount: Number,
            musics: [{name: String, url: String}]
        }],
        place: [{
            estate: {type: String, require: true},
            city: {type: String, require: true}
        }],
        wherePlay: [{place: String}],
        about: {type: Schema.Types.ObjectId, ref: "About"}
    });

    return mongoose.model("Group", groupSchema);
}
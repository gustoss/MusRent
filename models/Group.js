module.exports = function (app) {
    var mongoose = require("mongoose"),
        Schema = mongoose.Schema;

    var groupSchema = new Schema({
        name: {type: String, require: true},
        phones: [{
            number: {type: String, require: true},
            name: {type: String, require: true}
        }],
        emails: [{
            email: {type: String, require: true},
             name: {type: String, require: true}
        }],
        description: String,
        other: String,
        members: [{
            name: {type: String, require: true},
            instrument: {type: String, require: true},
            description: String
        }],
        packages: [{
            name: String,
            amount: Number,
            musics: [{
                name: String,
                urls: [{url: String}]
            }]
        }],
        places: [{
            estate: {id: Number, nome: String},
            city: {id: Number, nome: String}
        }],
        wherePlay: [{place: String, id: Number}],
        about: {type: Schema.Types.ObjectId, ref: "About"}
    });

    return mongoose.model("Group", groupSchema);
}
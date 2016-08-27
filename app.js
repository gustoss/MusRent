var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    load = require("express-load"),
    mongoose = require("mongoose")
    app = express();


var port = process.env.PORT || 5000;
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

load("models")
.then("config")
.then("util")
.then("controllers")
.then("routes")
.into(app);

mongoose.connect(app.config.database);

app.use(function(req, res) {
    res.status(404);
});

app.listen(port, function(){
    console.log("The is running!");
    console.log("localhost:" + port);
}); 
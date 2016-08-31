module.exports = function (app) {
	var ctrl = app.controllers.siteCtrl,
		router = require("express").Router();

	router.get("/", ctrl.getHome);
	router.get("/favicon.ico", ctrl.getFavicon);

	app.use(app.config.pathWeb, router);
}
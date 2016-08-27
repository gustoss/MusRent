module.exports = function (app) {
	var controllers = app.controllers.siteController,
		router = require("express").Router();
	router.get("", controllers.getHome);
	router.get("favicon.ico", controllers.getFavicon);

	app.use(app.config.pathWeb, router);
}
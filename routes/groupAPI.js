module.exports = function (app) {
	var controllers = app.controllers.groupAPIController,
		router = require("express").Router();

	router.get("/", controllers.getGroups);
	router.get("/estate", controllers.getEstate);
	router.get("/city/:id", controllers.getCity)

	app.use(app.config.pathApi, router);
}
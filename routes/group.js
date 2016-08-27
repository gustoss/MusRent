module.exports = function (app) {
	var ctrl = app.controllers.groupCtrl,
		ctrlAuth = app.controllers.authGroupCtrl,
		security = app.controllers.security,
		router = require("express").Router();

	router.get("", ctrl.getGroups);
	router.get("/:id", ctrl.getGroup);
	router.get("/check/:username", ctrl.checkUser);
	router.post("", ctrl.postGroup);
	router.post("/login", security.login);
	//Rotas protegidas por token
	router.use(security.checkToken);
	router.get("/my/group", ctrlAuth.getGroup);

	app.use(app.config.pathApi + "/user", router);
}
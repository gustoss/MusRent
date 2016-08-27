module.exports = function(app){
    var ctrl = app.controllers.datasCtrl,
        router = require("express").Router();
    
    router.get("/estate", ctrl.getEstate);
	router.get("/city/:id", ctrl.getCity);
    router.get("/places", ctrl.getPlaces);

    app.use(app.config.pathApi + "/datas", router);
}
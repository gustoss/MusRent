module.exports = function (app) {
	var controller = {
		getGroups: function(request, response){
			app.models.Group.find({}, "name type wherePlay place packages", function (error, groups) {
		        if(error) 
		            response.status(500).json({ success: false, message: "Não pode pegar os grupos."});
		        else response.send(groups);
		    });
		},
		getEstate: function(request, response){
			response.send(app.util.Estate.estados);
		},
		getCity: function(request, response){
			response.send(app.util.City.estados[request.params.id]);
		}
	};
	return controller;
}
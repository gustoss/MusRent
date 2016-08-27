/**
 * Dados de uso geral, dados que o sistema precisa para funcionar
 */
module.exports = function (app) {
    var controller = {
        getEstate: function(request, response){
			response.send(app.util.Estate.estados);
		},
		getCity: function(request, response){
			response.send(app.util.City.estados[request.params.id]);
		},
        getPlaces: function(request, response) {
            response.send(app.util.Places.places);
        }
    }
    return controller;
}
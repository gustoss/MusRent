/**
 * Área de uso do site, onde manda páginas e icones
 */
module.exports = function (app) {
	var controller = {
		getHome: function(request, response){
			response.sendFile(app.config.pathPublic + "/index.html");
		},
		getFavicon: function (request, response) {
			response.end();
		}
	}
	return controller;
}
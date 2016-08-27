/**
 * Área para fazer a securança com o token
 */
module.exports = function (app) {
    jwt = require("json-web-token");
    return {
        //Valida um usuário e senha
		login: function(request, response) {
			app.models.User.findOne({ username: request.body.username }, "username password idGroup", function(error, user){
				if(error) response.status(500).json({ success: false, message: "Não pode verificar o usuário!" });
				else{
					if(user && user.comparePassword(request.body.password)){
						var datas = {
								_id: user.idGroup,
								sub: "user identify"
							};
						jwt.encode(app.config.secret, datas, function(err, token){
							if(err) response.status(500).json({ success: false, message: "Erro!" });
							else response.send(token);
						});
					}
					else{
						response.status(404).json({ success: false, message: "Usuário ou senha incorretos!" });
					}
				}
			});
		},
        checkToken: function(request, response, next){
            var token = request.body.token || request.query.token || request.headers['x-access-token'];
            if(token){
                jwt.decode(app.config.secret, token, function(err, decode){
                    if(err) response.status(500).json({ success: false, message: "Erro!" });
					else {
                        request.body.decode = decode;
                        next();
                    }
                });
            }
            else response.status(403).send({ success: false, message: "Token não fornecido." });
        }
    };
}
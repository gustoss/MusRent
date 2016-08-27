/**
 * Rotas de Grupos não protegidas.
 * Somente funções de get
 */
module.exports = function (app) {
	var controller = {
		//Pegar todos os grupos diponíveis
		getGroups: function (request, response) {
			app.models.Group.find({}, "name description wherePlay places packages", function (error, groups) {
				if (error) response.status(500).json({ success: false, message: "Não pode pegar os grupos!" });
				else response.send(groups);
			});
		},
		//Pega um grupo expecífico
		getGroup: function (request, response) {
			app.models.Group.findOne({ _id: request.params.id }, "", function (error, group) {
				if(error) response.status(500).json({ success: false, message: "Não pode pegar o grupo!" });
				else response.json(group);
			});
		},
		//Cadastra um grupo
		postGroup: function (request, response) {
			var group = request.body.group,
				userNew = request.body.user;
			app.models.User.findOne({ username: userNew.username }, "", function (error, user) {
				if (error) response.status(500).json({ success: false, message: "Não pode salva o grupo!" });
				else {
					if (user) response.status(403).json({ success: false, message: "Usuário existente!" });
					else {
						var groupModel = new app.models.Group(group);
						groupModel.save(function (err, suc) {
							if (error) response.status(500).json({ success: false, message: "Não pode salva o grupo!" });
							else {
								var userModel = new app.models.User(userNew);
								userModel.idGroup = suc._id;
								userModel.save(function (erro, suc) {
									if (erro) response.status(500).json({ success: false, message: "Não pode salva o grupo!" });
									else response.json({ success: true, message: "Grupo cadastrado!" });
								});
							}
						});
					}
				}
			});
		},
		//Verifica se um usuário específico esta disponível
		checkUser: function (request, response) {
			app.models.User.findOne({ username: request.params.username }, "username", function (error, user) {
				if (error) response.status(500).json({ success: false, message: "Não pode verificar o usuário!" });
				else {
					if (user) response.send(true);
					else response.send(false);
				}
			});
		}
	};
	return controller;
}
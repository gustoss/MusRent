module.exports = function (app) {
    return {
        getGroup: function (request, response) {
            app.models.Group.findOne({ _id: request.body.decode._id }, "", function(err, user){
                if(err) response.status(500).json({ success: false, message: "Não pode pegar os grupos!" });
                else response.send(user);
            });
        }
    };
}
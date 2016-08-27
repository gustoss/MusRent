app.service("groupService", function ($http) {
    //Pegar os lugares quer tocar
    this.saveGroup = function (infoGroup, user) {
        return $http({
            url: "http://localhost:24135/api/v1/group",
            method: "POST",
            data: { group: infoGroup, user: user }
        });
    };

    this.getGroups = function () {
        return $http({
            url: "http://localhost:24135/api/v1/group",
            method: "GET"
        });
    };

    this.getGroupRead = function (id) {
        return $http({
            url: "http://localhost:24135/api/v1/group/" + id,
            method: "GET"
        });
    };

    this.getGroup = function (id, token) {
        return $http({
            url: "http://localhost:24135/api/v1/auth/" + id,
            method: "GET",
            headers: { "x-access-token": token }
        });
    };

    this.update = function (infoGroup, id, token) {
        return $http({
            url: "http://localhost:24135/api/v1/auth/" + id,
            method: "PUT",
            data: infoGroup,
            headers: { "x-access-token": token }
        });
    };

    this.getEstate = function () {
        return $http({
            url: "http://localhost:24135/api/v1/estate",
            method: "GET"
        });
    };

    this.getCity = function (id) {
        return $http({
            url: "http://localhost:24135/api/v1/city/" + id,
            method: "GET"
        });
    };
});
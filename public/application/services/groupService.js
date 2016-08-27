angular.module("groupService", [])
.service("groupAPI", function ($http) {
    this.checkUser  = function (username) {
        return $http({
            url: "http://localhost:5000/api/v1/user/check/" + username,
            method: "GET"
        });
    }

    this.saveGroup = function (infoGroup, user) {
        return $http({
            url: "http://localhost:5000/api/v1/user",
            method: "POST",
            data: { group: infoGroup, user: user }
        });
    };

    this.getGroups = function () {
        return $http({
            url: "http://localhost:5000/api/v1/user",
            method: "GET"
        });
    };

    this.getGroup = function (id) {
        return $http({
            url: "http://localhost:5000/api/v1/user/" + id,
            method: "GET"
        });
    };

    this.update = function (infoGroup, id) {
        return $http({
            url: "http://localhost:5000/api/v1/user/" + id,
            method: "PUT",
            data: infoGroup
        });
    };
});
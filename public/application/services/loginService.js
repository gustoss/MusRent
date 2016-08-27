app.service("loginService", function ($http) {
    this.login = function (user) {
        return $http({
            url: "http://localhost:24135/api/v1/group/login/",
            method: "POST",
            data: user
        });
    };
});
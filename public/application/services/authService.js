angular.module("authService", [])
.factory("authToken", function ($window) {
    return {
        getToken: function () {
            return $window.localStorage.getItem("token");
        },
        setToken: function (token) {
            if(token) $window.localStorage.setItem("token", token);
            else $window.localStorage.removeItem("token");
        }
    }
})
.service("auth", function ($http, authToken) {
    this.login = function (user) {
        return $http({
            url: "http://"+$location.host()+"/api/v1/user/login/",
            method: "POST",
            data: user
        })
        .success(function (token) {
            authToken.setToken(token);
            token = undefined;
        });
    }

    this.logout = function () {
        authToken.setToken();
    }

    this.isLoggedIn = function () {
        return authToken.getToken() ? true : false;
    }

    this.getUser = function () {
        return $http({
            url: "http://"+$location.host()+"/api/v1/user/my/group",
            method: "GET"
        });
    }
})
.factory("authInterceptor", function(authToken, $location, $q){
    return {
        request: function(config){
            var token = authToken.getToken();
            if(token) config.headers["x-access-token"] = token;
            return config;
        },
        responseError: function(response){
            if(response.status == 403){
                authToken.setToken();
                $location.path("/")
            }
            return $q.reject(response);
        }
    };
});
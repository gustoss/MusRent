angular.module("datasService", [])
.service("datasAPI", function($http, $location) {
    this.getEstate = function () {
        return $http({
            url: "http://"+$location.host()+"/api/v1/datas/estate",
            method: "GET"
        });
    }

    this.getCity = function (id) {
        return $http({
            url: "http://"+$location.host()+"/api/v1/datas/city/" + id,
            method: "GET"
        });
    }

    this.getWherePlay = function () {
        return $http({
            url: "http://"+$location.host()+"/api/v1/datas/places",
            method: "GET"
        });
    }
});
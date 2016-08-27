app.controller("showInfoController", function ($scope, $rootScope, $routeParams, groupAPI) {
    $rootScope.description = "";

    groupAPI.getGroup()
    .success(function(group){
        console.log(group);
        $scope.group = group;
        $rootScope.description = $scope.group.name;
    })
    .error(function(error){

    });
    
    //Definir o titulo da página atual
    $rootScope.title = "Home";
});
app.controller("showInfoController", function ($scope, $rootScope, $routeParams, groupService) {
    $rootScope.description = "";

    groupService.getGroupRead($routeParams.id)
    .success(function(group){
        $scope.group = group;
        $rootScope.description = $scope.group.name;
    })
    .error(function(error){

    });
    
    //Definir o titulo da página atual
    $rootScope.title = "Home";
});
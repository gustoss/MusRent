app.controller("homeController", function ($scope, $rootScope, $location, groupService, $uibModal) {
    //Definir o titulo da página atual
    $rootScope.title = "Home";
    $rootScope.description = "Página inicial";

    groupService.getGroups()
    .success(function (groups) {
        $scope.groups = groups;
    })
    .error(function (error) {
        
    });

    //Função vai para showInfo com o id
    $scope.goGroup = function (id) {
        $location.path("/info/" + id);
    };
});
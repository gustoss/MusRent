app.controller("editController", function ($scope, $rootScope, auth, $location) {
    $scope.currentPackage = 0;
    $scope.editedName = "";

    var runPage = function () {
        $rootScope.infoGroup.packages.push({ name: "Teste 1"});
        $scope.package = $rootScope.infoGroup.packages[$scope.currentPackage];
    }

    if(!$rootScope.infoGroup)
    {
        auth.getUser()
        .success(function (group) {
            $rootScope.infoGroup = group;
            runPage();
        })
        .error(function (error) {
            $location.path("/home");
        });
    }
    else
    {
        runPage();
    }

    $scope.$on("$locationChangeStart", function (event, next, current) {
        alert("Deseja salvar esse pacote antes de sair?");
        var answer = confirm("Are you sure you want to leave this page?");
        if(!answer) event.preventDefault();
    });

    //Abilita para fazer a edição do nome do pacote atual
    $scope.editName = function () {
        $scope.editNamePackage = true;
        $scope.editedName = "";
    }

    //Salva o nome do pacote atual
    $scope.saveName = function () {
        $scope.editNamePackage = false;
        if($scope.editedName !== ""){
            $scope.package.name = $scope.editedName;
        }
    }

    //Remover um pacote da lista de pacotes
    $scope.removePackage = function(){
        $rootScope.infoGroup.packages.splice($scope.currentPackage, 1);
        $scope.currentPackage = 0;
        if($rootScope.infoGroup.packages.length > 0)
            $scope.package = $rootScope.infoGroup.packages[0];
    }

    //Adicionar um novo pacote
    $scope.addPackage = function () {
        $rootScope.infoGroup.packages.push({ name: "Pacote " + $rootScope.infoGroup.packages.length });
    }

    //Remover a música do pacote atual
    $scope.removeMusic = function (index) {
        $scope.package.musics.splice(index, 1);
    }

    //Adicionar música ao pacote atual
    $scope.addMusic = function () {
        if($scope.package.musics === undefined) $scope.package.musics = [];
        $scope.package.musics.push({});
    }

    //Mudar o pacote atual
    $scope.changePackage = function (index) {
        $scope.package = $rootScope.infoGroup.packages[index];
        $scope.currentPackage = index;
        //$scope.$apply();
    }
});
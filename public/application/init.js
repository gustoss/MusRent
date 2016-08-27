//Local para inicialização das rotar da web aplication

var app = angular.module("MUSRENT", ["ngRoute", "ui.bootstrap", "checklist-model", "ui.mask", "ngAnimate"]);

app.config(function ($routeProvider) 
{
    $routeProvider
    .when("/home", { templateUrl: "application/views/home.html", controller: "homeController" })
    .when("/cadastro", { templateUrl: "application/views/cadastro.html", controller: "cadastroController" })
    .when("/info/:id", { templateUrl: "application/views/showInfo.html", controller: "showInfoController"})
    .when("/edit", { templateUrl: "application/views/edit.html", controller: "cadastroController"});;

    $routeProvider.otherwise({ redirectTo: "/home" });
});

//O run roda toda vez que a aplicação é inicizada
app.run(function($rootScope, $location, loginService, $uibModal){

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        var publicPlaces = ["/home","/cadastro","/info"];
        var restricted = true;
        for(var index = 0; index < publicPlaces.length; index++)
        {
            restricted = $location.path().startsWith(publicPlaces[index]);
            if(restricted) break;
        }
        if (!restricted && !$rootScope.user.logged)
        {
            $rootScope.open("Negado!", "Faça o login para poder editar as informações.", true);
            $location.path("/home");
        }
    });

    $rootScope.credential = {};
    $rootScope.user = { logged: false };

    //Função para levar o usuário para a home
    $rootScope.goHome = function () {
        $location.path("/home");
    };

    $rootScope.goCadastro = function () {
        $location.path("/cadastro");
    };

    $rootScope.goEdit = function () {
        $location.path("/edit");
    };

    $rootScope.open = function (title, body, confirm) {
        return modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "modalContent.html",
            controller: "modalContentController",
            resolve: {
                title: function () {
                    return title;
                },
                body: function () {
                    return body;
                },
                confirm: confirm
            }
        });
    };

    //Fazer o login do grupo
    $rootScope.logar = function () {
        loginService.login($rootScope.credential)
        .success(function (user) {
            $rootScope.user = {
                logged: true,
                token: user.token,
                id: user.id
            };
            $location.path("/edit");
            $rootScope.credential = {};
        })
        .error(function (error) {
            $rootScope.open("Login", "Usuário ou senha inválido!", true);
        });
    };

    //Fazer o logout do grupo
    $rootScope.logout = function () {
        $rootScope.user = {
            logged: false,
            token: "",
            id: ""
        };
        $location.path("/home");
    };
});
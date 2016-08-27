//Local para inicialização das rotar da web aplication

var app = angular.module("MUSRENT", ["ngRoute",
                                     "ui.bootstrap", 
                                     "checklist-model", 
                                     "ui.mask", 
                                     "ngAnimate",
                                     "authService",
                                     "datasService",
                                     "groupService"]);

app.config(function ($routeProvider, $httpProvider) 
{
    $httpProvider.interceptors.push("authInterceptor");

    $routeProvider
    .when("/home", { templateUrl: "application/views/home.html", controller: "homeController" })
    .when("/cadastro", { templateUrl: "application/views/cadastro.html", controller: "cadastroController" })
    .when("/info/:id", { templateUrl: "application/views/showInfo.html", controller: "showInfoController"})
    .when("/pack", { templateUrl: "application/views/pack.html", controller: "editController"});;

    $routeProvider.otherwise({ redirectTo: "/home" });
});

//O run roda toda vez que a aplicação é inicializada
app.run(function($rootScope, $location, auth, $uibModal, $anchorScroll, $document, $window){

    //Flag para a UI verificar se o usuário esta logado
    $rootScope.logged = auth.isLoggedIn;
    //Variável para verificar o template para o login
    $rootScope.loginTemplate = "loginContent.html";
    //Variável para mostrar e ocultar o collapse de config do grupo
    var col = true;
    //Função que faz o collapse de config de grupo
    $rootScope.isCollapsed = function () {
        return col;
    }
    //Função mostrar o collapse, mas vai mostrar quando o usuário estiver no topo da tela
    $rootScope.collapse = function () {
        if($window.scrollY > 120)
        {
            $location.hash('top');
            $anchorScroll();
        }
        col = !col;
    }
    //Função para ocultar o collapse quando o usuário rolar a tela
    angular.element($document).on('scroll', function(scroll){
        if(!$rootScope.isCollapsed() && $window.scrollY > 80)
        {
            col = !col;
            $rootScope.$apply();
        }
    });
    //Bloqueia o acesso do usuário não logar a parte do site, e redireciona para a home
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        var publicPlaces = ["/home","/cadastro","/info"];
        var restricted = true;
        for(var index = 0; index < publicPlaces.length; index++)
        {
            restricted = $location.path().startsWith(publicPlaces[index]);
            if(restricted) break;
        }
        if (!restricted && !auth.isLoggedIn())
        {
            $rootScope.open("Negado!", "Faça o login para poder editar as informações.", true);
            $location.path("/home");
        }
        else
        {
            $location.hash('top');
            $anchorScroll();
        }
    });

    $rootScope.credential = {};
    $rootScope.user = { logged: false };

    //Função que localiza em que tela de configuração o usuário está
    $rootScope.getWhere = function () {
        return $location.path();
    };
    //Função para levar o usuário para a home
    $rootScope.goHome = function () {
        $location.path("/home");
    };
    //Função para levar o usuário para o cadastro do grupo
    $rootScope.goCadastro = function () {
        $location.path("/cadastro");
    };
    //Função para levar o usuário para a configuração de pacotes de música
    $rootScope.goPack = function () {
        $location.path("/pack");
    };
    //Função para abrir um  modal
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
        auth.login($rootScope.credential)
        .success(function (user) {
            $location.path("/edit");
        })
        .error(function (error) {
            $rootScope.open("Login", "Usuário ou senha inválido!", true);
        });
    };

    //Fazer o logout do grupo
    $rootScope.logout = function () {
        auth.logout();
        $location.path("/home");
    };
});

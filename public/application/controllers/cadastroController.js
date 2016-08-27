app.controller("cadastroController", function ($scope, $rootScope, $location, groupService) {
    //Definir o titulo da página atual
    $rootScope.title = "Cadastro de grupo";
    $rootScope.description = "Faça o cadastro do grupo de músico no MusRest";
    $scope.alerts = [];//Alerts para avisar que ele não pode adicionar estados e cidades sem selecionar o estado ou cidades
    $scope.helpPhone = true;
    $scope.helpEmail = true;
    $scope.validUser = false;

    //Para ter o controle de qual tab está selecionada
    var currentTab = 3;
    $scope.active = currentTab;

    //Model para as informações do grupo
    $scope.infoGroup = {};
    $scope.infoGroup.groupData = [{}];
    $scope.infoGroup.wherePlay = [];
    $scope.infoGroup.phones = [{number: "", name: ""}];
    $scope.infoGroup.emails = [{email: "", name: ""}]
    $scope.user = {};

    //Model dos estados e cidades selecionado
    $scope.infoGroup.place = [];
    $scope.placeSelected = {};

    //Model para os pacotes com músicas
    $scope.infoGroup.packages = [/*{musics:[{name: ""}]}*/];

    //Verificar o password
    $scope.passwordC = "asd";

    //if Para verificar se está na tela de cadastro ou na tela de editar
    if($location.path().startsWith("/edit"))
    {
        $scope.active = currentTab;
        $rootScope.description = "Carregando...";
        groupService.getGroup($rootScope.user.id, $rootScope.user.token)
        .success(function (group) {
            var where = [];
            for(var index = 0; index < group.wherePlay.length; index++)
                where.push({id:group.wherePlay[index].id, place:group.wherePlay[index].place});
            $scope.infoGroup = group;
            $scope.infoGroup.wherePlay = where;
            console.log(group.wherePlay);
            console.log($scope.infoGroup.wherePlay);
            $rootScope.description = "Bem-vindo " + $scope.infoGroup.name;
        })
        .error(function (error) {
            $location.path("/home");
        });
        //Função de callBack para teste
        $scope.finish = function () {
            groupService.update($scope.infoGroup, $rootScope.user.id, $rootScope.user.token)
            .success(function () {
                $rootScope.open("Atualização", "O " + $scope.infoGroup.name + " foi atualizado com sucesso.", true);
            })
            .error(function () {
                $location.path("/home");
            });
        };
    }
    else
    {
        //Função para cadastrar um grupo
        $scope.finish = function () {
            console.log($scope.infoGroup);

            /*groupService.saveGroup($scope.infoGroup, $scope.user)
            .success(function () {
                $location.path("/home");
            })
            .error(function () {
                
            });*/
        };
    }

    //Verifica se o usuário já existe
    $scope.checkUser = function () {
        //------------------------------------------------------------Bater no serviço e pegar o usuário e comparar
    }

    $scope.checkPassword = function () {
        console.log($scope.passwordC);
        $scope.validPassword = $scope.user.password == $scope.passwordC;
    }

    //Model para colocar na tela todas as opções de onde gostaria de tocar
    //Pegar do service
    $scope.wherePlay = []//----------------------------------------------Bater no serviço e pegar os locais onde prefere tocar

    //Model de todo os estados
    groupService.getEstate()
    .success(function (estado) {
        $scope.getEstate = estado;
    })
    .error(function () {
        
    });

    groupService.getCity(0)
    .success(function (city) {
        $scope.getCity = city;
    })
    .error(function () {
        
    });

    //Função para adicinar telefones
    $scope.addPhone = function () {
        $scope.infoGroup.phones.push({});
    }

    //Função para adicionar telefones do grupo
    $scope.removePhone = function (index) {
        $scope.infoGroup.phones.splice(index, 1);
    }

    //Função para adicinar telefones
    $scope.addEmail = function () {
        $scope.infoGroup.emails.push({});
    }

    //Função para adicionar e-mail do grupo
    $scope.removeEmail = function (index) {
        $scope.infoGroup.emails.splice(index, 1);
    }

    //Função para adicionar os locais selecionado na lista de locais que o grupo toda
    $scope.addPlace = function () {
        if($scope.placeSelected.estate == undefined || $scope.placeSelected.city == undefined)
            $scope.alerts.push({ type: "warning", msg: "Selecione um Estado e uma Cidade"})
        else
        {
            $scope.infoGroup.place.push(JSON.parse(JSON.stringify($scope.placeSelected)));
        }    
    }

    //Função para remover os locais selecionado da lista
    $scope.removeCity = function (index) {
        $scope.infoGroup.place.splice(index, 1);
    }

    //Função para adicionar mais integrantes
    $scope.addIntegrant = function () {
        $scope.infoGroup.groupData.push({});
    }

    //Função para remover um integrantes
    $scope.removeIntegrant = function (index) {
        $scope.infoGroup.groupData.splice(index, 1);
    }

    //Função para buscar as cidades de um estado selecionado
    $scope.sele = function () {
        $scope.disabledCity = true;
        groupService.getCity($scope.placeSelected.estate.id)
        .success(function (city) {
            $scope.getCity = city;
            $scope.disabledCity = false;
        })
        .error(function () {
            
        });
    }

    //Função para fechar o alert
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    }

    //Função para selecionar o grupo
    $scope.group = function (groupType) {
        var groupTotal = 0;
        switch(groupType)
        {
            case 1:
                groupTotal = 1;
                $scope.infoGroup.type = "Solo";
                break;
            case 2:
                groupTotal = 2;
                $scope.infoGroup.type = "Duos";
                break;
            case 3:
                groupTotal = 4;
                $scope.infoGroup.type = "Quarteto";
                break;
            case 4:
                groupTotal = 5;
                $scope.infoGroup.type = "Quinteto";
                break;
            case 5:
                groupTotal = 9;
                $scope.infoGroup.type = "Quinteto - Sinfônico";
                break;
            case 6:
                groupTotal = 15;
                $scope.infoGroup.type = "Quinteto - SInfônico - Coro";
                break;
        }
        $scope.infoGroup.groupData = [];
        for(var i = 0; i < groupTotal; i++)
            $scope.infoGroup.groupData.push({});
        $scope.active = (++currentTab);
    }

    //Função para adicionar música
    $scope.addMusic = function (index) {
        $scope.infoGroup.packages[index].musics.push({ name: "" });
    }

    //Função para remover música
    $scope.removeMusic = function (parentIndex, index) {
        var title = "Excluir";
        var body = "Deseja mesmo remover essa música?";

        $rootScope.open(title, body, false).result.then(function (value) {
            $scope.infoGroup.packages[parentIndex].musics.splice(index, 1);
        }, function () {//$log.info('Modal dismissed at: ' + new Date());
        });
    };

    //Função para adicionar pacotes
    $scope.addPackage = function () {
        $scope.infoGroup.packages.push({musics:[{name: ""}]});
    }

    //Função para remover pacotes
    $scope.removePackage = function (index) {
        var title = "Excluir";
        var body = "Deseja mesmo remover esse pacote?";

        $rootScope.open(title, body, false).result.then(function (value) {
            if(value) $scope.infoGroup.packages.splice(index, 1);
        }, function () {//$log.info('Modal dismissed at: ' + new Date());
        });
    }

    //Funções para fazer a navegação entre as tabs
    $scope.back = function () {
        console.log(currentTab);
        if((--currentTab) < 0) currentTab = 0;
        $scope.active = currentTab;
        console.log(currentTab);
    }

    $scope.next = function (valid) {
        if(valid)
            $scope.active = (++currentTab % 5);
    }
});
app.controller("modalContentController", function ($scope, $uibModalInstance, title, body, confirm){
    
    $scope.title= title;
    $scope.body = body;
    $scope.confirm = confirm;
    
    $scope.ok = function () {
        $uibModalInstance.close(true);
    };

    $scope.cancel = function () {
        $uibModalInstance.close(false);
    };
});
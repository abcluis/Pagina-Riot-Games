(function () {
    'use strict';

    angular
        .module('main')
        .controller('NavbarController',NavbarController);

    NavbarController.$inject = ['$scope','$uibModal','currentUser','AuthenticationService'];
    function NavbarController($scope,$uibModal,currentUser,AuthenticationService) {

        var $ctrl = this;
        if(currentUser){
            $ctrl.currentUser = JSON.parse(currentUser);
        }

        $ctrl.open = function () {
            var modalInstance = $uibModal.open({
                animation : true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy : 'modal-body',
                templateUrl : 'app/component/login/login.html',
                controller : 'LoginController',
                controllerAs : '$ctrl'
            });
            
            modalInstance.result
                .then(function () {
                    console.log("Cerrando....");
                } , function () {
                    console.log("Haz clickeado fuera");
                });
        };

        $ctrl.logOut = function () {
            AuthenticationService.clearCredentials();
        };

        $scope.showSpinner = false;

        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (toState.resolve) {
                $scope.showSpinner = true;
            }
        });
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState.resolve) {
                $scope.showSpinner = false;
            }
        });
    }


})();
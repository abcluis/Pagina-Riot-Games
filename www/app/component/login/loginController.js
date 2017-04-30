/**
 * Created by usuario1 on 4/15/2017.
 */
(function(){
    'use strict';

    angular.module('main')
        .controller('LoginController',LoginController);
    LoginController.$inject = ['$uibModalInstance','$uibModal','UserService','AuthenticationService'];
    function LoginController($uibModalInstance,$uibModal,UserService,AuthenticationService){
        var $ctrl = this;

        $ctrl.login = function () {
            UserService.valid({username: $ctrl.username , password : $ctrl.password}).$promise
                .then(function (response) {
                    AuthenticationService.setCredentials(response);
                    $uibModalInstance.dismiss();
                },function (error) {
                    if(error.status === 401){
                        $ctrl.userNotValid = 'Usuario o contraseña incorrectos'
                    }
                });
        };

        $ctrl.open = function () {
            $uibModalInstance.dismiss();

            var modalInstance = $uibModal.open({
                animation : true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy : 'modal-body',
                templateUrl : 'app/component/register/register.html',
                controller : 'RegisterController',
                controllerAs : '$ctrl'
            });

            modalInstance.result
                .then(function () {
                    console.log("Cerrando....");
                } , function () {
                    console.log("Haz clickeado fuera");
                });
        };
    }
})();
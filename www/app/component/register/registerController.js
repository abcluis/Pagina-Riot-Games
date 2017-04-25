/**
 * Created by usuario1 on 4/15/2017.
 */
(function(){
    'use strict';

    angular.module('main')
        .controller('RegisterController',RegisterController);
    RegisterController.$inject = ['$uibModalInstance','Upload','ServerInfo','SummonerService','AuthenticationService'];
    function RegisterController($uibModalInstance,Upload,ServerInfo,SummonerService,AuthenticationService){
        var $ctrl = this;

        $ctrl.save = function () {
            SummonerService.GetSummonerByName($ctrl.summoner)
                .then(function (summoner) {
                    return summoner.summonerId;
                })
                .catch(function (error) {
                    if(error.data.statusCode === 404){
                        $ctrl.summonerNotFound = "El invocador no existe";
                    }
                    console.log(error.data.statusCode);
                    throw error;
                })
                .then(function (id) {
                    Upload
                        .upload({
                            url: ServerInfo.getBaseUrl() + '/api/user/',
                            method: 'POST',
                            data: {
                                name : $ctrl.name,
                                username: $ctrl.username,
                                password: $ctrl.password,
                                summonerId : id
                            },
                            file: $ctrl.file
                        })
                .catch(function (error) {
                   if(error.status === 400){
                       $ctrl.usernameDuplicate = "El nombre de usuario ya se encuentra registrado";
                   }
                })
                .then(function (data) {
                    AuthenticationService.setCredentials(data.data);
                    $uibModalInstance.dismiss();
                })
                .catch(function (error) {
                    console.log(error);
                })
                })


        }
    }
})();
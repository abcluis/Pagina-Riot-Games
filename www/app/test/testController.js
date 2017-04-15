/**
 * Created by usuario1 on 4/15/2017.
 */
(function(){
    'use strict';

    angular.module('main')
        .controller('TestController',TestController);
    TestController.$inject = ['$scope','Upload'];
    function TestController($scope,Upload){

        $scope.submit = function () {
            Upload.upload({
                url: 'http://localhost:3000/api/user/',
                method: 'POST',
                data: {
                    username: $scope.user
                }, // Any data needed to be submitted along with the files
                file: $scope.file
            })
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }
})();
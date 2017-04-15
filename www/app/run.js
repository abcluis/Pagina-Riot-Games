/**
 * Created by usuario1 on 4/14/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .run(ChangeStateError);

    ChangeStateError.$inject = ['$rootScope'];
    function ChangeStateError($rootScope) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log(error);
        });
    }
})();

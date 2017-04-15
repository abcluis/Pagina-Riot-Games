(function () {
    'use strict';

    angular
        .module('main')
        .controller('NavbarController',NavbarController);

    NavbarController.$inject = ['$scope'];
    function NavbarController($scope) {
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
/**
 * Created by usuario1 on 4/15/2017.
 */
angular
    .module('main')
    .run(sessionControl);

sessionControl.$inject = ['$rootScope']
function sessionControl($rootScope) {
    if(!$rootScope.currentUser){
        $rootScope.currentUser = localStorage.currentUser;
    }
}
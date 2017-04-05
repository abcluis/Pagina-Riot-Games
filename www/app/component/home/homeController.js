(function(){
    'use strict';
    
    angular.module('main')
    .controller('HomeController',HomeController);
    
    HomeController.$inject = ['champions','APIConstants']
    function HomeController(champions,APIConstants){
        var $ctrl = this;
        $ctrl.rootImageUrl = APIConstants.rootImageUrl;
        console.log(champions);
        $ctrl.champions = champions;
    }
    
})();
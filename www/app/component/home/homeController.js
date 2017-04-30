(function(){
    'use strict';
    
    angular.module('main')
    .controller('HomeController',HomeController);
    
    HomeController.$inject = ['champions','DdragonConstants']
    function HomeController(champions,DdragonConstants){
        var $ctrl = this;
        $ctrl.DdragonConstants = DdragonConstants;
        $ctrl.champions = champions;
    }
    
})();
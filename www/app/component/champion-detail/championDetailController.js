(function(){
    'use strict';
    
    angular.module('main')
    .controller('ChampionDetailController',ChampionDetailController);
    ChampionDetailController.$inject = ['championLore','championSkins']; 
    function ChampionDetailController(championLore,championSkins){
        var $ctrl = this;
        $ctrl.champion = championLore;
        $ctrl.skins = championSkins.skins;
    }
})();
(function(){
    'use strict';
    
    angular.module('main')
    .controller('TopSummonerController',TopSummonerController);
    
    TopSummonerController.$inject = ['challengerList','SummonerService'];
    function TopSummonerController(challengerList,SummonerService){
        
        
        //SummonerService.GetSummonerByName("abcluis").then(function(data){console.log(data)});
        
        var $ctrl = this;
        $ctrl.challengerList = challengerList.entries;
        
        $ctrl.calculateWinRate = function(wins,losses){
            var winrateAux = (wins)/(wins+losses)*100;
            var winrate = winrateAux.toFixed(2);
            return winrate;
        }
        
        $ctrl.getColorWinRate = function(wins,losses){
            var winrate = $ctrl.calculateWinRate(wins,losses);
            return winrate>50?"text-green":winrate>30?"text-yellow":"text-red";
           
        }
        
    }
    
})();
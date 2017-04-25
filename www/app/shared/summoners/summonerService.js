(function(){
    'use strict';
    
    angular.module('main')
    .service('SummonerService',SummonerService);
    
    SummonerService.$inject = ['$http','ServerInfo']
    function SummonerService($http,ServerInfo){
        var service = this;
        
        service.GetChallengerList = GetChallengerList;
        service.GetRecentGames = GetRecentGames;
        service.GetSummonerByName = GetSummonerByName;
        
        
        
        function GetChallengerList(){
            return $http.get('https://global.api.pvp.net/api/lol/lan/v2.5/league/challenger?type=RANKED_SOLO_5x5&api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b')
                .then(function(data){
                    return data.data;   
                });
        }
        
        function GetSummonerByName(name){
            return $http.get(ServerInfo.getBaseUrl() + '/api/summoner/' + name)
                .then(function(data){
                    return data.data;   
                });
        }
        
        function GetRecentGames(name){
            return $http.get(ServerInfo.getBaseUrl() + '/api/games/' + name)
                .then(function (data) {
                    return data.data;
                });
        }

    }
    
})();
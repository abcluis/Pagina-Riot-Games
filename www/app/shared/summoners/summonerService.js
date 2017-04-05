(function(){
    'use strict';
    
    angular.module('main')
    .service('SummonerService',SummonerService);
    
    SummonerService.$inject = ['$http','base_url']
    function SummonerService($http,base_url){
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

            return $http.get(base_url+'/data/'+'luis')
                .then(function(data){
                    return data.data;   
                });
        }
        
        function GetRecentGames(name){
            console.log(name);
            return 
            GetSummonerByName(name)
            .then(function(data){
                var id;
                eval("id = data."+name+".id");
                console.log(id);
                return $http.get('https://lan.api.riotgames.com/api/lol/LAN/v1.3/game/by-summoner/'+id+'/recent?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b');
            }).then(function(data){
                console.log("Recent Games",data);
                return data.data
            });
        }
    }
    
})();
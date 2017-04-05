(function(){
    'use strict';
    
    angular.module('main')
    .service('ChampionService',ChampionService);
    
    ChampionService.$inject = ['$http','APIConstants'];
    function ChampionService($http,APIConstants){
        
        var service = this;
        service.GetAll = GetAll;
        service.GetChampionById = GetChampionById;
        
        function GetAll(){
            return $http.get(APIConstants.rootUrl+"api/lol/static-data/lan/v1.2/champion?champData=image&api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b")
                .then(
                    function(data){
                        return data.data.data;
                    },
                    function(error){
                        console.log("Algo salio mal con el ChampionService.GetAll()",error);
                    });
        }
        
        
        function GetChampionById(id,param){
            return $http.get(APIConstants.rootUrl+"api/lol/static-data/lan/v1.2/champion/"+id+"?champData="+param+"&api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b")
                .then(
            function(data){
                console.log(param,data.data);
                return data.data;
            },
            function(error){
                console.log("Algo salio mal con el GetChampionSkinsById.GetAll()",error);
            });
        }
        
    }
    
    
})();
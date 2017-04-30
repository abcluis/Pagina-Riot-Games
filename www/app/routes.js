(function(){
    'use strict';
    
    angular.module('main')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
    function RoutesConfig($stateProvider,$urlRouterProvider){
        
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('navbar',{
                absract:true,
                templateUrl:'app/shared/navbar/navbar.html',
                controller: 'NavbarController as $ctrl',
                resolve:{
                    currentUser : [function () {
                        return localStorage.currentUser;
                    }]
                }
            })
            .state('navbar.home',{
               url:'/',
                views:{
                    "":{
                        templateUrl:'app/component/home/home.html',
                        controller:'HomeController as $ctrl'
                    }
                },
                resolve:{
                    champions:['ChampionService',function(ChampionService){
                        return ChampionService.GetAll();
                    }]
                }
            })
            .state('navbar.summoner',{
                url: '/summoner/{name}',
                templateUrl : 'app/component/summoner/summoner.html',
                controller : 'SummonerController as $ctrl',
                resolve: {
                    gamesDetail: ['GameService','$stateParams','$q',function (GameService,$stateParams,$q) {
                        return GameService.getMatchListByName($stateParams.name)
                            .then(function (data) {
                                console.log(data);
                                var promises = [];
                                for(var i in data.matches){
                                    if(i>=10) break;
                                    var promise = GameService.getGameDetailById(data.matches[i].matchId);
                                    promises.push(promise);
                                }
                                return $q.all(promises)
                            })
                            .then(function (data) {
                                return data;
                            })
                            .catch(function (error) {

                                return error;
                            });
                    }],
                    summoners : ['gamesDetail','SummonerSpellService','$q',function (gamesDetail,SummonerSpellService,$q) {
                        var promises = [];
                        for(var i in gamesDetail){
                            for(var j in gamesDetail[i].participants){
                                var promise = SummonerSpellService.get({id:gamesDetail[i].participants[j].spell1Id});
                                promises.push(promise);
                                promise = SummonerSpellService.get({id:gamesDetail[i].participants[j].spell2Id});
                                promises.push(promise);
                            }
                        }
                        return $q.all(promises)
                            .then(function (data) {
                                var summoners = new Array(gamesDetail.length);
                                var count = 0;
                                for(var i in gamesDetail){
                                    summoners[i] = new Array(gamesDetail[i].participants);
                                    for(var j in gamesDetail[i].participants){
                                        summoners[i][j] = {};
                                        summoners[i][j].spell1 =  data[count];
                                        count++;
                                        summoners[i][j].spell2 =  data[count];
                                        count++;
                                    }
                                }
                                return summoners;
                            });
                    }],
                    champions : ['gamesDetail','ChampionNameService','$q',function (gamesDetail,ChampionNameService,$q) {
                        var promises = [];
                        for(var i in gamesDetail){
                            for(var j in gamesDetail[i].participants){
                                var promise = ChampionNameService.get({id:gamesDetail[i].participants[j].championId});
                                promises.push(promise);
                            }
                        }
                        return $q.all(promises)
                            .then(function (data) {
                                var champions = new Array(gamesDetail.length);
                                var count = 0;
                                for(var i in gamesDetail){
                                    champions[i] = new Array(gamesDetail[i].participants);
                                    for(var j in gamesDetail[i].participants){
                                        champions[i][j] = {};
                                        champions[i][j].champion =  data[count];
                                        count++;
                                    }
                                }
                                return champions;
                            });
                    }]
                }
            })
            .state('navbar.champion-detail',{
                url:'/champ/{id}',
                templateUrl:'app/component/champion-detail/champion-detail.html',
                controller:'ChampionDetailController as $ctrl',
                resolve:{
                    championLore:['ChampionService','$stateParams',function(ChampionService,$stateParams){
                        return ChampionService.GetChampionById($stateParams.id,"lore");
                    }],
                    championSkins:  ['ChampionService','$stateParams',function(ChampionService,$stateParams){
                        return ChampionService.GetChampionById($stateParams.id,"skins");
                    }]
                }
            })
            .state('navbar.top-summoner',{
              url:'/top-summoners',
                templateUrl:'app/component/top-summoner/top-summoner.html',
                controller:'TopSummonerController as $ctrl',
                resolve:{
                    challengerList:['SummonerService',function(SummonerService){
                        return SummonerService.GetChallengerList();
                    }]
                }
            });
        
        
        
    }
    
    
})();
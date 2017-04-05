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
            templateUrl:'app/shared/navbar/navbar.html'
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
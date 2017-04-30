(function(){
    'use strict';
    
    angular.module('main')
    .constant('APIConstants',{
        'rootUrl':'https://global.api.pvp.net/',  'rootImageUrl':'http://ddragon.leagueoflegends.com/cdn/7.5.1/img/champion/'
    })
    .constant('riot_base_url','https://global.api.pvp.net/')
    //.constant('base_url',"https://peaceful-spire-81262.herokuapp.com");
    .constant('base_url',"http://localhost:3000")
    .constant('DdragonConstants',{
        'base_url' : 'http://ddragon.leagueoflegends.com/cdn/7.8.1/',
        'img_champ_url' : 'img/champion/'
    });
})();
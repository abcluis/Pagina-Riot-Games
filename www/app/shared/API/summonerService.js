/**
 * Created by usuario1 on 4/25/2017.
 */
(function () {
    'use strict';
    
    angular
        .module('main')
        .service('SummonerServiceAPI',SummonerServiceAPI);

    SummonerServiceAPI.$inject = ['$resource','ServerInfo'];
    function SummonerServiceAPI($resource,ServerInfo) {
        return $resource(ServerInfo.getBaseUrl() + '/api/summoner/:id/id',{id: "@id"});
    }
})();
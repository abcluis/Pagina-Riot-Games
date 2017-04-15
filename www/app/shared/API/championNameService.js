/**
 * Created by usuario1 on 4/15/2017.
 */
/**
 * Created by usuario1 on 4/14/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .service('ChampionNameService',ChampionNameService);

    ChampionNameService.$inject = ['$resource','ServerInfo'];
    function ChampionNameService($resource,ServerInfo) {
        return $resource(ServerInfo.getBaseUrl() + '/api/champion/:id',{id: "@id"});
    }
})();
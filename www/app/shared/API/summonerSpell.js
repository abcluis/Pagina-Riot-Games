/**
 * Created by usuario1 on 4/14/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .service('SummonerSpellService',ItemService);

    ItemService.$inject = ['$resource','ServerInfo'];
    function ItemService($resource,ServerInfo) {
        return $resource(ServerInfo.getBaseUrl() + '/api/summoner-spell/:id',{id: "@id"});
    }
})();
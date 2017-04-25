/**
 * Created by usuario1 on 4/13/2017.
 */
angular
    .module('main')
    .service('GameService',GameService);

GameService.$inject = ['$http','ServerInfo'];
function GameService($http,ServerInfo) {
    var service = this;

    service.getGameDetailById = getGameDetailById;
    service.getMatchListByName = getMatchListByName;
    service.getMatchListById = getMatchListById;

    function getGameDetailById(id) {
        return $http.get(ServerInfo.getBaseUrl() + '/api/game-detail/' + id)
            .then(function (data) {
                return data.data;
            });
    }

    function getMatchListByName(name) {
        return $http.get(ServerInfo.getBaseUrl() + '/api/match-list/' + name + '/name')
            .then(function (data) {
                return data.data;
            });
    }
    function getMatchListById(id) {
        return $http.get(ServerInfo.getBaseUrl() + '/api/match-list/' + id)
            .then(function (data) {
                return data.data;
            });
    }
}
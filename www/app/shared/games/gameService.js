/**
 * Created by usuario1 on 4/13/2017.
 */
angular
    .module('main')
    .service('GameService',GameService);

GameService.$inject = ['$http','base_url'];
function GameService($http,base_url) {
    var service = this;

    service.getGameDetailById = getGameDetailById;
    service.getMatchListByName = getMatchListByName;

    function getGameDetailById(id) {
        return $http.get(base_url + '/api/game-detail/' + id)
            .then(function (data) {
                return data.data;
            });
    }

    function getMatchListByName(name) {
        return $http.get(base_url + '/api/match-list/' + name + '/name')
            .then(function (data) {

                return data.data;
            });
    }
}
/**
 * Created by usuario1 on 4/14/2017.
 */
angular
    .module('main')
    .service('ServerInfo',ServerInfo);

ServerInfo.$inject = ['$location'];
function ServerInfo($location) {

    var service = this;
    service.getBaseUrl = getBaseUrl;

    function getBaseUrl() {
        return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    }
}
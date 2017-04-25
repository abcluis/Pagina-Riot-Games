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
        .service('UserService',UserService);

    UserService.$inject = ['$resource','ServerInfo'];
    function UserService($resource,ServerInfo) {

        var actions = {

            'valid': {
                method: 'GET',
                url: '/api/user/:username/:password'
            }
        };

        return $resource(ServerInfo.getBaseUrl() + '/api/user/:id',{id: "@id"},actions);
    }
})();
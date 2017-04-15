/**
 * Created by usuario1 on 4/14/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .service('ItemService',ItemService);

    ItemService.$inject = ['$resource'];
    function ItemService($resource) {
        return $resource('http://localhost:3000/api/item/:id',{id: "@id"});
    }
})();
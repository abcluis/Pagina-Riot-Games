/**
 * Created by usuario1 on 4/13/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .controller('SummonerController',SummonerController);

    SummonerController.$inject = ['gamesDetail','items'];
    function SummonerController(gamesDetail,items) {
        var $ctrl = this;

        console.log("Items", items);
        $ctrl.games = gamesDetail;
        console.log(gamesDetail);

    }


})();
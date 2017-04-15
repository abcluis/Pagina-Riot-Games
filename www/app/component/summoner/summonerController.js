/**
 * Created by usuario1 on 4/13/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .controller('SummonerController',SummonerController);

    SummonerController.$inject = ['gamesDetail','summoners','champions'];
    function SummonerController(gamesDetail,summoners,champions) {
        var $ctrl = this;
        $ctrl.games = gamesDetail;
        $ctrl.summoners = summoners;
        $ctrl.champions = champions;
        console.log(gamesDetail);
    }


})();
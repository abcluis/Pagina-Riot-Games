/**
 * Created by usuario1 on 4/13/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .controller('SummonerController',SummonerController);

    SummonerController.$inject = ['gamesDetail','summoners','champions','$stateParams'];
    function SummonerController(gamesDetail,summoners,champions,$stateParams) {
        var $ctrl = this;
        $ctrl.games = gamesDetail;
        $ctrl.summoners = summoners;
        $ctrl.champions = champions;
        $ctrl.summonerName = $stateParams.name;
    }


})();
/**
 * Created by usuario1 on 4/16/2017.
 */
(function () {

    'use strict';
    angular
        .module('main')
        .component('summonerDetail',{
            templateUrl : 'app/component/summoner/summonerDetail.html',
            controller : summonerDetailController,
            bindings : {
                player : '<',
                champion : '<',
                items: '<',
                spells: '<',
                kda : '<'
            }
        });

function summonerDetailController() {
    var $ctrl = this;
}

})();
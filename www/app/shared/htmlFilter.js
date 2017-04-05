(function(){
    'use strict';
    
    angular.module('main')
    .filter("trust", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
        }
    }]);
})();
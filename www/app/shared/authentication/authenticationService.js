/**
 * Created by usuario1 on 4/17/2017.
 */
angular
    .module('main')
    .service('AuthenticationService',AuthenticationService);

AuthenticationService.$inject = ['$state','SummonerServiceAPI'];
function AuthenticationService($state,SummonerServiceAPI) {
    var service = this;

    service.setCredentials = setCredentials;
    service.clearCredentials = clearCredentials;

    function setCredentials(user) {
        console.log(SummonerServiceAPI.get({id:user.summonerId}));
        SummonerServiceAPI.get({id:user.summonerId}).$promise
            .then(function (response) {

                var userObj = {
                    username : user.username,
                    summoner : user.summonerId,
                    nameSummoner : response.name,
                    image : user.image.full
                };
                localStorage.currentUser = JSON.stringify(userObj);
                $state.reload();
            });
    }
    function clearCredentials() {
        localStorage.removeItem('currentUser');
        $state.reload();
    }
}
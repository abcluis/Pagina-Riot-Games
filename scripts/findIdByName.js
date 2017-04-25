/**
 * Created by usuario1 on 4/14/2017.
 */
var rp = require('request-promise');
var mongoose = require('mongoose');
var Summoner = mongoose.model('Summoner');

var formUrl = require('../scripts/formUrl');
var saveSummoner = require('../scripts/saveSummoner');
var constants = require('../commons/constants/constants');

module.exports = findIdByName;
function findIdByName(name){

    name = name.toLowerCase().replace(' ','');

    var promise = Summoner.findOne({"fixedName":name});


    return promise
        .then(function (summoner) {
            if(summoner){
                return summoner;
            }else{
                return saveSummonerById(name);
            }
        })
        .catch(function (error) {
            throw error;
        });
}

function saveSummonerById(name) {
    var url = formUrl(constants.URL_SUMMONER_NAME,'name',name);
    var options = {
        url : url,
        json : true
    };

    return rp(options)
        .then(function (summoner) {
            return summoner[name].id;
        })
        .then(function (id) {
            url = formUrl(constants.URL_SUMMONER_ID,'id',id);
            return saveSummoner(id,Summoner,url);
        })
        .catch(function (error) {
            throw error;
        });
}
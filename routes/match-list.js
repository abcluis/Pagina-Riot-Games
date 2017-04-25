var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var MatchList = mongoose.model('MatchList');

var saveRecordCustom = require('../scripts/saveRecordCustom');
var findRecord = require('../scripts/findRecord');
var findName = require('../scripts/findIdByName');

var constants = require('../commons/constants/constants');

var handleError = require('../scripts/handleError');

app
    .route('/match-list')
    .get(getMatchList)
    .delete(deleteMatchList);

app
    .route('/match-list/:id')
    .get(getMatchListById)
    .post(postMatchListById);

app
    .route('/match-list/:name/name')
    .get(getMatchListByName);

function getMatchList(req,res) {

    var promise = MatchList.find();

    promise
        .then(function (response) {
            res.status(200).send(response);
        })
        .catch(function (error) {
            handleError(res,error);
        })
}
function deleteMatchList(req,res) {
    MatchList.remove({})
        .then(function () {
            res.status(200).send({"Success":"All matchlist removed"});
        })
        .catch(function (error) {
            handleError(res,error);
        })
}
function getMatchListById(req,res) {
    var id = req.params.id;

    var promise = findRecord(id,'summonerId',MatchList);

    promise
        .then(function (matchlist) {
            if(!matchlist){

                var date = new Date();

                date = date.setDate(date.getDate()-14);

                var url = 'https://lan.api.riotgames.com/api/lol/LAN/v2.2/matchlist/by-summoner/'+id+'?beginTime='+date+'&api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';

                return saveRecordCustom(id,MatchList,url,'summonerId');
            }else {
                return matchlist;
            }
        })
        .then(function (matchlist) {
            res.status(200).send(matchlist);
        })
        .catch(function (error) {
            handleError(res,error);
        })
}

function postMatchListById(req,res) {
    var id = req.params.id;
    var date = new Date();

    date = date.setDate(date.getDate()-14);

    var url = 'https://lan.api.riotgames.com/api/lol/LAN/v2.2/matchlist/by-summoner/'+id+'?beginTime='+date+'&api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';

    var promise = saveRecordCustom(id,MatchList,url,'summonerId');

    promise
        .then(function (matchlist) {
            res.status(201).send(matchlist);
        })
        .catch(function (error) {
            handleError(res,error);
        })

}

function getMatchListByName(req,res) {
    var name = req.params.name.toLowerCase().replace(' ','');
    var id;
    console.log(name);
    var promise = findName(name);

    promise
        .then(function (summoner) {
            id = summoner.summonerId;
            return findRecord(id,'summonerId',MatchList);
        })
        .then(function (matchlist) {
            if(!matchlist){
                var date = new Date();

                date = date.setDate(date.getDate()-14);

                var url = 'https://lan.api.riotgames.com/api/lol/LAN/v2.2/matchlist/by-summoner/'+id+'?beginTime='+date+'&api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';

                return saveRecordCustom(id,MatchList,url,'summonerId');
            }else {
                return matchlist;
            }
        })
        .then(function (matchlist) {
            res.status(200).send(matchlist);
        })
        .catch(function (error) {
            handleError(res,error);
        })
    
}

module.exports = app;
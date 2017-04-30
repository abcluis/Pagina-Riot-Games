var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var MatchList = mongoose.model('MatchList');

var saveRecordCustom = require('../scripts/saveRecordCustom');
var findRecord = require('../scripts/findRecord');
var findName = require('../scripts/findIdByName');

var revisionDate = require('../scripts/revisionDate');
var constants = require('../commons/constants/constants');

var handleError = require('../scripts/handleError');

app
    .route('/match-list')
    .get(getMatchList)
    .delete(deleteMatchList);

app
    .route('/match-list/:id')
    .get(getMatchListById);

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

    findMatchListId(id,res)
        .then(function (matchlist) {
            res.status(200).send(matchlist);
        })
        .catch(function (error) {
            handleError(res,error);
        })
}

function findMatchListId(id,res) {

    var promise = findRecord(id,'summonerId',MatchList);

    return promise
        .then(function (matchlist) {
            if(!matchlist){

                var date = new Date();

                date = date.setDate(date.getDate()-6);

                var url = 'https://lan.api.riotgames.com/api/lol/LAN/v2.2/matchlist/by-summoner/'+id+'?beginTime='+date+'&api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';

                return saveRecordCustom(id,MatchList,url,'summonerId');
            }else {
                if(revisionDate.fiveMinutesAgo(matchlist.revisionDate)){

                    return removeMatchListById(res,matchlist.summonerId);
                }else {

                    return matchlist;
                }
            }
        })
}

function removeMatchListById(res,id) {
    var promise = MatchList.remove({"summonerId": id});

    return promise
        .then(function () {
            var date = new Date();

            date = date.setDate(date.getDate()-6);

            var url = 'https://lan.api.riotgames.com/api/lol/LAN/v2.2/matchlist/by-summoner/'+id+'?beginTime='+date+'&api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';

            return saveRecordCustom(id,MatchList,url,'summonerId');
        })
        .catch(function (error) {
            handleError(res,error);
        })
}
function getMatchListByName(req,res) {
    var name = req.params.name.toLowerCase().replace(' ','');

    var promise = findName(name);

    promise
        .then(function (summoner) {
            var id = summoner.summonerId;
            return findMatchListId(id,res)
        })
        .then(function (matchlist) {
            res.status(200).send(matchlist);
        })
        .catch(function (error) {
            handleError(res,error);
        })
    
}

module.exports = app;
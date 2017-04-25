/**
 * Created by usuario1 on 4/12/2017.
 */
var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var Summoner = mongoose.model('Summoner');

var constants = require('../commons/constants/constants');
var formUrl = require('../scripts/formUrl');

var saveSummoner = require('../scripts/saveSummoner');
var findRecord = require('../scripts/findRecord');
var findIdByName = require('../scripts/findIdByName');

var handleError = require('../scripts/handleError');

app.route('/summoner')
    .get(getSummoners)
    .delete(deleteSummoner);

app.route('/summoner/:name')
    .get(getSummonerByName)
    .post(postSummonerByName);

app.route('/summoner/:id/id')
    .get(getSummonerById)
    .post(postSummonerById);

function getSummoners(req,res) {

    var promise = Summoner.find();

    promise
        .then(function (summoners) {
            res.status(200).send(summoners);
        })
        .catch(function (error) {
            res.status(400).send({'Error':'Cant get all summoners '+ error});
        })
}

function getSummonerByName(req,res) {
    var name = req.params.name.toLowerCase().replace(' ','');

    var promise = findIdByName(name);

    promise
        .then(function (summoner) {
            res.status(200).send(summoner);
        })
        .catch(function (error) {
            handleError(res,error);
        })
}

function postSummonerByName(req,res) {


    var summoner;
    var name = req.params.name.toLowerCase().replace(' ','');
    var url = 'https://lan.api.riotgames.com/api/lol/LAN/v1.4/summoner/by-name/' + name + '?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';

    rp(url)
        .then(function (data) {
            data = JSON.parse(data);
            data[name].fixedName = data[name].name.toLowerCase().replace(' ','');
            data[name].summonerId = data[name].id;
            summoner = new Summoner(data[name]);
            return summoner.save();
        })
        .then(function () {
            return Summoner.findOne({"fixedName":name});
        })
        .then(function (summoner) {
            res.status(200).send(summoner);
        })
        .catch(function (error) {
            res.status(400).send({'Error':'Cant post summoner by name '+ error});
        })
}


function deleteSummoner(req,res) {

    var promise = Summoner.remove({});

    promise
        .then(function () {
            res.status(200).send({'Success':'All summoner removed'});
        })
        .catch(function (error) {
            res.status(400).send({'Error':'Cant delete all summoners: '+ error});

        })

}

function getSummonerById(req,res) {
    var id = req.params.id;

    var promise = findSummonerById(id);

    promise
        .then(function (summoner) {
            res.status(200).send(summoner)
        })
        .catch(function (error) {
            res.status(400).send({'Error':error});
        });
}

function findSummonerById(id) {
    var promise = findRecord(id,'summonerId',Summoner);

    return promise
        .then(function (summoner) {
            if(!summoner){
                var url = formUrl(constants.URL_SUMMONER_ID,'id',id);
                return saveSummoner(id,Summoner,url);
            }else {
                return summoner;
            }
        })
        .catch(function (error) {
            return error;
        });
}

function postSummonerById(req,res) {
    var id = req.params.id;

    var promise = findSummonerById(id);

    promise
        .then(function (summoner) {
            res.status(200).send(summoner);
        })
        .catch(function (error) {
            res.status(400).send(error);
        })
}

module.exports = app;


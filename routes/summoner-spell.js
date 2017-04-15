/**
 * Created by usuario1 on 4/12/2017.
 */
var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var constants = require('../commons/constants/constants');
var formUrl = require('../scripts/formUrl');

var saveRecord = require('../scripts/saveRecord');
var findRecord = require('../scripts/findRecord');

var app = express.Router();
var SummonerSpell = mongoose.model('SummonerSpell');

app.route('/summoner-spell')
    .get(getSummonerSpells)
    .delete(deleteSummonerSpells);

app.route('/summoner-spell/:id')
    .get(getSummonerSpellById)
    .put(putSummonerSpellById)
    .post(postSummonerSpellById);

function getSummonerSpells(req,res) {
    var promise = SummonerSpell.find();

    promise
        .then(function (summonerspells) {
            res.status(200).send(summonerspells);
        })
        .catch(function (error) {
            res.status(400).send(error);
        })
}

function deleteSummonerSpells(req,res) {
    var promise = SummonerSpell.remove({});

    promise
        .then(function () {
            res.status(200).send({"Success":"All summoner spells removed"});
        })
        .catch(function (error) {
            res.status(400).send(error);
        })
}

function getSummonerSpellById(req,res) {
    var id = req.params.id;

    var promise = findAndSaveSummonerSpell(id);

    promise
        .then(function (summonerspell) {
            res.status(200).send(summonerspell);
        })
        .catch(function (error) {
            console.log(error);
            res.status(400).send(error);
        })

}

function findAndSaveSummonerSpell(id) {
    var promise = findRecord(id,'id',SummonerSpell);

    return promise
        .then(function (summonerspell) {
            if(!summonerspell){
                return saveRecord(id,SummonerSpell,formUrl(constants.URL_SUMMONER_SPELL_ID,'id',id));
            }else{
                return summonerspell;
            }
        })
}

function putSummonerSpellById(req,res){
    var id = req.params.id;
    console.log("Entra al put");
    var summonerSpellUpdate;

    var options = {
        url : 'https://global.api.riotgames.com/api/lol/static-data/LAN/v1.2/summoner-spell/'+id+'?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b',
        method : 'GET',
        json : true
    };

    rp(options)
        .then(function (data) {
            data.revisionDate = new Date();
            summonerSpellUpdate = data;
            return SummonerSpell.update({"id":id},summonerSpellUpdate);
        })
        .then(function () {
            res.status(200).send(summonerSpellUpdate);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

}
function postSummonerSpellById(req,res) {
    console.log("Entra al post");
    var id = req.params.id;
    var url = 'https://global.api.riotgames.com/api/lol/static-data/LAN/v1.2/summoner-spell/'+id+'?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';
    rp(url)
        .then(function (data) {
            data = JSON.parse(data);
            data.revisionDate = new Date();
            var summonerSpell = new SummonerSpell(data);
            return summonerSpell.save();
        })
        .then(function () {
            return SummonerSpell.find({"id":id});
        })
        .then(function (summonerspell) {
            res.status(200).send(summonerspell);
        })
        .catch(function (error) {
            res.status(400).send(error);
        })
}

module.exports = app;

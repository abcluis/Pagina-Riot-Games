/**
 * Created by usuario1 on 4/12/2017.
 */
var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var constants = require('../commons/constants/constants');

var app = express.Router();
var SummonerSpell = mongoose.model('SummonerSpell');

app.route('/summoner-spell')
    .get(getSummonerSpells)
    .delete(deleteSummonerSpells);

app.route('/summoner-spell/:id')
    .get(getSummonerSpellById)
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

    var promise = SummonerSpell.find({"id":id});

    promise
        .then(function (summonerspell) {
            if(summonerspell.length>0){
                return summonerspell;
            }else{
                var options = {
                    url : constants.ROOT_URL + '/summoner-spell/' + id,
                    method : 'POST',
                    json : true
                };
                return rp(options);
            }
        })
        .then(function (summonerspell) {
            res.status(200).send(summonerspell);
        })
        .catch(function (error) {
            res.status(400).send(error);
        })

}

function postSummonerSpellById(req,res) {
    var id = req.params.id;
    var url = 'https://global.api.riotgames.com/api/lol/static-data/LAN/v1.2/summoner-spell/'+id+'?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';
    rp(url)
        .then(function (data) {
            data = JSON.parse(data);
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

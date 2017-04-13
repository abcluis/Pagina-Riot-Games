/**
 * Created by usuario1 on 4/12/2017.
 */
var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var Summoner = mongoose.model('Summoner');

var constants = require('../commons/constants/constants');

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

    var promise = Summoner.find({"fixedName":name});

    promise
        .then(function (summoner) {
            if(summoner.length>0){
                return summoner;
            }else {
                var options = {
                    method: 'POST',
                    url : constants.ROOT_URL + '/summoner/' + name,
                    json : true
                };
                return rp(options);
            }
        })
        .then(function (summoner) {
            res.status(200).send(summoner);
        })
        .catch(function (error) {
            res.status(400).send({'Error':'Cant get summoner by name: '+ error});
        })
}

function postSummonerByName(req,res) {

    var summoner;
    var name = req.params.name.toLowerCase().replace(' ','');
    var url = 'https://lan.api.riotgames.com/api/lol/LAN/v1.4/summoner/by-name/' + name + '?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b'

    rp(url)
        .then(function (data) {
            data = JSON.parse(data);
            data[name].fixedName = data[name].name.toLowerCase().replace(' ','');
            data[name].summonerId = data[name].id;
            summoner = new Summoner(data[name]);
            return summoner.save();
        })
        .then(function () {
            return Summoner.find({"fixedName":name});
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

    var promise = Summoner.find({"summonerId":id});

    promise
        .then(function (summoner) {
            if(summoner.length>0){
                res.status(200).send(summoner);
            }else {
                var url = constants.ROOT_URL + '/summoner/' + id + '/id';

                var options = {
                    method : 'POST',
                    uri: url,
                    json:true
                };
                return rp(options);
            }
        })
        .then(function (data) {
            if(data){
                res.status(200).send(data)
            }
        })
        .catch(function (error) {
            res.status(400).send({'Error':error});
        });

}

function postSummonerById(req,res) {
    var id = req.params.id;

    var url = 'https://lan.api.riotgames.com/api/lol/LAN/v1.4/summoner/'+id+'?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b'

    rp(url)
        .then(function (data) {
            data = JSON.parse(data);
            data[id].fixedName = data[id].name.toLowerCase().replace(' ','');
            data[id].summonerId = data[id].id;
            var summoner = new Summoner(data[id]);
            return summoner.save();
        })
        .then(function () {
            return Summoner.find({"summonerId":id});
        })
        .then(function (summoner) {
            res.status(200).send(summoner);
        })
        .catch(function (error) {
            res.status(400).send(error);
        })
}

module.exports = app;


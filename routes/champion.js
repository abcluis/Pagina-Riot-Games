var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var Champion = mongoose.model('Champion');

var constants = require('../commons/constants/constants');

app.route('/champion')
    .get(getChampions)
    .delete(deleteChampions);

app.route('/champion/:id')
    .get(getChampionById)
    .post(postChampionById);

function getChampions(req,res) {
    var promise = Champion.find();

    promise
        .then(function (champions) {
            res.status(200).send(champions);
        })
        .catch(function (error) {
            res.status(400).send({"Error":error.errmsg});
        });
}

function deleteChampions(req,res) {
    var promise = Champion.remove({});

    promise
        .then(function () {
            res.status(200).send({"Success":"All champions removed"});
        })
        .catch(function (error) {
            res.status(400).send({"Error":error.errmsg});
        })
}

function getChampionById(req,res) {
    var id = req.params.id;

    var promise = Champion.findOne({"championId":id});

    promise
        .then(function (champion) {
            if(champion){
                return champion;
            }else {
                var options = {
                    method:'POST',
                    url : constants.ROOT_URL + '/champion/' + id,
                    json : true
                };
                return rp(options);
            }
        })
        .then(function (champion) {
            res.status(200).send(champion);
        })
        .catch(function (error) {
            res.status(400).send({"Error":error.errmsg});
        });
}

function postChampionById(req,res) {
    var id = req.params.id;
    var url = 'https://global.api.riotgames.com/api/lol/static-data/LAN/v1.2/champion/'+id+'?champData=all&api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';

    rp(url)
        .then(function (data) {
            data = JSON.parse(data);
            data.championId = id;
            var champion = new Champion(data);
            return champion.save();
        })
        .then(function () {
            return Champion.find({"championId":id});
        })
        .then(function (champion) {
            res.status(200).send(champion);
        })
        .catch(function (error) {
            res.status(400).send({"Error":error.errmsg});
        });
}


module.exports = app;
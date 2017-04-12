var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var RecentGames = mongoose.model('RecentGames');

app.route('/games')
    .get(getAllGames)
    .delete(deleteAllGames);

app.route('/games/:id')
    .get(getGamesById)
    .post(postGamesById)
    .delete(deleteGamesById);



function getAllGames(req,res) {
    var promise = RecentGames.find();

    promise
        .then(function (games) {
            res.status(200).send(games);
        })
        .catch(function (error) {
            res.status(400).send({"error":"Can't find games"});
        })
}

function deleteAllGames(req,res) {
    var promise = RecentGames.remove({});

    promise
        .then(function () {
            res.status(200).send({"Success":"Recent game all remove"});
        })
        .catch(function (error) {
            res.status(400).send({'Error':'dont delete all '+ error});
        });
}

function getGamesById(req,res) {
    var id = req.params.id;
    var promise = RecentGames.find({"summonerId":id});

    promise
        .then(function (games) {
            res.status(200).send(games);
        })
        .catch(function (error) {
            res.status(400).send({'Error':'Cant find games by name '+ error});
        })
}

function postGamesById(req,res) {
    var recentGames;
    var id = req.params.id;

    rp('https://lan.api.riotgames.com/api/lol/LAN/v1.3/game/by-summoner/'+id+'/recent?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b')
        .then(function (data) {
            data = JSON.parse(data);
            recentGames = new RecentGames(data);
            recentGames.save();
        })
        .then(function () {
            res.status(200).send({'success':'Recent game added'})
        })
        .catch(function (error) {
            res.status(400).send({'Error':'Cant save recent games '+ error});
        })
}

function deleteGamesById(req,res) {
    var id = req.params.id;

    var promise = RecentGames.remove({"summonerId" : id});

    promise
        .then(function () {
            res.status(200).send({"Success":"Recent game remove"});
        })
        .catch(function (error) {
            res.status(400).send({'Error':'Cant save recent games '+ error});
        })
}

module.exports = app;


var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var RecentGames = mongoose.model('RecentGames');

var revisionDate = require('../scripts/revisionDate');

//var routesSummoner = require('../routes/summoner');

var constants = require('../commons/constants/constants');

app.route('/games')
    .get(getAllGames)
    .delete(deleteAllGames);

app.route('/games/:id/id')
    .get(getGamesById)
    .post(postGamesById)
    .put(putGamesById)
    .delete(deleteGamesById);

app.route('/games/:name')
    .get(getGamesByName);


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
    var promise = RecentGames.findOne({"summonerId":id});

    promise
        .then(function (game) {
            if(game){

                var difference = (new Date() - game.revisionDate) / (1000*60);
                if(difference>3){

                    var options = {
                        url : constants.ROOT_URL + '/games/' + id + '/id',
                        method : 'PUT',
                        json : true
                    };

                    return rp(options);
                }else {
                    return game;
                }
            }else{
                var options = {
                    url : constants.ROOT_URL + '/games/' + id + '/id',
                    method : 'POST',
                    json : true
                };

                return rp(options);
            }
        })
        .then(function (game) {
            res.status(200).send(game);
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
            data.revisionDate = new Date();
            recentGames = new RecentGames(data);
            return recentGames.save();
        })
        .then(function () {
            return RecentGames.find({"summonerId":id});
        })
        .then(function (game) {
            res.status(200).send(game);
        })
        .catch(function (error) {
            res.status(400).send({'Error':'Cant save recent games '+ error});
        })
}
function putGamesById(req,res) {

    var id = req.params.id;

    var recentGamesUpdate;

    var options = {
        url : 'https://lan.api.riotgames.com/api/lol/LAN/v1.3/game/by-summoner/'+id+'/recent?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b',
        method : 'GET',
        json : true
    };
    rp(options)
        .then(function (data) {
            recentGamesUpdate = data;
            recentGamesUpdate.revisionDate = new Date();
            return RecentGames.update({"summonerId":id},recentGamesUpdate);
        })
        .then(function () {
            res.status(200).send(recentGamesUpdate);
        })
        .catch(function (error) {
            res.status(400).send(error);
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

function getGamesByName(req,res) {
    var name = req.params.name.toLowerCase().replace(' ','');

    var url = constants.ROOT_URL + '/summoner/' + name;

    rp(url)
        .then(function (data) {
            data = JSON.parse(data);
            var id = data[0].summonerId;
            var options = {
                url: constants.ROOT_URL + '/games/' + id + '/id',
                json : true
            };
            return rp(options);
        })
        .then(function (game) {
            res.status(200).send(game);
        })
        .catch(function (error) {
            res.status(400).send({"Error":error});
        });
}

module.exports = app;


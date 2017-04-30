var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var GameDetail = mongoose.model('GameDetail');


var constants = require('../commons/constants/constants');

var saveRecord = require('../scripts/saveRecord');
var findRecord = require('../scripts/findRecord');

var handleError = require('../scripts/handleError');

var url = 'https://lan.api.riotgames.com/api/lol/LAN/v2.2/match/{{id}}?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';


app.route('/game-detail')
    .get(getGameDetail)
    .delete(deleteGameDetail);

app.route('/game-detail/:id')
    .get(getGameDetailById)
    .post(postGameDetailById);

function getGameDetail(req,res) {
    var promise = GameDetail.find();

    promise
        .then(function (gamesDetails) {
            res.status(200).send(gamesDetails);
        })
        .catch(function (error) {
            handleError(res,error);
        })
}
function deleteGameDetail(req,res) {

    var promise = GameDetail.remove({});

    promise
        .then(function () {
            res.status(200).send({"Success":"All games removed"});
        })
        .catch(function (error) {
            handleError(res,error);
        })
}
function getGameDetailById(req,res) {
    var id = req.params.id;

    var promise = findRecord(id,'matchId',GameDetail);
    promise
        .then(function (gameDetail) {
            if(!gameDetail){
                return saveRecord(id,GameDetail,formUrl(url,id));
            }else {
                return gameDetail;
            }
        })
        .then(function (gameDetail) {
            res.status(200).send(gameDetail);
        })
        .catch(function (error) {
            handleError(res,error);
        })
}

function postGameDetailById(req,res) {
    var id = req.params.id;

    var options = {
        url : url,
        json : true
    };

    rp(options)
        .then(function (data) {
            var gameDetail = new GameDetail(data);
            return gameDetail.save();
        })
        .then(function () {
            return GameDetail.findOne({"matchId":id});
        })
        .then(function (gameDetail) {
            res.status(200).send(gameDetail);
        })
        .catch(function (error) {
            handleError(res,error);
        })
}


function formUrl(url,id) {
    return url.replace('{{id}}',id);
}


module.exports = app;
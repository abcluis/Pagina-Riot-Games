var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var Division = mongoose.model('Division');

app.route('/division')
    .get(getDivisions)
    .delete(deleteDivisions);

app.route('/division/:id')
    .post(postDivisionById);

function getDivisions(req,res) {
    var promise = Division.find();

    promise
        .then(function (divisions) {
            res.status(200).send(divisions);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });
}
function deleteDivisions(req,res) {

    var promise = Division.remove({});

    promise
        .then(function () {
            res.status(200).send({"Success":"All divisions removed"});
        })
        .catch(function (error) {
            res.status(400).send(error);
        })

}
function postDivisionById(req,res) {
    var id = req.params.id;

    var url = 'https://lan.api.riotgames.com/api/lol/LAN/v2.5/league/by-summoner/'+id+'/entry?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';

    rp(url)
        .then(function (data) {
            data = JSON.parse(data);
            var fixDiv = {
                summonerId : id,
                divisions : []
            };
            data[id].forEach(function (element) {
                fixDiv.divisions.push(element);
            });
            var division = new Division(fixDiv);
            return division.save();
        })
        .then(function () {
            return Division.find({"summonerId":id});
        })
        .then(function (division) {
            res.status(200).send(division);
        })
        .catch(function (error) {
            res.status(400).send(error);
        })
}

module.exports = app;
var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();

var constants = require('../commons/constants/constants');

var Item = mongoose.model('Item');

var saveRecord = require('../scripts/saveRecord');
var findRecord = require('../scripts/findRecord');

var url = 'https://global.api.riotgames.com/api/lol/static-data/LAN/v1.2/item/{{id}}?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b';

app.route('/item')
    .get(getItem)
    .delete(deleteItem);

app.route('/item/:id')
    .get(getItemById)
    .post(postItemById);

function getItem(req,res) {
    var promise = Item.find();

    promise
        .then(function (items) {
            res.status(200).send(items);
        })
        .catch(function (error) {
            res.status(error.statusCode || 400).send(error);
        });
}

function deleteItem(req,res) {
    var promise = Item.remove({});

    promise
        .then(function () {
            res.status(200).send({"Success":"All items removed"});
        })
        .catch(function (error) {
            res.status(error.statusCode).send(error);
        })
}

function getItemById(req,res) {
    var id = req.params.id;

    var promise = findRecord(id,'id',Item);

    promise
        .then(function (item) {
            if(item){
                return item;
            }else {
               return saveRecord(id,Item,formUrl(url,id));
            }
        })
        .then(function (item) {
            res.status(200).send(item);
        })
        .catch(function (error) {
            res.status(error.statusCode).send(error);
        })
}




function postItemById(req,res) {

    var id = req.params.id;
    var promise = saveRecord(id,Item,formUrl(url,id));

    promise
        .then(function (item) {
            res.status(200).send(item);
        })
        .catch(function (error) {
            res.status(error).send(error);
        });
}

function formUrl(url,id) {
    return url.replace('{{id}}',id);
}

module.exports = app;
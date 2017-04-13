var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();

var constants = require('../commons/constants/constants');

var Item = mongoose.model('Item');

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
            res.status(error.statusCode).send(error);
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

    var promise = Item.find({"itemId":id});

    promise
        .then(function (item) {
            if(item.length>0){
                return item;
            }else {
                var options = {
                    url : constants.ROOT_URL + '/item/' + id,
                    method : 'POST',
                    json : true
                };
                return rp(options);
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
    var url = 'https://global.api.riotgames.com/api/lol/static-data/LAN/v1.2/item/'+id+'?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b'

    rp(url)
        .then(function (data) {
            data = JSON.parse(data);
            data.itemId = data.id;
            console.log(data);
            var item = new Item(data);
            return item.save();
        })
        .then(function () {
            return Item.find({"itemId":id});
        })
        .then(function (item) {
            res.status(200).send(item);
        })
        .catch(function (error) {
            res.status(error.statusCode).send(error);
        });
}

module.exports = app;
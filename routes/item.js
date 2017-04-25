var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();

var constants = require('../commons/constants/constants');
var formUrl = require('../scripts/formUrl');
var handleError = require('../scripts/handleError');

var Item = mongoose.model('Item');

var saveRecord = require('../scripts/saveRecord');
var findRecord = require('../scripts/findRecord');

app.route('/item')
    .get(getItem)
    .delete(deleteItem);

app.route('/item/:id')
    .get(getItemById);

function getItem(req,res) {
    var promise = Item.find();

    promise
        .then(function (items) {
            res.status(200).send(items);
        })
        .catch(function (error) {
            handleError(res,error);
        });
}

function deleteItem(req,res) {
    var promise = Item.remove({});

    promise
        .then(function () {
            res.status(200).send({"Success":"All items removed"});
        })
        .catch(function (error) {
            handleError(res,error);
        })
}

function getItemById(req,res) {
    var id = req.params.id;

    if(isNaN(parseInt(id))){
        return handleError(res,'');
    }
    var promise = findRecord(id,'id',Item);

    promise
        .then(function (item) {
            if(item){
                return item;
            }else {
               return saveRecord(id,Item,formUrl(constants.URL_ITEM_ID,'id',id));
            }
        })
        .then(function (item) {
            res.status(200).send(item);
        })
        .catch(function (error) {
            handleError(res,error);
        })
}




module.exports = app;
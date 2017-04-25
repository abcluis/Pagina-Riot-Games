var express = require('express');
var mongoose = require('mongoose');
var rp = require('request-promise');

var app = express.Router();
var User = mongoose.model('User');

var cloudinary = require('cloudinary');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var handleError = require('../scripts/handleError');
var findRecord = require('../scripts/findRecord');

app.route('/user')
    .get(getUser)
    .post(multipartyMiddleware,postUser)
    .delete(deleteAllUser);

app.route('/user/:username/:password')
    .get(getUserValid);

app.route('/user/:username')
    .get(getUserByUsername);

function getUser(req,res) {

    var promise = User.find();

    promise
        .then(function (user) {
            res.status(200).send(user);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });

}

function postUser(req,res){

    var file = req.files.file;
    var user = req.body;
    var url = user.url;
    var promise = cloudinary.uploader.upload(file.path);

    //https://res.cloudinary.com/gleish95/image/upload/w_300,h_300,c_fit/v1492098471/ma5m7emwzm9xp513cslc.jpg

    promise
        .then(function (result) {
            console.log(result);
            var full = result.secure_url;

            var thumb = 'https://res.cloudinary.com/gleish95/image/upload/' + 'w_300,h_300,c_fill' + full.slice(full.search("/v"));
            user.image = {
                full : full,
                thumb : thumb
            };
            user.created_at = new Date();
            userSchema = new User(user);
            return userSchema.save();
        })
        .then(function () {
            res.status(200).send(user);
        })
        .catch(function (error) {
            console.log(error);
            res.status(400).send(error);
        });

}

function deleteAllUser(req,res) {
    var promise = User.remove({});

    promise
        .then(function () {
            res.status(200).send({"Success":"All user removed"});
        })
        .catch(function (error) {
            handleError(res,error);
        })
}

function getUserValid(req,res) {
    var username = req.params.username;
    var password = req.params.password;

    var promise = findRecord(username,'username',User);
    promise
        .then(function (user) {
            if(!user){
                var objeto = {
                    "message":"User no valid",
                    "statusCode":"401"
                };
                throw objeto;
            }
            if(user.username === username && user.password === password){
                return user;
            }else {
                var objeto = {
                    "message":"User no valid",
                    "statusCode":"401"
                };
                throw objeto;
            }
        })
        .then(function (user) {
            res.status(200).send(user);
        })
        .catch(function (error) {
            handleError(res,error);
        })
}

function getUserByUsername(req,res) {
    var username = req.params.username;

    var promise = User.findOne({"username":username});

    promise
        .then(function (user) {
            if(!user)
                res.status(200).send({"Oops":"El usuario no se encuentra registrado"});
            else
                res.status(200).send(user);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });
}

module.exports = app;
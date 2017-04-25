/**
 * Created by usuario1 on 4/13/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String,
    username : {type: String, unique : true},
    summonerId : Number,
    password : String,
    image : {
        full : String,
        thumb : String
    },
    created_at : Date
});

module.exports = mongoose.model('User',userSchema);
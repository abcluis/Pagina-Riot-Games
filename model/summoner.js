/**
 * Created by usuario1 on 4/12/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var summonerSchema = new Schema({
    summonerId : {type:Number, unique: true},
    name : String,
    fixedName : String,
    profileIconId: Number,
    revisionDate: Date,
    summonerLevel : Number
});


module.exports = mongoose.model('Summoner',summonerSchema)


/**
 * Created by usuario1 on 4/13/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var participant = new Schema({
    teamId : Number,
    spell1Id : Number,
    spell2Id : Number,
    championId : Number,
    highestAchievedSeasonTier : String,
    participantId : Number,
    stats: {
        winner : Boolean,
        champLevel: Number,
        item0 : Number,
        item1 : Number,
        item2 : Number,
        item3 : Number,
        item4 : Number,
        item5 : Number,
        item6 : Number,
        kills : Number,
        deaths : Number,
        assists : Number
    }
});
var participantIdentities = new Schema({
    participantId : Number,
    player: {
        summonerId : Number,
        summonerName : String,
        profileIcon : Number
    }
});

var team = new Schema({
    teamId : Number,
    winner : Boolean,
    firstBlood : Boolean,
    firstTower : Boolean,
    towerKills : Number,
    baronKills : Number,
    dragonKills: Number
});

var gameDetailSchema = new Schema({
    matchId : {type:Number, unique:true},
    region : String,
    platformId : String,
    matchMode : String,
    matchType : String,
    matchCreation : Date,
    matchDuration : Number,
    queueType : String,
    mapId : Number,
    season : String,
    matchVersion : String,
    participants : [participant],
    participantIdentities : [participantIdentities],
    teams : [team]
});

module.exports = mongoose.model('GameDetail',gameDetailSchema);
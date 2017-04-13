var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var oneDivision = new Schema({
    name : String,
    tier : String,
    queue : String,
    entries : [{
        playerOrTeamId : String,
        playerOrTeamName : String,
        division : String,
        leaguePoints : Number,
        wins : Number,
        losses : Number,
        isHotStreak : Boolean,
        isVeteran : Boolean,
        isFreshBlood : Boolean,
        isInactive : Boolean
    }]
});

var divisionSchema = new Schema({
    summonerId : {type : Number, unique : true},
    revisionDate : Date,
    divisions : [oneDivision]
});

module.exports = mongoose.model('Division',divisionSchema);
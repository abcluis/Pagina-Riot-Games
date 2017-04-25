var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var match = new Schema({
    region : String,
    platformId : String,
    matchId : Number,
    champion : Number,
    queue : String,
    season : String,
    timestamp : Date,
    lane : String,
    role : String
});

var matchSchema = new Schema({
    summonerId : {type: Number , unique: true},
    matches : [match],
    revisionDate : Date
});

module.exports = mongoose.model('MatchList',matchSchema);
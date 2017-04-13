var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spellSchema = new Schema({
    id : {type:Number, unique:true},
    name : String,
    description : String,
    summonerLevel : Number,
    key : String,
    revisionDate : Date
});

module.exports = mongoose.model('SummonerSpell',spellSchema);
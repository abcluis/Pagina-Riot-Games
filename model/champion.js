var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skin = new Schema({
    id : Number,
    name : String,
    num: Number
});

var championSchema = new Schema({
    championId : {type:String , unique:true},
    key : String,
    name : String,
    title : String,
    skins : [skin],
    lore : String,
    blurb : String,
    partype: String
});

module.exports = mongoose.model('Champion',championSchema);
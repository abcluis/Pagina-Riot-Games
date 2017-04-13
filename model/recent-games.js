var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fellowPlayer = new Schema({
    summonerId : Number,
    teamId: Number,
    championId : Number
});

var gamesSchema = new Schema({
    gameId : Number,
	invalid : Boolean,
	gameMode : String,
	gameType : String,
	subType : String,
	mapId : Number,
	teamId : Number,
	championId : Number,
	spell1 : Number,
	spell2 : Number,
	level : Number,
	ipEarned : Number,
	createDate : Number,
    fellowPlayers : [fellowPlayer],
    stats:{
        assists : Number,
        championsKilled : Number,
        goldEarned : Number,
        item0 : Number,
        item1: Number,
        item2: Number,
        item3: Number,
        item4: Number,
        item5: Number,
        item6: Number,
        doubleKills : Number,
        killingSprees : Number,
        largestCriticalStrike:Number,
        largestKillingSpree : Number,
        largestMultiKill : Number,
        level : Number,
        magicDamageDealtPlayer : Number,
        magicDamageDealtToChampions : Number,
        magicDamageTaken : Number,
        minionsKilled : Number,
        neutralMinionsKilled : Number,
        neutralMinionsKilledEnemyJungle: Number,
        neutralMinionsKilledYourJungle: Number,
        numDeaths : Number,
        physicalDamageDealtPlayer : Number,
        physicalDamageDealtToChampions : Number,
        physicalDamageTaken : Number,
        playerPosition : Number,
        playerRole: Number,
        team : Number,
        timePlayed : Number,
        totalDamageDealt : Number,
        totalDamageDealtToBuildings : Number,
        totalDamageDealtToChampions : Number,
        totalDamageTaken : Number,
        totalHeal : Number,
        totalTimeCrowdControlDealt : Number,
        totalUnitsHealed: Number,
        trueDamageDealtPlayer : Number,
        trueDamageTaken : Number,
        wardPlaced : Number,
        win : Boolean
    }
});


var recentGamesSchema = new Schema({
	summonerId : { type:Number, unique:true},
	revisionDate : Date,
	games : [gamesSchema]
});


module.exports = mongoose.model('RecentGames',recentGamesSchema);
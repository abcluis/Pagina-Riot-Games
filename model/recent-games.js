var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fellowPlayer = new Schema({
    summonerId : Number,
    teamId: Number,
    championId : Number
});

module.exports = mongoose.model('FellowPlayer',fellowPlayer);

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

module.exports = mongoose.model('Game',gamesSchema);

var recentGamesSchema = new Schema({
	summonerId : Number,
	games : [gamesSchema]
});

recentGamesSchema.pre('save', function (next) {
    var model  = mongoose.model('RecentGames');

    var rgame2 = this;
    var duplicateGames = [];

    for(var i=0;i<rgame2.games.length;i++){
        duplicateGames.push(i);
    }

    model.findOne({"summonerId":this.summonerId})
        .then(function (rgame1) {
            if(rgame1){
                for(var i=0;i<rgame1.games.length;i++){
                    for(var j=0;j<rgame2.games.length;j++){
                        if(rgame1.games[i].gameId === rgame2.games[j].gameId){
                            var index = duplicateGames.indexOf(j);
                            duplicateGames.splice(index,1);
                        }
                    }
                }

                console.log(duplicateGames);

                for(var i=0;i<duplicateGames.length;i++){
                    rgame1.games.push(rgame2.games[duplicateGames[i]]);
                }


                if(duplicateGames.length>0){
                    rgame2 = rgame1;
                    rgame1.remove(function (err) {

                    });

                    console.log("Cambios");
                    next();
                }else {
                    console.log("No cambios");
                }

            }else {
                console.log("Nuevo recentGames");
                next();
            }


        });
});

module.exports = mongoose.model('RecentGames',recentGamesSchema);
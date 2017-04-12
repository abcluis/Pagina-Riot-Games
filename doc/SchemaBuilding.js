
var recentGames = new RecentGames({
    summonerId:req.body.summonerId,
    games:[]
});
for(var i in req.body.games){
    var game = new Game({
        invalid : req.body.games[i].invalid,
        gameMode : req.body.games[i].gameMode,
        gameType : req.body.games[i].gameType,
        subType : req.body.games[i].subType,
        mapId : req.body.games[i].mapId,
        teamId : req.body.games[i].teamId,
        championId : req.body.games[i].championId,
        spell1 : req.body.games[i].spell1,
        spell2 : req.body.games[i].spell2,
        level : req.body.games[i].level,
        ipEarned : req.body.games[i].ipEarned,
        createDate : req.body.games[i].createDate,
        fellowPlayers : [],
        stats: {
            assists : req.body.games[i].stats.assists,
            championsKilled : req.body.games[i].stats.championsKilled,
            goldEarned : req.body.games[i].stats.goldEarned,
            item0 : req.body.games[i].stats.item0,
            item1: req.body.games[i].stats.item1,
            item2: req.body.games[i].stats.item2,
            item3: req.body.games[i].stats.item3,
            item4: req.body.games[i].stats.item4,
            item5: req.body.games[i].stats.item5,
            item6: req.body.games[i].stats.item6,
            doubleKills : req.body.games[i].stats.doubleKills,
            killingSprees : req.body.games[i].stats.killingSprees,
            largestCriticalStrike:req.body.games[i].stats.largestCriticalStrike,
            largestKillingSpree : req.body.games[i].stats.largestKillingSpree,
            largestMultiKill : req.body.games[i].stats.largestMultiKill,
            level : req.body.games[i].stats.level,
            magicDamageDealtPlayer : req.body.games[i].stats.magicDamageDealtPlayer,
            magicDamageDealtToChampions : req.body.games[i].stats.magicDamageDealtToChampions,
            magicDamageTaken : req.body.games[i].stats.magicDamageTaken,
            minionsKilled : req.body.games[i].stats.minionsKilled,
            neutralMinionsKilled : req.body.games[i].stats.neutralMinionsKilled,
            neutralMinionsKilledEnemyJungle: req.body.games[i].stats.neutralMinionsKilledEnemyJungle,
            neutralMinionsKilledYourJungle: req.body.games[i].stats.neutralMinionsKilledYourJungle,
            numDeaths : req.body.games[i].stats.numDeaths,
            physicalDamageDealtPlayer : req.body.games[i].stats.physicalDamageDealtPlayer,
            physicalDamageDealtToChampions : req.body.games[i].stats.physicalDamageDealtToChampions,
            physicalDamageTaken : req.body.games[i].stats.physicalDamageTaken,
            playerPosition : req.body.games[i].stats.playerPosition,
            playerRole: req.body.games[i].stats.playerRole,
            team : req.body.games[i].stats.team,
            timePlayed : req.body.games[i].stats.timePlayed,
            totalDamageDealt : req.body.games[i].stats.totalDamageDealt,
            totalDamageDealtToBuildings : req.body.games[i].stats.totalDamageDealtToBuildings,
            totalDamageDealtToChampions : req.body.games[i].stats.totalDamageDealtToChampions,
            totalDamageTaken : req.body.games[i].stats.totalDamageTaken,
            totalHeal : req.body.games[i].stats.totalHeal,
            totalTimeCrowdControlDealt : req.body.games[i].stats.totalTimeCrowdControlDealt,
            totalUnitsHealed: req.body.games[i].stats.totalUnitsHealed,
            trueDamageDealtPlayer : req.body.games[i].stats.trueDamageDealtPlayer,
            trueDamageTaken : req.body.games[i].stats.trueDamageTaken,
            wardPlaced : req.body.games[i].stats.wardPlaced,
            win : req.body.games[i].stats.win
        }
    });
    for(var j in req.body.games[i].fellowPlayers){
        var fellowPlayer = new FellowPlayer({
            summonerId : req.body.games[i].fellowPlayers[j].summonerId,
            teamId: req.body.games[i].fellowPlayers[j].teamId,
            championId : req.body.games[i].fellowPlayers[j].championId
        });
        game.fellowPlayers.push(fellowPlayer);
    }

    recentGames.games.push(game);
}
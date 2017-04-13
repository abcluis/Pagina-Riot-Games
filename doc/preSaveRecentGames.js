
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
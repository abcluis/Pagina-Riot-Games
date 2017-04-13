/**
 * Created by usuario1 on 4/12/2017.
 */

spellSchema.pre('save',function (next) {

    SummonerSpell = mongoose.model('SummonerSpell');

    spell = this;
    console.log(this);
    var dateOld;
    var dateRecent = spell.revisionDate;

    var promise = SummonerSpell.find({"id":spell.id});

    promise
        .then(function (summonerspell) {
            if(summonerspell.length>0){
                dateOld = summonerspell.revisionDate;
                //var difference = (dateRecent - dateOld) / (1000*60*60*24);
                var difference = (dateRecent - dateOld) / (1000*60);
                console.log(difference);
                if(difference>1){
                    // Se necesita actualizar
                    console.log(this);
                }else {

                }
            }else {
                // Crea un registro nuevo
                next();
            }
        })
        .catch(function (error) {
            return error;
        })

});
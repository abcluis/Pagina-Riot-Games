/**
 * Created by usuario1 on 4/14/2017.
 */

var rp = require('request-promise');

module.exports = saveRecord;
function saveRecord(id,Model,url){
    var model;

    var options = {
        url: url,
        json : true
    };

    return rp(options)
        .then(function (data) {
            model = new Model(data);
            return model.save();
        })
        .then(function () {
            return model;
        })
        .catch(function (error) {
            throw error;
        });
}
module.exports = findRecord;

function findRecord(id,fieldId,Model){

    var query = {};
    query[fieldId] = id;
    var promise = Model.findOne(query);
    return promise
        .then(function (item) {
            return item;
        })
        .catch(function (error) {
            return error;
        });
}
/**
 * Created by usuario1 on 4/15/2017.
 */
module.exports = handleError;

function handleError(res,error) {

    var code = error.statusCode || 400;
    var message = error.message || 'Bad request';

    var errorObj = {
        message : message,
        statusCode : code
    };
    res.status(code).send(errorObj)
}

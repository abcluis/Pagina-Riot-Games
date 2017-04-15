/**
 * Created by usuario1 on 4/14/2017.
 */
module.exports = formUrl;

function formUrl(url,field,value) {
    return url.replace('{{' + field + '}}',value);
}
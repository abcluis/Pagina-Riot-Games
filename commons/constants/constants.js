var port = process.env.PORT || 3000 ;

module.exports = Object.freeze({
    ROOT_URL: 'http://localhost:'+port+'/api',
    URL_SUMMONER_NAME : 'https://lan.api.riotgames.com/api/lol/LAN/v1.4/summoner/by-name/{{name}}?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b',
    URL_SUMMONER_ID : 'https://lan.api.riotgames.com/api/lol/LAN/v1.4/summoner/{{id}}?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b'
    //ROOT_URL: 'https://peaceful-spire-81262.herokuapp.com/api'
});

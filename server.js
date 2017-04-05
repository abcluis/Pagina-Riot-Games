var express = require('express');
var cors = require('cors');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var app = express();
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());
app.use(cors());

app.get('/',function (req,res) {
	const index = path.join(__dirname, 'www', 'index.html');
  	res.sendFile(index);
});

app.get('/data', function(req, res){
  request('https://lan.api.riotgames.com/api/lol/LAN/v1.3/game/by-summoner/2572369/recent?api_key=RGAPI-737702a9-d61e-4d5f-8cc4-daed40c6166b', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      
      res.send(data.games[1]);
    }
  })
});
app.listen(process.env.PORT || 3000);
console.log(process.env.PORT+"The server is now running on port 3000.");
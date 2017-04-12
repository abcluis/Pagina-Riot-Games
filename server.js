var express = require('express');
var cors = require('cors');
var path = require('path');
var request = require('request');
var rp = require('request-promise');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var methodOverride = require("method-override");
var app = express();


/*
    Models
 */
var modelRecentGames = require('./model/recent-games');
var modelSummoner = require('./model/summoner');
var modelItem = require('./model/item');
var modelChampion = require('./model/champion');
/*
    Routes
 */
var routesRecentGames = require('./routes/recent-games');
var routesSummoner = require('./routes/summoner');
var routesItem = require('./routes/item');
var routesChampion = require('./routes/champion');

var urlMongo =
    process.env.MONGODB_URI ||
    'mongodb://localhost/riot';

mongoose.connect(urlMongo);

mongoose.connection.on('connected',function () {
    console.log('Mongoose connected to riot db');
});

mongoose.connection.on('error',function (err) {
    console.error(err);
});

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(methodOverride());
app.use(cors());



app.get('/',function (req,res) {
	const index = path.join(__dirname, 'www', 'index.html');
  	res.sendFile(index);
});


app.use('/api',routesRecentGames);
app.use('/api',routesSummoner);
app.use('/api',routesItem);
app.use('/api',routesChampion);




var port = process.env.PORT || 3000;
app.listen(port);
console.log("The server is now running on port "+port);
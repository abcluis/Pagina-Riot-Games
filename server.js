var express = require('express');
var cors = require('cors');
var path = require('path');
var request = require('request');
var rp = require('request-promise');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var methodOverride = require("method-override");
var app = express();
var multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty();

var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'gleish95',
    api_key: '865324478546245',
    api_secret: '1Cjx8yG6ikVbjAHwBopR5mY2zx8'
});


/*
    Models
 */
var modelRecentGames = require('./model/recent-games');
var modelSummoner = require('./model/summoner');
var modelItem = require('./model/item');
var modelChampion = require('./model/champion');
var modelDivision = require('./model/division');
var modelSummonerSpell = require('./model/summoner-spell');
var modelUser = require('./model/user');
var modelGameDetail = require('./model/games-detail');
var modelMatchList = require('./model/match-list');
/*
    Routes
 */
var routesRecentGames = require('./routes/recent-games');
var routesSummoner = require('./routes/summoner');
var routesItem = require('./routes/item');
var routesChampion = require('./routes/champion');
var routesDivision = require('./routes/division');
var routesSummonerSpell = require('./routes/summoner-spell');
var routesUser = require('./routes/user');
var routesGameDetail = require('./routes/games-detail');
var routesMatchList = require('./routes/match-list');

var urlMongo =
    process.env.MONGODB_URI ||
    'mongodb://gleish:tec02.123@ds159330.mlab.com:59330/heroku_cwdgn98z';

mongoose.connect(urlMongo);

mongoose.connection.on('connected',function () {
    console.log('Mongoose connected to riot db');
});

mongoose.connection.on('error',function (err) {
    console.error(err);
});

app.use(logger('dev'));

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
app.use('/api',routesDivision);
app.use('/api',routesSummonerSpell);
app.use('/api',routesUser);
app.use('/api',routesGameDetail);
app.use('/api',routesMatchList);




var port = process.env.PORT || 3000;
app.listen(port);
console.log("The server is now running on port "+port);
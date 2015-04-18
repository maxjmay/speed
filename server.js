var express = require("express");
var http = require('http');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var LastFmNode = require('lastfm').LastFmNode;

var port = process.env.PORT || 3700;

require('./server/routes/speed.routes.js')(app);

// define the root directory for the client files
app.use(express.static('app/src'));

// define the directory for the lib folder
app.use('/lib', express.static('app/lib'));

//define the root directory for the client files
//app.all("/*", function (req, res, next) {
//	res.sendfile("index.html", {
//		root: __dirname + "/app/src"
//	});
//});

io.on("connection", function (socket) {
	
});

// for when not using socket.io
server.listen(port);

// when using socket.io
// var io = require('socket.io').listen(app.listen(port));

console.log("Listening on port " + port);
var express = require("express");
var https = require("https");
var http = require("http");
var url = require("url");
var fs = require("fs");


var app = express();

var options = {
  pfx: fs.readFileSync('./certs/mlappserver.pfx')
};

app.use("/",express.static(__dirname));
app.get("/", function(req, res){

});
app.get("/app", function(req, res){
	res.send("redirecciono!");
});
/*
http.createServer(app).listen(80);
*/

try{
/*
http.createServer(function(req, res){
     res.writeHead(301, {
       'Content-Type': 'text/plain', 
       'Location':'https://devcloud.dnsdynamic.com'+req.url },
     res.end('Redirecting to SSL\n') );
  }).listen(80);
*/
https.createServer(options, app).listen(443);
}catch(e){
	console.log(e);
}

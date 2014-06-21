var express = require("express");
var https = require("https");
var http = require("http");
var url = require("url");
var fs = require("fs");
//var querystring = require("querystring");
var mercadolibre = require("mercadolibre");
var accessToken = "";
var app = express();


var mlObj = new mercadolibre.Meli(891762901822103,"sAqsXAaIvq78CtzYRSwyIBLFJZYd2vbD",null,null);//app keys from mltestuser account
var redirURI  = "https://devcloud.dnsdynamic.com/auth";


var options = {
  pfx: fs.readFileSync('./certs/mlappserver.pfx')
};

app.use("/",express.static(__dirname));
app.get("/", function(req, res){

});


function getUserInfo(){
	mlObj.get("/users/me",{access_token: accessToken}, function(error,response){
		console.log(error);
		console.log(response.last_name+", "+response.first_name);
	});
}


app.get("/auth", function(req,res){
	mlObj.authorize(req.query.code,redirURI, function(error,response){
		accessToken = response.access_token;
		setInterval(getUserInfo,5000);//ejecuta la funcion getUserInfo cada 5 segs
		res.redirect("https://devcloud.dnsdynamic.com");
	});

});

app.get("/notifs", function(req,res){
	console.log(req.query);
});
app.get("/dashboard", function(req,res){
	
});

app.get("/ingresar", function(req,res){

	var red = mlObj.getAuthURL(redirURI);

	res.send(red);	

	});
	


https.createServer(options, app).listen(443);

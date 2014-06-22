var express = require("express");
var https = require("https");
var http = require("http");
var url = require("url");
var fs = require("fs");
var mysql = require("mysql");
var mercadolibre = require("mercadolibre");
var accessToken = "";
var app = express();
var connqty = 0;//amount of connected clients (max)

var db = mysql.createConnection({
    host: "localhost",
    user: "1",
    password:"1",
    database: "fashion"
});



db.connect(function(err){
	if(err){
		console.log(err);
	}
});

function getArticles(){
//obtiene todo los articulos de la empresa 002
db.query("SELECT codigoarticulo, descripcion, inventario,"+
 "activo, preciopublico, talla, color, modelo , marca FROM fashion.articulos where codigoempresa = 2; ", function(err, result){
 	if(!err){
 		//console.log(result);
 		https.get("/listarticles",{list: result}, function(respdata){

 		});
 	}else{
 		console.log("error "+err); 	
 	}
 });
};

var mlObj = new mercadolibre.Meli(891762901822103,"sAqsXAaIvq78CtzYRSwyIBLFJZYd2vbD",null,null);//app keys from mltestuser account
var redirURI  = "https://devcloud.dnsdynamic.com/auth";


var options = {
  pfx: fs.readFileSync('./certs/mlappserver.pfx')
};

app.use("/",express.static(__dirname));
app.get("/", function(req, res){

});

function retrieveDBObjects(){
	getUserInfo();
	getArticles();
}

app.get("/listarticles", function(req,res){
	//res.send(req.params.list);
});

app.get("/userinfo", function(req,res){
	getUserInfo(function(uname){
		res.send(uname);
	});


});


function getUserInfo(callback){
	mlObj.get("/users/me",{access_token: accessToken}, function(error,response){
		console.log("error!" +error);
		callback(response.last_name+", "+response.first_name);
	});
}


app.get("/auth", function(req,res){
	mlObj.authorize(req.query.code,redirURI, function(error,response){
		accessToken = response.access_token;
		//setInterval(retrieveDBObjects,5000);//ejecuta la funcion getUserInfo cada 5 segs
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

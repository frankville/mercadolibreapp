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
db.query("SELECT codigoarticulo, imagen1, descripcion, existencia, preciopublico  FROM articulos where "+
	"codigoempresa = 2 and activo= 1 "+
 " and descripcion not like 'PRUEBA'", function(err, result){
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
app.get("/status", function(req,res){
	getUserInfo(function(error, response){
		if(!error){
			res.send(response);
		}else{
			res.send(null);
		}
	});
});

function retrieveDBObjects(){
	getUserInfo();
	getArticles();
}

app.get("/categories", function(req,res){
	mlObj.get("/sites/MLA", function(error,result){
		if(!error){
			res.send(result);
		}else{
			console.log("Error en la consulta categories")
		}
	})
	//res.send(req.params.list);
});

app.get("/userinfo", function(req,res){
	getUserInfo(function(error,uname){
		if(!error){
			res.send(uname);
		}else{
			res.send(error);
		}
	});


});


function getUserInfo(callback){
	mlObj.get("/users/me", {access_token: accessToken }, function(error,response){
		if(error){
			console.log("error en getUserInfo! detalle: " +error);
		}
		console.log(response);
		callback(error, response.last_name+", "+response.first_name);
	});
}


app.get("/auth", function(req,res){
	mlObj.authorize(req.query.code,redirURI, function(error,response){
		accessToken = response.access_token;
		console.log(accessToken);
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

	res.redirect(red);	

});
	


https.createServer(options, app).listen(443);

$(document).ready(function()
{


});

function ingresar(){

$.get("/ingresar", function(data){
	console.log(data);
	window.location.href = data;
	$.get("/userinfo", function(resp){
		console.log("user: "+resp);
	});

});
};

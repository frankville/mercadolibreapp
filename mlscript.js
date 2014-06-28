$(document).ready(function()
{
	$.get("/status", function(resp){
		if(resp){
			showStatusPanel("En linea! con nombre de usuario: "+resp);
		}else{
			showLoginPanel();
		}
	});

});

function ingresar(){

$.get("/ingresar", function(data){

});
};

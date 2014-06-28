$(document).ready(function(){

	$("#boton").click(function(event){
		event.preventDefault();
		ingresar();
	})
});
/*
function showUserName(name){
	$("#alertpanel").removeClass("alert-info");
	$("#alertpanel").addClass("alert-success");
	$("#alertpanel").text("tu nombre de usuario es "+name);
}

*/

function hideAllPanels(){

	$("#loginPan").fadeOut("fast", function(){
		$("#statusPan").fadeOut("fast");
	})
}

function showStatusPanel(msg){
	hideAllPanels();
	$("#statusPan").text(msg);
	$("#statusPan").fadeIn("fast");
}

function showLoginPanel(){
	hideAllPanels();
	$("#loginPan").fadeIn("fast");

}
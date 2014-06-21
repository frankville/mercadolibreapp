$(document).ready(function(){
	$("#boton").click(function(event){
		event.preventDefault();
		ingresar();
	})
});
function showUserName(name){
	$("#alertpanel").removeClass("alert-info");
	$("#alertpanel").addClass("alert-success");
	$("#alertpanel").text("tu nombre de usuario es "+name);

}
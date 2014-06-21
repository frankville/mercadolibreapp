$(document).ready(function()
{
	/*
		MELI.init({client_id: app_id
});

MELI.init({client_id: app_id,
    xauth_protocol: "https://",
	xauth_domain: "secure.mlstatic.com",
	xd_url: "/org-img/sdk/xd-1.0.4.html"
});
})
*/

});

function ingresar(){
/*
	MELI.login(function(){
		MELI.get("/users/me",null, function(data){
			showUserName(JSON.stringify(data[2]));
			console.log("valor "+JSON.stringify(data[2]));
		});
	});
*/
$.get("/ingresar", function(data){
	console.log(data);
	window.location.href = data;
	//redireccionar
			//showUserName(data);
});
};

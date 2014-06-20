var app_id = 6784136706596646;
$(document).ready(function()
{
	/*
		MELI.init({client_id: app_id
});
*/
MELI.init({client_id: app_id,
    xauth_protocol: "https://",
	xauth_domain: "secure.mlstatic.com",
	xd_url: "/org-img/sdk/xd-1.0.4.html"
});
})

function loginToML(){

	MELI.login(function(){
		MELI.get("/users/me",null, function(data){
			showUserName(JSON.stringify(data[2]));
			console.log("valor "+JSON.stringify(data[2]));
		});
	});
};

document.getElementById("myNavs").style.width = "100%";


	
	
    $.getJSON("https://api.ipgeolocation.io/ipgeo?apiKey=18443ceaaeda44f9b189c3b72ef5f18f", function(data) {
        
        
	document.getElementById("ip").innerHTML = (data.ip);
	
	document.getElementById("country").innerHTML = (data.country_name);
		
		var results = (data["time_zone"]["is_dst"]);
		
   document.getElementById("ik").innerHTML = (results);
   
   if (results == true){
	document.getElementById("myNav").style.width = "100%";
	}
	else{

	document.getElementById("myNav").style.width = "0%";
	}
		
		docalls();
		
		});
		
	function docalls(){
	
	document.getElementById("myNavs").style.width = "0%";
	
	
	}	
		

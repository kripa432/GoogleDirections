var x=28.640935,y=77.196462;
var myCenter=new google.maps.LatLng(x,y);
var map;
var loc=new Array();


var dest;
function createMarker(place) {    //to create marker for 4 nearby places in default red color
	var placeLoc = place.geometry.location;
	loc.push(placeLoc);
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', hello);
}

function callback(results, status) {	//to retrive four neaby places
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < 4; i++) {
			var place = results[i];
			createMarker(results[i]);
			
		}
	}
}

var directionsService, directionsDisplay;

function initialize()
{

	directionsService = new google.maps.DirectionsService;		
	directionsDisplay = new google.maps.DirectionsRenderer;


	var mapProp = {
		center:myCenter,			//my center has given two cordinate
		zoom:10,					//zoom level initially 10
		mapTypeId:google.maps.MapTypeId.ROADMAP   //map type is road map
	};

	map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('right-panel'));
	var marker=new google.maps.Marker({
		position:myCenter,
		icon:'greenmarker.png'		//set custom green marker
	});

	marker.setMap(map);

	//to display your postion on clicking
	var infowindow = new google.maps.InfoWindow({
		content:"Your Position "+x+" , "+y
	});

	//adding click event listner
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
	//find places nearby in 5000m range
	infowindow2 = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: myCenter,
		radius: 5000,
		type: ['store']
	}, callback);
}

//custom function to call calculate route and display function
function hello(){

	document.getElementById("googleMap").style.width="70%";
	document.getElementById("right-panel").style.width="390px";
	dest=this.position;
	calculateAndDisplayRoute(directionsService, directionsDisplay);
}






function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        //alert("calculating directions");
        directionsService.route({
          origin: myCenter,
          destination: dest,
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

      }





google.maps.event.addDomListener(window, 'load', initialize);
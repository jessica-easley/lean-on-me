var submissionResponseEl = document.querySelector("response");
var submitEl = document.querySelector("submit");

let map;
let infoWindow;
let currentPosition = { lat: 32.8203525, lng: -97.0117411 };

function addMarker(position, type) {
  console.log("ICON OPTIONS:", google.maps.SymbolPath);
  let iconUrl =
    type === "home"
      ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

  const marker = new google.maps.Marker({
    position: position,
    map: map,
    // icon: {
    //     // url: iconUrl
    // }
  });

  return marker;
}

function addPlaceMarker(place) {
  console.log("LOCATION", place.geometry.location);
  const marker = addMarker(place.geometry.location);

  google.maps.event.addListener(marker, "click", function () {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

function initMap() {
  geoFindMe();

  currentPosition = new google.maps.LatLng(32.8203525, -97.0117411);

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: currentPosition,
  });
}

function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    currentPosition = new google.maps.LatLng(latitude, longitude);
    addMarker(currentPosition, "home");
    map.panTo(currentPosition);
    console.log("POSITION:", currentPosition);

    // get search results for current area (geolocation)
    var request = {
      location: currentPosition,
      radius: 200,
      types: ["hospital", "health"], // this is where you set the map to get the hospitals and health related places
    };

    infoWindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    console.log("PLACES SERVICE", service);
    //   service.nearbySearch(request, callback);
    service.textSearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // get closest (results are ordered by proximity)
        // addPlaceMarker(results[0]);
        for (var i = 0; i < results.length; i++) {
          addPlaceMarker(results[i]);
          console.log("RESULT:", results[i]);
        }
      }
    });
  }

  function error() {
    console.log("Unable to retrieve your location");
    addMarker(currentPosition);
  }

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// function callback(results, status) {
//   console.log('PLACES API CALLBACK', status);
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//         addMarker(results[i]);
//     }
//   }
// }

// google.maps.event.addDomListener(window, "load", initialize);
window.initMap = initMap;

function showResponse(event) {
  // Prevent default action
  event.preventDefault();
  console.log(event);
  var response =
    "Thank you for your submission! We will reach out to you shortly.";
  submissionResponseEl.textContent = response;
}

// Add listener to submit element
submitEl.addEventListener("click", showResponse);

// US Doctors & Medical Professionals API

const searchBar = document.getElementById('searchBar');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '997b22db41mshdc6ae692609579bp11b2c3jsnd6daad2e662c',
		'X-RapidAPI-Host': 'us-doctors-and-medical-professionals.p.rapidapi.com'
	}
};

fetch('https://us-doctors-and-medical-professionals.p.rapidapi.com/search_npi?npi=1033112214', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

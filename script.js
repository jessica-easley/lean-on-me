let map;
const currentPosition = { lat: 32.8203525, lng: -97.0117411 };

function addMarker(position) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
    });

    marker.setMap(map);
}

function initMap() {
  geoFindMe();
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: currentPosition,
  });
}



function geoFindMe() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    currentPosition.lat = latitude; 
    currentPosition.lng = longitude;

    addMarker(currentPosition);
    map.panTo(currentPosition);
    console.log("POSITION:", currentPosition);
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

window.initMap = initMap;
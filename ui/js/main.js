var map;
var location1 = {lat: 26.8467, lng: 80.9462};
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: location1,
    zoom: 11
  });

    var marker = new google.maps.Marker({
      map: map,
      position: location1
    });
  }





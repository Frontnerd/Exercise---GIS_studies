var map = L.map('map').setView([39.75621, -104.99404], 8);


L.tileLayer('https://api.mapbox.com/styles/v1/anselmo21/cipzlyluk0019d2kmopw6aom7/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'Dark',
  accessToken: 'pk.eyJ1IjoiYW5zZWxtbzIxIiwiYSI6ImNpcHpsdnVweDAwYjlpNG0ycjU0ZnVidzEifQ.V7K2vNq83jiqf6oABlyKfA'
}).addTo(map);

// debugging the position
function onMapClick(e) {
  console.log("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);


// Geojson data

// 
var myLayer = L.geoJson().addTo(map);
myLayer.addData(geojsonFeature);
myLayer.addData(myLines);
// Adding Style
L.geoJson(myLines, {
    style: myStyle
}).addTo(map);










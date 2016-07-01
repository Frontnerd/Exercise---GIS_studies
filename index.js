var map = L.map('map').setView([39.75621, -104.99], 5);
var mapBoxLink = 'https://api.mapbox.com/styles/v1/anselmo21/cipzlyluk0019d2kmopw6aom7/tiles/256/{z}/{x}/{y}?access_token={accessToken}';
var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

L.tileLayer(mapBoxLink, {
  attribution: attribution,
  maxZoom: 10,
  id: 'Dark',
  accessToken: 'pk.eyJ1IjoiYW5zZWxtbzIxIiwiYSI6ImNpcHpsdnVweDAwYjlpNG0ycjU0ZnVidzEifQ.V7K2vNq83jiqf6oABlyKfA'
}).addTo(map);

// Geojson data
var myLayer = L.geoJson().addTo(map);
myLayer.addData(geojsonFeature);
myLayer.addData(myLines);

// Adding Style
L.geoJson(myLines, {
    style: myStyle
}).addTo(map);

// Polygons
L.geoJson(states, {
  style: function(feature) {
    switch (feature.properties.party) {
      case 'Republican': return {color: "#ff0000"};
      case 'Democrat':   return {color: "#0000ff"};
    }
  }
}).addTo(map);

// Points
var geojsonMarkerOptions = {
  radius: 18,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

L.geoJson(geojsonFeature, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  }
}).addTo(map);

// Tooltip
function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.name);
  }
}

L.geoJson(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(map);

// Filter
L.geoJson(someFeatures, {
  filter: function(feature, layer) {
    return feature.properties.show_on_map;
  }
}).addTo(map);



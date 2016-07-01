// Create Map
var map = L.map('map').setView([37.8, -96], 4);

var nightMap = 'cipzlyluk0019d2kmopw6aom7';
var physicMap = 'cipzsryl60010q7ndqx1qezth';
var mapBoxLink = 'https://api.mapbox.com/styles/v1/anselmo21/'+physicMap+'/tiles/256/{z}/{x}/{y}?access_token={accessToken}';
var attribution = 'info@frontnerd.com';

L.tileLayer(mapBoxLink, {
  attribution: attribution,
  maxZoom: 10,
  accessToken: 'pk.eyJ1IjoiYW5zZWxtbzIxIiwiYSI6ImNpcHpsdnVweDAwYjlpNG0ycjU0ZnVidzEifQ.V7K2vNq83jiqf6oABlyKfA'
}).addTo(map);

// Loading Data from geojson file
L.geoJson(statesData).addTo(map);

function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}
// Get Population density colors
function style(feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

var geojson;


// Show "onmouseover" country border and update info box
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      color: '#00f',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
    // info
    info.update(layer.feature.properties);
}


// And "mouseout" style reset and info box
function resetHighlight(e) {
  geojson.resetStyle(e.target);
  // info
  info.update();
}


// Zoom to state on "click"
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}


// Events
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

//
geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


// Info box
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
      '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
      : 'Hover over a state');
};

info.addTo(map);


// Create Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);































// Debug position
function onMapClick(e) {
  console.log("You clicked the map at " + e.latlng);
}
map.on('click', onMapClick);

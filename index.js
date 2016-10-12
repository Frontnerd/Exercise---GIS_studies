// Attribute Random colors 

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function style(LENGUA, index){
  return {
    fillColor: getRandomColor(),//getColor(feature.properties.density),
    weight: 1,
    opacity: 0.5,
    color: 'white',
    fillOpacity: 0.3
  }
}

// Highlight on hover

function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.9
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geoJ.resetStyle(e.target);
  info.update();
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });
}

// Create info box

var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>Indigenous Languages in Mexico, 1990</h4>' +
    '<b>Source: </b><a href="http://www.conabio.gob.mx/informacion/gis/">http://www.conabio.gob.mx/informacion/gis/</a><br />' +
    (props ?
    '<b>Language: </b>' + props.LENGUA1 + '<br/>' +
    '<b>Area: </b>' + props.AREA + '<br/>' +
    '<b>Perimeter: </b>' + props.PERIMETER +'<br/>'
    : 
    'Hover over a state'
    );
};


// Create Map

var map = L.map('map').setView([25, -99], 5);

var nightMap = 'cipzlyluk0019d2kmopw6aom7';
var physicMap = 'cipzsryl60010q7ndqx1qezth';
var mapBoxLink = 'https://api.mapbox.com/styles/v1/anselmo21/'+physicMap+'/tiles/256/{z}/{x}/{y}?access_token={accessToken}';
var attribution = 'info@frontnerd.com';

L.tileLayer(mapBoxLink, {
  attribution: attribution,
  maxZoom: 10,
  accessToken: 'pk.eyJ1IjoiYW5zZWxtbzIxIiwiYSI6ImNpcHpsdnVweDAwYjlpNG0ycjU0ZnVidzEifQ.V7K2vNq83jiqf6oABlyKfA'
}).addTo(map);

// Create Map
var geoJ;
var geoJ = L.geoJson(lenguas_Indigena_MX, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

info.addTo(map);



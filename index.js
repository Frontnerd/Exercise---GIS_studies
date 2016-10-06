// Create Map
var map = L.map('map').setView([25, -99], 5);

var nightMap = 'cipzlyluk0019d2kmopw6aom7';
var physicMap = 'cipzsryl60010q7ndqx1qezth';
var mapBoxLink = 'https://api.mapbox.com/styles/v1/anselmo21/'+nightMap+'/tiles/256/{z}/{x}/{y}?access_token={accessToken}';
var attribution = 'info@frontnerd.com';

L.tileLayer(mapBoxLink, {
  attribution: attribution,
  maxZoom: 10,
  accessToken: 'pk.eyJ1IjoiYW5zZWxtbzIxIiwiYSI6ImNpcHpsdnVweDAwYjlpNG0ycjU0ZnVidzEifQ.V7K2vNq83jiqf6oABlyKfA'
}).addTo(map);

// Loading Data from geojson file
L.geoJson(lenguas_Indigena_MX).addTo(map);





  //console.log(feature.properties.LENGUA1)

  // get all languages

  var Languages = [];

	lenguas_Indigena_MX[0].features.forEach(function(item){
		Languages.push(item.properties.LENGUA1);
	})
	
  // remote double items
	uniqueArray = Languages.filter(function(item, pos, self) {
		return self.indexOf(item) == pos;
	})
	
	//console.log(uniqueArray.length)

	// create random colors	
	var rgb = [];

	for(var i = 0; i < uniqueArray.length; i++){
		rgb.push(Math.floor(Math.random() * 255));
	}

	//console.log(rgb);

	function getColor(d) {
		//return d > 10 ? 'red' : 'transparent';
		return 'hsl('+ d +', 100%, 50%)';
	}





// Get Population density colors
function style(feature) {
  //console.log(feature)
  return {
    fillColor: getColor(rgb[feature]),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  };
}

var geojson;


// Show "onmouseover" country border and update info box
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: .1,
      color: 'lime',
      dashArray: '',
      fillOpacity: 1
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
geojson = L.geoJson(lenguas_Indigena_MX, {
    style: style,
    onEachFeature: onEachFeature,
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
  this._div.innerHTML = '<h4>Mexico Indigenous Languages, 1990</h4>' +  (props ?
      '<br />State: <b>' + props.NOM_ENT + '</b>'+
      '<br />Municipal: <b>' + props.NOM_MUN + '</b>'+
      '<br />Language: <b>' + props.LENGUA1 + '</b>'
      : 'Hover over a state');
};

info.addTo(map);


// Create Legend
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
    
    var div = L.DomUtil.create('div', 'info legend'),
        grades = uniqueArray,
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(rgb[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);


// Debug position
/////////////////////////////////////////////////////////////////////
function onMapClick(e) {
  console.log("You clicked the map at " + e.latlng);
}
map.on('click', onMapClick);

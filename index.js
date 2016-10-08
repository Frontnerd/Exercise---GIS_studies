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
//L.geoJson(lenguas_Indigena_MX).addTo(map);



function style(LENGUA){
  console.log(LENGUA)
  if(LENGUA.properties.LENGUA1 == 'MAYA'){
    return {
      fillColor: 'lime',//getColor(feature.properties.density),
      weight: 0,
      opacity: 1,
      color: 'red',
      fillOpacity: 0.5
    }
  } else {
    return {
      fillColor: 'blue',//getColor(feature.properties.density),
      weight: 0,
      opacity: 1,
      color: 'black',
      fillOpacity: 0.1
    } 
  }
}



console.log(lenguas_Indigena_MX)

L.geoJson(lenguas_Indigena_MX, {
  style: style,
}).addTo(map);





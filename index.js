var map = L.map('map')


L.tileLayer('https://api.mapbox.com/styles/v1/anselmo21/cipzlyluk0019d2kmopw6aom7/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'Dark',
    accessToken: 'pk.eyJ1IjoiYW5zZWxtbzIxIiwiYSI6ImNpcHpsdnVweDAwYjlpNG0ycjU0ZnVidzEifQ.V7K2vNq83jiqf6oABlyKfA'
}).addTo(map);

map.locate({setView: true, maxZoom: 16});


// on location success
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

// on location error
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

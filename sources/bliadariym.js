var mymap = L.map('mapid').setView([50.10537, 33.02859], 13);
var drawnItems = new L.FeatureGroup();
mymap.addLayer(drawnItems);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 16,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.satellite' //mapbox.satellite || mapbox.streets
}).addTo(mymap);

mymap.setZoom(14);

L.marker([50.10537, 33.02859]).addTo(mymap).addTo(drawnItems);

L.circle([50.10537, 33.02859], 50, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am a circle.").addTo(drawnItems);

var line = L.polyline([[50.09862, 33.02804], [50.09955, 33.02752], [50.102, 33.02701], [50.10272, 33.02664], [50.10342, 33.02673], [50.10431, 33.02773], [50.10519, 33.02838], [50.1051, 33.02919]]).addTo(mymap).addTo(drawnItems);
L.animatedMarker(line.getLatLngs()).addTo(mymap).bindPopup("<b>its i am!</b><br />and i run..").addTo(drawnItems).openPopup();

var arrowPolyline = L.Polyline.extend({
    addArrows: function(){
        var points = this.getLatLngs()
        for (var p = 0; p +1 < points.length; p++){

            var diffLat = points[p+1]["lat"] - points[p]["lat"]
            var diffLng = points[p+1]["lng"] - points[p]["lng"]
            var center = [points[p]["lat"] + diffLat/2,points[p]["lng"] + diffLng/2]

            var angle = 360 - (Math.atan2(diffLat, diffLng)*57.295779513082)

            var arrowM = new L.marker(center,{
                icon: new L.divIcon({
                    className : "arrowIcon",
                    iconSize: new L.Point(30,30),
                    iconAnchor: new L.Point(15,15),
                    html : "<div style = 'font-size: 20px; -webkit-transform: rotate("+ angle +"deg)'>&#10152;</div>"
                })
            }).addTo(mymap).addTo(drawnItems);
        }

    }
});

$( document ).ready(function() {
    var latlngs = [[50.10529, 33.02887], [50.10521, 33.02909]] //50.10521, 33.02909
    var polyline = new arrowPolyline(latlngs, {color: 'red'}).addTo(mymap).addTo(drawnItems);
    polyline.addArrows();

    var collection = drawnItems.toGeoJSON();

    $("#sendJSON").text(JSON.stringify(collection));

})

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
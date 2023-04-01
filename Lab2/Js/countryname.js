//  JAvascript BAsic Map Code
const okaforMapDiv = document.getElementById("okafor");
const select = document.getElementById('select');

const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
var boarders = [];
var cities = [];
var heatmaps = [];
var latlngbounds = null;
var airportMarker = null;
var internationalAirportMarker = null;
var map = null;
var directionsService = null;
var directionsRenderer = null;

function getPageData() {
    let parentDiv  = document.getElementById("OkaforObject");
    let childrenEl = parentDiv.getElementsByTagName("span");
    let data = JSON.parse(childrenEl[0].getAttribute("data"));
    cities = data.Cities
    boarders = data.CountryBoraders

    //console.log(cities)
    //console.log(boarders)

    latlngbounds = new google.maps.LatLngBounds();
    for (let i = 0; i < cities.length; i++) {
        let location = new google.maps.LatLng(cities[i].Lat, cities[i].Lng);
        heatmaps.push({ location: location, weight: cities[i].Weight },);
        latlngbounds.extend(location);
    }
    //console.log(heatmaps);
    // loop through the span elements to get the lat,lng and message
    //for (let i = 0; i < childrenEl.length;  i++) {
    //    let lat     = childrenEl[i].getAttribute("lat");
    //    let lng     = childrenEl[i].getAttribute("lng");
    //    let weight = childrenEl[i].getAttribute("weight");
    //    pointsArray.push({ lat: lat, lng: lng, weight: weight });
    //}
}



function initMap() {
    getPageData();  //  Build the location points array;
    //var directionsService  = new google.maps.DirectionsService();
    //var directionsRenderer = new google.maps.DirectionsRenderer();

    var mapOptions = {
        center: new google.maps.LatLng(cities[0].Lat, cities[0].Lng),
        zoom: 8,
        maxZoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    const infoWindow = new google.maps.InfoWindow();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(okaforMapDiv, mapOptions);
    directionsRenderer.setMap(map);

    airportMarker = new google.maps.Marker({
        position: new google.maps.LatLng(55.618, 12.656),
        map: map,
        title: "Copenhagen Airport",
        //icon: image
    });

    internationalAirportMarker = new google.maps.Marker({
        position: new google.maps.LatLng(6.233665732, -10.357331904),
        map: map,
        title: "International Airport",
        //icon: image
    });

    trainStationMarker = new google.maps.Marker({
        position: new google.maps.LatLng(55.672737, 12.564828),
        map: map,
        title: "IThe main Train station in Copenhagen",
        //icon: image
    });

    drawGeodesicPoly(airportMarker.getPosition(), internationalAirportMarker.getPosition());
    drawRoute("DRIVING");
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmaps
    });
    heatmap.setMap(map);

    for (var i = 0; i < boarders.length; i++) {
        var points = [];
        for (var j = 0; j < boarders[i].points.length; j++) {
            points.push(new google.maps.LatLng(boarders[i].points[j].Lat, boarders[i].points[j].Lng));
        }
        const boarder = new google.maps.Polygon({
            path: points,
            strokeColor: "#00FF00",
            strokeOpacity: 0.9,
            strokeWeight: 4,
            fillColor: "#00FF00",
            fillOpacity: 0.2,
        });
        boarder.setMap(map);
    }
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
}

function drawGeodesicPoly(p1, p2) {
    geodesicPoly = new google.maps.Polyline({
        strokeColor: "#CC0099",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        geodesic: true,
        map: map,
    });

    const path = [
        p1,
        p2
    ];
    geodesicPoly.setPath(path);
}

function calcRoute(start, end, mode) {
    var request = {
        origin: start,
        destination: end,
        travelMode: mode
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            console.log(result, status);
        }
    });
}

function drawRoute(mode) {
    calcRoute(airportMarker.getPosition(), trainStationMarker.getPosition(), mode)
}


select.addEventListener('change', function handleChange(event) {
    drawRoute(event.target.value)
});


window.onload = function () {
    window.initMap = initMap();
}
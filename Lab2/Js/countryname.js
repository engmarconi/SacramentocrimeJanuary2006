﻿//  JAvascript BAsic Map Code
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



function loadData(callback) {
    
    fetch("Js/CountryBorders.csv")
        .then(response => response.text())
        .then(content => {
            var countryBorader = {};
            if (content != null) {
                var lines = content.split('\n');
                for (var i = 1; i < lines.length; i++)
                {
                    var line = lines[i];
                    var fields = line.split(',');
                    if (fields.length != 4)
                        continue;

                    if (countryBorader.country != fields[3] || countryBorader.part != fields[2]) {
                        if (countryBorader.country != null)
                            boarders.push(countryBorader);

                        countryBorader =
                        {
                            country: fields[3],
                                part: fields[2],
                                points: []
                        };
                    }
                    countryBorader.points.push({
                            Lat: fields[0],
                            Lng: fields[1],
                        });
                }
            }

            fetch("Js/Cities.csv")
                .then(response => response.text())
                .then(content => {
                    if (content != null) {
                        var lines = content.split('\n');
                        for (var i = 0; i < lines.length; i++) {
                            var line = lines[i];
                            var fields = line.split(',');
                            if (fields.length != 5)
                                continue;

                            var city =
                            {
                                CityName: fields[0],
                                Lat: fields[1],
                                Lng: fields[2],
                                Country: fields[3],
                                Weight: Number(fields[4]),
                            };
                            cities.push(city);
                        }
                    }
                    callback();

                })
        })
}



function parseHeatmapAndBounds() {
    var x0 = 0, x1 = 0, y0 = 0, y1 = 0;
    for (let i = 0; i < cities.length; i++) {
        let latLng = new google.maps.LatLng(cities[i].Lat, cities[i].Lng);
        heatmaps.push({ location: latLng, weight: cities[i].Weight },);

        if (x0 == null) {
            x0 = x1 = latLng.latitude;
            y0 = y1 = latLng.longitude;
        } else {
            if (latLng.latitude > x1) x1 = latLng.latitude;
            if (latLng.latitude < x0) x0 = latLng.latitude;
            if (latLng.longitude > y1) y1 = latLng.longitude;
            if (latLng.longitude < y0) y0 = latLng.longitude;
        }
       // latlngbounds.extend(location);
    }
    latlngbounds = new google.maps.LatLngBounds()
    latlngbounds.extend(new google.maps.LatLng(x0, y0));
        latlngbounds.extend(  new google.maps.LatLng(x1, y1));
}



function initMap() {
    loadData(function () {
        parseHeatmapAndBounds();
        var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 8,
            maxZoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        const infoWindow = new google.maps.InfoWindow();
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        map = new google.maps.Map(okaforMapDiv, mapOptions);

        airportMarker = new google.maps.Marker({
            position: new google.maps.LatLng(55.618, 12.656),
            map: map,
            title: "Copenhagen Airport",
            //icon: image
        });
        latlngbounds.extend(airportMarker.getPosition());

        internationalAirportMarker = new google.maps.Marker({
            position: new google.maps.LatLng(6.233665732, -10.357331904),
            map: map,
            title: "International Airport",
            //icon: image
        });
        latlngbounds.extend(internationalAirportMarker.getPosition());

        trainStationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(55.672737, 12.564828),
            map: map,
            title: "IThe main Train station in Copenhagen",
            //icon: image
        });
        latlngbounds.extend(trainStationMarker.getPosition());


        drawGeodesicPoly(airportMarker.getPosition(), internationalAirportMarker.getPosition());
        //drawRoute("DRIVING");
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
        directionsRenderer.setMap(map);
    })
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
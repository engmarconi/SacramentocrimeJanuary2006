//  JAvascript BAsic Map Code
const okaforMapDiv         = document.getElementById("okafor");
const okafor_project_x_map = document.getElementById("okafor_projectx_map");

const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";


function buldOkaforPoint(pointsArray) {
    let parentDiv  = document.getElementById("OkaforObject");
    let childrenEl = parentDiv.getElementsByTagName("span");
    // loop through the span elements to get the lat,lng and message
    for (let i = 0; i < childrenEl.length;  i++) {
        let lat     = childrenEl[i].getAttribute("lat");
        let lng     = childrenEl[i].getAttribute("lng");
        let weight = childrenEl[i].getAttribute("weight");
        pointsArray.push({ lat: lat, lng: lng, weight: weight });
    }
}



function initMap() {
    const okafor = []; 
    buldOkaforPoint(okafor);  //  Build the location points array;
    //var directionsService  = new google.maps.DirectionsService();
    //var directionsRenderer = new google.maps.DirectionsRenderer();

    var mapOptions = {
        zoom: 8,
        maxZoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    if (okafor.length > 0) {
        mapOptions.center = new google.maps.LatLng(okafor[0].lat, okafor[0].lng);
    }
    const infoWindow   = new google.maps.InfoWindow();
    const latlngbounds = new google.maps.LatLngBounds();
    const map          = new google.maps.Map(okaforMapDiv, mapOptions);
   // directionsRenderer.setMap(map); 

    for (let i = 0; i < okafor.length; i++) {
        const data = okafor[i];
        const myLatlng = new google.maps.LatLng(data.lat, data.lng);
        const marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title,
            //icon: image
        });

        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(`<div style = 'width:200px;min-height:40px'> Lat:${data.lat}<br/>Lng:${data.lng}<br/>Weight:${data.weight}</div>`);
                infoWindow.open(map, marker);
            });
        })(marker, data);

        latlngbounds.extend(marker.position);
    }
    // var bounds = new google.maps.LatLngBounds();
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);


    //function calcRoute() {
    //    var start = "Monrovia, Liberia";
    //    var end = "Port of Harper, Liberia";
    //    var request = {
    //        origin: start,
    //        destination: end,
    //        travelMode: 'DRIVING'
    //    };
    //    directionsService.route(request, function (result, status) {
    //        if (status == 'OK') {
    //            directionsRenderer.setDirections(result);
    //        } else {
    //            console.log(result, status);
    //        }
    //    });
    //}

    //calcRoute();


    /*let planeCoordinate = [okafor[0], okafor[1]];
    const flightPath = new google.maps.Polyline({
        path: planeCoordinate,
        strokeColor: "#aaaaff",
        strokeWeight: 5,
    });

    flightPath.setMap(map);*/
}
//window.initMap = initMap(); 
//The Javascript ProjectX -- Map




function LoadMap() {
    const markers = [];
    buildMarkersPoints(markers);  // build the markers points

    var mapOptions = {
        center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
        zoom: 8,
        maxZoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    const infoWindow = new google.maps.InfoWindow();
    const latlngbounds = new google.maps.LatLngBounds();
    const map = new google.maps.Map(okafor_project_x_map, mapOptions);

    for (let i = 0; i < markers.length; i++) {
        const data = markers[i];
        const myLatlng = new google.maps.LatLng(data.lat, data.lng);
        const marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title,
            icon: image
        });

        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(`<div style = 'width:200px;min-height:40px'> ${data.title}</div>`);
                infoWindow.open(map, marker);
            });
        })(marker, data);

        latlngbounds.extend(marker.position);
    }
    // var bounds = new google.maps.LatLngBounds();
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
}


window.onload = function () {
   window.initMap = initMap();
   // window.LoadMap = LoadMap();
}
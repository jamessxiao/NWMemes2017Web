$(function() {
        
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5keXR1bmciLCJhIjoiY2owZnJ6eXY4MDJlbTJxc2F6OW81cnpzcSJ9.CwCldAdWdHqo90qFuK_WFA';

    // initialize map object
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center: [-98.420679, 55.772537], // starting position
        zoom: 3.5 // starting zoom
    });

    // collection of marker objects
    var geojson = {
        "type": "MemeCollection",
        "memes": [
            {
                "type": "Meme",
                "properties": {
                    "city": "Vancouver",
                    "iconSize": [60, 60]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -98.420679,
                        55.772537
                    ]
                }
            },
        ]
    };

    // add each marker (in geojson) to map
    geojson.memes.forEach(function(marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(public/img/marker_' + marker.properties.iconSize[0] + '.png)';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';

        el.addEventListener('click', function() {
            var accordion = document.getElementById('accordion');
            var exit = document.getElementById('exit');
            if (accordion.style.display === 'none') {
                accordion.style.display = 'block';
                exit.style.display = 'block';
            } else {
                accordion.style.display = 'none';
                exit.style.display = 'none';
            }
        });

        // add marker to map
        new mapboxgl.Marker(el, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]})
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });

    // Add geolocate button to the map.
    map.addControl(new mapboxgl.GeolocateControl());


});
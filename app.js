const map = L.map('map').setView([midpoints.lat, midpoints.lng], zoomlevel);

const tileFormat = tileFormats["light"]
// const tileFormat = tileFormats["normal"]
L.tileLayer(tileFormat, {
    minZoom: zoomlevel - 2,
    maxZoom: flyZoom,
    ext: 'png'
}).addTo(map);

// walking
const polylineWalking = L.polyline(directions, { color: fadedOrange2, weight: lineWidth }).addTo(map);
const directionsText = "Gå? Ca. 40 min (2.6km)"
polylineWalking.bindPopup(directionsText);

// to tram
const polylineTram = L.polyline(directionsToyenStasjon, { color: fadedOrange, weight: lineWidth }).addTo(map);
const directionsTextTram = "Til/fra Tøyen stasjon (10 min). Ta banen 2 stopp (til Helsfyr) til middagen."
polylineTram.bindPopup(directionsTextTram);

// tram to trewerket
const polylineHellsfyr = L.polyline(directionsHelsfyrTrewerket, { color: fadedOrange, weight: lineWidth }).addTo(map);
const directionsTextHellsfyr = "Fra Helsfyr T-banestopp til Trewerket. Ca. 10 min"
polylineHellsfyr.bindPopup(directionsTextHellsfyr);

const tram1 = L.polyline(polylineToyenToHelsfyr, { color: tbaneColors["1"], weight: lineWidth }).addTo(map).bindPopup("T-bane, Linje 1");
const tram2 = L.polyline(polylineToyenToHelsfyr, { color: tbaneColors["2"], weight: lineWidth }).addTo(map).bindPopup("T-bane, Linje 2");
const tram4 = L.polyline(polylineToyenToHelsfyr, { color: tbaneColors["4"], weight: lineWidth }).addTo(map).bindPopup("T-bane, Linje 4");
const tram5 = L.polyline(polylineToyenToHelsfyr, { color: tbaneColors["5"], weight: lineWidth }).addTo(map).bindPopup("T-bane, Linje 5");

const walkPolys = [polylineWalking, polylineTram, polylineHellsfyr];
const tramPolys = [tram1, tram2, tram4, tram5];

const parking = L.polyline(parkingPolyline, { color: parkBlue, weight: 5 })
    .addTo(map)
parking.bindPopup("Parkering langs Sofienberggata");

const tramOffset = 0.0001;
for (let i = 0; i < tramPolys.length; i++) {
    const shiftedLine = polylineToyenToHelsfyr.map(point => {
        const latOffset = tramOffset * (i - 1.5);
        const lngOffset = tramOffset * (i - 1.5);
        return [point[0] + latOffset, point[1] + lngOffset];
    });
    tramPolys[i].setLatLngs(shiftedLine);
}

const markerMiddagIcon = L.icon({
    iconUrl: locations["middag"].icon,
    iconSize: [50, 50],
})
const markerParkingIcon = L.icon({
    iconUrl: "assets/map_parking.png",
    iconSize: [30, 30],
})
const markerWeddingIcon = L.icon({
    iconUrl: locations["vielse"].icon,
    iconSize: [50, 50],
})
const markerTramIcon = L.icon({
    iconUrl: "assets/map_tbane.png",
    iconSize: [30, 30],
})

const markerWedding = L.marker([locations["vielse"].lat, locations["vielse"].lng], { icon: markerWeddingIcon })
    .addTo(map)
    .bindPopup(locations["vielse"].text);

const markerTram = L.marker([59.9143, 10.78772], { icon: markerTramIcon })
    .addTo(map)
    .bindPopup("T-bane 1, 2, 4 og 5");

const markerMiddag = L.marker([locations["middag"].lat, locations["middag"].lng], { icon: markerMiddagIcon })
    .addTo(map)
    .bindPopup(locations["middag"].text);

const markerParking = L.marker([59.92130, 10.76971], { icon: markerParkingIcon })
    .addTo(map)
    .bindPopup("Parkering langs Sofienberggata");

const markers = [
    markerMiddag,
    markerParking,
    markerWedding,
    markerTram
];

function closeMarkers() {
    markers.forEach(marker => {
        marker.closePopup();
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.dynamic-border');
    images.forEach(img => {
        const randomRadius = borderRadiusOptions[Math.floor(Math.random() * borderRadiusOptions.length)];
        img.style.borderRadius = randomRadius;
    });
});

map.on('zoomend', function () {
    const currentZoom = map.getZoom();
    const dynamicLevel = Math.floor((currentZoom - zoomlevel) / 2);
    walkPolys.forEach(walk => walk.setStyle({ weight: lineWidth + dynamicLevel }));
    tramPolys.forEach(tram => tram.setStyle({ weight: lineWidth + dynamicLevel - 2 }));
});


document.getElementById('btn-wedding').addEventListener('click', function () {
    map.flyTo(
        [locations["vielse"].lat, locations["vielse"].lng],
        flyZoom
    )
    setTimeout(function () {
        markerWedding.openPopup();
    }, flyDelay);
});

document.getElementById('btn-dinner').addEventListener('click', function () {
    map.flyTo(
        [locations["middag"].lat, locations["middag"].lng],
        flyZoom
    )
    setTimeout(function () {
        markerMiddag.openPopup();
    }, flyDelay);
});

document.getElementById('btn-parking').addEventListener('click', function () {
    map.flyTo(
        [59.92130, 10.76971],
        flyZoom
    )
    setTimeout(function () {
        markerParking.openPopup();
    }, flyDelay);
});

document.getElementById('btn-zoomout').addEventListener('click', function () {
    map.flyTo(
        [midpoints.lat, midpoints.lng],
        zoomlevel
    )
    setTimeout(function () {
        closeMarkers();
    }, flyDelay);
});

window.addEventListener('scroll', function () {
    const scroll = window.scrollY;
    const maxY = 4000;
    const minOpacity = 0.4;
    var opacity = scroll / maxY
    opacity = Math.min(minOpacity, Math.max(0.15, opacity));
    document.documentElement.style.setProperty('--scroll-opacity', opacity);
});

document.querySelector('.oscar').addEventListener('click', function () {
    var root = document.querySelector(':root');
    root.classList.add('enable-star-wars');
    setTimeout(function () {
        var audio = new Audio('assets/lightsaber.mp3');
        audio.play();
    }, 300);
    for (let i = 0; i < 3; i++) {
        const timer = i == 0 ? 1500 : 1500 + i * 400;
        setTimeout(function () {
            var audio = new Audio('assets/swing.mp3');
            audio.play();
        }, timer)
    }
    setTimeout(function () {
        root.classList.remove('enable-star-wars');
    }, 4500);
});
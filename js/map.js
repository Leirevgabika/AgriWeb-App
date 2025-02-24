
// funcion que muestra un mapa con leaflet.js en la posicion indicada
function mostrar_mapa(posicion) {
    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude;
    let nivel_zoom = 12;

    // mostrar el punto en el mapa con Leaflet.js
    var map = L.map('map').setView([latitud, longitud], nivel_zoom);

    // añadir el mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // añadir control de escala
    L.control.scale().addTo(map);
    // añadir un marcador en las coordenadas
    L.marker([latitud, longitud], { draggable: false }).addTo(map);
}

window.onload = function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrar_mapa);
    } else {
        alert("Este navegador no soporta geolocalizacion");
    }
}
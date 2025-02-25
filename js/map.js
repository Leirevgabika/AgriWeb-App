
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

async function obtener_datos_meteo(latitud, longitud) {
    const url_peticion = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,apparent_temperature,visibility,pressure_msl,uv_index,precipitation,cloudcover&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    try {
        const respuesta = await fetch(url_peticion);
        const datos = await respuesta.json();

        // Aquí puedes reorganizar los datos en el formato que prefieras

        return {
            latitud: latitud,
            longitud: longitud,
            temperaturaActual: datos.hourly.temperature_2m[0],
            humedad: datos.hourly.relativehumidity_2m[0],
            viento: datos.hourly.windspeed_10m[0],
            temperaturaMaxima: datos.daily.temperature_2m_max[0],
            temperaturaMinima: datos.daily.temperature_2m_min[0],
        };

    } catch (error) {
        console.error("Error al obtener los datos meteorológicos:", error);
        return null;
    }
}

function datos_meteo(posicion) {
    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude;

    let datos = obtener_datos_meteo(latitud, longitud);
    console.log(datos);
}

window.onload = function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrar_mapa);
        navigator.geolocation.getCurrentPosition(datos_meteo);

    } else {
        alert("Este navegador no soporta geolocalizacion");
    }
}
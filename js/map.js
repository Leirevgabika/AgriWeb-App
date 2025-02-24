
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

function meteorologia(posicion) {
    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude;
    let openweatherapi = '6dc9bbbcf420147dcedd6fc42affaa44';
    let weather_base = `http://api.openweathermap.org/data/2.5/weather?`
        + `lat=${latitud}&lon=${longitud}&appid=${openweatherapi}&units=metric&lang=es`;

    fetch(weather_base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            let temperatura = data.main.temp;
            let humedad = data.main.humidity;
            //let precipitaciones = data.current.rain;
            let viento = data.wind;
            let meteo_desc = data.weather[0].description;
            let meteo_loc = data.name + ", " + data.sys.country;
            let icono = data.weather[0].icon;

            $("#temperatura").text(`Temperatura: ${temperatura} °C`);
            $("#humedad").text(`Nivel de humedad: ${humedad}%`);
            //$("#precipitaciones").text(`Precipitaciones: ${precipitaciones}`);
            $("#viento").text(`Viento: ${viento.speed} m/s ${viento.deg}`);
            $("#meteo_loc").text(meteo_loc);
            $("#meteo_desc").text(`Situación actual: ${meteo_desc}`);
            $("#meteo_icono").html(`<img src="https://openweathermap.org/img/wn/${icono}@2x.png" style= 'height:10rem'/>`);

        });
}

window.onload = function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrar_mapa);
        navigator.geolocation.getCurrentPosition(meteorologia);
    } else {
        alert("Este navegador no soporta geolocalizacion");
    }
}
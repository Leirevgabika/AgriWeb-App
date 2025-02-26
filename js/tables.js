function obtener_datos() {
    // Coordenadas de Madrid, España
    const latitude = 40.4168;
    const longitude = -3.7038;

    // Fechas de inicio y fin (últimos 7 días)
    const startDate = '2023-10-01';
    const endDate = '2023-10-07';

    // Variables meteorológicas que deseas obtener
    const hourlyParams = 'temperature_2m,precipitation,relative_humidity_2m';

    // URL de la API
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&hourly=${hourlyParams}`;

    // Realizar la consulta
    fetch(url)
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            console.log('Datos meteorológicos:', data);
            return data;
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

$(document).ready(function () {

    $('#tabla').DataTable({
        ajax: obtener_datos(),
        columns: [
            { data: 'Temperatura actual' },
            { data: 'Precipitaciones' },
            { data: 'Humedad' }
        ]
    });
});
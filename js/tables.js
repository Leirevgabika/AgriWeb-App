$(document).ready(function () {
    $('#tabla').DataTable({
        ajax: 'datos.json',
        columns: [
            { data: 'Nombre ciudad' },
            { data: 'Temperatura actual' },
            { data: 'Condicion Meteorologica' },
            { data: 'Region' },
            { data: 'Pais' },
            { data: 'Hora' }
        ]
    });
});
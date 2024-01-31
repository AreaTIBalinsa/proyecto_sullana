import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeCajaChica').val(fechaHoy);
    $('#fechaHastaCajaChica').val(fechaHoy);
    fn_TraerPagosFechas(fechaHoy, fechaHoy);

    function fn_TraerPagosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos) {
        $.ajax({
            url: '/fn_consulta_TraerPagosFechas',
            method: 'GET',
            data:{
                fechaDesdeTraerPagos:fechaDesdeTraerPagos,
                fechaHastaTraerPagos:fechaHastaTraerPagos,
            },
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let tbodyReporteDePagos = $('#bodyReporteDePagos');
                    tbodyReporteDePagos.empty();

                    let totalPago = 0;
                    let nuevaFila = "";

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        nuevaFila = $('<tr class="bg-white editarPagos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        totalPago += parseFloat(obj.cantidadAbonoPag);
                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPagos));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.tipoAbonoPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.bancaPago));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.codigoTransferenciaPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.fechaRegistroPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.horaOperacionPag));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer">').text(obj.observacion));
                        // Agregar la nueva fila al tbody
                        tbodyReporteDePagos.append(nuevaFila);
                    });

                    if (response.length == 0) {
                        tbodyReporteDePagos.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }else{
                        nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                        nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="8">').text(""));
                        tbodyReporteDePagos.append(nuevaFila);

                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text("SALDO TOTAL:")));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text("S/. "+totalPago.toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer">').text(""));
                        // Agregar la nueva fila al tbody
                        tbodyReporteDePagos.append(nuevaFila);
                    }

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $('#filtrarCodigoPago').on('input', function() {
        let codigoFiltrar = $('#filtrarCodigoPago').val().toUpperCase(); ; // Obtiene el valor del campo de filtro

        // Mostrar todas las filas
        $('#tablaIngresos tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (codigoFiltrar) {
            $('#tablaIngresos tbody tr').each(function() {
                let codigo = $(this).find('td:eq(5)').text().toUpperCase().trim();
                if (codigo.indexOf(codigoFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    });
    
});
import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    fn_DeudaMaximaClientes();
    DataTableED('#tablaDeudaMaxima');

    function fn_DeudaMaximaClientes() {
        $.ajax({
            url: '/fn_consulta_DeudaMaximaClientes',
            method: 'GET',
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    let tbodyDeudaMaxima = $('#bodyDeudaMaxima');
                    tbodyDeudaMaxima.empty();
                    response.forEach(function(obj){
                        let limitEndeudamiento = parseFloat(obj.limitEndeudamiento);
                        let totalFormateado = limitEndeudamiento.toLocaleString('es-ES', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        }); 

                        let nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.codigoCli));
                        nuevaFila.append($('<td class="border dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalFormateado));
                        nuevaFila.append($('<td class="hidden">').text(obj.limitEndeudamiento));
                        // Agregar la nueva fila al tbody
                        tbodyDeudaMaxima.append(nuevaFila);
                    });
                }else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }

    $('.cerrarModalDeudaMaxima, #ModalDeudaMaxima .opacity-75').on('click', function (e) {
        $('#ModalDeudaMaxima').addClass('hidden');
        $('#ModalDeudaMaxima').removeClass('flex');
    });

    $(document).on("dblclick", "#tablaDeudaMaxima tbody tr", function() {
        let fila = $(this).closest('tr');
        let idCodigoCliente = fila.find('td:eq(0)').text();
        let nombreCompleto = fila.find('td:eq(1)').text();
        let montoDeuda = fila.find('td:eq(3)').text();

        $('#idCodigoClienteDeudaMaxima').attr('value', idCodigoCliente);
        $('#nombreClienteDeudaMaxima').text(nombreCompleto);
        $('#valorNuevoDeudaMaxima').val(montoDeuda);
        $('#ModalDeudaMaxima').removeClass('hidden');
        $('#ModalDeudaMaxima').addClass('flex');
        $('#valorNuevoDeudaMaxima').focus();
    });

    $('#btnDeudaMaxima').on('click', function () {
        let valorDeudaMaxima = $('#valorNuevoDeudaMaxima').val();
        let idCodigoClienteDeudaMaxima = $('#idCodigoClienteDeudaMaxima').attr('value');
        if (valorDeudaMaxima != "" && valorDeudaMaxima > 0){
            fn_ActualizarDeudaMaxima(valorDeudaMaxima,idCodigoClienteDeudaMaxima);
        }else{
            alertify.notify('Valor no valido, intente de nuevo.', 'error', 2);
        }
    });

    function fn_ActualizarDeudaMaxima(valorDeudaMaxima,idCodigoClienteDeudaMaxima){
        $.ajax({
            url: '/fn_consulta_ActualizarDeudaMaxima',
            method: 'GET',
            data: {
                valorDeudaMaxima: valorDeudaMaxima,
                idCodigoClienteDeudaMaxima:idCodigoClienteDeudaMaxima,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizó la deuda maxima correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('#ModalDeudaMaxima').addClass('hidden');
                    $('#ModalDeudaMaxima').removeClass('flex');
                    fn_DeudaMaximaClientes();
                }
            },
            error: function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error: Ocurrio un error inesperado durante la operacion',
                  })
                console.error("ERROR",error);
            }
        });
    }

    $('#filtrarClienteDeudaMaxima').on('input', function() {
        let nombreFiltrar = $('#filtrarClienteDeudaMaxima').val().toUpperCase(); ; // Obtiene el valor del campo de filtro

        // Mostrar todas las filas
        $('#tablaDeudaMaxima tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaDeudaMaxima tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    });

});
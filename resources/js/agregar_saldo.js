import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    fn_TraerClientesAgregarSaldo();

    DataTableED('#tablaAgregarSaldo');

    function fn_TraerClientesAgregarSaldo(){
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarSaldo',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyAgregarSaldo = $('#bodyAgregarSaldo');
                    tbodyAgregarSaldo.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let total = parseFloat(obj.deudaTotal) - parseFloat(obj.cantidadPagos) + parseFloat(obj.ventaDescuentos);
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.codigoCli));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text((total).toFixed(2)));

                        // Agregar la nueva fila al tbody
                        tbodyAgregarSaldo.append(nuevaFila);
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $('.cerrarModalAgregarSaldo').on('click', function (e) {
        if (e.target === this) {
            $('#ModalAgregarSaldo').addClass('hidden');
            $('#ModalAgregarSaldo').removeClass('flex');
        }
    });

    $(document).on("dblclick", "#tablaAgregarSaldo tbody tr", function() {
        let fila = $(this).closest('tr');
        let idCodigoCliente = fila.find('td:eq(0)').text();
        let nombreCompleto = fila.find('td:eq(1)').text();

        $('#idCodigoClienteAgregarSaldo').attr('value', idCodigoCliente);
        $('#nombreClienteAgregarSaldo').text(nombreCompleto);
        $('#ModalAgregarSaldo').removeClass('hidden');
        $('#ModalAgregarSaldo').addClass('flex');
    });

    $('#btnAgregarSaldo').on('click', function () {
        let valorAgregarSaldo = $('#valorAgregarSaldo').val();
        valorAgregarSaldo = parseFloat(valorAgregarSaldo)*-1;
        let idCodigoClienteAgregarSaldo = $('#idCodigoClienteAgregarSaldo').attr('value');
        fn_AgregarSaldo(valorAgregarSaldo,idCodigoClienteAgregarSaldo);
    });

    function fn_AgregarSaldo(valorAgregarSaldo,idCodigoClienteAgregarSaldo){
        $.ajax({
            url: '/fn_consulta_AgregarSaldo',
            method: 'GET',
            data: {
                valorAgregarSaldo: valorAgregarSaldo,
                idCodigoClienteAgregarSaldo:idCodigoClienteAgregarSaldo,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se la agrego el saldo correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('#ModalAgregarSaldo').addClass('hidden');
                    $('#ModalAgregarSaldo').removeClass('flex');
                    fn_TraerClientesAgregarSaldo();
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

});
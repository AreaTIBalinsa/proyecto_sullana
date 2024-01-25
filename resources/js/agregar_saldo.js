import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    DataTableED('#tablaAgregarSaldo');
    fn_TraerClientesAgregarSaldo();

    function fn_TraerClientesAgregarSaldo() {
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarSaldo',
            method: 'GET',
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    // Objeto para almacenar los resultados agrupados por codigoCli
                    let resultadosAgrupados = {};
    
                    // Iterar sobre los objetos y agrupar por codigoCli
                    response.forEach(function (obj) {
                        let codigoCli = obj.codigoCli;
    
                        if (!resultadosAgrupados[codigoCli]) {
                            resultadosAgrupados[codigoCli] = {
                                nombreCompleto: obj.nombreCompleto,
                                codigoCli: codigoCli,
                                deudaTotal: 0,
                                cantidadPagos: 0,
                                ventaDescuentos: 0,
                                limitEndeudamiento: 0
                            };
                        }
    
                        // Sumar las propiedades correspondientes
                        resultadosAgrupados[codigoCli].deudaTotal += parseFloat(obj.deudaTotal);
                        resultadosAgrupados[codigoCli].cantidadPagos += parseFloat(obj.cantidadPagos);
                        resultadosAgrupados[codigoCli].ventaDescuentos += parseFloat(obj.ventaDescuentos);
                        resultadosAgrupados[codigoCli].limitEndeudamiento += parseFloat(obj.limitEndeudamiento);
                    });
    
                    // Obtener el select
                    let tbodyAgregarSaldo = $('#bodyAgregarSaldo');
                    tbodyAgregarSaldo.empty();
                    let nuevaFila = "";
    
                    // Iterar sobre los resultados agrupados y mostrar en la tabla
                    Object.values(resultadosAgrupados).forEach(function (obj) {
                        let total = obj.deudaTotal - obj.cantidadPagos + obj.ventaDescuentos;
    
                        // Crear una nueva fila
                        if (total >= parseFloat(obj.limitEndeudamiento)) {
                            nuevaFila = $('<tr class="bg-red-600 border-b dark:border-gray-700 cursor-pointer text-white font-bold">');
                            // Agregar las celdas con la información
                            nuevaFila.append($('<td class="hidden">').text(obj.codigoCli));
                            nuevaFila.append($(`
                                <td class="border dark:border-gray-700 p-2 font-medium whitespace-nowrap">
                                    <div class="flex gap-4 justify-between">
                                        <div>
                                            ${obj.nombreCompleto}
                                        </div>
                                        <div class="pulsoAdvertencia">
                                            <img src="${rutaAdvertencia}" title="El cliente sobrepaso la deuda \n maxima : ${parseFloat(obj.limitEndeudamiento)}" alt="Advertencia" class="h-6 drop-shadow-[0_0_5px_rgba(255,255,255,0.80)]" />
                                        </div>
                                    </div>
                                </td>
                                <td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">${total.toFixed(2)}</td>
                                <td class="hidden">1</td>
                            `));
                        }
                        else{
                            nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                            // Agregar las celdas con la información
                            nuevaFila.append($('<td class="hidden">').text(obj.codigoCli));
                            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(total.toFixed(2)));
                        }
    
                        // Agregar la nueva fila al tbody
                        tbodyAgregarSaldo.append(nuevaFila);
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
    
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }    

    $('.cerrarModalAgregarSaldo, #ModalAgregarSaldo .opacity-75').on('click', function (e) {
        $('#ModalAgregarSaldo').addClass('hidden');
        $('#ModalAgregarSaldo').removeClass('flex');
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
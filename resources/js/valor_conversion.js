import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function($) {

    fn_TraerValorConversion()
    DataTableED('#tablaValorDeConversion')

    /* ============ Eventos ============ */

    $(document).on("dblclick", "#tablaValorDeConversion #bodyValoresDeConversion tr td.valorDeConversionColumna", function() {
        let fila = $(this).closest('tr');
        let idValorConversion = fila.find('td:eq(0)').text();
        let nombrevalorConversion = fila.find('td:eq(1)').text();
        let nuevoValorConversion = $(this).text();
        let idPresentacion = $(this).data('columna');
        let nombreColumna = $(this).closest('table').find('th:eq(' + (parseInt(idPresentacion)+1) + ')').text();
        
        $('#ModalValorDeConversion').removeClass('hidden');
        $('#ModalValorDeConversion').addClass('flex');
        $('#nombreClienteValorDeConversion').html(nombrevalorConversion);
        $('#nombrePresentacionModal').html(nombreColumna);

        $('#nuevoValorDeConversion').val(nuevoValorConversion);
        $('#idClienteValorDeConversion').val(idValorConversion);
        $('#idEspecieValorDeConversionXActualizar').attr("value",idPresentacion);
        $('#nuevoValorDeConversion').focus();
    });

    $('.cerrarModalValorDeConversion, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalValorDeConversion').addClass('hidden');
            $('#ModalValorDeConversion').removeClass('flex');
        }
    });

    $('#btnActualizarValorDeConversion').on('click', function () {
        let idClienteActualizarConversion = $('#idClienteValorDeConversion').val();
        let valorActualizarConversion = $('#nuevoValorDeConversion').val();
        let numeroEspecieValorDeConversion = $('#idEspecieValorDeConversionXActualizar').attr("value");

        fn_ActualizarValorConversion(idClienteActualizarConversion, valorActualizarConversion,numeroEspecieValorDeConversion);
        $('#ModalValorDeConversion').addClass('hidden');
        $('#ModalValorDeConversion').removeClass('flex');
    });

    $('#nuevoValorDeConversion').on('input', function() {
        let inputValue = $(this).val();
    
        // Remover caracteres que no sean números o puntos
        inputValue = inputValue.replace(/[^0-9.]/g, '');
    
        // Asegurarse de que no haya más de un punto decimal
        inputValue = inputValue.replace(/(\..*)\./g, '$1');
    
        // Separar parte entera y decimal
        let parts = inputValue.split('.');
    
        // Si hay más de tres dígitos en la parte decimal, recortar a tres
        if (parts[1] && parts[1].length > 3) {
            parts[1] = parts[1].slice(0, 3);
        }
    
        // Si hay más de un punto en la cadena, mantener solo el primero
        if (parts.length > 2) {
            parts = [parts[0], parts.slice(1).join('.')];
        }
    
        // Si la parte decimal está vacía y hay más de un dígito en la parte entera, agregar punto decimal
        if (!parts[1] && parts[0].length > 1) {
            parts = [parts[0].slice(0, -1), parts[0].slice(-1)];
        }
    
        // Actualizar el valor del input
        inputValue = parts.join('.');
        $(this).val(inputValue);
    });
    

    /* ============ Funciones ============ */

    function fn_TraerValorConversion(){
        $.ajax({
            url: '/fn_consulta_TraerValorConversion',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyConversiones = $('#bodyValoresDeConversion');
                    tbodyConversiones.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="editValorConversion bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPrecio));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="px-4 py-2 border-r dark:border-gray-700 text-center valorDeConversionColumna" data-columna="1">').text(obj.valorConversionPrimerEspecie));
                        nuevaFila.append($('<td class="px-4 py-2 border-r dark:border-gray-700 text-center valorDeConversionColumna" data-columna="2">').text(obj.valorConversionSegundaEspecie));
                        nuevaFila.append($('<td class="px-4 py-2 border-r dark:border-gray-700 text-center valorDeConversionColumna" data-columna="3">').text(obj.valorConversionTerceraEspecie));
                        nuevaFila.append($('<td class="px-4 py-2 text-center valorDeConversionColumna" data-columna="4">').text(obj.valorConversionCuartaEspecie));
                        // Agregar la nueva fila al tbody
                        tbodyConversiones.append(nuevaFila);
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

    function fn_ActualizarValorConversion(idClienteActualizarConversion,nuevoValorConversion,numeroEspecieValorDeConversion){
        $.ajax({
            url: '/fn_consulta_ActualizarValorConversion',
            method: 'GET',
            data: {
                idClienteActualizarConversion: idClienteActualizarConversion,
                nuevoValorConversion: nuevoValorConversion,
                numeroEspecieValorDeConversion: numeroEspecieValorDeConversion,
            },
            success: function(response) {
                if (response.success) {
                    $('#bodyValoresDeConversion tr').each(function () {
                        let idFila = $(this).find('td:eq(0)').text();
                        if (idFila === idClienteActualizarConversion) {
                            $(this).find('td:eq(' + (parseInt(numeroEspecieValorDeConversion)+1) + ')').text(parseFloat(nuevoValorConversion).toFixed(3));
                            return false;
                        }
                    });                    

                    alertify.notify('Se actualizo el valor de conversión correctamente', 'success', 2);
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

    $('#filtrarValorDeConversion').on('input', function() {
        let nombreFiltrar = $(this).val().toUpperCase(); ; // Obtiene el valor del campo de filtro

        // Mostrar todas las filas
        $('#tablaValorDeConversion tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaValorDeConversion tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    });

});


let precioPromedioTAS = fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie9', 'precioPromedio') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie10', 'precioPromedio') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie11', 'precioPromedio') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie12', 'precioPromedio') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie13', 'precioPromedio') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie15', 'precioPromedio') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie6', 'precioPromedio') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie21', 'precioPromedio');
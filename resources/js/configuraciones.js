import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    $('#fechaProgramacionPedidos').val(fechaHoy);

    // Eventos para abrir y cerrar modal de Agregar Pago

    $('#registrarPedidoCliente').on('click', function () {
        $('#ModalRegistrarPedido').addClass('flex');
        $('#ModalRegistrarPedido').removeClass('hidden');
        $('#idRegistrarPedidoCliente').focus();
        $('#fechaProgramacionPedidosModal').val(fechaHoy);
    });

    $('.cerrarModalRegistrarPedido, .modal-content').on('click', function (e) {
        if ($(e.target).hasClass('cerrarModalRegistrarPedido')) {
            $('#ModalRegistrarPedido').addClass('hidden');
            $('#ModalRegistrarPedido').removeClass('flex');
        }
    });    

    $('#idRegistrarPedidoCliente').on('input', function () {
        let inputRegistrarPedido = $(this).val();
        let contenedorClientes = $('#contenedorClientesRegistrarPedido');
        contenedorClientes.empty();

        if (inputRegistrarPedido.length > 1 || inputRegistrarPedido != "") {
            fn_TraerClientesPedidos(inputRegistrarPedido);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesPedidos(inputRegistrarPedido) {

        $.ajax({
            url: '/fn_consulta_TraerClientesPedidos',
            method: 'GET',
            data: {
                inputRegistrarPedido: inputRegistrarPedido,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesRegistrarPedido')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idRegistrarPedidoCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoRegistrarPedido').attr("value", obj.codigoCli);

                            // Oculta las sugerencias
                            contenedorClientes.addClass('hidden');
                        });

                        contenedorClientes.append(suggestion);
                    });

                    // Muestra las sugerencias
                    contenedorClientes.removeClass('hidden');
                } else {
                    // Oculta las sugerencias si no hay resultados
                    contenedorClientes.addClass('hidden');
                }
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    };

    function fn_EspeciesPedido(){
        $.ajax({
            url: '/fn_consulta_EspeciesPedido',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacion = $('#selectEspecieAgregarPedido');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectPresentacion.append($('<option>', {
                        value: '0',
                        text: 'Seleccione especie',
                        disabled: true,
                        selected: true
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        console.log(obj);
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
                        });
                        selectPresentacion.append(option);
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

})
import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    $('#fechaProgramacionPedidos').val(fechaHoy);
    $('#fechaProgramacionPedidosModal').val(fechaHoy);

    // Eventos para abrir y cerrar modal de Agregar Pago

    $('#registrarPedidoCliente').on('click', function () {
        $('#ModalRegistrarPedido').addClass('flex');
        $('#ModalRegistrarPedido').removeClass('hidden');
        $('#idRegistrarPedidoCliente').focus();
    });

    $('.cerrarModalRegistrarPedido, #ModalRegistrarPedido .opacity-75').on('click', function (e) {
        $('#ModalRegistrarPedido').addClass('hidden');
        $('#ModalRegistrarPedido').removeClass('flex');
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

    fn_EspeciesPedido();
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
    
    // Selecciona el elemento por su ID
    $('#selectEspecieAgregarPedido').on('change',function() {
        // Acciones a realizar cuando cambia la selección
        let valorSeleccionado = $(this).val();
    
        switch (valorSeleccionado){
            case '1':
                $('#divPedidoYugoVivo').addClass('flex');
                $('#divPedidoYugoVivo').removeClass('hidden');
                $('#inputCantidadYugoVivo').focus();
                break;
            case '2':
                $('#divPedidoYugoPelado').addClass('flex');
                $('#divPedidoYugoPelado').removeClass('hidden');
                $('#inputCantidadYugoPelado').focus();
                break;
            case '3':
                $('#divPedidoTecnicoVivo').addClass('flex');
                $('#divPedidoTecnicoVivo').removeClass('hidden');
                $('#inputCantidadTecnicoVivo').focus();
                break;
            case '4':
                $('#divPedidoTecnicoPelado').addClass('flex');
                $('#divPedidoTecnicoPelado').removeClass('hidden');
                $('#inputCantidadTecnicoVivo').focus();
                break;
            case '5':
                $('#divPedidoGallinaDoble').addClass('flex');
                $('#divPedidoGallinaDoble').removeClass('hidden');
                $('#inputCantidadGallinaDoble').focus();
                break;
            case '6':
                $('#divPedidoGallinaChica').addClass('flex');
                $('#divPedidoGallinaChica').removeClass('hidden');
                $('#inputCantidadGallinaChica').focus();
                break;
            case '7':
                $('#divPedidoGallo').addClass('flex');
                $('#divPedidoGallo').removeClass('hidden');
                $('#inputCantidadGallo').focus();
                break;
            case '16':
                $('#divPedidoPolloXX').addClass('flex');
                $('#divPedidoPolloXX').removeClass('hidden');
                $('#inputCantidadPolloXX').focus();
                break;
            case '17':
                $('#divPedidoBrasaYugo').addClass('flex');
                $('#divPedidoBrasaYugo').removeClass('hidden');
                $('#inputCantidadBrasaYugo').focus();
                break;
            case '18':
                $('#divPedidoBrasaTecnico').addClass('flex');
                $('#divPedidoBrasaTecnico').removeClass('hidden');
                $('#inputCantidadBrasaTecnico').focus();
                break;
            default:
                console.log('Gaaaaaaaaaa');
                break;
        }
    });

    $('#btnRegistrarPedido').on('click', function () {
        let idRegistrarPedidoCliente = $('#selectedCodigoRegistrarPedido').attr('value');
        let fechaProgramacionPedidosModal = $("#fechaProgramacionPedidosModal").val();
        let selectEspecieAgregarPedido = $("#selectEspecieAgregarPedido").val();
        let comentarioCliPedido = $('#comentarioCliPedido').val();

        if (idRegistrarPedidoCliente == "" || idRegistrarPedidoCliente == 0 || idRegistrarPedidoCliente == NaN || idRegistrarPedidoCliente === null){
            alertify.notify('Debe seleccionar Cliente', 'error', 3);
            $("#idRegistrarPedidoCliente").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#idRegistrarPedidoCliente").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }

        if (selectEspecieAgregarPedido == NaN || selectEspecieAgregarPedido == 0 || selectEspecieAgregarPedido == "" || selectEspecieAgregarPedido === null){
            alertify.notify('Se debe seleccionar especie', 'error', 3);
            $("#selectEspecieAgregarPedido").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#selectEspecieAgregarPedido").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }

        let primerEspecie = $('#inputCantidadYugoVivo').val();
        let segundaEspecie = $('#inputCantidadYugoPelado').val();
        let terceraEspecie = $('#inputCantidadTecnicoVivo').val();
        let cuartaEspecie = $('#inputCantidadTecnicoPelado').val();
        let quintaEspecie = $('#inputCantidadGallinaDoble').val();
        let sextaEspecie = $('#inputCantidadGallinaChica').val();
        let sepimaEspecie = $('#inputCantidadGallo').val();
        let octavaEspecie = $('#inputCantidadPolloXX').val();
        let novenaEspecie = $('#inputCantidadBrasaYugo').val();
        let decimaEspecie = $('#inputCantidadBrasaTecnico').val();

        console.log('Pedido registrado', idRegistrarPedidoCliente, fechaProgramacionPedidosModal, selectEspecieAgregarPedido,comentarioCliPedido,primerEspecie,segundaEspecie,terceraEspecie,cuartaEspecie,quintaEspecie,sextaEspecie,sepimaEspecie,octavaEspecie,novenaEspecie,decimaEspecie);
    });

})
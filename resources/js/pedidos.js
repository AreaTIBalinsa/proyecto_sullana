import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaBuscarPedidos').val(fechaHoy);
    $('#fechaAgregarPedido').val(fechaHoy);
    $('#fechaAgregarPedidoEditar').val(fechaHoy);
    $('#fechaTraerPedido').val(fechaHoy);
    $('#fechaRegistrarPedidoADia').val(fechaHoy);
    fn_TraerPedidosClientes(fechaHoy);
    DataTableED('#tablaPedidos');
    var tipoUsuario = $('#tipoUsuario').data('id');

    $('.cerrarModalAgregarPedido, #ModalAgregarPedido .opacity-75').on('click', function (e) {
        $('#ModalAgregarPedido').addClass('hidden');
        $('#ModalAgregarPedido').removeClass('flex');
    });

    $('.cerrarModalAgregarPedidoEditar, #ModalAgregarPedidoEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarPedidoEditar').addClass('hidden');
        $('#ModalAgregarPedidoEditar').removeClass('flex');
    });

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

    fn_EspeciesPedidoEditar();
    function fn_EspeciesPedidoEditar(){
        $.ajax({
            url: '/fn_consulta_EspeciesPedido',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacion = $('#selectEspecieAgregarPedidoEditar');
                    
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
                $('#inputCantidadTecnicoPelado').focus();
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
            case '19':
                $('#divPedidoPolloXXVivo').addClass('flex');
                $('#divPedidoPolloXXVivo').removeClass('hidden');
                $('#inputCantidadPolloXXVivo').focus();
                break;
            case '20':
                $('#divPedidoGallinaDobleVivo').addClass('flex');
                $('#divPedidoGallinaDobleVivo').removeClass('hidden');
                $('#inputCantidadGallinaDobleVivo').focus();
                break;
            case '21':
                $('#divPedidoGallinaChicaVivo').addClass('flex');
                $('#divPedidoGallinaChicaVivo').removeClass('hidden');
                $('#inputCantidadGallinaChicaVivo').focus();
                break;
            case '22':
                $('#divPedidoGalloVivo').addClass('flex');
                $('#divPedidoGalloVivo').removeClass('hidden');
                $('#inputCantidadGalloVivo').focus();
                break;
            default:
                console.log('Gaaaaaaaaaa');
                break;
        }
    });

    $('#selectEspecieAgregarPedidoEditar').on('change',function() {
        // Acciones a realizar cuando cambia la selección
        let valorSeleccionado = $(this).val();
    
        switch (valorSeleccionado){
            case '1':
                $('#divPedidoYugoVivoEditar').addClass('flex');
                $('#divPedidoYugoVivoEditar').removeClass('hidden');
                $('#inputCantidadYugoVivoEditar').focus();
                break;
            case '2':
                $('#divPedidoYugoPeladoEditar').addClass('flex');
                $('#divPedidoYugoPeladoEditar').removeClass('hidden');
                $('#inputCantidadYugoPeladoEditar').focus();
                break;
            case '3':
                $('#divPedidoTecnicoVivoEditar').addClass('flex');
                $('#divPedidoTecnicoVivoEditar').removeClass('hidden');
                $('#inputCantidadTecnicoVivoEditar').focus();
                break;
            case '4':
                $('#divPedidoTecnicoPeladoEditar').addClass('flex');
                $('#divPedidoTecnicoPeladoEditar').removeClass('hidden');
                $('#inputCantidadTecnicoPeladoEditar').focus();
                break;
            case '5':
                $('#divPedidoGallinaDobleEditar').addClass('flex');
                $('#divPedidoGallinaDobleEditar').removeClass('hidden');
                $('#inputCantidadGallinaDobleEditar').focus();
                break;
            case '6':
                $('#divPedidoGallinaChicaEditar').addClass('flex');
                $('#divPedidoGallinaChicaEditar').removeClass('hidden');
                $('#inputCantidadGallinaChicaEditar').focus();
                break;
            case '7':
                $('#divPedidoGalloEditar').addClass('flex');
                $('#divPedidoGalloEditar').removeClass('hidden');
                $('#inputCantidadGalloEditar').focus();
                break;
            case '16':
                $('#divPedidoPolloXXEditar').addClass('flex');
                $('#divPedidoPolloXXEditar').removeClass('hidden');
                $('#inputCantidadPolloXXEditar').focus();
                break;
            case '17':
                $('#divPedidoBrasaYugoEditar').addClass('flex');
                $('#divPedidoBrasaYugoEditar').removeClass('hidden');
                $('#inputCantidadBrasaYugoEditar').focus();
                break;
            case '18':
                $('#divPedidoBrasaTecnicoEditar').addClass('flex');
                $('#divPedidoBrasaTecnicoEditar').removeClass('hidden');
                $('#inputCantidadBrasaTecnicoEditar').focus();
                break;
            case '19':
                $('#divPedidoPolloXXVivoEditar').addClass('flex');
                $('#divPedidoPolloXXVivoEditar').removeClass('hidden');
                $('#inputCantidadPolloXXVivoEditar').focus();
                break;
            case '20':
                $('#divPedidoGallinaDobleVivoEditar').addClass('flex');
                $('#divPedidoGallinaDobleVivoEditar').removeClass('hidden');
                $('#inputCantidadGallinaDobleVivoEditar').focus();
                break;
            case '21':
                $('#divPedidoGallinaChicaVivoEditar').addClass('flex');
                $('#divPedidoGallinaChicaVivoEditar').removeClass('hidden');
                $('#inputCantidadGallinaChicaVivoEditar').focus();
                break;
            case '22':
                $('#divPedidoGalloVivoEditar').addClass('flex');
                $('#divPedidoGalloVivoEditar').removeClass('hidden');
                $('#inputCantidadGalloVivoEditar').focus();
                break;
            default:
                console.log('Gaaaaaaaaaa');
                break;
        }
    });

    $(document).on("click", "#registrarPedidoCliente", function() {
        $('#contenedorDeEspeciesPedidos').find('div').addClass('hidden').removeClass('flex');
        $('#idRegistrarPedidoCliente').focus();
        $('#idRegistrarPedidoCliente').val("");
        $('#selectedCodigoCliPedidos').attr("value", "");

        $('#inputCantidadYugoVivo').val("");
        $('#inputCantidadYugoPelado').val("");
        $('#inputCantidadTecnicoVivo').val("");
        $('#inputCantidadTecnicoPelado').val("");
        $('#inputCantidadGallinaDoble').val("");
        $('#inputCantidadGallinaChica').val("");
        $('#inputCantidadGallo').val("");
        $('#inputCantidadPolloXX').val("");
        $('#inputCantidadBrasaYugo').val("");
        $('#inputCantidadBrasaTecnico').val("");
        $('#inputCantidadPolloXXVivo').val("");
        $('#inputCantidadGallinaDobleVivo').val("");
        $('#inputCantidadGallinaChicaVivo').val("");
        $('#inputCantidadGalloVivo').val("");

        $('#idRegistrarPedidoCliente').addClass('border-green-500 dark:border-gray-600 border-gray-300').removeClass('border-red-500');
        $('#filtrarPedidosFecha').trigger('click');
        $('#selectEspecieAgregarPedido').val($('#selectEspecieAgregarPedido option:first').val());
        $('#ModalAgregarPedido').addClass('flex');
        $('#ModalAgregarPedido').removeClass('hidden');
    });

    $('#idRegistrarPedidoCliente').on('input', function () {
        let inputAgregarPagoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesPedidos');
        contenedorClientes.empty();

        if (inputAgregarPagoCliente.length > 0 && inputAgregarPagoCliente != "") {
            fn_TraerClientesAgregarPedido(inputAgregarPagoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesAgregarPedido(inputAgregarPagoCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarPagoCliente',
            method: 'GET',
            data: {
                inputAgregarPagoCliente: inputAgregarPagoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesPedidos')
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
                            $('#selectedCodigoCliPedidos').attr("value", obj.codigoCli);

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

    $('#filtrarPedidosFecha').on('click', function () {
        $('#filtrarClientePedidos').val('');
        let fechaBuscarPedidos = $('#fechaBuscarPedidos').val();
        fn_TraerPedidosClientes(fechaBuscarPedidos);
    });

    function fn_TraerPedidosClientes(fechaBuscarPedidos) {
        $.ajax({
            url: '/fn_consulta_TraerPedidosClientes',
            method: 'GET',
            data:{
                fechaBuscarPedidos:fechaBuscarPedidos,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyPedidoDelCliente = $('#bodyPedidos');
                    let TtotalesPedidos = $('#headerPedidos');
                    TtotalesPedidos.empty();
                    TtotalesPedidos.append(`<tr>
                        <th class="hidden">Id</th>
                        <th class="border-r px-2 py-4 text-center whitespace-nowrap">Nombre de Cliente</th>
                        <th class="border-r px-2 py-4 text-center">Yugo Vivo</th>
                        <th class="border-r px-2 py-4 text-center">Yugo Pelado</th>
                        <th class="border-r px-2 py-4 text-center">Tecnica Vivo</th>
                        <th class="border-r px-2 py-4 text-center">Tecnica Pelado</th>
                        <th class="border-r px-2 py-4 text-center">Gallina Doble Pelado</th>
                        <th class="border-r px-2 py-4 text-center">Gallina Chica Pelado</th>
                        <th class="border-r px-2 py-4 text-center">Gallo Pelado</th>
                        <th class="border-r px-2 py-4 text-center">Pollo XX Pelado</th>
                        <th class="border-r px-2 py-4 text-center">Brasa Yugo</th>
                        <th class="border-r px-2 py-4 text-center">Brasa Tecnica</th>
                        <th class="border-r px-2 py-4 text-center">Pollo XX Vivo</th>
                        <th class="border-r px-2 py-4 text-center">Gallina Doble Vivo</th>
                        <th class="border-r px-2 py-4 text-center">Gallina Chica Vivo</th>
                        <th class="border-r px-2 py-4 text-center">Gallo Vivo</th>
                        <th class="border-r px-2 py-4 text-center">Comentario</th>
                        <th class="px-2 py-4 text-center whitespace-nowrap">TOTAL</th>
                    </tr>`);
                    tbodyPedidoDelCliente.empty();
                    let nuevaFila = ""
                    let totalPedidosFinal = 0;
                    let totalPedido1 = 0;
                    let totalPedido2 = 0;
                    let totalPedido3 = 0;
                    let totalPedido4 = 0;
                    let totalPedido5 = 0;
                    let totalPedido6 = 0;
                    let totalPedido7 = 0;
                    let totalPedido8 = 0;
                    let totalPedido9 = 0;
                    let totalPedido10 = 0;
                    let totalPedido11 = 0;
                    let totalPedido12 = 0;
                    let totalPedido13 = 0;
                    let totalPedido14 = 0;

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        nuevaFila = $('<tr class="bg-white text-sm filaEditable border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 dark:text-white">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="1">').text(obj.pedidoPrimerEspecie));                        
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="2">').text(obj.pedidoSegundaEspecie));                        
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="3">').text(obj.pedidoTercerEspecie));                        
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="4">').text(obj.pedidoCuartaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="5">').text(obj.pedidoQuintaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="6">').text(obj.pedidoSextaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="7">').text(obj.pedidoSeptimaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="8">').text(obj.pedidoOctavaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="9">').text(obj.pedidoNovenaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="10">').text(obj.pedidoDecimaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="11">').text(obj.pedidoDecimaPrimeraEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="12">').text(obj.pedidoDecimaSegundaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="13">').text(obj.pedidoDecimaTerceraEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="14">').text(obj.pedidoDecimaCuartaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center valorEditable" data-columna="15">').text(obj.comentarioPedido));
                        
                        let totalPedidos = 0;
                        totalPedidos = parseInt(obj.pedidoPrimerEspecie) + parseInt(obj.pedidoSegundaEspecie) + 
                        parseInt(obj.pedidoTercerEspecie) + parseInt(obj.pedidoCuartaEspecie)+
                        parseInt(obj.pedidoQuintaEspecie) + parseInt(obj.pedidoSextaEspecie)+
                        parseInt(obj.pedidoSeptimaEspecie) + parseInt(obj.pedidoOctavaEspecie)+
                        parseInt(obj.pedidoNovenaEspecie) + parseInt(obj.pedidoDecimaEspecie)+ 
                        parseInt(obj.pedidoDecimaPrimeraEspecie) + parseInt(obj.pedidoDecimaSegundaEspecie)+
                        parseInt(obj.pedidoDecimaTerceraEspecie) + parseInt(obj.pedidoDecimaCuartaEspecie);
                        totalPedidosFinal += totalPedidos;

                        totalPedido1 += parseInt(obj.pedidoPrimerEspecie);
                        totalPedido2 += parseInt(obj.pedidoSegundaEspecie);
                        totalPedido3 += parseInt(obj.pedidoTercerEspecie);
                        totalPedido4 += parseInt(obj.pedidoCuartaEspecie);
                        totalPedido5 += parseInt(obj.pedidoQuintaEspecie);
                        totalPedido6 += parseInt(obj.pedidoSextaEspecie);
                        totalPedido7 += parseInt(obj.pedidoSeptimaEspecie);
                        totalPedido8 += parseInt(obj.pedidoOctavaEspecie);
                        totalPedido9 += parseInt(obj.pedidoNovenaEspecie);
                        totalPedido10 += parseInt(obj.pedidoDecimaEspecie);
                        totalPedido11 += parseInt(obj.pedidoDecimaPrimeraEspecie);
                        totalPedido12 += parseInt(obj.pedidoDecimaSegundaEspecie);
                        totalPedido13 += parseInt(obj.pedidoDecimaTerceraEspecie);
                        totalPedido14 += parseInt(obj.pedidoDecimaCuartaEspecie);

                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalPedidos));                                              
                        nuevaFila.append($('<td class="hidden">').text(obj.fechaRegistroPedido));
                        nuevaFila.append($('<td class="hidden">').text(obj.codigoCliPedidos));
                        // Agregar la nueva fila al tbody
                        tbodyPedidoDelCliente.append(nuevaFila);
                    });

                    if (nuevaFila == ""){
                        tbodyPedidoDelCliente.append(
                            '<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="17" class="text-center">No hay datos</td></tr>'
                        );
                    }else{
                        let totalPedidoFormateado = totalPedidosFinal.toLocaleString('es-ES', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true,
                        });

                        nuevaFila = $('<tr class="bg-white border-b text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-bold text-gray-900 whitespace-nowrap dark:text-white">').text("TOTAL:"));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido1));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido2));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido3));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido4));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido5));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido6));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido7));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido8));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido9));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido10));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido11));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido12));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido13));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(totalPedido14));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(totalPedidoFormateado));
                        // Agregar la nueva fila al tbody
                        TtotalesPedidos.append(nuevaFila);

                        nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                        nuevaFila= ($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="17">').text(""));
                        TtotalesPedidos.append(nuevaFila);
                    }

                    let nombreFiltrar = $('#filtrarClientePedidos').val().toUpperCase();
                    // Ocultar todas las filas excepto las de Fecha y las filas con colspan="6"
                    $('#tablaPedidos tbody tr').show();

                    if (nombreFiltrar) {
                        $('#tablaPedidos tbody tr').each(function() {
                            let nombre = $(this).find('td:eq(0)').text().toUpperCase().trim();
                            if (nombre.indexOf(nombreFiltrar) === -1) {
                                $(this).hide();
                            }
                        });
                    }

                    // Actualizar la fila "TOTAL" según los resultados filtrados
                    updateTotal();

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $('#btnAgregarPedido').on('click', function () {
        let selectedCodigoCliPedidos = $('#selectedCodigoCliPedidos').attr("value");
        let fechaAgregarPedido = $('#fechaAgregarPedido').val();

        let todosCamposCompletos = true

        if (selectedCodigoCliPedidos === null || selectedCodigoCliPedidos.trim() === '') {
            $('#idRegistrarPedidoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
            todosCamposCompletos = false;
        } else {
            $('#idRegistrarPedidoCliente').removeClass('border-red-500').addClass('border-green-500');
        }
        if (todosCamposCompletos) {
            fn_VerificarPedido(selectedCodigoCliPedidos,fechaAgregarPedido);
        }else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe seleccionar Cliente', 'error', 3);
        }

    });
    
    function fn_VerificarPedido(selectedCodigoCliPedidos,fechaAgregarPedido){
        $.ajax({
            url: '/fn_consulta_VerificarPedido',
            method: 'GET',
            data: {
                selectedCodigoCliPedidos: selectedCodigoCliPedidos,
                fechaAgregarPedido: fechaAgregarPedido,
            },
            success: function(response) {
                if(response.existePedido == true){
                    alertify.notify('El pedido del cliente ya existe.', 'error', 3);
                    $('#idRegistrarPedidoCliente').val("");
                    $('#selectedCodigoCliPedidos').attr("value", "");
                }else{
                    let primerEspecie = $('#inputCantidadYugoVivo').val();
                    let segundaEspecie = $('#inputCantidadYugoPelado').val();
                    let terceraEspecie = $('#inputCantidadTecnicoVivo').val();
                    let cuartaEspecie = $('#inputCantidadTecnicoPelado').val();
                    let quintaEspecie = $('#inputCantidadGallinaDoble').val();
                    let sextaEspecie = $('#inputCantidadGallinaChica').val();
                    let septimaEspecie = $('#inputCantidadGallo').val();
                    let octavaEspecie = $('#inputCantidadPolloXX').val();
                    let novenaEspecie = $('#inputCantidadBrasaYugo').val();
                    let decimaEspecie = $('#inputCantidadBrasaTecnico').val();
                    let decimaPrimeraEspecie = $('#inputCantidadPolloXXVivo').val();
                    let decimaSegundaEspecie = $('#inputCantidadGallinaDobleVivo').val();
                    let decimaTerceraEspecie = $('#inputCantidadGallinaChicaVivo').val();
                    let decimaCuartaEspecie = $('#inputCantidadGalloVivo').val();
                    let comentarioPedido = $('#comentarioAgregarPedido').val();
                    let fechaAgregarPedido = $('#fechaAgregarPedido').val();

                    let todosCamposCompletos = true

                    if (selectedCodigoCliPedidos === null || selectedCodigoCliPedidos.trim() === '') {
                        $('#idRegistrarPedidoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                        todosCamposCompletos = false;
                    } else {
                        $('#idRegistrarPedidoCliente').removeClass('border-red-500').addClass('border-green-500');
                    }
                
                    if (todosCamposCompletos) {
                        fn_AgregarPedidoCliente(selectedCodigoCliPedidos,primerEspecie,segundaEspecie,terceraEspecie,cuartaEspecie,quintaEspecie,sextaEspecie,septimaEspecie,octavaEspecie,novenaEspecie,decimaEspecie,decimaPrimeraEspecie,decimaSegundaEspecie,decimaTerceraEspecie,decimaCuartaEspecie,comentarioPedido,fechaAgregarPedido);
                    } else {
                        // Mostrar una alerta de que debe completar los campos obligatorios
                        alertify.notify('Debe seleccionar Cliente', 'error', 3);
                    }
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

    function fn_AgregarPedidoCliente(selectedCodigoCliPedidos,primerEspecie,segundaEspecie,terceraEspecie,cuartaEspecie,quintaEspecie,sextaEspecie,septimaEspecie,octavaEspecie,novenaEspecie,decimaEspecie,decimaPrimeraEspecie,decimaSegundaEspecie,decimaTerceraEspecie,decimaCuartaEspecie,comentarioPedido,fechaAgregarPedido){
        $.ajax({
            url: '/fn_consulta_AgregarPedidoCliente',
            method: 'GET',
            data: {
                selectedCodigoCliPedidos: selectedCodigoCliPedidos,
                primerEspecie: primerEspecie,
                segundaEspecie: segundaEspecie,
                terceraEspecie: terceraEspecie,
                cuartaEspecie: cuartaEspecie,
                quintaEspecie: quintaEspecie,
                sextaEspecie: sextaEspecie,
                septimaEspecie: septimaEspecie,
                octavaEspecie: octavaEspecie,
                novenaEspecie: novenaEspecie,
                decimaEspecie: decimaEspecie,
                decimaPrimeraEspecie: decimaPrimeraEspecie,
                decimaSegundaEspecie: decimaSegundaEspecie,
                decimaTerceraEspecie: decimaTerceraEspecie,
                decimaCuartaEspecie: decimaCuartaEspecie,
                comentarioPedido: comentarioPedido,
                fechaAgregarPedido: fechaAgregarPedido,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro el pedido correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalAgregarPedido').addClass('hidden');
                    $('#ModalAgregarPedido').removeClass('flex');
                    let fechaBuscarPedidos = $('#fechaBuscarPedidos').val();
                    fn_TraerPedidosClientes(fechaBuscarPedidos);
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

    $(document).on('contextmenu', '#tablaPedidos tbody tr.filaEditable', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
            let codigoPedido = $(this).closest("tr").find("td:first").text();
            let fila = $(this).closest("tr")
            fila.toggleClass('bg-gray-300 dark:bg-gray-600 bg-white dark:bg-gray-800');
            Swal.fire({
                title: '¿Desea eliminar el Registro?',
                text: "¡Estas seguro de eliminar el registro!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '¡No, cancelar!',
                confirmButtonText: '¡Si,eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fn_EliminarPedido(codigoPedido);
                }else{
                    $('table tbody tr').removeClass('bg-gray-300 dark:bg-gray-600');
                    $('table tbody tr').addClass('bg-white dark:bg-gray-800');
                }
            })
        }
    });

    function fn_EliminarPedido(codigoPedido){
        $.ajax({
            url: '/fn_consulta_EliminarPedido',
            method: 'GET',
            data: {
                codigoPedido: codigoPedido,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino el registro correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    let fechaBuscarPedidos = $('#fechaBuscarPedidos').val();
                    fn_TraerPedidosClientes(fechaBuscarPedidos);
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

    $('#filtrarClientePedidos').on('input', function () {
        let nombreFiltrar = $('#filtrarClientePedidos').val().toUpperCase();
        // Ocultar todas las filas excepto las de Fecha y las filas con colspan="6"
        $('#tablaPedidos tbody tr').show();

        if (nombreFiltrar) {
            $('#tablaPedidos tbody tr').each(function() {
                let nombre = $(this).find('td:eq(0)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }

        // Actualizar la fila "TOTAL" según los resultados filtrados
        updateTotal();
    });

    // Función para actualizar la fila "TOTAL"
    function updateTotal() {
        let total1 = 0;
        let total2 = 0;
        let total3 = 0;
        let total4 = 0;
        let total5 = 0;
        let total6 = 0;
        let total7 = 0;
        let total8 = 0;
        let total9 = 0;
        let total10 = 0;
        let total11 = 0;
        let total12 = 0;
        let total13 = 0;
        let total14 = 0;
        let total15 = 0;

        // Sumar los montos de las filas visibles
        $('#bodyPedidos tr.filaEditable:visible').each(function () {
            let monto1 = parseFloat($(this).find('td:eq(1)').text());
            total1 += isNaN(monto1) ? 0 : monto1;
            let monto2 = parseFloat($(this).find('td:eq(2)').text());
            total2 += isNaN(monto2) ? 0 : monto2;
            let monto3 = parseFloat($(this).find('td:eq(3)').text());
            total3 += isNaN(monto3) ? 0 : monto3;
            let monto4 = parseFloat($(this).find('td:eq(4)').text());
            total4 += isNaN(monto4) ? 0 : monto4;
            let monto5 = parseFloat($(this).find('td:eq(5)').text());
            total5 += isNaN(monto5) ? 0 : monto5;
            let monto6 = parseFloat($(this).find('td:eq(6)').text());
            total6 += isNaN(monto6) ? 0 : monto6;
            let monto7 = parseFloat($(this).find('td:eq(7)').text());
            total7 += isNaN(monto7) ? 0 : monto7;
            let monto8 = parseFloat($(this).find('td:eq(8)').text());
            total8 += isNaN(monto8) ? 0 : monto8;
            let monto9 = parseFloat($(this).find('td:eq(9)').text());
            total9 += isNaN(monto9) ? 0 : monto9;
            let monto10 = parseFloat($(this).find('td:eq(10)').text());
            total10 += isNaN(monto10) ? 0 : monto10;
            let monto11 = parseFloat($(this).find('td:eq(11)').text());
            total11 += isNaN(monto11) ? 0 : monto11;
            let monto12 = parseFloat($(this).find('td:eq(12)').text());
            total12 += isNaN(monto12) ? 0 : monto12;
            let monto13 = parseFloat($(this).find('td:eq(13)').text());
            total13 += isNaN(monto13) ? 0 : monto13;
            let monto14 = parseFloat($(this).find('td:eq(14)').text());
            total14 += isNaN(monto14) ? 0 : monto14;
            let monto15 = parseFloat($(this).find('td:eq(16)').text());
            total15 += isNaN(monto15) ? 0 : monto15;
        });

        // Actualizar el valor en la fila "TOTAL"
        let totalFormateado1 = total1.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado2 = total2.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado3 = total3.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado4 = total4.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado5 = total5.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado6 = total6.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado7 = total7.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado8 = total8.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado9 = total9.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado10 = total10.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado11 = total11.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado12 = total12.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado13 = total13.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado14 = total14.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });
        let totalFormateado15 = total15.toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });

        $('#headerPedidos tr:last td:eq(1)').text(totalFormateado1);
        $('#headerPedidos tr:last td:eq(2)').text(totalFormateado2);
        $('#headerPedidos tr:last td:eq(3)').text(totalFormateado3);
        $('#headerPedidos tr:last td:eq(4)').text(totalFormateado4);
        $('#headerPedidos tr:last td:eq(5)').text(totalFormateado5);
        $('#headerPedidos tr:last td:eq(6)').text(totalFormateado6);
        $('#headerPedidos tr:last td:eq(7)').text(totalFormateado7);
        $('#headerPedidos tr:last td:eq(8)').text(totalFormateado8);
        $('#headerPedidos tr:last td:eq(9)').text(totalFormateado9);
        $('#headerPedidos tr:last td:eq(10)').text(totalFormateado10);
        $('#headerPedidos tr:last td:eq(11)').text(totalFormateado11);
        $('#headerPedidos tr:last td:eq(12)').text(totalFormateado12);
        $('#headerPedidos tr:last td:eq(13)').text(totalFormateado13);
        $('#headerPedidos tr:last td:eq(14)').text(totalFormateado14);
        $('#headerPedidos tr:last td:eq(16)').text(totalFormateado15);
    };

    // $(document).on('dblclick', '#tablaPedidos tbody tr.filaEditable', function (e) {
    //     e.preventDefault();
    //     if (tipoUsuario =='Administrador'){
    //         $('#contenedorDeEspeciesPedidosEditar').find('div').addClass('hidden').removeClass('flex');
    //         $('#selectEspecieAgregarPedidoEditar').val($('#selectEspecieAgregarPedidoEditar option:first').val());
    //         let fila = $(this).closest('tr');
    //         let idPedido = fila.find('td:eq(0)').text();
    //         let nombreCliente = fila.find('td:eq(1)').text();
    //         let pedidoPrimerEspecie = fila.find('td:eq(2)').text();
    //         let pedidoSegundaEspecie = fila.find('td:eq(3)').text();
    //         let pedidoTerceraEspecie = fila.find('td:eq(4)').text();
    //         let pedidoCuartaEspecie = fila.find('td:eq(5)').text();
    //         let pedidoQuintaEspecie = fila.find('td:eq(6)').text();
    //         let pedidoSextaEspecie = fila.find('td:eq(7)').text();
    //         let pedidoSeptimaEspecie = fila.find('td:eq(8)').text();
    //         let pedidoOctavaEspecie = fila.find('td:eq(9)').text();
    //         let pedidoNovenaEspecie = fila.find('td:eq(10)').text();
    //         let pedidoDecimaEspecie = fila.find('td:eq(11)').text();
    //         let pedidoDecimaPrimeraEspecie = fila.find('td:eq(12)').text();
    //         let pedidoDecimaSegundaEspecie = fila.find('td:eq(13)').text();
    //         let pedidoDecimaTerceraEspecie = fila.find('td:eq(14)').text();
    //         let pedidoDecimaCuartaEspecie = fila.find('td:eq(15)').text();
    //         let pedidoComentario = fila.find('td:eq(16)').text();
    //         let fechaPedido = fila.find('td:eq(18)').text();
    //         let codigoCliente = fila.find('td:eq(19)').text();

    //         $('#idPedidosEditar').attr("value", idPedido)
    //         $('#idRegistrarPedidoClienteEditar').val(nombreCliente);
    //         $('#selectedCodigoCliPedidosEditar').attr("value", codigoCliente);

    //         if (pedidoPrimerEspecie > 0){
    //             $('#divPedidoYugoVivoEditar').addClass('flex');
    //             $('#divPedidoYugoVivoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadYugoVivoEditar').val(pedidoPrimerEspecie);
    //         if (pedidoSegundaEspecie > 0){
    //             $('#divPedidoYugoPeladoEditar').addClass('flex');
    //             $('#divPedidoYugoPeladoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadYugoPeladoEditar').val(pedidoSegundaEspecie);
    //         if (pedidoTerceraEspecie > 0){
    //             $('#divPedidoTecnicoVivoEditar').addClass('flex');
    //             $('#divPedidoTecnicoVivoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadTecnicoVivoEditar').val(pedidoTerceraEspecie);
    //         if (pedidoCuartaEspecie > 0){
    //             $('#divPedidoTecnicoPeladoEditar').addClass('flex');
    //             $('#divPedidoTecnicoPeladoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadTecnicoPeladoEditar').val(pedidoCuartaEspecie);
    //         if (pedidoQuintaEspecie > 0){
    //             $('#divPedidoGallinaDobleEditar').addClass('flex');
    //             $('#divPedidoGallinaDobleEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadGallinaDobleEditar').val(pedidoQuintaEspecie);
    //         if (pedidoSextaEspecie > 0){
    //             $('#divPedidoGallinaChicaEditar').addClass('flex');
    //             $('#divPedidoGallinaChicaEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadGallinaChicaEditar').val(pedidoSextaEspecie);
    //         if (pedidoSeptimaEspecie > 0){
    //             $('#divPedidoGalloEditar').addClass('flex');
    //             $('#divPedidoGalloEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadGalloEditar').val(pedidoSeptimaEspecie);
    //         if (pedidoOctavaEspecie > 0){
    //             $('#divPedidoPolloXXEditar').addClass('flex');
    //             $('#divPedidoPolloXXEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadPolloXXEditar').val(pedidoOctavaEspecie);
    //         if (pedidoNovenaEspecie > 0){
    //             $('#divPedidoBrasaYugoEditar').addClass('flex');
    //             $('#divPedidoBrasaYugoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadBrasaYugoEditar').val(pedidoNovenaEspecie);
    //         if (pedidoDecimaEspecie > 0){
    //             $('#divPedidoBrasaTecnicoEditar').addClass('flex');
    //             $('#divPedidoBrasaTecnicoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadBrasaTecnicoEditar').val(pedidoDecimaEspecie);

    //         if (pedidoDecimaPrimeraEspecie > 0){
    //             $('#divPedidoPolloXXVivoEditar').addClass('flex');
    //             $('#divPedidoPolloXXVivoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadPolloXXVivoEditar').val(pedidoDecimaPrimeraEspecie);
    //         if (pedidoDecimaSegundaEspecie > 0){
    //             $('#divPedidoGallinaDobleVivoEditar').addClass('flex');
    //             $('#divPedidoGallinaDobleVivoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadGallinaDobleVivoEditar').val(pedidoDecimaSegundaEspecie);
    //         if (pedidoDecimaTerceraEspecie > 0){
    //             $('#divPedidoGallinaChicaVivoEditar').addClass('flex');
    //             $('#divPedidoGallinaChicaVivoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadGallinaChicaVivoEditar').val(pedidoDecimaTerceraEspecie);
    //         if (pedidoDecimaCuartaEspecie > 0){
    //             $('#divPedidoGalloVivoEditar').addClass('flex');
    //             $('#divPedidoGalloVivoEditar').removeClass('hidden');
    //         }
    //         $('#inputCantidadGalloVivoEditar').val(pedidoDecimaCuartaEspecie);

    //         $('#comentarioAgregarPedidoEditar').val(pedidoComentario);

    //         $('#fechaAgregarPedidoEditar').val(fechaPedido);

    //         $('#ModalAgregarPedidoEditar').addClass('flex');
    //         $('#ModalAgregarPedidoEditar').removeClass('hidden');
    //     }
    // });

    $('#btnActualizarPedido').on('click', function () {
        let primerEspecie = $('#inputCantidadYugoVivoEditar').val();
        let segundaEspecie = $('#inputCantidadYugoPeladoEditar').val();
        let terceraEspecie = $('#inputCantidadTecnicoVivoEditar').val();
        let cuartaEspecie = $('#inputCantidadTecnicoPeladoEditar').val();
        let quintaEspecie = $('#inputCantidadGallinaDobleEditar').val();
        let sextaEspecie = $('#inputCantidadGallinaChicaEditar').val();
        let septimaEspecie = $('#inputCantidadGalloEditar').val();
        let octavaEspecie = $('#inputCantidadPolloXXEditar').val();
        let novenaEspecie = $('#inputCantidadBrasaYugoEditar').val();
        let decimaEspecie = $('#inputCantidadBrasaTecnicoEditar').val();
        let decimaPrimeraEspecie = $('#inputCantidadPolloXXVivoEditar').val();
        let decimaSegundaEspecie = $('#inputCantidadGallinaDobleVivoEditar').val();
        let decimaTerceraEspecie = $('#inputCantidadGallinaChicaVivoEditar').val();
        let decimaCuartaEspecie = $('#inputCantidadGalloVivoEditar').val();
        let comentarioPedido = $('#comentarioAgregarPedidoEditar').val();
        let fechaAgregarPedido = $('#fechaAgregarPedidoEditar').val();
        let idPedidoCliente = $('#idPedidosEditar').attr("value");

        fn_ActualizarPedidoCliente(primerEspecie,segundaEspecie,terceraEspecie,cuartaEspecie,quintaEspecie,sextaEspecie,septimaEspecie,octavaEspecie,novenaEspecie,decimaEspecie,decimaPrimeraEspecie,decimaSegundaEspecie,decimaTerceraEspecie,decimaCuartaEspecie,comentarioPedido,fechaAgregarPedido,idPedidoCliente);

    });  

    function fn_ActualizarPedidoCliente(primerEspecie,segundaEspecie,terceraEspecie,cuartaEspecie,quintaEspecie,sextaEspecie,septimaEspecie,octavaEspecie,novenaEspecie,decimaEspecie,decimaPrimeraEspecie,decimaSegundaEspecie,decimaTerceraEspecie,decimaCuartaEspecie,comentarioPedido,fechaAgregarPedido,idPedidoCliente){
        $.ajax({
            url: '/fn_consulta_ActualizarPedidoCliente',
            method: 'GET',
            data: {
                primerEspecie: primerEspecie,
                segundaEspecie: segundaEspecie,
                terceraEspecie: terceraEspecie,
                cuartaEspecie: cuartaEspecie,
                quintaEspecie: quintaEspecie,
                sextaEspecie: sextaEspecie,
                septimaEspecie: septimaEspecie,
                octavaEspecie: octavaEspecie,
                novenaEspecie: novenaEspecie,
                decimaEspecie: decimaEspecie,
                decimaPrimeraEspecie: decimaPrimeraEspecie,
                decimaSegundaEspecie: decimaSegundaEspecie,
                decimaTerceraEspecie: decimaTerceraEspecie,
                decimaCuartaEspecie: decimaCuartaEspecie,
                comentarioPedido: comentarioPedido,
                fechaAgregarPedido: fechaAgregarPedido,
                idPedidoCliente: idPedidoCliente,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el pedido correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalAgregarPedidoEditar').addClass('hidden');
                    $('#ModalAgregarPedidoEditar').removeClass('flex');
                    let fechaBuscarPedidos = $('#fechaBuscarPedidos').val();
                    fn_TraerPedidosClientes(fechaBuscarPedidos);
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

    var arrayPedidos = [];
    var arrayPedidosActual = [];
    var arrayPedidosRevisar = [];

    $(document).on("click", "#traerPedidosAnteriores", function() {
        $('#ModalTraerPedido').addClass('flex');
        $('#ModalTraerPedido').removeClass('hidden');
        arrayPedidos = [];
        arrayPedidosActual = [];
        arrayPedidosRevisar = [];
        $('#fechaTraerPedido').val(fechaHoy);
        $('#fechaRegistrarPedidoADia').val(fechaHoy);
        $('#cantidadRegistrosPedidos').text('0 registros.');
        $('#cantidadRegistrosRegistrar').text('0 pedidos.');
    });

    $('.cerrarModalTraerPedido, #ModalTraerPedido .opacity-75').on('click', function (e) {
        $('#ModalTraerPedido').addClass('hidden');
        $('#ModalTraerPedido').removeClass('flex');
    });

    $('#filtrarTraerPedidosFecha').on('click', function () {
        let fechaTraerPedido = $('#fechaTraerPedido').val();
        fn_TraerPedidosAnteriores(fechaTraerPedido);
    });

    function fn_TraerPedidosAnteriores(fechaTraerPedido){
        $.ajax({
            url: '/fn_consulta_TraerPedidosAnteriores',
            method: 'GET',
            data: {
                fechaTraerPedido: fechaTraerPedido,
            },
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    let contadorPedidos = 0;

                    arrayPedidos = [];

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        contadorPedidos++;
                        arrayPedidos.push(obj);
                    });

                    $('#cantidadRegistrosPedidos').text(contadorPedidos === 1 ? `${contadorPedidos} registro.` : `${contadorPedidos} registros.`);

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
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

    $('#btnFechaRegistrarPedidoADia').on('click', function () {
        let fechaRegistrarPedidoADia = $('#fechaRegistrarPedidoADia').val();
        fn_TraerPedidosActual(fechaRegistrarPedidoADia);
    });

    function fn_TraerPedidosActual(fechaTraerPedido){
        $.ajax({
            url: '/fn_consulta_TraerPedidosAnteriores',
            method: 'GET',
            data: {
                fechaTraerPedido: fechaTraerPedido,
            },
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    arrayPedidosActual = [];

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        arrayPedidosActual.push(obj);
                    });

                    fn_revisarDuplicados();

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
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

    function fn_revisarDuplicados() {
        arrayPedidosRevisar = arrayPedidos;
        let arrayPedidosActualRevisar = arrayPedidosActual;

        // Filtrar el arrayPedidosRevisar para eliminar elementos que coincidan con arrayPedidosActualRevisar
        arrayPedidosRevisar = arrayPedidosRevisar.filter(function(pedidoRevisar) {
            // Verificar si el pedido revisar existe en arrayPedidosActualRevisar
            return !arrayPedidosActualRevisar.some(function(pedidoActual) {
                return pedidoRevisar.codigoCliPedidos == pedidoActual.codigoCliPedidos;
            });
        });
    
        let contadorPedidosRegistrar = arrayPedidosRevisar.length;
        if (contadorPedidosRegistrar > 0) {
            $('#cantidadRegistrosRegistrar').text(contadorPedidosRegistrar === 1 ? `${contadorPedidosRegistrar} pedido.` : `${contadorPedidosRegistrar} pedidos.`);
        }else{
            $('#cantidadRegistrosRegistrar').text(contadorPedidosRegistrar === 1 ? `${contadorPedidosRegistrar} pedido.` : `${contadorPedidosRegistrar} pedidos.`);
            alertify.notify('No hay pedidos que registrar.', 'error', 3);
        }
    }      

    var totalConsultas = 0;
    var consultasCompletadas = 0;
    var timerInterval;

    $('#btnTraerPedido').on('click', function () {
        consultasCompletadas = 0;
        totalConsultas = arrayPedidosRevisar.length;
        if(arrayPedidosRevisar.length > 0) {
            Swal.fire({
                title: '¡Registrando Pedidos!',
                html: 'Espere mientras se están registrando los pedidos.',
                timer: 999999999, // Establece un valor grande para que parezca indefinido
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            })
            // Recorrer ArrayPedidosRevisar
            let fechaRegistrarPedidoADia = $('#fechaRegistrarPedidoADia').val();
            arrayPedidosRevisar.forEach(function(pedido) {
                fn_AgregarPedidoClienteDespuesDeRevisar(pedido.codigoCliPedidos, pedido.pedidoPrimerEspecie, pedido.pedidoSegundaEspecie, pedido.pedidoTercerEspecie, pedido.pedidoCuartaEspecie, pedido.pedidoQuintaEspecie, pedido.pedidoSextaEspecie, pedido.pedidoSeptimaEspecie, pedido.pedidoOctavaEspecie, pedido.pedidoNovenaEspecie, pedido.pedidoDecimaEspecie, pedido.pedidoDecimaPrimeraEspecie, pedido.pedidoDecimaSegundaEspecie, pedido.pedidoDecimaTerceraEspecie, pedido.pedidoDecimaCuartaEspecie, pedido.comentarioPedido, fechaRegistrarPedidoADia);
            });
        }else{
            alertify.notify('No hay pedidos que registrar.', 'error', 3);
        }
    });

    function fn_AgregarPedidoClienteDespuesDeRevisar(selectedCodigoCliPedidos,primerEspecie,segundaEspecie,terceraEspecie,cuartaEspecie,quintaEspecie,sextaEspecie,septimaEspecie,octavaEspecie,novenaEspecie,decimaEspecie,decimaPrimeraEspecie,decimaSegundaEspecie,decimaTerceraEspecie,decimaCuartaEspecie,comentarioPedido,fechaAgregarPedido){
        $.ajax({
            url: '/fn_consulta_AgregarPedidoCliente',
            method: 'GET',
            data: {
                selectedCodigoCliPedidos: selectedCodigoCliPedidos,
                primerEspecie: primerEspecie,
                segundaEspecie: segundaEspecie,
                terceraEspecie: terceraEspecie,
                cuartaEspecie: cuartaEspecie,
                quintaEspecie: quintaEspecie,
                sextaEspecie: sextaEspecie,
                septimaEspecie: septimaEspecie,
                octavaEspecie: octavaEspecie,
                novenaEspecie: novenaEspecie,
                decimaEspecie: decimaEspecie,
                decimaPrimeraEspecie: decimaPrimeraEspecie,
                decimaSegundaEspecie: decimaSegundaEspecie,
                decimaTerceraEspecie: decimaTerceraEspecie,
                decimaCuartaEspecie: decimaCuartaEspecie,
                comentarioPedido: comentarioPedido,
                fechaAgregarPedido: fechaAgregarPedido,
            },
            success: function(response) {
                if (response.success) {
                    consultasCompletadas++;
                    if (consultasCompletadas === totalConsultas) {
                        clearInterval(timerInterval);
                        Swal.close();
                        $('#ModalTraerPedido').addClass('hidden');
                        $('#ModalTraerPedido').removeClass('flex');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se registraron los pedidos correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // $('#filtrarPedidosFecha').trigger('click');
                        let fechaBuscarPedidos = $('#fechaBuscarPedidos').val();
                        fn_TraerPedidosClientes(fechaBuscarPedidos);
                    }
                }
            },
            error: function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Error: se completaron solo ${consultasCompletadas === 1 ? `${consultasCompletadas} registro.` : `${consultasCompletadas} registros.`}`,
                })
                clearInterval(timerInterval);
                Swal.close();
                console.error("ERROR",error);
            }
        });
    }

    // Agregar evento clic a las celdas de la tabla
    $(document).on('click', '#bodyPedidos td.valorEditable', function (e) {

        // Verificar si el td ya contiene un input
        if ($(this).find('input').length > 0) {
            return;
        }
    
        if (tipoUsuario == 'Administrador') {
            let contenidoActual = $(this).text().trim();
            let anchoTd = $(this).outerWidth();
            let altoTd = $(this).outerHeight(); // Obtener la altura del td
            let claseActual = $(this).attr('class'); // Almacenar la clase actual del td
            let columnaPedido = $(this).data('columna');
    
            // Remover la clase p-2 del td
            $(this).removeClass('p-2');
    
            let input = $('<input type="text" class="bg-transparent border-none h-full m-auto w-full text-sm text-center">')
                .val(contenidoActual)
                .on('input', function(e) {
                    if (columnaPedido != 15) {
                        let valor = $(this).val().trim();
    
                        // Validar si el valor es un número entero
                        if (!/^\d*$/.test(valor)) {
                            // Si no es un número entero, eliminar los caracteres no válidos
                            $(this).val(valor.replace(/\D/g, ''));
                        }
                    }
                });
    
            input.css({
                'max-width': anchoTd,
                'height': (altoTd - 3) + 'px'
            });
    
            $(this).empty().append(input);
            input.focus();
    
            // Almacenar referencias a la fila y a la celda
            let fila = $(this).closest('tr');
            let celdaColumna17 = fila.find('td:eq(17)');
            let celdaColumna18 = fila.find('td:eq(18)');
    
            // Manejar evento de presionar Enter o salir del input
            input.on('keypress blur', function(e) {
                if (e.type === 'keypress' && e.which !== 13) {
                    return; // Si no es la tecla Enter, salir
                }
    
                let nuevoContenido = $(this).val().trim();
                $(this).parent().text(nuevoContenido);
    
                // Extraer valores de las columnas 17 y 18
                let fechaPedido = celdaColumna17.text().trim();
                let codigoCli = celdaColumna18.text().trim();
    
                // Volver a agregar la clase al td
                $(this).addClass(claseActual);
    
                if (contenidoActual != nuevoContenido) {
                    fn_RegistrarActualizarPedidoCliente(codigoCli, fechaPedido, nuevoContenido, columnaPedido);
                }
            });
    
            // Manejar evento de teclas de flecha
            input.on('keydown', function(e) {
                let keyCode = e.which;
                let currentTd = $(this).closest('td');
                let targetTd;
    
                switch (keyCode) {
                    case 37: // Flecha izquierda
                        targetTd = currentTd.prevAll('td[data-columna]').first();
                        break;
                    case 38: // Flecha arriba
                        targetTd = currentTd.closest('tr').prevAll(':visible').first().find('td[data-columna="' + columnaPedido + '"]').first();
                        break;
                    case 39: // Flecha derecha
                        targetTd = currentTd.nextAll('td[data-columna]').first();
                        break;
                    case 40: // Flecha abajo
                        targetTd = currentTd.closest('tr').nextAll(':visible').first().find('td[data-columna="' + columnaPedido + '"]').first();
                        break;
                    default:
                        return; // Si no es una tecla de flecha, salir
                }
    
                if (targetTd && targetTd.length) {
                    targetTd.trigger('click');
                    e.preventDefault(); // Prevenir la acción por defecto de la tecla
                }
            });
        }
    });          

    function fn_RegistrarActualizarPedidoCliente(codigoCli,fechaPedido,nuevoContenido,columnaPedido){
        $.ajax({
            url: '/fn_consulta_RegistrarActualizarPedido',
            method: 'GET',
            data: {
                codigoCli: codigoCli,
                fechaPedido: fechaPedido,
                nuevoContenido: nuevoContenido,
                columnaPedido: columnaPedido,
            },
            success: function(response) {
                if (response.success) {

                    // Swal.fire({
                    //     position: 'center',
                    //     icon: 'success',
                    //     title: 'Se actualizo el pedido correctamente',
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // });
                    // $('#filtrarPedidosFecha').trigger('click');
                    alertify.notify('Se actualizo el pedido correctamente', 'success', 1);
                    let fechaBuscarPedidos = $('#fechaBuscarPedidos').val();
                    fn_TraerPedidosClientes(fechaBuscarPedidos);
                    // $('#filtrarClientePedidos').val('');
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

    // Traemos los datos de el stock de pollos en tiempo real
    fn_traerDatosEnTiempoReal();
    setInterval(fn_traerDatosEnTiempoReal, 10000);
    // Funcion para traer los datos de el stock de pollos en tiempo real
    function fn_traerDatosEnTiempoReal(){

        $.ajax({
            url: '/fn_consulta_TraerCantidadStockPollos',
            method: 'GET',
            success: function(response) {

                let cantidadPrimerEspecie = 0
                let cantidadSegundaEspecie = 0
                let cantidadTerceraEspecie = 0
                let cantidadCuartaEspecie = 0
                let cantidadQuintaEspecie = 0
                let cantidadSextaEspecie = 0
                let cantidadSeptimaEspecie = 0
                let cantidadOctavaEspecie = 0
                let cantidadNovenaEspecie = 0
                let cantidadDecimaEspecie = 0
                let cantidadDecimaPrimeraEspecie = 0
                let cantidadDecimaSegundaEspecie = 0
                let cantidadDecimaTerceraEspecie = 0
                let cantidadDecimaCuartaEspecie = 0
                let cantidadDecimaQuintaEspecie = 0
                let cantidadDecimaSextaEspecie = 0
                let cantidadDecimaSeptimaEspecie = 0
                let cantidadDecimaOctavaEspecie = 0
                let cantidadDecimaNovenaEspecie = 0
                let cantidadVigesimaEspecie = 0
                let cantidadVigesimaPrimeraEspecie = 0
                let cantidadVigesimaSegundaEspecie = 0
                let cantidadVigesimaTerceraEspecie = 0

                let pesoTotalPrimerEspecie = 0.0
                let pesoTotalSegundaEspecie = 0.0
                let pesoTotalTerceraEspecie = 0.0
                let pesoTotalCuartaEspecie = 0.0
                let pesoTotalQuintaEspecie = 0.0
                let pesoTotalSextaEspecie = 0.0
                let pesoTotalSeptimaEspecie = 0.0
                let pesoTotalOctavaEspecie = 0.0
                let pesoTotalDecimaEspecie = 0.0
                let pesoTotalDecimaPrimeraEspecie = 0.0
                let pesoTotalDecimaSegundaEspecie = 0.0
                let pesoTotalDecimaTerceraEspecie = 0.0
                let pesoTotalDecimaCuartaEspecie = 0.0
                let pesoTotalDecimaQuintaEspecie = 0.0
                let pesoTotalDecimaSextaEspecie = 0.0
                let pesoTotalDecimaSeptimaEspecie = 0.0
                let pesoTotalDecimaOctavaEspecie = 0.0
                let pesoTotalDecimaNovenaEspecie = 0.0
                let pesoTotalVigesimaEspecie = 0.0
                let pesoTotalVigesimaPrimeraEspecie = 0.0
                let pesoTotalVigesimaSegundaEspecie = 0.0
                let pesoTotalVigesimaTerceraEspecie = 0.0

                let cantidadTotalesEspecie = 0
                let pesoTotalesEspecie = 0.0

                let cantidadTotalYugo = 0
                let pesoTotalYugo = 0
                let cantidadTotalTecnica = 0
                let pesoTotalTecnica = 0
                let cantidadTotalPolloXX = 0
                let pesoTotalPolloXX = 0
                let cantidadTotalGallo = 0
                let pesoTotalGallo = 0
                let cantidadTotalGallinaDoble = 0
                let pesoTotalGallinaDoble = 0
                let cantidadTotalGallinaChica = 0
                let pesoTotalGallinaChica = 0
                let cantidadTotalPolloTrozado = 0
                let pesoTotalPolloTrozado = 0
                let cantidadTotalPolloMaltratado = 0
                let pesoTotalPolloMaltratado = 0

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // console.log(response)
                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {

                        let idEspecie = parseInt(obj.idEspecie)
                        let cantidadPes = parseInt(obj.cantidadPes)
                        let pesoNetoPes = parseFloat(obj.pesoNetoPes)
                        let pesoNetoJabas = parseFloat(obj.pesoNetoJabas)

                        if (idEspecie == 1) {
                            cantidadPrimerEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalPrimerEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalPrimerEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 2) {
                            cantidadSegundaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalSegundaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalSegundaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 3) {
                            cantidadTerceraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalTerceraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalTerceraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 4) {
                            cantidadCuartaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalCuartaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalCuartaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 5) {
                            cantidadQuintaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalQuintaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalQuintaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 6) {
                            cantidadSextaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalSextaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalSextaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 7) {
                            cantidadSeptimaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalSeptimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalSeptimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 8) {
                            cantidadOctavaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalOctavaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalOctavaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 9) {
                            cantidadNovenaEspecie += cantidadPes
                        }else if (idEspecie == 10) {
                            cantidadDecimaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 11){
                            cantidadDecimaPrimeraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaPrimeraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaPrimeraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 12){
                            cantidadDecimaSegundaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaSegundaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaSegundaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 13){
                            cantidadDecimaTerceraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaTerceraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaTerceraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 14){
                            cantidadDecimaCuartaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaCuartaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaCuartaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 15){
                            cantidadDecimaQuintaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaQuintaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaQuintaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 16){
                            cantidadDecimaSextaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaSextaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaSextaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 17){
                            cantidadDecimaSeptimaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaSeptimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaSeptimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 18){
                            cantidadDecimaOctavaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaOctavaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaOctavaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 19){
                            cantidadDecimaNovenaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaNovenaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaNovenaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 20){
                            cantidadVigesimaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalVigesimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 21){
                            cantidadVigesimaPrimeraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalVigesimaPrimeraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaPrimeraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 22){
                            cantidadVigesimaSegundaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalVigesimaSegundaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaSegundaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 23){
                            cantidadVigesimaTerceraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalVigesimaTerceraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaTerceraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }

                    });

                    cantidadTotalesEspecie = cantidadPrimerEspecie + cantidadSegundaEspecie + cantidadTerceraEspecie +
                    cantidadCuartaEspecie + cantidadQuintaEspecie + cantidadSextaEspecie + cantidadSeptimaEspecie + cantidadOctavaEspecie +
                    cantidadDecimaEspecie + cantidadDecimaPrimeraEspecie + cantidadDecimaSegundaEspecie + cantidadDecimaTerceraEspecie +
                    cantidadDecimaCuartaEspecie + cantidadDecimaQuintaEspecie + cantidadDecimaSextaEspecie + cantidadDecimaSeptimaEspecie +
                    cantidadDecimaOctavaEspecie + cantidadDecimaNovenaEspecie + cantidadVigesimaEspecie + cantidadVigesimaPrimeraEspecie + cantidadVigesimaSegundaEspecie + cantidadVigesimaTerceraEspecie + cantidadNovenaEspecie;
                    pesoTotalesEspecie = pesoTotalPrimerEspecie + pesoTotalSegundaEspecie + pesoTotalTerceraEspecie + pesoTotalCuartaEspecie +
                    pesoTotalQuintaEspecie + pesoTotalSextaEspecie + pesoTotalSeptimaEspecie + pesoTotalOctavaEspecie + pesoTotalDecimaEspecie +
                    pesoTotalDecimaPrimeraEspecie + pesoTotalDecimaSegundaEspecie + pesoTotalDecimaTerceraEspecie + pesoTotalDecimaCuartaEspecie +
                    pesoTotalDecimaQuintaEspecie + pesoTotalDecimaSextaEspecie + pesoTotalDecimaSeptimaEspecie + pesoTotalDecimaOctavaEspecie + pesoTotalDecimaNovenaEspecie + pesoTotalVigesimaEspecie + pesoTotalVigesimaPrimeraEspecie + pesoTotalVigesimaSegundaEspecie + pesoTotalVigesimaTerceraEspecie;

                    cantidadTotalYugo = cantidadPrimerEspecie + cantidadSegundaEspecie + cantidadDecimaSeptimaEspecie
                    pesoTotalYugo = pesoTotalPrimerEspecie + pesoTotalSegundaEspecie + pesoTotalDecimaSeptimaEspecie

                    cantidadTotalTecnica = cantidadTerceraEspecie + cantidadCuartaEspecie + cantidadDecimaOctavaEspecie
                    pesoTotalTecnica = pesoTotalTerceraEspecie + pesoTotalCuartaEspecie + pesoTotalDecimaOctavaEspecie

                    cantidadTotalPolloXX = cantidadDecimaSextaEspecie + cantidadDecimaNovenaEspecie
                    pesoTotalPolloXX = pesoTotalDecimaSextaEspecie + pesoTotalDecimaNovenaEspecie

                    cantidadTotalGallo = cantidadSeptimaEspecie + cantidadVigesimaSegundaEspecie
                    pesoTotalGallo = pesoTotalSeptimaEspecie + pesoTotalVigesimaSegundaEspecie

                    cantidadTotalGallinaDoble = cantidadQuintaEspecie + cantidadVigesimaEspecie
                    pesoTotalGallinaDoble = pesoTotalQuintaEspecie + pesoTotalVigesimaEspecie

                    cantidadTotalGallinaChica = cantidadSextaEspecie + cantidadVigesimaPrimeraEspecie
                    pesoTotalGallinaChica = pesoTotalSextaEspecie + pesoTotalVigesimaPrimeraEspecie

                    cantidadTotalPolloTrozado = cantidadDecimaEspecie + cantidadDecimaPrimeraEspecie + cantidadDecimaSegundaEspecie + cantidadDecimaTerceraEspecie + 
                    cantidadDecimaCuartaEspecie + cantidadDecimaQuintaEspecie + cantidadNovenaEspecie
                    pesoTotalPolloTrozado = pesoTotalDecimaEspecie + pesoTotalDecimaPrimeraEspecie + pesoTotalDecimaSegundaEspecie + pesoTotalDecimaTerceraEspecie + 
                    pesoTotalDecimaCuartaEspecie + pesoTotalDecimaQuintaEspecie

                    cantidadTotalPolloMaltratado = cantidadOctavaEspecie + cantidadVigesimaTerceraEspecie
                    pesoTotalPolloMaltratado = pesoTotalOctavaEspecie + pesoTotalVigesimaTerceraEspecie

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

                $('#totalUnidadesPrimerEspecie').text(cantidadPrimerEspecie + " " + (cantidadPrimerEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgPrimerEspecie').text(pesoTotalPrimerEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesSegundaEspecie').text(cantidadSegundaEspecie + " " + (cantidadSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgSegundaEspecie').text(pesoTotalSegundaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesTerceraEspecie').text(cantidadTerceraEspecie + " " + (cantidadTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgTerceraEspecie').text(pesoTotalTerceraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesCuartaEspecie').text(cantidadCuartaEspecie + " " + (cantidadCuartaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgCuartaEspecie').text(pesoTotalCuartaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesQuintaEspecie').text(cantidadQuintaEspecie + " " + (cantidadQuintaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgQuintaEspecie').text(pesoTotalQuintaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesSextaEspecie').text(cantidadSextaEspecie + " " + (cantidadSextaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgSextaEspecie').text(pesoTotalSextaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesSeptimaEspecie').text(cantidadSeptimaEspecie + " " + (cantidadSeptimaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgSeptimaEspecie').text(pesoTotalSeptimaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesOctavaEspecie').text(cantidadOctavaEspecie + " " + (cantidadOctavaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgOctavaEspecie').text(pesoTotalOctavaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaEspecie').text(cantidadDecimaEspecie + " " + (cantidadDecimaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaEspecie').text(pesoTotalDecimaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaPrimeraEspecie').text(cantidadDecimaPrimeraEspecie + " " + (cantidadDecimaPrimeraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaPrimeraEspecie').text(pesoTotalDecimaPrimeraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaSegundaEspecie').text(cantidadDecimaSegundaEspecie + " " + (cantidadDecimaSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaSegundaEspecie').text(pesoTotalDecimaSegundaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaTerceraEspecie').text(cantidadDecimaTerceraEspecie + " " + (cantidadDecimaTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaTerceraEspecie').text(pesoTotalDecimaTerceraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaCuartaEspecie').text(cantidadDecimaCuartaEspecie + " " + (cantidadDecimaCuartaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaCuartaEspecie').text(pesoTotalDecimaCuartaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaQuintaEspecie').text(cantidadDecimaQuintaEspecie + " " + (cantidadDecimaQuintaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaQuintaEspecie').text(pesoTotalDecimaQuintaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaSextaEspecie').text(cantidadDecimaSextaEspecie + " " + (cantidadDecimaSextaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaSextaEspecie').text(pesoTotalDecimaSextaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaSeptimaEspecie').text(cantidadDecimaSeptimaEspecie + " " + (cantidadDecimaSeptimaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaSeptimaEspecie').text(pesoTotalDecimaSeptimaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaOctavaEspecie').text(cantidadDecimaOctavaEspecie + " " + (cantidadDecimaOctavaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaOctavaEspecie').text(pesoTotalDecimaOctavaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaNovenaEspecie').text(cantidadDecimaNovenaEspecie + " " + (cantidadDecimaNovenaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaNovenaEspecie').text(pesoTotalDecimaNovenaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesVigesimaEspecie').text(cantidadVigesimaEspecie + " " + (cantidadVigesimaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgVigesimaEspecie').text(pesoTotalVigesimaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesVigesimaPrimeraEspecie').text(cantidadVigesimaPrimeraEspecie + " " + (cantidadVigesimaPrimeraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgVigesimaPrimeraEspecie').text(pesoTotalVigesimaPrimeraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesVigesimaSegundaEspecie').text(cantidadVigesimaSegundaEspecie + " " + (cantidadVigesimaSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgVigesimaSegundaEspecie').text(pesoTotalVigesimaSegundaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesVigesimaTerceraEspecie').text(cantidadVigesimaTerceraEspecie + " " + (cantidadVigesimaTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgVigesimaTerceraEspecie').text(pesoTotalVigesimaTerceraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesEspecies').text(cantidadTotalesEspecie + " " + (cantidadTotalesEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgEspecies').text(pesoTotalesEspecie.toFixed(2) + " Kg");
                // ========
                $('#cantidadTotalYugo').text(cantidadTotalYugo + " " + (cantidadTotalYugo === 1 ? "Ud." : "Uds."));
                $('#pesoTotalYugo').text(pesoTotalYugo.toFixed(2) + " Kg");
                $('#cantidadTotalTecnica').text(cantidadTotalTecnica + " " + (cantidadTotalTecnica === 1 ? "Ud." : "Uds."));
                $('#pesoTotalTecnica').text(pesoTotalTecnica.toFixed(2) + " Kg");
                $('#cantidadTotalPolloXX').text(cantidadTotalPolloXX + " " + (cantidadTotalPolloXX === 1 ? "Ud." : "Uds."));
                $('#pesoTotalPolloXX').text(pesoTotalPolloXX.toFixed(2) + " Kg");
                $('#cantidadTotalGallo').text(cantidadTotalGallo + " " + (cantidadTotalGallo === 1 ? "Ud." : "Uds."));
                $('#pesoTotalGallo').text(pesoTotalGallo.toFixed(2) + " Kg");
                $('#cantidadTotalGallinaDoble').text(cantidadTotalGallinaDoble + " " + (cantidadTotalGallinaDoble === 1 ? "Ud." : "Uds."));
                $('#pesoTotalGallinaDoble').text(pesoTotalGallinaDoble.toFixed(2) + " Kg");
                $('#cantidadTotalGallinaChica').text(cantidadTotalGallinaChica + " " + (cantidadTotalGallinaChica === 1 ? "Ud." : "Uds."));
                $('#pesoTotalGallinaChica').text(pesoTotalGallinaChica.toFixed(2) + " Kg");
                $('#cantidadTotalPolloTrozado').text(cantidadTotalPolloTrozado + " " + (cantidadTotalPolloTrozado === 1 ? "Ud." : "Uds."));
                $('#pesoTotalPolloTrozado').text(pesoTotalPolloTrozado.toFixed(2) + " Kg");
                $('#cantidadTotalPolloMaltratado').text(cantidadTotalPolloMaltratado + " " + (cantidadTotalPolloMaltratado === 1 ? "Ud." : "Uds."));
                $('#pesoTotalPolloMaltratado').text(pesoTotalPolloMaltratado.toFixed(2) + " Kg");

                let bodyReporteAcumuladoExcelStockPollos="";
                let tbodyReporteAcumuladoExcelStockPollos = $('#bodyReporteAcumuladoExcelStockPollos');
                tbodyReporteAcumuladoExcelStockPollos.empty();
                bodyReporteAcumuladoExcelStockPollos += construirFilaTotalesStockdePollos(cantidadTotalYugo, pesoTotalYugo,cantidadTotalTecnica, pesoTotalTecnica, cantidadTotalPolloXX, pesoTotalPolloXX, cantidadTotalGallo, pesoTotalGallo, cantidadTotalGallinaDoble, pesoTotalGallinaDoble);
                tbodyReporteAcumuladoExcelStockPollos.html(bodyReporteAcumuladoExcelStockPollos);
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });

    }

    function construirFilaTotalesStockdePollos(cantidadTotalYugo, pesoTotalYugo,cantidadTotalTecnica, pesoTotalTecnica, cantidadTotalPolloXX, pesoTotalPolloXX, cantidadTotalGallo, pesoTotalGallo, cantidadTotalGallinaDoble, pesoTotalGallinaDoble)
    {   
        return `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">Yugo</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalYugo}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalYugo).toFixed(2)} Kg.</td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">Tecnica</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalTecnica}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalTecnica).toFixed(2)} Kg.</td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">Pollo XX</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalPolloXX}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalPolloXX).toFixed(2)} Kg.</td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">Gallo</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalGallo}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalGallo).toFixed(2)} Kg.</td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">Gallina Doble</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalGallinaDoble}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalGallinaDoble).toFixed(2)} Kg.</td>
        </tr>
        `;
    }
    
});
import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteDePagos').val(fechaHoy);
    $('#fechaHastaReporteDePagos').val(fechaHoy);
    $('#fechaDesdeCuentaDelCliente').val(fechaHoy);
    $('#fechaHastaCuentaDelCliente').val(fechaHoy);
    $('#fechaDesdeCuentaDelClienteDescuentos').val(fechaHoy);
    $('#fechaHastaCuentaDelClienteDescuentos').val(fechaHoy);
    $('#fechaAgregarPago').val(fechaHoy);
    $('#fechaAgregarDescuento').val(fechaHoy);

    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    
    var currentTime = hours + ":" + minutes + ":" + seconds;
    
    $('#horaAgregarPago').val(currentTime);

    declarar_especies();
    fn_TraerPagosFechas(fechaHoy,fechaHoy);
    fn_RegistroDescuentos(fechaHoy,fechaHoy);
    declarar_especies_descuentos();

    /* ============ Eventos ============ */

    // Eventos para abrir y cerrar modal de Agregar Pago

    $('#registrar_agregarPago_submit').on('click', function () {
        $('#ModalAgregarPagoCliente').addClass('flex');
        $('#ModalAgregarPagoCliente').removeClass('hidden');
        $('#idAgregarPagoCliente').focus();

        $('#idAgregarPagoCliente').val('');
        $('#valorAgregarPagoCliente').val('');
        $('#codAgregarPagoCliente').val('');
        $('#comentarioAgregarPagoCliente').val('');
        $('#selectedCodigoCliAgregarPagoCliente').attr('val', '');
        $('#deudaTotal').text('0.00');
        $('#fechaAgregarPago').val(fechaHoy);
        $('#formaDePago').val($('#formaDePago option:first').val());
        $('#divCodTrans').removeClass('flex').addClass('hidden');
        $('#divBanco').removeClass('flex').addClass('hidden');
    });

    $('.cerrarModalAgregarPagoCliente, #ModalAgregarPagoCliente .opacity-75').on('click', function (e) {
        $('#ModalAgregarPagoCliente').addClass('hidden');
        $('#ModalAgregarPagoCliente').removeClass('flex');
    });

    // Eventos para abrir y cerrar modal de Agregar Descuento por Kilo

    $('#registrar_agregarDescuento_submit').on('click', function () {
        $('#ModalAgregarDescuentoCliente').addClass('flex');
        $('#ModalAgregarDescuentoCliente').removeClass('hidden');
        $('#idAgregarDescuentoCliente').focus();

        $('#fechaAgregarDescuento').val(fechaHoy);
        $('#presentacionAgregarDescuentoCliente').val($('#presentacionAgregarDescuentoCliente option:first').val());
        $('#selectedCodigoCliAgregarDescuentoCliente').attr('value','');
        $('#idAgregarDescuentoCliente').val('');
        $('#valorAgregarDescuentoCliente').val('');
        $('#valorAgregarDescuentoCliente').val('');
    });

    $('.cerrarModalAgregarDescuentoCliente, #ModalAgregarDescuentoCliente .opacity-75').on('click', function (e) {
        $('#ModalAgregarDescuentoCliente').addClass('hidden');
        $('#ModalAgregarDescuentoCliente').removeClass('flex');
    });

    // Eventos para mostrar y ocultar interfaz de Cuenta del Cliente

    $('#registrar_FiltrarPorCliente_submit').on('click', function () {
        $('#selectedCodigoCliCuentaDelCliente').attr('value','');
        $('#idCuentaDelCliente').val('');
        //para limpiar la tabla no te equivoques de nuevo 
        $('#bodyCuentaDelCliente').empty();
        $('#bodyCuentaDelCliente').append('<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>');
        
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#segundoContenedorReporteDePagos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelCliente').toggle('hidden');

    });

    $('#descuento_FiltrarPorCliente_submit').on('click', function () {
        $('#selectedCodigoCliCuentaDelClienteDescuentos').attr('value','');
        $('#idCuentaDelClienteDescuentos').val('');
        
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#tercerContenedorReporteDeDescuentos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelClienteDescuento').toggle('hidden');
        fn_RegistroDescuentos(fechaHoy,fechaHoy);
        $('#fechaDesdeCuentaDelClienteDescuentos').val(fechaHoy);
        $('#fechaHastaCuentaDelClienteDescuentos').val(fechaHoy);
    });

    $('#btnRetrocesoCuentaDelCliente').on('click', function () {
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#segundoContenedorReporteDePagos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelCliente').toggle('hidden');
    });

    $('#btnRetrocesoCuentaDelClienteDescuento').on('click', function () {
        $('#primerContenedorReporteDePagos').toggle('flex hidden');
        $('#tercerContenedorReporteDeDescuentos').toggle('flex hidden');
        $('#btnRetrocesoCuentaDelClienteDescuento').toggle('hidden');
    });

    $('#bancoAgregarPagoCliente').on('input', function() {
        // Obtiene el valor actual del campo
        let valorCampo = $(this).val();
    
        // Convierte el valor a mayúsculas
        valorCampo = valorCampo.toUpperCase();
    
        // Establece el valor modificado en el campo
        $(this).val(valorCampo);
    });
    
    $('.mayusculasGaaa').on('input', function() {
        // Obtiene el valor actual del campo
        let valorCampo = $(this).val();
    
        // Convierte el valor a mayúsculas
        valorCampo = valorCampo.toUpperCase();
    
        // Establece el valor modificado en el campo
        $(this).val(valorCampo);
    });  

    // Evento para registrar Pagos de Clientes

    $('#btnAgregarPagoCliente').on('click', function () {
        let codigoCliente = $('#selectedCodigoCliAgregarPagoCliente').attr('value');
        let montoAgregarPagoCliente = $('#valorAgregarPagoCliente').val();
        let fechaAgregarPagoCliente = $('#fechaAgregarPago').val();
        let formaDePago = $('#formaDePago').val();
        let codAgregarPagoCliente = $('#codAgregarPagoCliente').val();
        let comentarioAgregarPagoCliente = $('#comentarioAgregarPagoCliente').val();
        let bancoAgregarPagoCliente = $('#bancoAgregarPagoCliente').val();
        let horaAgregarPago = $('#horaAgregarPago').val();

        let todosCamposCompletos = true

        $('#divAgregarPagoCliente .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        if (todosCamposCompletos) {
            let valorCampo = parseFloat($('#valorAgregarPagoCliente').val());
            if (valorCampo > 0){
                fn_AgregarPagoCliente(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente,bancoAgregarPagoCliente,horaAgregarPago);
            }else{
                alertify.notify('El monto no puede ser 0', 'error', 3);
                $('#valorAgregarPagoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
            }
        } else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
        }
    });

    // Evento para registrar Descuento por Cliente

    $('#btnAgregarDescuentoCliente').on('click', function () {
        let todosCamposCompletos = true

        let codigoCliente = $('#selectedCodigoCliAgregarDescuentoCliente').attr('value');
        let pesoAgregarDescuentoCliente = parseFloat($('#valorAgregarDescuentoCliente').val())*-1;
        let fechaAgregarDescuentoCliente = $('#fechaAgregarDescuento').val();
        let especieAgregarDescuentoCliente = $('#presentacionAgregarDescuentoCliente').find("option:selected").val();
        let comentarioAgregarDescuentoCliente = $('#comentarioAgregarDescuentoCliente').val();

        let precioPrimerEspecieDescuento = $('#precioPrimerEspecieDescuento').val();
        let precioSegundaEspecieDescuento = $('#precioSegundaEspecieDescuento').val();
        let precioTerceraEspecieDescuento = $('#precioTerceraEspecieDescuento').val();
        let precioCuartaEspecieDescuento = $('#precioCuartaEspecieDescuento').val();
        let precioQuintaEspecieDescuento = $('#precioQuintaEspecieDescuento').val();
        let precioSextaEspecieDescuento = $('#precioSextaEspecieDescuento').val();
        let precioSeptimaEspecieDescuento = $('#precioSeptimaEspecieDescuento').val();
        let precioOctavaEspecieDescuento = $('#precioOctavaEspecieDescuento').val();
        let precioDecimaEspecieDescuento = $('#precioDecimaEspecieDescuento').val();
        let precioDecimaPrimeraEspecieDescuento = $('#precioDecimaPrimeraEspecieDescuento').val();
        let precioDecimaSegundaEspecieDescuento = $('#precioDecimaSegundaEspecieDescuento').val();
        let precioDecimaTerceraEspecieDescuento = $('#precioDecimaTerceraEspecieDescuento').val();
        let precioDecimaCuartaEspecieDescuento = $('#precioDecimaCuartaEspecieDescuento').val();
        let precioDecimaQuintaEspecieDescuento = $('#precioDecimaQuintaEspecieDescuento').val();
        let precioDecimaSextaEspecieDescuento = $('#precioDecimaSextaEspecieDescuento').val()
        let precioDecimaSeptimaEspecieDescuento = $('#precioDecimaSeptimaEspecieDescuento').val()
        let precioDecimaOctavaEspecieDescuento = $('#precioDecimaOctavaEspecieDescuento').val()

        let precioAgregarDescuentoCliente = 0

        if (especieAgregarDescuentoCliente == primerEspecieGlobal){
            precioAgregarDescuentoCliente = precioPrimerEspecieDescuento
        }else if (especieAgregarDescuentoCliente == segundaEspecieGlobal){
            precioAgregarDescuentoCliente = precioSegundaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == terceraEspecieGlobal){
            precioAgregarDescuentoCliente = precioTerceraEspecieDescuento
        }else if (especieAgregarDescuentoCliente == cuartaEspecieGlobal){
            precioAgregarDescuentoCliente = precioCuartaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == quintaEspecieGlobal){
            precioAgregarDescuentoCliente = precioQuintaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == sextaEspecieGlobal){
            precioAgregarDescuentoCliente = precioSextaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == septimaEspecieGlobal){
            precioAgregarDescuentoCliente = precioSeptimaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == octavaEspecieGlobal){
            precioAgregarDescuentoCliente = precioOctavaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == decimaEspecieGlobal){
            precioAgregarDescuentoCliente = precioDecimaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == decimaPrimeraEspecieGlobal){
            precioAgregarDescuentoCliente = precioDecimaPrimeraEspecieDescuento
        }else if (especieAgregarDescuentoCliente == decimaSegundaEspecieGlobal ){
            precioAgregarDescuentoCliente = precioDecimaSegundaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == decimaTerceraEspecieGlobal ){
            precioAgregarDescuentoCliente = precioDecimaTerceraEspecieDescuento
        }else if (especieAgregarDescuentoCliente == decimaCuartaEspecieGlobal ){
            precioAgregarDescuentoCliente = precioDecimaCuartaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == decimaQuintaEspecieGlobal ){
            precioAgregarDescuentoCliente = precioDecimaQuintaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == 16 ){
            precioAgregarDescuentoCliente = precioDecimaSextaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == 17 ){
            precioAgregarDescuentoCliente = precioDecimaSeptimaEspecieDescuento
        }else if (especieAgregarDescuentoCliente == 18 ){
            precioAgregarDescuentoCliente = precioDecimaOctavaEspecieDescuento
        }

        $('#divAgregarDescuentoCliente .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        // Validar que especieAgregarDescuentoCliente no sea igual a 0
        if (especieAgregarDescuentoCliente != "0") {
            if (todosCamposCompletos) {
                let valorCampo = parseFloat($('#valorAgregarDescuentoCliente').val());
                if (valorCampo > 0) {
                    fn_AgregarDescuentoCliente(codigoCliente, pesoAgregarDescuentoCliente, fechaAgregarDescuentoCliente, especieAgregarDescuentoCliente, precioAgregarDescuentoCliente, comentarioAgregarDescuentoCliente);
                } else {
                    alertify.notify('El peso en Kg no puede ser 0', 'error', 3);
                    $('#valorAgregarDescuentoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                }
            } else {
                // Mostrar una alerta de que debe completar los campos obligatorios
                alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
            }
        } else {
            // Mostrar una alerta de que especieAgregarDescuentoCliente no puede ser igual a 0
            alertify.notify('Debe seleccionar una especie', 'error', 3);
            $('#presentacionAgregarDescuentoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }
    });

    $('#filtrar_pagos_submit').on('click', function () {
        let fechaDesdeTraerPagos = $('#fechaDesdeReporteDePagos').val();
        let fechaHastaTraerPagos = $('#fechaHastaReporteDePagos').val();
        fn_TraerPagosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
    });

    $('#btnBuscarCuentaDelClienteDescuentos').on('click', function () {
        let fechaDesdeTraerDescuentos = $('#fechaDesdeCuentaDelClienteDescuentos').val();
        let fechaHastaTraerDescuentos = $('#fechaHastaCuentaDelClienteDescuentos').val();
        fn_RegistroDescuentos(fechaDesdeTraerDescuentos, fechaHastaTraerDescuentos);
    });

    // Hace aparecer o desaparecer el div para registrar codigo de tranferencia segun sea transferencia o efectivo

    $('#formaDePago').on('change',function() {
        var selectedOption = $(this).val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#divCodTrans').removeClass('hidden').addClass('flex');
            $('#divBanco').removeClass('hidden').addClass('flex');
        } else {
            // Si se selecciona cualquier otra opción, oculta el div "codTrans"
            $('#divCodTrans').removeClass('flex').addClass('hidden');
            $('#divBanco').removeClass('flex').addClass('hidden');
        }
    });

    // Llamar a la función para filtrar clientes en Agregar Pago

    $('#idAgregarPagoCliente').on('input', function () {
        let inputAgregarPagoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesAgregarPagoCliente');
        contenedorClientes.empty();

        if (inputAgregarPagoCliente.length > 1 || inputAgregarPagoCliente != "") {
            fn_TraerClientesAgregarPagoCliente(inputAgregarPagoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    // Llamar a la función para filtrar clientes en Agregar Descuento por Kg

    $('#idAgregarDescuentoCliente').on('input', function () {
        let inputAgregarDescuentoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesAgregarDescuentoCliente');
        contenedorClientes.empty();

        if (inputAgregarDescuentoCliente.length > 1 || inputAgregarDescuentoCliente != "") {
            fn_TraerClientesAgregarDescuento(inputAgregarDescuentoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    // Llamar a la función para filtrar clientes en Cuenta de Cliente

    $('#idCuentaDelCliente').on('input', function () {
        let inputCuentaDelCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesCuentaDelCliente');
        contenedorClientes.empty();

        if (inputCuentaDelCliente.length > 1 || inputCuentaDelCliente != "") {
            fn_TraerClientesCuentaDelCliente(inputCuentaDelCliente)
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    /* ============ Termina Eventos ============ */


    /* ============ Funciones ============ */

    var primerEspecieGlobal = 0
    var segundaEspecieGlobal = 0
    var terceraEspecieGlobal = 0
    var cuartaEspecieGlobal = 0
    var quintaEspecieGlobal = 0
    var sextaEspecieGlobal = 0
    var septimaEspecieGlobal = 0
    var octavaEspecieGlobal = 0
    var decimaEspecieGlobal = 0
    var decimaPrimeraEspecieGlobal = 0
    var decimaSegundaEspecieGlobal = 0
    var decimaTerceraEspecieGlobal = 0
    var decimaCuartaEspecieGlobal = 0
    var decimaQuintaEspecieGlobal = 0

    var nombrePrimerEspecieGlobal = ""
    var nombreSegundaEspecieGlobal = ""
    var nombreTerceraEspecieGlobal = ""
    var nombreCuartaEspecieGlobal = ""
    var nombreQuintaEspecieGlobal = ""
    var nombreSextaEspecieGlobal = ""
    var nombreSeptimaEspecieGlobal = ""
    var nombreOctavaEspecieGlobal = ""
    var nombreDecimaEspecieGlobal = ""
    var nombreDecimaPrimeraEspecieGlobal = ""
    var nombreDecimaSegundaEspecieGlobal = ""
    var nombreDecimaTerceraEspecieGlobal = ""
    var nombreDecimaCuartaEspecieGlobal = ""
    var nombreDecimaQuintaEspecieGlobal = ""

    function declarar_especies(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades
                    primerEspecieGlobal = parseInt(response[0].idEspecie);
                    segundaEspecieGlobal  = parseInt(response[1].idEspecie);
                    terceraEspecieGlobal = parseInt(response[2].idEspecie);
                    cuartaEspecieGlobal = parseInt(response[3].idEspecie);
                    quintaEspecieGlobal = parseInt(response[4].idEspecie);
                    sextaEspecieGlobal = parseInt(response[5].idEspecie);
                    septimaEspecieGlobal = parseInt(response[6].idEspecie);
                    octavaEspecieGlobal = parseInt(response[7].idEspecie);
                    decimaEspecieGlobal = parseInt(response[8].idEspecie);
                    decimaPrimeraEspecieGlobal = parseInt(response[9].idEspecie);
                    decimaSegundaEspecieGlobal = parseInt(response[10].idEspecie);
                    decimaTerceraEspecieGlobal = parseInt(response[11].idEspecie);
                    decimaCuartaEspecieGlobal = parseInt(response[12].idEspecie);
                    decimaQuintaEspecieGlobal = parseInt(response[13].idEspecie);

                    nombrePrimerEspecieGlobal = response[0].nombreEspecie;
                    nombreSegundaEspecieGlobal = response[1].nombreEspecie;
                    nombreTerceraEspecieGlobal = response[2].nombreEspecie;
                    nombreCuartaEspecieGlobal = response[3].nombreEspecie;
                    nombreQuintaEspecieGlobal = response[4].nombreEspecie;
                    nombreSextaEspecieGlobal = response[5].nombreEspecie;
                    nombreSeptimaEspecieGlobal = response[6].nombreEspecie;
                    nombreOctavaEspecieGlobal = response[7].nombreEspecie;
                    nombreDecimaEspecieGlobal = response[8].nombreEspecie;
                    nombreDecimaPrimeraEspecieGlobal = response[9].nombreEspecie;
                    nombreDecimaSegundaEspecieGlobal = response[10].nombreEspecie;
                    nombreDecimaTerceraEspecieGlobal = response[11].nombreEspecie;
                    nombreDecimaCuartaEspecieGlobal = response[12].nombreEspecie;
                    nombreDecimaQuintaEspecieGlobal = response[13].nombreEspecie;

                    // Obtener el select
                    let selectPresentacion = $('#presentacionAgregarDescuentoCliente');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectPresentacion.append($('<option>', {
                        value: '0',
                        text: 'Seleccione presentación',
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

    function fn_TraerClientesAgregarPagoCliente(inputAgregarPagoCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarPagoCliente',
            method: 'GET',
            data: {
                inputAgregarPagoCliente: inputAgregarPagoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesAgregarPagoCliente')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idAgregarPagoCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliAgregarPagoCliente').attr("value", obj.codigoCli);
                            fn_TraerDeudaTotal(obj.codigoCli)

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

    function fn_TraerDeudaTotal(codigoCliente) {
        $.ajax({
            url: '/fn_consulta_TraerDeudaTotal',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
            },
            success: function (response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    // Obtener el select
                    let inputDeudaTotal = $('#deudaTotal');
                    inputDeudaTotal.empty();
    
                    // Inicializar variables para sumar los valores
                    let totalDeuda = 0;
                    let totalPagos = 0;
                    let totalDescuentos = 0;
    
                    // Iterar sobre los objetos y sumar los valores
                    response.forEach(function (obj) {
                        totalDeuda += parseFloat(obj.deudaTotal);
                        totalPagos += parseFloat(obj.cantidadPagos);
                        totalDescuentos += parseFloat(obj.ventaDescuentos);
                    });
    
                    // Calcular el total consolidado
                    let totalConsolidado = totalDeuda - totalPagos + totalDescuentos;
    
                    // Formatear el número con punto y dos decimales
                    let formateoTotal = totalConsolidado.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });
    
                    // Actualizar los elementos en la página con el valor consolidado
                    $('#deudaTotal').html(formateoTotal);
    
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }
    

    function fn_TraerClientesAgregarDescuento(inputAgregarDescuentoCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarDescuento',
            method: 'GET',
            data: {
                idAgregarDescuento: inputAgregarDescuentoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesAgregarDescuentoCliente')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idAgregarDescuentoCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliAgregarDescuentoCliente').attr("value", obj.codigoCli);
                            fn_TraerPreciosClienteDescuento(obj.codigoCli)

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

    function fn_TraerPreciosClienteDescuento(codigoCliente){
        $.ajax({
            url: '/fn_consulta_TraerPreciosClienteDescuento',
            method: 'GET',
            data:{
                codigoCliente: codigoCliente,
            },
            success: function(response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    $('#precioPrimerEspecieDescuento').attr("value",response[0].primerEspecie)
                    $('#precioSegundaEspecieDescuento').attr("value",response[0].segundaEspecie)
                    $('#precioTerceraEspecieDescuento').attr("value",response[0].terceraEspecie)
                    $('#precioCuartaEspecieDescuento').attr("value",response[0].cuartaEspecie)
                    $('#precioQuintaEspecieDescuento').attr("value",response[0].quintaEspecie)
                    $('#precioSextaEspecieDescuento').attr("value",response[0].sextaEspecie)
                    $('#precioSeptimaEspecieDescuento').attr("value",response[0].septimaEspecie)
                    $('#precioOctavaEspecieDescuento').attr("value",response[0].octavaEspecie)
                    $('#precioDecimaEspecieDescuento').attr("value",response[0].decimaEspecie)
                    $('#precioDecimaPrimeraEspecieDescuento').attr("value",response[0].decimaPrimeraEspecie)
                    $('#precioDecimaSegundaEspecieDescuento').attr("value",response[0].decimaSegundaEspecie)
                    $('#precioDecimaTerceraEspecieDescuento').attr("value",response[0].decimaTerceraEspecie)
                    $('#precioDecimaCuartaEspecieDescuento').attr("value",response[0].decimaCuartaEspecie)
                    $('#precioDecimaQuintaEspecieDescuento').attr("value",response[0].decimaQuintaOtrasEspecies)
                    $('#precioDecimaSextaEspecieDescuento').attr("value",response[0].decimaSextaEspecies)
                    $('#precioDecimaSeptimaEspecieDescuento').attr("value",response[0].decimaSeptimaEspecies)
                    $('#precioDecimaOctavaEspecieDescuento').attr("value",response[0].decimaOctavaEspecies)
    
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }    

    function fn_TraerClientesCuentaDelCliente(inputCuentaDelCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesCuentaDelCliente',
            method: 'GET',
            data: {
                idCuentaDelCliente: inputCuentaDelCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesCuentaDelCliente')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idCuentaDelCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliCuentaDelCliente').attr("value", obj.codigoCli);

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

    function fn_AgregarPagoCliente(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente,bancoAgregarPagoCliente,horaAgregarPago){
        $.ajax({
            url: '/fn_consulta_AgregarPagoCliente',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
                montoAgregarPagoCliente: montoAgregarPagoCliente,
                fechaAgregarPagoCliente: fechaAgregarPagoCliente,
                formaDePago:formaDePago,
                codAgregarPagoCliente:codAgregarPagoCliente,
                comentarioAgregarPagoCliente:comentarioAgregarPagoCliente,
                bancoAgregarPagoCliente:bancoAgregarPagoCliente,
                horaAgregarPago:horaAgregarPago,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro el pago correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#divAgregarPagoCliente .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });

                    fn_TraerDeudaTotal(codigoCliente);
                    $('#ModalAgregarPagoCliente').addClass('hidden');
                    $('#ModalAgregarPagoCliente').removeClass('flex');
                    $('#filtrar_pagos_submit').trigger('click');
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

    function fn_AgregarDescuentoCliente(codigoCliente,pesoAgregarDescuentoCliente,fechaAgregarDescuentoCliente,especieAgregarDescuentoCliente,precioAgregarDescuentoCliente, comentarioAgregarDescuentoCliente) {
        $.ajax({
            url: '/fn_consulta_AgregarDescuentoCliente',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
                pesoAgregarDescuentoCliente: pesoAgregarDescuentoCliente,
                fechaAgregarDescuentoCliente: fechaAgregarDescuentoCliente,
                especieAgregarDescuentoCliente:especieAgregarDescuentoCliente,
                precioAgregarDescuentoCliente:precioAgregarDescuentoCliente,
                comentarioAgregarDescuentoCliente: comentarioAgregarDescuentoCliente,
            },
            success: function(response) {
                if (response.success) {

                    $('#comentarioAgregarDescuentoCliente').val('')
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro el descuento correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#divAgregarDescuentoCliente .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });

                    $('#presentacionAgregarDescuentoCliente').removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    
                    fn_TraerDeudaTotal(codigoCliente)
                    $('#ModalAgregarDescuentoCliente').addClass('hidden');
                    $('#ModalAgregarDescuentoCliente').removeClass('flex');
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
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.fechaOperacionPag));
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

    function fn_RegistroDescuentos(fechaDesdeTraerDescuentos,fechaHastaTraerDescuentos) {
        $.ajax({
            url: '/fn_consulta_RegistroDescuentos',
            method: 'GET',
            data:{
                fechaDesdeTraerDescuentos:fechaDesdeTraerDescuentos,
                fechaHastaTraerDescuentos:fechaHastaTraerDescuentos,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyCuentaDelClienteDescuentos = $('#bodyCuentaDelClienteDescuentos');
                    tbodyCuentaDelClienteDescuentos.empty();
                    let nuevaFila = ""

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idDescuento));

                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(parseFloat(obj.pesoDesc).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.nombreEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(parseFloat(obj.precioDesc).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.fechaRegistroDesc));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.observacion));  
                        
                        // Agregar la nueva fila al tbody
                        tbodyCuentaDelClienteDescuentos.append(nuevaFila);
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

    /* ============ Termina Funciones ============ */

    $('#idCuentaDelClienteDescuentos').on('input', function() {
        let nombreFiltrar = $('#idCuentaDelClienteDescuentos').val().toUpperCase(); // Obtiene el valor del campo de filtro de nombre

        // Mostrar todas las filas
        $('#tablaCuentaDelClienteDescuentos tbody tr').show();

        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaCuentaDelClienteDescuentos tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    });

    $('#formaDePagoEditar').on('change',function() {
        var selectedOption = $(this).val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#divCodTransEditar').removeClass('hidden').addClass('flex');
            $('#divBancoEditar').removeClass('hidden').addClass('flex');
        } else {
            // Si se selecciona cualquier otra opción, oculta el div "codTrans"
            $('#divCodTransEditar').removeClass('flex').addClass('hidden');
            $('#divBancoEditar').removeClass('flex').addClass('hidden');
        }
    });

    $('.cerrarModalAgregarPagoClienteEditar, #ModalAgregarPagoClienteEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarPagoClienteEditar').addClass('hidden');
        $('#ModalAgregarPagoClienteEditar').removeClass('flex');
    });

    $('.cerrarModalEditarDescuento, #ModalEditarDescuentoClienteEditar .opacity-75').on('click', function (e) {
        $('#ModalEditarDescuentoClienteEditar').addClass('hidden');
        $('#ModalEditarDescuentoClienteEditar').removeClass('flex');
    });

    $(document).on("dblclick", "#bodyReporteDePagos tr.editarPagos", function() {
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            let idReporteDePago= fila.find('td:eq(0)').text();
            //console.log('Report', idReporteDePago);

            $('#idReporteDePago').attr("value",idReporteDePago);
            fn_EditarPago(idReporteDePago);
            
            $('#ModalAgregarPagoClienteEditar').addClass('flex');
            $('#ModalAgregarPagoClienteEditar').removeClass('hidden');

        }
    });

    function declarar_especies_descuentos(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    
                    // Obtener el select
                    let selectPresentacion = $('#editarPresentacionDescuentoCliente');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

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

    $(document).on("dblclick", "#bodyCuentaDelClienteDescuentos tr", function() {
            let codigoDescuento = $(this).find('td:eq(0)').text();
            fn_ConsultarEditarDescuento(codigoDescuento)
    });

    function fn_ConsultarEditarDescuento(codigoDescuento){
        $.ajax({
            url: '/fn_consulta_EditarDescuentos',
            method: 'GET',
            data: {
                codigoDescuento:codigoDescuento,
            },
            success: function(response) {
                response.forEach(function(obj){
                    //console.log(obj)
                    let pesoDesc = parseFloat(obj.pesoDesc)*-1
                    $('#idEditarNombreDeClienteDescuento').attr("value",obj.codigoCli)
                    $('#valorEditarDescuentoCliente').attr("value",obj.idDescuento);
                    $('#idEditarNombreDescuentoCliente').val(obj.nombreCompleto);
                    $('#editarPresentacionDescuentoCliente').val(obj.especieDesc);
                    $('#fechaPagoEditarDescuento').val(obj.fechaRegistroDesc);
                    $("#valorClienteEditarDescuento").val(pesoDesc.toFixed(2));
                    $("#comentarioEditarDescuentoCliente").val(obj.observacion);
                    $('#valorPrecioEditarDescuento').val(parseFloat(obj.precioDesc).toFixed(2));
                    
                    $('#ModalEditarDescuentoClienteEditar').addClass('flex');
                    $('#ModalEditarDescuentoClienteEditar').removeClass('hidden');

                });
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

    $('#btnEditarDescuentoClienteEditar').on('click', function () {
        let idDescuento = $('#valorEditarDescuentoCliente').attr("value");
        let nombreClienteEditar = $('#idEditarNombreDeClienteDescuento').attr('value');
        let fechaRegistroDesc = $('#fechaPagoEditarDescuento').val();
        let nombreEspecie = $('#editarPresentacionDescuentoCliente').val();
        let pesoDesc = $('#valorClienteEditarDescuento').val();
        pesoDesc = parseFloat(pesoDesc)*-1;
        let observacion = $('#comentarioEditarDescuentoCliente').val();
        let precioDescuento = $('#valorPrecioEditarDescuento').val();
        //console.log("id:", idDescuento, nombreClienteEditar, fechaRegistroDesc, nombreEspecie, pesoDesc, observacion);
        fn_ConsultarEditarDescuentoCliente(idDescuento, nombreClienteEditar, fechaRegistroDesc, nombreEspecie, pesoDesc, observacion,precioDescuento);
    });

    function fn_ConsultarEditarDescuentoCliente(idDescuento, nombreClienteEditar, fechaRegistroDesc, nombreEspecie, pesoDesc, observacion,precioDescuento){
        $.ajax({
            url: '/fn_consulta_EditarDescuentoCliente',
            method: 'GET',
            data: {
                idDescuento:idDescuento,
                nombreClienteEditar: nombreClienteEditar,
                fechaRegistroDesc: fechaRegistroDesc,
                nombreEspecie: nombreEspecie,
                pesoDesc: pesoDesc,
                observacion: observacion,
                precioDescuento:precioDescuento,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el descuento correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#btnBuscarCuentaDelClienteDescuentos').trigger('click');
                    $('#ModalEditarDescuentoClienteEditar').addClass('hidden');
                    $('#ModalEditarDescuentoClienteEditar').removeClass('flex');
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

    $(document).on('contextmenu', '#bodyCuentaDelClienteDescuentos tr.editarPagos', function (e) {
        e.preventDefault();
        let codigoDescuento = $(this).closest("tr").find("td:first").text();
        Swal.fire({
            title: '¿Desea eliminar el Registro?',
            text: "¡Estas seguro de eliminar el pago!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                fn_EliminarDescuento(codigoDescuento);
            }
        })
    });

    function fn_EliminarDescuento(codigoDescuento){
        $.ajax({
            url: '/fn_consulta_EliminarDescuento',
            method: 'GET',
            data: {
                codigoDescuento: codigoDescuento,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino el pago correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#btnBuscarCuentaDelClienteDescuentos').trigger('click');
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

    function fn_TraerDeudaTotalEditar(codigoCliente){
        $.ajax({
            url: '/fn_consulta_TraerDeudaTotal',
            method: 'GET',
            data:{
                codigoCliente: codigoCliente,
            },
            success: function(response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    // Obtener el select
                    let inputDeudaTotal = $('#deudaTotalEditar');
                    inputDeudaTotal.empty();
    
                    let deudaTotal = parseFloat(response[0].deudaTotal);
                    let cantidadPagos = parseFloat(response[0].cantidadPagos);
                    let ventaDescuentos = parseFloat(response[0].ventaDescuentos);
    
                    let total = deudaTotal - cantidadPagos + ventaDescuentos;
    
                    // Formatear el número con punto y dos decimales
                    let formateoTotal = total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });
    
                    // Actualizar los elementos en la página con los valores
                    $('#deudaTotalEditar').html(formateoTotal);
    
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }
    
    $('#btnAgregarPagoClienteEditar').on('click', function () {
        let codigoCliente = $('#selectedCodigoCliAgregarPagoClienteEditar').attr('value');
        let montoAgregarPagoCliente = $('#valorAgregarPagoClienteEditar').val();
        let fechaAgregarPagoCliente = $('#fechaAgregarPagoEditar').val();
        let horaAgregarPagoEditar = $('#horaAgregarPagoEditar').val();
        let formaDePago = $('#formaDePagoEditar').val();
        let bancoAgregarPagoClienteEditar = $('#bancoAgregarPagoClienteEditar').val();
        let codAgregarPagoCliente = $('#codAgregarPagoClienteEditar').val();
        let comentarioAgregarPagoCliente = $('#comentarioAgregarPagoClienteEditar').val();

        let idReporteDePago = $('#idReporteDePago').attr("value");

        let todosCamposCompletos = true

        $('#divAgregarPagoClienteEditar .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        if (todosCamposCompletos) {
            let valorCampo = parseFloat($('#valorAgregarPagoClienteEditar').val());
            if (valorCampo > 0){
                fn_ActualizarPagoCliente(idReporteDePago,codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente, bancoAgregarPagoClienteEditar, horaAgregarPagoEditar);
            }else{
                alertify.notify('El monto no puede ser 0', 'error', 3);
                $('#valorAgregarPagoClienteEditar').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
            }
        } else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
        }
    });

    function fn_ActualizarPagoCliente(idReporteDePago,codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente, bancoAgregarPagoClienteEditar, horaAgregarPagoEditar){
        $.ajax({
            url: '/fn_consulta_ActualizarPagoCliente',
            method: 'GET',
            data: {
                idReporteDePago:idReporteDePago,
                codigoCliente: codigoCliente,
                montoAgregarPagoCliente: montoAgregarPagoCliente,
                fechaAgregarPagoCliente: fechaAgregarPagoCliente,
                formaDePago:formaDePago,
                codAgregarPagoCliente:codAgregarPagoCliente,
                comentarioAgregarPagoCliente:comentarioAgregarPagoCliente,
                horaAgregarPagoEditar:horaAgregarPagoEditar,
                bancoAgregarPagoClienteEditar:bancoAgregarPagoClienteEditar,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se edito el pago correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#divAgregarPagoClienteEditar .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });

                    $('#ModalAgregarPagoClienteEditar').addClass('hidden');
                    $('#ModalAgregarPagoClienteEditar').removeClass('flex');
                    $('#filtrar_pagos_submit').trigger('click');
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

    function fn_EditarPago(idReporteDePago){
        $.ajax({
            url: '/fn_consulta_EditarPago',
            method: 'GET',
            data: {
                idReporteDePago: idReporteDePago,
            },
            success: function(response) {
                if (Array.isArray(response)) {
                    response.forEach(function(obj) {
                        fn_TraerDeudaTotalEditar(obj.codigoCli)
                        $('#idAgregarPagoClienteEditar').val(obj.nombreCompleto);
                        $('#selectedCodigoCliAgregarPagoClienteEditar').attr("value", obj.codigoCli);
                        $('#valorAgregarPagoClienteEditar').val(obj.cantidadAbonoPag);
                        $('#fechaAgregarPagoEditar').val(obj.fechaOperacionPag);
                        $('#formaDePagoEditar').val(obj.tipoAbonoPag);
                        $('#horaAgregarPagoEditar').val(obj.horaOperacionPag);
                        if (obj.tipoAbonoPag == 'Transferencia'){
                            $('#divCodTransEditar').removeClass('hidden').addClass('flex');
                            $('#divBancoEditar').removeClass('hidden').addClass('flex');
                        }else{
                            $('#divCodTransEditar').removeClass('flex').addClass('hidden');
                            $('#divBancoEditar').removeClass('flex').addClass('hidden');
                        }
                        $('#bancoAgregarPagoClienteEditar').val(obj.bancaPago);
                        $('#codAgregarPagoClienteEditar').val(obj.codigoTransferenciaPag);
                        $('#comentarioAgregarPagoClienteEditar').val(obj.observacion);
                    });
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

    $('#idAgregarPagoClienteEditar').on('input', function () {
        let inputAgregarPagoCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesAgregarPagoClienteEditar');
        contenedorClientes.empty();

        if (inputAgregarPagoCliente.length > 1 || inputAgregarPagoCliente != "") {
            fn_TraerClientesAgregarPagoClienteEditar(inputAgregarPagoCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesAgregarPagoClienteEditar(inputAgregarPagoCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarPagoCliente',
            method: 'GET',
            data: {
                inputAgregarPagoCliente: inputAgregarPagoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesAgregarPagoClienteEditar')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idAgregarPagoClienteEditar').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliAgregarPagoClienteEditar').attr("value", obj.codigoCli);
                            fn_TraerDeudaTotalEditar(obj.codigoCli);

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

    $(document).on('contextmenu', '#bodyReporteDePagos tr.editarPagos', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
            let codigoPago = $(this).closest("tr").find("td:first").text();
            Swal.fire({
                title: '¿Desea eliminar el Registro?',
                text: "¡Estas seguro de eliminar el pago!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '¡No, cancelar!',
                confirmButtonText: '¡Si,eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fn_EliminarPago(codigoPago);
                }
            })
        }
    });

    function fn_EliminarPago(codigoPago){
        $.ajax({
            url: '/fn_consulta_EliminarPago',
            method: 'GET',
            data: {
                codigoPago: codigoPago,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino el pago correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#filtrar_pagos_submit').trigger('click');
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

})
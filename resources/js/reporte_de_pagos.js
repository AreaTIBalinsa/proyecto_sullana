import jQuery from 'jquery';
import jsPDF from 'jspdf/dist/jspdf.es.min.js';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

window.$ = jQuery;

jQuery(function ($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    const fechaHoyTabla = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteDePagos').val(fechaHoy);
    $('#fechaHastaReporteDePagos').val(fechaHoy);
    $('#fechaDesdeCuentaDelClienteDescuentos').val(fechaHoy);
    $('#fechaHastaCuentaDelClienteDescuentos').val(fechaHoy);
    $('#fechaAgregarPago').val(fechaHoy);
    $('#fechaAgregarDescuento').val(fechaHoy);
    // $('#fechaCambiarPrecioPesada').val(fechaHoy);

    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    
    var currentTime = hours + ":" + minutes + ":" + seconds;
    
    $('#horaAgregarPago').val(currentTime);

    declarar_especies();
    // fn_TraerPagosFechas(fechaHoy,fechaHoy);
    fn_TraerPagosFechas2(fechaHoy,fechaHoy);
    fn_TraerPagosFechas3(fechaHoy,fechaHoy);
    // fn_TraerPagosDirectoGranjaFechas(fechaHoy,fechaHoy);
    fn_TraerEgresosFechas(fechaHoy,fechaHoy);
    fn_TraerEgresosPaulFechas(fechaHoy,fechaHoy);
    fn_RegistroDescuentos(fechaHoy,fechaHoy);
    declarar_especies_descuentos();

    /* ============ Eventos ============ */

    // Eventos para abrir y cerrar modal de Agregar Pago

    $('#registrar_agregarPago_submit').on('click', function () {
        // $('#idAgregarPagoCliente').focus();

        $('#idAgregarPagoCliente').val('');
        $('#valorAgregarPagoCliente').val('');
        $('#bancoAgregarPagoCliente').val('');
        $('#codAgregarPagoCliente').val('');
        $('#comentarioAgregarPagoCliente').val('');
        $('#selectedCodigoCliAgregarPagoCliente').attr('val', '');
        $('#deudaTotal').text('0.00');
        $('#formaDePago').val($('#formaDePago option:first').val());
        $('#idAgregarEgresoPaul').val('');

        let pagoDerivado = $('#pagoDerivado').val();
        if(pagoDerivado == $('#pagoDerivado option:first').val()){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').show();
            $('#formaDePago').val('Transferencia');
        }else if(pagoDerivado == "2"){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').show();
            $('#formaDePago').val('Efectivo');
        }else if(pagoDerivado == "3"){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').hide();
            $('#formaDePago').val('Efectivo');
        }else if(pagoDerivado == "4"){
            $('#divClienteOpcional').hide();
            $('#divEgresoPaul').show();
            $('#divComentario').hide();
            $('#divHoraaa').hide();
            $('#formaDePago').val('Efectivo');
        }else if(pagoDerivado == "5"){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').show();
            $('#formaDePago').val('Efectivo');
        }

        let selectedOption = $('#formaDePago').val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#divCodTrans').removeClass('hidden').addClass('flex');
            $('#divBanco').removeClass('hidden').addClass('flex');
        }else if (selectedOption === 'Yape'){
            $('#divCodTrans').removeClass('hidden').addClass('flex');
            $('#divBanco').removeClass('flex').addClass('hidden');
        }else {
            // Si se selecciona cualquier otra opción, oculta el div "codTrans"
            $('#divCodTrans').removeClass('flex').addClass('hidden');
            $('#divBanco').removeClass('flex').addClass('hidden');
        }

        $('#ModalAgregarPagoCliente').addClass('flex');
        $('#ModalAgregarPagoCliente').removeClass('hidden');
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
        codAgregarPagoCliente = codAgregarPagoCliente.trim();
        let comentarioAgregarPagoCliente = $('#comentarioAgregarPagoCliente').val();
        let bancoAgregarPagoCliente = $('#bancoAgregarPagoCliente').val();
        let horaAgregarPago = $('#horaAgregarPago').val();
        let pagoDerivado = $('#pagoDerivado').val();
        let usoReporteEgreso = $('#idAgregarEgresoPaul').val();

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
                let pagoDerivado = $('#pagoDerivado').val();
                if(pagoDerivado != "4"){
                    // if(formaDePago == "Efectivo" || formaDePago == "Yape"){
                    //     fn_AgregarPagoCliente(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente,bancoAgregarPagoCliente,horaAgregarPago, pagoDerivado);
                    // }else{
                    //     if (formaDePago == "Transferencia" && codAgregarPagoCliente != ""){
                    //         fn_verificarCodigoPago(codAgregarPagoCliente);
                    //     }else{
                    //         alertify.notify('Debe rellenar el campo Cod. Trans.', 'error', 3);
                    //     }
                    // }
                    fn_verificarCodigoPago(codAgregarPagoCliente);
                }else if (pagoDerivado == "4"){
                    fn_AgregarEgresoPaul(montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,bancoAgregarPagoCliente,codAgregarPagoCliente,usoReporteEgreso);
                }
            }else{
                alertify.notify('El monto no puede ser 0', 'error', 3);
                $('#valorAgregarPagoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
            }
        } else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
        }
    });

    function fn_verificarCodigoPago(codAgregarPagoCliente){
        $.ajax({
            url: '/fn_consulta_VerificarCodigoPago',
            method: 'GET',
            data:{
                codAgregarPagoCliente: codAgregarPagoCliente,
            },
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    response = response[0];
                    let responseNombre = response.nombreCompleto;
                    let responseFecha = response.fechaOperacionPag;
                    let responseHora = response.horaOperacionPag;
                    let responseBanco = response.bancaPago;
                    let responseCodTransferencia = response.codigoTransferenciaPag;
                    let responseMonto = response.cantidadAbonoPag;
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Codigo de Operación Encontrado',
                        html: (`
                        <hr>
                        <br>
                        <ul style="text-align: left; list-style-position: inside;">
                            <li><b>Nombre : </b>${responseNombre}</li>
                            <li><b>Fecha : </b>${responseFecha}</li>
                            <li><b>Hora : </b>${responseHora}</li>
                            <li><b>Monto : </b>${responseMonto}</li>
                            <li><b>Banco : </b>${responseBanco}</li>
                            <li><b>Codigo de Tranferencia : </b>${responseCodTransferencia}</li>
                        </ul>`),
                    });
                }else{
                    let codigoCliente = $('#selectedCodigoCliAgregarPagoCliente').attr('value');
                    let montoAgregarPagoCliente = $('#valorAgregarPagoCliente').val();
                    let fechaAgregarPagoCliente = $('#fechaAgregarPago').val();
                    let formaDePago = $('#formaDePago').val();
                    let codAgregarPagoCliente = $('#codAgregarPagoCliente').val();
                    codAgregarPagoCliente = codAgregarPagoCliente.trim();
                    let comentarioAgregarPagoCliente = $('#comentarioAgregarPagoCliente').val();
                    let bancoAgregarPagoCliente = $('#bancoAgregarPagoCliente').val();
                    let horaAgregarPago = $('#horaAgregarPago').val();
                    let pagoDerivado = $('#pagoDerivado').val();

                    fn_AgregarPagoCliente(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente,bancoAgregarPagoCliente,horaAgregarPago, pagoDerivado);
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    // Evento para registrar Descuento por Cliente

    $('#btnAgregarDescuentoCliente').on('click', function () {
        let todosCamposCompletos = true

        let codigoCliente = $('#selectedCodigoCliAgregarDescuentoCliente').attr('value');
        let pesoAgregarDescuentoCliente = parseFloat($('#valorAgregarDescuentoCliente').val())*-1;
        let fechaAgregarDescuentoCliente = $('#fechaAgregarDescuento').val();
        let especieAgregarDescuentoCliente = $('#presentacionAgregarDescuentoCliente').find("option:selected").val();
        let comentarioAgregarDescuentoCliente = $('#comentarioAgregarDescuentoCliente').val();
        let precioAgregarDescuentoCliente = $('#valorPrecioDescuento').val();

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
        // fn_TraerPagosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
        fn_TraerPagosFechas2(fechaDesdeTraerPagos, fechaHastaTraerPagos);
        fn_TraerPagosFechas3(fechaDesdeTraerPagos, fechaHastaTraerPagos);
        // fn_TraerPagosDirectoGranjaFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
        fn_TraerEgresosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
        fn_TraerEgresosPaulFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
    });

    $('#btnBuscarCuentaDelClienteDescuentos').on('click', function () {
        let fechaDesdeTraerDescuentos = $('#fechaDesdeCuentaDelClienteDescuentos').val();
        let fechaHastaTraerDescuentos = $('#fechaHastaCuentaDelClienteDescuentos').val();
        fn_RegistroDescuentos(fechaDesdeTraerDescuentos, fechaHastaTraerDescuentos);
    });

    // Hace aparecer o desaparecer el div para registrar codigo de tranferencia segun sea transferencia o efectivo

    $('#formaDePago').on('change',function() {

        let pagoDerivado = $('#pagoDerivado').val();
        if(pagoDerivado == $('#pagoDerivado option:first').val()){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').show();
        }else if(pagoDerivado == "2"){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').show();
        }else if(pagoDerivado == "3"){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').hide();
        }else if(pagoDerivado == "4"){
            $('#divClienteOpcional').hide();
            $('#divEgresoPaul').show();
            $('#divComentario').hide();
            $('#divHoraaa').hide();
        }else if(pagoDerivado == "5"){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').show();
        }

        let selectedOption = $('#formaDePago').val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#divCodTrans').removeClass('hidden').addClass('flex');
            $('#divBanco').removeClass('hidden').addClass('flex');
        }else if (selectedOption === 'Yape'){
            $('#divCodTrans').removeClass('hidden').addClass('flex');
            $('#divBanco').removeClass('flex').addClass('hidden');
        }else {
            // Si se selecciona cualquier otra opción, oculta el div "codTrans"
            $('#divCodTrans').removeClass('flex').addClass('hidden');
            $('#divBanco').removeClass('flex').addClass('hidden');
        }
    });

    $('#pagoDerivado').on('change',function() {

        let pagoDerivado = $('#pagoDerivado').val();
        if(pagoDerivado == $('#pagoDerivado option:first').val()){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').show();
            $('#formaDePago').val('Transferencia');
        }else if(pagoDerivado == "2"){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').show();
            $('#formaDePago').val('Efectivo');
        }else if(pagoDerivado == "3"){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').hide();
            $('#formaDePago').val('Efectivo');
        }else if(pagoDerivado == "4"){
            $('#divClienteOpcional').hide();
            $('#divEgresoPaul').show();
            $('#divComentario').hide();
            $('#divHoraaa').hide();
            $('#formaDePago').val('Efectivo');
        }else if(pagoDerivado == "5"){
            $('#divClienteOpcional').show();
            $('#divEgresoPaul').hide();
            $('#divComentario').show();
            $('#divHoraaa').show();
            $('#formaDePago').val('Efectivo');
        }

        let selectedOption = $('#formaDePago').val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#divCodTrans').removeClass('hidden').addClass('flex');
            $('#divBanco').removeClass('hidden').addClass('flex');
        }else if (selectedOption === 'Yape'){
            $('#divCodTrans').removeClass('hidden').addClass('flex');
            $('#divBanco').removeClass('flex').addClass('hidden');
        }else {
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

    function fn_AgregarPagoCliente(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente,bancoAgregarPagoCliente,horaAgregarPago, pagoDerivado){
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
                pagoDerivado:pagoDerivado,
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
            data: {
                fechaDesdeTraerPagos: fechaDesdeTraerPagos,
                fechaHastaTraerPagos: fechaHastaTraerPagos,
            },
            success: function(response) {
                if (Array.isArray(response)) {
                    let tbodyReporteDePagos = $('#bodyReporteDePagos');
                    tbodyReporteDePagos.empty();
    
                    let totalPago = 0;
                    let nuevaFila = "";
    
                    response.forEach(function(obj) {
                        if (obj.nombreCompleto == "") {
                            nuevaFila = $('<tr class="bg-red-600 editarPagos border-b dark:border-gray-700 cursor-pointer text-white">');
                        } else {
                            nuevaFila = $('<tr class="bg-white editarPagos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        }
                        totalPago += parseFloat(obj.cantidadAbonoPag);
                        nuevaFila.append($('<td class="hidden">').text(obj.idPagos));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.codigoTransferenciaPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.horaOperacionPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.bancaPago));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.tipoAbonoPag));
                        nuevaFila.append($('<td class="p-2 text-center cursor-pointer">').text(obj.observacion));
                        tbodyReporteDePagos.append(nuevaFila);
                    });
    
                    if (response.length == 0) {
                        tbodyReporteDePagos.html(`<tr class="rounded-lg border-2 border-r-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    } else {
                        agregarFilaEspaciadora(tbodyReporteDePagos);
                        agregarFilaTotal(tbodyReporteDePagos, totalPago);
                    }
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    function agregarFilaEspaciadora(tbody) {
        let nuevaFila = $('<tr class="bg-white dark:bg-gray-800 h-0.5 cursor-pointer">');
        nuevaFila.append($('<td class="text-center h-0.5 bg-gray-400 dark:bg-gray-300" colspan="8">').text(""));
        tbody.append(nuevaFila);
    }
    
    function agregarFilaTotal(tbody, totalPago) {
        let nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text("SALDO TOTAL:"));
        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text("S/. " + totalPago.toFixed(2)));
        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="p-2 text-center cursor-pointer">').text(""));
        tbody.append(nuevaFila);
    }

    tablaEditable()
    function tablaEditable(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePagosExcel');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntrada(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntrada(tbody) {
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="true">').text("Transferencia"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">').text("1"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">').text("0"));
        tbody.append(nuevaFila);
    
        nuevaFila.find('.nombreClienteTablaExcel').on('input', function() {
            let inputText = $(this).text().trim();
            let currentCell = $(this);
            let codigoClienteCell = currentCell.closest('tr').find('td').eq(9); 
    
            if (inputText.length >= 1) { // Activar autocompletar después de 3 caracteres
                currentCell.removeClass('bg-green-500');
                
                codigoClienteCell.text("0");
                fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
                    if (clientes) {
                        showSuggestions(currentCell, clientes);
                    }else{
                        $('.suggestions-list').remove();
                        currentCell.removeClass('bg-green-500');
                        codigoClienteCell.text("0");
                    }
                });
            } else {
                currentCell.removeClass('bg-green-500');
                hideSuggestions(currentCell);
                codigoClienteCell.text("0");
            }
        });
    
        nuevaFila.find('.nombreClienteTablaExcel').on('keydown', function(e) {
            let suggestionsList = $('.suggestions-list');
            let highlighted = suggestionsList.find('.highlighted');
            if (e.key === 'ArrowDown') {
                if (highlighted.length === 0) {
                    suggestionsList.children().first().addClass('highlighted');
                } else {
                    highlighted.removeClass('highlighted').next().addClass('highlighted');
                }
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                if (highlighted.length !== 0) {
                    highlighted.removeClass('highlighted').prev().addClass('highlighted');
                }
                e.preventDefault();
            } else if (e.key === 'Enter') {
                if (highlighted.length !== 0) {
                    highlighted.click();
                    e.preventDefault();
                }
            }
        });
    
        nuevaFila.on('input', function() {
            let vacio = true;
            nuevaFila.find('td').each(function() {
                if ($(this).text().trim() !== "") {
                    vacio = false;
                }
            });
            if (!vacio) {
                agregarFilaEntrada(tbody);
                nuevaFila.off('input');
            }
        });
    }
    
    function fn_TraerClientesAgregarPagoClienteTablaExcel(inputAgregarPagoCliente, callback) {
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarPagoCliente',
            method: 'GET',
            data: {
                inputAgregarPagoCliente: inputAgregarPagoCliente,
            },
            success: function(response) {
                if (Array.isArray(response) && response.length > 0) {
                    callback(response);
                } else {
                    callback(null);
                }
            },
            error: function(error) {
                console.error("ERROR", error);
                callback(null);
            }
        });
    }
    
    function showSuggestions(cell, clientes) {
        hideSuggestions(cell); // Remove existing suggestions if any
    
        let suggestions = $('<div class="suggestions-list bg-white border-2 border-gray-500"></div>').css({
            position: 'absolute',
            zIndex: 1000
        });
    
        clientes.forEach(cliente => {
            let suggestionItem = $('<div class="suggestion-item p-1"></div>').text(cliente.nombreCompleto).css({
                cursor: 'pointer'
            });
    
            suggestionItem.on('click', function() {
                cell.text(cliente.nombreCompleto);
                cell.data('selectedCliente', cliente);
                cell.addClass('bg-green-500');
                hideSuggestions(cell);

                let codigoClienteCell = cell.closest('tr').find('td').eq(9); 
                codigoClienteCell.text(cliente.codigoCli);
            });
    
            suggestions.append(suggestionItem);
        });
    
        $('body').append(suggestions);
        let offset = cell.offset();
        suggestions.css({ top: offset.top + cell.outerHeight(), left: offset.left });
    }
    
    function hideSuggestions(cell) {
        $('.suggestions-list').remove();
    }
    
    function hacerCeldasEditables(tbody) {
        tbody.on('keydown', 'td[contenteditable="true"]', function(e) {
            let currentTd = $(this);
            let currentRow = currentTd.parent();
            let currentTdIndex = currentTd.index();
    
            if (e.key === "ArrowRight") {
                e.preventDefault();
                let nextTd = currentTd.nextAll('td[contenteditable="true"]').first();
                if (nextTd.length) {
                    nextTd.focus();
                } else {
                    let nextRow = currentRow.next();
                    if (nextRow.length) {
                        nextRow.children('td[contenteditable="true"]').first().focus();
                    }
                }
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                let prevTd = currentTd.prevAll('td[contenteditable="true"]').first();
                if (prevTd.length) {
                    prevTd.focus();
                } else {
                    let prevRow = currentRow.prev();
                    if (prevRow.length) {
                        prevRow.children('td[contenteditable="true"]').last().focus();
                    }
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                let nextRow = currentRow.next();
                if (nextRow.length) {
                    nextRow.children().eq(currentTdIndex).focus();
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                let prevRow = currentRow.prev();
                if (prevRow.length) {
                    prevRow.children().eq(currentTdIndex).focus();
                }
            }
        });
    }        
    
    function fn_TraerPagosFechas2(fechaDesdeTraerPagos, fechaHastaTraerPagos) {
        $.ajax({
            url: '/fn_consulta_TraerPagosFechasItem2',
            method: 'GET',
            data:{
                fechaDesdeTraerPagos:fechaDesdeTraerPagos,
                fechaHastaTraerPagos:fechaHastaTraerPagos,
            },
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let tbodyReporteDePagos = $('#bodyReporteDePagosCajaChicaIngreso');
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
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.horaOperacionPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">').text((obj.nombreCompleto).trim() === "" ? obj.campoExtra : obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.tipoAbonoPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.codigoTransferenciaPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.bancaPago));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer">').text(obj.observacion));
                        // Agregar la nueva fila al tbody
                        tbodyReporteDePagos.append(nuevaFila);
                    });

                    if (response.length == 0) {
                        tbodyReporteDePagos.html(`<tr class="rounded-lg border-2 border-l-[1px] border-r-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }else{
                        nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                        nuevaFila.append($('<td class="text-center h-0.5 bg-gray-400 dark:bg-gray-300" colspan="8">').text(""));
                        tbodyReporteDePagos.append(nuevaFila);

                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text("SALDO TOTAL:")));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text("S/. "+totalPago.toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer hidden">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer hidden">').text(""));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer">').text(""));
                        // Agregar la nueva fila al tbody
                        tbodyReporteDePagos.append(nuevaFila);
                        totalPagoIngreso = totalPago;
                        diferenciaCajaChica();
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

    function fn_TraerPagosFechas3(fechaDesdeTraerPagos, fechaHastaTraerPagos) {
        $.ajax({
            url: '/fn_consulta_TraerPagosFechasItem3',
            method: 'GET',
            data:{
                fechaDesdeTraerPagos:fechaDesdeTraerPagos,
                fechaHastaTraerPagos:fechaHastaTraerPagos,
            },
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let tbodyReporteDePagos = $('#bodyReporteDePagosCobranzaDePaul');
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
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto === "" ? "SALDO ANTERIOR" : obj.nombreCompleto)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.tipoAbonoPag));
                        // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.horaOperacionPag));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer hidden">').text(obj.observacion));
                        // Agregar la nueva fila al tbody
                        tbodyReporteDePagos.append(nuevaFila);
                    });

                    if (response.length == 0) {
                        tbodyReporteDePagos.html(`<tr class="rounded-lg border-2 border-l-[1px] border-r-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }else{
                        nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                        nuevaFila.append($('<td class="text-center h-0.5 bg-gray-400 dark:bg-gray-300" colspan="8">').text(""));
                        tbodyReporteDePagos.append(nuevaFila);

                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text("SALDO TOTAL:")));
                        // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text("S/. "+totalPago.toFixed(2)));
                        // Agregar la nueva fila al tbody
                        tbodyReporteDePagos.append(nuevaFila);
                        totalPagoIngresoPaul = totalPago;
                        diferenciaPagosPaul();
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

    // Diferencia de Caja Chica
    var totalPagoIngreso = 0;
    var totalPagoEgreso = 0;

    // Diferencia de Pagos de Paul
    var totalPagoIngresoPaul = 0;
    var totalPagoEgresoPaul = 0;

    function diferenciaPagosPaul(){
        let totalDiferenciaPaul = totalPagoIngresoPaul - totalPagoEgresoPaul;
        $("#diferenciaPaul").html(parseFloat(totalDiferenciaPaul).toFixed(2));
    }

    function fn_TraerPagosDirectoGranjaFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos) {
        $.ajax({
            url: '/fn_consulta_TraerPagosDirectoGranjaFechas',
            method: 'GET',
            data:{
                fechaDesdeTraerPagos:fechaDesdeTraerPagos,
                fechaHastaTraerPagos:fechaHastaTraerPagos,
            },
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let tbodyReporteDePagos = $('#bodyReporteDePagosDirectoGranja');
                    tbodyReporteDePagos.empty();

                    let totalPago = 0;
                    let nuevaFila = "";

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        if (obj.nombreCompleto == ""){
                            nuevaFila = $('<tr class="bg-red-600 editarPagos border-b dark:border-gray-700 cursor-pointer text-white">');
                        }else{
                            nuevaFila = $('<tr class="bg-white editarPagos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        }
                        totalPago += parseFloat(obj.cantidadAbonoPag);
                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPagos));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.codigoTransferenciaPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.horaOperacionPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.bancaPago));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.tipoAbonoPag));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer">').text(obj.observacion));
                        // Agregar la nueva fila al tbody
                        tbodyReporteDePagos.append(nuevaFila);
                    });

                    if (response.length == 0) {
                        tbodyReporteDePagos.html(`<tr class="rounded-lg border-2 border-l-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }else{
                        nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                        nuevaFila.append($('<td class="text-center h-0.5 bg-gray-400 dark:bg-gray-300" colspan="8">').text(""));
                        tbodyReporteDePagos.append(nuevaFila);

                        nuevaFila = $('<tr class="bg-white border-b border-l-[1px] border-r-[1px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text("SALDO TOTAL:"));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text("S/. "+totalPago.toFixed(2)));
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

    function diferenciaCajaChica(){
        let totalDiferencia = totalPagoIngreso - totalPagoEgreso;
        $("#diferencia").html(parseFloat(totalDiferencia).toFixed(2));
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
                        nuevaFila = $('<tr class="bg-white border-b editarPagos dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

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
        } else if (selectedOption === 'Yape'){
            $('#divCodTransEditar').removeClass('hidden').addClass('flex');
            $('#divBancoEditar').removeClass('flex').addClass('hidden');
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

    $(document).on("dblclick", "tr.editarPagos", function() {
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

    // $(document).on('contextmenu', 'tr.editarPagos', function (e) {
    //     e.preventDefault();
    //     let codigoDescuento = $(this).closest("tr").find("td:first").text();
    //     Swal.fire({
    //         title: '¿Desea eliminar el Registro?',
    //         text: "¡Estas seguro de eliminar el descuento!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         cancelButtonText: '¡No, cancelar!',
    //         confirmButtonText: '¡Si,eliminar!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             fn_EliminarDescuento(codigoDescuento);
    //         }
    //     })
    // });

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
                        title: 'Se elimino el descuento correctamente',
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

    $(document).on('contextmenu', 'tr.editarPagos', function (e) {
        e.preventDefault();
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

    function fn_TraerEgresosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos) {
        $.ajax({
            url: '/fn_consulta_TraerEgresosFechas',
            method: 'GET',
            data:{
                fechaDesdeTraerPagos:fechaDesdeTraerPagos,
                fechaHastaTraerPagos:fechaHastaTraerPagos,
            },
            success: function(response) {
                // Obtener el select
                let tbodyReporteDePagos = $('#bodyReporteDePagosCajaChicaEgreso');
                tbodyReporteDePagos.empty();

                let totalPago = 0;
                let nuevaFila = "";

                // Iterar sobre los objetos y mostrar sus propiedades
                response.forEach(function(obj) {
                    // Crear una nueva fila
                    nuevaFila = $('<tr class="bg-white editarPagosEgresos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                    totalPago += parseFloat(obj.cantidadAbonoEgreso);
                    // Agregar las celdas con la información
                    nuevaFila.append($('<td class="hidden">').text(obj.idEgresos));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreEgresoCamal));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.cantidadEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.montoEgreso).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.cantidadAbonoEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.tipoAbonoEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.bancoEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.codigoTransferenciaEgreso));
                    // Agregar la nueva fila al tbody
                    tbodyReporteDePagos.append(nuevaFila);
                });

                if (response.length == 0) {
                    tbodyReporteDePagos.html(`<tr class="rounded-lg border-2 border-l-[1px] border-r-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                }else{
                    nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                    nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="8">').text(""));
                    tbodyReporteDePagos.append(nuevaFila);

                    nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text("SALDO TOTAL:")));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text("S/. "+totalPago.toFixed(2)));
                    // Agregar la nueva fila al tbody
                    tbodyReporteDePagos.append(nuevaFila);
                    totalPagoEgreso = totalPago
                    diferenciaCajaChica();
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    function fn_TraerEgresosPaulFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos) {
        $.ajax({
            url: '/fn_consulta_TraerEgresosPaulFechas',
            method: 'GET',
            data:{
                fechaDesdeTraerPagos:fechaDesdeTraerPagos,
                fechaHastaTraerPagos:fechaHastaTraerPagos,
            },
            success: function(response) {
                // Obtener el select
                let tbodyReporteDePagos = $('#bodyReporteDePagosCobranzaDePaulEgresos');
                tbodyReporteDePagos.empty();

                let totalPago = 0;
                let nuevaFila = "";

                // Iterar sobre los objetos y mostrar sus propiedades
                response.forEach(function(obj) {
                    // Crear una nueva fila
                    nuevaFila = $('<tr class="bg-white editarPagosEgresos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                    totalPago += parseFloat(obj.cantidadAbonoEgreso);
                    // Agregar las celdas con la información
                    nuevaFila.append($('<td class="hidden">').text(obj.idEgresos));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreEgresoCamal));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.cantidadAbonoEgreso).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.tipoAbonoEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.bancoEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.codigoTransferenciaEgreso));
                    // Agregar la nueva fila al tbody
                    tbodyReporteDePagos.append(nuevaFila);
                });

                if (response.length == 0) {
                    tbodyReporteDePagos.html(`<tr class="rounded-lg border-2 border-l-[1px] border-r-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                }else{
                    nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                    nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="8">').text(""));
                    tbodyReporteDePagos.append(nuevaFila);

                    nuevaFila = $('<tr class="bg-white border-b border-l-[1px] border-r-[1px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text("SALDO TOTAL:")));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text("S/. "+totalPago.toFixed(2)));
                    // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                    // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                    // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(""));
                    // Agregar la nueva fila al tbody
                    tbodyReporteDePagos.append(nuevaFila);
                    totalPagoEgresoPaul = totalPago;
                    diferenciaPagosPaul();
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $(document).on('contextmenu', 'tr.editarPagosEgresos', function (e) {
        e.preventDefault();
        let codigoEgreso = $(this).closest("tr").find("td:first").text();
        Swal.fire({
            title: '¿Desea eliminar el Registro?',
            text: "¡Estas seguro de eliminar el egreso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                fn_EliminarEgreso(codigoEgreso);
            }
        })
    });

    function fn_EliminarEgreso(codigoEgreso){
        $.ajax({
            url: '/fn_consulta_EliminarEgreso',
            method: 'GET',
            data: {
                codigoEgreso: codigoEgreso,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino el egreso correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    let fechaDesdeTraerPagos = $('#fechaDesdeReporteDePagos').val();
                    let fechaHastaTraerPagos = $('#fechaHastaReporteDePagos').val();
                    fn_TraerEgresosFechas(fechaDesdeTraerPagos,fechaHastaTraerPagos);
                    fn_TraerEgresosPaulFechas(fechaDesdeTraerPagos,fechaHastaTraerPagos);
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

    function copiarDatosPenultimaFila2() {
        let filas = $('.pagosAgregarExcel2');
        if (filas.length > 1) {
            let penultimaFila = filas.eq(filas.length - 2);
            let ultimaFila = filas.eq(filas.length - 1);
            let datosColumna0 = penultimaFila.find('td').eq(0).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
        }
    } 

    function copiarDatosPenultimaFila3() {
        let filas = $('.pagosAgregarExcel3');
        if (filas.length > 1) {
            let penultimaFila = filas.eq(filas.length - 2);
            let ultimaFila = filas.eq(filas.length - 1);
            let datosColumna0 = penultimaFila.find('td').eq(0).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
        }
    } 

    $(document).on("dblclick", "tr.editarPagosEgresos", function() {
        let fila = $(this).closest('tr');
        let idReporteDeEgreso= fila.find('td:eq(0)').text();
        let fechaEgreso= fila.find('td:eq(1)').text();
        let usoEgreso= fila.find('td:eq(2)').text();
        let cantidadEgreso= fila.find('td:eq(3)').text();
        let importeEgreso= fila.find('td:eq(4)').text();
        let MontoEgreso= fila.find('td:eq(5)').text();
        let formaDePagoEgreso= fila.find('td:eq(6)').text();
        let bancoEgreso= fila.find('td:eq(7)').text();
        let codigoTransEgreso= fila.find('td:eq(8)').text();

        $('#idReporteDeEgresoEditar').val(idReporteDeEgreso);

        $('#idAgregarEgresoEditar').val(usoEgreso);
        $('#valorAgregarEgresoClienteEditar').val(importeEgreso);
        $('#formaDePagoEgresoEditar').val(formaDePagoEgreso);
        $('#cantidadAgregarEgresoClienteEditar').val(cantidadEgreso);
        $('#montoAgregarEgresoClienteEditar').val(MontoEgreso);
        $('#bancoAgregarEgresoClienteEditar').val(bancoEgreso);
        $('#fechaAgregarEgresoEditar').val(fechaEgreso);
        $('#codAgregarEgresoClienteEditar').val(codigoTransEgreso);
        if (formaDePagoEgreso == 'Transferencia'){
            $('#divBancoEgresoEditar').removeClass('hidden').addClass('flex');
            $('#divCodTransEgresoEditar').removeClass('hidden').addClass('flex');
        }else{
            $('#divBancoEgresoEditar').removeClass('flex').addClass('hidden');
            $('#divCodTransEgresoEditar').removeClass('flex').addClass('hidden');
        }
        
        $('#ModalAgregarEgresoEditar').addClass('flex');
        $('#ModalAgregarEgresoEditar').removeClass('hidden');
    });

    $('.cerrarModalAgregarEgresoEditar, #ModalAgregarEgresoEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarEgresoEditar').addClass('hidden');
        $('#ModalAgregarEgresoEditar').removeClass('flex');
    });

    $('#formaDePagoEgresoEditar').on('change',function() {
        var selectedOption = $(this).val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#divCodTransEgresoEditar').removeClass('hidden').addClass('flex');
            $('#divBancoEgresoEditar').removeClass('hidden').addClass('flex');
        } else {
            // Si se selecciona cualquier otra opción, oculta el div "codTrans"
            $('#divCodTransEgresoEditar').removeClass('flex').addClass('hidden');
            $('#divBancoEgresoEditar').removeClass('flex').addClass('hidden');
        }
    });

    $('#btnAgregarEgresoEditar').on('click', function(){
        let idReporteDeEgreso = $('#idReporteDeEgresoEditar').val();
        let idAgregarEgresoEditar = $('#idAgregarEgresoEditar').val();
        let valorAgregarEgresoClienteEditar = $('#valorAgregarEgresoClienteEditar').val();
        let cantidadAgregarEgresoClienteEditar = $('#cantidadAgregarEgresoClienteEditar').val();
        let montoAgregarEgresoClienteEditar = $('#montoAgregarEgresoClienteEditar').val();
        let formaDePagoEgresoEditar = $('#formaDePagoEgresoEditar').val();
        let bancoAgregarEgresoClienteEditar = $('#bancoAgregarEgresoClienteEditar').val();
        let fechaAgregarEgresoEditar = $('#fechaAgregarEgresoEditar').val();
        let codAgregarEgresoClienteEditar = $('#codAgregarEgresoClienteEditar').val();

        // console.log('id:    ',idReporteDeEgreso,
        //     'idEgreso:  ',idAgregarEgresoEditar,
        //     'idvalor:   ',valorAgregarEgresoClienteEditar,
        //     'cantidad:  ',cantidadAgregarEgresoClienteEditar,
        //     'monto: ',montoAgregarEgresoClienteEditar,
        //     'forma: ',formaDePagoEgresoEditar,
        //     'banco: ',bancoAgregarEgresoClienteEditar,
        //     'fecha: ',fechaAgregarEgresoEditar,
        //     'cod:   ',codAgregarEgresoClienteEditar)
        fn_AgregarEgresoEditar(idReporteDeEgreso,idAgregarEgresoEditar,valorAgregarEgresoClienteEditar,cantidadAgregarEgresoClienteEditar,montoAgregarEgresoClienteEditar,formaDePagoEgresoEditar,bancoAgregarEgresoClienteEditar,fechaAgregarEgresoEditar,codAgregarEgresoClienteEditar)
    })

    function fn_AgregarEgresoEditar(idReporteDeEgreso,idAgregarEgresoEditar,valorAgregarEgresoClienteEditar,cantidadAgregarEgresoClienteEditar,montoAgregarEgresoClienteEditar,formaDePagoEgresoEditar,bancoAgregarEgresoClienteEditar,fechaAgregarEgresoEditar,codAgregarEgresoClienteEditar){
        $.ajax({
            url: '/fn_consulta_AgregarEgresoEditar',
            method: 'GET',
            data:{
                idReporteDeEgreso: idReporteDeEgreso,
                idAgregarEgresoEditar: idAgregarEgresoEditar,
                valorAgregarEgresoClienteEditar: valorAgregarEgresoClienteEditar,
                cantidadAgregarEgresoClienteEditar: cantidadAgregarEgresoClienteEditar,
                montoAgregarEgresoClienteEditar: montoAgregarEgresoClienteEditar,
                formaDePagoEgresoEditar: formaDePagoEgresoEditar,
                bancoAgregarEgresoClienteEditar: bancoAgregarEgresoClienteEditar,
                fechaAgregarEgresoEditar: fechaAgregarEgresoEditar,
                codAgregarEgresoClienteEditar: codAgregarEgresoClienteEditar,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el egreso correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#divAgregarEgresoEditar .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });

                    $('#ModalAgregarEgresoEditar').addClass('hidden');
                    $('#ModalAgregarEgresoEditar').removeClass('flex');
                    $('#filtrar_pagos_submit').trigger('click');
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    function fn_AgregarEgresoPaul(montoAgregEgresoCliente,fechaAgregEgresoCliente,cantidadAgregEgresoCliente, montoNuevoAgregEgresoCliente,formaDePagoEgreso,bancoAgregEgresoCliente,codAgregEgresoCliente,usoReporteEgreso){
        $.ajax({
            url: '/fn_consulta_AgregarEgresoPaul',
            method: 'GET',
            data:{
                montoAgregEgresoCliente: montoAgregEgresoCliente,
                fechaAgregEgresoCliente: fechaAgregEgresoCliente,
                cantidadAgregEgresoCliente: cantidadAgregEgresoCliente,
                montoNuevoAgregEgresoCliente: montoNuevoAgregEgresoCliente,
                formaDePagoEgreso: formaDePagoEgreso,
                bancoAgregEgresoCliente: bancoAgregEgresoCliente,
                codAgregEgresoCliente: codAgregEgresoCliente,
                usoReporteEgreso: usoReporteEgreso,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro el egreso correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#divAgregarEgreso .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });

                    $('#ModalAgregarPagoCliente').addClass('hidden');
                    $('#ModalAgregarPagoCliente').removeClass('flex');
                    $('#filtrar_pagos_submit').trigger('click');
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    $(document).on('input', '.validarSoloNumerosDosDecimalesTablas', function (event) {
        let inputValue = $(this).text();
        let originalValue = inputValue;
    
        // Elimina todos los caracteres excepto los dígitos y un punto decimal
        inputValue = inputValue.replace(/[^0-9.]/g, '');
    
        // Verifica si ya hay un punto decimal presente
        if (inputValue.indexOf('.') !== -1) {
            // Si ya hay un punto, elimina los puntos adicionales
            inputValue = inputValue.replace(/(\..*)\./g, '$1');
    
            // Limita el número de decimales a dos
            let decimalPart = inputValue.split('.')[1];
            if (decimalPart && decimalPart.length > 2) {
                decimalPart = decimalPart.substring(0, 2);
                inputValue = inputValue.split('.')[0] + '.' + decimalPart;
            }
        }
    
        // Si el valor ha cambiado, actualizar el contenido
        if (inputValue !== originalValue) {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let cursorPosition = range.startOffset;
    
            $(this).text(inputValue);
    
            // Restaurar la posición del cursor
            let newRange = document.createRange();
            newRange.setStart(this.firstChild, cursorPosition);
            newRange.setEnd(this.firstChild, cursorPosition);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    });
    
    $(document).on('input', '.convertirMayusculasTablas', function () {
        let inputValue = $(this).text();
    
        // Convertir el valor a mayúsculas
        let inputValueMayusculas = inputValue.toUpperCase();
    
        // Si el valor ha cambiado, actualizar el contenido
        if (inputValue !== inputValueMayusculas) {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let cursorPosition = range.startOffset;
    
            $(this).text(inputValueMayusculas);
    
            // Restaurar la posición del cursor
            let newRange = document.createRange();
            newRange.setStart(this.firstChild, cursorPosition);
            newRange.setEnd(this.firstChild, cursorPosition);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    });
    
    $(document).on('input', '.validarFormatoFechaTablas', function () {
        copiarDatosPenultimaFila2();
        copiarDatosPenultimaFila3();
        let inputValue = $(this).text();
        let regex = /^\d{2}-\d{2}-\d{4}$/; // Expresión regular para formato dd-mm-yyyy
        
        // Verificar si el valor cumple con el formato de fecha DD-MM-YYYY
        if (regex.test(inputValue)) {
            // Convertir el formato dd-mm-yyyy a yyyy-mm-dd
            let partesFecha = inputValue.split('-');
            let inputDate = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
            let currentDate = new Date();
            
            // Comparar con la fecha actual (solo la fecha, sin la hora)
            if (inputDate <= currentDate.setHours(0,0,0,0)) {
                $(this).css('background-color', 'rgb(22 163 74)');
            } else {
                $(this).css('background-color', 'rgb(185 28 28)');
            }
        } else {
            $(this).css('background-color', 'rgb(185 28 28)');
        }
    });

    $(document).on('input', '.validarFormatoHoraTablas', function () {
        let inputValue = $(this).text();
        let regex = /^(?:2[0-3]|[01][0-9]):(?:[0-5][0-9]):(?:[0-5][0-9])$/;
    
        // Verificar si el valor cumple con el formato de hora HH:MM:SS
        if (regex.test(inputValue)) {
            $(this).css('background-color', 'rgb(22 163 74)');
        } else {
            $(this).css('background-color', 'rgb(185 28 28)');
        }
    });

    $(document).on('click', '#registrar_agregarPagos_Excel', function () {
        let arregloCodigos = [];

        $('.pagosAgregarExcel:not(:last-child)').each(function() {
            let filaActual = $(this);
            let codAgregarPagoCliente = filaActual.find('td:eq(3)').text().trim();
            if (codAgregarPagoCliente != ""){
                if(arregloCodigos.includes(codAgregarPagoCliente)){
                    filaActual.remove();
                }else{
                    arregloCodigos.push(codAgregarPagoCliente);
                }
            }
        });

        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcel:not(:last-child)').length;
    
        // Función para verificar si todas las solicitudes han finalizado
        function checkCompletion() {
            if (completedRequests + failedRequests === totalRequests) {
                if (failedRequests > 0) {
                    // Swal.fire({
                    //     position: 'center',
                    //     icon: 'warning',
                    //     title: 'Algunos pagos no pudieron ser registrados',
                    //     text: `Se registraron ${completedRequests} pagos correctamente y ${failedRequests} fallaron.`,
                    //     showConfirmButton: true
                    // });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registraron todos los pagos correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // Realizar la acción después de que todas las consultas se completen
                let fechaDesdeTraerPagos = $('#fechaDesdeReporteDePagos').val();
                let fechaHastaTraerPagos = $('#fechaHastaReporteDePagos').val();
                fn_TraerPagosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcel:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregarPagoCliente = filaActual.find('td:eq(0)').text().trim();
            fechaAgregarPagoCliente = fechaAgregarPagoCliente.split('-').reverse().join('-');
            let nombreCliente = filaActual.find('td:eq(1)').text().trim();
            let montoAgregarPagoCliente = filaActual.find('td:eq(2)').text().trim();
            let codAgregarPagoCliente = filaActual.find('td:eq(3)').text().trim();
            let horaAgregarPago = filaActual.find('td:eq(4)').text().trim();
            let bancoAgregarPagoCliente = filaActual.find('td:eq(5)').text().trim();
            let formaDePago = filaActual.find('td:eq(6)').text().trim();
            let comentarioAgregarPagoCliente = filaActual.find('td:eq(7)').text().trim();
            let pagoDerivado = filaActual.find('td:eq(8)').text().trim();
            let codigoCliente = filaActual.find('td:eq(9)').text().trim();
            let fechaRegistroPagoCliente = filaActual.find('td:eq(10)').text().trim();
            fechaRegistroPagoCliente = fechaRegistroPagoCliente.split('-').reverse().join('-');
    
            formaDePago = formaDePago[0].toUpperCase() + formaDePago.slice(1);
    
            // Validar que montoAgregarPagoCliente no esté vacío
            if (!montoAgregarPagoCliente) {
                alertify.notify('El campo importe no puede estar vacio', 'error', 3);
                failedRequests++;
            }else {
                $.ajax({
                    url: '/fn_consulta_VerificarCodigoPago',
                    method: 'GET',
                    data: {
                        codAgregarPagoCliente: codAgregarPagoCliente,
                    },
                    success: function(response) {
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response) && response.length > 0) {
                            response = response[0];
                            let responseNombre = response.nombreCompleto;
                            let responseFecha = response.fechaOperacionPag;
                            let responseHora = response.horaOperacionPag;
                            let responseBanco = response.bancaPago;
                            let responseCodTransferencia = response.codigoTransferenciaPag;
                            let responseMonto = response.cantidadAbonoPag;
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: 'Codigo de Operación Encontrado',
                                html: (`
                                    <hr>
                                    <br>
                                    <ul style="text-align: left; list-style-position: inside;">
                                        <li><b>Nombre : </b>${responseNombre}</li>
                                        <li><b>Fecha : </b>${responseFecha}</li>
                                        <li><b>Hora : </b>${responseHora}</li>
                                        <li><b>Monto : </b>${responseMonto}</li>
                                        <li><b>Banco : </b>${responseBanco}</li>
                                        <li><b>Codigo de Tranferencia : </b>${responseCodTransferencia}</li>
                                    </ul>`),
                            });
                            failedRequests++;
                            checkCompletion();
                        } else {
                            // Llamar a la función fn_AgregarPagoCliente con los datos de la fila actual
                            fn_AgregarPagoClienteExcel(codigoCliente, montoAgregarPagoCliente, fechaAgregarPagoCliente, formaDePago, codAgregarPagoCliente, comentarioAgregarPagoCliente, bancoAgregarPagoCliente, horaAgregarPago, pagoDerivado, nombreCliente, fechaRegistroPagoCliente)
                            .then(function() {
                                completedRequests++;
                                checkCompletion();
                            })
                            .catch(function() {
                                failedRequests++;
                                checkCompletion();
                            });
                            // Eliminar la fila actual
                            filaActual.remove();
                        }
                    },
                    error: function(error) {
                        console.error("ERROR", error);
                        failedRequests++;
                        checkCompletion();
                    }
                });
            }
        });
    }); 
    
    $(document).on('input', '.fechaRegistroPago', function () {
        // Obtener el valor del input actual
        let valor = $(this).text().trim();
        
        // Actualizar todas las celdas con la clase 'fechaRegistroPago' excepto la actual
        $('.fechaRegistroPago').not(this).each(function () {
            $(this).text(valor);
        });
    });
    
    function fn_AgregarPagoClienteExcel(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente,bancoAgregarPagoCliente,horaAgregarPago, pagoDerivado, nombreCliente, fechaRegistroPagoCliente){
        return  $.ajax({
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
                pagoDerivado:pagoDerivado,
                nombreCliente:nombreCliente,
                fechaRegistroPagoCliente:fechaRegistroPagoCliente,
            },
            success: function(response) {
                if (response.success) {
                    
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

    $(document).on('click', '#registrar_agregarPagos_Excel2', function () {

        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcel2:not(:last-child)').length;
    
        // Función para verificar si todas las solicitudes han finalizado
        function checkCompletion() {
            if (completedRequests + failedRequests === totalRequests) {
                if (failedRequests > 0) {
                    // Swal.fire({
                    //     position: 'center',
                    //     icon: 'warning',
                    //     title: 'Algunos pagos no pudieron ser registrados',
                    //     text: `Se registraron ${completedRequests} pagos correctamente y ${failedRequests} fallaron.`,
                    //     showConfirmButton: true
                    // });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registraron todos los pagos correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // Realizar la acción después de que todas las consultas se completen
                let fechaDesdeTraerPagos = $('#fechaDesdeReporteDePagos').val();
                let fechaHastaTraerPagos = $('#fechaHastaReporteDePagos').val();
                fn_TraerPagosFechas2(fechaDesdeTraerPagos, fechaHastaTraerPagos);
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcel2:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual

            let fechaAgregarPagoCliente = filaActual.find('td:eq(0)').text().trim();
            fechaAgregarPagoCliente = fechaAgregarPagoCliente.split('-').reverse().join('-');
            let horaAgregarPago = filaActual.find('td:eq(1)').text().trim();
            let nombreCliente = filaActual.find('td:eq(2)').text().trim();
            let formaDePago = filaActual.find('td:eq(3)').text().trim();
            let montoAgregarPagoCliente = filaActual.find('td:eq(4)').text().trim();
            let codAgregarPagoCliente = filaActual.find('td:eq(5)').text().trim();
            let bancoAgregarPagoCliente = filaActual.find('td:eq(6)').text().trim();
            let comentarioAgregarPagoCliente = filaActual.find('td:eq(7)').text().trim();
            let pagoDerivado = filaActual.find('td:eq(8)').text().trim();
            let codigoCliente = filaActual.find('td:eq(9)').text().trim();
            let fechaRegistroPagoCliente = filaActual.find('td:eq(10)').text().trim();
            fechaRegistroPagoCliente = fechaRegistroPagoCliente.split('-').reverse().join('-');

            formaDePago = formaDePago[0].toUpperCase() + formaDePago.slice(1);

            if (!montoAgregarPagoCliente) {
                alertify.notify('El campo importe no puede estar vacio', 'error', 3);
                failedRequests++;
            }else{

                $.ajax({
                    url: '/fn_consulta_VerificarCodigoPago',
                    method: 'GET',
                    data: {
                        codAgregarPagoCliente: codAgregarPagoCliente,
                    },
                    success: function(response) {
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response) && response.length > 0) {
                            response = response[0];
                            let responseNombre = response.nombreCompleto;
                            let responseFecha = response.fechaOperacionPag;
                            let responseHora = response.horaOperacionPag;
                            let responseBanco = response.bancaPago;
                            let responseCodTransferencia = response.codigoTransferenciaPag;
                            let responseMonto = response.cantidadAbonoPag;
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: 'Codigo de Operación Encontrado',
                                html: (`
                                    <hr>
                                    <br>
                                    <ul style="text-align: left; list-style-position: inside;">
                                        <li><b>Nombre : </b>${responseNombre}</li>
                                        <li><b>Fecha : </b>${responseFecha}</li>
                                        <li><b>Hora : </b>${responseHora}</li>
                                        <li><b>Monto : </b>${responseMonto}</li>
                                        <li><b>Banco : </b>${responseBanco}</li>
                                        <li><b>Codigo de Tranferencia : </b>${responseCodTransferencia}</li>
                                    </ul>`),
                            });
                            failedRequests++;
                            checkCompletion();
                        } else {
                            // Llamar a la función fn_AgregarPagoCliente con los datos de la fila actual
                            fn_AgregarPagoClienteExcel(codigoCliente, montoAgregarPagoCliente, fechaAgregarPagoCliente, formaDePago, codAgregarPagoCliente, comentarioAgregarPagoCliente, bancoAgregarPagoCliente, horaAgregarPago, pagoDerivado, nombreCliente, fechaRegistroPagoCliente)
                            .then(function() {
                                completedRequests++;
                                checkCompletion();
                            })
                            .catch(function() {
                                failedRequests++;
                                checkCompletion();
                            });
                            // Eliminar la fila actual
                            filaActual.remove();
                        }
                    },
                    error: function(error) {
                        console.error("ERROR", error);
                        failedRequests++;
                        checkCompletion();
                    }
                });
            }
        });
    }); 

    tablaEditable2()
    function tablaEditable2(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePagosExcel2');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntrada2(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntrada2(tbody) {
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel2 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`)); //fecha
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text("")); //hora
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text("")); //nombre
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="false">').text("Efectivo")); //forma
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text("")); //importe
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="false">').text("")); //codigo
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="false">').text("")); //banco
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">').text("2"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">').text("0"));
        nuevaFila.append($('<td class="outline-none border-l  dark:border-gray-700 p-2 text-center cursor-pointer validarFormatoFechaTablas text-gray-900 dark:text-white fechaRegistroPago" contenteditable="true">').text(`${fechaHoyTabla}`));
        tbody.append(nuevaFila);
    
        nuevaFila.find('.nombreClienteTablaExcel').on('input', function() {
            let inputText = $(this).text().trim();
            let currentCell = $(this);
            let codigoClienteCell = currentCell.closest('tr').find('td').eq(9); 
    
            if (inputText.length >= 1) { // Activar autocompletar después de 3 caracteres
                currentCell.removeClass('bg-green-500');
                
                codigoClienteCell.text("0");
                fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
                    if (clientes) {
                        showSuggestions2(currentCell, clientes);
                    }else{
                        $('.suggestions-list').remove();
                        currentCell.removeClass('bg-green-500');
                        codigoClienteCell.text("0");
                    }
                });
            } else {
                currentCell.removeClass('bg-green-500');
                hideSuggestions(currentCell);
                codigoClienteCell.text("0");
            }
        });
    
        nuevaFila.find('.nombreClienteTablaExcel').on('keydown', function(e) {
            let suggestionsList = $('.suggestions-list');
            let highlighted = suggestionsList.find('.highlighted');
            if (e.key === 'ArrowDown') {
                if (highlighted.length === 0) {
                    suggestionsList.children().first().addClass('highlighted');
                } else {
                    highlighted.removeClass('highlighted').next().addClass('highlighted');
                }
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                if (highlighted.length !== 0) {
                    highlighted.removeClass('highlighted').prev().addClass('highlighted');
                }
                e.preventDefault();
            } else if (e.key === 'Enter') {
                if (highlighted.length !== 0) {
                    highlighted.click();
                    e.preventDefault();
                }
            }
        });
    
        nuevaFila.on('input', function() {
            let vacio = true;
            nuevaFila.find('td').each(function() {
                if ($(this).text().trim() !== "") {
                    vacio = false;
                }
            });
            if (!vacio) {
                agregarFilaEntrada2(tbody);
                copiarDatosPenultimaFila2();
                nuevaFila.off('input');
            }
        });
    }

    function showSuggestions2(cell, clientes) {
        hideSuggestions(cell); // Remove existing suggestions if any
    
        let suggestions = $('<div class="suggestions-list bg-white border-2 border-gray-500"></div>').css({
            position: 'absolute',
            zIndex: 1000
        });
    
        clientes.forEach(cliente => {
            let suggestionItem = $('<div class="suggestion-item p-1"></div>').text(cliente.nombreCompleto).css({
                cursor: 'pointer'
            });
    
            suggestionItem.on('click', function() {
                cell.text(cliente.nombreCompleto);
                cell.data('selectedCliente', cliente);
                cell.addClass('bg-green-500');
                hideSuggestions(cell);

                let codigoClienteCell = cell.closest('tr').find('td').eq(9); 
                codigoClienteCell.text(cliente.codigoCli);
            });
    
            suggestions.append(suggestionItem);
        });
    
        $('body').append(suggestions);
        let offset = cell.offset();
        suggestions.css({ top: offset.top + cell.outerHeight(), left: offset.left });
    }

    $(document).on('click', '#registrar_agregarPagos_Excel3', function () {
        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcel3:not(:last-child)').length;
    
        // Función para verificar si todas las solicitudes han finalizado
        function checkCompletion() {
            if (completedRequests + failedRequests === totalRequests) {
                if (failedRequests > 0) {
                    // Swal.fire({
                    //     position: 'center',
                    //     icon: 'warning',
                    //     title: 'Algunos pagos no pudieron ser registrados',
                    //     text: `Se registraron ${completedRequests} pagos correctamente y ${failedRequests} fallaron.`,
                    //     showConfirmButton: true
                    // });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registraron todos los pagos correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // Realizar la acción después de que todas las consultas se completen
                let fechaDesdeTraerPagos = $('#fechaDesdeReporteDePagos').val();
                let fechaHastaTraerPagos = $('#fechaHastaReporteDePagos').val();
                fn_TraerPagosFechas3(fechaDesdeTraerPagos, fechaHastaTraerPagos);
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcel3:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregarPagoCliente = filaActual.find('td:eq(0)').text().trim();
            fechaAgregarPagoCliente = fechaAgregarPagoCliente.split('-').reverse().join('-');
            let nombreCliente = filaActual.find('td:eq(1)').text().trim();
            let montoAgregarPagoCliente = filaActual.find('td:eq(2)').text().trim();
            let formaDePago = filaActual.find('td:eq(3)').text().trim();
            let bancoAgregarPagoCliente = "";
            let codAgregarPagoCliente = "";
            let horaAgregarPago = "12:00:00";
            let comentarioAgregarPagoCliente = filaActual.find('td:eq(4)').text().trim();
            let pagoDerivado = filaActual.find('td:eq(5)').text().trim();
            let codigoCliente = filaActual.find('td:eq(6)').text().trim();
            let fechaRegistroPagoCliente = filaActual.find('td:eq(7)').text().trim();
            fechaRegistroPagoCliente = fechaRegistroPagoCliente.split('-').reverse().join('-');

            formaDePago = formaDePago[0].toUpperCase() + formaDePago.slice(1);

            if (!montoAgregarPagoCliente) {
                alertify.notify('El campo importe no puede estar vacio', 'error', 3);
                failedRequests++;
            }else{
                $.ajax({
                    url: '/fn_consulta_VerificarCodigoPago',
                    method: 'GET',
                    data: {
                        codAgregarPagoCliente: codAgregarPagoCliente,
                    },
                    success: function(response) {
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response) && response.length > 0) {
                            response = response[0];
                            let responseNombre = response.nombreCompleto;
                            let responseFecha = response.fechaOperacionPag;
                            let responseHora = response.horaOperacionPag;
                            let responseBanco = response.bancaPago;
                            let responseCodTransferencia = response.codigoTransferenciaPag;
                            let responseMonto = response.cantidadAbonoPag;
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: 'Codigo de Operación Encontrado',
                                html: (`
                                    <hr>
                                    <br>
                                    <ul style="text-align: left; list-style-position: inside;">
                                        <li><b>Nombre : </b>${responseNombre}</li>
                                        <li><b>Fecha : </b>${responseFecha}</li>
                                        <li><b>Hora : </b>${responseHora}</li>
                                        <li><b>Monto : </b>${responseMonto}</li>
                                        <li><b>Banco : </b>${responseBanco}</li>
                                        <li><b>Codigo de Tranferencia : </b>${responseCodTransferencia}</li>
                                    </ul>`),
                            });
                            failedRequests++;
                            checkCompletion();
                        } else {
                            // Llamar a la función fn_AgregarPagoCliente con los datos de la fila actual
                            fn_AgregarPagoClienteExcel(codigoCliente, montoAgregarPagoCliente, fechaAgregarPagoCliente, formaDePago, codAgregarPagoCliente, comentarioAgregarPagoCliente, bancoAgregarPagoCliente, horaAgregarPago, pagoDerivado, nombreCliente, fechaRegistroPagoCliente)
                            .then(function() {
                                completedRequests++;
                                checkCompletion();
                            })
                            .catch(function() {
                                failedRequests++;
                                checkCompletion();
                            });
                            // Eliminar la fila actual
                            filaActual.remove();
                        }
                    },
                    error: function(error) {
                        console.error("ERROR", error);
                        failedRequests++;
                        checkCompletion();
                    }
                });
            }
        });
    }); 

    tablaEditable3()
    function tablaEditable3(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePagosExcel3');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntrada3(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntrada3(tbody) {
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel3 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden" contenteditable="false">').text("Efectivo"));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer hidden" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">').text("3"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">').text("0"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer validarFormatoFechaTablas text-gray-900 dark:text-white fechaRegistroPago" contenteditable="true">').text(`${fechaHoyTabla}`));
        tbody.append(nuevaFila);
    
        nuevaFila.find('.nombreClienteTablaExcel').on('input', function() {
            let inputText = $(this).text().trim();
            let currentCell = $(this);
            let codigoClienteCell = currentCell.closest('tr').find('td').eq(6); 
    
            if (inputText.length >= 1) { // Activar autocompletar después de 3 caracteres
                currentCell.removeClass('bg-green-500');
                
                codigoClienteCell.text("0");
                fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
                    if (clientes) {
                        showSuggestions3(currentCell, clientes);
                    }else{
                        $('.suggestions-list').remove();
                        currentCell.removeClass('bg-green-500');
                        codigoClienteCell.text("0");
                    }
                });
            } else {
                currentCell.removeClass('bg-green-500');
                hideSuggestions(currentCell);
                codigoClienteCell.text("0");
            }
        });
    
        nuevaFila.find('.nombreClienteTablaExcel').on('keydown', function(e) {
            let suggestionsList = $('.suggestions-list');
            let highlighted = suggestionsList.find('.highlighted');
            if (e.key === 'ArrowDown') {
                if (highlighted.length === 0) {
                    suggestionsList.children().first().addClass('highlighted');
                } else {
                    highlighted.removeClass('highlighted').next().addClass('highlighted');
                }
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                if (highlighted.length !== 0) {
                    highlighted.removeClass('highlighted').prev().addClass('highlighted');
                }
                e.preventDefault();
            } else if (e.key === 'Enter') {
                if (highlighted.length !== 0) {
                    highlighted.click();
                    e.preventDefault();
                }
            }
        });
    
        nuevaFila.on('input', function() {
            let vacio = true;
            nuevaFila.find('td').each(function() {
                if ($(this).text().trim() !== "") {
                    vacio = false;
                }
            });
            if (!vacio) {
                agregarFilaEntrada3(tbody);
                copiarDatosPenultimaFila3();
                nuevaFila.off('input');
            }
        });
    }

    function showSuggestions3(cell, clientes) {
        hideSuggestions(cell); // Remove existing suggestions if any
    
        let suggestions = $('<div class="suggestions-list bg-white border-2 border-gray-500"></div>').css({
            position: 'absolute',
            zIndex: 1000
        });
    
        clientes.forEach(cliente => {
            let suggestionItem = $('<div class="suggestion-item p-1"></div>').text(cliente.nombreCompleto).css({
                cursor: 'pointer'
            });
    
            suggestionItem.on('click', function() {
                cell.text(cliente.nombreCompleto);
                cell.data('selectedCliente', cliente);
                cell.addClass('bg-green-500');
                hideSuggestions(cell);

                let codigoClienteCell = cell.closest('tr').find('td').eq(6); 
                codigoClienteCell.text(cliente.codigoCli);
            });
    
            suggestions.append(suggestionItem);
        });
    
        $('body').append(suggestions);
        let offset = cell.offset();
        suggestions.css({ top: offset.top + cell.outerHeight(), left: offset.left });
    }

    $(document).on('click', '#registrar_agregarPagos_Excel4', function () {
        let arregloCodigos = [];

        $('.pagosAgregarExcel4:not(:last-child)').each(function() {
            let filaActual = $(this);
            let codAgregarPagoCliente = filaActual.find('td:eq(3)').text().trim();
            if (codAgregarPagoCliente != ""){
                if(arregloCodigos.includes(codAgregarPagoCliente)){
                    filaActual.remove();
                }else{
                    arregloCodigos.push(codAgregarPagoCliente);
                }
            }
        });

        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcel4:not(:last-child)').length;
    
        // Función para verificar si todas las solicitudes han finalizado
        function checkCompletion() {
            if (completedRequests + failedRequests === totalRequests) {
                if (failedRequests > 0) {
                    // Swal.fire({
                    //     position: 'center',
                    //     icon: 'warning',
                    //     title: 'Algunos pagos no pudieron ser registrados',
                    //     text: `Se registraron ${completedRequests} pagos correctamente y ${failedRequests} fallaron.`,
                    //     showConfirmButton: true
                    // });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registraron todos los pagos correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // Realizar la acción después de que todas las consultas se completen
                let fechaDesdeTraerPagos = $('#fechaDesdeReporteDePagos').val();
                let fechaHastaTraerPagos = $('#fechaHastaReporteDePagos').val();
                fn_TraerPagosDirectoGranjaFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcel4:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregarPagoCliente = filaActual.find('td:eq(0)').text().trim();
            fechaAgregarPagoCliente = fechaAgregarPagoCliente.split('-').reverse().join('-');
            let nombreCliente = filaActual.find('td:eq(1)').text().trim();
            let montoAgregarPagoCliente = filaActual.find('td:eq(2)').text().trim();
            let codAgregarPagoCliente = filaActual.find('td:eq(3)').text().trim();
            let horaAgregarPago = filaActual.find('td:eq(4)').text().trim();
            let bancoAgregarPagoCliente = filaActual.find('td:eq(5)').text().trim();
            let formaDePago = filaActual.find('td:eq(6)').text().trim();
            let comentarioAgregarPagoCliente = filaActual.find('td:eq(7)').text().trim();
            let pagoDerivado = filaActual.find('td:eq(8)').text().trim();
            let codigoCliente = filaActual.find('td:eq(9)').text().trim();
            let fechaRegistroPagoCliente = filaActual.find('td:eq(10)').text().trim();
            fechaRegistroPagoCliente = fechaRegistroPagoCliente.split('-').reverse().join('-');

            formaDePago = formaDePago[0].toUpperCase() + formaDePago.slice(1);

            if (!montoAgregarPagoCliente) {
                alertify.notify('El campo importe no puede estar vacio', 'error', 3);
                failedRequests++;
            }else {
                $.ajax({
                    url: '/fn_consulta_VerificarCodigoPago',
                    method: 'GET',
                    data: {
                        codAgregarPagoCliente: codAgregarPagoCliente,
                    },
                    success: function(response) {
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response) && response.length > 0) {
                            response = response[0];
                            let responseNombre = response.nombreCompleto;
                            let responseFecha = response.fechaOperacionPag;
                            let responseHora = response.horaOperacionPag;
                            let responseBanco = response.bancaPago;
                            let responseCodTransferencia = response.codigoTransferenciaPag;
                            let responseMonto = response.cantidadAbonoPag;
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: 'Codigo de Operación Encontrado',
                                html: (`
                                    <hr>
                                    <br>
                                    <ul style="text-align: left; list-style-position: inside;">
                                        <li><b>Nombre : </b>${responseNombre}</li>
                                        <li><b>Fecha : </b>${responseFecha}</li>
                                        <li><b>Hora : </b>${responseHora}</li>
                                        <li><b>Monto : </b>${responseMonto}</li>
                                        <li><b>Banco : </b>${responseBanco}</li>
                                        <li><b>Codigo de Tranferencia : </b>${responseCodTransferencia}</li>
                                    </ul>`),
                            });
                            failedRequests++;
                            checkCompletion();
                        } else {
                            // Llamar a la función fn_AgregarPagoCliente con los datos de la fila actual
                            fn_AgregarPagoClienteExcel(codigoCliente, montoAgregarPagoCliente, fechaAgregarPagoCliente, formaDePago, codAgregarPagoCliente, comentarioAgregarPagoCliente, bancoAgregarPagoCliente, horaAgregarPago, pagoDerivado, nombreCliente, fechaRegistroPagoCliente)
                            .then(function() {
                                completedRequests++;
                                checkCompletion();
                            })
                            .catch(function() {
                                failedRequests++;
                                checkCompletion();
                            });
                            // Eliminar la fila actual
                            filaActual.remove();
                        }
                    },
                    error: function(error) {
                        console.error("ERROR", error);
                        failedRequests++;
                        checkCompletion();
                    }
                });
            }
        });
    }); 

    tablaEditable4()
    function tablaEditable4(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePagosExcel4');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntrada4(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntrada4(tbody) {
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel4 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`)); //fecha
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text("")); //nombre cliente
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text("")); //importe
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas" contenteditable="true">').text("")); //codigo
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text("")); //hora
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas" contenteditable="true">').text("")); //banco
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="false">').text("Transferencia")); // forma de pago
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">').text("5"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">').text("0"));
        tbody.append(nuevaFila);
    
        nuevaFila.find('.nombreClienteTablaExcel').on('input', function() {
            let inputText = $(this).text().trim();
            let currentCell = $(this);
            let codigoClienteCell = currentCell.closest('tr').find('td').eq(9); 
    
            if (inputText.length >= 1) { // Activar autocompletar después de 3 caracteres
                currentCell.removeClass('bg-green-500');
                
                codigoClienteCell.text("0");
                fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
                    if (clientes) {
                        showSuggestions(currentCell, clientes);
                        currentCell.removeClass('bg-green-500');
                        codigoClienteCell.text("0");
                    }else{
                        $('.suggestions-list').remove();
                    }
                });
            } else {
                currentCell.removeClass('bg-green-500');
                hideSuggestions(currentCell);
                codigoClienteCell.text("0");
            }
        });
    
        nuevaFila.find('.nombreClienteTablaExcel').on('keydown', function(e) {
            let suggestionsList = $('.suggestions-list');
            let highlighted = suggestionsList.find('.highlighted');
            if (e.key === 'ArrowDown') {
                if (highlighted.length === 0) {
                    suggestionsList.children().first().addClass('highlighted');
                } else {
                    highlighted.removeClass('highlighted').next().addClass('highlighted');
                }
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                if (highlighted.length !== 0) {
                    highlighted.removeClass('highlighted').prev().addClass('highlighted');
                }
                e.preventDefault();
            } else if (e.key === 'Enter') {
                if (highlighted.length !== 0) {
                    highlighted.click();
                    e.preventDefault();
                }
            }
        });
    
        nuevaFila.on('input', function() {
            let vacio = true;
            nuevaFila.find('td').each(function() {
                if ($(this).text().trim() !== "") {
                    vacio = false;
                }
            });
            if (!vacio) {
                agregarFilaEntrada4(tbody);
                nuevaFila.off('input');
            }
        });
    }

    // EGRESOS

    $(document).on('click', '#registrar_agregarPagos_ExcelEgreso1', function () {
        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcelEgreso1:not(:last-child)').length;
    
        // Función para verificar si todas las solicitudes han finalizado
        function checkCompletion() {
            if (completedRequests + failedRequests === totalRequests) {
                if (failedRequests > 0) {
                    // Swal.fire({
                    //     position: 'center',
                    //     icon: 'warning',
                    //     title: 'Algunos pagos no pudieron ser registrados',
                    //     text: `Se registraron ${completedRequests} pagos correctamente y ${failedRequests} fallaron.`,
                    //     showConfirmButton: true
                    // });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registraron todos los pagos correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // Realizar la acción después de que todas las consultas se completen
                let fechaDesdeTraerPagos = $('#fechaDesdeReporteDePagos').val();
                let fechaHastaTraerPagos = $('#fechaHastaReporteDePagos').val();
                fn_TraerEgresosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcelEgreso1:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregEgresoCliente = filaActual.find('td:eq(0)').text().trim();
            fechaAgregEgresoCliente = fechaAgregEgresoCliente.split('-').reverse().join('-');
            let usoReporteEgreso = filaActual.find('td:eq(1)').text().trim();
            let cantidadAgregEgresoCliente = filaActual.find('td:eq(2)').text().trim();
            let montoNuevoAgregEgresoCliente = filaActual.find('td:eq(3)').text().trim();
            let montoAgregEgresoCliente = filaActual.find('td:eq(4)').text().trim();
            let formaDePagoEgreso = filaActual.find('td:eq(5)').text().trim();
            let bancoAgregEgresoCliente = filaActual.find('td:eq(6)').text().trim();
            let codAgregEgresoCliente = filaActual.find('td:eq(7)').text().trim();
            let comentarioAgregarPagoCliente = "";
            let horaAgregarPago = "12:00:00";
            let pagoDerivado = "6";
            let codCliente = "33";
            formaDePagoEgreso = formaDePagoEgreso[0].toUpperCase() + formaDePagoEgreso.slice(1);

            let montoEgresoPagoo = parseFloat(montoAgregEgresoCliente)*-1;

            if (!cantidadAgregEgresoCliente, !montoNuevoAgregEgresoCliente, !montoAgregEgresoCliente) {
                alertify.notify('Los campos de precios no pueden estar vacios', 'error', 3);
                failedRequests++;
            }else{
                $.ajax({
                    url: '/fn_consulta_VerificarCodigoPago',
                    method: 'GET',
                    data: {
                        codAgregarPagoCliente: codAgregEgresoCliente,
                    },
                    success: function(response) {
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response) && response.length > 0) {
                            response = response[0];
                            let responseNombre = response.nombreCompleto;
                            let responseFecha = response.fechaOperacionPag;
                            let responseHora = response.horaOperacionPag;
                            let responseBanco = response.bancaPago;
                            let responseCodTransferencia = response.codigoTransferenciaPag;
                            let responseMonto = response.cantidadAbonoPag;
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: 'Codigo de Operación Encontrado',
                                html: (`
                                    <hr>
                                    <br>
                                    <ul style="text-align: left; list-style-position: inside;">
                                        <li><b>Nombre : </b>${responseNombre}</li>
                                        <li><b>Fecha : </b>${responseFecha}</li>
                                        <li><b>Hora : </b>${responseHora}</li>
                                        <li><b>Monto : </b>${responseMonto}</li>
                                        <li><b>Banco : </b>${responseBanco}</li>
                                        <li><b>Codigo de Tranferencia : </b>${responseCodTransferencia}</li>
                                    </ul>`),
                            });
                            failedRequests++;
                            checkCompletion();
                        } else {
                            if (usoReporteEgreso.includes("FLETE")) {
                                fn_AgregarPagoClienteExcel(codCliente, montoEgresoPagoo, fechaAgregEgresoCliente, formaDePagoEgreso, codAgregEgresoCliente, comentarioAgregarPagoCliente, bancoAgregEgresoCliente, horaAgregarPago, pagoDerivado, usoReporteEgreso, fechaAgregEgresoCliente)
                            }
                            // Llamar a la función fn_AgregarPagoCliente con los datos de la fila actual
                            fn_AgregarEgreso(montoAgregEgresoCliente,fechaAgregEgresoCliente,cantidadAgregEgresoCliente,montoNuevoAgregEgresoCliente,formaDePagoEgreso,bancoAgregEgresoCliente,codAgregEgresoCliente,usoReporteEgreso)
                            .then(function() {
                                completedRequests++;
                                checkCompletion();
                            })
                            .catch(function() {
                                failedRequests++;
                                checkCompletion();
                            });
                            // Eliminar la fila actual
                            filaActual.remove();
                        }
                    },
                    error: function(error) {
                        console.error("ERROR", error);
                        failedRequests++;
                        checkCompletion();
                    }
                });
            }
        });
    }); 

    tablaEditableEgreso1()
    function tablaEditableEgreso1(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePagosExcelEgreso1');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntradaEgreso1(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntradaEgreso1(tbody) {
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcelEgreso1 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap convertirMayusculasTablas dark:text-white" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas accionarSumaMonto" contenteditable="true">').text("")); // cantidad
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas accionarSumaMonto" contenteditable="true">').text("")); // precio
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="false">').text("")); // resultado
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden" contenteditable="true">').text("Efectivo"));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="true">').text(""));
        tbody.append(nuevaFila);
    
        // Evento para agregar una nueva fila si la actual no está vacía
        nuevaFila.on('input', function() {
            let vacio = true;
            nuevaFila.find('td').each(function() {
                if ($(this).text().trim() !== "") {
                    vacio = false;
                }
            });
            if (!vacio) {
                agregarFilaEntradaEgreso1(tbody);
                nuevaFila.off('input');
            }
        });
    
        // Evento para calcular y actualizar el resultado
        nuevaFila.on('input', '.accionarSumaMonto', function() {
            let cantidad = parseFloat(nuevaFila.find('td').eq(2).text().trim()) || 1;
            let precio = parseFloat(nuevaFila.find('td').eq(3).text().trim()) || 0;
            let resultado = cantidad * precio;
            nuevaFila.find('td').eq(4).text(resultado.toFixed(2));
        });
    }
    
    $(document).on('input', '.accionarSumaMonto', function () {
        let fila = $(this).closest('tr');
        let cantidad = parseFloat(fila.find('td').eq(2).text().trim()) || 1;
        let precio = parseFloat(fila.find('td').eq(3).text().trim()) || 0;
        let resultado = cantidad * precio;
        fila.find('td').eq(4).text(resultado.toFixed(2));
    });    

    function fn_AgregarEgreso(montoAgregEgresoCliente,fechaAgregEgresoCliente,cantidadAgregEgresoCliente,montoNuevoAgregEgresoCliente,formaDePagoEgreso,bancoAgregEgresoCliente,codAgregEgresoCliente,usoReporteEgreso){
        return $.ajax({
            url: '/fn_consulta_AgregarEgreso',
            method: 'GET',
            data:{
                montoAgregEgresoCliente: montoAgregEgresoCliente,
                fechaAgregEgresoCliente: fechaAgregEgresoCliente,
                cantidadAgregEgresoCliente: cantidadAgregEgresoCliente,
                montoNuevoAgregEgresoCliente: montoNuevoAgregEgresoCliente,
                formaDePagoEgreso: formaDePagoEgreso,
                bancoAgregEgresoCliente: bancoAgregEgresoCliente,
                codAgregEgresoCliente: codAgregEgresoCliente,
                usoReporteEgreso: usoReporteEgreso,
            },
            success: function(response) {
                if (response.success) {

                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }   

    // EGRESO 2

    $(document).on('click', '#registrar_agregarPagos_ExcelEgreso2', function () {
        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcelEgreso2:not(:last-child)').length;
    
        // Función para verificar si todas las solicitudes han finalizado
        function checkCompletion() {
            if (completedRequests + failedRequests === totalRequests) {
                if (failedRequests > 0) {
                    // Swal.fire({
                    //     position: 'center',
                    //     icon: 'warning',
                    //     title: 'Algunos pagos no pudieron ser registrados',
                    //     text: `Se registraron ${completedRequests} pagos correctamente y ${failedRequests} fallaron.`,
                    //     showConfirmButton: true
                    // });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registraron todos los pagos correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // Realizar la acción después de que todas las consultas se completen
                let fechaDesdeTraerPagos = $('#fechaDesdeReporteDePagos').val();
                let fechaHastaTraerPagos = $('#fechaHastaReporteDePagos').val();
                fn_TraerEgresosPaulFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcelEgreso2:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregEgresoCliente = filaActual.find('td:eq(0)').text().trim();
            fechaAgregEgresoCliente = fechaAgregEgresoCliente.split('-').reverse().join('-');
            let usoReporteEgreso = filaActual.find('td:eq(1)').text().trim();
            let montoAgregEgresoCliente = filaActual.find('td:eq(2)').text().trim();
            let formaDePagoEgreso = filaActual.find('td:eq(3)').text().trim();
            let bancoAgregEgresoCliente = filaActual.find('td:eq(4)').text().trim();
            let codAgregEgresoCliente = filaActual.find('td:eq(5)').text().trim();
            let cantidadAgregEgresoCliente = filaActual.find('td:eq(6)').text().trim();
            let montoNuevoAgregEgresoCliente = filaActual.find('td:eq(7)').text().trim();

            formaDePagoEgreso = formaDePagoEgreso[0].toUpperCase() + formaDePagoEgreso.slice(1);

            if (!montoAgregEgresoCliente) {
                alertify.notify('El campo importe no puede estar vacio', 'error', 3);
                failedRequests++;
            }else{
                $.ajax({
                    url: '/fn_consulta_VerificarCodigoPago',
                    method: 'GET',
                    data: {
                        codAgregarPagoCliente: codAgregEgresoCliente,
                    },
                    success: function(response) {
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response) && response.length > 0) {
                            response = response[0];
                            let responseNombre = response.nombreCompleto;
                            let responseFecha = response.fechaOperacionPag;
                            let responseHora = response.horaOperacionPag;
                            let responseBanco = response.bancaPago;
                            let responseCodTransferencia = response.codigoTransferenciaPag;
                            let responseMonto = response.cantidadAbonoPag;
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: 'Codigo de Operación Encontrado',
                                html: (`
                                    <hr>
                                    <br>
                                    <ul style="text-align: left; list-style-position: inside;">
                                        <li><b>Nombre : </b>${responseNombre}</li>
                                        <li><b>Fecha : </b>${responseFecha}</li>
                                        <li><b>Hora : </b>${responseHora}</li>
                                        <li><b>Monto : </b>${responseMonto}</li>
                                        <li><b>Banco : </b>${responseBanco}</li>
                                        <li><b>Codigo de Tranferencia : </b>${responseCodTransferencia}</li>
                                    </ul>`),
                            });
                            failedRequests++;
                            checkCompletion();
                        } else {
                            // Llamar a la función fn_AgregarPagoCliente con los datos de la fila actual
                            fn_AgregarEgresoPaul2(montoAgregEgresoCliente,fechaAgregEgresoCliente,cantidadAgregEgresoCliente,montoNuevoAgregEgresoCliente,formaDePagoEgreso,bancoAgregEgresoCliente,codAgregEgresoCliente,usoReporteEgreso)
                            .then(function() {
                                completedRequests++;
                                checkCompletion();
                            })
                            .catch(function() {
                                failedRequests++;
                                checkCompletion();
                            });
                            // Eliminar la fila actual
                            filaActual.remove();
                        }
                    },
                    error: function(error) {
                        console.error("ERROR", error);
                        failedRequests++;
                        checkCompletion();
                    }
                });
            }
        });
    }); 

    tablaEditableEgreso2()
    function tablaEditableEgreso2(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePagosExcelEgreso2');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntradaEgreso2(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntradaEgreso2(tbody) {
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcelEgreso2 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap convertirMayusculasTablas dark:text-white" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden" contenteditable="true">').text("Efectivo"));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="true">').text(""));
        tbody.append(nuevaFila);
    
        nuevaFila.on('input', function() {
            let vacio = true;
            nuevaFila.find('td').each(function() {
                if ($(this).text().trim() !== "") {
                    vacio = false;
                }
            });
            if (!vacio) {
                agregarFilaEntradaEgreso2(tbody);
                nuevaFila.off('input');
            }
        });
    }

    function fn_AgregarEgresoPaul2(montoAgregEgresoCliente,fechaAgregEgresoCliente,cantidadAgregEgresoCliente,montoNuevoAgregEgresoCliente,formaDePagoEgreso,bancoAgregEgresoCliente,codAgregEgresoCliente,usoReporteEgreso){
        return $.ajax({
            url: '/fn_consulta_AgregarEgresoPaul',
            method: 'GET',
            data:{
                montoAgregEgresoCliente: montoAgregEgresoCliente,
                fechaAgregEgresoCliente: fechaAgregEgresoCliente,
                cantidadAgregEgresoCliente: cantidadAgregEgresoCliente,
                montoNuevoAgregEgresoCliente: montoNuevoAgregEgresoCliente,
                formaDePagoEgreso: formaDePagoEgreso,
                bancoAgregEgresoCliente: bancoAgregEgresoCliente,
                codAgregEgresoCliente: codAgregEgresoCliente,
                usoReporteEgreso: usoReporteEgreso,
            },
            success: function(response) {
                if (response.success) {

                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }   

    // =====================================================

    fn_declararEspeciesCambiarPrecios();
    function fn_declararEspeciesCambiarPrecios(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    
                    // Obtener el select
                    let selectPresentacion = $('#especiesCambioPrecioPesadas');
                    
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

    $('#idCambiarPrecioPesadaCliente').on('input', function () {
        let inputCambiarPrecioCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesCambiarPrecioPesada');
        contenedorClientes.empty();

        if (inputCambiarPrecioCliente.length > 0 && inputCambiarPrecioCliente != "") {
            fn_TraerClientesCambiarPrecios(inputCambiarPrecioCliente);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    function fn_TraerClientesCambiarPrecios(inputAgregarPagoCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarPagoCliente',
            method: 'GET',
            data: {
                inputAgregarPagoCliente: inputAgregarPagoCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesCambiarPrecioPesada')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idCambiarPrecioPesadaCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliCambiarPrecioPesada').attr("value", obj.codigoCli);

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

    $(document).on("click", "#btnCambiarPrecioPesadas", function() {      
        $('#ModalCambiarPrecioPesada').addClass('flex');
        $('#ModalCambiarPrecioPesada').removeClass('hidden');
        $('#selectedCodigoCliCambiarPrecioPesada').attr('value',"");
        $('#especiesCambioPrecioPesadas').val(0);
        $('#nuevoPrecioCambiarPesadas').val("");
        $('#idCambiarPrecioPesadaCliente').val("");
        $("#nuevoPrecioCambiarPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        $("#especiesCambioPrecioPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        $("#idCambiarPrecioPesadaCliente").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
    });

    $('.cerrarModalCambiarPrecioPesada, #ModalCambiarPrecioPesada .opacity-75').on('click', function (e) {
        $('#ModalCambiarPrecioPesada').addClass('hidden');
        $('#ModalCambiarPrecioPesada').removeClass('flex');
    });

    $('#btnCambiarPrecioPesada').on('click', function () {
        let codigoCliente = $('#selectedCodigoCliCambiarPrecioPesada').attr('value');
        let fechaCambioPrecio = $('#fechaCambiarPrecioPesada').val();
        let especieCambioPrecio = $('#especiesCambioPrecioPesadas').val();
        let nuevoPrecio = $('#nuevoPrecioCambiarPesadas').val();

        let contadorErrores = 0

        if (codigoCliente == 0 || codigoCliente == ""){
            contadorErrores++;
            $("#idCambiarPrecioPesadaCliente").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#idCambiarPrecioPesadaCliente").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }
        if (especieCambioPrecio == 0 || especieCambioPrecio == "" || especieCambioPrecio === null){
            contadorErrores++;
            $("#especiesCambioPrecioPesadas").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#especiesCambioPrecioPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }
        if(nuevoPrecio == ""){
            contadorErrores++;
            $("#nuevoPrecioCambiarPesadas").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#nuevoPrecioCambiarPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }

        if (contadorErrores <= 0){
            Swal.fire({
                title: '¿Desea cambiar los registros?',
                text: "¡Estas seguro de cambiar el precio de las pesadas!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '¡No, cancelar!',
                confirmButtonText: '¡Si, cambiar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fn_CambiarPrecioPesadas(codigoCliente, fechaCambioPrecio, especieCambioPrecio, nuevoPrecio);
                }
            })
        }else{
            alertify.notify('Debe rellenar todos los campos.', 'error', 3);
        }

    });

    function fn_CambiarPrecioPesadas(codigoCliente, fechaCambioPrecio, especieCambioPrecio, nuevoPrecio){
        $.ajax({
            url: '/fn_consulta_CambiarPrecioPesadas',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
                fechaCambioPrecio : fechaCambioPrecio,
                especieCambioPrecio: especieCambioPrecio,
                nuevoPrecio: nuevoPrecio,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se cambio los precios correctamente.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#selectedCodigoCliCambiarPrecioPesada').attr('value',"");
                    $('#especiesCambioPrecioPesadas').val(0);
                    $('#nuevoPrecioCambiarPesadas').val("");
                    $('#idCambiarPrecioPesadaCliente').val("");
                    $('#ModalCambiarPrecioPesada').addClass('hidden');
                    $('#ModalCambiarPrecioPesada').removeClass('flex');
                    $('#btnBuscarCuentaDelCliente').trigger('click');
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
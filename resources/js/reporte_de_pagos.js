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
    fn_declararCategorias();

    /* ============ Eventos ============ */

    // Eventos para abrir y cerrar modal de Agregar Pago

    $('#registrar_agregarPago_submit').on('click', function () {
        // $('#idAgregarPagoCliente').focus();

        $('#idAgregarPagoCliente').val('');
        $('#valorAgregarPagoCliente').val('');
        $('#bancoAgregarPagoCliente').val('');
        $('#codAgregarPagoCliente').val('');
        $('#comentarioAgregarPagoCliente').val('');
        $('#codigoClienteSeleccionado2').val(0);
        $('#inputNombreClientes2').val("");
        $("#clienteSeleccionadoCorrecto2").removeClass("flex");
        $("#clienteSeleccionadoCorrecto2").addClass("hidden");
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
        $('#codigoClienteSeleccionado3').val(0);
        $('#inputNombreClientes3').val("");
        $("#clienteSeleccionadoCorrecto3").removeClass("flex");
        $("#clienteSeleccionadoCorrecto3").addClass("hidden");
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
        let codigoCliente = $('#codigoClienteSeleccionado2').val();
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
                    let codigoCliente = $('#codigoClienteSeleccionado2').val(0);
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

        let codigoCliente = $('#codigoClienteSeleccionado3').val();
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
        fn_TraerPagosFechas2(fechaHastaTraerPagos, fechaHastaTraerPagos);
        fn_TraerPagosFechas3(fechaHastaTraerPagos, fechaHastaTraerPagos);
        // fn_TraerPagosDirectoGranjaFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
        fn_TraerEgresosFechas(fechaHastaTraerPagos, fechaHastaTraerPagos);
        fn_TraerEgresosPaulFechas(fechaHastaTraerPagos, fechaHastaTraerPagos);
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

    /* ============ Termina Eventos ============ */


    /* ============ Funciones ============ */

    function declarar_especies(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

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
        if (Array.isArray(clientesArreglo) && clientesArreglo.length > 0) {
            const filteredClients = clientesArreglo.filter(cliente =>
                cliente.nombreCompleto.includes(inputAgregarPagoCliente.toUpperCase())
            );
            callback(filteredClients);
        } else {
            callback(null);
        }
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
        tbody.on('keydown', 'td[contenteditable="true"], td input', function(e) {
            let currentElement = $(this);
            let currentTd = currentElement.closest('td');
            let currentRow = currentTd.parent();
            let currentTdIndex = currentTd.index();
    
            if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
    
                if (e.key === "ArrowRight") {
                    let nextTd = currentTd.nextAll('td[contenteditable="true"], td').first();
                    if (nextTd.length) {
                        let nextInput = nextTd.find('input').first();
                        if (nextInput.length) {
                            nextInput.focus();
                        } else {
                            nextTd.focus();
                        }
                    } else {
                        let nextRow = currentRow.next();
                        if (nextRow.length) {
                            let nextTdInNextRow = nextRow.children().eq(currentTdIndex);
                            let nextInputInNextRow = nextTdInNextRow.find('input').first();
                            if (nextInputInNextRow.length) {
                                nextInputInNextRow.focus();
                            } else {
                                nextTdInNextRow.focus();
                            }
                        }
                    }
                } else if (e.key === "ArrowLeft") {
                    let prevTd = currentTd.prevAll('td[contenteditable="true"], td').first();
                    if (prevTd.length) {
                        let prevInput = prevTd.find('input').first();
                        if (prevInput.length) {
                            prevInput.focus();
                        } else {
                            prevTd.focus();
                        }
                    } else {
                        let prevRow = currentRow.prev();
                        if (prevRow.length) {
                            let prevTdInPrevRow = prevRow.children().eq(currentTdIndex);
                            let prevInputInPrevRow = prevTdInPrevRow.find('input').first();
                            if (prevInputInPrevRow.length) {
                                prevInputInPrevRow.focus();
                            } else {
                                prevTdInPrevRow.focus();
                            }
                        }
                    }
                } else if (e.key === "ArrowDown") {
                    let nextRow = currentRow.next();
                    if (nextRow.length) {
                        let nextTdInNextRow = nextRow.children().eq(currentTdIndex);
                        let nextInputInNextRow = nextTdInNextRow.find('input').first();
                        if (nextInputInNextRow.length) {
                            nextInputInNextRow.focus();
                        } else {
                            nextTdInNextRow.focus();
                        }
                    }
                } else if (e.key === "ArrowUp") {
                    let prevRow = currentRow.prev();
                    if (prevRow.length) {
                        let prevTdInPrevRow = prevRow.children().eq(currentTdIndex);
                        let prevInputInPrevRow = prevTdInPrevRow.find('input').first();
                        if (prevInputInPrevRow.length) {
                            prevInputInPrevRow.focus();
                        } else {
                            prevTdInPrevRow.focus();
                        }
                    }
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
        totalPagoIngresoPaul = 0
        $.ajax({
            url: '/fn_consulta_TraerSaldoAnterior',
            method: 'GET',
            data:{
                fechaDesdeTraerPagos:fechaDesdeTraerPagos,
                fechaHastaTraerPagos:fechaHastaTraerPagos,
            },
            success: function(response) {

                let respuestaTotal = parseFloat(response[0]["totalAbonosPagos"]) - parseFloat(response[0]["totalAbonosEgresos"]);

                $.ajax({
                    url: '/fn_consulta_TraerPagosFechasItem3',
                    method: 'GET',
                    data:{
                        fechaDesdeTraerPagos:fechaDesdeTraerPagos,
                        fechaHastaTraerPagos:fechaHastaTraerPagos,
                    },
                    success: function(response) {

                        // Obtener el select
                        let tbodyReporteDePagos = $('#bodyReporteDePagosCobranzaDePaul');
                        tbodyReporteDePagos.empty();
    
                        let totalPago = 0;
                        let nuevaFila = "";

                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        totalPago += parseFloat(respuestaTotal);
                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(fechaHastaTraerPagos));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text("SALDO ANTERIOR")));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(respuestaTotal).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text("Efectivo"));
                        // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.horaOperacionPag));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer hidden">').text(""));
                        // Agregar la nueva fila al tbody
                        tbodyReporteDePagos.append(nuevaFila);
        
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response)) {
        
                            // Iterar sobre los objetos y mostrar sus propiedades
                            response.forEach(function(obj) {
                                // Crear una nueva fila
                                nuevaFila = $('<tr class="bg-white editarPagos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                totalPago += parseFloat(obj.cantidadAbonoPag);
                                // Agregar las celdas con la información
                                nuevaFila.append($('<td class="hidden">').text(obj.idPagos));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionPag));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto === "" ? obj.campoExtra : obj.nombreCompleto)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.tipoAbonoPag));
                                // nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.horaOperacionPag));
                                nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer hidden">').text(obj.observacion));
                                // Agregar la nueva fila al tbody
                                tbodyReporteDePagos.append(nuevaFila);
                            });
        
                            // if (response.length == 0) {
                            //     tbodyReporteDePagos.html(`<tr class="rounded-lg border-2 border-l-[1px] border-r-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                            // }else{
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
                                totalPagoIngresoPaul += totalPago;
                                diferenciaPagosPaul();
                            // }
        
                        } else {
                            console.log("La respuesta no es un arreglo de objetos.");
                        }
                        
                    },
                    error: function(error) {
                        console.error("ERROR",error);
                    }
                });
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
                        nuevaFila = $('<tr class="bg-white border-b editarDescuentos dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

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
        let fila = $(this).closest('tr');
        let idReporteDePago= fila.find('td:eq(0)').text();
        //console.log('Report', idReporteDePago);

        $('#idReporteDePago').attr("value",idReporteDePago);
        fn_EditarPago(idReporteDePago);
        
        $('#ModalAgregarPagoClienteEditar').addClass('flex');
        $('#ModalAgregarPagoClienteEditar').removeClass('hidden');
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

    $(document).on('contextmenu', 'tr.editarDescuentos', function (e) {
        e.preventDefault();
        let codigoDescuento = $(this).closest("tr").find("td:first").text();
        Swal.fire({
            title: '¿Desea eliminar el Registro?',
            text: "¡Estas seguro de eliminar el descuento!",
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
            url: '/fn_consulta_TraerDetallesEgresos',
            method: 'GET',
            data:{
                fechaDesde:fechaDesdeTraerPagos,
                fechaHasta:fechaHastaTraerPagos,
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
                    nuevaFila = $('<tr class="bg-white verDetalleEgreso border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                    totalPago += parseFloat(obj.monto_detalle);
                    // Agregar las celdas con la información
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fecha_detalle));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex w-full justify-between gap-4 items-center">').html(obj.nombre_category === null ? `<span>${obj.uso_detalle_egreso}</span>` : `<span>${obj.nombre_category}</span>` + "<i class='bx bx-expand' ></i>"));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.nombre_category === null ? obj.cantidad_detalles : ""));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.nombre_category === null ? parseFloat(obj.precio_detalle).toFixed(2) : obj.monto_detalle));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.monto_detalle));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden">').text(obj.id_category));
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
        totalPagoEgresoPaul = 0
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
                    fn_TraerEgresosFechas(fechaHastaTraerPagos,fechaHastaTraerPagos);
                    fn_TraerEgresosPaulFechas(fechaHastaTraerPagos,fechaHastaTraerPagos);
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
            let datosColumna6 = penultimaFila.find('td').eq(10).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
            ultimaFila.find('td').eq(10).text(datosColumna6);
        }
    } 

    function copiarDatosPenultimaFila3() {
        let filas = $('.pagosAgregarExcel3');
        if (filas.length > 1) {
            let penultimaFila = filas.eq(filas.length - 2);
            let ultimaFila = filas.eq(filas.length - 1);
            let datosColumna0 = penultimaFila.find('td').eq(0).text();
            let datosColumna8 = penultimaFila.find('td').eq(7).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
            ultimaFila.find('td').eq(7).text(datosColumna8);
        }
    } 

    function copiarDatosPenultimaFila4() {
        let filas = $('.pagosAgregarExcelEgreso1');
        if (filas.length > 1) {
            let penultimaFila = filas.eq(filas.length - 2);
            let ultimaFila = filas.eq(filas.length - 1);
            let datosColumna0 = penultimaFila.find('td').eq(0).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
        }
    } 

    function copiarDatosPenultimaFila5() {
        let filas = $('.pagosAgregarExcelEgreso2');
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
        copiarDatosPenultimaFila4();
        copiarDatosPenultimaFila5();
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

        $("#registrar_agregarPagos_Excel").attr('disabled','disabled');

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

        if(totalRequests == 0){
            $("#registrar_agregarPagos_Excel").removeAttr('disabled');
        }
    
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
                fn_TraerPagosFechas(fechaHastaTraerPagos, fechaHastaTraerPagos);
                $("#registrar_agregarPagos_Excel").removeAttr('disabled');
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

        $("#registrar_agregarPagos_Excel2").attr('disabled','disabled');

        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcel2:not(:last-child)').length;
        
        if(totalRequests == 0){
            $("#registrar_agregarPagos_Excel2").removeAttr('disabled');
        }
    
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
                fn_TraerPagosFechas2(fechaHastaTraerPagos, fechaHastaTraerPagos);
                $("#registrar_agregarPagos_Excel2").removeAttr('disabled');
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
        const ahoraEnNY2 = new Date();
        const hours = ahoraEnNY2.getHours().toString().padStart(2, '0');
        const minutes = ahoraEnNY2.getMinutes().toString().padStart(2, '0');
        const seconds = ahoraEnNY2.getSeconds().toString().padStart(2, '0');
        const currentTime = hours + ":" + minutes + ":" + seconds;
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel2 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`)); //fecha
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text(currentTime)); //hora
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

        $("#registrar_agregarPagos_Excel3").attr('disabled','disabled');

        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcel3:not(:last-child)').length;

        if(totalRequests == 0){
            $("#registrar_agregarPagos_Excel3").removeAttr('disabled');
        }
    
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
                fn_TraerPagosFechas3(fechaHastaTraerPagos, fechaHastaTraerPagos);
                $("#registrar_agregarPagos_Excel3").removeAttr('disabled');
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
        $("#registrar_agregarPagos_Excel4").attr('disabled','disabled');
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

        if(totalRequests == 0){
            $("#registrar_agregarPagos_Excel4").removeAttr('disabled');
        }
    
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
                fn_TraerPagosDirectoGranjaFechas(fechaHastaTraerPagos, fechaHastaTraerPagos);
                $("#registrar_agregarPagos_Excel4").removeAttr('disabled');
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

        $("#registrar_agregarPagos_ExcelEgreso1").attr('disabled','disabled');
        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcelEgreso1:not(:last-child)').length;

        if(totalRequests == 0){
            $("#registrar_agregarPagos_ExcelEgreso1").removeAttr('disabled');
        }
    
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
                fn_TraerEgresosFechas(fechaHastaTraerPagos, fechaHastaTraerPagos);
                $("#registrar_agregarPagos_ExcelEgreso1").removeAttr('disabled');
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcelEgreso1:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregEgresoCliente = filaActual.find('td:eq(0)').text().trim();
            fechaAgregEgresoCliente = fechaAgregEgresoCliente.split('-').reverse().join('-');
            let usoReporteEgreso = filaActual.find('td:eq(1)').find('input').val().trim();
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
                            if (usoReporteEgreso.includes("FLETE") && usoReporteEgreso.includes("PIURA")) {
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
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white" contenteditable="false">').html(`<input type="text" class="autocompleteEgresosCajaChica text-sm bg-transparent dark:text-white text-gray-900 border-none">`));
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
                copiarDatosPenultimaFila4();
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
        $("#registrar_agregarPagos_ExcelEgreso2").attr('disabled','disabled');
        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcelEgreso2:not(:last-child)').length;

        if(totalRequests == 0){
            $("#registrar_agregarPagos_ExcelEgreso2").removeAttr('disabled');
        }
    
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
                fn_TraerEgresosPaulFechas(fechaHastaTraerPagos, fechaHastaTraerPagos);
                $("#registrar_agregarPagos_ExcelEgreso2").removeAttr('disabled');
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcelEgreso2:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregEgresoCliente = filaActual.find('td:eq(0)').text().trim();
            fechaAgregEgresoCliente = fechaAgregEgresoCliente.split('-').reverse().join('-');
            let usoReporteEgreso = filaActual.find('td:eq(1)').find('input').val().trim();
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
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white" contenteditable="false">').html(`<input type="text" class="autocompleteEgresosPaul text-sm bg-transparent dark:text-white text-gray-900 border-none">`));
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
                copiarDatosPenultimaFila5();
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

    fn_TraerEgresosCajaChica();

    var egresosCajaChicaArreglo = [];

    function fn_TraerEgresosCajaChica() {
        $.ajax({
            url: '/fn_consulta_TraerEgresosCajaChica',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Transformar el JSON a un arreglo de strings
                    let egresosArreglo = response.map(function(item) {
                        return item.nombreEgresoCamal;
                    });
                    
                    // Asignar el arreglo transformado a egresosCajaChicaArreglo
                    egresosCajaChicaArreglo = egresosArreglo;
                    // console.log(egresosCajaChicaArreglo);
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    fn_TraerEgresosPaul();

    var egresosPaulArreglo = [];

    function fn_TraerEgresosPaul() {
        $.ajax({
            url: '/fn_consulta_TraerEgresosPaul',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Transformar el JSON a un arreglo de strings
                    let egresosArreglo = response.map(function(item) {
                        return item.nombreEgresoCamal;
                    });
                    
                    // Asignar el arreglo transformado a egresosPaulArreglo
                    egresosPaulArreglo = egresosArreglo;
                    // console.log(egresosPaulArreglo);
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    // Eventos de autocompletado
    $(document).on("input", ".autocompleteEgresosCajaChica", function() {
        let input = $(this);
        let value = input.val().toUpperCase();  // Convertir a mayúsculas
        input.val(value);  // Asignar el valor en mayúsculas

        let suggestion = "";

        if (value.length > 0) {
            let regex = new RegExp("^" + value, "i");
            let match = egresosCajaChicaArreglo.find(function(word) {
                return word.match(regex);
            });

            if (match) {
                suggestion = match.toUpperCase();  // Asegurarse de que la sugerencia también esté en mayúsculas
            }
        }

        if (suggestion) {
            input.val(suggestion);
            input[0].setSelectionRange(value.length, suggestion.length);
        }
    });

    $(document).on("keydown", ".autocompleteEgresosCajaChica", function(e) {
        let input = $(this);
        let value = input.val().toUpperCase();
        let start = input[0].selectionStart;
        let end = input[0].selectionEnd;

        if (e.key === "Tab" || e.key === "Enter" || e.key === "ArrowRight") {
            let suggestion = "";

            if (value.length > 0) {
                let regex = new RegExp("^" + value, "i");
                let match = egresosCajaChicaArreglo.find(function(word) {
                    return word.match(regex);
                });

                if (match) {
                    suggestion = match.toUpperCase();  // Asegurarse de que la sugerencia también esté en mayúsculas
                }
            }

            if (suggestion) {
                e.preventDefault();
                input.val(suggestion);
                input[0].setSelectionRange(suggestion.length, suggestion.length);
            }
        } else if (e.key === "Backspace") {
            if (start === end && end < value.length) {
                input.val(value.substring(0, start));
                input[0].setSelectionRange(start, start);
                e.preventDefault();
            } else {
                input.val(value.substring(0, start - 1) + value.substring(end));
                input[0].setSelectionRange(start - 1, start - 1);
                e.preventDefault();
            }
        }
    });

    // Eventos de autocompletado
    $(document).on("input", ".autocompleteEgresosPaul", function() {
        let input = $(this);
        let value = input.val().toUpperCase();  // Convertir a mayúsculas
        input.val(value);  // Asignar el valor en mayúsculas

        let suggestion = "";

        if (value.length > 0) {
            let regex = new RegExp("^" + value, "i");
            let match = egresosPaulArreglo.find(function(word) {
                return word.match(regex);
            });

            if (match) {
                suggestion = match.toUpperCase();  // Asegurarse de que la sugerencia también esté en mayúsculas
            }
        }

        if (suggestion) {
            input.val(suggestion);
            input[0].setSelectionRange(value.length, suggestion.length);
        }
    });

    $(document).on("keydown", ".autocompleteEgresosPaul", function(e) {
        let input = $(this);
        let value = input.val().toUpperCase();
        let start = input[0].selectionStart;
        let end = input[0].selectionEnd;

        if (e.key === "Tab" || e.key === "Enter" || e.key === "ArrowRight") {
            let suggestion = "";

            if (value.length > 0) {
                let regex = new RegExp("^" + value, "i");
                let match = egresosPaulArreglo.find(function(word) {
                    return word.match(regex);
                });

                if (match) {
                    suggestion = match.toUpperCase();  // Asegurarse de que la sugerencia también esté en mayúsculas
                }
            }

            if (suggestion) {
                e.preventDefault();
                input.val(suggestion);
                input[0].setSelectionRange(suggestion.length, suggestion.length);
            }
        } else if (e.key === "Backspace") {
            if (start === end && end < value.length) {
                input.val(value.substring(0, start));
                input[0].setSelectionRange(start, start);
                e.preventDefault();
            } else {
                input.val(value.substring(0, start - 1) + value.substring(end));
                input[0].setSelectionRange(start - 1, start - 1);
                e.preventDefault();
            }
        }
    });

    let selectedIndex = -1;

    $('#inputNombreClientes2').on('input', function () {
        $('#codigoClienteSeleccionado2').val(0);
        $("#clienteSeleccionadoCorrecto2").removeClass("flex");
        $("#clienteSeleccionadoCorrecto2").addClass("hidden");
        const searchTerm = $(this).val().toLowerCase();
        const $filtrarClientes = $("#inputNombreClientes2").val();
        const filteredClientes = clientesArreglo.filter(cliente =>
            cliente.nombreCompleto.toLowerCase().includes(searchTerm)
        );
        if ($filtrarClientes.length > 0) {
            displayClientes2(filteredClientes);
            selectedIndex = -1; // Reset index when the input changes
        } else {
            const $contenedorDeClientes = $("#contenedorDeClientes2")
            $contenedorDeClientes.addClass('hidden');
        }
    });
    
    $('#inputNombreClientes2').on('keydown', function (event) {
        const $options = $('#contenedorDeClientes2 .option');
        if ($options.length > 0) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                selectedIndex = (selectedIndex + 1) % $options.length;
                updateSelection($options);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                selectedIndex = (selectedIndex - 1 + $options.length) % $options.length;
                updateSelection($options);
            } else if (event.key === 'Enter') {
                event.preventDefault();
                if (selectedIndex >= 0) {
                    $options.eq(selectedIndex).click();
                    $("#clienteSeleccionadoCorrecto2").removeClass("hidden");
                    $("#clienteSeleccionadoCorrecto2").addClass("flex");
                }
            }
        }
    });
    
    function displayClientes2(clientesArreglo) {
        const $contenedor = $('#contenedorDeClientes2');
        $contenedor.empty();
        if (clientesArreglo.length > 0) {
            $contenedor.removeClass('hidden');
            clientesArreglo.forEach(cliente => {
                const $div = $('<div class="text-gray-800 text-sm dark:text-white font-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:hover:bg-gray-700 hover:bg-gray-200"></div>')
                    .text(cliente.nombreCompleto)
                    .addClass('option p-2')
                    .on('click', function () {
                        selectCliente2(cliente);
                    });
                $contenedor.append($div);
            });
        } else {
            $contenedor.addClass('hidden');
        }
    }
    
    function selectCliente2(cliente) {
        $('#inputNombreClientes2').val(cliente.nombreCompleto);
        $('#codigoClienteSeleccionado2').val(cliente.codigoCli);
        fn_TraerDeudaTotal(cliente.codigoCli);
        $('#contenedorDeClientes2').addClass('hidden');
        $("#clienteSeleccionadoCorrecto2").removeClass("hidden");
        $("#clienteSeleccionadoCorrecto2").addClass("flex");
        selectedIndex = -1;
    }

    // Tercer filtro Nombre

    $('#inputNombreClientes3').on('input', function () {
        $('#codigoClienteSeleccionado3').val(0);
        $("#clienteSeleccionadoCorrecto3").removeClass("flex");
        $("#clienteSeleccionadoCorrecto3").addClass("hidden");
        const searchTerm = $(this).val().toLowerCase();
        const $filtrarClientes = $("#inputNombreClientes3").val();
        const filteredClientes = clientesArreglo.filter(cliente =>
            cliente.nombreCompleto.toLowerCase().includes(searchTerm)
        );
        if ($filtrarClientes.length > 0) {
            displayClientes3(filteredClientes);
            selectedIndex = -1; // Reset index when the input changes
        } else {
            const $contenedorDeClientes = $("#contenedorDeClientes3")
            $contenedorDeClientes.addClass('hidden');
        }
    });
    
    $('#inputNombreClientes3').on('keydown', function (event) {
        const $options = $('#contenedorDeClientes3 .option');
        if ($options.length > 0) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                selectedIndex = (selectedIndex + 1) % $options.length;
                updateSelection($options);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                selectedIndex = (selectedIndex - 1 + $options.length) % $options.length;
                updateSelection($options);
            } else if (event.key === 'Enter') {
                event.preventDefault();
                if (selectedIndex >= 0) {
                    $options.eq(selectedIndex).click();
                    $("#clienteSeleccionadoCorrecto3").removeClass("hidden");
                    $("#clienteSeleccionadoCorrecto3").addClass("flex");
                }
            }
        }
    });
    
    function displayClientes3(clientesArreglo) {
        const $contenedor = $('#contenedorDeClientes3');
        $contenedor.empty();
        if (clientesArreglo.length > 0) {
            $contenedor.removeClass('hidden');
            clientesArreglo.forEach(cliente => {
                const $div = $('<div class="text-gray-800 text-sm dark:text-white font-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:hover:bg-gray-700 hover:bg-gray-200"></div>')
                    .text(cliente.nombreCompleto)
                    .addClass('option p-2')
                    .on('click', function () {
                        selectCliente3(cliente);
                    });
                $contenedor.append($div);
            });
        } else {
            $contenedor.addClass('hidden');
        }
    }
    
    function selectCliente3(cliente) {
        $('#inputNombreClientes3').val(cliente.nombreCompleto);
        $('#codigoClienteSeleccionado3').val(cliente.codigoCli);
        $('#contenedorDeClientes3').addClass('hidden');
        $("#clienteSeleccionadoCorrecto3").removeClass("hidden");
        $("#clienteSeleccionadoCorrecto3").addClass("flex");
        selectedIndex = -1;
    }
    
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.relative').length) {
            $('#contenedorDeClientes2').addClass('hidden');
            $('#contenedorDeClientes3').addClass('hidden');
            selectedIndex = -1;
        }
    });

    $(document).on('dblclick', ".verDetalleEgreso", function (event) {
        let fecha = $(this).closest("tr").find("td:eq(0)").text();
        let categoria = $(this).closest("tr").find("td:eq(5)").text();
        $("#guardaCategoria").val(categoria);
        $("#guardaFecha").val(fecha);
        fn_TraerModalDetallesEgresos(fecha, categoria);
    });

    $('.cerrarModalEgresosModal, #ModalEgresosModal .opacity-75').on('click', function (e) {
        $('#ModalEgresosModal').addClass('hidden');
        $('#ModalEgresosModal').removeClass('flex');
    });

    function contarFilas() {
        let agregarFilasPeladores = $('.agregarFilasPeladores').length;
        let agregarFilasEstibadores = $('.agregarFilasEstibadores').length;
    
        if (agregarFilasPeladores > agregarFilasEstibadores) {
    
            let diferencia = agregarFilasPeladores - agregarFilasEstibadores;
            let nuevasFilas = "";
    
            for (var i = 0; i < diferencia; i++) {
                let nuevaFila = `
                    <tr class="agregarFilasEstibadores bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-wrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">&nbsp;</td>
                    </tr>
                `;
                nuevasFilas += nuevaFila;
            }
    
            // Agregar las nuevas filas al final de la tabla que contiene contarFilaPagos
            $('.agregarFilasEstibadores:last').after(nuevasFilas);
    
        } else if (agregarFilasPeladores < agregarFilasEstibadores){
            // console.log("contarFilaPagos tiene más filas o son iguales");

            let diferencia = agregarFilasEstibadores - agregarFilasPeladores;
            let nuevasFilas = "";
    
            for (var i = 0; i < diferencia; i++) {
                let nuevaFila = `
                    <tr class="agregarFilasPeladores bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-wrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">&nbsp;</td>
                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">&nbsp;</td>
                    </tr>
                `;
                nuevasFilas += nuevaFila;
            }
    
            // Agregar las nuevas filas al final de la tabla que contiene filasagregarFilasPeladores
            $('.agregarFilasPeladores:last').after(nuevasFilas);
        }
    }

    function fn_TraerModalDetallesEgresos(fecha,categoria) {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerModalDetallesEgresos',
            method: 'GET',
            data:{
                fecha : fecha,
                categoria : categoria,
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    
                    let contenedorCategoriasEgresos = $('#bodyCategoriaModal');
                    contenedorCategoriasEgresos.empty();
                    let contenedorCategoriasEgresos2 = $('#bodyCategoriaPLANILLAPELADOR');
                    contenedorCategoriasEgresos2.empty();
                    let contenedorCategoriasEgresos3 = $('#bodyCategoriaPLANILLAESTIBADOR');
                    contenedorCategoriasEgresos3.empty();
                    $('.divTablasPlanillaDivs').remove();
                    
                    if(categoria != 7){
                        $('#divOcultarEgresoPlanilla').hide();
                        $('#divOcultarEgresosOtros').show();
                        
                        let cantidadModal = 0;
                        let montoModal = 0;

                        let nombreCategoria = "";
                        let idCategoria = 0;

                        // Iterar sobre los objetos y mostrar sus propiedades
                        response.forEach(function (obj) {
                            cantidadModal += parseInt(obj.cantidad_detalles === null ? 0 : obj.cantidad_detalles);
                            montoModal += parseFloat(obj.monto_detalle);
                            nombreCategoria = obj.nombre_category;
                            idCategoria = obj.id_category;

                            // Crear una nueva fila
                            let nuevaFila = `
                                <tr class="eliminarDetalleEgreso bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                                    <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.id_detalle}</td>
                                    <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.fecha_detalle}</td>
                                    <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.hora_detalle}</td>
                                    <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.uso_detalle_egreso}</td>
                                    <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.cantidad_detalles === null ? "" : obj.cantidad_detalles}</td>
                                    <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.precio_detalle}</td>
                                    <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.monto_detalle}</td>
                                    <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.observacion === null ? "" : obj.observacion}</td>
                                    <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.id_category}</td>
                                </tr>
                            `;
                            
                            // Agregar la nueva tabla al tbody
                            contenedorCategoriasEgresos.append(nuevaFila);
                        });

                        if(idCategoria == 0 ){
                            $("#captionEgresosModal").html('Egresos sin Clasificar');
                            $("#captionEgresosModal, #headerEgresosModal").removeClass('bg-blue-600');
                            $("#captionEgresosModal, #headerEgresosModal").addClass('bg-red-600');
                        }else{
                            $("#captionEgresosModal").html(`${nombreCategoria}`);
                            $("#captionEgresosModal, #headerEgresosModal").removeClass('bg-red-600');
                            $("#captionEgresosModal, #headerEgresosModal").addClass('bg-blue-600');
                        }

                        let nuevaFila = `
                            <tr class="bg-blue-600 border-b dark:border-gray-700 dark:text-white cursor-pointer font-bold">
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">Total</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${cantidadModal}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${montoModal.toFixed(2)}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden"></td>
                            </tr>
                        `;
                        
                        // Agregar la nueva tabla al tbody
                        contenedorCategoriasEgresos.append(nuevaFila);
                        $('#ModalEgresosModal').addClass('flex');
                        $('#ModalEgresosModal').removeClass('hidden');
                    }else{
                        $('#divOcultarEgresoPlanilla').show();
                        $('#divOcultarEgresosOtros').hide();

                        let peladores = 0;
                        let estibadores = 0;

                        let totalPeladores = 0;
                        let totalEstibadores = 0;
                        
                        response.forEach(function (obj) {
                            if(obj.campoExtra == "PELADOR"){
                                let mostrarCargo = obj.campoExtra === null ? "" : obj.campoExtra;
                                peladores++;
                                totalPeladores += parseFloat(obj.monto_detalle);
                                // Crear una nueva fila
                                let nuevaFila = `
                                    <tr class="eliminarDetalleEgreso agregarFilasPeladores bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.id_detalle}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.fecha_detalle}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.hora_detalle}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.uso_detalle_egreso}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-wrap">${mostrarCargo}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden"></td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.monto_detalle}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.observacion === null ? "" : obj.observacion}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.id_category}</td>
                                    </tr>
                                `;
            
                                // Agregar la nueva fila al tbody correspondiente
                                let contenedorCategoriasEgresos = $(`#bodyCategoriaPLANILLAPELADOR`);
                                contenedorCategoriasEgresos.append(nuevaFila);
                            }else if (obj.campoExtra == "ESTIBADOR"){
                                let mostrarCargo = obj.campoExtra === null ? "" : obj.campoExtra;
                                estibadores++;
                                totalEstibadores += parseFloat(obj.monto_detalle);
                                // Crear una nueva fila
                                let nuevaFila = `
                                    <tr class="eliminarDetalleEgreso agregarFilasEstibadores bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.id_detalle}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.fecha_detalle}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.hora_detalle}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.uso_detalle_egreso}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-wrap">${mostrarCargo}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden"></td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.monto_detalle}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.observacion === null ? "" : obj.observacion}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.id_category}</td>
                                    </tr>
                                `;
            
                                // Agregar la nueva fila al tbody correspondiente
                                let contenedorCategoriasEgresos = $(`#bodyCategoriaPLANILLAESTIBADOR`);
                                contenedorCategoriasEgresos.append(nuevaFila);
                            }
                        });

                        contarFilas();

                        let filaTotales = `
                            <tr class="bg-blue-600 text-white font-bold">
                                <td colspan="3" class="border-r dark:border-gray-700 p-2 text-center">Total</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">PELADORES : ${peladores}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center hidden"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center">${totalPeladores.toFixed(2)}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center hidden"></td>
                            </tr>
                        `;
    
                        let contenedorTotales = $(`#bodyCategoriaPLANILLAPELADOR`);
                        contenedorTotales.append(filaTotales);
                        
                        let filaTotales2 = `
                            <tr class="bg-blue-600 text-white font-bold">
                                <td colspan="3" class="border-r dark:border-gray-700 p-2 text-center">Total</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">ESTIBADORES : ${estibadores}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center hidden"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center">${totalEstibadores.toFixed(2)}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center hidden"></td>
                            </tr>
                        `;
    
                        let contenedorTotales2 = $(`#bodyCategoriaPLANILLAESTIBADOR`);
                        contenedorTotales2.append(filaTotales2);

                        let totalCantidadPlanilla = parseInt(peladores) + parseInt(estibadores);
                        let totalAPagarPlanilla = parseFloat(totalPeladores) + parseFloat(totalEstibadores);

                        let nuevaFilaDivTablasPlanilla = `
                        <div class="bg-blue-600 w-full divTablasPlanillaDivs border-t-2 text-sm font-bold text-gray-100 text-center flex divide-x divide-gray-200 items-center gap-4">
                            <div class="flex-1 p-2">Total de Trabajadores</div>
                            <div class="flex-1 p-2">${totalCantidadPlanilla}</div>
                            <div class="flex-1 p-2">S/ ${totalAPagarPlanilla.toFixed(2)}</div>
                        </div>`

                        let divTablasPlanilla = $('#divTablasPlanilla');
                        divTablasPlanilla.append(nuevaFilaDivTablasPlanilla);

                        $('#ModalEgresosModal').addClass('flex');
                        $('#ModalEgresosModal').removeClass('hidden');
                    }

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });

    };

    function fn_declararCategorias(){
        $.ajax({
            url: '/fn_consulta_TraerTablasCategoriasEgresos',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacionEditar = $('#selectAgregarCategoriaEditar2');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacionEditar.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectPresentacionEditar.append($('<option>', {
                        value: '0',
                        text: 'Sin clasificar',
                        selected: true
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades

                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.id_category,
                            text: obj.nombre_category
                        });
                        selectPresentacionEditar.append(option);
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

    $(document).on('contextmenu', '.eliminarDetalleEgreso', function (e) {
        e.preventDefault();
        let idDetalleEgreso = $(this).closest("tr").find("td:first").text();
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
            fn_EliminarEgreso(idDetalleEgreso);
            }
        })
    });

    function fn_EliminarEgreso(idDetalleEgreso){
        $.ajax({
            url: '/fn_consulta_EliminarDetalleEgreso',
            method: 'GET',
            data: {
                idDetalleEgreso: idDetalleEgreso,
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
                    let categoria = $("#guardaCategoria").val();
                    let fecha = $("#guardaFecha").val();

                    fn_TraerModalDetallesEgresos(fecha,categoria)
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

    $('.cerrarModalAgregarEgresoEditar2, #ModalAgregarEgresoEditar2 .opacity-75').on('click', function (e) {
        $('#ModalAgregarEgresoEditar2').addClass('hidden');
        $('#ModalAgregarEgresoEditar2').removeClass('flex');
    });

    $(document).on("dblclick", ".eliminarDetalleEgreso", function() {      
        $('#ModalAgregarEgresoEditar2').addClass('flex');
        $('#ModalAgregarEgresoEditar2').removeClass('hidden');
        let categoria = $(this).closest("tr").find("td:eq(8)").text();
        console.log("categoria", categoria);
        if(categoria != 7){
            let idDetalleEgreso = $(this).closest("tr").find("td:eq(0)").text();
            let fecha = $(this).closest("tr").find("td:eq(1)").text();
            let hora = $(this).closest("tr").find("td:eq(2)").text();
            let usoEgreso = $(this).closest("tr").find("td:eq(3)").text();
            let cantidad = $(this).closest("tr").find("td:eq(4)").text();
            let precio = $(this).closest("tr").find("td:eq(5)").text();
            let monto = $(this).closest("tr").find("td:eq(6)").text();
            let observacion = $(this).closest("tr").find("td:eq(7)").text();

            $("#fechaAgregarEgresoEditar2").val(fecha);
            $("#horaAgregarEgresoEditar2").val(hora);
            $("#usoAgregarEgresoEditar2").val(usoEgreso);
            $("#cantidadAgregarEgresoEditar2").val(cantidad);
            $("#precioAgregarEgresoEditar2").val(precio);
            $("#montoAgregarEgresoEditar2").val(monto);
            $("#comentarioAgregarEgresoEditar2").val(observacion);
            $("#selectAgregarCategoriaEditar2").val(categoria);
            $("#idDetalleEgreso").val(idDetalleEgreso);
            $("#ocultarSiPlanilla").show();
            $("#mostrarSiPlanilla").hide();
            $("#montoAgregarEgresoEditar2").attr('disabled','disabled');
        }else{
            console.log("Ingreso")
            let idDetalleEgreso = $(this).closest("tr").find("td:eq(0)").text();
            let fecha = $(this).closest("tr").find("td:eq(1)").text();
            let hora = $(this).closest("tr").find("td:eq(2)").text();
            let usoEgreso = $(this).closest("tr").find("td:eq(3)").text();
            let cantidad = $(this).closest("tr").find("td:eq(4)").text();
            let monto = $(this).closest("tr").find("td:eq(6)").text();
            let observacion = $(this).closest("tr").find("td:eq(7)").text();

            $("#fechaAgregarEgresoEditar2").val(fecha);
            $("#horaAgregarEgresoEditar2").val(hora);
            $("#usoAgregarEgresoEditar2").val(usoEgreso);
            $("#montoAgregarEgresoEditar2").val(monto);
            $("#selectEditarEgresoPlanilla2").val(cantidad);
            $("#cantidadAgregarEgresoEditar2").val("");
            $("#precioAgregarEgresoEditar2").val(0);
            $("#comentarioAgregarEgresoEditar2").val(observacion);
            $("#selectAgregarCategoriaEditar2").val(categoria);
            $("#idDetalleEgreso").val(idDetalleEgreso);
            $("#ocultarSiPlanilla").hide();
            $("#mostrarSiPlanilla").show();
            $("#montoAgregarEgresoEditar2").removeAttr('disabled');
        }
        
    });

    $(document).on("click", "#btnAgregarEgresoEditar2", function() {
        let fechaDetalle = $('#fechaAgregarEgresoEditar2').val();
        let horaDetalle = $('#horaAgregarEgresoEditar2').val();
        let usoEgreso = $('#usoAgregarEgresoEditar2').val();
        let cantidadDetalle = $('#cantidadAgregarEgresoEditar2').val();
        let precioDetalle = $('#precioAgregarEgresoEditar2').val();
        let montoDetalle = $('#montoAgregarEgresoEditar2').val();
        let observacionDetalle = $('#comentarioAgregarEgresoEditar2').val();
        let categoriaDetalle = $('#selectAgregarCategoriaEditar2').val();
        let idDetalleEgreso = $('#idDetalleEgreso').val();
        let selectEditarEgresoPlanilla = $('#selectEditarEgresoPlanilla2').val();

        if (usoEgreso.trim() == ""){
            alertify.notify('Debe ingresar uso de egreso y seleccionar categoria', 'error', 3);
            return;
        }else if(montoDetalle.trim() == ""){
            alertify.notify('Debe ingresar precio y cantidad(opcional)', 'error', 3);
            return;
        }else{
            fn_AgregarDetalleEgresoEditar(fechaDetalle, horaDetalle, usoEgreso, cantidadDetalle, precioDetalle, montoDetalle, observacionDetalle, categoriaDetalle, idDetalleEgreso, selectEditarEgresoPlanilla);
        }
    });

    function fn_AgregarDetalleEgresoEditar(fechaDetalle, horaDetalle, usoEgreso, cantidadDetalle, precioDetalle, montoDetalle, observacionDetalle, categoriaDetalle, idDetalleEgreso, selectEditarEgresoPlanilla) {
        $.ajax({
            url: '/fn_consulta_AgregarDetalleEgresoEditar',
            method: 'GET',
            data: {
                fechaDetalle: fechaDetalle,
                horaDetalle: horaDetalle,
                usoEgreso: usoEgreso,
                cantidadDetalle: cantidadDetalle,
                precioDetalle: precioDetalle,
                montoDetalle: montoDetalle,
                observacionDetalle: observacionDetalle,
                categoriaDetalle: categoriaDetalle,
                idDetalleEgreso: idDetalleEgreso,
                selectEditarEgresoPlanilla: selectEditarEgresoPlanilla,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se edito el egreso correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#ModalAgregarEgresoEditar2').addClass('hidden');
                    $('#ModalAgregarEgresoEditar2').removeClass('flex');
                    let categoria = $("#guardaCategoria").val();
                    let fecha = $("#guardaFecha").val();

                    fn_TraerModalDetallesEgresos(fecha,categoria)
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
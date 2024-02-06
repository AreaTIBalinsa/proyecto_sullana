import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeCajaChica').val(fechaHoy);
    $('#fechaHastaCajaChica').val(fechaHoy);
    $('#fechaAgregarEgreso').val(fechaHoy);
    fn_TraerPagosFechas(fechaHoy, fechaHoy);

    var currentTime = '00:00:00'

    obtenerHora();
    function obtenerHora(){

        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var seconds = now.getSeconds().toString().padStart(2, '0');
        
        currentTime = hours + ":" + minutes + ":" + seconds;
    }
    
    $('#horaAgregarPago').val(currentTime);

    $('#filtrarIngresosYEgresos').on('click', function () {
        let fechaDesdeTraerPagos = $('#fechaDesdeCajaChica').val();
        let fechaHastaTraerPagos = $('#fechaHastaCajaChica').val();
        fn_TraerPagosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
        fn_TraerEgresosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
    });

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
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.fechaRegistroPag));
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

    $('#filtrarCodigoPago').on('input', function() {
        let codigoFiltrar = $('#filtrarCodigoPago').val().toUpperCase(); ; // Obtiene el valor del campo de filtro

        // Mostrar todas las filas
        $('#tablaIngresos tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (codigoFiltrar) {
            $('#tablaIngresos tbody tr').each(function() {
                let codigo = $(this).find('td:eq(5)').text().toUpperCase().trim();
                if (codigo.indexOf(codigoFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    });

    $('.cerrarModalAgregarPagoClienteEditar, #ModalAgregarPagoClienteEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarPagoClienteEditar').addClass('hidden');
        $('#ModalAgregarPagoClienteEditar').removeClass('flex');
    });

    $('.cerrarModalAgregarPagoCliente, #ModalAgregarPagoCliente .opacity-75').on('click', function (e) {
        $('#ModalAgregarPagoCliente').addClass('hidden');
        $('#ModalAgregarPagoCliente').removeClass('flex');
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
        obtenerHora();
        $('#horaAgregarPago').val(currentTime);
        $('#formaDePago').val($('#formaDePago option:first').val());
        $('#divCodTrans').removeClass('flex').addClass('hidden');
        $('#divBanco').removeClass('flex').addClass('hidden');
    });

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
                    $('#filtrarIngresosYEgresos').trigger('click');
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
                    $('#filtrarIngresosYEgresos').trigger('click');
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

    $('#registrar_Egreso_submit').on('click', function () {
        $('#ModalAgregarEgreso').addClass('flex');
        $('#ModalAgregarEgreso').removeClass('hidden');
        $('#idAgregarEgreso').focus();

        $('#idAgregarEgreso').val('');
        $('#valorAgregarEgresoCliente').val('');
        $('#comentarioAgregarEgresoCliente').val('');
        $('#bancoAgregarEgresoCliente').val('');
        $('#codAgregarEgresoCliente').val('');
        $('#fechaAgregarEgreso').val(fechaHoy);
        $('#formaDePagoEgreso').val($('#formaDePago option:first').val());
        $('#divCodTransEgreso').removeClass('flex').addClass('hidden');
        $('#divBancoEgreso').removeClass('flex').addClass('hidden');
    });

    $('.cerrarModalAgregarEgreso, #ModalAgregarEgreso .opacity-75').on('click', function (e) {
        $('#ModalAgregarEgreso').addClass('hidden');
        $('#ModalAgregarEgreso').removeClass('flex');
    });

    $('#formaDePagoEgreso').on('change',function() {
        var selectedOption = $(this).val();
        if (selectedOption === 'Transferencia') {
            // Si se selecciona "Transferencia", muestra el div con id "codTrans"
            $('#divCodTransEgreso').removeClass('hidden').addClass('flex');
            $('#divBancoEgreso').removeClass('hidden').addClass('flex');
        } else {
            // Si se selecciona cualquier otra opción, oculta el div "codTrans"
            $('#divCodTransEgreso').removeClass('flex').addClass('hidden');
            $('#divBancoEgreso').removeClass('flex').addClass('hidden');
        }
    });

    $('#btnAgregarEgreso').on('click', function () {
        let montoAgregEgresoCliente = $('#valorAgregarEgresoCliente').val();
        let fechaAgregEgresoCliente = $('#fechaAgregarEgreso').val();
        let formaDePagoEgreso = $('#formaDePagoEgreso').val();
        let bancoAgregEgresoCliente = $('#bancoAgregarEgresoCliente').val();
        let codAgregEgresoCliente = $('#codAgregarEgresoCliente').val();
        let usoReporteEgreso = $('#idAgregarEgreso').val();

        let todosCamposCompletos = true;

        $('#divAgregarEgreso .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        if (todosCamposCompletos) {
            let valorCampo = parseFloat($('#valorAgregarEgresoCliente').val());
            if (valorCampo > 0){
                //console.log(montoAgregEgresoCliente,fechaAgregEgresoCliente,formaDePagoEgreso,bancoAgregEgresoCliente,codAgregEgresoCliente,usoReporteEgreso);
                fn_AgregarEgreso(montoAgregEgresoCliente,fechaAgregEgresoCliente,formaDePagoEgreso,bancoAgregEgresoCliente,codAgregEgresoCliente,usoReporteEgreso);
            }else{
                alertify.notify('El monto no puede ser 0', 'error', 3);
                $('#valorAgregarEgresoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
            }
        } else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
        }
    });

    function fn_AgregarEgreso(montoAgregEgresoCliente,fechaAgregEgresoCliente,formaDePagoEgreso,bancoAgregEgresoCliente,codAgregEgresoCliente,usoReporteEgreso){
        $.ajax({
            url: '/fn_consulta_AgregarEgreso',
            method: 'GET',
            data:{
                montoAgregEgresoCliente: montoAgregEgresoCliente,
                fechaAgregEgresoCliente: fechaAgregEgresoCliente,
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

                    $('#ModalAgregarEgreso').addClass('hidden');
                    $('#ModalAgregarEgreso').removeClass('flex');
                    $('#filtrarIngresosYEgresos').trigger('click');
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }   

    fn_TraerEgresosFechas(fechaHoy, fechaHoy);
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
                let tbodyReporteDePagos = $('#bodyReporteDeEgresos');
                tbodyReporteDePagos.empty();

                let totalPago = 0;
                let nuevaFila = "";

                // Iterar sobre los objetos y mostrar sus propiedades
                response.forEach(function(obj) {
                    // Crear una nueva fila
                    nuevaFila = $('<tr class="bg-white editarPagos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                    totalPago += parseFloat(obj.cantidadAbonoEgreso);
                    // Agregar las celdas con la información
                    nuevaFila.append($('<td class="hidden">').text(obj.idEgresos));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text(obj.nombreEgresoCamal)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(parseFloat(obj.cantidadAbonoEgreso).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.tipoAbonoEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.bancoEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.codigoTransferenciaEgreso));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer">').text(obj.fechaOperacionEgreso));
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
                    // Agregar la nueva fila al tbody
                    tbodyReporteDePagos.append(nuevaFila);
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

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
                    $('#filtrarIngresosYEgresos').trigger('click');
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
    
    $(document).on('contextmenu', '#bodyReporteDeEgresos tr.editarPagos', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
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
        }
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
                    $('#filtrarIngresosYEgresos').trigger('click');
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
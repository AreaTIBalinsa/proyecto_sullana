import jQuery from 'jquery';
window.$ = jQuery;
import 'flowbite';

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    const fechaHoyTabla = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteDeIngresosBancos').val(fechaHoy);
    $('#fechaHastaReporteDeIngresosBancos').val(fechaHoy);

    fn_TraerPagosFechasIngresoBancos(fechaHoy,fechaHoy);
    fn_TraerPagosDirectoGranjaFechasBanco(fechaHoy,fechaHoy);

    $('#filtrar_reporte_ingresos_submit').on('click', function () {
        let fechaDesdeTraerIngresosBancos = $('#fechaDesdeReporteDeIngresosBancos').val();
        let fechaHastaTraerIngresosBancos = $('#fechaHastaReporteDeIngresosBancos').val();
        let codigoCliente = $('#selectedCodigoCliCuentaDelCliente').attr("value");
        
        let obtenerNombreCompleto = $('#inputNombreClientes').val();
        let importePago = $('#filtrarImportePagoIngreso').val();
        let codigoPago = $('#filtrarCodigoPagoIngreso').val();

        fn_TraerPagosFechasIngresoBancos(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos, importePago, codigoPago, obtenerNombreCompleto);
        fn_TraerPagosDirectoGranjaFechasBanco(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos, importePago, codigoPago, obtenerNombreCompleto);
        
    });

    $('#ingresar_pagos_reportes').on('click', function(){
        $('#contenedordeReportedePagos').toggle('flex hidden');
        if ($('#abrirModalPagos').text() === 'REGISTRAR PAGOS') {
            $('#abrirModalPagos').text('OCULTAR PAGOS');
        } else if ($('#abrirModalPagos').text() === 'OCULTAR PAGOS') {
            $('#abrirModalPagos').text('REGISTRAR PAGOS');
        }
    });

    $('#filtrarBancoPagos').on('change', function() {
        let filtrarBancoPagos = $('#filtrarBancoPagos').val();

        // Mostrar todas las filas
        $('#tableReporteIngresosBancos tbody tr').show();
        $('#tableReporteIngresosGranja tbody tr').show();
        $('#reporteIngresosCajaChica').show();
        $('#reporteIngresosPaul').show();

        function limpiarNombreBanco(nombre) {
            // Expresiones regulares para detectar variantes y limpiar el nombre
            const regexBCP = /^BCP/;
            const regexBBVA = /^BBVA/;
            const regexIBK = /^IBK/;
            const regexCajaPiura = /^CAJA PIURA/;
            const regexCMAC = /^CMAC/;
            const regexYAPE = /^YAPE/;
        
            if (regexBCP.test(nombre)) {
                return "BCP";
            } else if (regexBBVA.test(nombre)) {
                return "BBVA";
            } else if (regexIBK.test(nombre)) {
                return "IBK";
            } else if (regexCajaPiura.test(nombre)) {
                return "CAJA PIURA";
            } else if (regexCMAC.test(nombre)) {
                return "CMAC";
            } else if (regexYAPE.test(nombre)) {
                return "YAPE";
            } else {
                return nombre; // Devuelve el nombre original si no coincide con ninguna variante
            }
        }

        if(filtrarBancoPagos  != 0){
            // Filtrar por tipo de banco si se selecciona un valor en el select
            if (filtrarBancoPagos !== "") {
                $('#tableReporteIngresosBancos tbody tr.filtroPagos1').each(function() {
                    let columna = $(this).find('td:eq(6)').text().trim();
                    columna = limpiarNombreBanco(columna);
                    if (columna !== filtrarBancoPagos) {
                        $(this).hide();
                    }
                });
                $('#tableReporteIngresosBancos tbody tr.filtroPagos2').each(function() {
                    let columna = $(this).find('td:eq(6)').text().trim();
                    columna = limpiarNombreBanco(columna);
                    if (columna !== filtrarBancoPagos) {
                        $(this).hide();
                    }
                });
                $('#tableReporteIngresosBancos tbody tr.filtroPagos3').each(function() {
                    let columna = $(this).find('td:eq(6)').text().trim();
                    columna = limpiarNombreBanco(columna);
                    if (columna !== filtrarBancoPagos) {
                        $(this).hide();
                    }
                });
    
                $('#tableReporteIngresosGranja tbody tr.editarPagos').each(function() {
                    let columna = $(this).find('td:eq(6)').text().trim();
                    columna = limpiarNombreBanco(columna);
                    if (columna !== filtrarBancoPagos) {
                        $(this).hide();
                    }
                });
    
                $('#bodyReporteDePagosIngresosBancos tr:last').show();
                // Mostrar la penúltima fila independientemente del filtro
                $('#bodyReporteDePagosIngresosBancos tr:eq(-2)').show();
                
                $('#tableReporteIngresosGranja tr:last').show();
                // Mostrar la penúltima fila independientemente del filtro
                $('#tableReporteIngresosGranja tr:eq(-2)').show();
                updateTotal();

                let contador2 = 0

                $('#tableReporteIngresosBancos tbody tr.filtroPagos2:visible').each(function () {
                    contador2++;
                });

                if(contador2 <= 0){
                    $('#reporteIngresosCajaChica').hide();
                }

                let contador3 = 0

                $('#tableReporteIngresosBancos tbody tr.filtroPagos3:visible').each(function () {
                    contador3++;
                });

                if(contador3 <= 0){
                    $('#reporteIngresosPaul').hide();
                }
            }
        }else{
            updateTotal();
        }
    });

    function updateTotal() {

        let totalBancos = 0;
        let totalGranja = 0;

        // Sumar los montos de las filas visibles
        $('#bodyReporteDePagosIngresosBancos tr.editarPagos:visible').each(function () {
            let montoBancos = parseFloat($(this).find('td:eq(3)').text());
            totalBancos += isNaN(montoBancos) ? 0 : montoBancos;
        });

        $('#tableReporteIngresosGranja tr.editarPagos:visible').each(function () {
            let montoGranja = parseFloat($(this).find('td:eq(3)').text());
            totalGranja += isNaN(montoGranja) ? 0 : montoGranja;
        });

        $('#bodyReporteDePagosIngresosBancos tr:last td:eq(2)').text(parseFloat(totalBancos).toFixed(2));
        $('#tableReporteIngresosGranja tr:last td:eq(2)').text(parseFloat(totalGranja).toFixed(2));
    
    };

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

    function fn_TraerPagosFechasIngresoBancos(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos, importePago, codigoPago, obtenerNombreCompleto) {
        $.ajax({
            url: '/fn_consulta_TraerPagosFechasReporteIngresos',
            method: 'GET',
            data: {
                fechaDesdeTraerIngresosBancos: fechaDesdeTraerIngresosBancos,
                fechaHastaTraerIngresosBancos: fechaHastaTraerIngresosBancos,
                importePago: importePago,
                codigoPago: codigoPago,
                obtenerNombreCompleto: obtenerNombreCompleto
            },
            success: function(response) {
                // console.log(response)
                if (Array.isArray(response)) {
                    let tbodyReporteDePagosIngresosBancos = $('#bodyReporteDePagosIngresosBancos');
                    tbodyReporteDePagosIngresosBancos.empty();
    
                    let totalPago = 0;
                    let nuevaFila = "";
    
                    response.forEach(function(obj) {
                        if(obj.clasificacionPago == 1){
                            let nuevaFila;
                            if (obj.nombreCompleto == "") {
                                nuevaFila = $('<tr class="bg-red-600 editarPagos filtroPagos2 border-b dark:border-gray-700 cursor-pointer text-white">');
                            }else if ((obj.nombreCompleto).trim() == "PAUL"){
                                nuevaFila = $('<tr class="bg-orange-500 editarPagos filtroPagos2 border-b dark:border-gray-700 cursor-pointer text-white">');
                            }else {
                                nuevaFila = $('<tr class="bg-white editarPagos filtroPagos2 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
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
                            tbodyReporteDePagosIngresosBancos.append(nuevaFila);
                        }
                    });

                    let encabezadoIngresoCaja = `<tr id="reporteIngresosCajaChica" class="bg-green-500 text-white">
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap" colspan="8">Ingresos Caja Chica</th>
                            </tr>`;

                    let verificarDatos = false;

                    response.forEach(function(obj) {
                        if(obj.clasificacionPago == 2){
                            if (!verificarDatos) {
                                tbodyReporteDePagosIngresosBancos.append(encabezadoIngresoCaja);
                                verificarDatos = true;
                            }

                            let nuevaFila;
                            nuevaFila = $('<tr class="bg-white editarPagos filtroPagos2 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                            totalPago += parseFloat(obj.cantidadAbonoPag);
                            nuevaFila.append($('<td class="hidden">').text(obj.idPagos));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionPag));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">').text((obj.nombreCompleto).trim() === "" ? obj.campoExtra : obj.nombreCompleto));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.codigoTransferenciaPag));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.horaOperacionPag));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.bancaPago));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.tipoAbonoPag));
                            nuevaFila.append($('<td class="p-2 text-center cursor-pointer">').text(obj.observacion));
                            tbodyReporteDePagosIngresosBancos.append(nuevaFila);
                        }
                    });

                    let encabezadoIngresosPaul = `<tr id="reporteIngresosPaul" class="bg-purple-600 text-white">
                                <th class="p-4 border-r-2 border-b-2 text-center whitespace-nowrap" colspan="8">Cobranzas de Paul Ingresos</th>
                            </tr>`;

                    let verificarDatosPaul = false;

                    response.forEach(function(obj) {
                        if (obj.clasificacionPago == 3) {
                            if (!verificarDatosPaul) {
                                tbodyReporteDePagosIngresosBancos.append(encabezadoIngresosPaul);
                                verificarDatosPaul = true;
                            }

                            let nuevaFila;
                            nuevaFila = $('<tr class="bg-white editarPagos filtroPagos3 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                            totalPago += parseFloat(obj.cantidadAbonoPag);
                            nuevaFila.append($('<td class="hidden">').text(obj.idPagos));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionPag));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreCompleto === "" ? "SALDO ANTERIOR" : obj.nombreCompleto));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap">').text(""));
                            nuevaFila.append($('<td class="p-2 text-center cursor-pointer">').text(""));
                            tbodyReporteDePagosIngresosBancos.append(nuevaFila);
                        }
                    });
    
                    if (response.length == 0) {
                        tbodyReporteDePagosIngresosBancos.html(`<tr class="rounded-lg border-2 border-r-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    } else {
                        agregarFilaEspaciadora(tbodyReporteDePagosIngresosBancos);
                        agregarFilaTotal(tbodyReporteDePagosIngresosBancos, totalPago);
                        // fn_crearCuadroResumenBancos();
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

    function fn_TraerPagosDirectoGranjaFechasBanco(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos, importePago, codigoPago, obtenerNombreCompleto) {
        $.ajax({
            url: '/fn_consulta_TraerPagosDirectoGranjaFechasBanco',
            method: 'GET',
            data:{
                fechaDesdeTraerIngresosBancos:fechaDesdeTraerIngresosBancos,
                fechaHastaTraerIngresosBancos:fechaHastaTraerIngresosBancos,
                importePago : importePago,
                codigoPago : codigoPago,
                obtenerNombreCompleto : obtenerNombreCompleto
            },
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let tbodyReporteDePagosDirectoGranjaIngresoGranja = $('#bodyReporteDePagosDirectoGranjaIngresoGranja');
                    tbodyReporteDePagosDirectoGranjaIngresoGranja.empty();

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
                        tbodyReporteDePagosDirectoGranjaIngresoGranja.append(nuevaFila);
                    });

                    if (response.length == 0) {
                        tbodyReporteDePagosDirectoGranjaIngresoGranja.html(`<tr class="rounded-lg border-2 border-l-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }else{
                        nuevaFila = $('<tr class="class="bg-white dark:bg-gray-800 h-0.5" cursor-pointer">');
                        nuevaFila.append($('<td class="text-center h-0.5 bg-gray-400 dark:bg-gray-300" colspan="8">').text(""));
                        tbodyReporteDePagosDirectoGranjaIngresoGranja.append(nuevaFila);

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
                        tbodyReporteDePagosDirectoGranjaIngresoGranja.append(nuevaFila);
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
    
    tablaEditableGranjaIngreso()
    function tablaEditableGranjaIngreso(){
        let tbodyReporteDePagosExcel4IngresoGranja = $('#bodyReporteDePagosExcel4IngresoGranja');
        tbodyReporteDePagosExcel4IngresoGranja.empty();
        agregarFilaEntradaGranja(tbodyReporteDePagosExcel4IngresoGranja);
        hacerCeldasEditables(tbodyReporteDePagosExcel4IngresoGranja);
    }

    function agregarFilaEntradaGranja(tbody) {
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel4 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`)); //fecha
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text("")); //nombre cliente
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text("")); //importe
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas" contenteditable="true">').text("")); //codigo
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text("")); //hora
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas" contenteditable="true">').text("")); //banco
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="false">').text("Transferencia")); // forma de pago
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer" contenteditable="true">').html(`<select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="YUGO">YUGO</option>
            <option value="TECNICA">TECNICA</option>
            </select>`));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">').text("5"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">').text("0"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer validarFormatoFechaTablas text-gray-900 dark:text-white fechaRegistroPago" contenteditable="true">').text(`${fechaHoyTabla}`));
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
                agregarFilaEntradaGranja(tbody);
                nuevaFila.off('input');
            }
        });
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

    $(document).on('click', '#registrar_agregarPagos_Excel_Ingreso_Banco', function () {

        $("#registrar_agregarPagos_Excel_Ingreso_Banco").attr('disabled','disabled');

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
            $("#registrar_agregarPagos_Excel_Ingreso_Banco").removeAttr('disabled');
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
                let fechaDesdeTraerIngresosBancos = $('#fechaDesdeReporteDeIngresosBancos').val();
                let fechaHastaTraerIngresosBancos = $('#fechaHastaReporteDeIngresosBancos').val();
                fn_TraerPagosDirectoGranjaFechasBanco(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos);
                $("#registrar_agregarPagos_Excel_Ingreso_Banco").removeAttr('disabled');
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
            let comentarioAgregarPagoCliente = filaActual.find('td:eq(7)').find('select').val().trim();
            let pagoDerivado = filaActual.find('td:eq(8)').text().trim();
            let codigoCliente = filaActual.find('td:eq(9)').text().trim();
            let fechaRegistroPagoCliente = filaActual.find('td:eq(10)').text().trim();
            fechaRegistroPagoCliente = fechaRegistroPagoCliente.split('-').reverse().join('-');

            formaDePago = formaDePago[0].toUpperCase() + formaDePago.slice(1);

            if (!montoAgregarPagoCliente) {
                alertify.notify('El campo importe no puede estar vacio', 'error', 3);
                failedRequests++;
            } else {
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
                fechaRegistroPagoCliente: fechaRegistroPagoCliente,
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
    
    $(document).on('input', '.bancoCopiar', function () {
        copiarDatosPenultimaFila();
    });

    $(document).on('input', '.fechaRegistroPago', function () {
        // Obtener el valor del input actual
        let valor = $(this).text().trim();
        
        // Actualizar todas las celdas con la clase 'fechaRegistroPago' excepto la actual
        $('.fechaRegistroPago').not(this).each(function () {
            $(this).text(valor);
        });
    });    

    $(document).on('click', function (event) {
        let contenedorClientes = $('#contenedorClientesCuentaDelCliente');
        let inputCuentaDelCliente = $('#idCuentaDelCliente');

        if (!contenedorClientes.is(event.target) && contenedorClientes.has(event.target).length === 0 && !inputCuentaDelCliente.is(event.target)) {
            contenedorClientes.addClass('hidden');
        }
    });

    $('#contenedorClientesCuentaDelCliente, #idCuentaDelCliente').on('click', function (event) {
        event.stopPropagation();
    });

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

    // Editar Pagos

    $('.cerrarModalAgregarPagoClienteEditar, #ModalAgregarPagoClienteEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarPagoClienteEditar').addClass('hidden');
        $('#ModalAgregarPagoClienteEditar').removeClass('flex');
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
                    $('#filtrar_reporte_ingresos_submit').trigger('click');
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

    // Eliminar Pagos

    $(document).on('contextmenu', 'tr.editarPagos', function (e) {
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
                    $('#filtrar_reporte_ingresos_submit').trigger('click');
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

    tablaEditable()
    function tablaEditable(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePagosExcel');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntrada(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntrada(tbody) {
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">');
        nuevaFila.append($('<td class="outline-none border-l-2 border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas bancoCopiar" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="false">').text("Transferencia"));
        nuevaFila.append($('<td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">').text("1"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">').text("0"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer validarFormatoFechaTablas text-gray-900 dark:text-white fechaRegistroPago" contenteditable="true">').text(`${fechaHoyTabla}`));
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
                    } else {
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
                copiarDatosPenultimaFila();
                nuevaFila.off('input');
            }
        });
    }
    
    function copiarDatosPenultimaFila() {
        let filas = $('.pagosAgregarExcel');
        if (filas.length > 1) {
            let penultimaFila = filas.eq(filas.length - 2);
            let ultimaFila = filas.eq(filas.length - 1);
            let datosColumna0 = penultimaFila.find('td').eq(0).text();
            let datosColumna5 = penultimaFila.find('td').eq(5).text();
            let datosColumna10 = penultimaFila.find('td').eq(10).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
            ultimaFila.find('td').eq(5).text(datosColumna5);
            ultimaFila.find('td').eq(10).text(datosColumna10);
        }
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
                let fechaDesdeTraerIngresosBancos = $('#fechaDesdeReporteDeIngresosBancos').val();
                let fechaHastaTraerIngresosBancos = $('#fechaHastaReporteDeIngresosBancos').val();
                fn_TraerPagosFechasIngresoBancos(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos);
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
                let fechaDesdeTraerIngresosBancos = $('#fechaDesdeReporteDeIngresosBancos').val();
                let fechaHastaTraerIngresosBancos = $('#fechaHastaReporteDeIngresosBancos').val();
                fn_TraerPagosFechasIngresoBancos(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos);
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
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel2 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">');
        nuevaFila.append($('<td class="outline-none border-l-2 border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`)); //fecha
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text(currentTime)); //hora
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text("")); //nombre
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="false">').text("Efectivo")); //forma
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text("")); //importe
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="false">').text("")); //codigo
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="false">').text("")); //banco
        nuevaFila.append($('<td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">').text("2"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">').text("0"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer validarFormatoFechaTablas text-gray-900 dark:text-white fechaRegistroPago" contenteditable="true">').text(`${fechaHoyTabla}`));
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
                let fechaDesdeTraerIngresosBancos = $('#fechaDesdeReporteDeIngresosBancos').val();
                let fechaHastaTraerIngresosBancos = $('#fechaHastaReporteDeIngresosBancos').val();
                fn_TraerPagosFechasIngresoBancos(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos);
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
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel3 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">');
        nuevaFila.append($('<td class="outline-none border-l-2 border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden" contenteditable="false">').text("Efectivo"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">').text(""));
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

    let selectedIndex = -1;

    $('#inputNombreClientes').on('input', function () {
        $('#codigoClienteSeleccionado').val(0);
        $("#clienteSeleccionadoCorrecto").removeClass("flex");
        $("#clienteSeleccionadoCorrecto").addClass("hidden");
        const searchTerm = $(this).val().toLowerCase();
        const $filtrarClientes = $("#inputNombreClientes").val();
        const filteredClientes = clientesArreglo.filter(cliente =>
            cliente.nombreCompleto.toLowerCase().includes(searchTerm)
        );
        if ($filtrarClientes.length > 0) {
            displayClientes(filteredClientes);
            selectedIndex = -1; // Reset index when the input changes
        } else {
            const $contenedorDeClientes = $("#contenedorDeClientes")
            $contenedorDeClientes.addClass('hidden');
        }
    });
    
    $('#inputNombreClientes').on('keydown', function (event) {
        const $options = $('#contenedorDeClientes .option');
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
                    $("#clienteSeleccionadoCorrecto").removeClass("hidden");
                    $("#clienteSeleccionadoCorrecto").addClass("flex");
                }
            }
        }
    });
    
    function updateSelection($options) {
        $options.removeClass('bg-gray-200 dark:bg-gray-700');
        if (selectedIndex >= 0) {
            $options.eq(selectedIndex).addClass('bg-gray-200 dark:bg-gray-700');
        }
    }
    
    function displayClientes(clientesArreglo) {
        const $contenedor = $('#contenedorDeClientes');
        $contenedor.empty();
        if (clientesArreglo.length > 0) {
            $contenedor.removeClass('hidden');
            clientesArreglo.forEach(cliente => {
                const $div = $('<div class="text-gray-800 text-sm dark:text-white font-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:hover:bg-gray-700 hover:bg-gray-200"></div>')
                    .text(cliente.nombreCompleto)
                    .addClass('option p-2')
                    .on('click', function () {
                        selectCliente(cliente);
                    });
                $contenedor.append($div);
            });
        } else {
            $contenedor.addClass('hidden');
        }
    }
    
    function selectCliente(cliente) {
        $('#inputNombreClientes').val(cliente.nombreCompleto);
        $('#codigoClienteSeleccionado').val(cliente.codigoCli);
        $('#contenedorDeClientes').addClass('hidden');
        $("#clienteSeleccionadoCorrecto").removeClass("hidden");
        $("#clienteSeleccionadoCorrecto").addClass("flex");
        selectedIndex = -1;
    }
    
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.relative').length) {
            $('#contenedorDeClientes').addClass('hidden');
            selectedIndex = -1;
        }
    });

    function fn_crearCuadroResumenBancos(){

        let montoBCP = 0;
        let montoBBVA = 0;
        let montoIBK = 0;
        let montoCAJAPIURA = 0;
        let montoCMAC = 0;
        let montoYAPE = 0;

        function limpiarNombreBanco(nombre) {
            // Expresiones regulares para detectar variantes y limpiar el nombre
            const regexBCP = /^BCP/;
            const regexBBVA = /^BBVA/;
            const regexIBK = /^IBK/;
            const regexCajaPiura = /^CAJA PIURA/;
            const regexCMAC = /^CMAC/;
            const regexYAPE = /^YAPE/;
        
            if (regexBCP.test(nombre)) {
                return "BCP";
            } else if (regexBBVA.test(nombre)) {
                return "BBVA";
            } else if (regexIBK.test(nombre)) {
                return "IBK";
            } else if (regexCajaPiura.test(nombre)) {
                return "CAJA PIURA";
            } else if (regexCMAC.test(nombre)) {
                return "CMAC";
            } else if (regexYAPE.test(nombre)) {
                return "YAPE";
            } else {
                return nombre; // Devuelve el nombre original si no coincide con ninguna variante
            }
        }

        $('#tableReporteIngresosBancos tbody tr.filtroPagos1').each(function() {
            let columna = $(this).find('td:eq(6)').text().trim();
            let columnaImporte = parseFloat($(this).find('td:eq(3)').text());
            columna = limpiarNombreBanco(columna);
            if (columna == "BCP") {
                montoBCP += columnaImporte;
            }else if(columna == "BBVA"){
                montoBBVA += columnaImporte;
            }else if(columna == "IBK"){
                montoIBK += columnaImporte;
            }else if(columna == "CAJA PIURA"){
                montoCAJAPIURA += columnaImporte;
            }else if(columna == "CMAC"){
                montoCMAC += columnaImporte;    
            }else if(columna == "YAPE"){
                montoYAPE += columnaImporte;
            }
        });
        $('#tableReporteIngresosBancos tbody tr.filtroPagos2').each(function() {
            let columna = $(this).find('td:eq(6)').text().trim();
            let columnaImporte = parseFloat($(this).find('td:eq(3)').text());
            columna = limpiarNombreBanco(columna);
            if (columna == "BCP") {
                montoBCP += columnaImporte;
            }else if(columna == "BBVA"){
                montoBBVA += columnaImporte;
            }else if(columna == "IBK"){
                montoIBK += columnaImporte;
            }else if(columna == "CAJA PIURA"){
                montoCAJAPIURA += columnaImporte;
            }else if(columna == "CMAC"){
                montoCMAC += columnaImporte;    
            }else if(columna == "YAPE"){
                montoYAPE += columnaImporte;
            }
        });
        $('#tableReporteIngresosBancos tbody tr.filtroPagos3').each(function() {
            let columna = $(this).find('td:eq(6)').text().trim();
            let columnaImporte = parseFloat($(this).find('td:eq(3)').text());
            columna = limpiarNombreBanco(columna);
            if (columna == "BCP") {
                montoBCP += columnaImporte;
            }else if(columna == "BBVA"){
                montoBBVA += columnaImporte;
            }else if(columna == "IBK"){
                montoIBK += columnaImporte;
            }else if(columna == "CAJA PIURA"){
                montoCAJAPIURA += columnaImporte;
            }else if(columna == "CMAC"){
                montoCMAC += columnaImporte;    
            }else if(columna == "YAPE"){
                montoYAPE += columnaImporte;
            }
        });

        $('#tableReporteIngresosGranja tbody tr.editarPagos').each(function() {
            let columna = $(this).find('td:eq(6)').text().trim();
            let columnaImporte = parseFloat($(this).find('td:eq(3)').text());
            columna = limpiarNombreBanco(columna);
            if (columna == "BCP") {
                montoBCP += columnaImporte;
            }else if(columna == "BBVA"){
                montoBBVA += columnaImporte;
            }else if(columna == "IBK"){
                montoIBK += columnaImporte;
            }else if(columna == "CAJA PIURA"){
                montoCAJAPIURA += columnaImporte;
            }else if(columna == "CMAC"){
                montoCMAC += columnaImporte;    
            }else if(columna == "YAPE"){
                montoYAPE += columnaImporte;
            }
        });

        let tbodyReporteDePagosIngresosResumenBancos = $('#bodyReporteDePagosIngresosResumenBancos');
        tbodyReporteDePagosIngresosResumenBancos.empty();
        let montoBCPFormateo = montoBCP.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
        let montoBBVAFormateo = montoBBVA.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
        let montoIBKFormateo = montoIBK.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
        let montoCAJAPIURAFormateo = montoCAJAPIURA.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
        let montoCMACFormateo = montoCMAC.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
        let montoYAPEFormateo = montoYAPE.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let montoTotal = montoBCP + montoBBVA + montoIBK + montoCAJAPIURA + montoCMAC + montoYAPE;
        let montoTotalFormateo = montoTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
        let nuevaFila = `
            <tr class="border-b bg-green-600 dark:border-gray-700 text-white">
                <td class="outline-none border-2 border-t-0 p-2 text-center cursor-pointer">BCP</td>
                <td class="outline-none border-2 border-t-0 p-2 text-center cursor-pointer">BBVA</td>
                <td class="outline-none border-2 border-t-0 p-2 text-center cursor-pointer">IBK</td>
                <td class="outline-none border-2 border-t-0 p-2 text-center cursor-pointer">CAJA PIURA</td>
                <td class="outline-none border-2 border-t-0 p-2 text-center cursor-pointer">CMAC</td>
                <td class="outline-none border-2 border-t-0 p-2 text-center cursor-pointer">YAPE</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">
                <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer">${montoBCPFormateo}</td>
                <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer">${montoBBVAFormateo}</td>
                <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer">${montoIBKFormateo}</td>
                <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer">${montoCAJAPIURAFormateo}</td>
                <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer">${montoCMACFormateo}</td>
                <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer">${montoYAPEFormateo}</td>
            </tr>
            <tr class="bg-red-600 border-b dark:border-gray-700 cursor-pointer text-white font-bold">
                <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer" colspan="3">TOTAL DE SALDO EN BANCOS</td>
                <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer" colspan="3">${montoTotalFormateo}</td>
            </tr>
        `;
        tbodyReporteDePagosIngresosResumenBancos.append(nuevaFila);
    }

    // Prueba de Excel en LocalStorage

    // Capturar los eventos de teclado en la tabla para moverse entre las celdas
    $('#tablaEditablePagosExcel').on('keydown', 'td', function(e) {
        let $currentCell = $(this);
        let $row = $currentCell.closest('tr');
        let $table = $('#tablaEditablePagosExcel');
        let currentCellIndex = $currentCell.index();
        let $nextCell;

        switch(e.key) {
            case 'ArrowLeft':
                if (currentCellIndex > 0) {
                    $nextCell = $currentCell.prev('td');
                    while ($nextCell.length && $nextCell.attr('contenteditable') === 'false') {
                        $nextCell = $nextCell.prev('td');
                    }
                    if ($nextCell.length) {
                        $nextCell.focus();
                        setTimeout(function() {
                            colocarCursorAlFinal($nextCell[0]);
                        }, 0);
                    }
                }
                break;
            case 'ArrowRight':
                if (currentCellIndex < $row.find('td').length - 1) {
                    $nextCell = $currentCell.next('td');
                    while ($nextCell.length && $nextCell.attr('contenteditable') === 'false') {
                        $nextCell = $nextCell.next('td');
                    }
                    if ($nextCell.length) {
                        $nextCell.focus();
                        setTimeout(function() {
                            colocarCursorAlFinal($nextCell[0]);
                        }, 0);
                    }
                }
                break;
            case 'ArrowUp':
                let $prevRow = $row.prev('tr');
                if ($prevRow.length > 0) {
                    $nextCell = $prevRow.find('td').eq(currentCellIndex);
                    while ($nextCell.length && $nextCell.attr('contenteditable') === 'false') {
                        $nextCell = $nextCell.prev('td');
                    }
                    if ($nextCell.length) {
                        $nextCell.focus();
                        setTimeout(function() {
                            colocarCursorAlFinal($nextCell[0]);
                        }, 0);
                    }
                }
                break;
            case 'ArrowDown':
                let $nextRow = $row.next('tr');
                if ($nextRow.length > 0) {
                    $nextCell = $nextRow.find('td').eq(currentCellIndex);
                    while ($nextCell.length && $nextCell.attr('contenteditable') === 'false') {
                        $nextCell = $nextCell.next('td');
                    }
                    if ($nextCell.length) {
                        $nextCell.focus();
                        setTimeout(function() {
                            colocarCursorAlFinal($nextCell[0]);
                        }, 0);
                    } else {
                        // Si no hay celda editable en la fila actual, añadir una nueva fila
                        if (!filaVacia($row)) {
                            let nuevaFila = crearFila();
                            $table.find('tbody').append(nuevaFila);
                            $nextCell = $table.find('tbody tr:last-child').find('td').eq(currentCellIndex);
                            $nextCell.focus();
                            setTimeout(function() {
                                colocarCursorAlFinal($nextCell[0]);
                            }, 0);
                        }
                    }
                }
                break;
        }
    });

    // Función para colocar el cursor al final del contenido
    function colocarCursorAlFinal(element) {
        if (element) {
            let range = document.createRange();
            let selection = window.getSelection();
            range.selectNodeContents(element);
            range.collapse(false); // Colocar el cursor al final
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    function copiarDatosPenultimaFilaNuevo() {
        let filas = $('.pagosAgregarExcelNuevo');
        if (filas.length > 1) {
            let penultimaFila = filas.eq(filas.length - 2);
            let ultimaFila = filas.eq(filas.length - 1);
            let datosColumna0 = penultimaFila.find('td').eq(0).text();
            let datosColumna5 = penultimaFila.find('td').eq(5).text();
            let datosColumna10 = penultimaFila.find('td').eq(10).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
            ultimaFila.find('td').eq(5).text(datosColumna5);
            ultimaFila.find('td').eq(10).text(datosColumna10);
        }
    }

    // Añadir una fila nueva automáticamente si el usuario escribe en la última fila
    $('#tablaEditablePagosExcel').on('input', 'td', function() {
        let $row = $(this).closest('tr');
        let $table = $('#tablaEditablePagosExcel tbody');
    
        if ($row.is(':last-child')) {
            // Añadir nueva fila si la última fila no está vacía
            if (!filaVacia($row)) {
                let nuevaFila = $(crearFila());
                $table.append(nuevaFila);
    
                // Añadir eventos a las celdas de la nueva fila
                nuevaFila.find('.nombreClienteTablaExcel').on('input', function() {
                    let inputText = $(this).text().trim();
                    let currentCell = $(this);
                    let codigoClienteCell = currentCell.closest('tr').find('td').eq(9);
    
                    if (inputText.length >= 1) {
                        currentCell.removeClass('bg-green-500');
                        codigoClienteCell.text("0");
                        fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
                            if (clientes) {
                                showSuggestions(currentCell, clientes);
                            } else {
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
                            guardarTabla();
                        }
                    }
                });
            }
        }

        // validar mayusculas
        if ($(this).hasClass('convertirMayusculasTablasNuevo')) {
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
        };

        // validarSoloNumerosDosDecimalesTablas

        if ($(this).hasClass('validarSoloNumerosDosDecimalesTablasNuevo')) {
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
        };

        // validarFormatoFechaTablas

        if ($(this).hasClass('validarFormatoFechaTablasNuevo')) {
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
        };  

        // validarFormatoHoraTablas

        if ($(this).hasClass('validarFormatoHoraTablasNuevo')) {
            let inputValue = $(this).text();
            let regex = /^(?:2[0-3]|[01][0-9]):(?:[0-5][0-9]):(?:[0-5][0-9])$/;
        
            // Verificar si el valor cumple con el formato de hora HH:MM:SS
            if (regex.test(inputValue)) {
                $(this).css('background-color', 'rgb(22 163 74)');
            } else {
                $(this).css('background-color', 'rgb(185 28 28)');
            }
        };

        copiarDatosPenultimaFilaNuevo();

        // Guardar tabla en localStorage
        guardarTabla();
    });

    function crearFila() {
        return `<tr class="bg-white pagosAgregarExcelNuevo border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">
            <td class="outline-none border-l-2 border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablasNuevo text-gray-900 dark:text-white" contenteditable="true">${fechaHoyTabla}</td>
            <td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true"></td>
            <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablasNuevo" contenteditable="true"></td>
            <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablasNuevo" contenteditable="true"></td>
            <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablasNuevo text-gray-900 dark:text-white" contenteditable="true"></td>
            <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablasNuevo bancoCopiarNuevo" contenteditable="true"></td>
            <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="false">Transferencia</td>
            <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer" contenteditable="true"></td>
            <td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">1</td>
            <td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">0</td>
            <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer validarFormatoFechaTablasNuevo text-gray-900 dark:text-white whitespace-nowrap fechaRegistroPago" contenteditable="true">${fechaHoyTabla}</td>
        </tr>`;
    }

    // Verificar si una fila está vacía (todas las celdas editables están vacías)
    function filaVacia($row) {
        let vacia = true;
        $row.find('td').each(function(index) {
            // Verificar solo las celdas editables y visibles, excluyendo columnas específicas
            if ($(this).is('[contenteditable="true"]') && !$(this).hasClass('hidden') &&
                index !== 0 && index !== 6 && index !== 8 && index !== 9 && index !== 10 && index !== 5) {
                if ($(this).text().trim() !== "") {
                    vacia = false;
                    return false; // Salir del loop si una celda no está vacía
                }
            }
        });
        return vacia;
    }      

    // Guardar la tabla en localStorage
    function guardarTabla() {
        let filas = [];
        $('#tablaEditablePagosExcel tbody tr').each(function() {
            let celdas = [];
            $(this).find('td').each(function() {
                celdas.push($(this).text());
            });
            filas.push(celdas);
        });
        localStorage.setItem('tablaEditablePagosExcelED', JSON.stringify(filas));
    }    

    function cargarTabla() {
        let datosGuardados = localStorage.getItem('tablaEditablePagosExcelED');
        let $table = $('#tablaEditablePagosExcel tbody');
    
        if (datosGuardados) {
            let filas = JSON.parse(datosGuardados);
            let $table = $('#tablaEditablePagosExcel tbody');
            $table.empty();
            
            filas.forEach(function(fila) {
                let $estilosCliente = fila[9] == "0" ? `` : `bg-green-500`;
                
                let $fila = $(`
                    <tr class="bg-white pagosAgregarExcelNuevo border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">
                        <td class="outline-none border-l-2 border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablasNuevo text-gray-900 dark:text-white" contenteditable="true">${fila[0]}</td>
                        <td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel ${$estilosCliente}" contenteditable="true">${fila[1]}</td>
                        <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablasNuevo" contenteditable="true">${fila[2]}</td>
                        <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablasNuevo" contenteditable="true">${fila[3]}</td>
                        <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablasNuevo text-gray-900 dark:text-white" contenteditable="true">${fila[4]}</td>
                        <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablasNuevo bancoCopiarNuevo" contenteditable="true">${fila[5]}</td>
                        <td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="false">${fila[6]}</td>
                        <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer" contenteditable="true">${fila[7]}</td>
                        <td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">${fila[8]}</td>
                        <td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">${fila[9]}</td>
                        <td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer validarFormatoFechaTablasNuevo text-gray-900 dark:text-white whitespace-nowrap fechaRegistroPago" contenteditable="true">${fila[10]}</td>
                    </tr>
                `);
                
                $table.append($fila);
                
                // Añadir eventos a las celdas con la clase .nombreClienteTablaExcel
                $fila.find('.nombreClienteTablaExcel').on('input', function() {
                    let inputText = $(this).text().trim();
                    let currentCell = $(this);
                    let codigoClienteCell = currentCell.closest('tr').find('td').eq(9);

                    if (inputText.length >= 1) {
                        currentCell.removeClass('bg-green-500');
                        codigoClienteCell.text("0");
                        fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
                            if (clientes) {
                                showSuggestions(currentCell, clientes);
                            } else {
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

                $fila.find('.nombreClienteTablaExcel').on('keydown', function(e) {
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
                            guardarTabla();
                        }
                    }
                });
            });
    
            // Añadir una fila vacía si la última fila no está vacía
            let $ultimaFila = $('#tablaEditablePagosExcel tbody tr:last-child');
            if (!filaVacia($ultimaFila)) {
                let nuevaFila = $(crearFila());
                $table.append(nuevaFila);
                agregarEventosFila(nuevaFila); // Añadir eventos a la nueva fila
            }
    
        } else {
            // Si no hay datos guardados, añadir una fila vacía inicial
            let nuevaFila = $(crearFila());
            $table.append(nuevaFila);
            agregarEventosFila(nuevaFila); // Añadir eventos a la nueva fila vacía
        }
    }
    
    // Función para agregar eventos a la fila
    function agregarEventosFila(fila) {
        fila.find('.nombreClienteTablaExcel').on('input', function() {
            let inputText = $(this).text().trim();
            let currentCell = $(this);
            let codigoClienteCell = currentCell.closest('tr').find('td').eq(9);
    
            if (inputText.length >= 1) {
                currentCell.removeClass('bg-green-500');
                codigoClienteCell.text("0");
                fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
                    if (clientes) {
                        showSuggestions(currentCell, clientes);
                    } else {
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
    
        fila.find('.nombreClienteTablaExcel').on('keydown', function(e) {
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
                    guardarTabla();
                }
            }
        });
    }         

    // Borrar las filas y limpiar el localStorage
    $('#limpiarTablaEditable').on('click', function() {

        Swal.fire({
            title: '¿Desea eliminar limpiar la tabla?',
            text: "¡Estas seguro de eliminar los registros!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                $('#tablaEditablePagosExcel tbody').empty();
                localStorage.removeItem('tablaEditablePagosExcelED');
                // Añadir una fila vacía después de limpiar
                let nuevaFila = $(crearFila());
                $('#tablaEditablePagosExcel tbody').append(nuevaFila);

                // Añadir eventos a las celdas con la clase .nombreClienteTablaExcel
                nuevaFila.find('.nombreClienteTablaExcel').on('input', function() {
                    let inputText = $(this).text().trim();
                    let currentCell = $(this);
                    let codigoClienteCell = currentCell.closest('tr').find('td').eq(9);

                    if (inputText.length >= 1) {
                        currentCell.removeClass('bg-green-500');
                        codigoClienteCell.text("0");
                        fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
                            if (clientes) {
                                showSuggestions(currentCell, clientes);
                            } else {
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
                            guardarTabla();
                        }
                    }
                });
            }
        })
    });

    cargarTabla();

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

    $(document).on('click', '#registrar_agregarPagos_ExcelNuevo', function () {

        $("#registrar_agregarPagos_ExcelNuevo").attr('disabled','disabled');

        let arregloCodigos = [];

        $('.pagosAgregarExcelNuevo:not(:last-child)').each(function() {
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
        let totalRequests = $('.pagosAgregarExcelNuevo:not(:last-child)').length;

        if(totalRequests == 0){
            $("#registrar_agregarPagos_ExcelNuevo").removeAttr('disabled');
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

                    $('#tablaEditablePagosExcel tbody').empty();
                    localStorage.removeItem('tablaEditablePagosExcelED');
                    // Añadir una fila vacía después de limpiar
                    let nuevaFila = $(crearFila());
                    $('#tablaEditablePagosExcel tbody').append(nuevaFila);

                    // Añadir eventos a las celdas con la clase .nombreClienteTablaExcel
                    nuevaFila.find('.nombreClienteTablaExcel').on('input', function() {
                        let inputText = $(this).text().trim();
                        let currentCell = $(this);
                        let codigoClienteCell = currentCell.closest('tr').find('td').eq(9);

                        if (inputText.length >= 1) {
                            currentCell.removeClass('bg-green-500');
                            codigoClienteCell.text("0");
                            fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
                                if (clientes) {
                                    showSuggestions(currentCell, clientes);
                                } else {
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
                                guardarTabla();
                            }
                        }
                    });
                }
                // Realizar la acción después de que todas las consultas se completen
                let fechaDesdeTraerIngresosBancos = $('#fechaDesdeReporteDeIngresosBancos').val();
                let fechaHastaTraerIngresosBancos = $('#fechaHastaReporteDeIngresosBancos').val();
                fn_TraerPagosFechasIngresoBancos(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos);
                $("#registrar_agregarPagos_ExcelNuevo").removeAttr('disabled');
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcelNuevo:not(:last-child)').each(function() {
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
                            guardarTabla();
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

});
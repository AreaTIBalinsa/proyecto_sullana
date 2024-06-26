import jQuery from 'jquery';
window.$ = jQuery;
import 'flowbite';

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteDeIngresosBancos').val(fechaHoy);
    $('#fechaHastaReporteDeIngresosBancos').val(fechaHoy);

    fn_TraerPagosFechasIngresoBancos(fechaHoy,fechaHoy);
    fn_TraerPagosDirectoGranjaFechasBanco(fechaHoy,fechaHoy);

    $('#filtrar_reporte_ingresos_submit').on('click', function () {
        let fechaDesdeTraerIngresosBancos = $('#fechaDesdeReporteDeIngresosBancos').val();
        let fechaHastaTraerIngresosBancos = $('#fechaHastaReporteDeIngresosBancos').val();
        console.log(fechaDesdeTraerIngresosBancos);
        fn_TraerPagosFechasIngresoBancos(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos);
        fn_TraerPagosDirectoGranjaFechasBanco(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos);
    });

    fn_TraerPagosFechasIngresoBancos(fechaHoy,fechaHoy);

    function fn_TraerPagosFechasIngresoBancos(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos) {
        $.ajax({
            url: '/fn_consulta_TraerPagosFechasReporteIngresos',
            method: 'GET',
            data: {
                fechaDesdeTraerIngresosBancos: fechaDesdeTraerIngresosBancos,
                fechaHastaTraerIngresosBancos: fechaHastaTraerIngresosBancos,
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
                            tbodyReporteDePagosIngresosBancos.append(nuevaFila);
                        }
                    });

                    let encabezadoIngresoCaja = `<tr class="bg-green-500 text-white">
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
                            tbodyReporteDePagosIngresosBancos.append(nuevaFila);
                        }
                    });

                    let encabezadoIngresosPaul = `<tr class="bg-violet-600 text-white">
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

    function fn_TraerPagosDirectoGranjaFechasBanco(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos) {
        $.ajax({
            url: '/fn_consulta_TraerPagosDirectoGranjaFechasBanco',
            method: 'GET',
            data:{
                fechaDesdeTraerIngresosBancos:fechaDesdeTraerIngresosBancos,
                fechaHastaTraerIngresosBancos:fechaHastaTraerIngresosBancos,
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
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel4 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoy}`)); //fecha
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
                console.log("nombre", inputText)
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
                let fechaDesdeTraerIngresosBancos = $('#fechaDesdeReporteDeIngresosBancos').val();
                let fechaHastaTraerIngresosBancos = $('#fechaHastaReporteDeIngresosBancos').val();
                fn_TraerPagosDirectoGranjaFechasBanco(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos);

            }
        }
    });

    $(document).on('click', '#registrar_agregarPagos_Excel_Ingreso_Banco', function () {

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
                let fechaDesdeTraerIngresosBancos = $('#fechaDesdeReporteDeIngresosBancos').val();
                let fechaHastaTraerIngresosBancos = $('#fechaHastaReporteDeIngresosBancos').val();
                fn_TraerPagosDirectoGranjaFechasBanco(fechaDesdeTraerIngresosBancos, fechaHastaTraerIngresosBancos);
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcel4:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregarPagoCliente = filaActual.find('td:eq(0)').text().trim();
            let nombreCliente = filaActual.find('td:eq(1)').text().trim();
            let montoAgregarPagoCliente = filaActual.find('td:eq(2)').text().trim();
            let codAgregarPagoCliente = filaActual.find('td:eq(3)').text().trim();
            let horaAgregarPago = filaActual.find('td:eq(4)').text().trim();
            let bancoAgregarPagoCliente = filaActual.find('td:eq(5)').text().trim();
            let formaDePago = filaActual.find('td:eq(6)').text().trim();
            let comentarioAgregarPagoCliente = filaActual.find('td:eq(7)').text().trim();
            let pagoDerivado = filaActual.find('td:eq(8)').text().trim();
            let codigoCliente = filaActual.find('td:eq(9)').text().trim();

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
                            fn_AgregarPagoClienteExcel(codigoCliente, montoAgregarPagoCliente, fechaAgregarPagoCliente, formaDePago, codAgregarPagoCliente, comentarioAgregarPagoCliente, bancoAgregarPagoCliente, horaAgregarPago, pagoDerivado)
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
    
    function fn_AgregarPagoClienteExcel(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente,bancoAgregarPagoCliente,horaAgregarPago, pagoDerivado){
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

    // validar mayusculas
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

    // validarSoloNumerosDosDecimalesTablas

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

    // validarFormatoFechaTablas

    $(document).on('input', '.validarFormatoFechaTablas', function () {
        let inputValue = $(this).text();
        let regex = /^\d{4}-\d{2}-\d{2}$/;
    
        // Verificar si el valor cumple con el formato de fecha YYYY-MM-DD
        if (regex.test(inputValue)) {
            let inputDate = new Date(inputValue);
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
    
    // validarFormatoHoraTablas

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

});
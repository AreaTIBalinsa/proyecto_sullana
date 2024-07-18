import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    const fechaHoyTabla = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeCajaChica').val(fechaHoy);
    $('#fechaHastaCajaChica').val(fechaHoy);
    $('#fechaAgregarEgreso').val(fechaHoy);
    $('#fechaAgregarEgresoEditar').val(fechaHoy);
    fn_TraerPagosFechas2(fechaHoy, fechaHoy);
    fn_TraerEgresosFechas(fechaHoy, fechaHoy);

    var currentTime = '00:00:00';
    // Diferencia de Caja Chica
    var totalPagoIngreso = 0;
    var totalPagoEgreso = 0;

    obtenerHora();
    function obtenerHora(){

        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var seconds = now.getSeconds().toString().padStart(2, '0');
        
        currentTime = hours + ":" + minutes + ":" + seconds;
    }

    $(document).on('input', '.fechaRegistroPago', function () {
        // Obtener el valor del input actual
        let valor = $(this).text().trim();
        
        // Actualizar todas las celdas con la clase 'fechaRegistroPago' excepto la actual
        $('.fechaRegistroPago').not(this).each(function () {
            $(this).text(valor);
        });
    });   
    
    $('#horaAgregarPago').val(currentTime);

    $('#filtrarIngresosYEgresos').on('click', function () {
        let fechaDesdeTraerPagos = $('#fechaDesdeCajaChica').val();
        let fechaHastaTraerPagos = $('#fechaDesdeCajaChica').val();
        fn_TraerPagosFechas2(fechaDesdeTraerPagos, fechaHastaTraerPagos);
        fn_TraerEgresosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
    });

    function diferenciaCajaChica(){
        let totalDiferencia = totalPagoIngreso - totalPagoEgreso;
        $("#diferencia").html(parseFloat(totalDiferencia).toFixed(2));
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
                let fechaDesdeTraerPagos = $('#fechaDesdeCajaChica').val();
                let fechaHastaTraerPagos = $('#fechaHastaCajaChica').val();
                fn_TraerPagosFechas2(fechaDesdeTraerPagos, fechaHastaTraerPagos);
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
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel2 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`)); //fecha
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text("")); //hora
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text("")); //nombre
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="true">').text("Efectivo")); //forma
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text("")); //importe
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="false">').text("")); //codigo
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas hidden" contenteditable="false">').text("")); //banco
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer" contenteditable="true">').text(""));
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
        copiarDatosPenultimaFila4();
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

    $(document).on('contextmenu', 'tr.editarPagosEgresos', function (e) {
        e.preventDefault();
        let codigoPago = $(this).closest("tr").find("td:first").text();
        Swal.fire({
            title: '¿Desea eliminar el Registro?',
            text: "¡Estas seguro de eliminar el Egreso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                fn_EliminarEgreso(codigoPago);
            }
        })
    });

    function fn_EliminarEgreso(codigoPago){
        $.ajax({
            url: '/fn_consulta_EliminarEgreso',
            method: 'GET',
            data: {
                codigoEgreso: codigoPago,
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

    function copiarDatosPenultimaFila2() {
        let filas = $('.pagosAgregarExcel2');
        if (filas.length > 1) {
            let penultimaFila = filas.eq(filas.length - 2);
            let ultimaFila = filas.eq(filas.length - 1);
            let datosColumna0 = penultimaFila.find('td').eq(0).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
        }
    }

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
                fn_TraerEgresosFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
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

    function copiarDatosPenultimaFila4() {
        let filas = $('.pagosAgregarExcelEgreso1');
        if (filas.length > 1) {
            let penultimaFila = filas.eq(filas.length - 2);
            let ultimaFila = filas.eq(filas.length - 1);
            let datosColumna0 = penultimaFila.find('td').eq(0).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
        }
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
                    $('#filtrarIngresosYEgresos').trigger('click');
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    $('.cerrarModalAgregarPagoClienteEditar, #ModalAgregarPagoClienteEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarPagoClienteEditar').addClass('hidden');
        $('#ModalAgregarPagoClienteEditar').removeClass('flex');
    });

    // function fn_ActualizarPagoCliente(idReporteDePago, idReporteDeEgreso){
    //     $.ajax({
    //         url: '/fn_consulta_ActualizarPagoCliente',
    //         method: 'GET',
    //         data: {
    //             idReporteDePago:idReporteDePago,
    //         },
    //         success: function(response) {
    //             if (response.success) {
    //                 Swal.fire({
    //                     position: 'center',
    //                     icon: 'success',
    //                     title: 'Se edito el pago correctamente',
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    
    //                 $.ajax({
    //                     url: '/fn_consulta_AgregarEgresoEditar',
    //                     method: 'GET',
    //                     data:{
    //                         idReporteDeEgreso: idReporteDeEgreso,
    //                     },
    //                     success: function(response) {
    //                         if (response.success) {
    //                             Swal.fire({
    //                                 position: 'center',
    //                                 icon: 'success',
    //                                 title: 'Se actualizo el egreso correctamente',
    //                                 showConfirmButton: false,
    //                                 timer: 1500
    //                             });
    
    //                             // Acciones para cuando las dos consultas hayan terminado
    //                         }
    //                     },
    //                     error: function(error) {
    //                         console.error("ERROR", error);
    //                     }
    //                 });
    //             }
    //         },
    //         error: function(error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 text: 'Error: Ocurrio un error inesperado durante la operacion',
    //               })
    //             console.error("ERROR",error);
    //         }
    //     });
    // }

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
                    var egresosArreglo = response.map(function(item) {
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
        let value = input.val().toUpperCase();  // Convertir a mayúsculas
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

    $(document).on('dblclick', ".verDetalleEgreso", function (event) {
        let fecha = $(this).closest("tr").find("td:eq(0)").text();
        let categoria = $(this).closest("tr").find("td:eq(5)").text();
        fn_TraerModalDetallesEgresos(fecha, categoria);
    });

    $('.cerrarModalEgresosModal, #ModalEgresosModal .opacity-75').on('click', function (e) {
        $('#ModalEgresosModal').addClass('hidden');
        $('#ModalEgresosModal').removeClass('flex');
    });

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

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
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
                        if(obj.id_category == 0 ){
                            $("#captionEgresosModal").html('Egresos sin Clasificar');
                            $("#captionEgresosModal, #headerEgresosModal").removeClass('bg-blue-600');
                            $("#captionEgresosModal, #headerEgresosModal").addClass('bg-red-600');
                        }else{
                            $("#captionEgresosModal").html(`${obj.nombre_category}`);
                            $("#captionEgresosModal, #headerEgresosModal").removeClass('bg-red-600');
                            $("#captionEgresosModal, #headerEgresosModal").addClass('bg-blue-600');
                        }
                    });
                    $('#ModalEgresosModal').addClass('flex');
                    $('#ModalEgresosModal').removeClass('hidden');

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });

    };

});
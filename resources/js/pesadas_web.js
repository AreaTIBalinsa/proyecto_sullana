import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    const fechaHoyTabla = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

    $('#fechaAgregarPesadas').val(fechaHoy);

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

    $(document).on('click', '#registrar_agregarPagos_Excel4', function () {
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
                fn_TraerPagosDirectoGranjaFechas(fechaDesdeTraerPagos, fechaHastaTraerPagos);
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcel:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let nombreCliente = filaActual.find('td:eq(0)').text().trim();
            let montoAgregarPagoCliente = filaActual.find('td:eq(1)').text().trim();
            let formaDePago = filaActual.find('td:eq(2)').text().trim();
            let bancoAgregarPagoCliente = filaActual.find('td:eq(3)').text().trim();
            let codAgregarPagoCliente = filaActual.find('td:eq(4)').text().trim();
            let fechaAgregarPagoCliente = filaActual.find('td:eq(5)').text().trim();
            let horaAgregarPago = filaActual.find('td:eq(6)').text().trim();
            let comentarioAgregarPagoCliente = filaActual.find('td:eq(7)').text().trim();
            let pagoDerivado = filaActual.find('td:eq(8)').text().trim();
            let codigoCliente = filaActual.find('td:eq(9)').text().trim();

            formaDePago = formaDePago[0].toUpperCase() + formaDePago.slice(1);

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
        });
    }); 

    function tablaEditable(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePesadasExcel');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntrada(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntrada(tbody) {
        let textoSeleccionado = $('#presentacionAgregarPesadas option:selected').text();
        let valorSeleccionado = $('#presentacionAgregarPesadas').val();
        let fechaAyuda = $('#fechaAgregarPesadas').val();

        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap text-white validarFormatoFechaTablas" contenteditable="true">').text(fechaHoyTabla));
        nuevaFila.append($('<td class="outline-none border-r-2 dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="false">').text(textoSeleccionado));
        nuevaFila.append($('<td class="outline-none border-r border-l-2 dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas precioDuplicado" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r-2 dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="hidden" contenteditable="false">').text(valorSeleccionado));
        tbody.append(nuevaFila);
    
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
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
            ultimaFila.find('td').eq(5).text(datosColumna5);
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

    $(document).on('change', '#presentacionAgregarPesadas', function (event) {
        let textoSeleccionado = $('#presentacionAgregarPesadas option:selected').text();
        let valorSeleccionado = $('#presentacionAgregarPesadas').val();
    
        let ultimaFila = $('.pagosAgregarExcel').last();
        
        ultimaFila.find('td:first-child').text(textoSeleccionado);
        ultimaFila.find('td').eq(7).text(valorSeleccionado);
    });
      

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

    $(document).on('input', '.validarSoloNumerosTablas', function (event) {
        let inputValue = $(this).text();
        let originalValue = inputValue;
    
        // Elimina todos los caracteres excepto los dígitos
        inputValue = inputValue.replace(/[^0-9]/g, '');
    
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

    $(document).on('input', '.validarFormatoFechaTablas', function () {
        copiarDatosPenultimaFila();
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

    $(document).on('input', '.precioDuplicado', function () {
        copiarDatosPenultimaFila();
    });

    function fn_ConsultarPesadasDesdeHasta(fechaDesdePesadas,fechaHastaPesadas) {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_ConsultarPesadasDesdeHasta',
            method: 'GET',
            data:{
                fechaDesde : fechaDesdePesadas,
                fechaHasta : fechaHastaPesadas,
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyConsultarPesadas = $('#bodyConsultarPesadas');
                    tbodyConsultarPesadas.empty();
                    let tipoUsuario = $('#tipoUsuario').data('id');

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        let nuevaFila = ""
                        let pesoNetoPes = 0
                        if (parseFloat(obj.pesoNetoPes) > 0){
                            pesoNetoPes = parseFloat(obj.pesoNetoPes)-parseFloat(obj.pesoNetoJabas)
                        }else{
                            pesoNetoPes = parseFloat(obj.pesoNetoPes)+parseFloat(obj.pesoNetoJabas)
                        }
                        
                        nuevaFila = $('<tr class="Pesadas bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">');
                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.nombreEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.cantidadPes));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(pesoNetoPes.toFixed(2)));

                        if (parseFloat(obj.numeroJabasPes) == 0){
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.numeroCubetasPes));
                        }else{
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.numeroJabasPes));
                        }

                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.pesoNetoJabas));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.horaPes));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.fechaRegistroPes));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.precioPes));
                        
                        // Agregar la nueva fila al tbody
                        tbodyConsultarPesadas.append(nuevaFila);
                    });

                    if (response.length == 0) {
                        tbodyConsultarPesadas.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
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

    fn_declararEspeciesVenta();
    function fn_declararEspeciesVenta(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacion = $('#presentacionAgregarPesadas');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

                    // // Agregar la opción inicial "Seleccione tipo"
                    // selectPresentacion.append($('<option>', {
                    //     value: '0',
                    //     text: 'Seleccione presentación',
                    //     disabled: true,
                    //     selected: true
                    // }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
                        });
                        selectPresentacion.append(option);
                    });

                    tablaEditable();

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }
});
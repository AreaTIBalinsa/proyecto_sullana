import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    fn_consulta_TraerDatosPesadas3(fechaHoy,fechaHoy)

    const fechaHoyTabla = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

    $('#fechaDesdePesadas').val(fechaHoy);
    $('#fechaHastaPesadas').val(fechaHoy);

    $('#btnBuscarCuentaDelCliente').on('click', function () {
        let fechaDesdePesadas = $('#fechaDesdePesadas').val();
        let fechaHastaPesadas = $('#fechaHastaPesadas').val();
        fn_consulta_TraerDatosPesadas3(fechaDesdePesadas,fechaHastaPesadas);
    });

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
                let fechaDesdePesadas = $('#fechaDesdePesadas').val();
                let fechaHastaPesadas = $('#fechaHastaPesadas').val();
                fn_consulta_TraerDatosPesadas3(fechaDesdePesadas,fechaHastaPesadas);
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcel:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregarPesada = filaActual.find('td:eq(0)').text().trim();
            fechaAgregarPesada = fechaAgregarPesada.split('-').reverse().join('-');
            let especieAgregarPesada = filaActual.find('td:eq(1)').text().trim();
            let cantidadAgregarPesada = filaActual.find('td:eq(2)').text().trim();
            let pesoBrutoAgregarPesada = filaActual.find('td:eq(3)').text().trim();
            let pesoTaraAgregarPesada = filaActual.find('td:eq(4)').text().trim();
            let precioAgregarPesada = filaActual.find('td:eq(5)').text().trim();
            let observacionAgregarPesada = filaActual.find('td:eq(6)').text().trim();
            let codigoEspecieAgregarPesada = filaActual.find('td:eq(7)').text().trim();
            let codigoCli = $("#codigoClienteSeleccionado").val();

            if (codigoCli == 0 || codigoCli == ""){
                alertify.notify('Debe rellenar el campo cliente.', 'error', 3);
                return;
            }

            if (cantidadAgregarPesada == "" || pesoBrutoAgregarPesada == ""){
                alertify.notify('Debe rellenar los campos.', 'error', 3);
                failedRequests++;
                return;
            }

            fn_agregarPesadasExcel(fechaAgregarPesada, especieAgregarPesada, cantidadAgregarPesada, pesoBrutoAgregarPesada, pesoTaraAgregarPesada, precioAgregarPesada, observacionAgregarPesada, codigoEspecieAgregarPesada, codigoCli)
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
        });
    }); 

    function tablaEditable(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePesadasExcel');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntrada(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function fn_agregarPesadasExcel(fechaAgregarPesada, especieAgregarPesada, cantidadAgregarPesada, pesoBrutoAgregarPesada, pesoTaraAgregarPesada, precioAgregarPesada, observacionAgregarPesada, codigoEspecieAgregarPesada, codigoCli){
        return $.ajax({
            url: '/fn_consulta_registrarPesadasMerma',
            method: 'GET',
            data: {
                fechaAgregarPesada: fechaAgregarPesada,
                especieAgregarPesada : especieAgregarPesada,
                cantidadAgregarPesada: cantidadAgregarPesada,
                pesoBrutoAgregarPesada: pesoBrutoAgregarPesada,
                pesoTaraAgregarPesada: pesoTaraAgregarPesada,
                precioAgregarPesada: precioAgregarPesada,
                observacionAgregarPesada: observacionAgregarPesada,
                codigoEspecieAgregarPesada: codigoEspecieAgregarPesada,
                codigoCli: codigoCli,
            },
            success: function(response) {
                if (response.success) {
                    // Swal.fire({
                    //     position: 'center',
                    //     icon: 'success',
                    //     title: 'Se cambio los precios correctamente.',
                    //     showConfirmButton: false,
                    //     timer: 2000
                    // });
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

    function agregarFilaEntrada(tbody) {
        let textoSeleccionado = $('#presentacionAgregarPesadas option:selected').text();
        let valorSeleccionado = $('#presentacionAgregarPesadas').val();

        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer dark:text-white text-gray-900">');
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
        
        ultimaFila.find('td').eq(1).text(textoSeleccionado);
        ultimaFila.find('td').eq(7).text(valorSeleccionado);
    });
      

    $(document).on('input', '.validarSoloNumerosDosDecimalesTablas', function (event) {
        let inputValue = $(this).text();
        let originalValue = inputValue;
    
        // Elimina todos los caracteres excepto los dígitos y un punto decimal
        inputValue = inputValue.replace(/[^0-9.-]/g, '');
    
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
        inputValue = inputValue.replace(/[^0-9-]/g, '');
    
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

    $(document).on('contextmenu', 'tr.eliminarPesadas', function (e) {
        e.preventDefault();
        let codigoPesada = $(this).closest("tr").find("td:first").text();
        Swal.fire({
            title: '¿Desea eliminar el Registro?',
            text: "¡Estas seguro de eliminar la pesada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                fn_EliminarPesadaWeb(codigoPesada);
            }
        })
    });

    function fn_EliminarPesadaWeb(codigoPesada){
        $.ajax({
            url: '/fn_consulta_EliminarPesadaMerma',
            method: 'GET',
            data: {
                codigoPesada: codigoPesada,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino la pesada correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
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

    function fn_consulta_TraerDatosPesadas3(fechaDesdePesadas,fechaHastaPesadas) {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerDatosPesadas3Merma',
            method: 'GET',
            data:{
                fechaDesdePesadas : fechaDesdePesadas,
                fechaHastaPesadas : fechaHastaPesadas,
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyConsultarPesadas = $('#bodyReporteDePesadas');
                    tbodyConsultarPesadas.empty();

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

                        let promedio = pesoNetoPes / parseInt(obj.cantidadPes)
                        
                        nuevaFila = $('<tr class="Pesadas eliminarPesadas editarPesadas bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">');
                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">').text(obj.idPesada));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.fechaRegistroPes));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.nombreEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(promedio.toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.cantidadPes));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.pesoNetoPes));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.pesoNetoJabas));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(pesoNetoPes.toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.precioPes));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.observacionPes));
                        
                        // Agregar la nueva fila al tbody
                        tbodyConsultarPesadas.append(nuevaFila);
                    });

                    if (response.length == 0) {
                        tbodyConsultarPesadas.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="10" class="text-center">No hay datos</td></tr>`);
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

    $('.cerrarModalEditarPesadasWeb, #ModalEditarPesadasWeb .opacity-75').on('click', function (e) {
        $('#ModalEditarPesadasWeb').addClass('hidden');
        $('#ModalEditarPesadasWeb').removeClass('flex');
    });

    $(document).on("dblclick", "tr.editarPesadas", function() {
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            let idPesada= fila.find('td:eq(0)').text();

            fn_EditarPesada(idPesada);
            
            $('#ModalEditarPesadasWeb').addClass('flex');
            $('#ModalEditarPesadasWeb').removeClass('hidden');

        }
    });

    function fn_EditarPesada(codigoPesada){
        $.ajax({
            url: '/fn_consulta_EditarPesadasWebMerma',
            method: 'GET',
            data: {
                codigoPesada: codigoPesada,
            },
            success: function(response) {
                if (response.length > 0) {
                    let obj = response[0];

                    $('#selectedCodigoClientePesadas').attr("value",obj.codigoCli)
                    $('#idPesadaWebEditar').attr("value",obj.idPesada);
                    $('#idEditarPesadasWebCliente').val(obj.nombreCompleto);
                    $('#fechaEditarPesada').val(obj.fechaRegistroPes);
                    $('#especieEditarPesada').val(obj.idEspecie);
                    $('#cantidadEditarPesada').val(obj.cantidadPes);
                    $('#pesoBrutoEditarPesada').val(obj.pesoNetoPes);
                    $('#pesoJabasEditarPesada').val(obj.pesoNetoJabas);
                    $('#precioEditarPesada').val(obj.precioPes);
                    $('#comentarioEditarPesada').val(obj.observacionPes);
                } else {
                    console.error("No se encontraron datos.");
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    function fn_declararEspeciesVentas(){
        $.ajax({
            url: '/fn_consulta_DatosPesadasWeb',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacion = $('#especieEditarPesada');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectPresentacion.append($('<option>', {
                        value: '0',
                        text: 'Seleccione proveedor',
                        disabled: true,
                        selected: true
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // console.log(obj);
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

    fn_declararEspeciesVentas();
    fn_declararEspeciesPesadas();

    function fn_declararEspeciesPesadas(){
        $.ajax({
            url: '/fn_consulta_DatosPesadasWeb',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacionEditar = $('#especieEditarPesada');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacionEditar.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
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

    $('#idEditarPesadasWebCliente').on('input', function () {
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
                            $('#idEditarPesadasWebCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoClientePesadas').attr("value", obj.codigoCli);

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

    $('#btnGuardarPesadasEditar').on('click', function(){

        let idPesadaWebEditar = $('#idPesadaWebEditar').attr("value");
        let idEditarPesadasWebCliente = $('#selectedCodigoClientePesadas').attr("value");
        let fechaEditarPesada = $('#fechaEditarPesada').val();
        let especieEditarPesada = $('#especieEditarPesada').val();
        let cantidadEditarPesada = $('#cantidadEditarPesada').val();
        let pesoBrutoEditarPesada = $('#pesoBrutoEditarPesada').val();
        let pesoJabasEditarPesada = $('#pesoJabasEditarPesada').val();
        let precioEditarPesada = $('#precioEditarPesada').val();
        let comentarioEditarPesada = $('#comentarioEditarPesada').val();
    
        // console.log(idPesadaWebEditar, idEditarPesadasWebCliente, fechaEditarPesada, especieEditarPesada, cantidadEditarPesada, pesoBrutoEditarPesada, pesoJabasEditarPesada, precioEditarPesada, comentarioEditarPesada)
        fn_EditarPesadaWeb(idPesadaWebEditar, idEditarPesadasWebCliente, fechaEditarPesada, especieEditarPesada, cantidadEditarPesada, pesoBrutoEditarPesada, pesoJabasEditarPesada, precioEditarPesada, comentarioEditarPesada)
    });

    function fn_EditarPesadaWeb(idPesadaWebEditar, idEditarPesadasWebCliente, fechaEditarPesada, especieEditarPesada, cantidadEditarPesada, pesoBrutoEditarPesada, pesoJabasEditarPesada, precioEditarPesada, comentarioEditarPesada){
        $.ajax({
            url: '/fn_consulta_EditarDatosPesadasMerma',
            method: 'GET',
            data:{
                idPesadaWebEditar: idPesadaWebEditar,
                idEditarPesadasWebCliente: idEditarPesadasWebCliente,
                fechaEditarPesada: fechaEditarPesada,
                especieEditarPesada: especieEditarPesada,
                cantidadEditarPesada: cantidadEditarPesada,
                pesoBrutoEditarPesada: pesoBrutoEditarPesada,
                pesoJabasEditarPesada: pesoJabasEditarPesada,
                precioEditarPesada: precioEditarPesada,
                comentarioEditarPesada: comentarioEditarPesada,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizó el egreso correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
    
                    $('#ModalEditarPesadasWeb').addClass('hidden');
                    $('#ModalEditarPesadasWeb').removeClass('flex');
                    $('#btnBuscarCuentaDelCliente').trigger('click');
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
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

});
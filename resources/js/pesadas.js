import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];


    // Asignar la fecha actual a los inputs
    $('#fechaDesdePesadas').val(fechaHoy);
    $('#fechaHastaPesadas').val(fechaHoy);
    
    fn_ConsultarPesadasDesdeHasta(fechaHoy,fechaHoy);
    DataTableED('#tablaConsultarPesadas');
    declarar_especies()

    var primerEspecieGlobal = 0
    var segundaEspecieGlobal = 0
    var terceraEspecieGlobal = 0
    var cuartaEspecieGlobal = 0

    var nombrePrimerEspecieGlobal = ""
    var nombreSegundaEspecieGlobal = ""
    var nombreTerceraEspecieGlobal = ""
    var nombreCuartaEspecieGlobal = ""

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

                    nombrePrimerEspecieGlobal = response[0].nombreEspecie;
                    nombreSegundaEspecieGlobal = response[1].nombreEspecie;
                    nombreTerceraEspecieGlobal = response[2].nombreEspecie;
                    nombreCuartaEspecieGlobal = response[3].nombreEspecie;

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

    $('#filtroNombrePesadas, #filtroCantidadPesadas, #filtrarPesadasEliminadas').on('input change', function() {
        let nombreFiltrar = $('#filtroNombrePesadas').val().toUpperCase();
        let cantidadFiltrar = $('#filtroCantidadPesadas').val().replace(/[^0-9]/g, '');
        let filtrarEliminadas = $('#filtrarPesadasEliminadas').is(':checked');

        $('#filtroCantidadPesadas').val(cantidadFiltrar); // Actualiza el campo de cantidad con el valor filtrado

        $('#tablaConsultarPesadas tbody tr').show();

        if (nombreFiltrar) {
            $('#tablaConsultarPesadas tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }

        if (cantidadFiltrar) {
            $('#tablaConsultarPesadas tbody tr').each(function() {
                let cantidad = $(this).find('td:eq(3)').text().trim();
                if (cantidad !== cantidadFiltrar) {
                    $(this).hide();
                }
            });
        }

        if (filtrarEliminadas) {
            $('#tablaConsultarPesadas tbody tr').each(function() {
                let columna9 = $(this).find('td:eq(9)').text().trim();
                if (columna9 !== '0') {
                    $(this).hide();
                }
            });
        }
    });    

    $('#filtrarPesadasDesdeHasta').on('click', function () {
        let fechaDesdePesadas = $('#fechaDesdePesadas').val();
        let fechaHastaPesadas = $('#fechaHastaPesadas').val();
        fn_ConsultarPesadasDesdeHasta(fechaDesdePesadas,fechaHastaPesadas);
        $('#filtroNombrePesadas').val("");
        $('#filtroCantidadPesadas').val("");

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
                        if (obj.estadoPes == 1){
                            if (parseInt(obj.cantidadPes) <= 0 && parseInt(obj.numeroJabasPes) > 0){
                                nuevaFila = $('<tr class="Pesadas bg-[#2A80BF] border-b dark:border-gray-700 hover:bg-[#2877B0] cursor-pointer text-gray-50">');
                            }else{
                                nuevaFila = $('<tr class="Pesadas bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">');
                            }
                            // Agregar las celdas con la información
                            nuevaFila.append($('<td class="hidden">').text(obj.idPesada));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.nombreEspecie));
                            if (parseInt(obj.cantidadPes) <= 0 && parseInt(obj.numeroJabasPes) > 0){
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.numeroJabasPes+" T"));
                            }else{
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.cantidadPes));
                            }
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.pesoNetoPes));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.horaPes));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.fechaRegistroPes));
                            nuevaFila.append($('<td class="hidden">').text(obj.idEspecie));
                            if (tipoUsuario == 'Administrador'){
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.precioPes));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.valorConversion));
                            }
                            nuevaFila.append($('<td class="hidden">').text(obj.estadoPes));
                        }else{
                            if(tipoUsuario =='Administrador'){
                                nuevaFila = $('<tr class="Pesadas bg-red-500 border-b dark:border-gray-700 hover:bg-red-600 cursor-pointer text-gray-50">');

                                // Agregar las celdas con la información
                                nuevaFila.append($('<td class="hidden">').text(obj.idPesada));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.nombreEspecie));
                                if (parseInt(obj.cantidadPes) <= 0 && parseInt(obj.numeroJabasPes) > 0){
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.numeroJabasPes+" T"));
                                }else{
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.cantidadPes));
                                }
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.pesoNetoPes));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.horaPes));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.fechaRegistroPes));
                                if (tipoUsuario == 'Administrador'){
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.precioPes));
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(obj.valorConversion));
                                }
                                nuevaFila.append($('<td class="hidden">').text(obj.estadoPes));
                            }
                        }
                        
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

    $('.cerrarModalCambiarPesada, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalCambiarPesada').addClass('hidden');
            $('#ModalCambiarPesada').removeClass('flex');
        }
    });

    $('#idCambiarPesadaCliente').on('input', function () {
        let inputCambiarPesadaCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesCambiarPesada');
        let fechaCambioDePesada = $('#fechaCambioDePesadaActual').val();
        contenedorClientes.empty();

        if (inputCambiarPesadaCliente.length > 1 || inputCambiarPesadaCliente != "") {
            fn_TraerClientesCambiarPesadaCliente(inputCambiarPesadaCliente,fechaCambioDePesada);
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    $(document).on("dblclick", "#tablaConsultarPesadas tbody tr", function() {
        let fila = $(this).closest('tr');
        let codPesadaActual = fila.find('td:eq(0)').text();
        let fechaCambioDePesadaActual = fila.find('td:eq(6)').text();
        let especiePesadaActual = fila.find('td:eq(7)').text();

        let nombreClienteCambiarPesada = fila.find('td:eq(1)').text();
        let especieCambiarPesada = fila.find('td:eq(2)').text();
        let cantidadCambiarPesada = fila.find('td:eq(3)').text();
        let pesoCambiarPesada = fila.find('td:eq(4)').text();
        
        $('#ModalCambiarPesada').addClass('flex');
        $('#ModalCambiarPesada').removeClass('hidden');

        $('#nombreClienteCambiarPesada').text(nombreClienteCambiarPesada);
        $('#especieCambiarPesada').text(especieCambiarPesada);
        $('#pesoCambiarPesada').text(pesoCambiarPesada);
        $('#cantidadCambiarPesada').text(cantidadCambiarPesada);

        $('#codPesadaActual').attr('value',codPesadaActual);
        $('#especiePesadaActual').attr('value',especiePesadaActual);
        $('#fechaCambioDePesadaActual').attr('value',fechaCambioDePesadaActual);
        $('#idCambiarPesadaCliente').val("");
        $('#selectedCodigoCliCambiarPesada').attr("value", "");
        $('#idCambiarPesadaCliente').focus();
    });

    function fn_TraerClientesCambiarPesadaCliente(inputCambiarPesadaCliente,fechaCambioDePesada) {

        $.ajax({
            url: '/fn_consulta_TraerClientesCambiarPesadaCliente',
            method: 'GET',
            data: {
                inputCambiarPesadaCliente: inputCambiarPesadaCliente,
                fechaCambioDePesada:fechaCambioDePesada,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesCambiarPesada')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idCambiarPesadaCliente').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliCambiarPesada').attr("value", obj.codigoCli);
                            fn_DatosParaCambioPesada(obj.codigoCli,fechaCambioDePesada)

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

    function fn_DatosParaCambioPesada(codigoCliente,fechaCambioDePesada){
        $.ajax({
            url: '/fn_consulta_DatosParaCambioPesada',
            method: 'GET',
            data:{
                codigoCliente: codigoCliente,
                fechaCambioDePesada:fechaCambioDePesada,
            },
            success: function(response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    response.forEach(function(obj) {
                        $('#precioPrimerEspecieCambiarPesada').attr('value',obj.primerEspecie);
                        $('#precioSegundaEspecieCambiarPesada').attr('value',obj.segundaEspecie);
                        $('#precioTerceraEspecieCambiarPesada').attr('value',obj.terceraEspecie);
                        $('#precioCuartaEspecieCambiarPesada').attr('value',obj.cuartaEspecie);

                        $('#valorConversionPrimerEspecieCambiarPesada').attr('value',obj.valorConversionPrimerEspecie);
                        $('#valorConversionSegundaEspecieCambiarPesada').attr('value',obj.valorConversionSegundaEspecie);
                        $('#valorConversionTerceraEspecieCambiarPesada').attr('value',obj.valorConversionTerceraEspecie);
                        $('#valorConversionCuartaEspecieCambiarPesada').attr('value',obj.valorConversionCuartaEspecie);

                        $('#idProcesoCambiarPesada').attr('value',obj.idProceso);
                    });
    
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    $('#btnCambiarPesada').on('click', function () {

        let precioPrimerEspecieCambiarPesada = $('#precioPrimerEspecieCambiarPesada').attr('value');
        let precioSegundaEspecieCambiarPesada = $('#precioSegundaEspecieCambiarPesada').attr('value');
        let precioTerceraEspecieCambiarPesada = $('#precioTerceraEspecieCambiarPesada').attr('value');
        let precioCuartaEspecieCambiarPesada = $('#precioCuartaEspecieCambiarPesada').attr('value');

        let valorConversionPrimerEspecieCambiarPesada = $('#valorConversionPrimerEspecieCambiarPesada').attr('value');
        let valorConversionSegundaEspecieCambiarPesada = $('#valorConversionSegundaEspecieCambiarPesada').attr('value');
        let valorConversionTerceraEspecieCambiarPesada = $('#valorConversionTerceraEspecieCambiarPesada').attr('value');
        let valorConversionCuartaEspecieCambiarPesada = $('#valorConversionCuartaEspecieCambiarPesada').attr('value');

        let idProcesoCambiarPesada = $('#idProcesoCambiarPesada').attr('value');
        let codigoCliCambiarPesada = $('#selectedCodigoCliCambiarPesada').attr('value');

        let codPesadaActual = $('#codPesadaActual').attr('value');
        let especiePesadaActual = $('#especiePesadaActual').attr('value');

        let precioCambiarPesada = 0;
        let valorConversionCambiarPesada = 0;

        if (codigoCliCambiarPesada != 0){
            if (especiePesadaActual == primerEspecieGlobal){
                precioCambiarPesada = precioPrimerEspecieCambiarPesada;
                valorConversionCambiarPesada = valorConversionPrimerEspecieCambiarPesada;
            }else if (especiePesadaActual == segundaEspecieGlobal){
                precioCambiarPesada = precioSegundaEspecieCambiarPesada;
                valorConversionCambiarPesada = valorConversionSegundaEspecieCambiarPesada;
            }else if (especiePesadaActual == terceraEspecieGlobal){
                precioCambiarPesada = precioTerceraEspecieCambiarPesada;
                valorConversionCambiarPesada = valorConversionTerceraEspecieCambiarPesada;
            }else if (especiePesadaActual == cuartaEspecieGlobal){
                precioCambiarPesada = precioCuartaEspecieCambiarPesada;
                valorConversionCambiarPesada = valorConversionCuartaEspecieCambiarPesada;
            }

            fn_CambiarPesadaCliente(codPesadaActual,codigoCliCambiarPesada,idProcesoCambiarPesada,precioCambiarPesada,valorConversionCambiarPesada)
        }

    });

    function fn_CambiarPesadaCliente(codPesadaActual,codigoCliCambiarPesada,idProcesoCambiarPesada,precioCambiarPesada,valorConversionCambiarPesada){
        $.ajax({
            url: '/fn_consulta_CambiarPesadaCliente',
            method: 'GET',
            data: {
                codPesadaActual: codPesadaActual,
                codigoCliCambiarPesada: codigoCliCambiarPesada,
                idProcesoCambiarPesada:idProcesoCambiarPesada,
                precioCambiarPesada:precioCambiarPesada,
                valorConversionCambiarPesada:valorConversionCambiarPesada,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se cambio el registro correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalCambiarPesada').addClass('hidden');
                    $('#ModalCambiarPesada').removeClass('flex');
                    $('#filtrarPesadasDesdeHasta').trigger('click');
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
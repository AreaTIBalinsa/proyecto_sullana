import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function($) {

    fn_TraerPreciosXPresentacion();
    fn_TraerPreciosMinimos();

    DataTableED('#tablaPreciosXPresentacion');

    /* ============ Eventos ============ */

    $(document).on("dblclick", "#tablaPreciosXPresentacion #bodyPreciosXPresentacion tr td.precioColumna", function() {
        let fila = $(this).closest('tr');
        let idPrecioXPresentacion = fila.find('td:eq(0)').text();
        let nombrePrecioXPresentacion = fila.find('td:eq(1)').text();
        let nuevoPrecioXPresentacion = $(this).text();
        let idPresentacion = $(this).data('columna');
        let nombreColumna = $(this).closest('table').find('th:eq(' + (parseInt(idPresentacion)+1) + ')').text();
        
        $('#ModalPreciosXPresentacion').removeClass('hidden');
        $('#ModalPreciosXPresentacion').addClass('flex');
        $('#nombrePrecioXPresentacion').html(nombrePrecioXPresentacion);
        $('#nombrePresentacionModal').html(nombreColumna);

        $('#nuevoValorPrecioXPresentacion').val(nuevoPrecioXPresentacion);
        $('#idClientePrecioXPresentacion').attr("value",idPrecioXPresentacion);
        $('#idEspeciePrecioXActualizar').attr("value",idPresentacion);
        $('#nuevoValorPrecioXPresentacion').focus();
    });

    /* ============ Evento para abrir modal y editar precios de pollos ============ */

    $(document).on("dblclick", ".divPreciosMinimos .preciosMinimosEspecies", function() {
        // Obtén el precio del input actual
        let inputPrecioMinimo = $(this).val();
        
        // Obtén el valor del label dentro del contenedor actual
        let idEspecie = $(this).siblings("label").attr("value");
        
        $('#ModalPreciosMinimos').removeClass('hidden');
        $('#ModalPreciosMinimos').addClass('flex');
        $('#agregarPreciosMinimos').val(inputPrecioMinimo);
        $('#idEspeciePrecioMinimo').attr("value",idEspecie);
        $('#agregarPreciosMinimos').focus();
    });

    $('#btnGuardarPreciosMinimos').on('click', function () {
        let idEspecie = $('#idEspeciePrecioMinimo').attr("value");
        let precio = $('#agregarPreciosMinimos').val();
        fn_ActualizarPrecioMinimo(idEspecie, precio);
    });    

    $('.cerrarModalPreciosXPresentacion, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalPreciosXPresentacion').addClass('hidden');
            $('#ModalPreciosXPresentacion').removeClass('flex');
        }
    });

    $('.cerrarModalPreciosMinimos').on('click', function (e) {
        if (e.target === this) {
            $('#ModalPreciosMinimos').addClass('hidden');
            $('#ModalPreciosMinimos').removeClass('flex');
        }
    });

    $('#btnActualizarPreciosXPresentacion').on('click', function () {

        let idClienteActualizarPrecioXPresentacion = $('#idClientePrecioXPresentacion').attr("value");
        let valorActualizarPrecioXPresentacion = $('#nuevoValorPrecioXPresentacion').val();
        let numeroEspeciePrecioXPresentacion = $('#idEspeciePrecioXActualizar').attr("value");
        
        fn_ActualizarPrecioXPresentacion(idClienteActualizarPrecioXPresentacion, valorActualizarPrecioXPresentacion,numeroEspeciePrecioXPresentacion);
        $('#ModalPreciosXPresentacion').addClass('hidden');
        $('#ModalPreciosXPresentacion').removeClass('flex');
    });

    $('#btnGuardarNuevoPrecioPollo').on('click', function () {
        let valorNuevoPrecioPolloYugo = parseFloat($('#precioPolloYugo').val());
        let valorNuevoPrecioPolloPerla = parseFloat($('#precioPolloPerla').val());
        let valorNuevoPrecioPolloChimu = parseFloat($('#precioPolloChimu').val());
        let valorNuevoPrecioPolloxx = parseFloat($('#precioPolloxx').val());
    
        let totalConsultas = $('#tablaPreciosXPresentacion tbody tr').length;
        let consultasCompletadas = 0;
        let timerInterval;

        Swal.fire({
            title: '¡Atención!',
            html: 'Actualizando precios, no salga de la pagina.',
            timer: 999999999, // Establece un valor grande para que parezca indefinido
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        })
    
        $('#tablaPreciosXPresentacion tbody tr').each(function () {

            let idCodigoCliente = parseFloat($(this).find('td:eq(0)').text());
            let primerEspeciePolloYugo = parseFloat($(this).find('td:eq(2)').text());
            let segundaEspeciePolloPerla = parseFloat($(this).find('td:eq(3)').text());
            let terceraEspeciePolloChimu = parseFloat($(this).find('td:eq(4)').text());
            let cuartaEspeciePolloxx = parseFloat($(this).find('td:eq(5)').text());
    
            let resultadoEspecieUno = primerEspeciePolloYugo + valorNuevoPrecioPolloYugo;
            let resultadoEspecieDos = segundaEspeciePolloPerla + valorNuevoPrecioPolloPerla;
            let resultadoEspecieTres = terceraEspeciePolloChimu + valorNuevoPrecioPolloChimu;
            let resultadoEspecieCuatro = cuartaEspeciePolloxx + valorNuevoPrecioPolloxx;
    
            fn_AgregarNuevoPrecioPollo(idCodigoCliente, resultadoEspecieUno, resultadoEspecieDos, resultadoEspecieTres, resultadoEspecieCuatro, totalConsultas);
        });
    
        function fn_AgregarNuevoPrecioPollo(idCodigoCliente, resultadoEspecieUno, resultadoEspecieDos, resultadoEspecieTres, resultadoEspecieCuatro, totalConsultas) {
            $.ajax({
                url: '/fn_consulta_AgregarNuevoPrecioPollo',
                method: 'GET',
                data: {
                    idCodigoCliente: idCodigoCliente,
                    resultadoEspecieUno: resultadoEspecieUno,
                    resultadoEspecieDos: resultadoEspecieDos,
                    resultadoEspecieTres: resultadoEspecieTres,
                    resultadoEspecieCuatro: resultadoEspecieCuatro,
                },
                success: function (response) {
                    if (response.success) {
                        consultasCompletadas++;
                        if (consultasCompletadas === totalConsultas) {
                            clearInterval(timerInterval);
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Se actualizaron los precios correctamente',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            fn_TraerPreciosXPresentacion();
                            $('#precioPolloYugo').val("0.0");
                            $('#precioPolloPerla').val("0.0");
                            $('#precioPolloChimu').val("0.0");
                            $('#precioPolloxx').val("0.0");
                        }
                    }
                },
                error: function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error: Ocurrio un error inesperado durante la operacion',
                    })
                    console.error("ERROR", error);
                }
            });
        }
    });    

    /* ============ Funciones ============ */

    function fn_TraerPreciosMinimos(){
        $.ajax({
            url: '/fn_consulta_TraerPreciosMinimos',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                    if (Array.isArray(response)) {
                    // Obtener el select
                    $('#valorPrecioPolloVivoYugo').val(parseFloat(response[0].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoPerla').val(parseFloat(response[1].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoChimu').val(parseFloat(response[2].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoxx').val(parseFloat(response[3].precioMinimo).toFixed(2));

                    $('#valorPrecioPolloBeneficiadoPolloYugo').val(parseFloat(response[4].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoPolloPerla').val(parseFloat(response[5].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoPolloChimu').val(parseFloat(response[6].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoPolloxx').val(parseFloat(response[7].precioMinimo).toFixed(2));

                    $('#idPolloVivoYugo').attr('value', response[0].idPrecioMinimo);
                    $('#idPolloVivoPerla').attr('value', response[1].idPrecioMinimo);
                    $('#idPolloVivoChimu').attr('value', response[2].idPrecioMinimo);
                    $('#idPolloVivoxx').attr('value', response[3].idPrecioMinimo);
                    
                    $('#idPolloBeneficiadoYugo').attr('value', response[4].idPrecioMinimo);
                    $('#idPolloBeneficiadoPerla').attr('value', response[5].idPrecioMinimo);
                    $('#idPolloBeneficiadoChimu').attr('value', response[6].idPrecioMinimo);
                    $('#idPolloBeneficiadoxx').attr('value', response[7].idPrecioMinimo);

                    fn_pintarPreciosMinimos();

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    function fn_TraerPreciosXPresentacion(){
        $.ajax({
            url: '/fn_consulta_TraerPreciosXPresentacion',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyPrecios = $('#bodyPreciosXPresentacion');
                    tbodyPrecios.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="editPrecioXPresentacion bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPrecio));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="1">').text(obj.primerEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="2">').text(obj.segundaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="3">').text(obj.terceraEspecie));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer precioColumna" data-columna="4">').text(obj.cuartaEspecie));
                        nuevaFila.append($('<td class="hidden">').text(obj.idGrupo));

                        // Agregar la nueva fila al tbody
                        tbodyPrecios.append(nuevaFila);
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

    /* ============ Funcion para aumentar y restar precios de pollos ============ */

    function actualizarPrecio(elementId, operacion) {
        let $element = $(elementId);
        let valorPrecioActual = parseFloat($element.val());
        let resultado;
    
        if (operacion === 'sumar') {
            resultado = valorPrecioActual + 0.1;
        } else if (operacion === 'restar') {
            resultado = valorPrecioActual - 0.1;
        }
    
        $element.val(resultado.toFixed(1));
    }

    $('#restar_precioPolloYugo').on('click', function() {
        actualizarPrecio('#precioPolloYugo', 'restar');
    });
    
    $('#restar_precioPolloPerla').on('click', function() {
        actualizarPrecio('#precioPolloPerla', 'restar');
    });

    $('#restar_precioPolloChimu').on('click', function() {
        actualizarPrecio('#precioPolloChimu', 'restar');
    });

    $('#restar_precioPolloxx').on('click', function() {
        actualizarPrecio('#precioPolloxx', 'restar');
    });
    
    $('#sumar_precioPolloYugo').on('click', function() {
        actualizarPrecio('#precioPolloYugo', 'sumar');
    });
    
    $('#sumar_precioPolloPerla').on('click', function() {
        actualizarPrecio('#precioPolloPerla', 'sumar');
    });

    $('#sumar_precioPolloChimu').on('click', function() {
        actualizarPrecio('#precioPolloChimu', 'sumar');
    });

    $('#sumar_precioPolloxx').on('click', function() {
        actualizarPrecio('#precioPolloxx', 'sumar');
    });

    function fn_ActualizarPrecioXPresentacion(idClienteActualizarPrecioXPresentacion, valorActualizarPrecioXPresentacion,numeroEspeciePrecioXPresentacion){
        $.ajax({
            url: '/fn_consulta_ActualizarPrecioXPresentacion',
            method: 'GET',
            data: {
                idClienteActualizarPrecioXPresentacion: idClienteActualizarPrecioXPresentacion,
                valorActualizarPrecioXPresentacion: valorActualizarPrecioXPresentacion,
                numeroEspeciePrecioXPresentacion: numeroEspeciePrecioXPresentacion,
            },
            success: function(response) {
                if (response.success) {
                    $('#bodyPreciosXPresentacion tr').each(function () {
                        let idFila = $(this).find('td:eq(0)').text();
                        if (idFila == idClienteActualizarPrecioXPresentacion) {
                            $(this).find('td:eq(' + (parseInt(numeroEspeciePrecioXPresentacion)+1) + ')').text(parseFloat(valorActualizarPrecioXPresentacion).toFixed(2));
                            return false;
                        }
                    });                    
                    
                    alertify.notify('Se actualizo el precio correctamente', 'success', 2);
                    fn_pintarPreciosMinimos();
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

    $('#filtrarClientePrecios, #tipoPolloPrecios').on('input change', function() {
        let nombreFiltrar = $('#filtrarClientePrecios').val().toUpperCase(); ; // Obtiene el valor del campo de filtro
        let tipoPolloFiltrar = $('#tipoPolloPrecios').val(); // Obtiene el valor seleccionado del select

        // Mostrar todas las filas
        $('#tablaPreciosXPresentacion tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaPreciosXPresentacion tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }

        // Filtrar por tipo de pollo si se selecciona un valor en el select
        if (tipoPolloFiltrar !== "0") {
            $('#tablaPreciosXPresentacion tbody tr').each(function() {
                let columna = $(this).find('td:eq(6)').text().trim(); // Considerando que la columna es la 10 (índice 9)
                if (columna !== tipoPolloFiltrar) {
                    $(this).hide();
                }
            });
        }
    });

    fn_TraerGruposPrecios();

    function fn_TraerGruposPrecios(){
        $.ajax({
            url: '/fn_consulta_TraerGruposPrecios',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectTipoPollo = $('#tipoPolloPrecios');
                    
                    // Vaciar el select actual, si es necesario
                    selectTipoPollo.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectTipoPollo.append($('<option>', {
                        value: '0',
                        text: 'Todos'
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idGrupo,
                            text: obj.nombreGrupo
                        });
                        selectTipoPollo.append(option);
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

    function fn_ActualizarPrecioMinimo(idEspecie, precio){
        $.ajax({
            url: '/fn_consulta_ActualizarPrecioMinimo',
            method: 'GET',
            data: {
                idEspecie: idEspecie,
                precio: precio,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el precio minimo correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalPreciosMinimos').addClass('hidden');
                    $('#ModalPreciosMinimos').removeClass('flex');
                    fn_TraerPreciosMinimos();
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
    
    function fn_pintarPreciosMinimos() {

        let valorPrecioPolloVivoYugo = $('#valorPrecioPolloVivoYugo').val();
        let valorPrecioPolloVivoPerla = $('#valorPrecioPolloVivoPerla').val();
        let valorPrecioPolloVivoChimu = $('#valorPrecioPolloVivoChimu').val();
        let valorPrecioPolloVivoxx = $('#valorPrecioPolloVivoxx').val();

        let valorPrecioPolloBeneficiadoPolloYugo = $('#valorPrecioPolloBeneficiadoPolloYugo').val();
        let valorPrecioPolloBeneficiadoPolloPerla = $('#valorPrecioPolloBeneficiadoPolloPerla').val();
        let valorPrecioPolloBeneficiadoPolloChimu = $('#valorPrecioPolloBeneficiadoPolloChimu').val();
        let valorPrecioPolloBeneficiadoPolloxx = $('#valorPrecioPolloBeneficiadoPolloxx').val();

        $('#bodyPreciosXPresentacion tr').each(function() {
            // Encontrar la columna con el atributo data-columna
            $(this).find('td[data-columna]').each(function() {
                // Obtener el valor del atributo data-columna
                let columna = $(this).data('columna');
                // Obtener el valor dentro de la celda
                let valor = parseFloat($(this).text());
                // Obtener el valor de la columna 6
                let idGrupo = $(this).closest('tr').find('td:eq(6)').text();

                if (columna == 1){
                    if (idGrupo == 1 && valor < parseFloat(valorPrecioPolloVivoYugo) ){
                        $(this).removeClass("text-gray-900 dark:text-white");
                        $(this).addClass("text-white bg-red-600");
                    }else if (idGrupo == 2 && valor < parseFloat(valorPrecioPolloBeneficiadoPolloYugo) ){
                        $(this).removeClass("text-gray-900 dark:text-white");
                        $(this).addClass("text-white bg-red-600");
                    }else{
                        $(this).removeClass("text-white bg-red-600");
                        $(this).addClass("text-gray-900 dark:text-white");
                    }
                }else if (columna == 2){
                    if (idGrupo == 1 && valor < parseFloat(valorPrecioPolloVivoPerla) ){
                        $(this).removeClass("text-gray-900 dark:text-white");
                        $(this).addClass("text-white bg-red-600");
                    }else if (idGrupo == 2 && valor < parseFloat(valorPrecioPolloBeneficiadoPolloPerla) ){
                        $(this).removeClass("text-gray-900 dark:text-white");
                        $(this).addClass("text-white bg-red-600");
                    }else{
                        $(this).removeClass("text-white bg-red-600");
                        $(this).addClass("text-gray-900 dark:text-white");
                    }
                }else if (columna == 3){
                    if (idGrupo == 1 && valor < parseFloat(valorPrecioPolloVivoChimu) ){
                        $(this).removeClass("text-gray-900 dark:text-white");
                        $(this).addClass("text-white bg-red-600");
                    }else if (idGrupo == 2 && valor < parseFloat(valorPrecioPolloBeneficiadoPolloChimu) ){
                        $(this).removeClass("text-gray-900 dark:text-white");
                        $(this).addClass("text-white bg-red-600");
                    }else{
                        $(this).removeClass("text-white bg-red-600");
                        $(this).addClass("text-gray-900 dark:text-white");
                    }
                }else if (columna == 4){
                    if (idGrupo == 1 && valor < parseFloat(valorPrecioPolloVivoxx) ){
                        $(this).removeClass("text-gray-900 dark:text-white");
                        $(this).addClass("text-white bg-red-600");
                    }else if (idGrupo == 2 && valor < parseFloat(valorPrecioPolloBeneficiadoPolloxx) ){
                        $(this).removeClass("text-gray-900 dark:text-white");
                        $(this).addClass("text-white bg-red-600");
                    }else{
                        $(this).removeClass("text-white bg-red-600");
                        $(this).addClass("text-gray-900 dark:text-white");
                    }
                }
            });
        });
    }

});
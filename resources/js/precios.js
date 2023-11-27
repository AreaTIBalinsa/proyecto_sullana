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
        let valorNuevoPrecioPolloVivo = parseFloat($('#precioPolloVivo').val());
        let valorNuevoPrecioPolloPelado = parseFloat($('#precioPolloPelado').val());
        let valorNuevoPrecioPolloTecnicoVivo = parseFloat($('#precioPolloTecnicoVivo').val());
        let valorNuevoPrecioPolloTecnicoPelado = parseFloat($('#precioPolloTecnicoPelado').val());
        let valorNuevoPrecioGallinaDoble = parseFloat($('#precioGallinaDoble').val());
        let valorNuevoPrecioGallinaChica = parseFloat($('#precioGallinaChica').val());
        let valorNuevoPrecioGallo = parseFloat($('#precioGallo').val());
        let valorNuevoPrecioPolloMaltratado = parseFloat($('#precioPolloMaltratado').val());
        let valorNuevoPrecioPolloPechuga= parseFloat($('#precioPolloPechuga').val());
        let valorNuevoPrecioPolloPierna = parseFloat($('#precioPolloPierna').val());
        let valorNuevoPrecioPolloAlas = parseFloat($('#precioPolloAlas').val());
        let valorNuevoPrecioPolloMenudencia = parseFloat($('#precioPolloMenudencia').val());
        let valorNuevoPrecioPolloDorso = parseFloat($('#precioPolloDorso').val());
        let valorNuevoPrecioPolloOtros = parseFloat($('#precioPolloOtros').val());
        
    
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
            let primerEspeciePolloVivo = parseFloat($(this).find('td:eq(2)').text());
            let segundaEspeciePolloPelado = parseFloat($(this).find('td:eq(3)').text());
            let terceraEspeciePolloTecnicoVivo = parseFloat($(this).find('td:eq(4)').text());
            let cuartaEspeciePolloTecnicoPelado = parseFloat($(this).find('td:eq(5)').text());
            let quintaEspecieGallinaDoble = parseFloat($(this).find('td:eq(6)').text());
            let sextaEspecieGallinaChica = parseFloat($(this).find('td:eq(7)').text());
            let septimaEspecieGallo = parseFloat($(this).find('td:eq(8)').text());
            let octavaEspeciePolloMaltratado = parseFloat($(this).find('td:eq(9)').text());
            let novenaEspeciePolloPechuga = parseFloat($(this).find('td:eq(10)').text());
            let decimaEspeciePierna = parseFloat($(this).find('td:eq(11)').text());
            let decimaPrimeraEspeciePolloAlas = parseFloat($(this).find('td:eq(12)').text());
            let decimaSegundaEspeciePolloMenudencia = parseFloat($(this).find('td:eq(13)').text());
            let decimaTerceraEspeciePolloDorso = parseFloat($(this).find('td:eq(14)').text());
            let decimacuartaEspeciePolloMOtros = parseFloat($(this).find('td:eq(15)').text());
    
            let resultadoEspecieUno = primerEspeciePolloVivo + valorNuevoPrecioPolloVivo;
            let resultadoEspecieDos = segundaEspeciePolloPelado + valorNuevoPrecioPolloPelado;
            let resultadoEspecieTres = terceraEspeciePolloTecnicoVivo + valorNuevoPrecioPolloTecnicoVivo;
            let resultadoEspecieCuatro = cuartaEspeciePolloTecnicoPelado + valorNuevoPrecioPolloTecnicoPelado;
            let resultadoEspecieCinco = quintaEspecieGallinaDoble + valorNuevoPrecioGallinaDoble;
            let resultadoEspecieSeis = sextaEspecieGallinaChica + valorNuevoPrecioGallinaChica;
            let resultadoEspecieSiete = septimaEspecieGallo + valorNuevoPrecioGallo;
            let resultadoEspecieOcho = octavaEspeciePolloMaltratado + valorNuevoPrecioPolloMaltratado;
            let resultadoEspecieNueve = novenaEspeciePolloPechuga + valorNuevoPrecioPolloPechuga;
            let resultadoEspecieDiez = decimaEspeciePierna + valorNuevoPrecioPolloPierna;
            let resultadoEspecieOnce = decimaPrimeraEspeciePolloAlas + valorNuevoPrecioPolloAlas;
            let resultadoEspecieDoce = decimaSegundaEspeciePolloMenudencia + valorNuevoPrecioPolloMenudencia;
            let resultadoEspecieTrece = decimaTerceraEspeciePolloDorso + valorNuevoPrecioPolloDorso;
            let resultadoEspecieCatorce = decimacuartaEspeciePolloMOtros + valorNuevoPrecioPolloOtros;
    
            fn_AgregarNuevoPrecioPollo(idCodigoCliente, resultadoEspecieUno, resultadoEspecieDos, resultadoEspecieTres, resultadoEspecieCuatro, resultadoEspecieCinco, resultadoEspecieSeis, resultadoEspecieSiete, resultadoEspecieOcho, resultadoEspecieNueve, resultadoEspecieDiez, resultadoEspecieOnce, resultadoEspecieDoce, resultadoEspecieTrece, resultadoEspecieCatorce, totalConsultas);
        });
    
        function fn_AgregarNuevoPrecioPollo(idCodigoCliente, resultadoEspecieUno, resultadoEspecieDos, resultadoEspecieTres, resultadoEspecieCuatro, resultadoEspecieCinco, resultadoEspecieSeis, resultadoEspecieSiete, resultadoEspecieOcho, resultadoEspecieNueve, resultadoEspecieDiez, resultadoEspecieOnce, resultadoEspecieDoce, resultadoEspecieTrece, resultadoEspecieCatorce, totalConsultas) {
            $.ajax({
                url: '/fn_consulta_AgregarNuevoPrecioPollo',
                method: 'GET',
                data: {
                    idCodigoCliente: idCodigoCliente,
                    resultadoEspecieUno: resultadoEspecieUno,
                    resultadoEspecieDos: resultadoEspecieDos,
                    resultadoEspecieTres: resultadoEspecieTres,
                    resultadoEspecieCuatro: resultadoEspecieCuatro,
                    resultadoEspecieCinco: resultadoEspecieCinco,
                    resultadoEspecieSeis: resultadoEspecieSeis,
                    resultadoEspecieSiete: resultadoEspecieSiete,
                    resultadoEspecieOcho: resultadoEspecieOcho,
                    resultadoEspecieNueve: resultadoEspecieNueve,
                    resultadoEspecieDiez: resultadoEspecieDiez,
                    resultadoEspecieOnce: resultadoEspecieOnce,
                    resultadoEspecieDoce: resultadoEspecieDoce,
                    resultadoEspecieTrece: resultadoEspecieTrece,
                    resultadoEspecieCatorce: resultadoEspecieCatorce,
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
                            $('#precioPolloVivo').val("0.0");
                            $('#precioPolloPelado').val("0.0");
                            $('#precioPolloTecnicoVivo').val("0.0");
                            $('#precioPolloTecnicoPelado').val("0.0");
                            $('#precioGallinaDoble').val("0.0");
                            $('#precioGallinaChica').val("0.0");
                            $('#precioGallo').val("0.0");
                            $('#precioPolloMaltratado').val("0.0");
                            $('#precioPolloPechuga').val("0.0");
                            $('#precioPolloPierna').val("0.0");
                            $('#precioPolloAlas').val("0.0");
                            $('#precioPolloMenudencia').val("0.0");
                            $('#precioPolloDorso').val("0.0");
                            $('#precioPolloOtros').val("0.0");
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
                    // Obtener el select de los preciosminimos de pollos vivos
                    $('#valorPrecioPolloVivo').val(parseFloat(response[0].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoPelado').val(parseFloat(response[1].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoTecnicoVivo').val(parseFloat(response[2].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloTecnicoPelado').val(parseFloat(response[3].precioMinimo).toFixed(2));
                    $('#valorPrecioGallinaDobleVivo').val(parseFloat(response[4].precioMinimo).toFixed(2));
                    $('#valorPrecioGallinaChicaVivo').val(parseFloat(response[5].precioMinimo).toFixed(2));
                    $('#valorPrecioGalloVivo').val(parseFloat(response[6].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoMaltratado').val(parseFloat(response[7].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoPechuga').val(parseFloat(response[8].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoPierna').val(parseFloat(response[9].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoAlas').val(parseFloat(response[10].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoMenudencia').val(parseFloat(response[11].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoDorso').val(parseFloat(response[12].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoOtros').val(parseFloat(response[13].precioMinimo).toFixed(2));
                    // Obtener el select de los preciosminimos de pollos beneficiados
                    $('#valorPrecioPolloBeneficiadoVivo').val(parseFloat(response[14].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoPolloPelado').val(parseFloat(response[15].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoPolloTecnicoVivo').val(parseFloat(response[16].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoPolloTecnicoPelado').val(parseFloat(response[17].precioMinimo).toFixed(2));
                    $('#valorPrecioGallinaDobleBeneficiado').val(parseFloat(response[18].precioMinimo).toFixed(2));
                    $('#valorPrecioGallinaChicaBeneficiado').val(parseFloat(response[19].precioMinimo).toFixed(2));
                    $('#valorPrecioGalloBeneficiado').val(parseFloat(response[20].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoMaltratado').val(parseFloat(response[21].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoPechuga').val(parseFloat(response[22].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoPierna').val(parseFloat(response[23].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoAlas').val(parseFloat(response[24].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoMenudencia').val(parseFloat(response[25].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoDorso').val(parseFloat(response[26].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloBeneficiadoPolloxx').val(parseFloat(response[27].precioMinimo).toFixed(2));

                    $('#idPolloVivo').attr('value', response[0].idPrecioMinimo);
                    $('#idPolloVivoPelado').attr('value', response[1].idPrecioMinimo);
                    $('#idPolloVivoTecnicoVivo').attr('value', response[2].idPrecioMinimo);
                    $('#idPolloTecnicoPelado').attr('value', response[3].idPrecioMinimo);
                    $('#idGallinaDobleVivo').attr('value', response[4].idPrecioMinimo);
                    $('#idGallinaChicaVivo').attr('value', response[5].idPrecioMinimo);
                    $('#idGalloVivo').attr('value', response[6].idPrecioMinimo);
                    $('#idPolloVivoMaltratado').attr('value', response[7].idPrecioMinimo);
                    $('#idPolloVivoPechuga').attr('value', response[8].idPrecioMinimo);
                    $('#idPolloVivoPierna').attr('value', response[9].idPrecioMinimo);
                    $('#idPolloVivoAlas').attr('value', response[10].idPrecioMinimo);
                    $('#idPolloVivoMenudencia').attr('value', response[11].idPrecioMinimo);
                    $('#idPolloVivoDorso').attr('value', response[12].idPrecioMinimo);
                    $('#idPolloVivoOtros').attr('value', response[13].idPrecioMinimo);
                    
                    $('#idPolloBeneficiadoVivo').attr('value', response[14].idPrecioMinimo);
                    $('#idPolloBeneficiadoPelado').attr('value', response[15].idPrecioMinimo);
                    $('#idPolloBeneficiadoTecnicoVivo').attr('value', response[16].idPrecioMinimo);
                    $('#idPolloBeneficiadoTecnicoPelado').attr('value', response[17].idPrecioMinimo);
                    $('#idGallinaDobleBeneficiado').attr('value', response[18].idPrecioMinimo);
                    $('#idGallinaChicaBeneficiado').attr('value', response[19].idPrecioMinimo);
                    $('#idGalloBeneficiado').attr('value', response[20].idPrecioMinimo);
                    $('#idPolloBeneficiadoMaltratado').attr('value', response[21].idPrecioMinimo);
                    $('#idPolloBeneficiadoPechuga').attr('value', response[22].idPrecioMinimo);
                    $('#idPolloBeneficiadoPierna').attr('value', response[23].idPrecioMinimo);
                    $('#idPolloBeneficiadoAlas').attr('value', response[24].idPrecioMinimo);
                    $('#idPolloBeneficiadoMenudencia').attr('value', response[25].idPrecioMinimo);
                    $('#idPolloBeneficiadoDorso').attr('value', response[26].idPrecioMinimo);
                    $('#idPolloBeneficiadoOtros').attr('value', response[27].idPrecioMinimo);

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
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="4">').text(obj.cuartaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="5">').text(obj.quintaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="6">').text(obj.sextaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="7">').text(obj.septimaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="8">').text(obj.octavaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="9">').text(obj.novenaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="11">').text(obj.decimaPrimeraEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="12">').text(obj.decimaSegundaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="13">').text(obj.decimaTerceraEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="14">').text(obj.decimaCuartaEspecie));
                        nuevaFila.append($('<td class="px-4 py-2 text-center cursor-pointer precioColumna" data-columna="15">').text(obj.decimaQuintaOtrasEspecies));
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

    $('#restar_precioPolloVivo').on('click', function() {
        actualizarPrecio('#precioPolloVivo', 'restar');
    });
    
    $('#restar_precioPolloPelado').on('click', function() {
        actualizarPrecio('#precioPolloPelado', 'restar');
    });

    $('#restar_precioPolloTecnicoVivo').on('click', function() {
        actualizarPrecio('#precioPolloTecnicoVivo', 'restar');
    });

    $('#restar_precioPolloTecnicoPelado').on('click', function() {
        actualizarPrecio('#precioPolloTecnicoPelado', 'restar');
    });

    $('#restar_precioGallinaDoble').on('click', function() {
        actualizarPrecio('#precioGallinaDoble', 'restar');
    });

    $('#restar_precioGallinaChica').on('click', function() {
        actualizarPrecio('#precioGallinaChica', 'restar');
    });

    $('#restar_precioGallo').on('click', function() {
        actualizarPrecio('#precioGallo', 'restar');
    });

    $('#restar_precioPolloMaltratado').on('click', function() {
        actualizarPrecio('#precioPolloMaltratado', 'restar');
    });

    $('#restar_precioPolloPechuga').on('click', function() {
        actualizarPrecio('#precioPolloPechuga', 'restar');
    });

    $('#restar_precioPolloPierna').on('click', function() {
        actualizarPrecio('#precioPolloPierna', 'restar');
    });

    $('#restar_precioPolloAlas').on('click', function() {
        actualizarPrecio('#precioPolloAlas', 'restar');
    });

    $('#restar_precioPolloMenudencia').on('click', function() {
        actualizarPrecio('#precioPolloMenudencia', 'restar');
    });

    $('#restar_precioPolloDorso').on('click', function() {
        actualizarPrecio('#precioPolloDorso', 'restar');
    });

    $('#restar_precioPolloOtros').on('click', function() {
        actualizarPrecio('#precioPolloOtros', 'restar');
    });
    
    $('#sumar_precioPolloVivo').on('click', function() {
        actualizarPrecio('#precioPolloVivo', 'sumar');
    });
    
    $('#sumar_precioPolloPelado').on('click', function() {
        actualizarPrecio('#precioPolloPelado', 'sumar');
    });

    $('#sumar_precioPolloTecnicoVivo').on('click', function() {
        actualizarPrecio('#precioPolloTecnicoVivo', 'sumar');
    });

    $('#sumar_precioPolloTecnicoPelado').on('click', function() {
        actualizarPrecio('#precioPolloTecnicoPelado', 'sumar');
    });

    $('#sumar_precioGallinaDoble').on('click', function() {
        actualizarPrecio('#precioGallinaDoble', 'sumar');
    });

    $('#sumar_precioGallinaChica').on('click', function() {
        actualizarPrecio('#precioGallinaChica', 'sumar');
    });

    $('#sumar_precioGallo').on('click', function() {
        actualizarPrecio('#precioGallo', 'sumar');
    });

    $('#sumar_precioPolloMaltratado').on('click', function() {
        actualizarPrecio('#precioPolloMaltratado', 'sumar');
    });

    $('#sumar_precioPolloPechuga').on('click', function() {
        actualizarPrecio('#precioPolloPechuga', 'sumar');
    });

    $('#sumar_precioPolloPierna').on('click', function() {
        actualizarPrecio('#precioPolloPierna', 'sumar');
    });

    $('#sumar_precioPolloAlas').on('click', function() {
        actualizarPrecio('#precioPolloAlas', 'sumar');
    });

    $('#sumar_precioPolloMenudencia').on('click', function() {
        actualizarPrecio('#precioPolloMenudencia', 'sumar');
    });

    $('#sumar_precioPolloDorso').on('click', function() {
        actualizarPrecio('#precioPolloDorso', 'sumar');
    });

    $('#sumar_precioPolloOtros').on('click', function() {
        actualizarPrecio('#precioPolloOtros', 'sumar');
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
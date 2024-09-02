import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function($) {

    fn_TraerPreciosXPresentacion();
    fn_TraerPreciosMinimos();

    DataTableED('#tablaPreciosXPresentacion');

    /* ============ Eventos ============ */

    // $(document).on("dblclick", "#tablaPreciosXPresentacion #bodyPreciosXPresentacion tr td.precioColumna", function() {
    //     let fila = $(this).closest('tr');
    //     let idPrecioXPresentacion = fila.find('td:eq(0)').text();
    //     let nombrePrecioXPresentacion = fila.find('td:eq(1)').text();
    //     let nuevoPrecioXPresentacion = $(this).text();
    //     let idPresentacion = $(this).data('columna');
    //     let nombreColumna = $(this).closest('table').find('th:eq(' + (parseInt(idPresentacion)+1) + ')').text();
        
    //     $('#ModalPreciosXPresentacion').removeClass('hidden');
    //     $('#ModalPreciosXPresentacion').addClass('flex');
    //     $('#nombrePrecioXPresentacion').html(nombrePrecioXPresentacion);
    //     $('#nombrePresentacionModal').html(nombreColumna);

    //     $('#nuevoValorPrecioXPresentacion').val(nuevoPrecioXPresentacion);
    //     $('#idClientePrecioXPresentacion').attr("value",idPrecioXPresentacion);
    //     $('#idEspeciePrecioXActualizar').attr("value",idPresentacion);
    //     $('#nuevoValorPrecioXPresentacion').focus();
    // });

    /* ============ Evento para abrir modal y editar precios de pollos ============ */

    $(document).on("dblclick contextmenu", ".divPreciosMinimos .preciosMinimosEspecies", function(e) {
        e.preventDefault();
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

    $('.cerrarModalPreciosXPresentacion, #ModalPreciosXPresentacion .opacity-75').on('click', function (e) {
        $('#ModalPreciosXPresentacion').addClass('hidden');
        $('#ModalPreciosXPresentacion').removeClass('flex');
    });

    $('.cerrarModalPreciosMinimos, #ModalPreciosMinimos .opacity-75').on('click', function (e) {
        $('#ModalPreciosMinimos').addClass('hidden');
        $('#ModalPreciosMinimos').removeClass('flex');
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
        
        $("#btnGuardarNuevoPrecioPollo").attr('disabled','disabled');
        const precios = [
            'precioPolloVivo', 'precioPolloPelado', 'precioPolloTecnicoVivo', 'precioPolloTecnicoPelado',
            'precioGallinaDoble', 'precioGallinaChica', 'precioGallo', 'precioPolloMaltratado',
            'precioPolloPechuga', 'precioPolloPierna', 'precioPolloAlas', 'precioPolloMenudencia',
            'precioPolloDorso', 'precioPolloOtros', 'precioPolloxx', 'precioBrasaYugo',
            'precioBrasaTecnico', 'precioPolloxxVivo', 'precioGallinaDobleVivo', 'precioGallinaChicaVivo',
            'precioGalloVivo', 'precioMaltratadoVivo'
        ];
    
        let valoresNuevosPrecios = precios.map(id => parseFloat($(`#${id}`).val()));
    
        Swal.fire({
            title: '¡Atención!',
            html: 'Actualizando precios, no salga de la página.',
            timer: 999999999, // Establece un valor grande para que parezca indefinido
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false, 
            didOpen: () => {
                Swal.showLoading();
            }
        });
    
        let consultas = [];
        $('#tablaPreciosXPresentacion tbody tr').each(function () {
            let idCodigoCliente = $(this).find('td:eq(0)').text();
            
            let valoresActuales = $(this).find('td:gt(1)').map(function () {
                return parseFloat($(this).text());
            }).get();
    
            let resultados = valoresActuales.map((valor, index) => valor + valoresNuevosPrecios[index]);
    
            // Definir los nombres de los resultados para coincidir con los nombres en el controlador
            let nombresResultado = [
                'resultadoEspecieUno', 'resultadoEspecieDos', 'resultadoEspecieTres', 'resultadoEspecieCuatro',
                'resultadoEspecieCinco', 'resultadoEspecieSeis', 'resultadoEspecieSiete', 'resultadoEspecieOcho',
                'resultadoEspecieNueve', 'resultadoEspecieDiez', 'resultadoEspecieOnce', 'resultadoEspecieDoce',
                'resultadoEspecieTrece', 'resultadoEspecieCatorce', 'resultadoEspecieQuince', 'resultadoEspecieDieciseis',
                'resultadoEspecieDiecisiete', 'resultadoEspecieDieciocho', 'resultadoEspecieDiecinueve', 'resultadoEspecieVeinte',
                'resultadoEspecieVeinteUno', 'resultadoEspecieVeinteDos'
            ];
    
            // Crear la promesa de la llamada AJAX y almacenarla en el arreglo consultas
            let consulta = $.ajax({
                url: '/fn_consulta_AgregarNuevoPrecioPollo',
                method: 'GET',
                data: Object.assign({
                    idCodigoCliente: idCodigoCliente
                }, ...resultados.map((resultado, i) => ({ [nombresResultado[i]]: resultado })))
            });
    
            consultas.push(consulta);
        });
    
        // Ejecutar todas las consultas en paralelo
        Promise.all(consultas)
            .then(responses => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se actualizaron los precios correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                fn_TraerPreciosXPresentacion();
                resetInputs(precios); // Restablecer los inputs después de la operación
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error: Ocurrió un error inesperado durante la operación',
                });
                console.error("ERROR", error);
            });
    
        // Función para restablecer los valores de los inputs
        function resetInputs(ids) {
            $("#btnGuardarNuevoPrecioPollo").removeAttr('disabled');
            ids.forEach(id => {
                $(`#${id}`).val("0.0");
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
                    $('#valorPrecioGallinaDoblePelado').val(parseFloat(response[4].precioMinimo).toFixed(2));
                    $('#valorPrecioGallinaChicaPelado').val(parseFloat(response[5].precioMinimo).toFixed(2));
                    $('#valorPrecioGalloPelado').val(parseFloat(response[6].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoMaltratado').val(parseFloat(response[7].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoPechuga').val(parseFloat(response[8].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoPierna').val(parseFloat(response[9].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoAlas').val(parseFloat(response[10].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoMenudencia').val(parseFloat(response[11].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoDorso').val(parseFloat(response[12].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloVivoOtros').val(parseFloat(response[13].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloxx').val(parseFloat(response[14].precioMinimo).toFixed(2));
                    $('#valorPrecioBrasaYugo').val(parseFloat(response[15].precioMinimo).toFixed(2));
                    $('#valorPrecioBrasaTecnico').val(parseFloat(response[16].precioMinimo).toFixed(2));
                    $('#valorPrecioPolloxxVivo').val(parseFloat(response[17].precioMinimo).toFixed(2));
                    $('#valorPrecioGallinaDobleVivo').val(parseFloat(response[18].precioMinimo).toFixed(2));
                    $('#valorPrecioGallinaChicaVivo').val(parseFloat(response[19].precioMinimo).toFixed(2));
                    $('#valorPrecioGalloVivo').val(parseFloat(response[20].precioMinimo).toFixed(2));
                    $('#valorPrecioMaltratadoVivo').val(parseFloat(response[21].precioMinimo).toFixed(2));

                    $('#idPolloVivo').attr('value', response[0].idPrecioMinimo);
                    $('#idPolloVivoPelado').attr('value', response[1].idPrecioMinimo);
                    $('#idPolloVivoTecnicoVivo').attr('value', response[2].idPrecioMinimo);
                    $('#idPolloTecnicoPelado').attr('value', response[3].idPrecioMinimo);
                    $('#idGallinaDoblePelado').attr('value', response[4].idPrecioMinimo);
                    $('#idGallinaChicaPelado').attr('value', response[5].idPrecioMinimo);
                    $('#idGalloPelado').attr('value', response[6].idPrecioMinimo);
                    $('#idPolloVivoMaltratado').attr('value', response[7].idPrecioMinimo);
                    $('#idPolloVivoPechuga').attr('value', response[8].idPrecioMinimo);
                    $('#idPolloVivoPierna').attr('value', response[9].idPrecioMinimo);
                    $('#idPolloVivoAlas').attr('value', response[10].idPrecioMinimo);
                    $('#idPolloVivoMenudencia').attr('value', response[11].idPrecioMinimo);
                    $('#idPolloVivoDorso').attr('value', response[12].idPrecioMinimo);
                    $('#idPolloVivoOtros').attr('value', response[13].idPrecioMinimo);
                    $('#idPolloxx').attr('value', response[14].idPrecioMinimo);
                    $('#idBrasaYugo').attr('value', response[15].idPrecioMinimo);
                    $('#idBrasaTecnico').attr('value', response[16].idPrecioMinimo);
                    $('#idPolloxxVivo').attr('value', response[17].idPrecioMinimo);
                    $('#idGallinaDobleVivo').attr('value', response[18].idPrecioMinimo);
                    $('#idGallinaChicaVivo').attr('value', response[19].idPrecioMinimo);
                    $('#idGalloVivo').attr('value', response[20].idPrecioMinimo);
                    $('#idMaltratadoVivo').attr('value', response[21].idPrecioMinimo);

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
                        let nuevaFila = $('<tr class="editPrecioXPresentacion bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 text-black dark:text-white dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idPrecio));
                        nuevaFila.append($('<td class="dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white sticky left-0 dark:bg-gray-800 bg-white border-r-2">').text(obj.nombreCompleto));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="1">').text(obj.primerEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="2">').text(obj.segundaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="3">').text(obj.terceraEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="4">').text(obj.cuartaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="5">').text(obj.quintaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="6">').text(obj.sextaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="7">').text(obj.septimaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="8">').text(obj.octavaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="9">').text(obj.decimaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="10">').text(obj.decimaPrimeraEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="11">').text(obj.decimaSegundaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="12">').text(obj.decimaTerceraEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="13">').text(obj.decimaCuartaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="14">').text(obj.decimaQuintaOtrasEspecies));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="15">').text(obj.decimaSextaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="16">').text(obj.decimaSeptimaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="17">').text(obj.decimaOctavaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="18">').text(obj.decimaNovenaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="19">').text(obj.vigesimaEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="20">').text(obj.vigesimaPrimeraEspecie));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center cursor-pointer precioColumna" data-columna="21">').text(obj.vigesimaSegundaEspecie));
                        nuevaFila.append($('<td class="p-2 text-center cursor-pointer precioColumna" data-columna="22">').text(obj.vigesimaTerceraEspecie));
                        nuevaFila.append($('<td class="hidden">').text(obj.idGrupo));

                        // Agregar la nueva fila al tbody
                        tbodyPrecios.append(nuevaFila);
                    });
                    fn_pintarPreciosMinimos()
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
    $('#restar_precioPolloxx').on('click', function() {
        actualizarPrecio('#precioPolloxx', 'restar');
    });
    $('#restar_precioBrasaYugo').on('click', function() {
        actualizarPrecio('#precioBrasaYugo', 'restar');
    });
    $('#restar_precioBrasaTecnico').on('click', function() {
        actualizarPrecio('#precioBrasaTecnico', 'restar');
    });

    $('#restar_precioPolloxxVivo').on('click', function() {
        actualizarPrecio('#precioPolloxxVivo', 'restar');
    });

    $('#restar_precioGallinaDobleVivo').on('click', function() {
        actualizarPrecio('#precioGallinaDobleVivo', 'restar');
    });

    $('#restar_precioGallinaChicaVivo').on('click', function() {
        actualizarPrecio('#precioGallinaChicaVivo', 'restar');
    });

    $('#restar_precioGalloVivo').on('click', function() {
        actualizarPrecio('#precioGalloVivo', 'restar');
    });

    $('#restar_precioMaltratadoVivo').on('click', function() {
        actualizarPrecio('#precioMaltratadoVivo', 'restar');
    });

    //funciones para sumar
    
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

    $('#sumar_precioPolloxx').on('click', function() {
        actualizarPrecio('#precioPolloxx', 'sumar');
    });

    $('#sumar_precioBrasaYugo').on('click', function() {
        actualizarPrecio('#precioBrasaYugo', 'sumar');
    });

    $('#sumar_precioBrasaTecnico').on('click', function() {
        actualizarPrecio('#precioBrasaTecnico', 'sumar');
    });

    $('#sumar_precioPolloxxVivo').on('click', function() {
        actualizarPrecio('#precioPolloxxVivo', 'sumar');
    });

    $('#sumar_precioGallinaDobleVivo').on('click', function() {
        actualizarPrecio('#precioGallinaDobleVivo', 'sumar');
    });

    $('#sumar_precioGallinaChicaVivo').on('click', function() {
        actualizarPrecio('#precioGallinaChicaVivo', 'sumar');
    });

    $('#sumar_precioGalloVivo').on('click', function() {
        actualizarPrecio('#precioGalloVivo', 'sumar');
    });

    $('#sumar_precioMaltratadoVivo').on('click', function() {
        actualizarPrecio('#precioMaltratadoVivo', 'sumar');
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
                            if (parseInt(numeroEspeciePrecioXPresentacion)+1 == 3){
                                $(this).find('td:eq(17)').text(parseFloat(valorActualizarPrecioXPresentacion).toFixed(2));
                            }
                            if (parseInt(numeroEspeciePrecioXPresentacion)+1 == 5){
                                $(this).find('td:eq(18)').text(parseFloat(valorActualizarPrecioXPresentacion).toFixed(2));
                            }
                            if (parseInt(numeroEspeciePrecioXPresentacion)+1 == 17){
                                $(this).find('td:eq(3)').text(parseFloat(valorActualizarPrecioXPresentacion).toFixed(2));
                            }
                            if (parseInt(numeroEspeciePrecioXPresentacion)+1 == 18){
                                $(this).find('td:eq(5)').text(parseFloat(valorActualizarPrecioXPresentacion).toFixed(2));
                            }
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

    $('#filtrarClientePrecios').on('input', function() {
        let nombreFiltrar = $('#filtrarClientePrecios').val().toUpperCase(); ; // Obtiene el valor del campo de filtro

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
    });

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

        let valorPrecioPolloVivo = $('#valorPrecioPolloVivo').val();
        let valorPrecioPolloVivoPelado = $('#valorPrecioPolloVivoPelado').val();
        let valorPrecioPolloVivoTecnicoVivo = $('#valorPrecioPolloVivoTecnicoVivo').val();
        let valorPrecioPolloTecnicoPelado = $('#valorPrecioPolloTecnicoPelado').val();
        let valorPrecioGallinaDoblePelado = $('#valorPrecioGallinaDoblePelado').val();
        let valorPrecioGallinaChicaPelado = $('#valorPrecioGallinaChicaPelado').val();
        let valorPrecioGalloPelado = $('#valorPrecioGalloPelado').val();
        let valorPrecioPolloVivoMaltratado = $('#valorPrecioPolloVivoMaltratado').val();
        let valorPrecioPolloVivoPechuga = $('#valorPrecioPolloVivoPechuga').val();
        let valorPrecioPolloVivoPierna = $('#valorPrecioPolloVivoPierna').val();
        let valorPrecioPolloVivoAlas = $('#valorPrecioPolloVivoAlas').val();
        let valorPrecioPolloVivoMenudencia = $('#valorPrecioPolloVivoMenudencia').val();
        let valorPrecioPolloVivoDorso = $('#valorPrecioPolloVivoDorso').val();
        let valorPrecioPolloVivoOtros = $('#valorPrecioPolloVivoOtros').val();
        let valorPrecioPolloxx = $('#valorPrecioPolloxx').val();
        let valorPrecioBrasaYugo = $('#valorPrecioBrasaYugo').val();
        let valorPrecioBrasaTecnico = $('#valorPrecioBrasaTecnico').val();
        let valorPrecioPolloxxVivo = $('#valorPrecioPolloxxVivo').val();
        let valorPrecioGallinaDobleVivo = $('#valorPrecioGallinaDobleVivo').val();
        let valorPrecioGallinaChicaVivo = $('#valorPrecioGallinaChicaVivo').val();
        let valorPrecioGalloVivo = $('#valorPrecioGalloVivo').val();
        let valorPrecioMaltratadoVivo = $('#valorPrecioMaltratadoVivo').val();

        function fn_pintarCeldas(valor, valorMinimo, elemento){
            if (valor < parseFloat(valorMinimo) ){
                $(elemento).removeClass("text-gray-900 dark:text-white");
                $(elemento).addClass("text-white bg-red-600");
            }else{
                $(elemento).removeClass("text-white bg-red-600");
                $(elemento).addClass("text-gray-900 dark:text-white");
            }
        }

        $('#bodyPreciosXPresentacion tr').each(function() {
            // Encontrar la columna con el atributo data-columna
            $(this).find('td[data-columna]').each(function() {
                // Obtener el valor del atributo data-columna
                let columna = $(this).data('columna');
                // Obtener el valor dentro de la celda
                let valor = parseFloat($(this).text());

                if (columna == 1){
                    fn_pintarCeldas(valor, valorPrecioPolloVivo, this);
                }
                else if (columna == 2){
                    fn_pintarCeldas(valor, valorPrecioPolloVivoPelado, this);
                }
                else if (columna == 3){
                    fn_pintarCeldas(valor, valorPrecioPolloVivoTecnicoVivo, this);
                }
                else if (columna == 4){
                    fn_pintarCeldas(valor, valorPrecioPolloTecnicoPelado, this);
                }
                else if (columna == 5){
                    fn_pintarCeldas(valor, valorPrecioGallinaDoblePelado, this);
                }
                else if (columna == 6){
                    fn_pintarCeldas(valor, valorPrecioGallinaChicaPelado, this);
                }
                else if (columna == 7){
                    fn_pintarCeldas(valor, valorPrecioGalloPelado, this);
                }
                else if (columna == 8){
                    fn_pintarCeldas(valor, valorPrecioPolloVivoMaltratado, this);
                }
                else if (columna == 9){
                    fn_pintarCeldas(valor, valorPrecioPolloVivoPechuga, this);
                }
                else if (columna == 10){
                    fn_pintarCeldas(valor, valorPrecioPolloVivoPierna, this);
                }
                else if (columna == 11){
                    fn_pintarCeldas(valor, valorPrecioPolloVivoAlas, this);
                }
                else if (columna == 12){
                    fn_pintarCeldas(valor, valorPrecioPolloVivoMenudencia, this);
                }
                else if (columna == 13){
                    fn_pintarCeldas(valor, valorPrecioPolloVivoDorso, this);
                }
                else if (columna == 14){
                    fn_pintarCeldas(valor, valorPrecioPolloVivoOtros, this);
                }
                else if (columna == 15){
                    fn_pintarCeldas(valor, valorPrecioPolloxx, this);
                }
                else if (columna == 16){
                    fn_pintarCeldas(valor, valorPrecioBrasaYugo, this);
                }
                else if (columna == 17){
                    fn_pintarCeldas(valor, valorPrecioBrasaTecnico, this);
                }
                else if (columna == 18){
                    fn_pintarCeldas(valor, valorPrecioPolloxxVivo, this);
                }
                else if (columna == 19){
                    fn_pintarCeldas(valor, valorPrecioGallinaDobleVivo, this);
                }
                else if (columna == 20){
                    fn_pintarCeldas(valor, valorPrecioGallinaChicaVivo, this);
                }
                else if (columna == 21){
                    fn_pintarCeldas(valor, valorPrecioGalloVivo, this);
                }
                else if (columna == 22){
                    fn_pintarCeldas(valor, valorPrecioMaltratadoVivo, this);
                }
            });
        });
    }

    $("#ModalPreciosXPresentacion").on("keydown", function(event) {
        // Verificar si la tecla presionada es "Enter"
        if (event.key === "Enter") {
            $("#btnActualizarPreciosXPresentacion").trigger("click");
        }
        // Verificar si la tecla presionada es "Minus"
        else if (event.key === 189 || event.key === "-") {
            $("#cerrarModalPreciosXPresentacion").trigger("click");
        }
    });

    // Agregar evento clic a las celdas de la tabla
    $(document).on('click', '#bodyPreciosXPresentacion td.precioColumna', function (e) {
        // Verificar si el td ya contiene un input
        if ($(this).find('input').length > 0) {
            return;
        }
    
        let contenidoActual = $(this).text().trim();
        let anchoTd = $(this).outerWidth();
        let altoTd = $(this).outerHeight(); // Obtener la altura del td
        let claseActual = $(this).attr('class'); // Almacenar la clase actual del td
        let columnaPedido = $(this).data('columna');
    
        // Remover la clase p-2 del td
        $(this).removeClass('p-2');
    
        let input = $('<input type="text" class="bg-transparent border-none h-full m-auto w-full text-sm text-center validarSoloNumerosDosDecimales">')
            .val(contenidoActual)
            .on('input', function(e) {
                let inputValue = $(this).val().trim();
    
                // Elimina todos los caracteres excepto los dígitos y un punto decimal
                inputValue = inputValue.replace(/[^0-9.]/g, '');
    
                // Verifica si ya hay un punto decimal presente
                if (inputValue.indexOf('.') !== -1) {
                    // Si ya hay un punto, elimina los puntos adicionales
                    inputValue = inputValue.replace(/(\..*)\./g, '$1');
    
                    // Limita el número de decimales a dos
                    let parts = inputValue.split('.');
                    if (parts[1] && parts[1].length > 2) {
                        parts[1] = parts[1].substring(0, 2);
                        inputValue = parts[0] + '.' + parts[1];
                    }
                }
    
                // Establece el valor limpio en el input
                $(this).val(inputValue);
            });
    
        input.css({
            'max-width': anchoTd,
            'height': (altoTd - 3) + 'px'
        });
    
        $(this).empty().append(input);
        input.focus();
    
        // Almacenar referencias a la fila y a la celda
        let fila = $(this).closest('tr');
        let celdaColumna0 = fila.find('td:eq(0)');
    
        // Manejar evento de presionar Enter o salir del input
        input.on('keypress blur', function(e) {
            if (e.type === 'keypress' && e.which !== 13) {
                return; // Si no es la tecla Enter, salir
            }
    
            let nuevoContenido = $(this).val().trim();
            $(this).parent().text(nuevoContenido);
    
            // Extraer valores de las columnas 0
            let codigoCli = celdaColumna0.text().trim();
    
            // Volver a agregar la clase al td
            $(this).addClass(claseActual);
    
            if (nuevoContenido == "") {
                nuevoContenido = 0;
            }
    
            if (contenidoActual != nuevoContenido) {
                fn_ActualizarPrecioXPresentacion(codigoCli, nuevoContenido, columnaPedido);
            }
        });
    
        // Manejar evento de teclas de flecha
        input.on('keydown', function(e) {
            let keyCode = e.which;
            let currentTd = $(this).closest('td');
            let targetTd;
    
            switch (keyCode) {
                case 37: // Flecha izquierda
                    targetTd = currentTd.prevAll('td[data-columna]').first();
                    break;
                case 38: // Flecha arriba
                    targetTd = currentTd.closest('tr').prevAll(':visible').first().find('td[data-columna="' + columnaPedido + '"]').first();
                    break;
                case 39: // Flecha derecha
                    targetTd = currentTd.nextAll('td[data-columna]').first();
                    break;
                case 40: // Flecha abajo
                    targetTd = currentTd.closest('tr').nextAll(':visible').first().find('td[data-columna="' + columnaPedido + '"]').first();
                    break;
                default:
                    return; // Si no es una tecla de flecha, salir
            }
    
            if (targetTd && targetTd.length) {
                targetTd.trigger('click');
                e.preventDefault(); // Prevenir la acción por defecto de la tecla
            }
        });
    });   
    
    $(document).on("click", "#bodyPreciosXPresentacion tr", function() {

        $('#bodyPreciosXPresentacion tr').each(function() {
            $(this).addClass('bg-white dark:bg-gray-800');
            $(this).removeClass('bg-gray-300 dark:bg-gray-600');
        });

        let fila = $(this).closest("tr")
        fila.removeClass('bg-white dark:bg-gray-800');
        fila.addClass('bg-gray-300 dark:bg-gray-600');
    });

});
import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaBuscarPedidos').val(fechaHoy);
    var tipoUsuario = $('#tipoUsuario').data('id');
    fn_TraerPedidosSeguimientoClientes(fechaHoy);
    DataTableED('#tablaPedidos');

    fn_declarar_especies();
    var primerEspecieGlobal = 0
    var segundaEspecieGlobal = 0
    var terceraEspecieGlobal = 0
    var cuartaEspecieGlobal = 0
    var nombrePrimerEspecieGlobal = ""
    var nombreSegundaEspecieGlobal = ""
    var nombreTerceraEspecieGlobal = ""
    var nombreCuartaEspecieGlobal = ""

    function fn_declarar_especies(){
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
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $('#filtrarPedidosFecha').on('click', function () {
        let fechaBuscarPedidos = $('#fechaBuscarPedidos').val();
        fn_TraerPedidosSeguimientoClientes(fechaBuscarPedidos);
    });

    function fn_TraerPedidosSeguimientoClientes(fechaBuscarPedidos) {
        $.ajax({
            url: '/fn_consulta_TraerPedidosSeguimientoClientes',
            method: 'GET',
            data:{
                fechaBuscarPedidos:fechaBuscarPedidos,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyPedidoDelCliente = $('#bodyPedidos');
                    tbodyPedidoDelCliente.empty();
                    let nuevaFila = "";

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        let totalPedidos = 0;
                        totalPedidos = parseInt(obj.cantidadPrimerEspecie) + parseInt(obj.cantidadSegundaEspecie) + parseInt(obj.cantidadTerceraEspecie) + parseInt(obj.cantidadCuartaEspecie);
                        let totalPedidosPesados = 0;
                        totalPedidosPesados = parseFloat(obj.sumaCantidadPrimerEspecie) + parseFloat(obj.sumaCantidadSegundaEspecie) + parseFloat(obj.sumaCantidadTerceraEspecie) + parseFloat(obj.sumaCantidadCuartaEspecie);

                        let totalCantidadPedidosFila = totalPedidos - totalPedidosPesados;

                        let diferenciaPrimerEspecie = 0;
                        diferenciaPrimerEspecie = parseInt(obj.cantidadPrimerEspecie) - parseFloat(obj.sumaCantidadPrimerEspecie)

                        let diferenciaSegundaEspecie = 0;
                        diferenciaSegundaEspecie = parseInt(obj.cantidadSegundaEspecie) - parseFloat(obj.sumaCantidadSegundaEspecie)

                        let diferenciaTerceraEspecie = 0;
                        diferenciaTerceraEspecie = parseInt(obj.cantidadTerceraEspecie) - parseFloat(obj.sumaCantidadTerceraEspecie)

                        let diferenciaCuartaEspecie = 0;
                        diferenciaCuartaEspecie = parseInt(obj.cantidadCuartaEspecie) - parseFloat(obj.sumaCantidadCuartaEspecie)

                        nuevaFila = (`
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">YUGO VIVO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadPrimerEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadPrimerEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaPrimerEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">YUGO PELADO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSegundaEspecie}</td>
                        </tr>

                        {{-- ================== --}}}
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">TECNICA VIVA</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSegundaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">TECNICA PELADO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSegundaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">GALLINA DOBLE</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSegundaEspecie}</td>
                        </tr>
                        {{-- ================== --}}

                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">${obj.nombreCompleto}</td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">GALLINA CHICA</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadTerceraEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadTerceraEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaTerceraEspecie}</td>
                        </tr>

                        {{-- ================== --}}}
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">GALLO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSegundaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">POLLO XX</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSegundaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">BRASA YUGO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSegundaEspecie}</td>
                        </tr>
                        {{-- ================== --}}

                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">BRASA TECNICA</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadCuartaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.sumaCantidadCuartaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaCuartaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 border-b font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-green-500 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">TOTAL</td>
                            <td class="bg-green-500 text-white border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${totalPedidos}</td>
                            <td class="bg-green-500 text-white border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${totalPedidosPesados}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-white bg-red-600">${totalCantidadPedidosFila}</td>
                        </tr>
                        `);
                        // Agregar la nueva fila al tbody
                        tbodyPedidoDelCliente.append(nuevaFila);
                    });

                    if (nuevaFila == ""){
                        tbodyPedidoDelCliente.append(
                            '<tr class="rounded-lg"><td colspan="17" class="text-center border-2">No hay datos</td></tr>'
                        );
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

    $('#filtrarClientePedidos').on('input', function () {
        let nombreFiltrar = $('#filtrarClientePedidos').val().toUpperCase();
        // Ocultar todas las filas excepto las de Fecha y las filas con colspan="6"
        $('#tablaPedidos tbody tr').show();

        if (nombreFiltrar) {
            $('#tablaPedidos tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    });

});
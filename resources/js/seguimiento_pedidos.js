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

                    console.log(response);

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        let totalPedidos = 0;
                        totalPedidos = parseInt(obj.cantidadPrimerEspecie) + parseInt(obj.cantidadSegundaEspecie) + parseInt(obj.cantidadTerceraEspecie) 
                        + parseInt(obj.cantidadCuartaEspecie) + parseInt(obj.cantidadQuintaEspecie) + parseInt(obj.cantidadSextaEspecie) + parseInt(obj.cantidadSeptimaEspecie)
                        + parseInt(obj.cantidadOctavaEspecie) + parseInt(obj.cantidadNovenaEspecie) + parseInt(obj.cantidadDecimaEspecie) + parseInt(obj.cantidadDecimaPrimeraEspecie) +
                        + parseInt(obj.cantidadDecimaSegundaEspecie) + parseInt(obj.cantidadDecimaTerceraEspecie) + parseInt(obj.cantidadDecimaCuartaEspecie);
                        
                        let totalPedidosPesados = 0;
                        totalPedidosPesados = parseFloat(obj.sumaCantidadPrimerEspecie) + parseFloat(obj.sumaCantidadSegundaEspecie) 
                        + parseFloat(obj.sumaCantidadTerceraEspecie) + parseFloat(obj.sumaCantidadCuartaEspecie) + parseInt(obj.sumaCantidadQuintaEspecie) + parseInt(obj.sumaCantidadSextaEspecie) + parseInt(obj.sumaCantidadSeptimaEspecie)
                        + parseInt(obj.sumaCantidadOctavaEspecie) + parseInt(obj.sumaCantidadNovenaEspecie) + parseInt(obj.sumaCantidadDecimaEspecie) + parseInt(obj.sumaCantidadDecimaPrimeraEspecie) +
                        + parseInt(obj.sumaCantidadDecimaSegundaEspecie) + parseInt(obj.sumaCantidadDecimaTerceraEspecie) + parseInt(obj.sumaCantidadDecimaCuartaEspecie) + parseFloat(obj.sumaCantidadPrimerEspecieDos) + parseFloat(obj.sumaCantidadSegundaEspecieDos) 
                        + parseFloat(obj.sumaCantidadTerceraEspecieDos) + parseFloat(obj.sumaCantidadCuartaEspecieDos) + parseInt(obj.sumaCantidadQuintaEspecieDos) + parseInt(obj.sumaCantidadSextaEspecieDos) + parseInt(obj.sumaCantidadSeptimaEspecieDos)
                        + parseInt(obj.sumaCantidadOctavaEspecieDos) + parseInt(obj.sumaCantidadNovenaEspecieDos) + parseInt(obj.sumaCantidadDecimaEspecieDos) + parseInt(obj.sumaCantidadDecimaPrimeraEspecieDos) +
                        + parseInt(obj.sumaCantidadDecimaSegundaEspecieDos) + parseInt(obj.sumaCantidadDecimaTerceraEspecieDos) + parseInt(obj.sumaCantidadDecimaCuartaEspecieDos);

                        let totalCantidadPedidosFila = totalPedidos - totalPedidosPesados;

                        let diferenciaPrimerEspecie = 0;
                        diferenciaPrimerEspecie = parseInt(obj.cantidadPrimerEspecie) - (parseFloat(obj.sumaCantidadPrimerEspecie)+parseFloat(obj.sumaCantidadPrimerEspecieDos))

                        let diferenciaSegundaEspecie = 0;
                        diferenciaSegundaEspecie = parseInt(obj.cantidadSegundaEspecie) - (parseFloat(obj.sumaCantidadSegundaEspecie)+parseFloat(obj.sumaCantidadSegundaEspecie))

                        let diferenciaTerceraEspecie = 0;
                        diferenciaTerceraEspecie = parseInt(obj.cantidadTerceraEspecie) - (parseFloat(obj.sumaCantidadTerceraEspecie)+parseFloat(obj.sumaCantidadTerceraEspecie))

                        let diferenciaCuartaEspecie = 0;
                        diferenciaCuartaEspecie = parseInt(obj.cantidadCuartaEspecie) - (parseFloat(obj.sumaCantidadCuartaEspecie)+parseFloat(obj.sumaCantidadCuartaEspecie))

                        let diferenciaQuintaEspecie = 0;
                        diferenciaQuintaEspecie = parseInt(obj.cantidadQuintaEspecie) - (parseFloat(obj.sumaCantidadQuintaEspecie)+parseFloat(obj.sumaCantidadQuintaEspecie))

                        let diferenciaSextaEspecie = 0;
                        diferenciaSextaEspecie = parseInt(obj.cantidadSextaEspecie) - (parseFloat(obj.sumaCantidadSextaEspecie)+parseFloat(obj.sumaCantidadSextaEspecie))

                        let diferenciaSeptimaEspecie = 0;
                        diferenciaSeptimaEspecie = parseInt(obj.cantidadSeptimaEspecie) - (parseFloat(obj.sumaCantidadSeptimaEspecie)+parseFloat(obj.sumaCantidadSeptimaEspecie))

                        let diferenciaOctavaEspecie = 0;
                        diferenciaOctavaEspecie = parseInt(obj.cantidadOctavaEspecie) - (parseFloat(obj.sumaCantidadOctavaEspecie)+parseFloat(obj.sumaCantidadOctavaEspecie))

                        let diferenciaNovenaEspecie = 0;
                        diferenciaNovenaEspecie = parseInt(obj.cantidadNovenaEspecie) - (parseFloat(obj.sumaCantidadNovenaEspecie)+parseFloat(obj.sumaCantidadNovenaEspecie))

                        let diferenciaDecimaEspecie = 0;
                        diferenciaDecimaEspecie = parseInt(obj.cantidadDecimaEspecie) - (parseFloat(obj.sumaCantidadDecimaEspecie)+parseFloat(obj.sumaCantidadDecimaEspecie))

                        let diferenciaDecimaPrimeraEspecie = 0;
                        diferenciaDecimaPrimeraEspecie = parseInt(obj.cantidadDecimaPrimeraEspecie) - (parseFloat(obj.sumaCantidadDecimaPrimeraEspecie)+parseFloat(obj.sumaCantidadDecimaPrimeraEspecie))

                        let diferenciaDecimaSegundaEspecie = 0;
                        diferenciaDecimaSegundaEspecie = parseInt(obj.cantidadDecimaSegundaEspecie) - (parseFloat(obj.sumaCantidadDecimaSegundaEspecie)+parseFloat(obj.sumaCantidadDecimaSegundaEspecie))

                        let diferenciaDecimaTerceraEspecie = 0;
                        diferenciaDecimaTerceraEspecie = parseInt(obj.cantidadDecimaTerceraEspecie) - (parseFloat(obj.sumaCantidadDecimaTerceraEspecie)+parseFloat(obj.sumaCantidadDecimaTerceraEspecie))

                        let diferenciaDecimaCuartaEspecie = 0;
                        diferenciaDecimaCuartaEspecie = parseInt(obj.cantidadDecimaCuartaEspecie) - (parseFloat(obj.sumaCantidadDecimaCuartaEspecie)+parseFloat(obj.sumaCantidadDecimaCuartaEspecie))

                        nuevaFila = (`
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">YUGO VIVO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadPrimerEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadPrimerEspecie)+parseFloat(obj.sumaCantidadPrimerEspecieDos)}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaPrimerEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">YUGO PELADO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadSegundaEspecie+parseFloat(obj.sumaCantidadSegundaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSegundaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">BRASA YUGO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadNovenaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadNovenaEspecie+parseFloat(obj.sumaCantidadNovenaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaNovenaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">TECNICA VIVA</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadTerceraEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadTerceraEspecie+parseFloat(obj.sumaCantidadTerceraEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaTerceraEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">TECNICA PELADO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadCuartaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadCuartaEspecie+parseFloat(obj.sumaCantidadCuartaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaCuartaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">BRASA TECNICA</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadDecimaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadDecimaEspecie+parseFloat(obj.sumaCantidadDecimaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaDecimaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">${obj.nombreCompleto}</td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">POLLO XX PELADO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadOctavaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadOctavaEspecie+parseFloat(obj.sumaCantidadOctavaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaOctavaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">POLLO XX VIVO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadDecimaPrimeraEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadDecimaPrimeraEspecie+parseFloat(obj.sumaCantidadDecimaPrimeraEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaDecimaPrimeraEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">GALLINA DOBLE PELADO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadQuintaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadQuintaEspecie+parseFloat(obj.sumaCantidadQuintaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaQuintaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">GALLINA DOBLE VIVO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadDecimaSegundaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadDecimaSegundaEspecie+parseFloat(obj.sumaCantidadDecimaSegundaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaDecimaSegundaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">GALLINA CHICA PELADO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSextaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadSextaEspecie+parseFloat(obj.sumaCantidadSextaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSextaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">GALLINA CHICA VIVO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadDecimaTerceraEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadDecimaTerceraEspecie+parseFloat(obj.sumaCantidadDecimaTerceraEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaDecimaTerceraEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">GALLO PELADO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadSeptimaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadSeptimaEspecie+parseFloat(obj.sumaCantidadSeptimaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaSeptimaEspecie}</td>
                        </tr>
                        <tr class="bg-white text-gray-900 dark:text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="hidden">${obj.idPedido}</td>
                            <td class="hidden">${obj.nombreCompleto}</td>
                            <td class="border-l-2 dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            <td class="bg-blue-600 text-white border-l-2 border dark:border-gray-700 p-2 font-medium whitespace-nowrap text-center">GALLO VIVO</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${obj.cantidadDecimaCuartaEspecie}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-semibold">${parseFloat(obj.sumaCantidadDecimaCuartaEspecie+parseFloat(obj.sumaCantidadDecimaCuartaEspecie))}</td>
                            <td class="border-[1px] dark:border-gray-600 p-2 text-center whitespace-nowrap font-bold text-gray-900 bg-yellow-400">${diferenciaDecimaCuartaEspecie}</td>
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
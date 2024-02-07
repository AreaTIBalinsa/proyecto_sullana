import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteAcumulado').val(fechaHoy);
    $('#fechaHastaReporteAcumulado').val(fechaHoy);
    $('#fechaReporteExcel').val(fechaHoy);

    fn_TraerReporteAcumulado(fechaHoy,fechaHoy);
    fn_TraerReporteAcumuladoDetalle(fechaHoy,fechaHoy);

    fn_declarar_especies();

    var primerEspecieGlobal = 0
    var segundaEspecieGlobal = 0
    var terceraEspecieGlobal = 0
    var cuartaEspecieGlobal = 0
    var nombrePrimerEspecieGlobal = ""
    var nombreSegundaEspecieGlobal = ""
    var nombreTerceraEspecieGlobal = ""
    var nombreCuartaEspecieGlobal = ""

    /* ============ Eventos ============ */



    /* ============ Funciones ============ */

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

    $('#filtrarReporteAcumuladoDesdeHasta').on('click', function () {
        let fechaDesde = $('#fechaDesdeReporteAcumulado').val();
        let fechaHasta = $('#fechaHastaReporteAcumulado').val();
        fn_TraerReporteAcumulado(fechaDesde,fechaHasta);
    });

    function fn_TraerReporteAcumulado(fechaDesde, fechaHasta) {
        $.ajax({
            url: '/fn_consulta_TraerReporteAcumulado',
            method: 'GET',
            data: {
                fechaDesde: fechaDesde,
                fechaHasta: fechaHasta,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyReporteAcumulado = $('#bodyReporteAcumulado');
                    tbodyReporteAcumulado.empty();

                    let fechasUnicas = new Set();
                    let sinRepetidos = response.filter((valorActual) => {
                        let fechaInicioString = JSON.stringify(valorActual.fechaRegistroPes);
                        if (!fechasUnicas.has(fechaInicioString)) {
                            fechasUnicas.add(fechaInicioString);
                            return true;
                        }
                        return false;
                    });

                    let nuevaFila = "";

                    let totalPesoPrimerEspecie = 0.00;
                    let totalPesoSegundaEspecie = 0.00;
                    let totalPesoTerceraEspecie = 0.00;
                    let totalPesoCuartaEspecie = 0.00;
                    let totalPesoQuintaEspecie = 0.00;
                    let totalPesoSextaEspecie = 0.00;
                    let totalPesoSeptimaEspecie = 0.00;
                    let totalPesoOctavaEspecie = 0.00;
                    let totalPesoNovenaEspecie = 0.00;
                    let totalPesoDecimaEspecie = 0.00;
                    let totalPesoDecimaPrimeraEspecie = 0.00;
                    let totalPesoDecimaSegundaEspecie = 0.00;
                    let totalPesoDecimaTerceraEspecie = 0.00;
                    let totalPesoDecimaCuartaEspecie = 0.00;
                    let totalPesoDecimaSextaEspecie = 0.00;
                    let totalPesoDecimaSeptimaEspecie = 0.00;
                    let totalPesoDecimaOctavaEspecie = 0.00;

                    // Iterar sobre los objetos y mostrar sus propiedades
                    sinRepetidos.forEach(function(item) {

                        let diaPesoPrimerEspecie = 0.00;
                        let diaPesoSegundaEspecie = 0.00;
                        let diaPesoTerceraEspecie = 0.00;
                        let diaPesoCuartaEspecie = 0.00;
                        let diaPesoQuintaEspecie = 0.00;
                        let diaPesoSextaEspecie = 0.00;
                        let diaPesoSeptimaEspecie = 0.00;
                        let diaPesoOctavaEspecie = 0.00;
                        let diaPesoNovenaEspecie = 0.00;
                        let diaPesoDecimaEspecie = 0.00;
                        let diaPesoDecimaPrimeraEspecie = 0.00;
                        let diaPesoDecimaSegundaEspecie = 0.00;
                        let diaPesoDecimaTerceraEspecie = 0.00;
                        let diaPesoDecimaCuartaEspecie = 0.00;
                        let diaPesoDecimaSextaEspecie = 0.00;
                        let diaPesoDecimaSeptimaEspecie = 0.00;
                        let diaPesoDecimaOctavaEspecie = 0.00;

                        response.forEach(function (obj) {

                            if (item.fechaRegistroPes === obj.fechaRegistroPes) {
                                let idEspecie = parseInt(obj.idEspecie)
                                let pesoNetoPes = parseFloat(obj.pesoNetoPes)
                                let pesoNetoJabas = parseFloat(obj.pesoNetoJabas)

                                if (idEspecie == 1) {
                                    if (pesoNetoPes > 0){
                                        diaPesoPrimerEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoPrimerEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoPrimerEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoPrimerEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 2) {
                                    if (pesoNetoPes > 0){
                                        diaPesoSegundaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoSegundaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoSegundaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoSegundaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 3) {
                                    if (pesoNetoPes > 0){
                                        diaPesoTerceraEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoTerceraEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoTerceraEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoTerceraEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 4) {
                                    if (pesoNetoPes > 0){
                                        diaPesoCuartaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoCuartaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoCuartaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoCuartaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 5) {
                                    if (pesoNetoPes > 0){
                                        diaPesoQuintaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoQuintaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoQuintaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoQuintaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 6) {
                                    if (pesoNetoPes > 0){
                                        diaPesoSextaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoSextaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoSextaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoSextaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 7) {
                                    if (pesoNetoPes > 0){
                                        diaPesoSeptimaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoSeptimaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoSeptimaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoSeptimaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 8) {
                                    if (pesoNetoPes > 0){
                                        diaPesoOctavaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoOctavaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoOctavaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoOctavaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 10) {
                                    if (pesoNetoPes > 0){
                                        diaPesoNovenaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoNovenaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoNovenaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoNovenaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 11) {
                                    if (pesoNetoPes > 0){
                                        diaPesoDecimaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoDecimaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoDecimaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoDecimaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 12) {
                                    if (pesoNetoPes > 0){
                                        diaPesoDecimaPrimeraEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoDecimaPrimeraEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoDecimaPrimeraEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoDecimaPrimeraEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 13) {
                                    if (pesoNetoPes > 0){
                                        diaPesoDecimaSegundaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoDecimaSegundaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoDecimaSegundaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoDecimaSegundaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 14) {
                                    if (pesoNetoPes > 0){
                                        diaPesoDecimaTerceraEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoDecimaTerceraEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoDecimaTerceraEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoDecimaTerceraEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 15) {
                                    if (pesoNetoPes > 0){
                                        diaPesoDecimaCuartaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoDecimaCuartaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoDecimaCuartaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoDecimaCuartaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 16) {
                                    if (pesoNetoPes > 0){
                                        diaPesoDecimaSextaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoDecimaSextaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoDecimaSextaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoDecimaSextaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 17) {
                                    if (pesoNetoPes > 0){
                                        diaPesoDecimaSeptimaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoDecimaSeptimaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoDecimaSeptimaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoDecimaSeptimaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }else if (idEspecie == 18) {
                                    if (pesoNetoPes > 0){
                                        diaPesoDecimaOctavaEspecie += pesoNetoPes-pesoNetoJabas
                                        totalPesoDecimaOctavaEspecie += pesoNetoPes-pesoNetoJabas
                                    }else{
                                        diaPesoDecimaOctavaEspecie += pesoNetoPes+pesoNetoJabas
                                        totalPesoDecimaOctavaEspecie += pesoNetoPes+pesoNetoJabas
                                    }
                                }
                            }
                        });

                        nuevaFila = $('<tr class="consultarReporteAcumulado bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(item.fechaRegistroPes));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoPrimerEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoSegundaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoTerceraEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoCuartaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoQuintaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoSextaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoSeptimaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoOctavaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoNovenaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoDecimaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoDecimaPrimeraEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoDecimaSegundaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoDecimaTerceraEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoDecimaCuartaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoDecimaSextaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoDecimaSeptimaEspecie).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((diaPesoDecimaOctavaEspecie).toFixed(2)));
                        // Agregar la nueva fila al tbody
                        tbodyReporteAcumulado.append(nuevaFila);
                    });

                    nuevaFila = $('<tr class="bg-white dark:bg-gray-800 h-0.5">');
                    nuevaFila.append($('<td class="dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                    nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="17">').text(""));
                    tbodyReporteAcumulado.append(nuevaFila);
                    nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text("Totales :"));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoPrimerEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoSegundaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoTerceraEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoCuartaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoQuintaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoSextaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoSeptimaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoOctavaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoNovenaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoDecimaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoDecimaPrimeraEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoDecimaSegundaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoDecimaTerceraEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoDecimaCuartaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoDecimaSextaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoDecimaSeptimaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoDecimaOctavaEspecie).toFixed(2)));
                    tbodyReporteAcumulado.append(nuevaFila);
                        
                    if (response.length == 0) {
                        tbodyReporteAcumulado.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="18" class="text-center">No hay datos</td></tr>`);
                    }
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }

    $(document).on("input", "#filtrarClienteReporteAcumulado", function() {
        let searchText = $(this).val().toLowerCase();
        if (searchText) {
            $("#tablaReporteAcumuladoDetalle tbody tr").each(function(index, row) {
                var cellText = $(row).find("td:nth-child(2)").text().toLowerCase();
                if (cellText.includes(searchText)) {
                    $('#divReporteAcumuladoDetalle').animate({
                        scrollTop: $(row).position().top - 40
                    }, 500);
                    return false;
                }
            });
        }
    });

    $(document).on("dblclick", "#tablaReporteAcumulado tbody tr.consultarReporteAcumulado", function() {
        let fecha = $(this).find('td:eq(0)').text();

        fn_TraerReporteAcumuladoDetalle(fecha);
        $('#primerContenedorReporteAcumulado').toggle('flex hidden');
        $('#segundoContenedorReporteAcumulado').toggle('flex hidden');
        $('#btnRetrocesoReporteAcumulado').toggle('hidden');
        $('#diaReporteAcumulado').text(fecha);
    });

    $('#btnRetrocesoReporteAcumulado').on('click', function () {
        $('#primerContenedorReporteAcumulado').toggle('flex hidden');
        $('#segundoContenedorReporteAcumulado').toggle('flex hidden');
        $('#btnRetrocesoReporteAcumulado').toggle('hidden');
        $('#diaReporteAcumulado').text("");
    });

    function fn_TraerReporteAcumuladoDetalle(fecha) {
        $.ajax({
            url: '/fn_consulta_TraerReporteAcumuladoDetalle',
            method: 'GET',
            data: {
                fecha: fecha,
            },
            success: function (response) {
                // Realiza la transformación de datos aquí
                var transformedData = [];
                $.each(response, function (index, item) {
                    var transformedItem = {
                        idCliente: item.cliente.idCliente,
                        codigoCli: item.cliente.codigoCli,
                        nombreCompleto: item.cliente.nombreCompleto,

                        totalPesoPrimerEspecie: parseFloat(item.totalesPrimerEspecie[0]?.totalPesoPrimerEspecie || 0),
                        totalPesoDescuentoPrimerEspecie: parseFloat(item.totalesPrimerEspecie[0]?.totalPesoDescuentoPrimerEspecie || 0),
                        totalVentaPrimerEspecie: parseFloat(item.totalesPrimerEspecie[0]?.totalVentaPrimerEspecie || 0),
                        totalCantidadPrimerEspecie: parseInt(item.totalesPrimerEspecie[0]?.totalCantidadPrimerEspecie || 0),

                        totalPesoSegundaEspecie: parseFloat(item.totalesSegundaEspecie[0]?.totalPesoSegundaEspecie || 0),
                        totalPesoDescuentoSegundaEspecie: parseFloat(item.totalesSegundaEspecie[0]?.totalPesoDescuentoSegundaEspecie || 0),
                        totalVentaSegundaEspecie: parseFloat(item.totalesSegundaEspecie[0]?.totalVentaSegundaEspecie || 0),
                        totalCantidadSegundaEspecie: parseInt(item.totalesSegundaEspecie[0]?.totalCantidadSegundaEspecie || 0),

                        totalPesoTerceraEspecie: parseFloat(item.totalesTerceraEspecie[0]?.totalPesoTerceraEspecie || 0),
                        totalPesoDescuentoTerceraEspecie: parseFloat(item.totalesTerceraEspecie[0]?.totalPesoDescuentoTerceraEspecie || 0),
                        totalVentaTerceraEspecie: parseFloat(item.totalesTerceraEspecie[0]?.totalVentaTerceraEspecie || 0),
                        totalCantidadTerceraEspecie: parseInt(item.totalesTerceraEspecie[0]?.totalCantidadTerceraEspecie || 0),

                        totalPesoCuartaEspecie: parseFloat(item.totalesCuartaEspecie[0]?.totalPesoCuartaEspecie || 0),
                        totalPesoDescuentoCuartaEspecie: parseFloat(item.totalesCuartaEspecie[0]?.totalPesoDescuentoCuartaEspecie || 0),
                        totalVentaCuartaEspecie: parseFloat(item.totalesCuartaEspecie[0]?.totalVentaCuartaEspecie || 0),
                        totalCantidadCuartaEspecie: parseInt(item.totalesCuartaEspecie[0]?.totalCantidadCuartaEspecie || 0),

                        totalPesoQuintaEspecie: parseFloat(item.totalesQuintaEspecie[0]?.totalPesoQuintaEspecie || 0),
                        totalPesoDescuentoQuintaEspecie: parseFloat(item.totalesQuintaEspecie[0]?.totalPesoDescuentoQuintaEspecie || 0),
                        totalVentaQuintaEspecie: parseFloat(item.totalesQuintaEspecie[0]?.totalVentaQuintaEspecie || 0),
                        totalCantidadQuintaEspecie: parseInt(item.totalesQuintaEspecie[0]?.totalCantidadQuintaEspecie || 0),

                        totalPesoSextaEspecie: parseFloat(item.totalesSextaEspecie[0]?.totalPesoSextaEspecie || 0),
                        totalPesoDescuentoSextaEspecie: parseFloat(item.totalesSextaEspecie[0]?.totalPesoDescuentoSextaEspecie || 0),
                        totalVentaSextaEspecie: parseFloat(item.totalesSextaEspecie[0]?.totalVentaSextaEspecie || 0),
                        totalCantidadSextaEspecie: parseInt(item.totalesSextaEspecie[0]?.totalCantidadSextaEspecie || 0),

                        totalPesoSeptimaEspecie: parseFloat(item.totalesSeptimaEspecie[0]?.totalPesoSeptimaEspecie || 0),
                        totalPesoDescuentoSeptimaEspecie: parseFloat(item.totalesSeptimaEspecie[0]?.totalPesoDescuentoSeptimaEspecie || 0),
                        totalVentaSeptimaEspecie: parseFloat(item.totalesSeptimaEspecie[0]?.totalVentaSeptimaEspecie || 0),
                        totalCantidadSeptimaEspecie: parseInt(item.totalesSeptimaEspecie[0]?.totalCantidadSeptimaEspecie || 0),

                        totalPesoOctavaEspecie: parseFloat(item.totalesOctavaEspecie[0]?.totalPesoOctavaEspecie || 0),
                        totalPesoDescuentoOctavaEspecie: parseFloat(item.totalesOctavaEspecie[0]?.totalPesoDescuentoOctavaEspecie || 0),
                        totalVentaOctavaEspecie: parseFloat(item.totalesOctavaEspecie[0]?.totalVentaOctavaEspecie || 0),
                        totalCantidadOctavaEspecie: parseInt(item.totalesOctavaEspecie[0]?.totalCantidadOctavaEspecie || 0),

                        totalPesoDecimaEspecie: parseFloat(item.totalesDecimaEspecie[0]?.totalPesoDecimaEspecie || 0),
                        totalPesoDescuentoDecimaEspecie: parseFloat(item.totalesDecimaEspecie[0]?.totalPesoDescuentoDecimaEspecie || 0),
                        totalVentaDecimaEspecie: parseFloat(item.totalesDecimaEspecie[0]?.totalVentaDecimaEspecie || 0),
                        totalCantidadDecimaEspecie: parseInt(item.totalesDecimaEspecie[0]?.totalCantidadDecimaEspecie || 0),

                        totalPesoDecimaPrimeraEspecie: parseFloat(item.totalesDecimaPrimeraEspecie[0]?.totalPesoDecimaPrimeraEspecie || 0),
                        totalPesoDescuentoDecimaPrimeraEspecie: parseFloat(item.totalesDecimaPrimeraEspecie[0]?.totalPesoDescuentoDecimaPrimeraEspecie || 0),
                        totalVentaDecimaPrimeraEspecie: parseFloat(item.totalesDecimaPrimeraEspecie[0]?.totalVentaDecimaPrimeraEspecie || 0),
                        totalCantidadDecimaPrimeraEspecie: parseInt(item.totalesDecimaPrimeraEspecie[0]?.totalCantidadDecimaPrimeraEspecie || 0),

                        totalPesoDecimaSegundaEspecie: parseFloat(item.totalesDecimaSegundaEspecie[0]?.totalPesoDecimaSegundaEspecie || 0),
                        totalPesoDescuentoDecimaSegundaEspecie: parseFloat(item.totalesDecimaSegundaEspecie[0]?.totalPesoDescuentoDecimaSegundaEspecie || 0),
                        totalVentaDecimaSegundaEspecie: parseFloat(item.totalesDecimaSegundaEspecie[0]?.totalVentaDecimaSegundaEspecie || 0),
                        totalCantidadDecimaSegundaEspecie: parseInt(item.totalesDecimaSegundaEspecie[0]?.totalCantidadDecimaSegundaEspecie || 0),

                        totalPesoDecimaTerceraEspecie: parseFloat(item.totalesDecimaTerceraEspecie[0]?.totalPesoDecimaTerceraEspecie || 0),
                        totalPesoDescuentoDecimaTerceraEspecie: parseFloat(item.totalesDecimaTerceraEspecie[0]?.totalPesoDescuentoDecimaTerceraEspecie || 0),
                        totalVentaDecimaTerceraEspecie: parseFloat(item.totalesDecimaTerceraEspecie[0]?.totalVentaDecimaTerceraEspecie || 0),
                        totalCantidadDecimaTerceraEspecie: parseInt(item.totalesDecimaTerceraEspecie[0]?.totalCantidadDecimaTerceraEspecie || 0),

                        totalPesoDecimaCuartaEspecie: parseFloat(item.totalesDecimaCuartaEspecie[0]?.totalPesoDecimaCuartaEspecie || 0),
                        totalPesoDescuentoDecimaCuartaEspecie: parseFloat(item.totalesDecimaCuartaEspecie[0]?.totalPesoDescuentoDecimaCuartaEspecie || 0),
                        totalVentaDecimaCuartaEspecie: parseFloat(item.totalesDecimaCuartaEspecie[0]?.totalVentaDecimaCuartaEspecie || 0),
                        totalCantidadDecimaCuartaEspecie: parseInt(item.totalesDecimaCuartaEspecie[0]?.totalCantidadDecimaCuartaEspecie || 0),

                        totalPesoDecimaQuintaEspecie: parseFloat(item.totalesDecimaQuintaEspecie[0]?.totalPesoDecimaQuintaEspecie || 0),
                        totalPesoDescuentoDecimaQuintaEspecie: parseFloat(item.totalesDecimaQuintaEspecie[0]?.totalPesoDescuentoDecimaQuintaEspecie || 0),
                        totalVentaDecimaQuintaEspecie: parseFloat(item.totalesDecimaQuintaEspecie[0]?.totalVentaDecimaQuintaEspecie || 0),
                        totalCantidadDecimaQuintaEspecie: parseInt(item.totalesDecimaQuintaEspecie[0]?.totalCantidadDecimaQuintaEspecie || 0),

                        totalPesoDecimaSextaEspecie: parseFloat(item.totalesDecimaSextaEspecie[0]?.totalPesoDecimaSextaEspecie || 0),
                        totalPesoDescuentoDecimaSextaEspecie: parseFloat(item.totalesDecimaSextaEspecie[0]?.totalPesoDescuentoDecimaSextaEspecie || 0),
                        totalVentaDecimaSextaEspecie: parseFloat(item.totalesDecimaSextaEspecie[0]?.totalVentaDecimaSextaEspecie || 0),
                        totalCantidadDecimaSextaEspecie: parseInt(item.totalesDecimaSextaEspecie[0]?.totalCantidadDecimaSextaEspecie || 0),

                        totalPesoDecimaSeptimaEspecie: parseFloat(item.totalesDecimaSeptimaEspecie[0]?.totalPesoDecimaSeptimaEspecie || 0),
                        totalPesoDescuentoDecimaSeptimaEspecie: parseFloat(item.totalesDecimaSeptimaEspecie[0]?.totalPesoDescuentoDecimaSeptimaEspecie || 0),
                        totalVentaDecimaSeptimaEspecie: parseFloat(item.totalesDecimaSeptimaEspecie[0]?.totalVentaDecimaSeptimaEspecie || 0),
                        totalCantidadDecimaSeptimaEspecie: parseInt(item.totalesDecimaSeptimaEspecie[0]?.totalCantidadDecimaSeptimaEspecie || 0),

                        totalPesoDecimaOctavaEspecie: parseFloat(item.totalesDecimaOctavaEspecie[0]?.totalPesoDecimaOctavaEspecie || 0),
                        totalPesoDescuentoDecimaOctavaEspecie: parseFloat(item.totalesDecimaOctavaEspecie[0]?.totalPesoDescuentoDecimaOctavaEspecie || 0),
                        totalVentaDecimaOctavaEspecie: parseFloat(item.totalesDecimaOctavaEspecie[0]?.totalVentaDecimaOctavaEspecie || 0),
                        totalCantidadDecimaOctavaEspecie: parseInt(item.totalesDecimaOctavaEspecie[0]?.totalCantidadDecimaOctavaEspecie || 0),
                        
                        totalCantidadDescuentoPrimerEspecie: parseInt(item.totalesPrimerEspecie[0]?.totalCantidadDescuentoPrimerEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoPrimerEspecie: parseFloat(item.totalesPrimerEspecie[0]?.totalVentaDescuentoPrimerEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoSegundaEspecie: parseInt(item.totalesSegundaEspecie[0]?.totalCantidadDescuentoSegundaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSegundaEspecie: parseFloat(item.totalesSegundaEspecie[0]?.totalVentaDescuentoSegundaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoTerceraEspecie: parseInt(item.totalesTerceraEspecie[0]?.totalCantidadDescuentoTerceraEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoTerceraEspecie: parseFloat(item.totalesTerceraEspecie[0]?.totalVentaDescuentoTerceraEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoCuartaEspecie: parseInt(item.totalesCuartaEspecie[0]?.totalCantidadDescuentoCuartaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoCuartaEspecie: parseFloat(item.totalesCuartaEspecie[0]?.totalVentaDescuentoCuartaEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoQuintaEspecie: parseInt(item.totalesQuintaEspecie[0]?.totalCantidadDescuentoQuintaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoQuintaEspecie: parseFloat(item.totalesQuintaEspecie[0]?.totalVentaDescuentoQuintaEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoSextaEspecie: parseInt(item.totalesSextaEspecie[0]?.totalCantidadDescuentoSextaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSextaEspecie: parseFloat(item.totalesSextaEspecie[0]?.totalVentaDescuentoSextaEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoSeptimaEspecie: parseInt(item.totalesSeptimaEspecie[0]?.totalCantidadDescuentoSeptimaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSeptimaEspecie: parseFloat(item.totalesSeptimaEspecie[0]?.totalVentaDescuentoSeptimaEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoOctavaEspecie: parseInt(item.totalesOctavaEspecie[0]?.totalCantidadDescuentoOctavaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoOctavaEspecie: parseFloat(item.totalesOctavaEspecie[0]?.totalVentaDescuentoOctavaEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaEspecie: parseInt(item.totalesDecimaEspecie[0]?.totalCantidadDescuentoDecimaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaEspecie: parseFloat(item.totalesDecimaEspecie[0]?.totalVentaDescuentoDecimaEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaPrimeraEspecie: parseInt(item.totalesDecimaPrimeraEspecie[0]?.totalCantidadDescuentoDecimaPrimeraEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaPrimeraEspecie: parseFloat(item.totalesDecimaPrimeraEspecie[0]?.totalVentaDescuentoDecimaPrimeraEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaSegundaEspecie: parseInt(item.totalesDecimaSegundaEspecie[0]?.totalCantidadDescuentoDecimaSegundaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaSegundaEspecie: parseFloat(item.totalesDecimaSegundaEspecie[0]?.totalVentaDescuentoDecimaSegundaEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaTerceraEspecie: parseInt(item.totalesDecimaTerceraEspecie[0]?.totalCantidadDescuentoDecimaTerceraEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaTerceraEspecie: parseFloat(item.totalesDecimaTerceraEspecie[0]?.totalVentaDescuentoDecimaTerceraEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaCuartaEspecie: parseInt(item.totalesDecimaCuartaEspecie[0]?.totalCantidadDescuentoDecimaCuartaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaCuartaEspecie: parseFloat(item.totalesDecimaCuartaEspecie[0]?.totalVentaDescuentoDecimaCuartaEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaQuintaEspecie: parseInt(item.totalesDecimaQuintaEspecie[0]?.totalCantidadDescuentoDecimaQuintaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaQuintaEspecie: parseFloat(item.totalesDecimaQuintaEspecie[0]?.totalVentaDescuentoDecimaQuintaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoDecimaSextaEspecie: parseInt(item.totalesDecimaSextaEspecie[0]?.totalCantidadDescuentoDecimaSextaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaSextaEspecie: parseFloat(item.totalesDecimaSextaEspecie[0]?.totalVentaDescuentoDecimaSextaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoDecimaSeptimaEspecie: parseInt(item.totalesDecimaSeptimaEspecie[0]?.totalCantidadDescuentoDecimaSeptimaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaSeptimaEspecie: parseFloat(item.totalesDecimaSeptimaEspecie[0]?.totalVentaDescuentoDecimaSeptimaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoDecimaOctavaEspecie: parseInt(item.totalesDecimaOctavaEspecie[0]?.totalCantidadDescuentoDecimaOctavaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaOctavaEspecie: parseFloat(item.totalesDecimaOctavaEspecie[0]?.totalVentaDescuentoDecimaOctavaEspecie.replace(/[^0-9.-]+/g,"") || 0),

                        /* ================================================================== */
                        /* =============================Consulta============================= */
                        /* ================================================================== */

                        totalPesoPrimerEspecie2: parseFloat(item.totalesPrimerEspecie2[0]?.totalPesoPrimerEspecie2 || 0),
                        totalPesoDescuentoPrimerEspecie2: parseFloat(item.totalesPrimerEspecie2[0]?.totalPesoDescuentoPrimerEspecie2 || 0),
                        totalVentaPrimerEspecie2: parseFloat(item.totalesPrimerEspecie2[0]?.totalVentaPrimerEspecie2 || 0),
                        totalCantidadPrimerEspecie2: parseInt(item.totalesPrimerEspecie2[0]?.totalCantidadPrimerEspecie2 || 0),

                        totalPesoSegundaEspecie2: parseFloat(item.totalesSegundaEspecie2[0]?.totalPesoSegundaEspecie2 || 0),
                        totalPesoDescuentoSegundaEspecie2: parseFloat(item.totalesSegundaEspecie2[0]?.totalPesoDescuentoSegundaEspecie2 || 0),
                        totalVentaSegundaEspecie2: parseFloat(item.totalesSegundaEspecie2[0]?.totalVentaSegundaEspecie2 || 0),
                        totalCantidadSegundaEspecie2: parseInt(item.totalesSegundaEspecie2[0]?.totalCantidadSegundaEspecie2 || 0),

                        totalPesoTerceraEspecie2: parseFloat(item.totalesTerceraEspecie2[0]?.totalPesoTerceraEspecie2 || 0),
                        totalPesoDescuentoTerceraEspecie2: parseFloat(item.totalesTerceraEspecie2[0]?.totalPesoDescuentoTerceraEspecie2 || 0),
                        totalVentaTerceraEspecie2: parseFloat(item.totalesTerceraEspecie2[0]?.totalVentaTerceraEspecie2 || 0),
                        totalCantidadTerceraEspecie2: parseInt(item.totalesTerceraEspecie2[0]?.totalCantidadTerceraEspecie2 || 0),

                        totalPesoCuartaEspecie2: parseFloat(item.totalesCuartaEspecie2[0]?.totalPesoCuartaEspecie2 || 0),
                        totalPesoDescuentoCuartaEspecie2: parseFloat(item.totalesCuartaEspecie2[0]?.totalPesoDescuentoCuartaEspecie2 || 0),
                        totalVentaCuartaEspecie2: parseFloat(item.totalesCuartaEspecie2[0]?.totalVentaCuartaEspecie2 || 0),
                        totalCantidadCuartaEspecie2: parseInt(item.totalesCuartaEspecie2[0]?.totalCantidadCuartaEspecie2 || 0),

                        totalPesoQuintaEspecie2: parseFloat(item.totalesQuintaEspecie2[0]?.totalPesoQuintaEspecie2 || 0),
                        totalPesoDescuentoQuintaEspecie2: parseFloat(item.totalesQuintaEspecie2[0]?.totalPesoDescuentoQuintaEspecie2 || 0),
                        totalVentaQuintaEspecie2: parseFloat(item.totalesQuintaEspecie2[0]?.totalVentaQuintaEspecie2 || 0),
                        totalCantidadQuintaEspecie2: parseInt(item.totalesQuintaEspecie2[0]?.totalCantidadQuintaEspecie2 || 0),

                        totalPesoSextaEspecie2: parseFloat(item.totalesSextaEspecie2[0]?.totalPesoSextaEspecie2 || 0),
                        totalPesoDescuentoSextaEspecie2: parseFloat(item.totalesSextaEspecie2[0]?.totalPesoDescuentoSextaEspecie2 || 0),
                        totalVentaSextaEspecie2: parseFloat(item.totalesSextaEspecie2[0]?.totalVentaSextaEspecie2 || 0),
                        totalCantidadSextaEspecie2: parseInt(item.totalesSextaEspecie2[0]?.totalCantidadSextaEspecie2 || 0),

                        totalPesoSeptimaEspecie2: parseFloat(item.totalesSeptimaEspecie2[0]?.totalPesoSeptimaEspecie2 || 0),
                        totalPesoDescuentoSeptimaEspecie2: parseFloat(item.totalesSeptimaEspecie2[0]?.totalPesoDescuentoSeptimaEspecie2 || 0),
                        totalVentaSeptimaEspecie2: parseFloat(item.totalesSeptimaEspecie2[0]?.totalVentaSeptimaEspecie2 || 0),
                        totalCantidadSeptimaEspecie2: parseInt(item.totalesSeptimaEspecie2[0]?.totalCantidadSeptimaEspecie2 || 0),

                        totalPesoOctavaEspecie2: parseFloat(item.totalesOctavaEspecie2[0]?.totalPesoOctavaEspecie2 || 0),
                        totalPesoDescuentoOctavaEspecie2: parseFloat(item.totalesOctavaEspecie2[0]?.totalPesoDescuentoOctavaEspecie2 || 0),
                        totalVentaOctavaEspecie2: parseFloat(item.totalesOctavaEspecie2[0]?.totalVentaOctavaEspecie2 || 0),
                        totalCantidadOctavaEspecie2: parseInt(item.totalesOctavaEspecie2[0]?.totalCantidadOctavaEspecie2 || 0),

                        totalPesoDecimaEspecie2: parseFloat(item.totalesDecimaEspecie2[0]?.totalPesoDecimaEspecie2 || 0),
                        totalPesoDescuentoDecimaEspecie2: parseFloat(item.totalesDecimaEspecie2[0]?.totalPesoDescuentoDecimaEspecie2 || 0),
                        totalVentaDecimaEspecie2: parseFloat(item.totalesDecimaEspecie2[0]?.totalVentaDecimaEspecie2 || 0),
                        totalCantidadDecimaEspecie2: parseInt(item.totalesDecimaEspecie2[0]?.totalCantidadDecimaEspecie2 || 0),

                        totalPesoDecimaPrimeraEspecie2: parseFloat(item.totalesDecimaPrimeraEspecie2[0]?.totalPesoDecimaPrimeraEspecie2 || 0),
                        totalPesoDescuentoDecimaPrimeraEspecie2: parseFloat(item.totalesDecimaPrimeraEspecie2[0]?.totalPesoDescuentoDecimaPrimeraEspecie2 || 0),
                        totalVentaDecimaPrimeraEspecie2: parseFloat(item.totalesDecimaPrimeraEspecie2[0]?.totalVentaDecimaPrimeraEspecie2 || 0),
                        totalCantidadDecimaPrimeraEspecie2: parseInt(item.totalesDecimaPrimeraEspecie2[0]?.totalCantidadDecimaPrimeraEspecie2 || 0),

                        totalPesoDecimaSegundaEspecie2: parseFloat(item.totalesDecimaSegundaEspecie2[0]?.totalPesoDecimaSegundaEspecie2 || 0),
                        totalPesoDescuentoDecimaSegundaEspecie2: parseFloat(item.totalesDecimaSegundaEspecie2[0]?.totalPesoDescuentoDecimaSegundaEspecie2 || 0),
                        totalVentaDecimaSegundaEspecie2: parseFloat(item.totalesDecimaSegundaEspecie2[0]?.totalVentaDecimaSegundaEspecie2 || 0),
                        totalCantidadDecimaSegundaEspecie2: parseInt(item.totalesDecimaSegundaEspecie2[0]?.totalCantidadDecimaSegundaEspecie2 || 0),

                        totalPesoDecimaTerceraEspecie2: parseFloat(item.totalesDecimaTerceraEspecie2[0]?.totalPesoDecimaTerceraEspecie2 || 0),
                        totalPesoDescuentoDecimaTerceraEspecie2: parseFloat(item.totalesDecimaTerceraEspecie2[0]?.totalPesoDescuentoDecimaTerceraEspecie2 || 0),
                        totalVentaDecimaTerceraEspecie2: parseFloat(item.totalesDecimaTerceraEspecie2[0]?.totalVentaDecimaTerceraEspecie2 || 0),
                        totalCantidadDecimaTerceraEspecie2: parseInt(item.totalesDecimaTerceraEspecie2[0]?.totalCantidadDecimaTerceraEspecie2 || 0),

                        totalPesoDecimaCuartaEspecie2: parseFloat(item.totalesDecimaCuartaEspecie2[0]?.totalPesoDecimaCuartaEspecie2 || 0),
                        totalPesoDescuentoDecimaCuartaEspecie2: parseFloat(item.totalesDecimaCuartaEspecie2[0]?.totalPesoDescuentoDecimaCuartaEspecie2 || 0),
                        totalVentaDecimaCuartaEspecie2: parseFloat(item.totalesDecimaCuartaEspecie2[0]?.totalVentaDecimaCuartaEspecie2 || 0),
                        totalCantidadDecimaCuartaEspecie2: parseInt(item.totalesDecimaCuartaEspecie2[0]?.totalCantidadDecimaCuartaEspecie2 || 0),

                        totalPesoDecimaQuintaEspecie2: parseFloat(item.totalesDecimaQuintaEspecie2[0]?.totalPesoDecimaQuintaEspecie2 || 0),
                        totalPesoDescuentoDecimaQuintaEspecie2: parseFloat(item.totalesDecimaQuintaEspecie2[0]?.totalPesoDescuentoDecimaQuintaEspecie2 || 0),
                        totalVentaDecimaQuintaEspecie2: parseFloat(item.totalesDecimaQuintaEspecie2[0]?.totalVentaDecimaQuintaEspecie2 || 0),
                        totalCantidadDecimaQuintaEspecie2: parseInt(item.totalesDecimaQuintaEspecie2[0]?.totalCantidadDecimaQuintaEspecie2 || 0),

                        totalPesoDecimaSextaEspecie2: parseFloat(item.totalesDecimaSextaEspecie2[0]?.totalPesoDecimaSextaEspecie2 || 0),
                        totalPesoDescuentoDecimaSextaEspecie2: parseFloat(item.totalesDecimaSextaEspecie2[0]?.totalPesoDescuentoDecimaSextaEspecie2 || 0),
                        totalVentaDecimaSextaEspecie2: parseFloat(item.totalesDecimaSextaEspecie2[0]?.totalVentaDecimaSextaEspecie2 || 0),
                        totalCantidadDecimaSextaEspecie2: parseInt(item.totalesDecimaSextaEspecie2[0]?.totalCantidadDecimaSextaEspecie2 || 0),

                        totalPesoDecimaSeptimaEspecie2: parseFloat(item.totalesDecimaSeptimaEspecie2[0]?.totalPesoDecimaSeptimaEspecie2 || 0),
                        totalPesoDescuentoDecimaSeptimaEspecie2: parseFloat(item.totalesDecimaSeptimaEspecie2[0]?.totalPesoDescuentoDecimaSeptimaEspecie2 || 0),
                        totalVentaDecimaSeptimaEspecie2: parseFloat(item.totalesDecimaSeptimaEspecie2[0]?.totalVentaDecimaSeptimaEspecie2 || 0),
                        totalCantidadDecimaSeptimaEspecie2: parseInt(item.totalesDecimaSeptimaEspecie2[0]?.totalCantidadDecimaSeptimaEspecie2 || 0),

                        totalPesoDecimaOctavaEspecie2: parseFloat(item.totalesDecimaOctavaEspecie2[0]?.totalPesoDecimaOctavaEspecie2 || 0),
                        totalPesoDescuentoDecimaOctavaEspecie2: parseFloat(item.totalesDecimaOctavaEspecie2[0]?.totalPesoDescuentoDecimaOctavaEspecie2 || 0),
                        totalVentaDecimaOctavaEspecie2: parseFloat(item.totalesDecimaOctavaEspecie2[0]?.totalVentaDecimaOctavaEspecie2 || 0),
                        totalCantidadDecimaOctavaEspecie2: parseInt(item.totalesDecimaOctavaEspecie2[0]?.totalCantidadDecimaOctavaEspecie2 || 0),
                        
                        totalCantidadDescuentoPrimerEspecie2: parseInt(item.totalesPrimerEspecie2[0]?.totalCantidadDescuentoPrimerEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoPrimerEspecie2: parseFloat(item.totalesPrimerEspecie2[0]?.totalVentaDescuentoPrimerEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoSegundaEspecie2: parseInt(item.totalesSegundaEspecie2[0]?.totalCantidadDescuentoSegundaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSegundaEspecie2: parseFloat(item.totalesSegundaEspecie2[0]?.totalVentaDescuentoSegundaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoTerceraEspecie2: parseInt(item.totalesTerceraEspecie2[0]?.totalCantidadDescuentoTerceraEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoTerceraEspecie2: parseFloat(item.totalesTerceraEspecie2[0]?.totalVentaDescuentoTerceraEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoCuartaEspecie2: parseInt(item.totalesCuartaEspecie2[0]?.totalCantidadDescuentoCuartaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoCuartaEspecie2: parseFloat(item.totalesCuartaEspecie2[0]?.totalVentaDescuentoCuartaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoQuintaEspecie2: parseInt(item.totalesQuintaEspecie2[0]?.totalCantidadDescuentoQuintaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoQuintaEspecie2: parseFloat(item.totalesQuintaEspecie2[0]?.totalVentaDescuentoQuintaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoSextaEspecie2: parseInt(item.totalesSextaEspecie2[0]?.totalCantidadDescuentoSextaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSextaEspecie2: parseFloat(item.totalesSextaEspecie2[0]?.totalVentaDescuentoSextaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoSeptimaEspecie2: parseInt(item.totalesSeptimaEspecie2[0]?.totalCantidadDescuentoSeptimaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSeptimaEspecie2: parseFloat(item.totalesSeptimaEspecie2[0]?.totalVentaDescuentoSeptimaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoOctavaEspecie2: parseInt(item.totalesOctavaEspecie2[0]?.totalCantidadDescuentoOctavaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoOctavaEspecie2: parseFloat(item.totalesOctavaEspecie2[0]?.totalVentaDescuentoOctavaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaEspecie2: parseInt(item.totalesDecimaEspecie2[0]?.totalCantidadDescuentoDecimaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaEspecie2: parseFloat(item.totalesDecimaEspecie2[0]?.totalVentaDescuentoDecimaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaPrimeraEspecie2: parseInt(item.totalesDecimaPrimeraEspecie2[0]?.totalCantidadDescuentoDecimaPrimeraEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaPrimeraEspecie2: parseFloat(item.totalesDecimaPrimeraEspecie2[0]?.totalVentaDescuentoDecimaPrimeraEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaSegundaEspecie2: parseInt(item.totalesDecimaSegundaEspecie2[0]?.totalCantidadDescuentoDecimaSegundaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaSegundaEspecie2: parseFloat(item.totalesDecimaSegundaEspecie2[0]?.totalVentaDescuentoDecimaSegundaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaTerceraEspecie2: parseInt(item.totalesDecimaTerceraEspecie2[0]?.totalCantidadDescuentoDecimaTerceraEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaTerceraEspecie2: parseFloat(item.totalesDecimaTerceraEspecie2[0]?.totalVentaDescuentoDecimaTerceraEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaCuartaEspecie2: parseInt(item.totalesDecimaCuartaEspecie2[0]?.totalCantidadDescuentoDecimaCuartaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaCuartaEspecie2: parseFloat(item.totalesDecimaCuartaEspecie2[0]?.totalVentaDescuentoDecimaCuartaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaQuintaEspecie2: parseInt(item.totalesDecimaQuintaEspecie2[0]?.totalCantidadDescuentoDecimaQuintaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaQuintaEspecie2: parseFloat(item.totalesDecimaQuintaEspecie2[0]?.totalVentaDescuentoDecimaQuintaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaSextaEspecie2: parseInt(item.totalesDecimaSextaEspecie2[0]?.totalCantidadDescuentoDecimaSextaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaSextaEspecie2: parseFloat(item.totalesDecimaSextaEspecie2[0]?.totalVentaDescuentoDecimaSextaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoDecimaSeptimaEspecie2: parseInt(item.totalesDecimaSeptimaEspecie2[0]?.totalCantidadDescuentoDecimaSeptimaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaSeptimaEspecie2: parseFloat(item.totalesDecimaSeptimaEspecie2[0]?.totalVentaDescuentoDecimaSeptimaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoDecimaOctavaEspecie2: parseInt(item.totalesDecimaOctavaEspecie2[0]?.totalCantidadDescuentoDecimaOctavaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaOctavaEspecie2: parseFloat(item.totalesDecimaOctavaEspecie2[0]?.totalVentaDescuentoDecimaOctavaEspecie2.replace(/[^0-9.-]+/g,"") || 0),

                        
                        /* ================================================================== */
                        /* ================================================================== */
                        /* ================================================================== */
                        ventaAnterior: parseFloat(item.ventaAnterior || 0),
                        ventaAnterior2: parseFloat(item.ventaAnterior2 || 0),

                        totalPesoDescuento: parseFloat(item.totalDescuentos[0]?.totalPesoDescuento || 0),
                        totalVentaDescuento: parseFloat(item.totalDescuentos[0]?.totalVentaDescuento || 0),
                        pagos: parseFloat(item.totalPagos[0]?.pagos || 0),
                        pagoAnterior: parseFloat(item.pagoAnterior || 0),
                        totalVentaDescuentoAnterior: parseFloat(item.totalVentaDescuentoAnterior || 0),
                    };
                    transformedData.push(transformedItem);
                });
    
                //fn_construirFilasReporteAcumuladoDetalle(transformedData);

                const especies = [
                    "PrimerEspecie",
                    "SegundaEspecie",
                    "TerceraEspecie",
                    "CuartaEspecie",
                    "QuintaEspecie",
                    "SextaEspecie",
                    "SeptimaEspecie",
                    "OctavaEspecie",
                    "DecimaEspecie",
                    "DecimaPrimeraEspecie",
                    "DecimaSegundaEspecie",
                    "DecimaTerceraEspecie",
                    "DecimaCuartaEspecie",
                    "DecimaQuintaEspecie",
                    "DecimaSextaEspecie",
                    "DecimaSeptimaEspecie",
                    "DecimaOctavaEspecie"
                  ];
                  
                  const mainProperties = [
                    "totalPeso",
                    "totalPesoDescuento",
                    "totalVenta",
                    "totalCantidad",
                    "totalCantidadDescuento",
                    "totalVentaDescuento"
                  ];
                  
                  const additionalProperties = [
                    "totalPesoDescuento",
                    "totalVentaDescuento",
                    "pagos",
                    "pagoAnterior",
                    "totalVentaDescuentoAnterior",
                    "idCliente",
                    "codigoCli",
                    "nombreCompleto",
                    "ventaAnterior"
                  ];
                  
                  const processedData = [];
                  
                  $.each(transformedData, function(index, item) {
                    const processedItem = {};
                  
                    // Procesar propiedades principales
                    $.each(especies, function(especieIndex, especie) {
                      $.each(mainProperties, function(propertyIndex, property) {
                        const key = property + especie;
                        const key2 = property + especie + "2";
                        const value1 = item[key] || 0;
                        const value2 = item[key2] || 0;
                        const combinedValue = value1 + value2;
                  
                        processedItem[key] = combinedValue;
                      });
                    });
                  
                    // Procesar propiedades adicionales
                    $.each(additionalProperties, function(propertyIndex, property) {
                      if (property === "ventaAnterior") {
                        const ventaAnterior = parseFloat(item["ventaAnterior"] || 0);
                        const ventaAnterior2 = parseFloat(item["ventaAnterior2"] || 0);
                        processedItem["ventaAnterior"] = ventaAnterior + ventaAnterior2;
                      } else {
                        const value = (property in item) ? item[property] : 0;
                        processedItem[property] = value;
                      }
                    });
                  
                    processedData.push(processedItem);
                  });
                  
                  fn_construirFilasReporteAcumuladoDetalleExcel(processedData);
                  fn_construirFilasReporteAcumuladoDetalle(processedData);                                          

            },
            error: function (error) {
                console.error("ERROR", error);
            },
        });
    }    
    
    function fn_construirFilasReporteAcumuladoDetalle(combinedDataArray){
        let bodyReporteAcumuladoDetalle="";
        let tbodyReporteAcumulado = $('#bodyReporteAcumuladoDetalle');
        tbodyReporteAcumulado.empty();
        combinedDataArray.forEach(function (item) {
            bodyReporteAcumuladoDetalle += construirPrimeraFila(item);
            bodyReporteAcumuladoDetalle += construirSegundaFila(item);
            bodyReporteAcumuladoDetalle += construirTerceraFila(item);
            bodyReporteAcumuladoDetalle += construirCuartaFila(item);
            bodyReporteAcumuladoDetalle += construirQuintaFila(item);
            bodyReporteAcumuladoDetalle += construirSextaFila(item);
            bodyReporteAcumuladoDetalle += construirSeptimaFila(item);
            bodyReporteAcumuladoDetalle += construirOctavaFila(item);
            bodyReporteAcumuladoDetalle += construirDecimaFila(item);
            bodyReporteAcumuladoDetalle += construirDecimaPrimeraFila(item);
            bodyReporteAcumuladoDetalle += construirDecimaSegundaFila(item);
            bodyReporteAcumuladoDetalle += construirDecimaTerceraFila(item);
            bodyReporteAcumuladoDetalle += construirDecimaCuartaFila(item);
            bodyReporteAcumuladoDetalle += construirDecimaQuintaFila(item);
            bodyReporteAcumuladoDetalle += construirDecimaSextaFila(item);
            bodyReporteAcumuladoDetalle += construirDecimaSeptimaFila(item);
            bodyReporteAcumuladoDetalle += construirDecimaOctavaFila(item);
            bodyReporteAcumuladoDetalle += construirDescuentoFila(item);
            bodyReporteAcumuladoDetalle += construirFilasTotales(item);
        });
        tbodyReporteAcumulado.html(bodyReporteAcumuladoDetalle);
    }

    function construirPrimeraFila(item) {
        let totalPeso = parseFloat(item.totalPesoPrimerEspecie);
        let totalCantidad = parseInt(item.totalCantidadPrimerEspecie);
        let totalVenta = parseFloat(item.totalVentaPrimerEspecie);
        let totalPesoDescuentoPrimerEspecie = parseFloat(item.totalPesoDescuentoPrimerEspecie);
        let totalCantidadDescuentoPrimerEspecie = parseInt(item.totalCantidadDescuentoPrimerEspecie);
        let totalVentaDescuentoPrimerEspecie = parseFloat(item.totalVentaDescuentoPrimerEspecie);

        totalPeso = totalPeso + totalPesoDescuentoPrimerEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoPrimerEspecie;
        totalVenta = totalVenta + totalVentaDescuentoPrimerEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap">${item.codigoCli}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${item.nombreCompleto}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">YUGO VIVO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirSegundaFila(item) {
        let totalPeso = parseFloat(item.totalPesoSegundaEspecie);
        let totalCantidad = parseInt(item.totalCantidadSegundaEspecie);
        let totalVenta = parseFloat(item.totalVentaSegundaEspecie);
        let totalPesoDescuentoSegundaEspecie = parseFloat(item.totalPesoDescuentoSegundaEspecie);
        let totalCantidadDescuentoSegundaEspecie = parseInt(item.totalCantidadDescuentoSegundaEspecie);
        let totalVentaDescuentoSegundaEspecie = parseFloat(item.totalVentaDescuentoSegundaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoSegundaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoSegundaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoSegundaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">YUGO PELADO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirTerceraFila(item) {
        let totalPeso = parseFloat(item.totalPesoTerceraEspecie);
        let totalCantidad = parseInt(item.totalCantidadTerceraEspecie);
        let totalVenta = parseFloat(item.totalVentaTerceraEspecie);
        let totalPesoDescuentoTerceraEspecie = parseFloat(item.totalPesoDescuentoTerceraEspecie);
        let totalCantidadDescuentoTerceraEspecie = parseInt(item.totalCantidadDescuentoTerceraEspecie);
        let totalVentaDescuentoTerceraEspecie = parseFloat(item.totalVentaDescuentoTerceraEspecie);

        totalPeso = totalPeso + totalPesoDescuentoTerceraEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoTerceraEspecie;
        totalVenta = totalVenta + totalVentaDescuentoTerceraEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">TECNICO VIVO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirCuartaFila(item) {
        let totalPeso = parseFloat(item.totalPesoCuartaEspecie);
        let totalCantidad = parseInt(item.totalCantidadCuartaEspecie);
        let totalVenta = parseFloat(item.totalVentaCuartaEspecie);
        let totalPesoDescuentoCuartaEspecie = parseFloat(item.totalPesoDescuentoCuartaEspecie);
        let totalCantidadDescuentoCuartaEspecie = parseInt(item.totalCantidadDescuentoCuartaEspecie);
        let totalVentaDescuentoCuartaEspecie = parseFloat(item.totalVentaDescuentoCuartaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoCuartaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoCuartaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoCuartaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">TECNICO PELADO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirQuintaFila(item) {
        let totalPeso = parseFloat(item.totalPesoQuintaEspecie);
        let totalCantidad = parseInt(item.totalCantidadQuintaEspecie);
        let totalVenta = parseFloat(item.totalVentaQuintaEspecie);
        let totalPesoDescuentoQuintaEspecie = parseFloat(item.totalPesoDescuentoQuintaEspecie);
        let totalCantidadDescuentoQuintaEspecie = parseInt(item.totalCantidadDescuentoQuintaEspecie);
        let totalVentaDescuentoQuintaEspecie = parseFloat(item.totalVentaDescuentoQuintaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoQuintaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoQuintaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoQuintaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">GALLINA DOBLE</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirSextaFila(item) {
        let totalPeso = parseFloat(item.totalPesoSextaEspecie);
        let totalCantidad = parseInt(item.totalCantidadSextaEspecie);
        let totalVenta = parseFloat(item.totalVentaSextaEspecie);
        let totalPesoDescuentoSextaEspecie = parseFloat(item.totalPesoDescuentoSextaEspecie);
        let totalCantidadDescuentoSextaEspecie = parseInt(item.totalCantidadDescuentoSextaEspecie);
        let totalVentaDescuentoSextaEspecie = parseFloat(item.totalVentaDescuentoSextaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoSextaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoSextaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoSextaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">GALLINA CHICA</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirSeptimaFila(item) {
        let totalPeso = parseFloat(item.totalPesoSeptimaEspecie);
        let totalCantidad = parseInt(item.totalCantidadSeptimaEspecie);
        let totalVenta = parseFloat(item.totalVentaSeptimaEspecie);
        let totalPesoDescuentoSeptimaEspecie = parseFloat(item.totalPesoDescuentoSeptimaEspecie);
        let totalCantidadDescuentoSeptimaEspecie = parseInt(item.totalCantidadDescuentoSeptimaEspecie);
        let totalVentaDescuentoSeptimaEspecie = parseFloat(item.totalVentaDescuentoSeptimaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoSeptimaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoSeptimaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoSeptimaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">GALLO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirOctavaFila(item) {
        let totalPeso = parseFloat(item.totalPesoOctavaEspecie);
        let totalCantidad = parseInt(item.totalCantidadOctavaEspecie);
        let totalVenta = parseFloat(item.totalVentaOctavaEspecie);
        let totalPesoDescuentoOctavaEspecie = parseFloat(item.totalPesoDescuentoOctavaEspecie);
        let totalCantidadDescuentoOctavaEspecie = parseInt(item.totalCantidadDescuentoOctavaEspecie);
        let totalVentaDescuentoOctavaEspecie = parseFloat(item.totalVentaDescuentoOctavaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoOctavaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoOctavaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoOctavaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">POLLO MALTRATADO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDecimaFila(item) {
        let totalPeso = parseFloat(item.totalPesoDecimaEspecie);
        let totalCantidad = parseInt(item.totalCantidadDecimaEspecie);
        let totalVenta = parseFloat(item.totalVentaDecimaEspecie);
        let totalPesoDescuentoDecimaEspecie = parseFloat(item.totalPesoDescuentoDecimaEspecie);
        let totalCantidadDescuentoDecimaEspecie = parseInt(item.totalCantidadDescuentoDecimaEspecie);
        let totalVentaDescuentoDecimaEspecie = parseFloat(item.totalVentaDescuentoDecimaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoDecimaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoDecimaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoDecimaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">PECHUGA</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDecimaPrimeraFila(item) {
        let totalPeso = parseFloat(item.totalPesoDecimaPrimeraEspecie);
        let totalCantidad = parseInt(item.totalCantidadDecimaPrimeraEspecie);
        let totalVenta = parseFloat(item.totalVentaDecimaPrimeraEspecie);
        let totalPesoDescuentoDecimaPrimeraEspecie = parseFloat(item.totalPesoDescuentoDecimaPrimeraEspecie);
        let totalCantidadDescuentoDecimaPrimeraEspecie = parseInt(item.totalCantidadDescuentoDecimaPrimeraEspecie);
        let totalVentaDescuentoDecimaPrimeraEspecie = parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie);

        totalPeso = totalPeso + totalPesoDescuentoDecimaPrimeraEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoDecimaPrimeraEspecie;
        totalVenta = totalVenta + totalVentaDescuentoDecimaPrimeraEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">PIERNA</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDecimaSegundaFila(item) {
        let totalPeso = parseFloat(item.totalPesoDecimaSegundaEspecie);
        let totalCantidad = parseInt(item.totalCantidadDecimaSegundaEspecie);
        let totalVenta = parseFloat(item.totalVentaDecimaSegundaEspecie);
        let totalPesoDescuentoDecimaSegundaEspecie = parseFloat(item.totalPesoDescuentoDecimaSegundaEspecie);
        let totalCantidadDescuentoDecimaSegundaEspecie = parseInt(item.totalCantidadDescuentoDecimaSegundaEspecie);
        let totalVentaDescuentoDecimaSegundaEspecie = parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoDecimaSegundaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoDecimaSegundaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoDecimaSegundaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">ALAS</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDecimaTerceraFila(item) {
        let totalPeso = parseFloat(item.totalPesoDecimaTerceraEspecie);
        let totalCantidad = parseInt(item.totalCantidadDecimaTerceraEspecie);
        let totalVenta = parseFloat(item.totalVentaDecimaTerceraEspecie);
        let totalPesoDescuentoDecimaTerceraEspecie = parseFloat(item.totalPesoDescuentoDecimaTerceraEspecie);
        let totalCantidadDescuentoDecimaTerceraEspecie = parseInt(item.totalCantidadDescuentoDecimaTerceraEspecie);
        let totalVentaDescuentoDecimaTerceraEspecie = parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie);

        totalPeso = totalPeso + totalPesoDescuentoDecimaTerceraEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoDecimaTerceraEspecie;
        totalVenta = totalVenta + totalVentaDescuentoDecimaTerceraEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">MENUDENCIA</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDecimaCuartaFila(item) {
        let totalPeso = parseFloat(item.totalPesoDecimaCuartaEspecie);
        let totalCantidad = parseInt(item.totalCantidadDecimaCuartaEspecie);
        let totalVenta = parseFloat(item.totalVentaDecimaCuartaEspecie);
        let totalPesoDescuentoDecimaCuartaEspecie = parseFloat(item.totalPesoDescuentoDecimaCuartaEspecie);
        let totalCantidadDescuentoDecimaCuartaEspecie = parseInt(item.totalCantidadDescuentoDecimaCuartaEspecie);
        let totalVentaDescuentoDecimaCuartaEspecie = parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoDecimaCuartaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoDecimaCuartaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoDecimaCuartaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">DORSO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDecimaQuintaFila(item) {
        let totalPeso = parseFloat(item.totalPesoDecimaQuintaEspecie);
        let totalCantidad = parseInt(item.totalCantidadDecimaQuintaEspecie);
        let totalVenta = parseFloat(item.totalVentaDecimaQuintaEspecie);
        let totalPesoDescuentoDecimaQuintaEspecie = parseFloat(item.totalPesoDescuentoDecimaQuintaEspecie);
        let totalCantidadDescuentoDecimaQuintaEspecie = parseInt(item.totalCantidadDescuentoDecimaQuintaEspecie);
        let totalVentaDescuentoDecimaQuintaEspecie = parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoDecimaQuintaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoDecimaQuintaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoDecimaQuintaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">OTROS</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDecimaSextaFila(item) {
        let totalPeso = parseFloat(item.totalPesoDecimaSextaEspecie);
        let totalCantidad = parseInt(item.totalCantidadDecimaSextaEspecie);
        let totalVenta = parseFloat(item.totalVentaDecimaSextaEspecie);
        let totalPesoDescuentoDecimaSextaEspecie = parseFloat(item.totalPesoDescuentoDecimaSextaEspecie);
        let totalCantidadDescuentoDecimaSextaEspecie = parseInt(item.totalCantidadDescuentoDecimaSextaEspecie);
        let totalVentaDescuentoDecimaSextaEspecie = parseFloat(item.totalVentaDescuentoDecimaSextaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoDecimaSextaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoDecimaSextaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoDecimaSextaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">POLLO XX</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDecimaSeptimaFila(item) {
        let totalPeso = parseFloat(item.totalPesoDecimaSeptimaEspecie);
        let totalCantidad = parseInt(item.totalCantidadDecimaSeptimaEspecie);
        let totalVenta = parseFloat(item.totalVentaDecimaSeptimaEspecie);
        let totalPesoDescuentoDecimaSeptimaEspecie = parseFloat(item.totalPesoDescuentoDecimaSeptimaEspecie);
        let totalCantidadDescuentoDecimaSeptimaEspecie = parseInt(item.totalCantidadDescuentoDecimaSeptimaEspecie);
        let totalVentaDescuentoDecimaSeptimaEspecie = parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoDecimaSeptimaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoDecimaSeptimaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoDecimaSeptimaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">BRASA YUGO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDecimaOctavaFila(item) {
        let totalPeso = parseFloat(item.totalPesoDecimaOctavaEspecie);
        let totalCantidad = parseInt(item.totalCantidadDecimaOctavaEspecie);
        let totalVenta = parseFloat(item.totalVentaDecimaOctavaEspecie);
        let totalPesoDescuentoDecimaOctavaEspecie = parseFloat(item.totalPesoDescuentoDecimaOctavaEspecie);
        let totalCantidadDescuentoDecimaOctavaEspecie = parseInt(item.totalCantidadDescuentoDecimaOctavaEspecie);
        let totalVentaDescuentoDecimaOctavaEspecie = parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie);

        totalPeso = totalPeso + totalPesoDescuentoDecimaOctavaEspecie;
        totalCantidad = totalCantidad + totalCantidadDescuentoDecimaOctavaEspecie;
        totalVenta = totalVenta + totalVentaDescuentoDecimaOctavaEspecie;

        let promedio = 0;
        if (totalPeso != 0){
            promedio = totalPeso/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">BRASA TECNICO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirDescuentoFila(item) {

        let totalPeso = parseFloat(item.totalPesoDescuento);

        let totalCantidad = 0;

        let totalVenta = parseFloat(item.totalVentaDescuento);

        let promedio = 0;
        if (totalPeso != 0 && totalCantidad != 0){
            promedio = (totalPeso)/totalCantidad;
        }else{
            promedio = 0;
        }

        let totalPrecioVenta = 0;
        if (totalVenta != 0){
            totalPrecioVenta = totalVenta/totalPeso;
        }else{
            totalPrecioVenta = 0;
        }

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">DESCUENTOS</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(totalPeso).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalVenta.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${(promedio).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirFilasTotales(item) {

        let totalVentaPrimerEspecie = parseFloat(item.totalVentaPrimerEspecie);
        let totalVentaSegundaEspecie = parseFloat(item.totalVentaSegundaEspecie);
        let totalVentaTerceraEspecie = parseFloat(item.totalVentaTerceraEspecie);
        let totalVentaCuartaEspecie = parseFloat(item.totalVentaCuartaEspecie);
        let totalVentaQuintaEspecie = parseFloat(item.totalVentaQuintaEspecie);
        let totalVentaSextaEspecie = parseFloat(item.totalVentaSextaEspecie);
        let totalVentaSeptimaEspecie = parseFloat(item.totalVentaSeptimaEspecie);
        let totalVentaOctavaEspecie = parseFloat(item.totalVentaOctavaEspecie);
        let totalVentaDecimaEspecie = parseFloat(item.totalVentaDecimaEspecie);
        let totalVentaDecimaPrimeraEspecie = parseFloat(item.totalVentaDecimaPrimeraEspecie);
        let totalVentaDecimaSegundaEspecie = parseFloat(item.totalVentaDecimaSegundaEspecie);
        let totalVentaDecimaTerceraEspecie = parseFloat(item.totalVentaDecimaTerceraEspecie);
        let totalVentaDecimaCuartaEspecie = parseFloat(item.totalVentaDecimaCuartaEspecie);
        let totalVentaDecimaQuintaEspecie = parseFloat(item.totalVentaDecimaQuintaEspecie);
        let totalVentaDecimaSextaEspecie = parseFloat(item.totalVentaDecimaSextaEspecie);
        let totalVentaDecimaSeptimaEspecie = parseFloat(item.totalVentaDecimaSeptimaEspecie);
        let totalVentaDecimaOctavaEspecie = parseFloat(item.totalVentaDecimaOctavaEspecie);

        let totalVentaDescuentoPrimerEspecie = parseFloat(item.totalVentaDescuentoPrimerEspecie);
        let totalVentaDescuentoSegundaEspecie = parseFloat(item.totalVentaDescuentoSegundaEspecie);
        let totalVentaDescuentoTerceraEspecie = parseFloat(item.totalVentaDescuentoTerceraEspecie);
        let totalVentaDescuentoCuartaEspecie = parseFloat(item.totalVentaDescuentoCuartaEspecie);
        let totalVentaDescuentoQuintaEspecie = parseFloat(item.totalVentaDescuentoQuintaEspecie);
        let totalVentaDescuentoSextaEspecie = parseFloat(item.totalVentaDescuentoSextaEspecie);
        let totalVentaDescuentoSeptimaEspecie = parseFloat(item.totalVentaDescuentoSeptimaEspecie);
        let totalVentaDescuentoOctavaEspecie = parseFloat(item.totalVentaDescuentoOctavaEspecie);
        let totalVentaDescuentoDecimaEspecie = parseFloat(item.totalVentaDescuentoDecimaEspecie);
        let totalVentaDescuentoDecimaPrimeraEspecie = parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie);
        let totalVentaDescuentoDecimaSegundaEspecie = parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie);
        let totalVentaDescuentoDecimaTerceraEspecie = parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie);
        let totalVentaDescuentoDecimaCuartaEspecie = parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie);
        let totalVentaDescuentoDecimaQuintaEspecie = parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie);
        let totalVentaDescuentoDecimaSextaEspecie = parseFloat(item.totalVentaDescuentoDecimaSextaEspecie);
        let totalVentaDescuentoDecimaSeptimaEspecie = parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie);
        let totalVentaDescuentoDecimaOctavaEspecie = parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie);

        let ventaTotalPrimerEspecie = totalVentaPrimerEspecie + totalVentaDescuentoPrimerEspecie;
        let ventaTotalSegundaEspecie = totalVentaSegundaEspecie + totalVentaDescuentoSegundaEspecie;
        let ventaTotalTerceraEspecie = totalVentaTerceraEspecie + totalVentaDescuentoTerceraEspecie;
        let ventaTotalCuartaEspecie = totalVentaCuartaEspecie + totalVentaDescuentoCuartaEspecie;
        let ventaTotalQuintaEspecie = totalVentaQuintaEspecie + totalVentaDescuentoQuintaEspecie;
        let ventaTotalSextaEspecie = totalVentaSextaEspecie + totalVentaDescuentoSextaEspecie;
        let ventaTotalSeptimaEspecie = totalVentaSeptimaEspecie + totalVentaDescuentoSeptimaEspecie;
        let ventaTotalOctavaEspecie = totalVentaOctavaEspecie + totalVentaDescuentoOctavaEspecie;
        let ventaTotalDecimaEspecie = totalVentaDecimaEspecie + totalVentaDescuentoDecimaEspecie;
        let ventaTotalDecimaPrimeraEspecie = totalVentaDecimaPrimeraEspecie + totalVentaDescuentoDecimaPrimeraEspecie;
        let ventaTotalDecimaSegundaEspecie = totalVentaDecimaSegundaEspecie + totalVentaDescuentoDecimaSegundaEspecie;
        let ventaTotalDecimaTerceraEspecie = totalVentaDecimaTerceraEspecie + totalVentaDescuentoDecimaTerceraEspecie;
        let ventaTotalDecimaCuartaEspecie = totalVentaDecimaCuartaEspecie + totalVentaDescuentoDecimaCuartaEspecie;
        let ventaTotalDecimaQuintaEspecie = totalVentaDecimaQuintaEspecie + totalVentaDescuentoDecimaQuintaEspecie;
        let ventaTotalDecimaSextaEspecie = totalVentaDecimaSextaEspecie + totalVentaDescuentoDecimaSextaEspecie;
        let ventaTotalDecimaSeptimaEspecie = totalVentaDecimaSeptimaEspecie + totalVentaDescuentoDecimaSeptimaEspecie;
        let ventaTotalDecimaOctavaEspecie = totalVentaDecimaOctavaEspecie + totalVentaDescuentoDecimaOctavaEspecie;

        let ventaTotal = ventaTotalPrimerEspecie + ventaTotalSegundaEspecie + ventaTotalTerceraEspecie + ventaTotalCuartaEspecie + ventaTotalQuintaEspecie + ventaTotalSextaEspecie + ventaTotalSeptimaEspecie + ventaTotalOctavaEspecie + ventaTotalDecimaEspecie + ventaTotalDecimaPrimeraEspecie + ventaTotalDecimaSegundaEspecie + ventaTotalDecimaTerceraEspecie + ventaTotalDecimaCuartaEspecie + ventaTotalDecimaQuintaEspecie + ventaTotalDecimaSextaEspecie + ventaTotalDecimaSeptimaEspecie + ventaTotalDecimaOctavaEspecie + item.totalVentaDescuento;

        let ventaAnterior = parseFloat(item.ventaAnterior);
        let pagoAnterior = parseFloat(item.pagoAnterior);
        let descuentoAnterior = parseFloat(item.totalVentaDescuentoAnterior);

        let totalVentaAnterior = ventaAnterior - pagoAnterior + descuentoAnterior;

        let saldoDelDia = totalVentaAnterior + ventaTotal;

        let saldoActual = saldoDelDia - parseFloat(item.pagos);

        return `
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="5"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="2"></td>
                <td class="text-center"></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL VENTA</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(ventaTotal).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">SALDO ANTERIOR</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(totalVentaAnterior).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="5"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="2"></td>
                <td class="text-center"></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">SALDO DEL DIA</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(saldoDelDia).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">PAGOS</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(item.pagos).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="5"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="2"></td>
                <td class="text-center"></td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">SALDO ACTUAL</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${(saldoActual).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
        `;
    }

    // Función para formatear la fecha
    function formatearFecha(fecha) {
        // Array con los nombres de los días de la semana en español
        let diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        // Array con los nombres de los meses en español
        let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        
        // Obtener los componentes de la fecha
        let diaSemana = diasSemana[fecha.getDay()];
        let dia = fecha.getDate();
        let mes = meses[fecha.getMonth()];
        let año = fecha.getFullYear();
        
        // Formatear la fecha
        return diaSemana + " " + (dia < 10 ? '0' : '') + dia + " de " + mes + " del " + año;
    }

    // Obtener la fecha actual
    let fechaActual = new Date();
    
    // Formatear la fecha
    let fechaFormateada = formatearFecha(fechaActual);

    console.log(fechaFormateada);
    
    // Insertar la fecha formateada en el elemento con id fechaReporteExcel
    $("#fechaReporteExcelTitle").text(fechaFormateada);

    $('#filtrarReporteAcumuladoDesdeHastaExcel').on('click', function () {
        let fechaEnviar = $('#fechaReporteExcel').val();
        fn_TraerReporteAcumuladoDetalle(fechaEnviar,fechaEnviar);
    });

    function fn_construirFilasReporteAcumuladoDetalleExcel(combinedDataArray){
        let bodyReporteAcumuladoExcel="";
        let tbodyReporteAcumuladoExcel = $('#bodyReporteAcumuladoExcel');
        tbodyReporteAcumuladoExcel.empty();

        let cantidad1 = 0;
        let cantidad2 = 0;
        let cantidad3 = 0;
        let cantidad4 = 0;
        let cantidad5 = 0;
        let cantidad6 = 0;
        let cantidad7 = 0;
        let cantidad8 = 0;
        let cantidad10 = 0;
        let cantidad11 = 0;
        let cantidad12 = 0;
        let cantidad13 = 0;
        let cantidad14 = 0;
        let cantidad15 = 0;
        let cantidad16 = 0;
        let cantidad17 = 0;
        let cantidad18 = 0;

        let peso1 = 0.00;
        let peso2 = 0.00;
        let peso3 = 0.00;
        let peso4 = 0.00;
        let peso5 = 0.00;
        let peso6 = 0.00;
        let peso7 = 0.00;
        let peso8 = 0.00;
        let peso10 = 0.00;
        let peso11 = 0.00;
        let peso12 = 0.00;
        let peso13 = 0.00;
        let peso14 = 0.00;
        let peso15 = 0.00;
        let peso16 = 0.00;
        let peso17 = 0.00;
        let peso18 = 0.00;

        let venta1 = 0.00;
        let venta2 = 0.00;
        let venta3 = 0.00;
        let venta4 = 0.00;
        let venta5 = 0.00;
        let venta6 = 0.00;
        let venta7 = 0.00;
        let venta8 = 0.00;
        let venta10 = 0.00;
        let venta11 = 0.00;
        let venta12 = 0.00;
        let venta13 = 0.00;
        let venta14 = 0.00;
        let venta15 = 0.00;
        let venta16 = 0.00;
        let venta17 = 0.00;
        let venta18 = 0.00;

        combinedDataArray.forEach(function (item) {
            bodyReporteAcumuladoExcel += construirFilaExcel(item);

            peso1 += parseFloat(item.totalPesoPrimerEspecie);
            peso2 += parseFloat(item.totalPesoSegundaEspecie);
            peso3 += parseFloat(item.totalPesoTerceraEspecie);
            peso4 += parseFloat(item.totalPesoCuartaEspecie);
            peso5 += parseFloat(item.totalPesoQuintaEspecie);
            peso6 += parseFloat(item.totalPesoSextaEspecie);
            peso7 += parseFloat(item.totalPesoSeptimaEspecie);
            peso8 += parseFloat(item.totalPesoOctavaEspecie);
            peso10 += parseFloat(item.totalPesoDecimaEspecie);
            peso11 += parseFloat(item.totalPesoDecimaPrimeraEspecie);
            peso12 += parseFloat(item.totalPesoDecimaSegundaEspecie);
            peso13 += parseFloat(item.totalPesoDecimaTerceraEspecie);
            peso14 += parseFloat(item.totalPesoDecimaCuartaEspecie);
            peso15 += parseFloat(item.totalPesoDecimaQuintaEspecie);
            peso16 += parseFloat(item.totalPesoDecimaSextaEspecie);
            peso17 += parseFloat(item.totalPesoDecimaSeptimaEspecie);
            peso18 += parseFloat(item.totalPesoDecimaOctavaEspecie);

            cantidad1 += parseInt(item.totalCantidadPrimerEspecie);
            cantidad2 += parseInt(item.totalCantidadSegundaEspecie);
            cantidad3 += parseInt(item.totalCantidadTerceraEspecie);
            cantidad4 += parseInt(item.totalCantidadCuartaEspecie);
            cantidad5 += parseInt(item.totalCantidadQuintaEspecie);
            cantidad6 += parseInt(item.totalCantidadSextaEspecie);
            cantidad7 += parseInt(item.totalCantidadSeptimaEspecie);
            cantidad8 += parseInt(item.totalCantidadOctavaEspecie);
            cantidad10 += parseInt(item.totalCantidadDecimaEspecie);
            cantidad11 += parseInt(item.totalCantidadDecimaPrimeraEspecie);
            cantidad12 += parseInt(item.totalCantidadDecimaSegundaEspecie);
            cantidad13 += parseInt(item.totalCantidadDecimaTerceraEspecie);
            cantidad14 += parseInt(item.totalCantidadDecimaCuartaEspecie);
            cantidad15 += parseInt(item.totalCantidadDecimaQuintaEspecie);
            cantidad16 += parseInt(item.totalCantidadDecimaSextaEspecie);
            cantidad17 += parseInt(item.totalCantidadDecimaSeptimaEspecie);
            cantidad18 += parseInt(item.totalCantidadDecimaOctavaEspecie);

            venta1 += parseFloat(item.totalVentaPrimerEspecie);
            venta2 += parseFloat(item.totalVentaSegundaEspecie);
            venta3 += parseFloat(item.totalVentaTerceraEspecie);
            venta4 += parseFloat(item.totalVentaCuartaEspecie);
            venta5 += parseFloat(item.totalVentaQuintaEspecie);
            venta6 += parseFloat(item.totalVentaSextaEspecie);
            venta7 += parseFloat(item.totalVentaSeptimaEspecie);
            venta8 += parseFloat(item.totalVentaOctavaEspecie);
            venta10 += parseFloat(item.totalVentaDecimaEspecie);
            venta11 += parseFloat(item.totalVentaDecimaPrimeraEspecie);
            venta12 += parseFloat(item.totalVentaDecimaSegundaEspecie);
            venta13 += parseFloat(item.totalVentaDecimaTerceraEspecie);
            venta14 += parseFloat(item.totalVentaDecimaCuartaEspecie);
            venta15 += parseFloat(item.totalVentaDecimaQuintaEspecie);
            venta16 += parseFloat(item.totalVentaDecimaSextaEspecie);
            venta17 += parseFloat(item.totalVentaDecimaSeptimaEspecie);
            venta18 += parseFloat(item.totalVentaDecimaOctavaEspecie);
        });
        //console.log("bodyReporteAcumuladoExcel",bodyReporteAcumuladoExcel);
        bodyReporteAcumuladoExcel += construirFilaTotalExcel(cantidad1, cantidad2, cantidad3, cantidad4, cantidad5, cantidad6
            , cantidad7, cantidad8, cantidad10, cantidad11, cantidad12, cantidad13
            , cantidad14, cantidad15, cantidad16, cantidad17, cantidad18,
            peso1, peso2, peso3 , peso4, peso5, peso6, peso7, peso8, peso10
            , peso11, peso12, peso13, peso14, peso15, peso16, peso17, peso18
            , venta1, venta2, venta3, venta4, venta5, venta6, venta7, venta8
            , venta10, venta11, venta12, venta13, venta14, venta15, venta16
            , venta17, venta18);
        tbodyReporteAcumuladoExcel.html(bodyReporteAcumuladoExcel);
    }

    function construirFilaTotalExcel(
        cantidad1, cantidad2, cantidad3, cantidad4, cantidad5, cantidad6
        , cantidad7, cantidad8, cantidad10, cantidad11, cantidad12, cantidad13
        , cantidad14, cantidad15, cantidad16, cantidad17, cantidad18,
        peso1, peso2, peso3 , peso4, peso5, peso6, peso7, peso8, peso10
        , peso11, peso12, peso13, peso14, peso15, peso16, peso17, peso18
        , venta1, venta2, venta3, venta4, venta5, venta6, venta7, venta8
        , venta10, venta11, venta12, venta13, venta14, venta15, venta16
        , venta17, venta18) {

        let precio1 = 0;
        if (venta1 != 0 && peso1 != 0){
            precio1 = venta1 / peso1;
        }
        let promedio1 = 0;
        if (peso1 != 0 && cantidad1 != 0){
            promedio1 = peso1 / cantidad1;
        }

        let precio2 = 0;
        if (venta2 != 0 && peso2 != 0){
            precio2 = venta2 / peso2;
        }
        let promedio2 = 0;
        if (peso2 != 0 && cantidad2 != 0){
            promedio2 = peso2 / cantidad2;
        }

        let precio3 = 0;
        if (venta3 != 0 && peso3 != 0){
            precio3 = venta3 / peso3;
        }
        let promedio3 = 0;
        if (peso3 != 0 && cantidad3 != 0){
            promedio3 = peso3 / cantidad3;
        }

            return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">TOTAL</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${cantidad1}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(peso1).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precio1).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${venta1.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio1).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${cantidad2}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(peso2).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precio2).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${venta2.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio2).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${cantidad3}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(peso3).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precio3).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${venta3.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio3).toFixed(2)}</td>
            </tr>
        `;
    }

    function construirFilaExcel(item) {
        let totalPeso1 = parseFloat(item.totalPesoPrimerEspecie);
        let totalCantidad1 = parseInt(item.totalCantidadPrimerEspecie);
        let totalVenta1 = parseFloat(item.totalVentaPrimerEspecie);
        let totalPesoDescuentoPrimerEspecie1 = parseFloat(item.totalPesoDescuentoPrimerEspecie);
        let totalCantidadDescuentoPrimerEspecie1 = parseInt(item.totalCantidadDescuentoPrimerEspecie);
        let totalVentaDescuentoPrimerEspecie1 = parseFloat(item.totalVentaDescuentoPrimerEspecie);

        totalPeso1 = totalPeso1 + totalPesoDescuentoPrimerEspecie1;
        totalCantidad1 = totalCantidad1 + totalCantidadDescuentoPrimerEspecie1;
        totalVenta1 = totalVenta1 + totalVentaDescuentoPrimerEspecie1;

        let promedio1 = 0;
        if (totalPeso1 != 0){
            promedio1 = totalPeso1/totalCantidad1;
        }else{
            promedio1 = 0;
        }

        let totalPrecioVenta1 = 0;
        if (totalVenta1 != 0){
            totalPrecioVenta1 = totalVenta1/totalPeso1;
        }else{
            totalPrecioVenta1 = 0;
        }

        // ==============================================

        let totalPeso2 = parseFloat(item.totalPesoSegundaEspecie);
        let totalCantidad2 = parseInt(item.totalCantidadSegundaEspecie);
        let totalVenta2 = parseFloat(item.totalVentaSegundaEspecie);
        let totalPesoDescuentoSegundaEspecie2 = parseFloat(item.totalPesoDescuentoSegundaEspecie);
        let totalCantidadDescuentoSegundaEspecie2 = parseInt(item.totalCantidadDescuentoSegundaEspecie);
        let totalVentaDescuentoSegundaEspecie2 = parseFloat(item.totalVentaDescuentoSegundaEspecie);

        totalPeso2 = totalPeso2 + totalPesoDescuentoSegundaEspecie2;
        totalCantidad2 = totalCantidad2 + totalCantidadDescuentoSegundaEspecie2;
        totalVenta2 = totalVenta2 + totalVentaDescuentoSegundaEspecie2;

        let promedio2 = 0;
        if (totalPeso2 != 0){
            promedio2 = totalPeso2/totalCantidad2;
        }else{
            promedio2 = 0;
        }

        let totalPrecioVenta2 = 0;
        if (totalVenta2 != 0){
            totalPrecioVenta2 = totalVenta2/totalPeso2;
        }else{
            totalPrecioVenta2 = 0;
        }

        // ==============================================

        let totalPeso3 = parseFloat(item.totalPesoTerceraEspecie);
        let totalCantidad3 = parseInt(item.totalCantidadTerceraEspecie);
        let totalVenta3 = parseFloat(item.totalVentaTerceraEspecie);
        let totalPesoDescuentoTerceraEspecie3 = parseFloat(item.totalPesoDescuentoTerceraEspecie);
        let totalCantidadDescuentoTerceraEspecie3 = parseInt(item.totalCantidadDescuentoTerceraEspecie);
        let totalVentaDescuentoTerceraEspecie3 = parseFloat(item.totalVentaDescuentoTerceraEspecie);

        totalPeso3 = totalPeso3 + totalPesoDescuentoTerceraEspecie3;
        totalCantidad3 = totalCantidad3 + totalCantidadDescuentoTerceraEspecie3;
        totalVenta3 = totalVenta3 + totalVentaDescuentoTerceraEspecie3;

        let promedio3 = 0;
        if (totalPeso3 != 0){
            promedio3 = totalPeso3/totalCantidad3;
        }else{
            promedio3 = 0;
        }

        let totalPrecioVenta3 = 0;
        if (totalVenta3 != 0){
            totalPrecioVenta3 = totalVenta3/totalPeso3;
        }else{
            totalPrecioVenta3 = 0;
        }

        // ==============================================

        let totalPeso4 = parseFloat(item.totalPesoCuartaEspecie);
        let totalCantidad4 = parseInt(item.totalCantidadCuartaEspecie);
        let totalVenta4 = parseFloat(item.totalVentaCuartaEspecie);
        let totalPesoDescuentoCuartaEspecie4 = parseFloat(item.totalPesoDescuentoCuartaEspecie);
        let totalCantidadDescuentoCuartaEspecie4 = parseInt(item.totalCantidadDescuentoCuartaEspecie);
        let totalVentaDescuentoCuartaEspecie4 = parseFloat(item.totalVentaDescuentoCuartaEspecie);

        totalPeso4 = totalPeso4 + totalPesoDescuentoCuartaEspecie4;
        totalCantidad4 = totalCantidad4 + totalCantidadDescuentoCuartaEspecie4;
        totalVenta4 = totalVenta4 + totalVentaDescuentoCuartaEspecie4;

        let promedio4 = 0;
        if (totalPeso4 != 0){
            promedio4 = totalPeso4/totalCantidad4;
        }else{
            promedio4 = 0;
        }

        let totalPrecioVenta4 = 0;
        if (totalVenta4 != 0){
            totalPrecioVenta4 = totalVenta4/totalPeso4;
        }else{
            totalPrecioVenta4 = 0;
        }

        // ==============================================

        let totalPeso5 = parseFloat(item.totalPesoQuintaEspecie);
        let totalCantidad5 = parseInt(item.totalCantidadQuintaEspecie);
        let totalVenta5 = parseFloat(item.totalVentaQuintaEspecie);
        let totalPesoDescuentoQuintaEspecie5 = parseFloat(item.totalPesoDescuentoQuintaEspecie);
        let totalCantidadDescuentoQuintaEspecie5 = parseInt(item.totalCantidadDescuentoQuintaEspecie);
        let totalVentaDescuentoQuintaEspecie5 = parseFloat(item.totalVentaDescuentoQuintaEspecie);

        totalPeso5 = totalPeso5 + totalPesoDescuentoQuintaEspecie5;
        totalCantidad5 = totalCantidad5 + totalCantidadDescuentoQuintaEspecie5;
        totalVenta5 = totalVenta5 + totalVentaDescuentoQuintaEspecie5;

        let promedio5 = 0;
        if (totalPeso5 != 0){
            promedio5 = totalPeso5/totalCantidad5;
        }else{
            promedio5 = 0;
        }

        let totalPrecioVenta5 = 0;
        if (totalVenta5 != 0){
            totalPrecioVenta5 = totalVenta5/totalPeso5;
        }else{
            totalPrecioVenta5 = 0;
        }

        // ==============================================

        let totalPeso6 = parseFloat(item.totalPesoSextaEspecie);
        let totalCantidad6 = parseInt(item.totalCantidadSextaEspecie);
        let totalVenta6 = parseFloat(item.totalVentaSextaEspecie);
        let totalPesoDescuentoSextaEspecie6 = parseFloat(item.totalPesoDescuentoSextaEspecie);
        let totalCantidadDescuentoSextaEspecie6 = parseInt(item.totalCantidadDescuentoSextaEspecie);
        let totalVentaDescuentoSextaEspecie6 = parseFloat(item.totalVentaDescuentoSextaEspecie);

        totalPeso6 = totalPeso6 + totalPesoDescuentoSextaEspecie6;
        totalCantidad6 = totalCantidad6 + totalCantidadDescuentoSextaEspecie6;
        totalVenta6 = totalVenta6 + totalVentaDescuentoSextaEspecie6;

        let promedio6 = 0;
        if (totalPeso6 != 0){
            promedio6 = totalPeso6/totalCantidad6;
        }else{
            promedio6 = 0;
        }

        let totalPrecioVenta6 = 0;
        if (totalVenta6 != 0){
            totalPrecioVenta6 = totalVenta6/totalPeso6;
        }else{
            totalPrecioVenta6 = 0;
        }

        // ==============================================

        let totalPeso7 = parseFloat(item.totalPesoSeptimaEspecie);
        let totalCantidad7 = parseInt(item.totalCantidadSeptimaEspecie);
        let totalVenta7 = parseFloat(item.totalVentaSeptimaEspecie);
        let totalPesoDescuentoSeptimaEspecie7 = parseFloat(item.totalPesoDescuentoSeptimaEspecie);
        let totalCantidadDescuentoSeptimaEspecie7 = parseInt(item.totalCantidadDescuentoSeptimaEspecie);
        let totalVentaDescuentoSeptimaEspecie7 = parseFloat(item.totalVentaDescuentoSeptimaEspecie);

        totalPeso7 = totalPeso7 + totalPesoDescuentoSeptimaEspecie7;
        totalCantidad7 = totalCantidad7 + totalCantidadDescuentoSeptimaEspecie7;
        totalVenta7 = totalVenta7 + totalVentaDescuentoSeptimaEspecie7;

        let promedio7 = 0;
        if (totalPeso7 != 0){
            promedio7 = totalPeso7/totalCantidad7;
        }else{
            promedio7 = 0;
        }

        let totalPrecioVenta7 = 0;
        if (totalVenta7 != 0){
            totalPrecioVenta7 = totalVenta7/totalPeso7;
        }else{
            totalPrecioVenta7 = 0;
        }

        // ==============================================

        let totalPeso8 = parseFloat(item.totalPesoOctavaEspecie);
        let totalCantidad8 = parseInt(item.totalCantidadOctavaEspecie);
        let totalVenta8 = parseFloat(item.totalVentaOctavaEspecie);
        let totalPesoDescuentoOctavaEspecie8 = parseFloat(item.totalPesoDescuentoOctavaEspecie);
        let totalCantidadDescuentoOctavaEspecie8 = parseInt(item.totalCantidadDescuentoOctavaEspecie);
        let totalVentaDescuentoOctavaEspecie8 = parseFloat(item.totalVentaDescuentoOctavaEspecie);

        totalPeso8 = totalPeso8 + totalPesoDescuentoOctavaEspecie8;
        totalCantidad8 = totalCantidad8 + totalCantidadDescuentoOctavaEspecie8;
        totalVenta8 = totalVenta8 + totalVentaDescuentoOctavaEspecie8;

        let promedio8 = 0;
        if (totalPeso8 != 0){
            promedio8 = totalPeso8/totalCantidad8;
        }else{
            promedio8 = 0;
        }

        let totalPrecioVenta8 = 0;
        if (totalVenta8 != 0){
            totalPrecioVenta8 = totalVenta8/totalPeso8;
        }else{
            totalPrecioVenta8 = 0;
        }

        // ==============================================

        let totalPeso10 = parseFloat(item.totalPesoDecimaEspecie);
        let totalCantidad10 = parseInt(item.totalCantidadDecimaEspecie);
        let totalVenta10 = parseFloat(item.totalVentaDecimaEspecie);
        let totalPesoDescuentoDecimaEspecie10 = parseFloat(item.totalPesoDescuentoDecimaEspecie);
        let totalCantidadDescuentoDecimaEspecie10 = parseInt(item.totalCantidadDescuentoDecimaEspecie);
        let totalVentaDescuentoDecimaEspecie10 = parseFloat(item.totalVentaDescuentoDecimaEspecie);

        totalPeso10 = totalPeso10 + totalPesoDescuentoDecimaEspecie10;
        totalCantidad10 = totalCantidad10 + totalCantidadDescuentoDecimaEspecie10;
        totalVenta10 = totalVenta10 + totalVentaDescuentoDecimaEspecie10;

        let promedio10 = 0;
        if (totalPeso10 != 0){
            promedio10 = totalPeso10/totalCantidad10;
        }else{
            promedio10 = 0;
        }

        let totalPrecioVenta10 = 0;
        if (totalVenta10 != 0){
            totalPrecioVenta10 = totalVenta10/totalPeso10;
        }else{
            totalPrecioVenta10 = 0;
        }

        // ==============================================

        let totalPeso11 = parseFloat(item.totalPesoDecimaPrimeraEspecie);
        let totalCantidad11 = parseInt(item.totalCantidadDecimaPrimeraEspecie);
        let totalVenta11 = parseFloat(item.totalVentaDecimaPrimeraEspecie);
        let totalPesoDescuentoDecimaPrimeraEspecie11 = parseFloat(item.totalPesoDescuentoDecimaPrimeraEspecie);
        let totalCantidadDescuentoDecimaPrimeraEspecie11 = parseInt(item.totalCantidadDescuentoDecimaPrimeraEspecie);
        let totalVentaDescuentoDecimaPrimeraEspecie11 = parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie);

        totalPeso11 = totalPeso11 + totalPesoDescuentoDecimaPrimeraEspecie11;
        totalCantidad11 = totalCantidad11 + totalCantidadDescuentoDecimaPrimeraEspecie11;
        totalVenta11 = totalVenta11 + totalVentaDescuentoDecimaPrimeraEspecie11;

        let promedio11 = 0;
        if (totalPeso11 != 0){
            promedio11 = totalPeso11/totalCantidad11;
        }else{
            promedio11 = 0;
        }

        let totalPrecioVenta11 = 0;
        if (totalVenta11 != 0){
            totalPrecioVenta11 = totalVenta11/totalPeso11;
        }else{
            totalPrecioVenta11 = 0;
        }

        // ==============================================

        let totalPeso12 = parseFloat(item.totalPesoDecimaSegundaEspecie);
        let totalCantidad12 = parseInt(item.totalCantidadDecimaSegundaEspecie);
        let totalVenta12 = parseFloat(item.totalVentaDecimaSegundaEspecie);
        let totalPesoDescuentoDecimaSegundaEspecie12 = parseFloat(item.totalPesoDescuentoDecimaSegundaEspecie);
        let totalCantidadDescuentoDecimaSegundaEspecie12 = parseInt(item.totalCantidadDescuentoDecimaSegundaEspecie);
        let totalVentaDescuentoDecimaSegundaEspecie12 = parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie);

        totalPeso12 = totalPeso12 + totalPesoDescuentoDecimaSegundaEspecie12;
        totalCantidad12 = totalCantidad12 + totalCantidadDescuentoDecimaSegundaEspecie12;
        totalVenta12 = totalVenta12 + totalVentaDescuentoDecimaSegundaEspecie12;

        let promedio12 = 0;
        if (totalPeso12 != 0){
            promedio12 = totalPeso12/totalCantidad12;
        }else{
            promedio12 = 0;
        }

        let totalPrecioVenta12 = 0;
        if (totalVenta12 != 0){
            totalPrecioVenta12 = totalVenta12/totalPeso12;
        }else{
            totalPrecioVenta12 = 0;
        }

        // ==============================================

        let totalPeso13 = parseFloat(item.totalPesoDecimaTerceraEspecie);
        let totalCantidad13 = parseInt(item.totalCantidadDecimaTerceraEspecie);
        let totalVenta13 = parseFloat(item.totalVentaDecimaTerceraEspecie);
        let totalPesoDescuentoDecimaTerceraEspecie13 = parseFloat(item.totalPesoDescuentoDecimaTerceraEspecie);
        let totalCantidadDescuentoDecimaTerceraEspecie13 = parseInt(item.totalCantidadDescuentoDecimaTerceraEspecie);
        let totalVentaDescuentoDecimaTerceraEspecie13 = parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie);

        totalPeso13 = totalPeso13 + totalPesoDescuentoDecimaTerceraEspecie13;
        totalCantidad13 = totalCantidad13 + totalCantidadDescuentoDecimaTerceraEspecie13;
        totalVenta13 = totalVenta13 + totalVentaDescuentoDecimaTerceraEspecie13;

        let promedio13 = 0;
        if (totalPeso13 != 0){
            promedio13 = totalPeso13/totalCantidad13;
        }else{
            promedio13 = 0;
        }

        let totalPrecioVenta13 = 0;
        if (totalVenta13 != 0){
            totalPrecioVenta13 = totalVenta13/totalPeso13;
        }else{
            totalPrecioVenta13 = 0;
        }

        // ==============================================

        let totalPeso14 = parseFloat(item.totalPesoDecimaCuartaEspecie);
        let totalCantidad14 = parseInt(item.totalCantidadDecimaCuartaEspecie);
        let totalVenta14 = parseFloat(item.totalVentaDecimaCuartaEspecie);
        let totalPesoDescuentoDecimaCuartaEspecie14 = parseFloat(item.totalPesoDescuentoDecimaCuartaEspecie);
        let totalCantidadDescuentoDecimaCuartaEspecie14 = parseInt(item.totalCantidadDescuentoDecimaCuartaEspecie);
        let totalVentaDescuentoDecimaCuartaEspecie14 = parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie);

        totalPeso14 = totalPeso14 + totalPesoDescuentoDecimaCuartaEspecie14;
        totalCantidad14 = totalCantidad14 + totalCantidadDescuentoDecimaCuartaEspecie14;
        totalVenta14 = totalVenta14 + totalVentaDescuentoDecimaCuartaEspecie14;

        let promedio14 = 0;
        if (totalPeso14 != 0){
            promedio14 = totalPeso14/totalCantidad14;
        }else{
            promedio14 = 0;
        }

        let totalPrecioVenta14 = 0;
        if (totalVenta14 != 0){
            totalPrecioVenta14 = totalVenta14/totalPeso14;
        }else{
            totalPrecioVenta14 = 0;
        }

        // ==============================================

        let totalPeso15 = parseFloat(item.totalPesoDecimaQuintaEspecie);
        let totalCantidad15 = parseInt(item.totalCantidadDecimaQuintaEspecie);
        let totalVenta15 = parseFloat(item.totalVentaDecimaQuintaEspecie);
        let totalPesoDescuentoDecimaQuintaEspecie15 = parseFloat(item.totalPesoDescuentoDecimaQuintaEspecie);
        let totalCantidadDescuentoDecimaQuintaEspecie15 = parseInt(item.totalCantidadDescuentoDecimaQuintaEspecie);
        let totalVentaDescuentoDecimaQuintaEspecie15 = parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie);

        totalPeso15 = totalPeso15 + totalPesoDescuentoDecimaQuintaEspecie15;
        totalCantidad15 = totalCantidad15 + totalCantidadDescuentoDecimaQuintaEspecie15;
        totalVenta15 = totalVenta15 + totalVentaDescuentoDecimaQuintaEspecie15;

        let promedio15 = 0;
        if (totalPeso15 != 0){
            promedio15 = totalPeso15/totalCantidad15;
        }else{
            promedio15 = 0;
        }

        let totalPrecioVenta15 = 0;
        if (totalVenta15 != 0){
            totalPrecioVenta15 = totalVenta15/totalPeso15;
        }else{
            totalPrecioVenta15 = 0;
        }

        // ==============================================

        let totalPeso16 = parseFloat(item.totalPesoDecimaSextaEspecie);
        let totalCantidad16 = parseInt(item.totalCantidadDecimaSextaEspecie);
        let totalVenta16 = parseFloat(item.totalVentaDecimaSextaEspecie);
        let totalPesoDescuentoDecimaSextaEspecie16 = parseFloat(item.totalPesoDescuentoDecimaSextaEspecie);
        let totalCantidadDescuentoDecimaSextaEspecie16 = parseInt(item.totalCantidadDescuentoDecimaSextaEspecie);
        let totalVentaDescuentoDecimaSextaEspecie16 = parseFloat(item.totalVentaDescuentoDecimaSextaEspecie);

        totalPeso16 = totalPeso16 + totalPesoDescuentoDecimaSextaEspecie16;
        totalCantidad16 = totalCantidad16 + totalCantidadDescuentoDecimaSextaEspecie16;
        totalVenta16 = totalVenta16 + totalVentaDescuentoDecimaSextaEspecie16;

        let promedio16 = 0;
        if (totalPeso16 != 0){
            promedio16 = totalPeso16/totalCantidad16;
        }else{
            promedio16 = 0;
        }

        let totalPrecioVenta16 = 0;
        if (totalVenta16!= 0){
            totalPrecioVenta16 = totalVenta16/totalPeso16;
        }else{
            totalPrecioVenta16 = 0;
        }

        // ==============================================

        let totalPeso17 = parseFloat(item.totalPesoDecimaSeptimaEspecie);
        let totalCantidad17 = parseInt(item.totalCantidadDecimaSeptimaEspecie);
        let totalVenta17 = parseFloat(item.totalVentaDecimaSeptimaEspecie);
        let totalPesoDescuentoDecimaSeptimaEspecie17 = parseFloat(item.totalPesoDescuentoDecimaSeptimaEspecie);
        let totalCantidadDescuentoDecimaSeptimaEspecie17 = parseInt(item.totalCantidadDescuentoDecimaSeptimaEspecie);
        let totalVentaDescuentoDecimaSeptimaEspecie17 = parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie);

        totalPeso17 = totalPeso17 + totalPesoDescuentoDecimaSeptimaEspecie17;
        totalCantidad17 = totalCantidad17 + totalCantidadDescuentoDecimaSeptimaEspecie17;
        totalVenta17 = totalVenta17 + totalVentaDescuentoDecimaSeptimaEspecie17;

        let promedio17 = 0;
        if (totalPeso17 != 0){
            promedio17 = totalPeso17/totalCantidad17;
        }else{
            promedio17 = 0;
        }

        let totalPrecioVenta17 = 0;
        if (totalVenta17 != 0){
            totalPrecioVenta17 = totalVenta17/totalPeso17;
        }else{
            totalPrecioVenta17 = 0;
        }

        // ==============================================

        let totalPeso18 = parseFloat(item.totalPesoDecimaOctavaEspecie);
        let totalCantidad18 = parseInt(item.totalCantidadDecimaOctavaEspecie);
        let totalVenta18 = parseFloat(item.totalVentaDecimaOctavaEspecie);
        let totalPesoDescuentoDecimaOctavaEspecie18 = parseFloat(item.totalPesoDescuentoDecimaOctavaEspecie);
        let totalCantidadDescuentoDecimaOctavaEspecie18 = parseInt(item.totalCantidadDescuentoDecimaOctavaEspecie);
        let totalVentaDescuentoDecimaOctavaEspecie18 = parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie);

        totalPeso18 = totalPeso18 + totalPesoDescuentoDecimaOctavaEspecie18;
        totalCantidad18 = totalCantidad18 + totalCantidadDescuentoDecimaOctavaEspecie18;
        totalVenta18 = totalVenta18 + totalVentaDescuentoDecimaOctavaEspecie18;

        let promedio18 = 0;
        if (totalPeso18 != 0){
            promedio18 = totalPeso18/totalCantidad18;
        }else{
            promedio18 = 0;
        }

        let totalPrecioVenta18 = 0;
        if (totalVenta18 != 0){
            totalPrecioVenta18 = totalVenta18/totalPeso18;
        }else{
            totalPrecioVenta18 = 0;
        }

        // ==============================================

        let totalDelTotalCantidad = 0;
        let totalDelTotalPeso = 0.00;
        let totalDelTotalVenta = 0.00;

        totalDelTotalCantidad = totalCantidad1 +totalCantidad2 + totalCantidad3 + totalCantidad4 + totalCantidad5 + totalCantidad6 + totalCantidad7 + totalCantidad8 + totalCantidad10 + totalCantidad11 + totalCantidad12 + totalCantidad13 + totalCantidad14 + totalCantidad15 + totalCantidad16 + totalCantidad17 + totalCantidad18;

        totalDelTotalPeso = totalPeso1 + totalPeso2 + totalPeso3 + totalPeso4 + totalPeso5 + totalPeso6 + totalPeso7 + totalPeso8 + totalPeso10 + totalPeso11 + totalPeso12 + totalPeso13 + totalPeso14 + totalPeso15 + totalPeso16 + totalPeso17 + totalPeso18;

        totalDelTotalVenta = totalVenta1 + totalVenta2 + totalVenta3 + totalVenta4 + totalVenta5 + totalVenta6 + totalVenta7 + totalVenta8 + totalVenta10 + totalVenta11 + totalVenta12 + totalVenta13 + totalVenta14 + totalVenta15 + totalVenta16 + totalVenta17 + totalVenta18;

        return `
            <tr class="bg-white dark:text-gray-200 text-gray-900 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${item.nombreCompleto}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad1}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso1).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta1).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta1.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio1).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad2}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso2).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta2).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta2.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio2).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad3}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso3).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta3).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta3.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio3).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad4}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso4).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta4).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta4.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio4).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad5}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso5).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta5).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta5.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio5).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad6}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso6).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta6).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta6.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio6).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad7}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso7).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta7).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta7.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio7).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad8}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso8).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta8).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta8.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio8).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad10}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso10).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta10).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta10.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio10).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad11}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso11).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta11).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta11.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio11).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad12}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso12).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta12).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta12.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio12).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad13}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso13).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta13).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta13.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio13).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad14}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso14).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta14).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta14.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio14).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad15}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso15).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta15).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta15.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio15).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad16}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso16).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta16).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta16.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio16).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad17}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso17).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta17).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta17.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio17).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidad18}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPeso18).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta18).toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalVenta18.toFixed(2)}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(promedio18).toFixed(2)}</td>

                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${totalDelTotalCantidad}</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap">${(totalDelTotalPeso).toFixed(2)} Kg.</td>
                <td class="text-center border-2 py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#FFE699]">S/. ${totalDelTotalVenta.toFixed(2)}</td>
            </tr>
        `;
    }

});
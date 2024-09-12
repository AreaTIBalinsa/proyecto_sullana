import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var totalAPagar = 0;

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorCliente').val(fechaHoy);
    $('#fechaHastaReportePorCliente').val(fechaHoy);
    $('#fechaCambiarPrecioPesada').val(fechaHoy);
    var tipoUsuario = $('#tipoUsuario').data('id');
    var usuarioRegistroCli = $('#usuarioRegistroCli').data('id');
    var usuarioRegistroCliNombre = $('#usuarioRegistroCliNombre').data('id');

    declarar_especies();

    var primerEspecieGlobal = 0
    var segundaEspecieGlobal = 0
    var terceraEspecieGlobal = 0
    var cuartaEspecieGlobal = 0

    var nombrePrimerEspecieGlobal = ""
    var nombreSegundaEspecieGlobal = ""
    var nombreTerceraEspecieGlobal = ""
    var nombreCuartaEspecieGlobal = ""
    var nombreQuintaEspecieGlobal = ""
    var nombreSextaEspecieGlobal = ""
    var nombreSeptimaEspecieGlobal = ""
    var nombreOctavaEspecieGlobal = ""
    var nombreDecimaEspecieGlobal = ""
    var nombreDecimaPrimeraEspecieGlobal = ""
    var nombreDecimaSegundaEspecieGlobal = ""
    var nombreDecimaTerceraEspecieGlobal = ""
    var nombreDecimaCuartaEspecieGlobal = ""
    var nombreDecimaQuintaEspecieGlobal = ""
    var nombreDecimaSextaEspecieGlobal = ""
    var nombreDecimaSeptimaEspecieGlobal = ""
    var nombreDecimaOctavaEspecieGlobal = ""

    $('#btnExportarExcelReportePorCliente').on('click', function () {
        // Obtener los valores de los inputs
        var cliente = $('#idClientePorReporte').val();
        var fechaDesde = $('#fechaDesdeReportePorCliente').val();
        var fechaHasta = $('#fechaHastaReportePorCliente').val();
    
        // Obtener la tabla
        var tabla = document.getElementById("tablaReportePorCliente");

        // Obtener la primera celda
        var celda = tabla.rows[0].cells[0];

        // Cambiar el color de la celda
        celda.style.backgroundColor = "red";
    
        // Crear un nuevo libro de Excel
        var workbook = XLSX.utils.book_new();
    
        // Construir matriz de datos
        var dataMatrix = [
            [''],
            ['', 'Cliente:', cliente],
            ['', 'Fecha Desde:', fechaDesde, 'Fecha Hasta:', fechaHasta],
            ['']
        ];
    
        // Obtener las filas de la tabla
        var filas = tabla.rows;
    
        // Recorrer las filas de la tabla y agregar a la matriz de datos
        for (var i = 0; i < filas.length; i++) {
            var celdas = filas[i].cells;
            var row = [];
            for (var j = 1; j < celdas.length; j++) {
                if (j !== 9) {
                    var cellText = celdas[j].textContent;
                    row.push(cellText);
                }
            }
            dataMatrix.push(['', ...row]);
        }            
    
        // Crear la hoja de cálculo
        var sheet = XLSX.utils.aoa_to_sheet(dataMatrix);
    
        // Ajustar el ancho de las columnas al contenido
        var range = XLSX.utils.decode_range(sheet["!ref"]);
        for (var col = 1; col <= range.e.c; col++) {
            sheet["!cols"] = sheet["!cols"] || [];
            sheet["!cols"][col] = { wch: 15 }; // Ajusta el ancho a un valor fijo, puedes ajustar según tus necesidades
            if (sheet["!cols"][col].wch < 20) {
                sheet["!cols"][col].wch = 20; // Establecer el ancho mínimo
            }
        }
    
        // Agregar la hoja al libro
        XLSX.utils.book_append_sheet(workbook, sheet, "ReportePorCliente");
    
        // Generar un archivo Excel y descargarlo
        XLSX.writeFile(workbook, "Reporte_de_cliente_"+cliente+".xlsx");
    });              
    
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
                    nombreQuintaEspecieGlobal = response[4].nombreEspecie;
                    nombreSextaEspecieGlobal = response[5].nombreEspecie;
                    nombreSeptimaEspecieGlobal = response[6].nombreEspecie;
                    nombreOctavaEspecieGlobal = response[7].nombreEspecie;
                    nombreDecimaEspecieGlobal = response[8].nombreEspecie;
                    nombreDecimaPrimeraEspecieGlobal = response[9].nombreEspecie;
                    nombreDecimaSegundaEspecieGlobal = response[10].nombreEspecie;
                    nombreDecimaTerceraEspecieGlobal = response[11].nombreEspecie;
                    nombreDecimaCuartaEspecieGlobal = response[12].nombreEspecie;
                    nombreDecimaQuintaEspecieGlobal = response[13].nombreEspecie;
                    nombreDecimaSextaEspecieGlobal = response[14].nombreEspecie;
                    nombreDecimaSeptimaEspecieGlobal = response[15].nombreEspecie;
                    nombreDecimaOctavaEspecieGlobal = response[16].nombreEspecie;
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }
    
    $('#btnBuscarReportePorCliente').on('click', function () {
        let inputReportePorCliente = $('#codigoClienteSeleccionado').val();
        if (inputReportePorCliente.length > 1 || inputReportePorCliente != "") {
            let fechaDesde = $('#fechaDesdeReportePorCliente').val();
            let fechaHasta = $('#fechaHastaReportePorCliente').val();
            let codigoCliente = $('#codigoClienteSeleccionado').val();
            fn_TraerReportePorCliente(fechaDesde,fechaHasta,codigoCliente)
        } else {
            alertify.notify('Debe seleccionar un cliente.', 'error', 2);
        }
    });

    function fn_TraerReportePorCliente(fechaDesde,fechaHasta,codigoCliente) {
        $.ajax({
            url: '/fn_consulta_TraerReportePorCliente',
            method: 'GET',
            data: {
                fechaDesde : fechaDesde,
                fechaHasta : fechaHasta,
                codigoCliente : codigoCliente,
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    let bodyReportePorCliente="";

                    let tbodyReportePorCliente = $('#bodyReportePorCliente');
                    tbodyReportePorCliente.empty();

                    let fechasUnicas = new Set();
                    let sinRepetidos = response.filter((valorActual) => {
                        let fechaInicioString = JSON.stringify(valorActual.fechaRegistroPes);
                        if (!fechasUnicas.has(fechaInicioString)) {
                            fechasUnicas.add(fechaInicioString);
                            return true;
                        }
                        return false;
                    });

                    sinRepetidos.forEach(function (item) {
                        let totalPesoPrimerEspecie = 0;
                        let totalPesoSegundaEspecie = 0;
                        let totalPesoTerceraEspecie = 0;
                        let totalPesoCuartaEspecie = 0;
                        let totalPesoQuintaEspecie = 0;
                        let totalPesoSextaEspecie = 0;
                        let totalPesoSeptimaEspecie = 0;
                        let totalPesoOctavaEspecie = 0;
                        let totalPesoDecimaEspecie = 0;
                        let totalPesoDecimaPrimeraEspecie = 0;
                        let totalPesoDecimaSegundaEspecie = 0;
                        let totalPesoDecimaTerceraEspecie = 0;
                        let totalPesoDecimaCuartaEspecie = 0;
                        let totalPesoDecimaQuintaEspecie = 0;
                        let totalPesoDecimaSextaEspecie = 0;
                        let totalPesoDecimaSeptimaEspecie = 0;
                        let totalPesoDecimaOctavaEspecie = 0;

                        let totalCantidadPrimerEspecie = 0;
                        let totalCantidadSegundaEspecie = 0;
                        let totalCantidadTerceraEspecie = 0;
                        let totalCantidadCuartaEspecie = 0;
                        let totalCantidadQuintaEspecie = 0;
                        let totalCantidadSextaEspecie = 0;
                        let totalCantidadSeptimaEspecie = 0;
                        let totalCantidadOctavaEspecie = 0;
                        let totalCantidadDecimaEspecie = 0;
                        let totalCantidadDecimaPrimeraEspecie = 0;
                        let totalCantidadDecimaSegundaEspecie = 0;
                        let totalCantidadDecimaTerceraEspecie = 0;
                        let totalCantidadDecimaCuartaEspecie = 0;
                        let totalCantidadDecimaQuintaEspecie = 0;
                        let totalCantidadDecimaSextaEspecie = 0;
                        let totalCantidadDecimaSeptimaEspecie = 0;
                        let totalCantidadDecimaOctavaEspecie = 0;

                        let ventaPesoTotalNeto = 0
                        let ventaCantidadTotal = 0

                        bodyReportePorCliente += construirFilaFecha(item);
                        totalAPagar = 0

                        response.forEach(function (subItem) {
                            if (item.fechaRegistroPes === subItem.fechaRegistroPes) {
                                bodyReportePorCliente += construirFilaDatos(subItem);

                                let nombreEspecie = subItem.nombreEspecie;
                                let cantidadPes = parseInt(subItem.cantidadPes);
                                let pesoNetoPes = parseFloat(subItem.pesoNetoPes).toFixed(2);
                                let pesoNetoJabas = parseFloat(subItem.pesoNetoJabas).toFixed(2);

                                if (nombreEspecie == nombrePrimerEspecieGlobal) {
                                    totalCantidadPrimerEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoPrimerEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoPrimerEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreSegundaEspecieGlobal) {
                                    totalCantidadSegundaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoSegundaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoSegundaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreTerceraEspecieGlobal) {
                                    totalCantidadTerceraEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoTerceraEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoTerceraEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreCuartaEspecieGlobal) {
                                    totalCantidadCuartaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoCuartaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoCuartaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreQuintaEspecieGlobal) {
                                    totalCantidadQuintaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoQuintaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoQuintaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreSextaEspecieGlobal) {
                                    totalCantidadSextaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoSextaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoSextaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreSeptimaEspecieGlobal) {
                                    totalCantidadSeptimaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoSeptimaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoSeptimaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreOctavaEspecieGlobal) {
                                    totalCantidadOctavaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoOctavaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoOctavaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreDecimaEspecieGlobal) {
                                    totalCantidadDecimaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoDecimaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoDecimaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreDecimaPrimeraEspecieGlobal) {
                                    totalCantidadDecimaPrimeraEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoDecimaPrimeraEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoDecimaPrimeraEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreDecimaSegundaEspecieGlobal) {
                                    totalCantidadDecimaSegundaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoDecimaSegundaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoDecimaSegundaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreDecimaTerceraEspecieGlobal) {
                                    totalCantidadDecimaTerceraEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoDecimaTerceraEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoDecimaTerceraEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreDecimaCuartaEspecieGlobal) {
                                    totalCantidadDecimaCuartaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoDecimaCuartaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoDecimaCuartaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreDecimaQuintaEspecieGlobal) {
                                    totalCantidadDecimaQuintaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoDecimaQuintaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoDecimaQuintaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                } else if (nombreEspecie == nombreDecimaSextaEspecieGlobal) {
                                    totalCantidadDecimaSextaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoDecimaSextaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoDecimaSextaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                }else if (nombreEspecie == nombreDecimaSeptimaEspecieGlobal) {
                                    totalCantidadDecimaSeptimaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoDecimaSeptimaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoDecimaSeptimaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                }else if (nombreEspecie == nombreDecimaOctavaEspecieGlobal) {
                                    totalCantidadDecimaOctavaEspecie += cantidadPes;
                                    if (pesoNetoPes > 0){
                                        totalPesoDecimaOctavaEspecie += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                    }else{
                                        totalPesoDecimaOctavaEspecie += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                    }
                                }
                                if (parseFloat(pesoNetoPes) > 0){
                                    ventaPesoTotalNeto += parseFloat(pesoNetoPes) - parseFloat(pesoNetoJabas);
                                }else{
                                    ventaPesoTotalNeto += parseFloat(pesoNetoPes) + parseFloat(pesoNetoJabas);
                                }
                                ventaCantidadTotal += cantidadPes;
                            }
                        });
                        bodyReportePorCliente += `
                            <tr class="bg-white dark:bg-gray-800 h-0.5">
                                <td class="text-center" colspan="2"></td>
                                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="8"></td>
                            </tr>
                        `
                        bodyReportePorCliente += construirFilaTotales(
                            totalPesoPrimerEspecie,
                            totalPesoSegundaEspecie,
                            totalPesoTerceraEspecie,
                            totalPesoCuartaEspecie,
                            totalPesoQuintaEspecie,
                            totalPesoSextaEspecie,
                            totalPesoSeptimaEspecie,
                            totalPesoOctavaEspecie,
                            totalPesoDecimaEspecie,
                            totalPesoDecimaPrimeraEspecie,
                            totalPesoDecimaSegundaEspecie,
                            totalPesoDecimaTerceraEspecie,
                            totalPesoDecimaCuartaEspecie,
                            totalPesoDecimaQuintaEspecie,
                            totalPesoDecimaSextaEspecie,
                            totalPesoDecimaSeptimaEspecie,
                            totalPesoDecimaOctavaEspecie,

                            totalCantidadPrimerEspecie,
                            totalCantidadSegundaEspecie,
                            totalCantidadTerceraEspecie,
                            totalCantidadCuartaEspecie,
                            totalCantidadQuintaEspecie,
                            totalCantidadSextaEspecie,
                            totalCantidadSeptimaEspecie,
                            totalCantidadOctavaEspecie,
                            totalCantidadDecimaEspecie,
                            totalCantidadDecimaPrimeraEspecie,
                            totalCantidadDecimaSegundaEspecie,
                            totalCantidadDecimaTerceraEspecie,
                            totalCantidadDecimaCuartaEspecie,
                            totalCantidadDecimaQuintaEspecie,
                            totalCantidadDecimaSextaEspecie,
                            totalCantidadDecimaSeptimaEspecie,
                            totalCantidadDecimaOctavaEspecie,

                            ventaPesoTotalNeto,
                            ventaCantidadTotal
                        );
                    });

                    if (response.length > 0) {
                        tbodyReportePorCliente.html(bodyReportePorCliente);
                    }else {
                        tbodyReportePorCliente.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="9" class="text-center">No hay datos</td></tr>`);
                        alertify.notify('No se encontraron registros.', 'error', 2);
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

    function construirFilaFecha(item) {
        let mostrarColumnas = localStorage.getItem('editarDatos') === 'true'; // Verificar si editarDatos es true
    
        // Construir la fila de la tabla con la condición para las últimas columnas
        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 hidden"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${item.fechaRegistroPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                ${mostrarColumnas ? `
                    <td class="text-center py-1 px-2 whitespace-nowrap border-l-2"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                ` : `
                    <td class="text-center py-1 px-2 whitespace-nowrap hidden border-l-2"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap hidden"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap hidden"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap hidden"></td>
                `}
                <td class="text-center py-1 px-2 hidden"></td>
            </tr>
        `;
    }

    function construirFilaDatos(item) {
        let horaPes = item.horaPes
        let nombreEspecie = item.nombreEspecie
        let cantidadPes = parseInt(item.cantidadPes)
        let pesoNetoPes = parseFloat(item.pesoNetoPes).toFixed(2)
        let pesoNetoJabas = parseFloat(item.pesoNetoJabas).toFixed(2)
        let precioPes = parseFloat(item.precioPes).toFixed(2)

        let promedio = 0;
        if (pesoNetoPes !== 0) {
            promedio = ((pesoNetoPes > 0 ? pesoNetoPes - pesoNetoJabas : pesoNetoPes + pesoNetoJabas) / cantidadPes).toFixed(2);
        }

        let observacionPes = item.observacionPes
        if (observacionPes.trim() != "" && observacionPes!= "" && observacionPes != null){
            observacionPes = `
                <div class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                        <p>${observacionPes}</p>
                </div>`
        }else{
            observacionPes = "";
        }

        let pesoNeto = 0;

        if (parseFloat(item.pesoNetoPes).toFixed(2) > 0){
            pesoNeto = parseFloat(item.pesoNetoPes) - parseFloat(item.pesoNetoJabas)
        }else{
            pesoNeto = parseFloat(item.pesoNetoPes) + parseFloat(item.pesoNetoJabas)
        }

        let mostrarColumnas = localStorage.getItem('editarDatos') === 'true'; // Verificar si editarDatos es true

        totalAPagar += parseFloat(pesoNeto) * parseFloat(precioPes);

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="hidden">${item.idPesada}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${observacionPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${horaPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${cantidadPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${pesoNeto.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${promedio}</td>
                ${mostrarColumnas ? `
                    <td class="text-center py-1 px-2 cantidadReportePorCliente whitespace-nowrap border-l-2">${cantidadPes}</td>
                    <td class="text-center py-1 px-2 pesoReportePorCliente whitespace-nowrap">${pesoNetoPes}</td>
                    <td class="text-center py-1 px-2 pesoJabasReportePorCliente whitespace-nowrap">${pesoNetoJabas}</td>
                    <td class="text-center py-1 px-2 whitespace-nowrap">${precioPes}</td>
                `:`
                    <td class="text-center py-1 px-2 cantidadReportePorCliente whitespace-nowrap border-l-2 hidden">${cantidadPes}</td>
                    <td class="text-center py-1 px-2 pesoReportePorCliente whitespace-nowrap hidden">${pesoNetoPes}</td>
                    <td class="text-center py-1 px-2 pesoJabasReportePorCliente whitespace-nowrap hidden">${pesoNetoJabas}</td>
                    <td class="text-center py-1 px-2 whitespace-nowrap hidden">${precioPes}</td>
                `}
                <td class="hidden">${item.tabla_iden}</td>
            </tr>
        `;
    }

    function construirFilaTotales(
        totalPesoPrimerEspecie,
        totalPesoSegundaEspecie,
        totalPesoTerceraEspecie,
        totalPesoCuartaEspecie,
        totalPesoQuintaEspecie,
        totalPesoSextaEspecie,
        totalPesoSeptimaEspecie,
        totalPesoOctavaEspecie,
        totalPesoDecimaEspecie,
        totalPesoDecimaPrimeraEspecie,
        totalPesoDecimaSegundaEspecie,
        totalPesoDecimaTerceraEspecie,
        totalPesoDecimaCuartaEspecie,
        totalPesoDecimaQuintaEspecie,
        totalPesoDecimaSextaEspecie,
        totalPesoDecimaSeptimaEspecie,
        totalPesoDecimaOctavaEspecie,

        totalCantidadPrimerEspecie,
        totalCantidadSegundaEspecie,
        totalCantidadTerceraEspecie,
        totalCantidadCuartaEspecie,
        totalCantidadQuintaEspecie,
        totalCantidadSextaEspecie,
        totalCantidadSeptimaEspecie,
        totalCantidadOctavaEspecie,
        totalCantidadDecimaEspecie,
        totalCantidadDecimaPrimeraEspecie,
        totalCantidadDecimaSegundaEspecie,
        totalCantidadDecimaTerceraEspecie,
        totalCantidadDecimaCuartaEspecie,
        totalCantidadDecimaQuintaEspecie,
        totalCantidadDecimaSextaEspecie,
        totalCantidadDecimaSeptimaEspecie,
        totalCantidadDecimaOctavaEspecie,

        ventaPesoTotalNeto,
        ventaCantidadTotal)
    {
        let filas = [];

        let mostrarColumnas = localStorage.getItem('editarDatos') === 'true'; // Verificar si editarDatos es true
    
        function construirFila(nombreEspecie, totalCantidad, totalPeso) {
            if (totalCantidad !== 0 || totalPeso !== 0) {       
                return `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="text-center py-1 px-2 hidden"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL ${nombreEspecie.replace("POLLO", "").trim()}:</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidad === 1 ? `${totalCantidad} Ud.` : `${totalCantidad} Uds.`}</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">${totalPeso.toFixed(2)} Kg.</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        ${mostrarColumnas ? `
                            <td class="text-center py-1 px-2 whitespace-nowrap border-l-2"></td>
                            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        `:`
                            <td class="text-center py-1 px-2 whitespace-nowrap hidden border-l-2"></td>
                            <td class="text-center py-1 px-2 whitespace-nowrap hidden"></td>
                            <td class="text-center py-1 px-2 whitespace-nowrap hidden"></td>
                            <td class="text-center py-1 px-2 whitespace-nowrap hidden"></td>
                        `}
                        <td class="text-center py-1 px-2 hidden"></td>
                    </tr>
                `;
            } else {
                return '';
            }
        }        
    
        filas.push(construirFila(nombrePrimerEspecieGlobal, totalCantidadPrimerEspecie, totalPesoPrimerEspecie));
        filas.push(construirFila(nombreSegundaEspecieGlobal, totalCantidadSegundaEspecie, totalPesoSegundaEspecie));
        filas.push(construirFila(nombreTerceraEspecieGlobal, totalCantidadTerceraEspecie, totalPesoTerceraEspecie));
        filas.push(construirFila(nombreCuartaEspecieGlobal, totalCantidadCuartaEspecie, totalPesoCuartaEspecie));
        filas.push(construirFila(nombreQuintaEspecieGlobal, totalCantidadQuintaEspecie, totalPesoQuintaEspecie));
        filas.push(construirFila(nombreSextaEspecieGlobal, totalCantidadSextaEspecie, totalPesoSextaEspecie));
        filas.push(construirFila(nombreSeptimaEspecieGlobal, totalCantidadSeptimaEspecie, totalPesoSeptimaEspecie));
        filas.push(construirFila(nombreOctavaEspecieGlobal, totalCantidadOctavaEspecie, totalPesoOctavaEspecie));
        filas.push(construirFila(nombreDecimaEspecieGlobal, totalCantidadDecimaEspecie, totalPesoDecimaEspecie));
        filas.push(construirFila(nombreDecimaPrimeraEspecieGlobal, totalCantidadDecimaPrimeraEspecie, totalPesoDecimaPrimeraEspecie));
        filas.push(construirFila(nombreDecimaSegundaEspecieGlobal, totalCantidadDecimaSegundaEspecie, totalPesoDecimaSegundaEspecie));
        filas.push(construirFila(nombreDecimaTerceraEspecieGlobal, totalCantidadDecimaTerceraEspecie, totalPesoDecimaTerceraEspecie));
        filas.push(construirFila(nombreDecimaCuartaEspecieGlobal, totalCantidadDecimaCuartaEspecie, totalPesoDecimaCuartaEspecie));
        filas.push(construirFila(nombreDecimaQuintaEspecieGlobal, totalCantidadDecimaQuintaEspecie, totalPesoDecimaQuintaEspecie));
        filas.push(construirFila(nombreDecimaSextaEspecieGlobal, totalCantidadDecimaSextaEspecie, totalPesoDecimaSextaEspecie));
        filas.push(construirFila(nombreDecimaSeptimaEspecieGlobal, totalCantidadDecimaSeptimaEspecie, totalPesoDecimaSeptimaEspecie));
        filas.push(construirFila(nombreDecimaOctavaEspecieGlobal, totalCantidadDecimaOctavaEspecie, totalPesoDecimaOctavaEspecie));

        filas.push(`
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="2"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="8"></td>
            </tr>
        `);

        filas.push(`
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 hidden"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL NETO:</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${ventaCantidadTotal === 1 ? `${ventaCantidadTotal} Ud.` : `${ventaCantidadTotal} Uds.`}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${ventaPesoTotalNeto.toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                ${mostrarColumnas ? `
                    <td class="text-center py-1 px-2 whitespace-nowrap border-l-2"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL A PAGAR :</td>
                    <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${totalAPagar.toFixed(2)}</td>
                `:`
                    <td class="text-center py-1 px-2 whitespace-nowrap hidden border-l-2"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap hidden"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap hidden"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap hidden"></td>
                `}
                <td class="text-center py-1 px-2 hidden"></td>
            </tr>
        `);

        return filas.join('');
    }

    $('.cerrarModalCantidadReportePorCliente, #ModalCantidadReportePorCliente .opacity-75').on('click', function (e) {
        $('#ModalCantidadReportePorCliente').addClass('hidden');
        $('#ModalCantidadReportePorCliente').removeClass('flex');
    });

    $('.cerrarModalPesoReportePorCliente, #ModalPesoReportePorCliente .opacity-75').on('click', function (e) {
        $('#ModalPesoReportePorCliente').addClass('hidden');
        $('#ModalPesoReportePorCliente').removeClass('flex');
    });

    $('.cerrarModalPesoJabasReportePorCliente, #ModalPesoJabasReportePorCliente .opacity-75').on('click', function (e) {
        $('#ModalPesoJabasReportePorCliente').addClass('hidden');
        $('#ModalPesoJabasReportePorCliente').removeClass('flex');
    });

    $(document).on('input', '#nuevoCantidadReportePorCliente', function () {
        let inputValue = $(this).val();
        inputValue = inputValue.replace(/[^0-9-]/g, '');

        $(this).val(inputValue);
    });

    $(document).on('input', '#nuevoPesoReportePorCliente', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();
        
        // Elimina todos los caracteres excepto los dígitos, un punto decimal y el -
        inputValue = inputValue.replace(/[^0-9-.]/g, '');
    
        // Verifica si ya hay un punto decimal presente
        if (inputValue.indexOf('.') !== -1) {
            // Si ya hay un punto, elimina los puntos adicionales
            inputValue = inputValue.replace(/(\..*)\./g, '$1');
            
            // Limita el número de decimales a tres
            let decimalPart = inputValue.split('.')[1];
            if (decimalPart && decimalPart.length > 2) {
                decimalPart = decimalPart.substring(0, 2);
                inputValue = inputValue.split('.')[0] + '.' + decimalPart;
            }
        }
        
        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    $(document).on("dblclick", "#tablaReportePorCliente tr td.cantidadReportePorCliente", function() {
        let fila = $(this).closest('tr');
        let idCantidadReportePorCliente = fila.find('td:eq(0)').text();
        let cantidadReportePorCliente = fila.find('td:eq(7)').text();
        let tabla_identificadora = fila.find('td:eq(11)').text();
        
        $('#ModalCantidadReportePorCliente').addClass('flex');
        $('#ModalCantidadReportePorCliente').removeClass('hidden');

        $('#idCantidadReportePorCliente').attr("value",idCantidadReportePorCliente);
        $('#nuevoCantidadReportePorCliente').val(cantidadReportePorCliente);
        $('#tablaIdentificadoraCan').attr("value",tabla_identificadora);
        $('#nuevoCantidadReportePorCliente').focus();
    });

    $(document).on("dblclick", "#tablaReportePorCliente tr td.pesoReportePorCliente", function() {
        let fila = $(this).closest('tr');
        let idPesoReportePorCliente = fila.find('td:eq(0)').text();
        let pesoReportePorCliente = fila.find('td:eq(8)').text();
        let tabla_identificadora = fila.find('td:eq(11)').text();
        
        $('#ModalPesoReportePorCliente').addClass('flex');
        $('#ModalPesoReportePorCliente').removeClass('hidden');

        $('#idPesoReportePorCliente').attr("value",idPesoReportePorCliente);
        $('#nuevoPesoReportePorCliente').val(pesoReportePorCliente);
        $('#tablaIdentificadoraPeso').attr("value",tabla_identificadora);
        $('#nuevoPesoReportePorCliente').focus();
    });

    $(document).on("dblclick", "#tablaReportePorCliente tr td.pesoJabasReportePorCliente", function() {
        let fila = $(this).closest('tr');
        let idPesoReportePorCliente = fila.find('td:eq(0)').text();
        let pesoJabasReportePorCliente = fila.find('td:eq(9)').text();
        let tabla_identificadora = fila.find('td:eq(11)').text();
        
        $('#ModalPesoJabasReportePorCliente').addClass('flex');
        $('#ModalPesoJabasReportePorCliente').removeClass('hidden');

        $('#idPesoJabasReportePorCliente').attr("value",idPesoReportePorCliente);
        $('#nuevoPesoJabasReportePorCliente').val(pesoJabasReportePorCliente);
        $('#tablaIdentificadoraPesoJabas').attr("value",tabla_identificadora);
        $('#nuevoPesoJabasReportePorCliente').focus();
    });

    $('#btnActualizarCantidadReportePorCliente').on('click', function () {
        let idCodigoPesada = $('#idCantidadReportePorCliente').attr("value");
        let tablaIdentificadoraCan = $('#tablaIdentificadoraCan').attr("value");
        let nuevoCantidadReportePorCliente = $('#nuevoCantidadReportePorCliente').val();
    
        if (nuevoCantidadReportePorCliente === null || nuevoCantidadReportePorCliente.trim() === '') {
            alertify.notify('La cantidad no puede ser vacia', 'error', 3);
        } else {
            //console.log("idCodigoPesada, nuevoCantidadReportePorCliente, tablaIdentificadoraCan",idCodigoPesada, nuevoCantidadReportePorCliente, tablaIdentificadoraCan)
            fn_ActualizarCantidadReportePorCliente(idCodigoPesada, nuevoCantidadReportePorCliente, tablaIdentificadoraCan);
        }
    });

    $('#btnActualizarPesoReportePorCliente').on('click', function () {
        let idCodigoPesada = $('#idPesoReportePorCliente').attr("value");
        let tablaIdentificadoraPeso = $('#tablaIdentificadoraPeso').attr("value");
        let nuevoPesoReportePorCliente = $('#nuevoPesoReportePorCliente').val();

        if (nuevoPesoReportePorCliente === null || nuevoPesoReportePorCliente.trim() === '') {
            alertify.notify('El peso no debe ser vacio', 'error', 3);
        } else {
            fn_ActualizarPesoReportePorCliente(idCodigoPesada, nuevoPesoReportePorCliente, tablaIdentificadoraPeso);
        }
    });

    $('#btnActualizarPesoJabasReportePorCliente').on('click', function () {
        let idCodigoPesada = $('#idPesoJabasReportePorCliente').attr("value");
        let tablaIdentificadoraPeso = $('#tablaIdentificadoraPesoJabas').attr("value");
        let nuevoPesoReportePorCliente = $('#nuevoPesoJabasReportePorCliente').val();

        if (nuevoPesoReportePorCliente === null || nuevoPesoReportePorCliente.trim() === '') {
            alertify.notify('El peso no debe ser vacio', 'error', 3);
        } else {
            fn_ActualizarPesoJabasReportePorCliente(idCodigoPesada, nuevoPesoReportePorCliente, tablaIdentificadoraPeso);
        }
    });

    function fn_ActualizarCantidadReportePorCliente(idCodigoPesada, nuevoCantidadReportePorCliente, tablaIdentificadoraCan){
        $.ajax({
            url: '/fn_consulta_ActualizarCantidadReportePorCliente',
            method: 'GET',
            data: {
                idCodigoPesada: idCodigoPesada,
                nuevoCantidadReportePorCliente: nuevoCantidadReportePorCliente,
                tablaIdentificadoraCan: tablaIdentificadoraCan,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo la cantidad correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalCantidadReportePorCliente').addClass('hidden');
                    $('#ModalCantidadReportePorCliente').removeClass('flex');
                    $('#btnBuscarReportePorCliente').trigger('click');
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

    function fn_ActualizarPesoReportePorCliente(idCodigoPesada, nuevoPesoReportePorCliente, tablaIdentificadoraPeso){
        $.ajax({
            url: '/fn_consulta_ActualizarPesoReportePorCliente',
            method: 'GET',
            data: {
                idCodigoPesada: idCodigoPesada,
                nuevoPesoReportePorCliente: nuevoPesoReportePorCliente,
                tablaIdentificadoraPeso: tablaIdentificadoraPeso,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el peso correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalPesoReportePorCliente').addClass('hidden');
                    $('#ModalPesoReportePorCliente').removeClass('flex');
                    $('#btnBuscarReportePorCliente').trigger('click');
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

    function fn_ActualizarPesoJabasReportePorCliente(idCodigoPesada, nuevoPesoReportePorCliente, tablaIdentificadoraPeso){
        $.ajax({
            url: '/fn_consulta_ActualizarPesoJabasReportePorCliente',
            method: 'GET',
            data: {
                idCodigoPesada: idCodigoPesada,
                nuevoPesoReportePorCliente: nuevoPesoReportePorCliente,
                tablaIdentificadoraPeso: tablaIdentificadoraPeso,
            },
            success: function(response) {
                if (response.success) {

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el peso de jabas correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#ModalPesoJabasReportePorCliente').addClass('hidden');
                    $('#ModalPesoJabasReportePorCliente').removeClass('flex');
                    $('#btnBuscarReportePorCliente').trigger('click');
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

    $(document).on('contextmenu', '#tablaReportePorCliente tbody tr', function (e) {
        e.preventDefault();
        let codigoPesada = $(this).closest("tr").find("td:first").text();
        let identifiTabla = $(this).closest("tr").find("td:eq(11)").text();
        Swal.fire({
            title: '¿Desea eliminar el Registro?',
            text: "¡Estas seguro de eliminar el registro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
            fn_EliminarPesada(codigoPesada, identifiTabla);
            console.log(identifiTabla, codigoPesada)
            }
        })
    });

    function fn_EliminarPesada(codigoPesada, identifiTabla){
        $.ajax({
            url: '/fn_consulta_EliminarPesada',
            method: 'GET',
            data: {
                codigoPesada: codigoPesada,
                identifiTabla: identifiTabla,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino el registro correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#btnBuscarReportePorCliente').trigger('click');
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

    // Convertir el valor recuperado a booleano si es necesario
    if (localStorage.getItem('editarDatos') === 'true') {
        $('#editarDatosReportePorCliente').prop('checked', true);
        $('#tablaReportePorCliente th:nth-child(8)').show();
        $('#tablaReportePorCliente th:nth-child(9)').show();
        $('#tablaReportePorCliente th:nth-child(10)').show();
        $('#tablaReportePorCliente th:nth-child(11)').show();
    } else {
        $('#editarDatosReportePorCliente').prop('checked', false);
        $('#tablaReportePorCliente th:nth-child(8)').hide();
        $('#tablaReportePorCliente th:nth-child(9)').hide();
        $('#tablaReportePorCliente th:nth-child(10)').hide();
        $('#tablaReportePorCliente th:nth-child(11)').hide();
    }

    $('#editarDatosReportePorCliente').on('change',function(){
        if(this.checked){
            $('#tablaReportePorCliente td:nth-child(8)').show();
            $('#tablaReportePorCliente td:nth-child(9)').show();
            $('#tablaReportePorCliente td:nth-child(10)').show();
            $('#tablaReportePorCliente td:nth-child(11)').show();
            $('#tablaReportePorCliente th:nth-child(8)').show();
            $('#tablaReportePorCliente th:nth-child(9)').show();
            $('#tablaReportePorCliente th:nth-child(10)').show();
            $('#tablaReportePorCliente th:nth-child(11)').show();
            localStorage.setItem('editarDatos', true);
        } else {
            $('#tablaReportePorCliente td:nth-child(8)').hide();
            $('#tablaReportePorCliente td:nth-child(9)').hide();
            $('#tablaReportePorCliente td:nth-child(10)').hide();
            $('#tablaReportePorCliente td:nth-child(11)').hide();
            $('#tablaReportePorCliente th:nth-child(8)').hide();
            $('#tablaReportePorCliente th:nth-child(9)').hide();
            $('#tablaReportePorCliente th:nth-child(10)').hide();
            $('#tablaReportePorCliente th:nth-child(11)').hide();
            localStorage.setItem('editarDatos', false);
        }
    });

    // =====================================================

    let selectedIndex = -1;

    $(document).on("click", "#btnCambiarPrecioPesadas", function() {      
        $('#ModalCambiarPrecioPesada').addClass('flex');
        $('#ModalCambiarPrecioPesada').removeClass('hidden');
        $('#codigoClienteSeleccionado2').val(0);
        $('#especiesCambioPrecioPesadas').val(0);
        $('#nuevoPrecioCambiarPesadas').val("");
        $('#inputNombreClientes2').val("");
        $("#clienteSeleccionadoCorrecto2").removeClass("flex");
        $("#clienteSeleccionadoCorrecto2").addClass("hidden");
        $("#nuevoPrecioCambiarPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        $("#especiesCambioPrecioPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        // $("#inputNombreClientes2").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
    });

    $('.cerrarModalCambiarPrecioPesada, #ModalCambiarPrecioPesada .opacity-75').on('click', function (e) {
        $('#ModalCambiarPrecioPesada').addClass('hidden');
        $('#ModalCambiarPrecioPesada').removeClass('flex');
    });

    // $('#btnCambiarPrecioPesada').on('click', function () {
    //     let codigoCliente = $('#codigoClienteSeleccionado2').val();
    //     let fechaCambioPrecio = $('#fechaCambiarPrecioPesada').val();
    //     let especieCambioPrecio = $('#especiesCambioPrecioPesadas').val();
    //     let nuevoPrecio = $('#nuevoPrecioCambiarPesadas').val();

    //     let contadorErrores = 0

    //     if (codigoCliente == 0 || codigoCliente == ""){
    //         contadorErrores++;
    //         alertify.notify('Seleccione cliente.', 'error', 3);
    //     }
    //     if (especieCambioPrecio == 0 || especieCambioPrecio == "" || especieCambioPrecio === null){
    //         contadorErrores++;
    //         $("#especiesCambioPrecioPesadas").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
    //     }else{
    //         $("#especiesCambioPrecioPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
    //     }
    //     if(nuevoPrecio == ""){
    //         contadorErrores++;
    //         $("#nuevoPrecioCambiarPesadas").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
    //     }else{
    //         $("#nuevoPrecioCambiarPesadas").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
    //     }

    //     if (contadorErrores <= 0){
    //         Swal.fire({
    //             title: '¿Desea cambiar los registros?',
    //             text: "¡Estas seguro de cambiar el precio de las pesadas!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             cancelButtonText: '¡No, cancelar!',
    //             confirmButtonText: '¡Si, cambiar!'
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 if(fechaCambioPrecio == fechaHoy){
    //                     fn_ActualizarPrecioXPresentacion(codigoCliente,nuevoPrecio,especieCambioPrecio);
    //                 }
    //                 fn_CambiarPrecioPesadas(codigoCliente, fechaCambioPrecio, especieCambioPrecio, nuevoPrecio);
    //             }
    //         })
    //     }else{
    //         alertify.notify('Debe rellenar todos los campos.', 'error', 3);
    //     }

    // });

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

    // Segundo filtro Nombre

    $('#inputNombreClientes2').on('input', function () {
        $('#codigoClienteSeleccionado2').val(0);
        $("#clienteSeleccionadoCorrecto2").removeClass("flex");
        $("#clienteSeleccionadoCorrecto2").addClass("hidden");
        const searchTerm = $(this).val().toLowerCase();
        const $filtrarClientes = $("#inputNombreClientes2").val();
        const filteredClientes = clientesArreglo.filter(cliente =>
            cliente.nombreCompleto.toLowerCase().includes(searchTerm)
        );
        if ($filtrarClientes.length > 0) {
            displayClientes2(filteredClientes);
            selectedIndex = -1; // Reset index when the input changes
        } else {
            const $contenedorDeClientes = $("#contenedorDeClientes2")
            $contenedorDeClientes.addClass('hidden');
        }
    });
    
    $('#inputNombreClientes2').on('keydown', function (event) {
        const $options = $('#contenedorDeClientes2 .option');
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
                    $("#clienteSeleccionadoCorrecto2").removeClass("hidden");
                    $("#clienteSeleccionadoCorrecto2").addClass("flex");
                }
            }
        }
    });
    
    function displayClientes2(clientesArreglo) {
        const $contenedor = $('#contenedorDeClientes2');
        $contenedor.empty();
        if (clientesArreglo.length > 0) {
            $contenedor.removeClass('hidden');
            clientesArreglo.forEach(cliente => {
                const $div = $('<div class="text-gray-800 text-sm dark:text-white font-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:hover:bg-gray-700 hover:bg-gray-200"></div>')
                    .text(cliente.nombreCompleto)
                    .addClass('option p-2')
                    .on('click', function () {
                        selectCliente2(cliente);
                    });
                $contenedor.append($div);
            });
        } else {
            $contenedor.addClass('hidden');
        }
    }
    
    function selectCliente2(cliente) {
        $('#inputNombreClientes2').val(cliente.nombreCompleto);
        $('#codigoClienteSeleccionado2').val(cliente.codigoCli);
        $('#contenedorDeClientes2').addClass('hidden');
        $("#clienteSeleccionadoCorrecto2").removeClass("hidden");
        $("#clienteSeleccionadoCorrecto2").addClass("flex");
        selectedIndex = -1;
    }
    
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.relative').length) {
            $('#contenedorDeClientes').addClass('hidden');
            $('#contenedorDeClientes2').addClass('hidden');
            selectedIndex = -1;
        }
    });

    var arrayCambiarPrecios = [];

    fn_declararEspeciesCambiarPrecios();
    function fn_declararEspeciesCambiarPrecios(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    arrayCambiarPrecios = response;

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    tablaEditable2()
    function tablaEditable2(){
        let tbodyReporteDePagosExcel = $('#bodyCambiarPreciosExcel');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntrada2(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntrada2(tbody) {
        let nuevaFila = $('<tr class="bg-white cambiarPreciosEspecies border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text("")); //nombre
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text("")); //importe
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap hidden" contenteditable="false">').text("")); //importe
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
                nuevaFila.off('input');
            }
        });
    }

    function fn_TraerClientesAgregarPagoClienteTablaExcel(inputAgregarPagoCliente, callback) {
        if (Array.isArray(arrayCambiarPrecios) && arrayCambiarPrecios.length > 0) {
            const filteredClients = arrayCambiarPrecios.filter(cliente =>
                cliente.nombreEspecie.includes(inputAgregarPagoCliente.toUpperCase())
            );
            callback(filteredClients);
        } else {
            callback(null);
        }
    }

    function showSuggestions2(cell, clientes) {
        hideSuggestions(cell); // Remove existing suggestions if any
    
        let suggestions = $('<div class="suggestions-list bg-white border-2 border-gray-500"></div>').css({
            position: 'absolute',
            zIndex: 1000
        });
    
        clientes.forEach(cliente => {
            let suggestionItem = $('<div class="suggestion-item p-1"></div>').text(cliente.nombreEspecie).css({
                cursor: 'pointer'
            });
    
            suggestionItem.on('click', function() {
                cell.text(cliente.nombreEspecie);
                cell.data('selectedCliente', cliente);
                cell.addClass('bg-green-500');
                hideSuggestions(cell);

                let codigoClienteCell = cell.closest('tr').find('td').eq(2); 
                codigoClienteCell.text(cliente.idEspecie);
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

    function hacerCeldasEditables(tbody) {
        tbody.on('keydown', 'td[contenteditable="true"], td input', function(e) {
            let currentElement = $(this);
            let currentTd = currentElement.closest('td');
            let currentRow = currentTd.parent();
            let currentTdIndex = currentTd.index();
    
            if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
    
                if (e.key === "ArrowRight") {
                    let nextTd = currentTd.nextAll('td[contenteditable="true"], td').first();
                    if (nextTd.length) {
                        let nextInput = nextTd.find('input').first();
                        if (nextInput.length) {
                            nextInput.focus();
                        } else {
                            nextTd.focus();
                        }
                    } else {
                        let nextRow = currentRow.next();
                        if (nextRow.length) {
                            let nextTdInNextRow = nextRow.children().eq(currentTdIndex);
                            let nextInputInNextRow = nextTdInNextRow.find('input').first();
                            if (nextInputInNextRow.length) {
                                nextInputInNextRow.focus();
                            } else {
                                nextTdInNextRow.focus();
                            }
                        }
                    }
                } else if (e.key === "ArrowLeft") {
                    let prevTd = currentTd.prevAll('td[contenteditable="true"], td').first();
                    if (prevTd.length) {
                        let prevInput = prevTd.find('input').first();
                        if (prevInput.length) {
                            prevInput.focus();
                        } else {
                            prevTd.focus();
                        }
                    } else {
                        let prevRow = currentRow.prev();
                        if (prevRow.length) {
                            let prevTdInPrevRow = prevRow.children().eq(currentTdIndex);
                            let prevInputInPrevRow = prevTdInPrevRow.find('input').first();
                            if (prevInputInPrevRow.length) {
                                prevInputInPrevRow.focus();
                            } else {
                                prevTdInPrevRow.focus();
                            }
                        }
                    }
                } else if (e.key === "ArrowDown") {
                    let nextRow = currentRow.next();
                    if (nextRow.length) {
                        let nextTdInNextRow = nextRow.children().eq(currentTdIndex);
                        let nextInputInNextRow = nextTdInNextRow.find('input').first();
                        if (nextInputInNextRow.length) {
                            nextInputInNextRow.focus();
                        } else {
                            nextTdInNextRow.focus();
                        }
                    }
                } else if (e.key === "ArrowUp") {
                    let prevRow = currentRow.prev();
                    if (prevRow.length) {
                        let prevTdInPrevRow = prevRow.children().eq(currentTdIndex);
                        let prevInputInPrevRow = prevTdInPrevRow.find('input').first();
                        if (prevInputInPrevRow.length) {
                            prevInputInPrevRow.focus();
                        } else {
                            prevTdInPrevRow.focus();
                        }
                    }
                }
            }
        });
    }

    $(document).on('click', '#btnCambiarPrecioPesada', function () {

        $("#btnCambiarPrecioPesada").attr('disabled','disabled');

        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.cambiarPreciosEspecies:not(:last-child)').length;
        
        if(totalRequests == 0){
            $("#btnCambiarPrecioPesada").removeAttr('disabled');
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
                        title: 'Se cambio los precios correctamente.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#codigoClienteSeleccionado2').val(0);
                    $('#ModalCambiarPrecioPesada').addClass('hidden');
                    $('#ModalCambiarPrecioPesada').removeClass('flex');
                    $('#btnBuscarReportePorCliente').trigger('click');
                }
                $("#btnCambiarPrecioPesada").removeAttr('disabled');
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.cambiarPreciosEspecies:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let codigoCliente = $('#codigoClienteSeleccionado2').val();
            let fechaCambioPrecio = $('#fechaCambiarPrecioPesada').val();
            let nombreCliente = filaActual.find('td:eq(0)').text().trim();
            let nuevoImporte = filaActual.find('td:eq(1)').text().trim();
            let codigoEspecie = filaActual.find('td:eq(2)').text().trim();

            if (!nuevoImporte && !codigoEspecie) {
                alertify.notify('El campo importe no puede estar vacio', 'error', 3);
                failedRequests++;
            }else{
                const ahoraEnNY = new Date(); // Suponiendo que quieres la hora actual en tu zona horaria
                const fechaHoy = ahoraEnNY.toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
                const horaHoy = ahoraEnNY.toTimeString().split(' ')[0];
                let ultimaActualizacionUsuario = `${usuarioRegistroCli} ${usuarioRegistroCliNombre} ${fechaHoy} ${horaHoy}`;

                if(fechaCambioPrecio == fechaHoy){
                    let codigoEspecie2 = codigoEspecie
                    if (parseInt(codigoEspecie2) > 8){
                        codigoEspecie2 = parseInt(codigoEspecie2) - 1
                    }
                    fn_ActualizarPrecioXPresentacion(codigoCliente,nuevoImporte,codigoEspecie2, ultimaActualizacionUsuario);
                }
                // Llamar a la función fn_AgregarPagoCliente con los datos de la fila actual
                fn_CambiarPrecioPesadas(codigoCliente, fechaCambioPrecio, codigoEspecie, nuevoImporte)
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
        });
    }); 

    function fn_ActualizarPrecioXPresentacion(idClienteActualizarPrecioXPresentacion, valorActualizarPrecioXPresentacion,numeroEspeciePrecioXPresentacion, ultimaActualizacionUsuario){
        $.ajax({
            url: '/fn_consulta_ActualizarPrecioXPresentacion',
            method: 'GET',
            data: {
                idClienteActualizarPrecioXPresentacion: idClienteActualizarPrecioXPresentacion,
                valorActualizarPrecioXPresentacion: valorActualizarPrecioXPresentacion,
                numeroEspeciePrecioXPresentacion: numeroEspeciePrecioXPresentacion,
                ultimaActualizacionUsuario: ultimaActualizacionUsuario,
            },
            success: function(response) {
                if (response.success) {                  
                    // alertify.notify('Se actualizo el precio correctamente', 'success', 2);
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

    function fn_CambiarPrecioPesadas(codigoCliente, fechaCambioPrecio, especieCambioPrecio, nuevoPrecio){
        return $.ajax({
            url: '/fn_consulta_CambiarPrecioPesadas',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
                fechaCambioPrecio : fechaCambioPrecio,
                especieCambioPrecio: especieCambioPrecio,
                nuevoPrecio: nuevoPrecio,
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

});
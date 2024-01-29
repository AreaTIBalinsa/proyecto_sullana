import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorCliente').val(fechaHoy);
    $('#fechaHastaReportePorCliente').val(fechaHoy);
    var tipoUsuario = $('#tipoUsuario').data('id');

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
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $('#idClientePorReporte').on('input', function () {
        let inputReportePorCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientes');
        contenedorClientes.empty();

        if (inputReportePorCliente.length > 1 || inputReportePorCliente != "") {
            fn_TraerClientesReportePorCliente(inputReportePorCliente)
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });
    
    $('#btnBuscarReportePorCliente').on('click', function () {
        let inputReportePorCliente = $('#idClientePorReporte').val();
        if (inputReportePorCliente.length > 1 || inputReportePorCliente != "") {
            let fechaDesde = $('#fechaDesdeReportePorCliente').val();
            let fechaHasta = $('#fechaHastaReportePorCliente').val();
            let codigoCliente = $('#selectedCodigoCli').attr("value");
            fn_TraerReportePorCliente(fechaDesde,fechaHasta,codigoCliente)
        } else {
            alertify.notify('Debe seleccionar un cliente.', 'error', 2);
        }
    });

    function fn_TraerClientesReportePorCliente(inputReportePorCliente) {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerClientesReportePorCliente',
            method: 'GET',
            data: {
                idClientePorReporte: inputReportePorCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientes')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idClientePorReporte').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedIdCliente').attr("value", obj.idCliente);
                            $('#selectedCodigoCli').attr("value", obj.codigoCli);

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

                        let ventaPesoTotalNeto = 0
                        let ventaCantidadTotal = 0

                        bodyReportePorCliente += construirFilaFecha(item);

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
                                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="6"></td>
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
        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 hidden"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${item.fechaRegistroPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
        `;
    }

    function construirFilaDatos(item) {
        let horaPes = item.horaPes
        let nombreEspecie = item.nombreEspecie
        let cantidadPes = parseInt(item.cantidadPes)
        let pesoNetoPes = parseFloat(item.pesoNetoPes).toFixed(2)
        let pesoNetoJabas = parseFloat(item.pesoNetoJabas).toFixed(2)

        let promedio = 0;
        if (pesoNetoPes !== 0) {
            promedio = ((pesoNetoPes > 0 ? pesoNetoPes - pesoNetoJabas : pesoNetoPes + pesoNetoJabas) / cantidadPes).toFixed(2);
        }

        let observacionPes = item.observacionPes
        if (observacionPes != ""){
            observacionPes = `
            <div class="observacionPesHover relative">       
                <button type="button" class="text-gray-900 dark:text-gray-400"><i class='bx bx-info-circle'></i></button>
                <div class="absolute z-[1000000] top-0 right-0 max-w-[256px] w-full text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                    <div class="px-3 py-2">
                        <p>${observacionPes}</p>
                    </div>
                </div>
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

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="hidden">${item.idPesada}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${observacionPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${horaPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreEspecie}</td>
                <td class="text-center py-1 px-2 cantidadReportePorCliente whitespace-nowrap">${cantidadPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${pesoNeto.toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${promedio}</td>
                <td class="text-center py-1 px-2 pesoReportePorCliente whitespace-nowrap">${pesoNetoPes}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${pesoNetoJabas}</td>
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

        ventaPesoTotalNeto,
        ventaCantidadTotal)
    {
        let filas = [];
    
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
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                        <td class="text-center py-1 px-2 whitespace-nowrap"></td>
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

        filas.push(`
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="2"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="6"></td>
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
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
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
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            let idCantidadReportePorCliente = fila.find('td:eq(0)').text();
            let cantidadReportePorCliente = fila.find('td:eq(4)').text();
            let tabla_identificadora = fila.find('td:eq(9)').text();
            
            $('#ModalCantidadReportePorCliente').addClass('flex');
            $('#ModalCantidadReportePorCliente').removeClass('hidden');
    
            $('#idCantidadReportePorCliente').attr("value",idCantidadReportePorCliente);
            $('#nuevoCantidadReportePorCliente').val(cantidadReportePorCliente);
            $('#tablaIdentificadoraCan').attr("value",tabla_identificadora);
            $('#nuevoCantidadReportePorCliente').focus();
        }
    });

    $(document).on("dblclick", "#tablaReportePorCliente tr td.pesoReportePorCliente", function() {
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            let idPesoReportePorCliente = fila.find('td:eq(0)').text();
            let pesoReportePorCliente = fila.find('td:eq(7)').text();
            let tabla_identificadora = fila.find('td:eq(9)').text();
            
            $('#ModalPesoReportePorCliente').addClass('flex');
            $('#ModalPesoReportePorCliente').removeClass('hidden');

            $('#idPesoReportePorCliente').attr("value",idPesoReportePorCliente);
            $('#nuevoPesoReportePorCliente').val(pesoReportePorCliente);
            $('#tablaIdentificadoraPeso').attr("value",tabla_identificadora);
            $('#nuevoPesoReportePorCliente').focus();
        }
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

    $(document).on('contextmenu', '#tablaReportePorCliente tbody tr', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
            let codigoPesada = $(this).closest("tr").find("td:first").text();
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
                fn_EliminarPesada(codigoPesada);
                }
            })
        }
    });

    function fn_EliminarPesada(codigoPesada){
        $.ajax({
            url: '/fn_consulta_EliminarPesada',
            method: 'GET',
            data: {
                codigoPesada: codigoPesada,
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

});
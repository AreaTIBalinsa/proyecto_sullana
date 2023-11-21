import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteAcumulado').val(fechaHoy);
    $('#fechaHastaReporteAcumulado').val(fechaHoy);

    fn_TraerReporteAcumulado(fechaHoy,fechaHoy);

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

                    // Iterar sobre los objetos y mostrar sus propiedades
                    sinRepetidos.forEach(function(item) {

                        let diaPesoPrimerEspecie = 0.00;
                        let diaPesoSegundaEspecie = 0.00;
                        let diaPesoTerceraEspecie = 0.00;
                        let diaPesoCuartaEspecie = 0.00;

                        response.forEach(function (obj) {

                            if (item.fechaRegistroPes === obj.fechaRegistroPes) {

                                let idEspecie = parseInt(obj.idEspecie)
                                let cantidadPes = parseInt(obj.cantidadPes)
                                let pesoNetoPes = parseFloat(obj.pesoNetoPes)
                                let valorConversion = parseFloat(obj.valorConversion)
                                let idGrupo = parseInt(obj.idGrupo)

                                if (idEspecie == 1) {
                                    if (idGrupo == 2){
                                        diaPesoPrimerEspecie += pesoNetoPes
                                        totalPesoPrimerEspecie += pesoNetoPes
                                    }else if (idGrupo == 1){
                                        diaPesoPrimerEspecie += pesoNetoPes/valorConversion
                                        totalPesoPrimerEspecie += pesoNetoPes/valorConversion
                                    }
                                }else if (idEspecie == 2) {
                                    if (idGrupo == 2){
                                        diaPesoSegundaEspecie += pesoNetoPes
                                        totalPesoSegundaEspecie += pesoNetoPes
                                    }else if (idGrupo == 1){
                                        diaPesoSegundaEspecie += pesoNetoPes/valorConversion
                                        totalPesoSegundaEspecie += pesoNetoPes/valorConversion
                                    }
                                }else if (idEspecie == 3) {
                                    if (idGrupo == 2){
                                        diaPesoTerceraEspecie += pesoNetoPes
                                        totalPesoTerceraEspecie += pesoNetoPes
                                    }else if (idGrupo == 1){
                                        diaPesoTerceraEspecie += pesoNetoPes/valorConversion
                                        totalPesoTerceraEspecie += pesoNetoPes/valorConversion
                                    }
                                }else if (idEspecie == 4) {
                                    if (idGrupo == 2){
                                        diaPesoCuartaEspecie += pesoNetoPes
                                        totalPesoCuartaEspecie += pesoNetoPes
                                    }else if (idGrupo == 1){
                                        diaPesoCuartaEspecie += pesoNetoPes/valorConversion
                                        totalPesoCuartaEspecie += pesoNetoPes/valorConversion
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
                        
                        // Agregar la nueva fila al tbody
                        tbodyReporteAcumulado.append(nuevaFila);
                    });

                    nuevaFila = $('<tr class="bg-white dark:bg-gray-800 h-0.5">');
                    nuevaFila.append($('<td class="dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                    nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4">').text(""));
                    tbodyReporteAcumulado.append(nuevaFila);
                    nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text("Totales :"));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoPrimerEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoSegundaEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoTerceraEspecie).toFixed(2)));
                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center">').text((totalPesoCuartaEspecie).toFixed(2)));
                    tbodyReporteAcumulado.append(nuevaFila);
                        
                    if (response.length == 0) {
                        tbodyReporteAcumulado.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
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
                        totalPesoDescuento: parseFloat(item.totalDescuentos[0]?.totalPesoDescuento || 0),
                        totalVentaDescuento: parseFloat(item.totalDescuentos[0]?.totalVentaDescuento || 0),
                        pagos: parseFloat(item.totalPagos[0]?.pagos || 0),
                        totalCantidadDescuentoPrimerEspecie: parseInt(item.totalesPrimerEspecie[0]?.totalCantidadDescuentoPrimerEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalCantidadDescuentoSegundaEspecie: parseInt(item.totalesSegundaEspecie[0]?.totalCantidadDescuentoSegundaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalCantidadDescuentoTerceraEspecie: parseInt(item.totalesTerceraEspecie[0]?.totalCantidadDescuentoTerceraEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalCantidadDescuentoCuartaEspecie: parseInt(item.totalesCuartaEspecie[0]?.totalCantidadDescuentoCuartaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoPrimerEspecie: parseFloat(item.totalesPrimerEspecie[0]?.totalVentaDescuentoPrimerEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSegundaEspecie: parseFloat(item.totalesSegundaEspecie[0]?.totalVentaDescuentoSegundaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoTerceraEspecie: parseFloat(item.totalesTerceraEspecie[0]?.totalVentaDescuentoTerceraEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoCuartaEspecie: parseFloat(item.totalesCuartaEspecie[0]?.totalVentaDescuentoCuartaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        ventaAnterior: parseFloat(item.ventaAnterior || 0),
                        pagoAnterior: parseFloat(item.pagoAnterior || 0),
                        totalVentaDescuentoAnterior: parseFloat(item.totalVentaDescuentoAnterior || 0),
                    };
                    transformedData.push(transformedItem);
                });
    
                fn_construirFilasReporteAcumuladoDetalle(transformedData);
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
                <td class="text-center py-1 px-2 whitespace-nowrap">POLLO YUGO</td>
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
                <td class="text-center py-1 px-2 whitespace-nowrap">POLLO PERLA</td>
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
                <td class="text-center py-1 px-2 whitespace-nowrap">POLLO CHIMU</td>
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
                <td class="text-center py-1 px-2 whitespace-nowrap">POLLO XX</td>
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

        let totalVentaDescuentoPrimerEspecie = parseFloat(item.totalVentaDescuentoPrimerEspecie);
        let totalVentaDescuentoSegundaEspecie = parseFloat(item.totalVentaDescuentoSegundaEspecie);
        let totalVentaDescuentoTerceraEspecie = parseFloat(item.totalVentaDescuentoTerceraEspecie);
        let totalVentaDescuentoCuartaEspecie = parseFloat(item.totalVentaDescuentoCuartaEspecie);

        let ventaTotalPrimerEspecie = totalVentaPrimerEspecie + totalVentaDescuentoPrimerEspecie;
        let ventaTotalSegundaEspecie = totalVentaSegundaEspecie + totalVentaDescuentoSegundaEspecie;
        let ventaTotalTerceraEspecie = totalVentaTerceraEspecie + totalVentaDescuentoTerceraEspecie;
        let ventaTotalCuartaEspecie = totalVentaCuartaEspecie + totalVentaDescuentoCuartaEspecie;

        let ventaTotal = ventaTotalPrimerEspecie + ventaTotalSegundaEspecie + ventaTotalTerceraEspecie + ventaTotalCuartaEspecie + item.totalVentaDescuento;

        let ventaAnterior = parseFloat(item.ventaAnterior);
        let pagoAnterior = parseFloat(item.pagoAnterior);
        let descuentoAnterior = parseFloat(item.totalVentaDescuentoAnterior);

        let totalVentaAnterior = ventaAnterior - pagoAnterior - descuentoAnterior;

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

});
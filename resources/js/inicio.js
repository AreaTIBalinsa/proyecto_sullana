import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    var verificarDatosTiempoReal = true;
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    fn_traerDatosEnTiempoReal(fechaHoy);

    setInterval(() => {
        if (verificarDatosTiempoReal === true) {
            fn_traerDatosEnTiempoReal(fechaHoy);
        }
    }, 10000);

    $('#fechaProduccionAnterior').val(fechaHoy);

    /* ============ Eventos ============ */

    $('#btnProduccionAnterior').on('click', function () {
        $('#ModalProduccionAnterior').addClass('flex');
        $('#ModalProduccionAnterior').removeClass('hidden');
    });

    $('#btnBuscarProduccionAnterior').on('click', function () {
        let fechaProduccionAnterior = $('#fechaProduccionAnterior').val();
        if(fechaProduccionAnterior == fechaHoy){
            verificarDatosTiempoReal = true;
            $('#fechaDeProduccion').text("Actual");
        }else{
            verificarDatosTiempoReal = false;
            $('#fechaDeProduccion').text(fechaProduccionAnterior);
        }
        $('#ModalProduccionAnterior').addClass('hidden');
        $('#ModalProduccionAnterior').removeClass('flex');
        fn_traerDatosEnTiempoReal(fechaProduccionAnterior);
    });

    $('#btnRetrocesoProduccionAnterior').on('click', function () {
        $('#fechaDeProduccion').text("Actual");
        $('#contenedorGraficaActual').toggle('flex hidden');
        $('#contenedorGraficaAnterior').toggle('flex hidden');
        $('#btnRetrocesoProduccionAnterior').toggle('hidden');
        $('#btnProduccionAnterior').toggle('hidden');
    });

    $('.cerrarModalProduccionAnterior, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalProduccionAnterior').addClass('hidden');
            $('#ModalProduccionAnterior').removeClass('flex');
        }
    });

    /* ============ Funciones ============ */

    function fn_formatearImportes(numero){
        let totalFormateado = parseFloat(numero).toLocaleString('es-ES', {
            minimumFractionDigits: 2,   
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        return totalFormateado;
    }

    function fn_formatearCantidades(numero){
        let totalFormateado = parseFloat(numero).toLocaleString('es-ES', {
            minimumFractionDigits: 0,   
            maximumFractionDigits: 0,
            useGrouping: true,
        });

        return totalFormateado;
    }

    function fn_traerDatosEnTiempoReal(fechaHoy){

        $.ajax({
            url: '/fn_consulta_TraerDatosEnTiempoReal',
            method: 'GET',
            data: {
                fecha : fechaHoy,
            },
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    function calcularTotalesPorEspecie(response) {
                        const especiesTotales = {};
                    
                        response.forEach(item => {
                            const especieKey = `especie${item.idEspecie}`;
                    
                            if (!especiesTotales[especieKey]) {
                                especiesTotales[especieKey] = {
                                    totalPeso: 0,
                                    totalDescuentoPeso: 0,
                                    totalVenta: 0,
                                    totalDescuentoVenta: 0,
                                    totalCantidad: 0,
                                    precioPromedio: parseFloat(item.precioPes),
                                };
                            }
                    
                            const { pesoNetoPes, pesoNetoJabas, precioPes, cantidadPes } = item;
                            const pesoNetoPesNum = parseFloat(pesoNetoPes);
                            const pesoNetoJabasNum = parseFloat(pesoNetoJabas);
                            const precioPesNum = parseFloat(precioPes);
                    
                            if (pesoNetoPesNum > 0) {
                                especiesTotales[especieKey].totalPeso += pesoNetoPesNum - pesoNetoJabasNum;
                                especiesTotales[especieKey].totalVenta += (pesoNetoPesNum - pesoNetoJabasNum) * precioPesNum;
                            } else {
                                especiesTotales[especieKey].totalDescuentoPeso += pesoNetoPesNum + pesoNetoJabasNum;
                                especiesTotales[especieKey].totalDescuentoVenta += (pesoNetoPesNum + pesoNetoJabasNum) * precioPesNum;
                            }
                    
                            especiesTotales[especieKey].totalCantidad += cantidadPes;
                        });
                    
                        // Sumar totalPeso con totalDescuentoPeso y totalVenta con totalDescuentoVenta
                        Object.keys(especiesTotales).forEach(especieKey => {
                            especiesTotales[especieKey].totalPeso = (
                                especiesTotales[especieKey].totalPeso + especiesTotales[especieKey].totalDescuentoPeso
                            ).toFixed(2);
                    
                            especiesTotales[especieKey].totalVenta = (
                                especiesTotales[especieKey].totalVenta + especiesTotales[especieKey].totalDescuentoVenta
                            ).toFixed(2);
                    
                            // Eliminar las claves de descuento ya que se han sumado
                            delete especiesTotales[especieKey].totalDescuentoPeso;
                            delete especiesTotales[especieKey].totalDescuentoVenta;
                    
                            // Asegurar que totalCantidad esté también en formato de dos decimales
                            especiesTotales[especieKey].totalCantidad = especiesTotales[especieKey].totalCantidad;
                        });
                    
                        return especiesTotales;
                    }

                    function sumarTotalesGenerales(especiesTotales) {
                        const totalesGenerales = {
                            totalPeso: 0,
                            totalVenta: 0,
                            totalCantidad: 0,
                        };
                    
                        Object.values(especiesTotales).forEach(especie => {
                            totalesGenerales.totalPeso += parseFloat(especie.totalPeso);
                            totalesGenerales.totalVenta += parseFloat(especie.totalVenta);
                            totalesGenerales.totalCantidad += parseFloat(especie.totalCantidad);
                        });
                    
                        // Aplicar toFixed(2) para el formato de dos decimales
                        totalesGenerales.totalPeso = totalesGenerales.totalPeso.toFixed(2);
                        totalesGenerales.totalVenta = totalesGenerales.totalVenta.toFixed(2);
                        totalesGenerales.totalCantidad = totalesGenerales.totalCantidad;
                    
                        return totalesGenerales;
                    }

                    const totales = calcularTotalesPorEspecie(response);
                    const totalesGenerales = sumarTotalesGenerales(totales);

                    function fn_buscarValor(obj, especie, valor) {
                        return obj && obj[especie] ? ((obj[especie][valor]) === 1 ? `${fn_formatearCantidades(obj[especie][valor])} Ud.` : `${fn_formatearCantidades(obj[especie][valor])} Uds.`) : "0 Uds";
                    }

                    function fn_buscarValorDecimal(obj, especie, valor) {
                        return obj && obj[especie] ? `${fn_formatearImportes(obj[especie][valor])} Kg` : "0.00 Kg";
                    }
                    
                    function fn_buscarValorDecimalVenta(obj, especie, valor) {
                        return obj && obj[especie] ? `S/. ${fn_formatearImportes(obj[especie][valor])}` : "S/. 0.00";
                    }

                    function fn_buscarValorTotal(obj, especie, valor) {
                        return obj && obj[especie] ? parseInt(obj[especie][valor]): 0;
                    }

                    function fn_buscarValorDecimalTotal(obj, especie, valor) {
                        return obj && obj[especie] ? parseFloat(obj[especie][valor]): 0.00;
                    }

                    let totalCantidadYugo = fn_buscarValorTotal(totales, "especie1", "totalCantidad") + fn_buscarValorTotal(totales, "especie2", "totalCantidad") + fn_buscarValorTotal(totales, "especie17", "totalCantidad");
                    let totalCantidadTecnica = fn_buscarValorTotal(totales, "especie3", "totalCantidad") + fn_buscarValorTotal(totales, "especie4", "totalCantidad") + fn_buscarValorTotal(totales, "especie18", "totalCantidad");
                    let totalCantidadXX = fn_buscarValorTotal(totales, "especie16", "totalCantidad") + fn_buscarValorTotal(totales, "especie19", "totalCantidad");
                    let totalCantidadGallo = fn_buscarValorTotal(totales, "especie7", "totalCantidad") + fn_buscarValorTotal(totales, "especie22", "totalCantidad");
                    let totalCantidadGallinaDoble = fn_buscarValorTotal(totales, "especie5", "totalCantidad") + fn_buscarValorTotal(totales, "especie20", "totalCantidad");
                    let totalCantidadGallinaChica = fn_buscarValorTotal(totales, "especie14", "totalCantidad") + fn_buscarValorTotal(totales, "especie23", "totalCantidad");
                    let totalCantidadAhogadosSecos = fn_buscarValorTotal(totales, "especie6", "totalCantidad") + fn_buscarValorTotal(totales, "especie21", "totalCantidad");
                    let totalCantidadMaltratado = fn_buscarValorTotal(totales, "especie8", "totalCantidad");
                    let totalCantidadTrozado = fn_buscarValorTotal(totales, "especie9", "totalCantidad") + fn_buscarValorTotal(totales, "especie10", "totalCantidad") + fn_buscarValorTotal(totales, "especie11", "totalCantidad") + fn_buscarValorTotal(totales, "especie12", "totalCantidad") + fn_buscarValorTotal(totales, "especie13", "totalCantidad") + fn_buscarValorTotal(totales, "especie15", "totalCantidad");

                    let totalPesoYugo = fn_buscarValorDecimalTotal(totales, "especie1", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie2", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie17", "totalPeso");
                    let totalPesoTecnica = fn_buscarValorDecimalTotal(totales, "especie3", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie4", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie18", "totalPeso");
                    let totalPesoXX = fn_buscarValorDecimalTotal(totales, "especie16", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie19", "totalPeso");
                    let totalPesoGallo = fn_buscarValorDecimalTotal(totales, "especie7", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie22", "totalPeso");
                    let totalPesoGallinaDoble = fn_buscarValorDecimalTotal(totales, "especie5", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie20", "totalPeso");
                    let totalPesoGallinaChica = fn_buscarValorDecimalTotal(totales, "especie14", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie23", "totalPeso");
                    let totalPesoAhogadosSecos = fn_buscarValorDecimalTotal(totales, "especie6", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie21", "totalPeso");
                    let totalPesoMaltratado = fn_buscarValorDecimalTotal(totales, "especie8", "totalPeso");
                    let totalPesoTrozado = fn_buscarValorDecimalTotal(totales, "especie9", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie10", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie11", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie12", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie13", "totalPeso") + fn_buscarValorDecimalTotal(totales, "especie15", "totalPeso");

                    let totalVentaYugo = fn_buscarValorDecimalTotal(totales, "especie1", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie2", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie17", "totalVenta");
                    let totalVentaTecnica = fn_buscarValorDecimalTotal(totales, "especie3", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie4", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie18", "totalVenta");
                    let totalVentaPolloXX = fn_buscarValorDecimalTotal(totales, "especie16", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie19", "totalVenta");
                    let totalVentaGallo = fn_buscarValorDecimalTotal(totales, "especie7", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie22", "totalVenta");
                    let totalVentaGallinaDoble = fn_buscarValorDecimalTotal(totales, "especie5", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie20", "totalVenta");
                    let totalVentaAhogadosSecos = fn_buscarValorDecimalTotal(totales, "especie6", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie21", "totalVenta");
                    let totalVentaPolloMaltratado = fn_buscarValorDecimalTotal(totales, "especie8", "totalVenta");
                    let totalVentaGallinaChica = fn_buscarValorDecimalTotal(totales, "especie14", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie23", "totalVenta");
                    let totalVentaTrozado = fn_buscarValorDecimalTotal(totales, "especie9", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie10", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie11", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie12", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie13", "totalVenta") + fn_buscarValorDecimalTotal(totales, "especie15", "totalVenta");

                    $('#totalUnidadesPrimerEspecie').text(fn_buscarValor(totales, "especie1", "totalCantidad"));
                    $('#totalKgPrimerEspecie').text(fn_buscarValorDecimal(totales, "especie1", "totalPeso"));
                    $('#totalVentaPrimerEspecie').text(fn_buscarValorDecimalVenta(totales, "especie1", "totalVenta"));
                    
                    $('#totalUnidadesSegundaEspecie').text(fn_buscarValor(totales, "especie2", "totalCantidad"));
                    $('#totalKgSegundaEspecie').text(fn_buscarValorDecimal(totales, "especie2", "totalPeso"));
                    $('#totalVentaSegundaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie2", "totalVenta"));
                    
                    $('#totalUnidadesTerceraEspecie').text(fn_buscarValor(totales, "especie3", "totalCantidad"));
                    $('#totalKgTerceraEspecie').text(fn_buscarValorDecimal(totales, "especie3", "totalPeso"));
                    $('#totalVentaTerceraEspecie').text(fn_buscarValorDecimalVenta(totales, "especie3", "totalVenta"));
                    
                    $('#totalUnidadesCuartaEspecie').text(fn_buscarValor(totales, "especie4", "totalCantidad"));
                    $('#totalKgCuartaEspecie').text(fn_buscarValorDecimal(totales, "especie4", "totalPeso"));
                    $('#totalVentaCuartaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie4", "totalVenta"));
                    
                    $('#totalUnidadesQuintaEspecie').text(fn_buscarValor(totales, "especie5", "totalCantidad"));
                    $('#totalKgQuintaEspecie').text(fn_buscarValorDecimal(totales, "especie5", "totalPeso"));
                    $('#totalVentaQuintaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie5", "totalVenta"));
                    
                    $('#totalUnidadesSextaEspecie').text(fn_buscarValor(totales, "especie6", "totalCantidad"));
                    $('#totalKgSextaEspecie').text(fn_buscarValorDecimal(totales, "especie6", "totalPeso"));
                    $('#totalVentaSextaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie6", "totalVenta"));
                    
                    $('#totalUnidadesSeptimaEspecie').text(fn_buscarValor(totales, "especie7", "totalCantidad"));
                    $('#totalKgSeptimaEspecie').text(fn_buscarValorDecimal(totales, "especie7", "totalPeso"));
                    $('#totalVentaSeptimaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie7", "totalVenta"));
                    
                    $('#totalUnidadesOctavaEspecie').text(fn_buscarValor(totales, "especie8", "totalCantidad"));
                    $('#totalKgOctavaEspecie').text(fn_buscarValorDecimal(totales, "especie8", "totalPeso"));
                    $('#totalVentaOctavaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie8", "totalVenta"));
                    
                    $('#totalUnidadesDecimaEspecie').text(fn_buscarValor(totales, "especie10", "totalCantidad"));
                    $('#totalKgDecimaEspecie').text(fn_buscarValorDecimal(totales, "especie10", "totalPeso"));
                    $('#totalVentaDecimaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie10", "totalVenta"));
                    
                    $('#totalUnidadesDecimaPrimeraEspecie').text(fn_buscarValor(totales, "especie11", "totalCantidad"));
                    $('#totalKgDecimaPrimeraEspecie').text(fn_buscarValorDecimal(totales, "especie11", "totalPeso"));
                    $('#totalVentaDecimaPrimeraEspecie').text(fn_buscarValorDecimalVenta(totales, "especie11", "totalVenta"));
                    
                    $('#totalUnidadesDecimaSegundaEspecie').text(fn_buscarValor(totales, "especie12", "totalCantidad"));
                    $('#totalKgDecimaSegundaEspecie').text(fn_buscarValorDecimal(totales, "especie12", "totalPeso"));
                    $('#totalVentaDecimaSegundaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie12", "totalVenta"));
                    
                    $('#totalUnidadesDecimaTerceraEspecie').text(fn_buscarValor(totales, "especie13", "totalCantidad"));
                    $('#totalKgDecimaTerceraEspecie').text(fn_buscarValorDecimal(totales, "especie13", "totalPeso"));
                    $('#totalVentaDecimaTerceraEspecie').text(fn_buscarValorDecimalVenta(totales, "especie13", "totalVenta"));
                    
                    $('#totalUnidadesDecimaCuartaEspecie').text(fn_buscarValor(totales, "especie14", "totalCantidad"));
                    $('#totalKgDecimaCuartaEspecie').text(fn_buscarValorDecimal(totales, "especie14", "totalPeso"));
                    $('#totalVentaDecimaCuartaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie14", "totalVenta"));
                    
                    $('#totalUnidadesDecimaQuintaEspecie').text(fn_buscarValor(totales, "especie15", "totalCantidad"));
                    $('#totalKgDecimaQuintaEspecie').text(fn_buscarValorDecimal(totales, "especie15", "totalPeso"));
                    $('#totalVentaDecimaQuintaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie15", "totalVenta"));
                    
                    $('#totalUnidadesDecimaSextaEspecie').text(fn_buscarValor(totales, "especie16", "totalCantidad"));
                    $('#totalKgDecimaSextaEspecie').text(fn_buscarValorDecimal(totales, "especie16", "totalPeso"));
                    $('#totalVentaDecimaSextaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie16", "totalVenta"));
                    
                    $('#totalUnidadesDecimaSeptimaEspecie').text(fn_buscarValor(totales, "especie17", "totalCantidad"));
                    $('#totalKgDecimaSeptimaEspecie').text(fn_buscarValorDecimal(totales, "especie17", "totalPeso"));
                    $('#totalVentaDecimaSeptimaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie17", "totalVenta"));
                    
                    $('#totalUnidadesDecimaOctavaEspecie').text(fn_buscarValor(totales, "especie18", "totalCantidad"));
                    $('#totalKgDecimaOctavaEspecie').text(fn_buscarValorDecimal(totales, "especie18", "totalPeso"));
                    $('#totalVentaDecimaOctavaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie18", "totalVenta"));
                    
                    $('#totalUnidadesDecimaNovenaEspecie').text(fn_buscarValor(totales, "especie19", "totalCantidad"));
                    $('#totalKgDecimaNovenaEspecie').text(fn_buscarValorDecimal(totales, "especie19", "totalPeso"));
                    $('#totalVentaDecimaNovenaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie19", "totalVenta"));
                    
                    $('#totalUnidadesVigesimaEspecie').text(fn_buscarValor(totales, "especie20", "totalCantidad"));
                    $('#totalKgVigesimaEspecie').text(fn_buscarValorDecimal(totales, "especie20", "totalPeso"));
                    $('#totalVentaVigesimaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie20", "totalVenta"));
                    
                    $('#totalUnidadesVigesimaPrimeraEspecie').text(fn_buscarValor(totales, "especie21", "totalCantidad"));
                    $('#totalKgVigesimaPrimeraEspecie').text(fn_buscarValorDecimal(totales, "especie21", "totalPeso"));
                    $('#totalVentaVigesimaPrimeraEspecie').text(fn_buscarValorDecimalVenta(totales, "especie21", "totalVenta"));
                    
                    $('#totalUnidadesVigesimaSegundaEspecie').text(fn_buscarValor(totales, "especie22", "totalCantidad"));
                    $('#totalKgVigesimaSegundaEspecie').text(fn_buscarValorDecimal(totales, "especie22", "totalPeso"));
                    $('#totalVentaVigesimaSegundaEspecie').text(fn_buscarValorDecimalVenta(totales, "especie22", "totalVenta"));
                    
                    $('#totalUnidadesVigesimaTerceraEspecie').text(fn_buscarValor(totales, "especie23", "totalCantidad"));
                    $('#totalKgVigesimaTerceraEspecie').text(fn_buscarValorDecimal(totales, "especie23", "totalPeso"));
                    $('#totalVentaVigesimaTerceraEspecie').text(fn_buscarValorDecimalVenta(totales, "especie23", "totalVenta"));

                    $('#totalUnidadesEspecies').text(fn_formatearCantidades(totalesGenerales.totalCantidad) + " " + (parseInt(totalesGenerales.totalCantidad) === 1 ? "Ud." : "Uds."));
                    $('#totalKgEspecies').text(fn_formatearImportes(totalesGenerales.totalPeso)+ " Kg");
                    
                    $('#cantidadTotalYugo').text(fn_formatearCantidades(totalCantidadYugo) + " " + (totalCantidadYugo === 1 ? "Ud." : "Uds."));
                    $('#pesoTotalYugo').text(fn_formatearImportes(totalPesoYugo) + " Kg");
                    $('#ventaTotalYugo').text("S/. " + fn_formatearImportes(totalVentaYugo));

                    $('#cantidadTotalTecnica').text(fn_formatearCantidades(totalCantidadTecnica) + " " + (totalCantidadTecnica === 1 ? "Ud." : "Uds."));
                    $('#pesoTotalTecnica').text(fn_formatearImportes(totalPesoTecnica) + " Kg");
                    $('#ventaTotalTecnica').text("S/. " + fn_formatearImportes(totalVentaTecnica));

                    $('#cantidadTotalPolloXX').text(fn_formatearCantidades(totalCantidadXX) + " " + (totalCantidadXX === 1 ? "Ud." : "Uds."));
                    $('#pesoTotalPolloXX').text(fn_formatearImportes(totalPesoXX) + " Kg");
                    $('#ventaTotalPolloXX').text("S/. " + fn_formatearImportes(totalVentaPolloXX));

                    $('#cantidadTotalGallo').text(fn_formatearCantidades(totalCantidadGallo) + " " + (totalCantidadGallo === 1 ? "Ud." : "Uds."));
                    $('#pesoTotalGallo').text(fn_formatearImportes(totalPesoGallo) + " Kg");
                    $('#ventaTotalGallo').text("S/. " + fn_formatearImportes(totalVentaGallo));

                    $('#cantidadTotalGallinaDoble').text(fn_formatearCantidades(totalCantidadGallinaDoble) + " " + (totalCantidadGallinaDoble === 1 ? "Ud." : "Uds."));
                    $('#pesoTotalGallinaDoble').text(fn_formatearImportes(totalPesoGallinaDoble) + " Kg");
                    $('#ventaTotalGallinaDoble').text("S/. " + fn_formatearImportes(totalVentaGallinaDoble));

                    $('#cantidadTotalAhogadosSecos').text(fn_formatearCantidades(totalCantidadAhogadosSecos) + " " + (totalCantidadAhogadosSecos === 1 ? "Ud." : "Uds."));
                    $('#pesoTotalAhogadosSecos').text(fn_formatearImportes(totalPesoAhogadosSecos) + " Kg");
                    $('#ventaTotalAhogadosSecos').text("S/. " + fn_formatearImportes(totalVentaAhogadosSecos));

                    $('#cantidadTotalGallinaChicaFija').text(fn_formatearCantidades(totalCantidadGallinaChica) + " " + (totalCantidadGallinaChica === 1 ? "Ud." : "Uds."));
                    $('#pesoTotalGallinaChicaFija').text(fn_formatearImportes(totalPesoGallinaChica)+ " Kg");
                    $('#ventaTotalGallinaChica').text("S/. " + fn_formatearImportes(totalVentaGallinaChica));

                    $('#cantidadTotalPolloMaltratado').text(fn_formatearCantidades(totalCantidadMaltratado) + " " + (totalCantidadMaltratado === 1 ? "Ud." : "Uds."));
                    $('#pesoTotalPolloMaltratado').text(fn_formatearImportes(totalPesoMaltratado) + " Kg");
                    $('#ventaTotalPolloMaltratado').text("S/. " + fn_formatearImportes(totalVentaPolloMaltratado));

                    $('#cantidadTotalPolloTrozado').text(fn_formatearCantidades(totalCantidadTrozado) + " " + (totalCantidadTrozado === 1 ? "Ud." : "Uds."));
                    $('#pesoTotalPolloTrozado').text(fn_formatearImportes(totalPesoTrozado) + " Kg");
                    $('#ventaTotalTrozado').text("S/. " + fn_formatearImportes(totalVentaTrozado));

                    $.ajax({
                        url: '/fn_consulta_ConsultarProveedor',
                        method: 'GET',
                        data: {
                            fechaDesde: fechaHoy,
                            fechaHasta: fechaHoy,
                        },
                        success: function(response) {
                            if (Array.isArray(response)) {

                                const groupedData = response.reduce((acc, item) => {
                                    const key = `${item.idProveedor}-${item.nombreEspecieCompra}`;
                                    
                                    const pesoNetoGuia = parseFloat(item.pesoBrutoGuia) - parseFloat(item.pesoTaraGuia);
                                    const precioTotalGuia = item.precioGuia ? pesoNetoGuia * item.precioGuia : 0;
                                
                                    if (!acc[key]) {
                                        acc[key] = {
                                            idProveedor: item.idProveedor,
                                            nombreEspecieCompra: item.nombreEspecieCompra,
                                            cantidadGuia: 0,
                                            pesoNetoGuia: 0,
                                            precioTotalGuia: 0
                                        };
                                    }
                                
                                    acc[key].cantidadGuia += item.cantidadGuia;
                                    acc[key].pesoNetoGuia += pesoNetoGuia;
                                    acc[key].precioTotalGuia += precioTotalGuia;
                                
                                    return acc;
                                }, {});
                                
                                const result = Object.values(groupedData);

                                const arregloProveedores = {
                                    tecnica : {
                                        cantidad: 0,
                                        pesoTotal: 0,
                                    },
                                    yugo : {
                                        cantidad: 0,
                                        pesoTotal: 0,
                                    },
                                    polloXX : {
                                        cantidad: 0,
                                        pesoTotal: 0,
                                    },
                                    gallo : {
                                        cantidad: 0,
                                        pesoTotal: 0,
                                    },
                                    gallinaDoble : {
                                        cantidad: 0,
                                        pesoTotal: 0,
                                    },
                                    gallinaChica : {
                                        cantidad: 0,
                                        pesoTotal: 0,
                                    },
                                    otros : {
                                        cantidad: 0,
                                        pesoTotal: 0,
                                    }
                                }

                                result.forEach(function(obj) {
                                    let especieUpper = obj.nombreEspecieCompra;

                                    if (especieUpper === "GALLO YUGO") {
                                        arregloProveedores.gallo.cantidad += obj.cantidadGuia;
                                        arregloProveedores.gallo.pesoTotal += obj.pesoNetoGuia;
                                    }
                                    if (especieUpper === "YUGO TRUJILLO AA" || especieUpper === "YUGO PIURA AA" || especieUpper === "YUGO PIURA") {
                                        arregloProveedores.yugo.cantidad += obj.cantidadGuia;
                                        arregloProveedores.yugo.pesoTotal += obj.pesoNetoGuia;
                                    }
                                    if (especieUpper === "YUGO PIURA GALLINA DOBLE" || especieUpper === "ATOCHE GALLINA DOBLE") {
                                        arregloProveedores.gallinaDoble.cantidad += obj.cantidadGuia;
                                        arregloProveedores.gallinaDoble.pesoTotal += obj.pesoNetoGuia;
                                    }
                                    if (especieUpper === "TECNICA AA" || especieUpper === "MASAY") {
                                        arregloProveedores.tecnica.cantidad += obj.cantidadGuia;
                                        arregloProveedores.tecnica.pesoTotal += obj.pesoNetoGuia;
                                    }
                                    if (especieUpper === "YUGO PIURA XX" || especieUpper === "YUGO TRUJILLO XX") {
                                        arregloProveedores.polloXX.cantidad += obj.cantidadGuia;
                                        arregloProveedores.polloXX.pesoTotal += obj.pesoNetoGuia;
                                    }
                                    if (especieUpper === "SALOMON GALLINA CHICA" || especieUpper === "YUGO PIURA GALLINA CHICA") {
                                        arregloProveedores.gallinaChica.cantidad += obj.cantidadGuia;
                                        arregloProveedores.gallinaChica.pesoTotal += obj.pesoNetoGuia;
                                    }
                                    if (especieUpper === "CHIMU" || especieUpper === "OTROS") {
                                        arregloProveedores.otros.cantidad += obj.cantidadGuia;
                                        arregloProveedores.otros.pesoTotal += obj.pesoNetoGuia;
                                    }
                                });

                                $.ajax({
                                    url: '/fn_consulta_TraerStock',
                                    method: 'GET',
                                    data: {
                                        fecha: fechaHoy
                                    },
                                    success: function (response) {
                                        if (Array.isArray(response)) {
                                            // console.log("Response:", response);
                                            let totalCantidadStockPollo = 0;
                                            let totalPesoStockPollo = 0;
                    
                                            let stockTecnicaPeso = 0;
                                            let stockYugoPeso = 0;
                                            let stockPolloXXPeso = 0;
                                            let stockGalloPeso = 0;
                                            let stockGallinaDoblePeso = 0;
                                            let stockGallinaChicaPeso = 0;
                    
                                            let stockTecnicaCantidad = 0;
                                            let stockYugoCantidad = 0;
                                            let stockPolloXXCantidad = 0;
                                            let stockGalloCantidad = 0;
                                            let stockGallinaDobleCantidad = 0;
                                            let stockGallinaChicaCantidad = 0;
                    
                                            response.forEach(function (obj) {
                                                totalCantidadStockPollo += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                                totalPesoStockPollo += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                                if(obj.nombreEspecie == "STOCK DE TECNICA"){
                                                    stockTecnicaCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                                    stockTecnicaPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                                }else if(obj.nombreEspecie == "STOCK DE YUGO"){
                                                    stockYugoCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                                    stockYugoPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                                }else if(obj.nombreEspecie == "STOCK XX"){
                                                    stockPolloXXCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                                    stockPolloXXPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                                }else if(obj.nombreEspecie == "STOCK GALLO"){
                                                    stockGalloCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                                    stockGalloPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                                }else if(obj.nombreEspecie == "STOCK GALLINA DOBLE"){
                                                    stockGallinaDobleCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                                    stockGallinaDoblePeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                                }else if(obj.nombreEspecie == "STOCK GALLINA CHICA"){
                                                    stockGallinaChicaCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                                    stockGallinaChicaPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                                }
                                            });

                                            let cantidadTotalEspeciesOtros = totalCantidadAhogadosSecos + totalCantidadTrozado + totalCantidadMaltratado;
                                            let pesoTotalEspeciesOtros = totalPesoAhogadosSecos + totalPesoTrozado + totalPesoMaltratado;

                                            totalPesoTecnica = totalPesoTecnica + pesoTotalEspeciesOtros;
                                            totalCantidadTecnica = totalCantidadTecnica + cantidadTotalEspeciesOtros;

                                            let mermaDiferenciaCantidadYugo = (parseInt(arregloProveedores.yugo.cantidad) + parseInt(stockYugoCantidad)) - totalCantidadYugo;
                                            let mermaDiferenciaPesoYugo = (parseFloat(arregloProveedores.yugo.pesoTotal) + parseFloat(stockYugoPeso)) - totalPesoYugo;

                                            let mermaDiferenciaCantidadTecnica = (parseInt(arregloProveedores.tecnica.cantidad) + parseInt(stockTecnicaCantidad)) - (totalCantidadTecnica);
                                            let mermaDiferenciaPesoTecnica = (parseFloat(arregloProveedores.tecnica.pesoTotal) + parseFloat(stockTecnicaPeso)) - (totalPesoTecnica);
                                            
                                            let mermaDiferenciaCantidadPolloXX = (parseInt(arregloProveedores.polloXX.cantidad) + parseInt(stockPolloXXCantidad)) - totalCantidadXX;
                                            let mermaDiferenciaPesoPolloXX = (parseFloat(arregloProveedores.polloXX.pesoTotal) + parseFloat(stockPolloXXPeso)) - totalPesoXX;
                                            
                                            let mermaDiferenciaCantidadGallo = (parseInt(arregloProveedores.gallo.cantidad) + parseInt(stockGalloCantidad)) - totalCantidadGallo;
                                            let mermaDiferenciaPesoGallo = (parseFloat(arregloProveedores.gallo.pesoTotal) + parseFloat(stockGalloPeso)) - totalPesoGallo;
                                            
                                            let mermaDiferenciaCantidadGallinaDoble = (parseInt(arregloProveedores.gallinaDoble.cantidad) + parseInt(stockGallinaDobleCantidad)) - totalCantidadGallinaDoble;
                                            let mermaDiferenciaPesoGallinaDoble = (parseFloat(arregloProveedores.gallinaDoble.pesoTotal) + parseFloat(stockGallinaDoblePeso)) - totalPesoGallinaDoble;
                                            
                                            let mermaDiferenciaCantidadGallinaChica = (parseInt(arregloProveedores.gallinaChica.cantidad) + parseInt(stockGallinaChicaCantidad)) - totalCantidadGallinaChica;
                                            let mermaDiferenciaPesoGallinaChica = (parseFloat(arregloProveedores.gallinaChica.pesoTotal) + parseFloat(stockGallinaChicaPeso)) - totalPesoGallinaChica;

                                            let totalCantidadSoloPollos = parseInt(arregloProveedores.yugo.cantidad) + parseInt(arregloProveedores.tecnica.cantidad) + parseInt(arregloProveedores.polloXX.cantidad);
                                            let totalCantidadStockSoloPollos = parseInt(stockYugoCantidad) + parseInt(stockTecnicaCantidad) + parseInt(stockPolloXXCantidad);
                                            let totalCantidadTotalSoloPollos = totalCantidadSoloPollos + totalCantidadStockSoloPollos;
                                            let totalPesoTotalSoloPollos = (parseFloat(arregloProveedores.yugo.pesoTotal) + parseFloat(stockYugoPeso)) + (parseFloat(arregloProveedores.tecnica.pesoTotal) + parseFloat(stockTecnicaPeso)) + (parseFloat(arregloProveedores.polloXX.pesoTotal) + parseFloat(stockPolloXXPeso));

                                            let totalCantidadTotalSoloPollosVenta = totalCantidadYugo + totalCantidadTecnica + totalCantidadXX;
                                            let totalPesoTotalSoloPollosVenta = totalPesoYugo + totalPesoTecnica + totalPesoXX;

                                            let mermaTotalCantidadSoloPollos = totalCantidadTotalSoloPollos - totalCantidadTotalSoloPollosVenta;
                                            let mermaTotalPesoSoloPollos = totalPesoTotalSoloPollos - totalPesoTotalSoloPollosVenta;

                                            let totalCantidadGeneral = totalCantidadSoloPollos + parseInt(arregloProveedores.gallo.cantidad) + parseInt(arregloProveedores.gallinaDoble.cantidad) + parseInt(arregloProveedores.gallinaChica.cantidad);
                                            let totalCantidadStockGeneral = totalCantidadStockSoloPollos + parseInt(stockGalloCantidad) + parseInt(stockGallinaDobleCantidad) + parseInt(stockGallinaChicaCantidad);
                                            let totalCantidadTotalGeneral = totalCantidadGeneral + totalCantidadStockGeneral;
                                            let totalPesoTotalGeneral = totalPesoTotalSoloPollos + (parseFloat(arregloProveedores.gallo.pesoTotal) + parseFloat(stockGalloPeso)) + (parseFloat(arregloProveedores.gallinaDoble.pesoTotal) + parseFloat(stockGallinaDoblePeso)) + (parseFloat(arregloProveedores.gallinaChica.pesoTotal) + parseFloat(stockGallinaChicaPeso));

                                            let totalCantidadTotalGeneralVenta = totalCantidadTotalSoloPollosVenta + totalCantidadGallo + totalCantidadGallinaDoble + totalCantidadGallinaChica;
                                            let totalPesoTotalGeneralVenta = totalPesoTotalSoloPollosVenta + totalPesoGallo + totalPesoGallinaDoble + totalPesoGallinaChica;

                                            let mermaTotalCantidadGeneral = totalCantidadTotalGeneral - totalCantidadTotalGeneralVenta;
                                            let mermaTotalPesoGeneral = totalPesoTotalGeneral - totalPesoTotalGeneralVenta;

                                            let result = `
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                                    <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Pollo Yugo</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${arregloProveedores.yugo.cantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockYugoCantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(arregloProveedores.yugo.cantidad) + parseInt(stockYugoCantidad)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(arregloProveedores.yugo.pesoTotal) + parseFloat(stockYugoPeso)).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadYugo ? totalCantidadYugo : 0}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoYugo ? totalPesoYugo : 0).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadYugo ? mermaDiferenciaCantidadYugo : 0)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaPesoYugo ? mermaDiferenciaPesoYugo : 0).toFixed(2)}</td>
                                                </tr>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                                    <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Pollo Tecnica</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${arregloProveedores.tecnica.cantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockTecnicaCantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(arregloProveedores.tecnica.cantidad) + parseInt(stockTecnicaCantidad)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(arregloProveedores.tecnica.pesoTotal) + parseFloat(stockTecnicaPeso)).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadTecnica ? totalCantidadTecnica : 0}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoTecnica ? totalPesoTecnica : 0).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadTecnica ? mermaDiferenciaCantidadTecnica : 0)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaPesoTecnica ? mermaDiferenciaPesoTecnica : 0).toFixed(2)}</td>
                                                </tr>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                                    <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Pollo XX</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${arregloProveedores.polloXX.cantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockPolloXXCantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(arregloProveedores.polloXX.cantidad) + parseInt(stockPolloXXCantidad)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(arregloProveedores.polloXX.pesoTotal) + parseFloat(stockPolloXXPeso)).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadXX ? totalCantidadXX : 0}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoXX ? totalPesoXX : 0).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadPolloXX ? mermaDiferenciaCantidadPolloXX : 0)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaPesoPolloXX ? mermaDiferenciaPesoPolloXX : 0).toFixed(2)}</td>
                                                </tr>
                                                <tr class="bg-red-600 border-b dark:border-gray-700 text-gray-200">
                                                    <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white whitespace-nowrap">Total de Pollos</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearCantidades(totalCantidadSoloPollos)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearCantidades(totalCantidadStockSoloPollos)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearCantidades(totalCantidadTotalSoloPollos)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearImportes(totalPesoTotalSoloPollos)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadTotalSoloPollosVenta ? fn_formatearCantidades(totalCantidadTotalSoloPollosVenta) : 0}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoTotalSoloPollosVenta ? fn_formatearImportes(totalPesoTotalSoloPollosVenta) : 0)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaTotalCantidadSoloPollos ? fn_formatearCantidades(mermaTotalCantidadSoloPollos) : 0)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaTotalPesoSoloPollos ? fn_formatearImportes(mermaTotalPesoSoloPollos) : 0)}</td>
                                                </tr>
                                                <tr class="border-b dark:border-gray-700 bg-yellow-300 text-gray-900">
                                                    <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">Trozado, Secos y Ahogados</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${cantidadTotalEspeciesOtros ? cantidadTotalEspeciesOtros : 0}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(pesoTotalEspeciesOtros ? pesoTotalEspeciesOtros : 0).toFixed(2)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>
                                                </tr>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                                    <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Gallo</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${arregloProveedores.gallo.cantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGalloCantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(arregloProveedores.gallo.cantidad) + parseInt(stockGalloCantidad)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(arregloProveedores.gallo.pesoTotal) + parseFloat(stockGalloPeso)).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadGallo ? totalCantidadGallo : 0}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoGallo ? totalPesoGallo : 0).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadGallo ? mermaDiferenciaCantidadGallo : 0)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaPesoGallo ? mermaDiferenciaPesoGallo : 0).toFixed(2)}</td>
                                                </tr>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                                    <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Gallina Doble</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${arregloProveedores.gallinaDoble.cantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGallinaDobleCantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(arregloProveedores.gallinaDoble.cantidad) + parseInt(stockGallinaDobleCantidad)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(arregloProveedores.gallinaDoble.pesoTotal) + parseFloat(stockGallinaDoblePeso)).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadGallinaDoble ? totalCantidadGallinaDoble : 0}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoGallinaDoble ? totalPesoGallinaDoble : 0).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadGallinaDoble ? mermaDiferenciaCantidadGallinaDoble : 0)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaPesoGallinaDoble ? mermaDiferenciaPesoGallinaDoble : 0).toFixed(2)}</td>
                                                </tr>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                                    <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Gallina Chica</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${arregloProveedores.gallinaChica.cantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGallinaChicaCantidad}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(arregloProveedores.gallinaChica.cantidad) + parseInt(stockGallinaChicaCantidad)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(arregloProveedores.gallinaChica.pesoTotal) + parseFloat(stockGallinaChicaPeso)).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadGallinaChica ? totalCantidadGallinaChica : 0}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoGallinaChica ? totalPesoGallinaChica : 0).toFixed(2)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadGallinaChica ? mermaDiferenciaCantidadGallinaChica : 0)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaPesoGallinaChica ? mermaDiferenciaPesoGallinaChica : 0).toFixed(2)}</td>
                                                </tr>
                                                <tr class="bg-red-600 uppercase border-b dark:border-gray-700 text-gray-200">
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 text-white whitespace-nowrap">Total General</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearCantidades(totalCantidadGeneral)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearCantidades(totalCantidadStockGeneral)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearCantidades(totalCantidadTotalGeneral)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearImportes(totalPesoTotalGeneral)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadTotalGeneralVenta ? fn_formatearCantidades(totalCantidadTotalGeneralVenta) : 0}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoTotalGeneralVenta ? fn_formatearImportes(totalPesoTotalGeneralVenta) : 0)}</td>

                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaTotalCantidadGeneral ? fn_formatearCantidades(mermaTotalCantidadGeneral) : 0)}</td>
                                                    <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaTotalPesoGeneral ? fn_formatearImportes(mermaTotalPesoGeneral) : 0)}</td>
                                                </tr>
                                            `;
                                            
                                            $("#bodycantidadesPollosCalculo").empty();
                                            $("#bodycantidadesPollosCalculo").html(result);
                                        } else {
                                            console.log("La respuesta no es un arreglo de objetos.");
                                        }
                                    },
                                    error: function (error) {
                                        console.error("ERROR", error);
                                    }
                                });
                            } else {
                                console.log("La respuesta no es un arreglo de objetos.");
                            }
                        },
                        error: function(error) {
                            console.error("ERROR", error);
                        }
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

    fn_TraerClientesAgregarSaldo(fechaHoy);

    function fn_TraerClientesAgregarSaldo(fecha) {
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarSaldo',
            method: 'GET',
            data: {
                fecha: fecha,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    let contador = 0
    
                    // Objeto para almacenar los resultados agrupados por codigoCli
                    let resultadosAgrupados = {};
    
                    // Iterar sobre los objetos y agrupar por codigoCli
                    response.forEach(function (obj) {
                        let codigoCli = obj.codigoCli;
    
                        if (!resultadosAgrupados[codigoCli]) {
                            resultadosAgrupados[codigoCli] = {
                                nombreCompleto: obj.nombreCompleto,
                                codigoCli: codigoCli,
                                deudaTotal: 0,
                                cantidadPagos: 0,
                                ventaDescuentos: 0,
                                limitEndeudamiento: 0
                            };
                        }
    
                        // Sumar las propiedades correspondientes
                        resultadosAgrupados[codigoCli].deudaTotal += parseFloat(obj.deudaTotal);
                        resultadosAgrupados[codigoCli].cantidadPagos += parseFloat(obj.cantidadPagos);
                        resultadosAgrupados[codigoCli].ventaDescuentos += parseFloat(obj.ventaDescuentos);
                        resultadosAgrupados[codigoCli].limitEndeudamiento += parseFloat(obj.limitEndeudamiento);
                    });
    
                    // Iterar sobre los resultados agrupados y mostrar en la tabla
                    Object.values(resultadosAgrupados).forEach(function (obj) {
                        let total = obj.deudaTotal - obj.cantidadPagos + obj.ventaDescuentos;
    
                        // Crear una nueva fila
                        if (total >= parseFloat(obj.limitEndeudamiento)) {
                            contador++;
                        }
                    });
                    if (contador > 0){
                        Swal.fire({
                            icon: 'warning',
                            title: 'Deudas Excesivas',
                            text: (contador === 1 ? 'Se encontró 1 deuda excesiva.' : 'Se encontrarón '+contador + ' deudas excesivas.'),
                            footer: '<a href="/agregar_saldo">Ir a revisar</a>',
                            confirmButtonColor: '#3B52D1'
                        });                        
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
    
});
import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    var timerInterval;
    var contenidoHeader = $("#headerReporteAcumuladoExcel").html();
    var contenidoHeaderResumenDelResumen = $("#headerReporteAcumuladoExcelResumenDelResumen").html();

    var tipoUsuario = $('#tipoUsuario').data('id');
    var usuarioRegistroCli = $('#usuarioRegistroCli').data('id');
    var usuarioRegistroCliNombre = $('#usuarioRegistroCliNombre').data('id');

    var limitReporteCobranza = 0;
    var saldoActualReporteCobranza = 0;
    var depositosReporteCobranza = 0;
    var saldoActualGuiaReporteCobranza = 0;

    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReporteAcumulado').val(fechaHoy);
    $('#fechaHastaReporteAcumulado').val(fechaHoy);
    $('#fechaReporteExcel').val(fechaHoy);
    $('#fechaCambiarPrecioPesada').val(fechaHoy);
    $('#divReporteAcumuladoDetalleExcel').hide();
    fn_TraerReporteAcumuladoDetalle(fechaHoy);

    fn_declarar_especies();

    var primerEspecieGlobal = 0;
    var segundaEspecieGlobal = 0;
    var terceraEspecieGlobal = 0;
    var cuartaEspecieGlobal = 0;
    var nombrePrimerEspecieGlobal = "";
    var nombreSegundaEspecieGlobal = "";
    var nombreTerceraEspecieGlobal = "";
    var nombreCuartaEspecieGlobal = "";

    /* ============ Eventos ============ */

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

    $(document).on("click", "#btnVerReporteDetallado", function() {
        let btnVerReporteDetallado = $(this).text();

        if(btnVerReporteDetallado == "Ver Reporte Detallado"){
            $('#divReporteAcumuladoDetalleExcelResumenDelResumen').hide();
            $('#divReporteAcumuladoDetalleExcel').show();
            $('#btnVerReporteDetallado').text("Ver Reporte Acumulado");
        }else{
            $('#divReporteAcumuladoDetalleExcelResumenDelResumen').show();
            $('#divReporteAcumuladoDetalleExcel').hide();
            $('#btnVerReporteDetallado').text("Ver Reporte Detallado");
        }

    });

    var totalSaldoAnteriorSubTotales = 0;
    var totalSaldoActualSubTotales = 0;
    var totalCobranzaSubTotales = 0;
    var totalNuevoSaldoSubTotales = 0;

    function fn_TraerReporteAcumuladoDetalle(fecha) {
        totalSaldoAnteriorSubTotales = 0;
        totalSaldoActualSubTotales = 0;
        totalCobranzaSubTotales = 0;
        totalNuevoSaldoSubTotales = 0;
        $.ajax({
            url: '/fn_consulta_TraerReporteAcumuladoDetalle',
            method: 'GET',
            data: {
                fecha: fecha,
            },
            success: function (response) {
                // Filtrar clientes que tienen datos en al menos uno de los totales
                const clientesFiltrados = response.filter(cliente => 
                    cliente.datosTabla_tb_pesadas.length > 0 || 
                    cliente.datosTabla_tb_pesadas2.length > 0 || 
                    cliente.datosTabla_tb_pesadas3.length > 0
                );

                const clientesModificados = clientesFiltrados.map(function(clienteObj) {
                    return {
                        codigoCli: clienteObj.cliente.codigoCli,
                        nombreCompleto: clienteObj.cliente.nombreCompleto,
                        limitEndeudamiento: clienteObj.cliente.limitEndeudamiento,
                        datosTabla_tb_pesadas: clienteObj.datosTabla_tb_pesadas,
                        ventaAnterior: clienteObj.ventaAnterior,
                        datosTabla_tb_pesadas2: clienteObj.datosTabla_tb_pesadas2,
                        ventaAnterior2: clienteObj.ventaAnterior2,
                        datosTabla_tb_pesadas3: clienteObj.datosTabla_tb_pesadas3,
                        ventaAnterior3: clienteObj.ventaAnterior3,
                        totalDescuentos: clienteObj.totalDescuentos,
                        totalPagos: clienteObj.totalPagos,
                        pagoAnterior: clienteObj.pagoAnterior,
                        totalVentaDescuentoAnterior: clienteObj.totalVentaDescuentoAnterior
                    };
                });

                const clientesConAgrupacion = clientesModificados.map(function(clienteObj) {
                    // Crear un objeto para almacenar los datos agrupados por idEspecie
                    var datosTabla_tb_pesadasGeneral = {};
                
                    // Función para agregar datos al objeto agrupado
                    function agregarDatos(datosArray) {
                        datosArray.forEach(function(item) {
                            var idEspecie = item.idEspecie;
                            var claveEspecie = `especie${idEspecie}`;
                            
                            if (!datosTabla_tb_pesadasGeneral[claveEspecie]) {
                                datosTabla_tb_pesadasGeneral[claveEspecie] = [];
                            }
                            datosTabla_tb_pesadasGeneral[claveEspecie].push(item);
                        });
                    }                    
                
                    // Agregar datos de todos los arreglos al objeto agrupado
                    agregarDatos(clienteObj.datosTabla_tb_pesadas || []);
                    agregarDatos(clienteObj.datosTabla_tb_pesadas2 || []);
                    agregarDatos(clienteObj.datosTabla_tb_pesadas3 || []);
                
                    return {
                        codigoCli: clienteObj.codigoCli,
                        nombreCompleto: clienteObj.nombreCompleto,
                        limitEndeudamiento: clienteObj.limitEndeudamiento,
                        datosTabla_tb_pesadasGeneral: datosTabla_tb_pesadasGeneral,
                        ventaAnterior: clienteObj.ventaAnterior,
                        ventaAnterior2: clienteObj.ventaAnterior2,
                        ventaAnterior3: clienteObj.ventaAnterior3,
                        totalDescuentos: clienteObj.totalDescuentos,
                        totalPagos: clienteObj.totalPagos,
                        pagoAnterior: clienteObj.pagoAnterior,
                        totalVentaDescuentoAnterior: clienteObj.totalVentaDescuentoAnterior
                    };
                });

                function calcularTotales(clientesConAgrupacion) {
                    return clientesConAgrupacion.map(cliente => {
                        let datosTabla_tb_pesadasGeneral = cliente.datosTabla_tb_pesadasGeneral;
                        
                        // Crear un nuevo objeto para almacenar los datos resumidos
                        let datosResumen = {};
                        
                        for (let especie in datosTabla_tb_pesadasGeneral) {
                            let items = datosTabla_tb_pesadasGeneral[especie];
                            
                            let totalPeso = 0;
                            let totalVenta = 0;
                            let totalCantidad = 0;
                            let precios = new Set(); // Para almacenar precios únicos
                            
                            items.forEach(item => {
                                let pesoNeto = parseFloat(item.pesoNetoPes);
                                let pesoJabas = parseFloat(item.pesoNetoJabas);
                                let cantidad = item.cantidadPes;
                                let precio = parseFloat(item.precioPes);
                                
                                // Sumar totalPeso y totalVenta
                                if (pesoNeto > 0) {
                                    totalPeso += pesoNeto - pesoJabas;
                                    totalVenta += (pesoNeto - pesoJabas) * precio;
                                } else {
                                    totalPeso += pesoNeto + pesoJabas;
                                    totalVenta += (pesoNeto + pesoJabas) * precio;
                                }
                                
                                // Sumar totalCantidad
                                totalCantidad += cantidad;
                                
                                // Agregar precio a los precios únicos
                                precios.add(precio);
                            });
                            
                            // Calcular precio promedio
                            let precioPromedio = precios.size ? [...precios].reduce((a, b) => a + b, 0) / precios.size : 0;
                            
                            // Calcular promedioEspecie
                            let promedioEspecie = totalCantidad > 0 ? totalPeso / totalCantidad : 0;
                            
                            // Agregar resultados al objeto de resumen
                            datosResumen[especie] = [{
                                totalPeso: totalPeso.toFixed(2),
                                totalVenta: totalVenta.toFixed(2),
                                totalCantidad: totalCantidad,
                                precioPromedio: precioPromedio.toFixed(2),
                                promedioEspecie: promedioEspecie.toFixed(2)
                            }];
                        }
                        
                        // Devolver el objeto cliente con los datos calculados
                        return {
                            ...cliente,
                            datosTabla_tb_pesadasGeneral: datosResumen
                        };
                    });
                }

                function obtenerTotalesPorEspecie(clientesConTotales) {
                    let totalesPorEspecie = {};
                    
                    clientesConTotales.forEach(cliente => {
                        let datosTabla_tb_pesadasGeneral = cliente.datosTabla_tb_pesadasGeneral;
                        
                        for (let especie in datosTabla_tb_pesadasGeneral) {
                            let especieData = datosTabla_tb_pesadasGeneral[especie][0];
                            
                            if (!totalesPorEspecie[especie]) {
                                totalesPorEspecie[especie] = {
                                    totalPeso: 0,
                                    totalVenta: 0,
                                    totalCantidad: 0,
                                    precioPromedio: 0,
                                    promedioEspecie: 0
                                };
                            }
                            
                            totalesPorEspecie[especie].totalPeso += parseFloat(especieData.totalPeso);
                            totalesPorEspecie[especie].totalVenta += parseFloat(especieData.totalVenta);
                            totalesPorEspecie[especie].totalCantidad += especieData.totalCantidad;
                        }
                    });
                    
                    // Calcular promedioEspecie y precioPromedio global
                    for (let especie in totalesPorEspecie) {
                        let especieData = totalesPorEspecie[especie];
                        especieData.promedioEspecie = especieData.totalCantidad > 0 ? (especieData.totalPeso / especieData.totalCantidad).toFixed(2) : 0;
                        especieData.precioPromedio = especieData.totalCantidad > 0 ? (especieData.totalVenta / especieData.totalPeso).toFixed(2) : 0;
                        
                        // Redondear los totales
                        especieData.totalPeso = especieData.totalPeso.toFixed(2);
                        especieData.totalVenta = especieData.totalVenta.toFixed(2);
                    }
                    
                    return totalesPorEspecie;
                }

                function sumarTotalDescuentos(clientes) {
                    return clientes.reduce((resultados, cliente) => {
                        if (cliente.totalDescuentos && cliente.totalDescuentos.length > 0) {
                            cliente.totalDescuentos.forEach(descuento => {
                                resultados.totalPesoDescuento += parseFloat(descuento.totalPesoDescuento);
                                resultados.totalVentaDescuento += parseFloat(descuento.totalVentaDescuento);
                            });
                        }
                        return resultados;
                    }, { totalPesoDescuento: 0, totalVentaDescuento: 0 });
                }

                const clientesConTotales = calcularTotales(clientesConAgrupacion);
                const totalesPorEspecie = obtenerTotalesPorEspecie(clientesConTotales);
                const resultadosDescuentos = sumarTotalDescuentos(clientesConTotales);

                $.ajax({
                    url: '/fn_consulta_ConsultarProveedorSum',
                        method: 'GET',
                        data:{
                            fecha:fecha
                        },
                        success: function (response) {
                            // Verificar si la respuesta es un arreglo de objetos
                            if (Array.isArray(response)) {
                                let promediosEspeciesCompra = {
                                    tecnica : 0,
                                    yugo : 0,
                                    xx : 0,
                                    gallinaDoble : 0,
                                    gallinaChica : 0,
                                    gallo : 0,
                                };

                                let contadorTecnica = 0;
                                let contadorYugo = 0;
                                let contadorXX = 0;
                                let contadorGallinaDoble = 0;
                                let contadorGallinaChica = 0;
                                let contadorGallo = 0;

                                response.forEach(function (obj) {
                                    let pesoNeto = parseFloat(obj.totalPesoBrutoGuia)-parseFloat(obj.totalPesoTaraGuia);
                                    let promedio = parseFloat(pesoNeto)/parseInt(obj.totalCantidadGuia);

                                    if(obj.nombreEspecieCompra == "TECNICA AA"){
                                        promediosEspeciesCompra.tecnica += promedio;
                                        contadorTecnica++;
                                    }else if(obj.nombreEspecieCompra == "YUGO PIURA AA" || obj.nombreEspecieCompra == "YUGO TRUJILLO AA" || obj.nombreEspecieCompra == "YUGO PIURA"){
                                        promediosEspeciesCompra.yugo += promedio;
                                        contadorYugo++;
                                    }else if(obj.nombreEspecieCompra == "YUGO PIURA XX" || obj.nombreEspecieCompra == "YUGO TRUJILLO XX"){
                                        promediosEspeciesCompra.xx += promedio;
                                        contadorXX++;
                                    }else if(obj.nombreEspecieCompra == "YUGO PIURA GALLINA DOBLE" || obj.nombreEspecieCompra == "ATOCHE GALLINA DOBLE"){
                                        promediosEspeciesCompra.gallinaDoble += promedio;
                                        contadorGallinaDoble++;
                                    }else if(obj.nombreEspecieCompra == "YUGO PIURA GALLINA CHICA" || obj.nombreEspecieCompra == "SALOMON GALLINA CHICA"){
                                        promediosEspeciesCompra.gallinaChica += promedio;
                                        contadorGallinaChica++;
                                    }else if(obj.nombreEspecieCompra == "GALLO YUGO"){
                                        promediosEspeciesCompra.gallo += promedio;
                                        contadorGallo++;
                                    }
                                });

                                function calcularPromedio(valor, contador) {
                                    return contador === 0 ? 0 : (valor / contador).toFixed(2);
                                }
                                
                                promediosEspeciesCompra.tecnica = calcularPromedio(promediosEspeciesCompra.tecnica, contadorTecnica);
                                promediosEspeciesCompra.yugo = calcularPromedio(promediosEspeciesCompra.yugo, contadorYugo);
                                promediosEspeciesCompra.xx = calcularPromedio(promediosEspeciesCompra.xx, contadorXX);
                                promediosEspeciesCompra.gallinaDoble = calcularPromedio(promediosEspeciesCompra.gallinaDoble, contadorGallinaDoble);
                                promediosEspeciesCompra.gallinaChica = calcularPromedio(promediosEspeciesCompra.gallinaChica, contadorGallinaChica);
                                promediosEspeciesCompra.gallo = calcularPromedio(promediosEspeciesCompra.gallo, contadorGallo);                                

                                fn_crearDatosTablaExcel(clientesConTotales, totalesPorEspecie, resultadosDescuentos, promediosEspeciesCompra);
                                fn_consultarDatosProveedores(fecha);
                            } else {
                                console.log("La respuesta no es un arreglo de objetos.");
                            }
                        },
                        error: function(error) {
                            console.error("ERROR",error);
                        }
                    });

            },
            error: function (error) {
                console.error("ERROR", error);
            },
        });
    }

    function fn_crearDatosTablaExcel(clientesConTotales, totalesPorEspecie, resultadosDescuentos, promediosEspeciesCompra){
        let bodyTablaExcel = "";
        let bodyTablaExcelResumen = "";
        let bodyTablaExcelResumenDelResumen = "";
        
        clientesConTotales.forEach(function (item) {
            bodyTablaExcel += fn_crearFilaTablaExcel(item)
            bodyTablaExcelResumenDelResumen += fn_crearFilaTablaExcelResumenDelResumen(item)
            bodyTablaExcelResumen += fn_crearFilaTablaExcelResumen(item)
        })

        bodyTablaExcel += fn_crearFilaTotalTablaExcel(totalesPorEspecie, resultadosDescuentos, promediosEspeciesCompra)
        bodyTablaExcelResumenDelResumen += fn_crearFilaTotalTablaExcelResumenDelResumen(totalesPorEspecie, resultadosDescuentos, promediosEspeciesCompra)
        fn_crearTotalesTablaExcelMerma(totalesPorEspecie, promediosEspeciesCompra)
        
        $("#headerReporteAcumuladoExcel").empty();
        $("#headerReporteAcumuladoExcel").html(contenidoHeader);
        $("#headerReporteAcumuladoExcelResumenDelResumen").empty();
        $("#headerReporteAcumuladoExcelResumenDelResumen").html(contenidoHeaderResumenDelResumen);

        let tbodyReporteAcumuladoExcel = $('#bodyReporteAcumuladoExcel');
        tbodyReporteAcumuladoExcel.empty();
        tbodyReporteAcumuladoExcel.html(bodyTablaExcel);
        
        let tbodyReporteAcumuladoExcelResumenDelResumen = $('#bodyReporteAcumuladoExcelResumenDelResumen');
        tbodyReporteAcumuladoExcelResumenDelResumen.empty();
        tbodyReporteAcumuladoExcelResumenDelResumen.html(bodyTablaExcelResumenDelResumen);
        
        let tbodyReporteAcumuladoExcelResumen = $('#bodyReporteAcumuladoExcelResumen');
        tbodyReporteAcumuladoExcelResumen.empty();
        tbodyReporteAcumuladoExcelResumen.html(bodyTablaExcelResumen);

        fn_eliminarTdEspecies(totalesPorEspecie);
        fn_eliminarTdEspecies2(totalesPorEspecie);

        fn_crearTotalesTablaExcel(totalesPorEspecie);

        clearInterval(timerInterval);
        Swal.close();

        $('#filtrarClienteReporteAcumuladoExcel').trigger('input');
        $("#contenedorRecalculandoDatos").removeClass('flex').addClass('hidden');

        ordenarTabla();
    }

    function ordenarTabla() {
        let $tabla = $("#tablaTotalesReporte tbody");
        let $filas = $tabla.find("tr").not(':last').get();
        let $ultimaFila = $tabla.find("tr:last");

        $filas.sort(function(a, b) {
            let valorA = parseFloat($(a).find("td:eq(3)").text().replace('Kg.', '').trim());
            let valorB = parseFloat($(b).find("td:eq(3)").text().replace('Kg.', '').trim());

            return valorB - valorA;
        });

        $tabla.empty();

        // Reinsertar las filas ordenadas
        $.each($filas, function(index, fila) {
            $tabla.append(fila);
        });

        // Reinsertar la última fila
        $tabla.append($ultimaFila);
    }

    function ordenarTablaCompra() {
        $('.filaStockEditEliminar:not(:last-child)').each(function() {
            let $filaActual = $(this);
            let valor = $filaActual.find('td:eq(3)').text().trim();
            if (valor == "0.00"){
                $filaActual.remove();
            }

        })

        let $tabla = $("#tablaTotalesReporteCompra tbody");
        let $filas = $tabla.find("tr").not(':last').get();
        let $ultimaFila = $tabla.find("tr:last");

        $filas.sort(function(a, b) {
            let valorA = parseFloat($(a).find("td:eq(3)").text());
            let valorB = parseFloat($(b).find("td:eq(3)").text());

            return valorB - valorA;
        });

        $tabla.empty();

        // Reinsertar las filas ordenadas
        $.each($filas, function(index, fila) {
            $tabla.append(fila);
        });

        // Reinsertar la última fila
        $tabla.append($ultimaFila);
    }

    function agruparTotalesEspecies(item) {
        let datosTabla = item.datosTabla_tb_pesadasGeneral;
    
        // Inicializar acumuladores
        let totalPeso = 0;
        let totalVenta = 0;
        let totalCantidad = 0;
        let totalPromedioEspecie = 0;
        let totalPrecios = 0;
        let especiesContadas = 0;
    
        // Recorrer cada especie en datosTabla
        for (let especie in datosTabla) {
            let detalles = datosTabla[especie][0];  // Como es un array, tomamos el primer elemento
    
            totalPeso += parseFloat(detalles.totalPeso);
            totalVenta += parseFloat(detalles.totalVenta);
            totalCantidad += detalles.totalCantidad;
            totalPromedioEspecie += parseFloat(detalles.promedioEspecie) * detalles.totalCantidad;
            totalPrecios += parseFloat(detalles.precioPromedio);
            especiesContadas++;
        }
    
        // Sumar totalVentaDescuento y totalPesoDescuento si existen
        if (item.totalDescuentos && item.totalDescuentos.length > 0) {
            item.totalDescuentos.forEach(descuento => {
                totalPeso += parseFloat(descuento.totalPesoDescuento);
                totalVenta += parseFloat(descuento.totalVentaDescuento);
            });
        }
    
        // Calcular el precio promedio global y promedioEspecie global
        let precioPromedioGlobal = especiesContadas ? (totalPrecios / especiesContadas).toFixed(2) : "0.00";
        let promedioEspecieGlobal = totalCantidad ? (totalPromedioEspecie / totalCantidad).toFixed(2) : "0.00";
    
        // Devolver objeto con los totales
        return {
            totalPeso: totalPeso.toFixed(2),
            totalVenta: totalVenta.toFixed(2),
            totalCantidad: totalCantidad,
            precioPromedio: precioPromedioGlobal,
            promedioEspecie: promedioEspecieGlobal
        };
    }

    function fn_crearFilaTablaExcel(item) {

        function fn_buscarValor(obj, especie, valor) {
            return obj && obj[especie] ? obj[especie][0][valor] : 0;
        }

        function fn_buscarValorDecimal(obj, especie, valor) {
            return obj && obj[especie] ? obj[especie][0][valor] : "0.00";
        }

        function fn_buscarValorItem(obj, valor) {
            return obj && obj[0] && obj[0][valor] ? obj[0][valor] : "0.00";
        }

        function fn_buscarValorDecimalTAS(obj, especie, valor) {
            return obj && obj[especie] ? parseFloat(obj[especie][0][valor]) : 0;
        }

        function fn_buscarValorDecimalTASPrecioYPromedio(obj, especie, valor) {
            if (obj && obj[especie] && obj[especie][0] && obj[especie][0][valor]) {
                let valorDecimal = parseFloat(obj[especie][0][valor]);
                return valorDecimal > 0 ? valorDecimal : null;
            }
            return null;
        }

        let precios = [
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie9', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie10', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie11', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie12', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie13', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie15', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie6', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie21', 'precioPromedio')
        ].filter(val => val !== null);

        let sumaPrecios = precios.reduce((total, valor) => total + valor, 0);

        let promedios = [
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie9', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie10', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie11', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie12', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie13', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie15', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie6', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie21', 'promedioEspecie')
        ].filter(val => val !== null);

        let sumaPromedios = promedios.reduce((total, valor) => total + valor, 0);
        
        // Resultados

        let resultadosTotales = agruparTotalesEspecies(item);
        
        let totalCantidadTAS = fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie9', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie10', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie11', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie12', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie13', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie15', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie6', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie21', 'totalCantidad');
        
        let totalPesoTAS = fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie9', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie10', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie11', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie12', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie13', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie15', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie6', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie21', 'totalPeso');
        
        let totalVentaTAS = fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie9', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie10', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie11', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie12', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie13', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie15', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie6', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie21', 'totalVenta');
        
        let precioPromedioTAS = precios.length > 0 ? sumaPrecios / precios.length : 0;
        
        let promedioEspecieTAS = promedios.length > 0 ? sumaPromedios / promedios.length : 0;

        let totalPrecioDescuento = (parseFloat(fn_buscarValorItem(item.totalDescuentos, 'totalVentaDescuento')) / parseFloat(fn_buscarValorItem(item.totalDescuentos, 'totalPesoDescuento')))

        let totalVentaAnterior = ((parseFloat(item.ventaAnterior) + parseFloat(item.ventaAnterior2) + parseFloat(item.ventaAnterior3)) + parseFloat(item.totalVentaDescuentoAnterior)) - parseFloat(item.pagoAnterior);

        let totalSaldoDelDia = totalVentaAnterior + parseFloat(resultadosTotales.totalVenta);

        let totalPagosHoy = parseFloat(fn_buscarValorItem(item.totalPagos, "pagos"));

        let totalNuevoSaldo = totalSaldoDelDia - totalPagosHoy;

        totalSaldoAnteriorSubTotales += totalVentaAnterior;
        totalSaldoActualSubTotales += totalSaldoDelDia;
        totalCobranzaSubTotales += totalPagosHoy;
        totalNuevoSaldoSubTotales += totalNuevoSaldo;
        
        return `
            <tr class="bg-white dark:text-gray-200 text-gray-900 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-left border-y-[1px] border-r-[1px] border-l-2 py-1 px-2 whitespace-nowrap sticky left-0 dark:bg-gray-800 bg-white">${item.nombreCompleto}</td>

                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie1', 'totalCantidad')} </td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie1', 'totalPeso')} Kg.</td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie1', 'precioPromedio')}</td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie1', 'totalVenta')}</td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie1', 'promedioEspecie')}</td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie2 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie2', 'totalCantidad')} </td>
                <td class="especie2 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie2', 'totalPeso')} Kg.</td>
                <td class="especie2 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie2', 'precioPromedio')}</td>
                <td class="especie2 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie2', 'totalVenta')}</td>
                <td class="especie2 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie2', 'promedioEspecie')}</td>
                <td class="especie2 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie17 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie17', 'totalCantidad')} </td>
                <td class="especie17 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie17', 'totalPeso')} Kg.</td>
                <td class="especie17 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie17', 'precioPromedio')}</td>
                <td class="especie17 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie17', 'totalVenta')}</td>
                <td class="especie17 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie17', 'promedioEspecie')}</td>
                <td class="especie17 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie3', 'totalCantidad')} </td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie3', 'totalPeso')} Kg.</td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie3', 'precioPromedio')}</td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie3', 'totalVenta')}</td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie3', 'promedioEspecie')}</td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie4 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie4', 'totalCantidad')} </td>
                <td class="especie4 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie4', 'totalPeso')} Kg.</td>
                <td class="especie4 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie4', 'precioPromedio')}</td>
                <td class="especie4 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie4', 'totalVenta')}</td>
                <td class="especie4 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie4', 'promedioEspecie')}</td>
                <td class="especie4 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie18 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie18', 'totalCantidad')} </td>
                <td class="especie18 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie18', 'totalPeso')} Kg.</td>
                <td class="especie18 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie18', 'precioPromedio')}</td>
                <td class="especie18 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie18', 'totalVenta')}</td>
                <td class="especie18 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie18', 'promedioEspecie')}</td>
                <td class="especie18 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie16', 'totalCantidad')} </td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie16', 'totalPeso')} Kg.</td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie16', 'precioPromedio')}</td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie16', 'totalVenta')}</td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie16', 'promedioEspecie')}</td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie19 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie19', 'totalCantidad')} </td>
                <td class="especie19 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie19', 'totalPeso')} Kg.</td>
                <td class="especie19 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie19', 'precioPromedio')}</td>
                <td class="especie19 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie19', 'totalVenta')}</td>
                <td class="especie19 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie19', 'promedioEspecie')}</td>
                <td class="especie19 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie5', 'totalCantidad')} </td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie5', 'totalPeso')} Kg.</td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie5', 'precioPromedio')}</td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie5', 'totalVenta')}</td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie5', 'promedioEspecie')}</td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie20 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie20', 'totalCantidad')} </td>
                <td class="especie20 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie20', 'totalPeso')} Kg.</td>
                <td class="especie20 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie20', 'precioPromedio')}</td>
                <td class="especie20 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie20', 'totalVenta')}</td>
                <td class="especie20 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie20', 'promedioEspecie')}</td>
                <td class="especie20 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie7', 'totalCantidad')} </td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie7', 'totalPeso')} Kg.</td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie7', 'precioPromedio')}</td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie7', 'totalVenta')}</td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie7', 'promedioEspecie')}</td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie22 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie22', 'totalCantidad')} </td>
                <td class="especie22 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie22', 'totalPeso')} Kg.</td>
                <td class="especie22 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie22', 'precioPromedio')}</td>
                <td class="especie22 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie22', 'totalVenta')}</td>
                <td class="especie22 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie22', 'promedioEspecie')}</td>
                <td class="especie22 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie14', 'totalCantidad')} </td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie14', 'totalPeso')} Kg.</td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie14', 'precioPromedio')}</td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie14', 'totalVenta')}</td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie14', 'promedioEspecie')}</td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie23 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie23', 'totalCantidad')} </td>
                <td class="especie23 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie23', 'totalPeso')} Kg.</td>
                <td class="especie23 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie23', 'precioPromedio')}</td>
                <td class="especie23 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie23', 'totalVenta')}</td>
                <td class="especie23 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie23', 'promedioEspecie')}</td>
                <td class="especie23 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>

                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie8', 'totalCantidad')} </td>
                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie8', 'totalPeso')} Kg.</td>
                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie8', 'precioPromedio')}</td>
                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie8', 'totalVenta')}</td>
                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie8', 'promedioEspecie')}</td>
                
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidadTAS} </td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalPesoTAS.toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${precioPromedioTAS.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVentaTAS.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${promedioEspecieTAS.toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${parseFloat(fn_buscarValorItem(item.totalDescuentos, 'totalPesoDescuento')).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioDescuento ? totalPrecioDescuento : 0).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${parseFloat(fn_buscarValorItem(item.totalDescuentos, 'totalVentaDescuento')).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${resultadosTotales.totalCantidad}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${resultadosTotales.totalPeso} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${resultadosTotales.totalVenta}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${totalVentaAnterior.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${totalSaldoDelDia.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${totalPagosHoy.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap font-bold">S/. ${totalNuevoSaldo.toFixed(2)}</td>
                <td class="text-center border-y-[1px] border-l-[1px] border-r-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${item.limitEndeudamiento}</td>
                <td class="text-center border-y-[1px] border-l-[1px] border-r-2 py-1 px-2 whitespace-nowrap">${item.nombreCompleto}</td>
            </tr>
        `
    }

    function agruparTotalTotalesEspecies(item) {
        let datosTabla = item;
        
        // Inicializar acumuladores
        let totalPeso = 0;
        let totalVenta = 0;
        let totalCantidad = 0;
        let totalPromedioEspecie = 0;
        let totalPrecios = 0;
        let especiesContadas = 0;
    
        // Recorrer cada especie en datosTabla
        for (let especie in datosTabla) {
            let detalles = datosTabla[especie];
    
            totalPeso += parseFloat(detalles.totalPeso);
            totalVenta += parseFloat(detalles.totalVenta);
            totalCantidad += detalles.totalCantidad;
            totalPromedioEspecie += parseFloat(detalles.promedioEspecie) * detalles.totalCantidad;
            totalPrecios += parseFloat(detalles.precioPromedio);
            especiesContadas++;
        }
    
        // Calcular el precio promedio global y promedioEspecie global
        let precioPromedioGlobal = especiesContadas ? (totalPrecios / especiesContadas).toFixed(2) : "0.00";
        let promedioEspecieGlobal = totalCantidad ? (totalPromedioEspecie / totalCantidad).toFixed(2) : "0.00";
    
        // Devolver objeto con los totales
        return {
            totalPeso: totalPeso.toFixed(2),
            totalVenta: totalVenta.toFixed(2),
            totalCantidad: totalCantidad,
            precioPromedio: precioPromedioGlobal,
            promedioEspecie: promedioEspecieGlobal
        };
    }

    function fn_crearFilaTotalTablaExcel(totalesPorEspecie, resultadosDescuentos, promediosEspeciesCompra) {

        function fn_buscarValor(obj, especie, valor) {
            return obj[especie] ? obj[especie][valor] : 0;
        }

        function fn_buscarValorDecimal(obj, especie, valor) {
            return obj[especie] ? obj[especie][valor] : "0.00";
        }

        function fn_buscarValorDecimalTAS(obj, especie, valor) {
            return obj && obj[especie] ? parseFloat(obj[especie][valor]) : 0;
        }

        // Resultados

        let totalDeTotales = agruparTotalTotalesEspecies(totalesPorEspecie);

        let totalCantidadTAS = fn_buscarValor(totalesPorEspecie, 'especie9', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie10', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie11', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie12', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie13', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie15', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie6', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie21', 'totalCantidad');
        
        let totalPesoTAS = fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie9', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie10', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie11', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie12', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie13', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie15', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie6', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie21', 'totalPeso');
        
        let totalVentaTAS = fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie9', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie10', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie11', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie12', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie13', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie15', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie6', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie21', 'totalVenta');

        let totalPrecioDescuento = (resultadosDescuentos.totalVentaDescuento ? resultadosDescuentos.totalVentaDescuento : 0) / (resultadosDescuentos.totalPesoDescuento ? resultadosDescuentos.totalPesoDescuento : 0);

        let totalPesoFila = parseFloat(totalDeTotales.totalPeso) + parseFloat(resultadosDescuentos.totalPesoDescuento ? resultadosDescuentos.totalPesoDescuento : 0);

        let totalVentaFila = parseFloat(totalDeTotales.totalVenta) + parseFloat(resultadosDescuentos.totalVentaDescuento ? resultadosDescuentos.totalVentaDescuento : 0);
        
        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 sticky bottom-0">
                <td class="text-left font-bold text-sm border-t-2 border-r-[1px] border-l-2 border-b-2 py-1 px-2 text-white bg-blue-600 whitespace-nowrap sticky left-0">TOTAL</td>

                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie1', 'totalCantidad')}</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie1', 'totalPeso')} Kg.</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie1', 'precioPromedio')}</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie1', 'totalVenta')}</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie1', 'promedioEspecie')}</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.yugo}</td>
                
                <td class="especie2 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie2', 'totalCantidad')}</td>
                <td class="especie2 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie2', 'totalPeso')} Kg.</td>
                <td class="especie2 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie2', 'precioPromedio')}</td>
                <td class="especie2 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie2', 'totalVenta')}</td>
                <td class="especie2 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie2', 'promedioEspecie')}</td>
                <td class="especie2 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.yugo}</td>
                
                <td class="especie17 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie17', 'totalCantidad')}</td>
                <td class="especie17 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie17', 'totalPeso')} Kg.</td>
                <td class="especie17 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie17', 'precioPromedio')}</td>
                <td class="especie17 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie17', 'totalVenta')}</td>
                <td class="especie17 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie17', 'promedioEspecie')}</td>
                <td class="especie17 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.yugo}</td>
                
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie3', 'totalCantidad')}</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie3', 'totalPeso')} Kg.</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie3', 'precioPromedio')}</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie3', 'totalVenta')}</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie3', 'promedioEspecie')}</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.tecnica}</td>
                
                <td class="especie4 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie4', 'totalCantidad')}</td>
                <td class="especie4 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie4', 'totalPeso')} Kg.</td>
                <td class="especie4 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie4', 'precioPromedio')}</td>
                <td class="especie4 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie4', 'totalVenta')}</td>
                <td class="especie4 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie4', 'promedioEspecie')}</td>
                <td class="especie4 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.tecnica}</td>
                
                <td class="especie18 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie18', 'totalCantidad')}</td>
                <td class="especie18 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie18', 'totalPeso')} Kg.</td>
                <td class="especie18 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie18', 'precioPromedio')}</td>
                <td class="especie18 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie18', 'totalVenta')}</td>
                <td class="especie18 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie18', 'promedioEspecie')}</td>
                <td class="especie18 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.tecnica}</td>
                
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie16', 'totalCantidad')}</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie16', 'totalPeso')} Kg.</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie16', 'precioPromedio')}</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie16', 'totalVenta')}</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie16', 'promedioEspecie')}</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.xx}</td>
                
                <td class="especie19 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie19', 'totalCantidad')}</td>
                <td class="especie19 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie19', 'totalPeso')} Kg.</td>
                <td class="especie19 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie19', 'precioPromedio')}</td>
                <td class="especie19 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie19', 'totalVenta')}</td>
                <td class="especie19 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie19', 'promedioEspecie')}</td>
                <td class="especie19 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.xx}</td>
                
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie5', 'totalCantidad')}</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie5', 'totalPeso')} Kg.</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie5', 'precioPromedio')}</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie5', 'totalVenta')}</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie5', 'promedioEspecie')}</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.gallinaDoble}</td>
                
                <td class="especie20 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie20', 'totalCantidad')}</td>
                <td class="especie20 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie20', 'totalPeso')} Kg.</td>
                <td class="especie20 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie20', 'precioPromedio')}</td>
                <td class="especie20 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie20', 'totalVenta')}</td>
                <td class="especie20 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie20', 'promedioEspecie')}</td>
                <td class="especie20 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.gallinaDoble}</td>
                
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie7', 'totalCantidad')}</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie7', 'totalPeso')} Kg.</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie7', 'precioPromedio')}</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie7', 'totalVenta')}</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie7', 'promedioEspecie')}</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.gallo}</td>
                
                <td class="especie22 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie22', 'totalCantidad')}</td>
                <td class="especie22 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie22', 'totalPeso')} Kg.</td>
                <td class="especie22 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie22', 'precioPromedio')}</td>
                <td class="especie22 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie22', 'totalVenta')}</td>
                <td class="especie22 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie22', 'promedioEspecie')}</td>
                <td class="especie22 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.gallo}</td>
                
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie14', 'totalCantidad')}</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie14', 'totalPeso')} Kg.</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie14', 'precioPromedio')}</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie14', 'totalVenta')}</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie14', 'promedioEspecie')}</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.gallinaChica}</td>
                
                <td class="especie23 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie23', 'totalCantidad')}</td>
                <td class="especie23 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie23', 'totalPeso')} Kg.</td>
                <td class="especie23 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie23', 'precioPromedio')}</td>
                <td class="especie23 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie23', 'totalVenta')}</td>
                <td class="especie23 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_buscarValorDecimal(totalesPorEspecie, 'especie23', 'promedioEspecie')}</td>
                <td class="especie23 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.gallinaChica}</td>

                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie8', 'totalCantidad')}</td>
                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'totalPeso')} Kg.</td>
                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'precioPromedio')}</td>
                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'totalVenta')}</td>
                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'promedioEspecie')}</td>
                
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${totalCantidadTAS}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${totalPesoTAS.toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${"S/N"}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalVentaTAS.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${"S/N"}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(resultadosDescuentos.totalPesoDescuento ? resultadosDescuentos.totalPesoDescuento : 0).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioDescuento ? totalPrecioDescuento : 0).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${(resultadosDescuentos.totalVentaDescuento ? resultadosDescuentos.totalVentaDescuento : 0).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${totalDeTotales.totalCantidad}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${totalPesoFila.toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${totalVentaFila.toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalSaldoAnteriorSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalSaldoActualSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalCobranzaSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-bold">S/. ${totalNuevoSaldoSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-bold bg-red-600">&nbsp;</td>
                <td class="text-center border-t-2 border-l-[1px] border-r-2 border-b-2 py-1 px-2 whitespace-nowrap font-bold bg-blue-600">&nbsp;</td>
            </tr>
        `;
    }

    function fn_crearTotalesTablaExcel(totalesPorEspecie) {

        function fn_buscarValor(obj, especie, valor) {
            return obj[especie] ? obj[especie][valor] : 0;
        }

        function fn_buscarValorDecimal(obj, especie, valor) {
            return obj[especie] ? obj[especie][valor] : "0.00";
        }

        function fn_buscarValorDecimalT(obj, especie, valor) {
            return obj && obj[especie] ? parseFloat(obj[especie][valor]) : 0;
        }

        function fn_buscarValorDecimalTASM(obj, especie, valor) {
            return obj && obj[especie] ? parseFloat(obj[especie][valor]) : 0;
        }

        // Resultados

        let totalDeTotales = agruparTotalTotalesEspecies(totalesPorEspecie);

        let totalCantidadTASM = fn_buscarValor(totalesPorEspecie, 'especie9', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie10', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie11', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie12', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie13', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie15', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie6', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie21', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie8', 'totalCantidad');
        
        let totalPesoTASM = fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie9', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie10', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie11', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie12', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie13', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie15', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie6', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie21', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie8', 'totalPeso');
        
        let totalVentaTASM = fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie9', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie10', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie11', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie12', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie13', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie15', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie6', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie21', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie8', 'totalVenta');

        let totalCantidadT = fn_buscarValor(totalesPorEspecie, 'especie9', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie10', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie11', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie12', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie13', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie15', 'totalCantidad');
        
        let totalPesoT = fn_buscarValorDecimalT(totalesPorEspecie, 'especie9', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie10', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie11', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie12', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie13', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie15', 'totalPeso');
        
        let totalVentaT = fn_buscarValorDecimalT(totalesPorEspecie, 'especie9', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie10', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie11', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie12', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie13', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie15', 'totalVenta');

        let totalPesoFila = parseFloat(totalDeTotales.totalPeso);

        let totalVentaFila = parseFloat(totalDeTotales.totalVenta);

        function fn_calculaPromedio(especie){
            let valor = (fn_buscarValor(totalesPorEspecie, especie, 'totalPeso') / fn_buscarValor(totalesPorEspecie, especie, 'totalCantidad')) ? (fn_buscarValor(totalesPorEspecie, especie, 'totalPeso') / fn_buscarValor(totalesPorEspecie, especie, 'totalCantidad')) : 0;
            return valor.toFixed(2);
        }

        let tbodyTotales = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">YUGO VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie1', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie1')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie1', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie1', 'totalVenta')}</td> 
            </tr>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">YUGO PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie2', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie2')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie2', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie2', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">BRASA YUGO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie17', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie17')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie17', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie17', 'totalVenta')}</td>
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TECNICA VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie3', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie3')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie3', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie3', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TECNICA PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie4', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie4')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie4', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie4', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">BRASA TECNICA</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie18', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie18')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie18', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie18', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO XX PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie16', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie16')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie16', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie16', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO XX VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie19', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie19')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie19', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie19', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA DOBLE PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie5', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie5')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie5', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie5', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA DOBLE VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie20', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie20')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie20', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie20', 'totalVenta')}</td> 
            </tr>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLO PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie7', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie7')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie7', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie7', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLO VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie22', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie22')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie22', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie22', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO MUTILADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie8', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie8')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA CHICA PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie14', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie14')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie14', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie14', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA CHICA VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie23', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie23')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie23', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie23', 'totalVenta')}</td> 
            </tr>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">SECOS</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie21', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie21')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie21', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie21', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">AHOGADOS</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie6', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie6')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie6', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie6', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TROZADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidadT}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPesoT / totalCantidadT) != Infinity ? (totalPesoT / totalCantidadT).toFixed(2) : "0.00"}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${totalPesoT.toFixed(2)} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${totalVentaT.toFixed(2)}</td>
            </tr>

            <tr class="bg-blue-600 border-b dark:border-gray-700 text-gray-200">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap font-bold">TOTAL :</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">${fn_formatearCantidades(totalDeTotales.totalCantidad)}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold"></td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">${fn_formatearImportes(totalPesoFila)} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${fn_formatearImportes(totalVentaFila)}</td>
            </tr>
        `;

        let tbodyReporteAcumuladoExcelTotales = $('#bodyReporteAcumuladoExcelTotales');
        tbodyReporteAcumuladoExcelTotales.empty();
        tbodyReporteAcumuladoExcelTotales.html(tbodyTotales);

        let tbodyTotalesTrozados = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 dblclickDetalle">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO MUTILADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie8', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie8')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'totalVenta')}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap hidden">8</td> 
            </tr>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 dblclickDetalle">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">SECOS</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie21', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie21')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie21', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie21', 'totalVenta')}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap hidden">21</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 dblclickDetalle">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">AHOGADOS</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie6', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie6')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie6', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie6', 'totalVenta')}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap hidden">6</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 tdMostrarTrozado">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TROZADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${totalCantidadT}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPesoT / totalCantidadT) != Infinity ? (totalPesoT / totalCantidadT).toFixed(2) : "0.00"}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${totalPesoT.toFixed(2)} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${totalVentaT.toFixed(2)}</td>
            </tr>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i> PECHUGA</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie10', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap"></td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie10', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie10', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
                <td class="text-sm text-left border-2 w-full py-1 px-2 whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i> PIERNA</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie11', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap"></td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie11', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie11', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
                <td class="text-sm text-left border-2 w-full py-1 px-2 whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i> ALAS</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie12', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap"></td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie12', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie12', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
                <td class="text-sm text-left border-2 w-full py-1 px-2 whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i> MENUDENCIA</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie13', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap"></td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie13', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie13', 'totalVenta')}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
                <td class="text-sm text-left border-2 w-full py-1 px-2 whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i> OTROS</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie15', 'totalCantidad')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap"></td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie15', 'totalPeso')} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie15', 'totalVenta')}</td> 
            </tr>

            <tr class="bg-blue-600 border-b dark:border-gray-700 text-gray-200">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap font-bold">TOTAL :</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">${totalCantidadTASM}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold"></td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">${totalPesoTASM.toFixed(2)} Kg.</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${totalVentaTASM.toFixed(2)}</td>
            </tr>
        `;

        let tbodyReporteAcumuladoExcelTotalesTrozado = $('#bodyReporteAcumuladoExcelTotalesTrozado');
        tbodyReporteAcumuladoExcelTotalesTrozado.empty();
        tbodyReporteAcumuladoExcelTotalesTrozado.html(tbodyTotalesTrozados);
    }

    function fn_eliminarTdEspecies(totalesPorEspecie) {
        function fn_buscarValor(obj, especie, valor1, valor2, valor3) {
            if (obj[especie]) {
                var cantidad = parseInt(obj[especie][valor1], 10);
                var peso = parseFloat(obj[especie][valor2]);
                var venta = parseFloat(obj[especie][valor3]);
    
                // Verificar si todos los valores son cero
                if (cantidad === 0 && peso === 0 && venta === 0) {
                    $(`#tablaReporteAcumuladoExcel .${especie}`).remove();
                }
            }else{
                $(`#tablaReporteAcumuladoExcel .${especie}`).remove();
            }
        }

        fn_buscarValor(totalesPorEspecie, 'especie1', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie2', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie3', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie4', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie5', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie6', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie7', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie8', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie9', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie10', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie11', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie12', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie13', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie14', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie15', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie16', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie17', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie18', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie19', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie20', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie21', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie22', 'totalCantidad', 'totalPeso', 'totalVenta')
        fn_buscarValor(totalesPorEspecie, 'especie23', 'totalCantidad', 'totalPeso', 'totalVenta')
    }

    function fn_eliminarTdEspecies2(totalesPorEspecie) {
        function fn_buscarValor(obj, especies, valores) {
            // Recorre el array de especies que deben ser verificadas juntas
            especies.forEach((especie, index) => {
                if (obj[especie]) {
                    var cantidad = parseInt(obj[especie][valores[0]], 10);
                    var peso = parseFloat(obj[especie][valores[1]]);
                    var venta = parseFloat(obj[especie][valores[2]]);
    
                    // Verificar si todos los valores son cero
                    if (cantidad === 0 && peso === 0 && venta === 0) {
                        $(`#tablaReporteAcumuladoExcelResumenDelResumen .${especie}`).remove();
                    }
                } else {
                    $(`#tablaReporteAcumuladoExcelResumenDelResumen .${especie}`).remove();
                }
            });
        }
    
        // Grupos de especies a verificar
        fn_buscarValor(totalesPorEspecie, ['especie1', 'especie2', 'especie17'], ['totalCantidad', 'totalPeso', 'totalVenta']);
        fn_buscarValor(totalesPorEspecie, ['especie3', 'especie4', 'especie18'], ['totalCantidad', 'totalPeso', 'totalVenta']);
        fn_buscarValor(totalesPorEspecie, ['especie16', 'especie19'], ['totalCantidad', 'totalPeso', 'totalVenta']);
        fn_buscarValor(totalesPorEspecie, ['especie5', 'especie20'], ['totalCantidad', 'totalPeso', 'totalVenta']);
        fn_buscarValor(totalesPorEspecie, ['especie7', 'especie21'], ['totalCantidad', 'totalPeso', 'totalVenta']);
        fn_buscarValor(totalesPorEspecie, ['especie14', 'especie23'], ['totalCantidad', 'totalPeso', 'totalVenta']);
        fn_buscarValor(totalesPorEspecie, ['especie8'], ['totalCantidad', 'totalPeso', 'totalVenta']);
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
    
    // Insertar la fecha formateada en el elemento con id fechaReporteExcel
    $("#fechaReporteExcelTitle").text(fechaFormateada);
    $("#fechaReporteExcelTitle2").text(fechaFormateada);

    $('#filtrarReporteAcumuladoDesdeHastaExcel').on('click', function () {
        let fechaEnviarTexto = $('#fechaReporteExcel').val();
        // Dividir la cadena de texto para extraer el año, mes y día
        let [año, mes, dia] = fechaEnviarTexto.split("-");
        // Crear un nuevo objeto Date con el formato esperado
        let fechaEnviar = new Date(año, mes - 1, dia); // El mes se resta en 1 porque en JavaScript los meses van de 0 a 11
    
        // Verificar si la fecha es válida antes de continuar
        if (isNaN(fechaEnviar.getTime())) {
            console.error("Fecha inválida");
            return;
        }
        
        $('#filtrarClienteReporteAcumuladoExcel').val('');
        
        let fechaFormateadaClick = formatearFecha(fechaEnviar);
        $("#fechaReporteExcelTitle").text(fechaFormateadaClick);
        $("#fechaReporteExcelTitle2").text(fechaFormateadaClick);

        Swal.fire({
            title: '¡Consultando datos!',
            html: 'Espere mientras se están consultando los datos.',
            timer: 999999999,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        })
        fn_TraerReporteAcumuladoDetalle(fechaEnviarTexto);
    });

    $('#filtrarClienteReporteAcumuladoExcel').on('input', function() {
        let nombreFiltrar = $('#filtrarClienteReporteAcumuladoExcel').val().toUpperCase(); // Obtiene el valor del campo de filtro

        // Mostrar todas las filas
        $('#tablaReporteAcumuladoExcel tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaReporteAcumuladoExcel tbody tr').each(function() {
                let nombre = $(this).find('td:eq(0)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }

        // Mostrar la última fila independientemente del filtro
        $('#bodyReporteDePagos tr:last').show();
        // Mostrar la penúltima fila independientemente del filtro
        $('#bodyReporteDePagos tr:eq(-2)').show();
        $('#bodyReporteDePagos tr:eq(-3)').show();
    });

    $(document).on("click", "#tablaReporteAcumuladoExcel tbody tr", function() {

        $('#tablaReporteAcumuladoExcel tbody tr').each(function() {
            $(this).addClass('bg-white dark:bg-gray-800');
            $(this).removeClass('bg-gray-300 dark:bg-gray-600');
        });

        let fila = $(this).closest("tr")
        fila.removeClass('bg-white dark:bg-gray-800');
        fila.addClass('bg-gray-300 dark:bg-gray-600');
    });

    $(document).on("click", "#tablaReporteAcumuladoExcelResumenDelResumen tbody tr", function() {

        $('#tablaReporteAcumuladoExcelResumenDelResumen tbody tr').each(function() {
            $(this).addClass('bg-white dark:bg-gray-800');
            $(this).removeClass('bg-gray-300 dark:bg-gray-600');
        });

        let fila = $(this).closest("tr")
        fila.removeClass('bg-white dark:bg-gray-800');
        fila.addClass('bg-gray-300 dark:bg-gray-600');
    });

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

        let fechaBuscaCuenta = $('#fechaReporteExcel').val();
        $('#fechaCambiarPrecioPesada').val(fechaBuscaCuenta);
    });

    $('.cerrarModalCambiarPrecioPesada, #ModalCambiarPrecioPesada .opacity-75').on('click', function (e) {
        $('#ModalCambiarPrecioPesada').addClass('hidden');
        $('#ModalCambiarPrecioPesada').removeClass('flex');
    });

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
            $('#contenedorDeClientes2').addClass('hidden');
            selectedIndex = -1;
        }
    });

    $('.cerrarModalTrozadoModal, #ModalTrozadoModal .opacity-75').on('click', function (e) {
        $('#ModalTrozadoModal').addClass('hidden');
        $('#ModalTrozadoModal').removeClass('flex');
    });

    $(document).on('click', "#filtrarDetalleTrozado", function (event) {
        let fecha = $("#fechaReporteExcel").val();
        $("#captionModal").html("TROZADO");
        fn_TraerModalDetallesTrozado(fecha);
    });

    function fn_TraerModalDetallesTrozado (fecha){
        $.ajax({
            url: '/fn_consulta_TraerDetallesTrozado',
            method: 'GET',
            data: {
                fecha: fecha,
            },
            success: function(response) {
                if (Array.isArray(response) && response.length > 0) {
                    let contenedorDetallesTrozado = $('#bodyTrozadoModal');
                    contenedorDetallesTrozado.empty();

                    let totalCantidad = 0;
                    let totalPesoBruto = 0;
                    let totalPesoJabas = 0;
                    let totalPesoNeto = 0;

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {

                        let pesoBruto = obj.pesoNetoPes
                        let pesoTara = obj.pesoNetoJabas

                        let pesoNeto = 0;

                        if(pesoBruto > 0){
                            pesoNeto = pesoBruto - pesoTara;
                        }else{
                            pesoNeto = pesoBruto + pesoTara;
                        }

                        totalPesoNeto += parseFloat(pesoNeto);
                        totalCantidad += parseInt(obj.cantidadPes);
                        totalPesoJabas += parseFloat(obj.pesoNetoPes)
                        totalPesoBruto += parseFloat(obj.pesoNetoJabas) 

                        // Crear una nueva fila
                        let nuevaFila = `
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.idPesada}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.fechaRegistroPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.horaPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.nombreCompleto} ${obj.observacionPes ? `(${obj.observacionPes})` : ""}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.nombreEspecie}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.cantidadPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.pesoNetoPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.pesoNetoJabas}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${parseFloat(pesoNeto).toFixed(2)}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.precioPes}</td>
                            </tr>
                        `;
                        
                        // Agregar la nueva tabla al tbody
                        contenedorDetallesTrozado.append(nuevaFila);
                    });

                    let nuevaFila = `
                        <tr class="bg-blue-600 border-b dark:border-gray-700 text-white cursor-pointer font-bold">
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden"></td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">TOTAL</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalCantidad}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalPesoBruto.toFixed(2)}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalPesoJabas.toFixed(2)}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalPesoNeto.toFixed(2)}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                        </tr>
                    `;
                    
                    // Agregar la nueva tabla al tbody
                    contenedorDetallesTrozado.append(nuevaFila);
                    $('#ModalTrozadoModal').addClass('flex');
                    $('#ModalTrozadoModal').removeClass('hidden');
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se encontraron resultados para la fecha seleccionada',
                    })
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

    $(document).on("click", ".tdMostrarTrozado", function() {
        $(".trozadoOculto").each(function() {
            if ($(this).is(":visible")) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
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
                    $("#contenedorRecalculandoDatos").removeClass('hidden').addClass('flex');
                    $('#codigoClienteSeleccionado2').val(0);
                    $('#especiesCambioPrecioPesadas').val(0);
                    $('#nuevoPrecioCambiarPesadas').val("");
                    $('#idCambiarPrecioPesadaCliente').val("");
                    $('#ModalCambiarPrecioPesada').addClass('hidden');
                    $('#ModalCambiarPrecioPesada').removeClass('flex');
                    let fechaEnviarTexto = $('#fechaReporteExcel').val();
                    fn_TraerReporteAcumuladoDetalle(fechaEnviarTexto);
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
                if(fechaCambioPrecio == fechaHoy){
                    const ahoraEnNY = new Date(); // Suponiendo que quieres la hora actual en tu zona horaria
                    const fechaHoy = ahoraEnNY.toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
                    const horaHoy = ahoraEnNY.toTimeString().split(' ')[0];
                    let ultimaActualizacionUsuario = `${usuarioRegistroCli} ${usuarioRegistroCliNombre} ${fechaHoy} ${horaHoy}`;
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

    function fn_consultarDatosProveedores(fechaHoy){
        $.ajax({
            url: '/fn_consulta_ConsultarProveedor',
            method: 'GET',
            data: {
                fechaDesde: fechaHoy,
                fechaHasta: fechaHoy,
            },
            success: function(response) {
                if (Array.isArray(response)) {

                    $("#bodycantidadesPollosCalculo").empty();

                    var totalVentaCompra = 0
                    var totalPesoCompra = 0
                    var totalCantidadCompra = 0

                    response.forEach(function(obj) {
                        let pesoNeto = parseFloat(obj.pesoBrutoGuia) - parseFloat(obj.pesoTaraGuia);
                        let promedio = pesoNeto / parseInt(obj.cantidadGuia)
                        let precioGuia = obj.precioGuia ? parseFloat(obj.precioGuia) : 0;
                        let totalVenta = pesoNeto * precioGuia;

                        totalCantidadCompra += parseInt(obj.cantidadGuia)
                        totalPesoCompra += pesoNeto
                        totalVentaCompra += totalVenta

                        let result = `
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                <td class="text-sm uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">${obj.nombreEspecieCompra}</td>
                                <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${obj.cantidadGuia}</td>
                                <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${promedio.toFixed(2)}</td>

                                <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${pesoNeto.toFixed(2)}</td>
                                <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${precioGuia.toFixed(2)}</td>
                                <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalVenta.toFixed(2)}</td>
                            </tr>
                        `;

                        $("#bodycantidadesPollosCalculo").append(result);
                    });

                    $.ajax({
                        url: '/fn_consulta_TraerStock',
                        method: 'GET',
                        data: {
                            fecha: fechaHoy
                        },
                        success: function (response) {
                            if (Array.isArray(response)) {
        
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

                                let stockTecnicaPrecio = 0;
                                let stockYugoPrecio = 0;
                                let stockPolloXXPrecio = 0;
                                let stockGalloPrecio = 0;
                                let stockGallinaDoblePrecio = 0;
                                let stockGallinaChicaPrecio = 0;
        
                                response.forEach(function (obj) {
                                    totalCantidadCompra += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                    totalPesoCompra += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                    totalVentaCompra += (parseFloat(obj.precio_stock) ? parseFloat(obj.precio_stock) : 0) * (parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0);
                                    if(obj.nombreEspecie == "STOCK DE TECNICA"){
                                        stockTecnicaCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                        stockTecnicaPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                        stockTecnicaPrecio += (parseFloat(obj.precio_stock) ? parseFloat(obj.precio_stock) : 0) * (parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0);
                                    }else if(obj.nombreEspecie == "STOCK DE YUGO"){
                                        stockYugoCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                        stockYugoPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                        stockYugoPrecio += (parseFloat(obj.precio_stock) ? parseFloat(obj.precio_stock) : 0) * (parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0);
                                    }else if(obj.nombreEspecie == "STOCK XX"){
                                        stockPolloXXCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                        stockPolloXXPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                        stockPolloXXPrecio += (parseFloat(obj.precio_stock) ? parseFloat(obj.precio_stock) : 0) * (parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0);
                                    }else if(obj.nombreEspecie == "STOCK GALLO"){
                                        stockGalloCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                        stockGalloPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                        stockGalloPrecio += (parseFloat(obj.precio_stock) ? parseFloat(obj.precio_stock) : 0) * (parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0);
                                    }else if(obj.nombreEspecie == "STOCK GALLINA DOBLE"){
                                        stockGallinaDobleCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                        stockGallinaDoblePeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                        stockGallinaDoblePrecio += (parseFloat(obj.precio_stock) ? parseFloat(obj.precio_stock) : 0) * (parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0);
                                    }else if(obj.nombreEspecie == "STOCK GALLINA CHICA"){
                                        stockGallinaChicaCantidad += parseFloat(obj.cantidad_stock) ? parseFloat(obj.cantidad_stock) : 0;
                                        stockGallinaChicaPeso += parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0;
                                        stockGallinaChicaPrecio += (parseFloat(obj.precio_stock) ? parseFloat(obj.precio_stock) : 0) * (parseFloat(obj.peso_stock) ? parseFloat(obj.peso_stock) : 0);
                                    }
                                });

                                let result = `
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 filaStockEditEliminar">
                                        <td class="text-sm uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Stock Yugo</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockYugoCantidad}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockYugoPeso) / parseInt(stockYugoCantidad)).toFixed(2)}</td>

                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockYugoPeso).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockYugoPrecio) / parseFloat(stockYugoPeso)).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockYugoPrecio).toFixed(2)}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 filaStockEditEliminar">
                                        <td class="text-sm uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Stock Tecnica</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockTecnicaCantidad}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockTecnicaPeso) / parseInt(stockTecnicaCantidad)).toFixed(2)}</td>

                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockTecnicaPeso).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockTecnicaPrecio) / parseFloat(stockTecnicaPeso)).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockTecnicaPrecio).toFixed(2)}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 filaStockEditEliminar">
                                        <td class="text-sm uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Stock XX</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockPolloXXCantidad}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockPolloXXPeso) / parseInt(stockPolloXXCantidad)).toFixed(2)}</td>

                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockPolloXXPeso).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockPolloXXPrecio) / parseFloat(stockPolloXXPeso)).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockPolloXXPrecio).toFixed(2)}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 filaStockEditEliminar">
                                        <td class="text-sm uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Stock Gallo</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGalloCantidad}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockGalloPeso) / parseInt(stockGalloCantidad)).toFixed(2)}</td>

                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockGalloPeso).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockGalloPrecio) / parseFloat(stockGalloPeso)).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockGalloPrecio).toFixed(2)}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 filaStockEditEliminar">
                                        <td class="text-sm uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Stock Gallina Doble</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGallinaDobleCantidad}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockGallinaDoblePeso) / parseInt(stockGallinaDobleCantidad)).toFixed(2)}</td>

                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockGallinaDoblePeso).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockGallinaDoblePrecio) / parseFloat(stockGallinaDoblePeso)).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockGallinaDoblePrecio).toFixed(2)}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 filaStockEditEliminar">
                                        <td class="text-sm uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Stock Gallina Chica</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGallinaChicaCantidad}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockGallinaChicaPeso) / parseInt(stockGallinaChicaCantidad)).toFixed(2)}</td>

                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockGallinaChicaPeso).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(stockGallinaChicaPrecio) / parseFloat(stockGallinaChicaPeso)).toFixed(2)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseFloat(stockGallinaChicaPrecio).toFixed(2)}</td>
                                    </tr>
                                    <tr class="bg-red-600 uppercase border-b dark:border-gray-700 text-gray-200">
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 text-white whitespace-nowrap">Totales</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearCantidades(totalCantidadCompra)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>

                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${fn_formatearImportes(totalPesoCompra)}</td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>
                                        <td class="text-sm font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">S/. ${fn_formatearImportes(totalVentaCompra)}</td>
                                    </tr>
                                `;
                                
                                $("#bodycantidadesPollosCalculo").append(result);
                                ordenarTablaCompra();
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
    }

    $(document).on("dblclick", "tr.dblclickDetalle", function() {
        let fila = $(this).closest('tr');
        let especie = fila.find('td:eq(5)').text();
        let nombre = fila.find('td:eq(0)').text();
        let fecha = $("#fechaReporteExcel").val();

        $("#captionModal").html(nombre);

        fn_TraerModalDetalles(fecha, especie);
    });

    function fn_TraerModalDetalles (fecha, especie){
        $.ajax({
            url: '/fn_consulta_TraerDetalles',
            method: 'GET',
            data: {
                fecha: fecha,
                especie: especie,
            },
            success: function(response) {
                if (Array.isArray(response) && response.length > 0) {
                    let contenedorDetallesTrozado = $('#bodyTrozadoModal');
                    contenedorDetallesTrozado.empty();

                    let totalCantidad = 0;
                    let totalPesoBruto = 0;
                    let totalPesoJabas = 0;
                    let totalPesoNeto = 0;

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {

                        let pesoBruto = obj.pesoNetoPes
                        let pesoTara = obj.pesoNetoJabas

                        let pesoNeto = 0;

                        if(pesoBruto > 0){
                            pesoNeto = pesoBruto - pesoTara;
                        }else{
                            pesoNeto = pesoBruto + pesoTara;
                        }

                        totalPesoNeto += parseFloat(pesoNeto);
                        totalCantidad += parseInt(obj.cantidadPes);
                        totalPesoJabas += parseFloat(obj.pesoNetoPes)
                        totalPesoBruto += parseFloat(obj.pesoNetoJabas) 

                        // Crear una nueva fila
                        let nuevaFila = `
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.idPesada}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.fechaRegistroPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.horaPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.nombreCompleto} ${obj.observacionPes ? `(${obj.observacionPes})` : ""}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.nombreEspecie}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.cantidadPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.pesoNetoPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.pesoNetoJabas}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${parseFloat(pesoNeto).toFixed(2)}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.precioPes}</td>
                            </tr>
                        `;
                        
                        // Agregar la nueva tabla al tbody
                        contenedorDetallesTrozado.append(nuevaFila);
                    });

                    let nuevaFila = `
                        <tr class="bg-blue-600 border-b dark:border-gray-700 text-white cursor-pointer font-bold">
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden"></td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">TOTAL</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalCantidad}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalPesoBruto.toFixed(2)}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalPesoJabas.toFixed(2)}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalPesoNeto.toFixed(2)}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap"></td>
                        </tr>
                    `;
                    
                    // Agregar la nueva tabla al tbody
                    contenedorDetallesTrozado.append(nuevaFila);
                    $('#ModalTrozadoModal').addClass('flex');
                    $('#ModalTrozadoModal').removeClass('hidden');
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se encontraron resultados para la fecha seleccionada',
                    })
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

    function fn_crearFilaTablaExcelResumen(item) {

        function fn_buscarValorItem(obj, valor) {
            return obj && obj[0] && obj[0][valor] ? obj[0][valor] : "0.00";
        }
        
        // Resultados

        let resultadosTotales = agruparTotalesEspecies(item);

        let totalVentaAnterior = ((parseFloat(item.ventaAnterior) + parseFloat(item.ventaAnterior2) + parseFloat(item.ventaAnterior3)) + parseFloat(item.totalVentaDescuentoAnterior)) - parseFloat(item.pagoAnterior);

        let totalSaldoDelDia = totalVentaAnterior + parseFloat(resultadosTotales.totalVenta);

        let totalPagosHoy = parseFloat(fn_buscarValorItem(item.totalPagos, "pagos"));

        let totalNuevoSaldo = totalSaldoDelDia - totalPagosHoy;

        let ventaDeHOy = resultadosTotales.totalVenta;

        let resultadoPagosVentaHOy = ventaDeHOy - totalPagosHoy;

        totalSaldoAnteriorSubTotales += totalVentaAnterior;
        totalSaldoActualSubTotales += totalSaldoDelDia;
        totalCobranzaSubTotales += totalPagosHoy;
        totalNuevoSaldoSubTotales += totalNuevoSaldo;
        
        return `
            <tr class="bg-white dark:text-gray-200 text-gray-900 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-left border-y-[1px] border-r-[1px] border-l-2 py-1 px-2 whitespace-nowrap sticky left-0 dark:bg-gray-800 bg-white">${item.nombreCompleto}</td>
                <td class="text-center border-y-[1px] border-l-[1px] border-r-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${item.limitEndeudamiento}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${totalVentaAnterior.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${ventaDeHOy}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${totalPagosHoy.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${resultadoPagosVentaHOy.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${totalNuevoSaldo.toFixed(2)}</td>
            </tr>
        `
    }

    function fn_crearTotalesTablaExcelMerma(totalesPorEspecie, promediosEspeciesCompra) {

        function fn_buscarValor(obj, especie, valor) {
            return obj[especie] ? obj[especie][valor] : 0;
        }

        function fn_buscarValorDecimal(obj, especie, valor) {
            return obj[especie] ? obj[especie][valor] : "0.00";
        }

        function fn_buscarValorDecimalT(obj, especie, valor) {
            return obj && obj[especie] ? parseFloat(obj[especie][valor]) : 0;
        }

        function fn_buscarValorDecimalTASM(obj, especie, valor) {
            return obj && obj[especie] ? parseFloat(obj[especie][valor]) : 0;
        }

        // Resultados

        let totalDeTotales = agruparTotalTotalesEspecies(totalesPorEspecie);

        let totalCantidadTASM = fn_buscarValor(totalesPorEspecie, 'especie9', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie10', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie11', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie12', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie13', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie15', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie6', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie21', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie8', 'totalCantidad');
        
        let totalPesoTASM = fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie9', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie10', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie11', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie12', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie13', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie15', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie6', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie21', 'totalPeso') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie8', 'totalPeso');
        
        let totalVentaTASM = fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie9', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie10', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie11', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie12', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie13', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie15', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie6', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie21', 'totalVenta') + fn_buscarValorDecimalTASM(totalesPorEspecie, 'especie8', 'totalVenta');

        let totalCantidadT = fn_buscarValor(totalesPorEspecie, 'especie9', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie10', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie11', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie12', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie13', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie15', 'totalCantidad');
        
        let totalPesoT = fn_buscarValorDecimalT(totalesPorEspecie, 'especie9', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie10', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie11', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie12', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie13', 'totalPeso') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie15', 'totalPeso');
        
        let totalVentaT = fn_buscarValorDecimalT(totalesPorEspecie, 'especie9', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie10', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie11', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie12', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie13', 'totalVenta') + fn_buscarValorDecimalT(totalesPorEspecie, 'especie15', 'totalVenta');

        let totalPesoFila = parseFloat(totalDeTotales.totalPeso);

        let totalVentaFila = parseFloat(totalDeTotales.totalVenta);

        function fn_calculaPromedio(especie){
            let valor = (fn_buscarValor(totalesPorEspecie, especie, 'totalPeso') / fn_buscarValor(totalesPorEspecie, especie, 'totalCantidad')) ? (fn_buscarValor(totalesPorEspecie, especie, 'totalPeso') / fn_buscarValor(totalesPorEspecie, especie, 'totalCantidad')) : 0;
            return valor.toFixed(2);
        }

        let bodyTablaExcelResumenMerma = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">YUGO VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie1')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.yugo).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.yugo) - parseFloat(fn_calculaPromedio('especie1'))).toFixed(2)}</td> 
            </tr>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">YUGO PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie2')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.yugo).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.yugo) - parseFloat(fn_calculaPromedio('especie2'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">BRASA YUGO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie17')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.yugo).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.yugo) - parseFloat(fn_calculaPromedio('especie17'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TECNICA VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie3')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.tecnica).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.tecnica) - parseFloat(fn_calculaPromedio('especie3'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TECNICA PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie4')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.tecnica).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.tecnica) - parseFloat(fn_calculaPromedio('especie4'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">BRASA TECNICA</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie18')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.tecnica).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.tecnica) - parseFloat(fn_calculaPromedio('especie18'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO XX PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie16')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.xx).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.xx) - parseFloat(fn_calculaPromedio('especie16'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO XX VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie19')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.xx).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.xx) - parseFloat(fn_calculaPromedio('especie19'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA DOBLE PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie5')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.gallinaDoble).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.gallinaDoble) - parseFloat(fn_calculaPromedio('especie5'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA DOBLE VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie20')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.gallinaDoble).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.gallinaDoble) - parseFloat(fn_calculaPromedio('especie20'))).toFixed(2)}</td> 
            </tr>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLO PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie7')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.gallo).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.gallo) - parseFloat(fn_calculaPromedio('especie7'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLO VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie22')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.gallo).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.gallo) - parseFloat(fn_calculaPromedio('especie22'))).toFixed(2)}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO MUTILADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie8')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${0}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${0}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA CHICA PELADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie14')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.gallinaChica).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.gallinaChica) - parseFloat(fn_calculaPromedio('especie14'))).toFixed(2)}</td>
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA CHICA VIVO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie23')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${parseFloat(promediosEspeciesCompra.gallinaChica).toFixed(2)}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(parseFloat(promediosEspeciesCompra.gallinaChica) - parseFloat(fn_calculaPromedio('especie23'))).toFixed(2)}</td> 
            </tr>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">SECOS</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie21')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${0}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${0}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">AHOGADOS</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${fn_calculaPromedio('especie6')}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${0}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${0}</td> 
            </tr>
            
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TROZADO</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(totalPesoT / totalCantidadT) != Infinity ? (totalPesoT / totalCantidadT).toFixed(2) : "0.00"}</td>
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${0}</td> 
                <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${0}</td> 
            </tr>
        `;

        let tbodyReporteAcumuladoExcelResumenMerma = $('#bodyReporteAcumuladoExcelResumenMerma');
        tbodyReporteAcumuladoExcelResumenMerma.empty();
        tbodyReporteAcumuladoExcelResumenMerma.html(bodyTablaExcelResumenMerma);
    }

    // Resumen del Resumen

    function fn_crearFilaTablaExcelResumenDelResumen(item) {

        function fn_buscarValor(obj, especie, valor) {
            return obj && obj[especie] ? obj[especie][0][valor] : 0;
        }

        function fn_buscarValorDecimal(obj, especie, valor) {
            return obj && obj[especie] ? obj[especie][0][valor] : "0.00";
        }

        function fn_buscarValorItem(obj, valor) {
            return obj && obj[0] && obj[0][valor] ? obj[0][valor] : "0.00";
        }

        function fn_buscarValorDecimalTAS(obj, especie, valor) {
            return obj && obj[especie] ? parseFloat(obj[especie][0][valor]) : 0;
        }

        function fn_buscarValorDecimalTASPrecioYPromedio(obj, especie, valor) {
            if (obj && obj[especie] && obj[especie][0] && obj[especie][0][valor]) {
                let valorDecimal = parseFloat(obj[especie][0][valor]);
                return valorDecimal > 0 ? valorDecimal : null;
            }
            return null;
        }

        let precios = [
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie9', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie10', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie11', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie12', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie13', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie15', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie6', 'precioPromedio'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie21', 'precioPromedio')
        ].filter(val => val !== null);

        let sumaPrecios = precios.reduce((total, valor) => total + valor, 0);

        let promedios = [
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie9', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie10', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie11', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie12', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie13', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie15', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie6', 'promedioEspecie'),
            fn_buscarValorDecimalTASPrecioYPromedio(item.datosTabla_tb_pesadasGeneral, 'especie21', 'promedioEspecie')
        ].filter(val => val !== null);

        let sumaPromedios = promedios.reduce((total, valor) => total + valor, 0);
        
        // Resultados

        let resultadosTotales = agruparTotalesEspecies(item);
        
        let totalCantidadTAS = fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie9', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie10', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie11', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie12', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie13', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie15', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie6', 'totalCantidad') + fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie21', 'totalCantidad');
        
        let totalPesoTAS = fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie9', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie10', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie11', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie12', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie13', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie15', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie6', 'totalPeso') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie21', 'totalPeso');
        
        let totalVentaTAS = fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie9', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie10', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie11', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie12', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie13', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie15', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie6', 'totalVenta') + fn_buscarValorDecimalTAS(item.datosTabla_tb_pesadasGeneral, 'especie21', 'totalVenta');
        
        let precioPromedioTAS = precios.length > 0 ? sumaPrecios / precios.length : 0;
        
        let promedioEspecieTAS = promedios.length > 0 ? sumaPromedios / promedios.length : 0;

        let totalPrecioDescuento = (parseFloat(fn_buscarValorItem(item.totalDescuentos, 'totalVentaDescuento')) / parseFloat(fn_buscarValorItem(item.totalDescuentos, 'totalPesoDescuento')))

        let totalVentaAnterior = ((parseFloat(item.ventaAnterior) + parseFloat(item.ventaAnterior2) + parseFloat(item.ventaAnterior3)) + parseFloat(item.totalVentaDescuentoAnterior)) - parseFloat(item.pagoAnterior);

        let totalSaldoDelDia = totalVentaAnterior + parseFloat(resultadosTotales.totalVenta);

        let totalPagosHoy = parseFloat(fn_buscarValorItem(item.totalPagos, "pagos"));

        let totalNuevoSaldo = totalSaldoDelDia - totalPagosHoy;

        totalSaldoAnteriorSubTotales += totalVentaAnterior;
        totalSaldoActualSubTotales += totalSaldoDelDia;
        totalCobranzaSubTotales += totalPagosHoy;
        totalNuevoSaldoSubTotales += totalNuevoSaldo;

        function fn_calculaPromedioDecimalesTotales(valor1, valor2, valor3) {
            let resultado = parseFloat(valor1) + parseFloat(valor2) + parseFloat(valor3);
            let contador = 0;

            if(parseFloat(valor1) != 0){
                contador++;
            }
            
            if(parseFloat(valor2) != 0){
                contador++;
            }
            
            if(parseFloat(valor3) != 0){
                contador++;
            }

            let valorRetornar = resultado / contador;

            return valorRetornar ? valorRetornar.toFixed(2) : "0.00";
        }

        function fn_soloSumaTotalesDecimales(valor1, valor2, valor3) {
            let resultado = parseFloat(valor1) + parseFloat(valor2) + parseFloat(valor3);
            return resultado.toFixed(2);
        }

        function fn_soloSumaTotalesEnteros(valor1, valor2, valor3) {
            let resultado = parseInt(valor1) + parseInt(valor2) + parseInt(valor3);
            return resultado;
        }
        
        return `
            <tr class="bg-white dark:text-gray-200 text-gray-900 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-left border-y-[1px] border-r-[1px] border-l-2 py-1 px-2 whitespace-nowrap sticky left-0 dark:bg-gray-800 bg-white">${item.nombreCompleto}</td>

                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie1', 'totalCantidad'),fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie2', 'totalCantidad'),fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie17', 'totalCantidad'))} </td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie1', 'totalPeso'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie2', 'totalPeso'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie17', 'totalPeso'))} Kg.</td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie1', 'precioPromedio'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie2', 'precioPromedio'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie17', 'precioPromedio'))}</td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie1', 'totalVenta'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie2', 'totalVenta'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie17', 'totalVenta'))}</td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie1', 'promedioEspecie'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie2', 'promedioEspecie'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie17', 'promedioEspecie'))}</td>
                <td class="especie1 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie3', 'totalCantidad'),fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie4', 'totalCantidad'),fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie18', 'totalCantidad'))} </td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie3', 'totalPeso'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie4', 'totalPeso'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie18', 'totalPeso'))} Kg.</td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie3', 'precioPromedio'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie4', 'precioPromedio'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie18', 'precioPromedio'))}</td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie3', 'totalVenta'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie4', 'totalVenta'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie18', 'totalVenta'))}</td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie3', 'promedioEspecie'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie4', 'promedioEspecie'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie18', 'promedioEspecie'))}</td>
                <td class="especie3 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie16', 'totalCantidad'),fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie19', 'totalCantidad'), 0)} </td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie16', 'totalPeso'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie19', 'totalPeso'), 0)} Kg.</td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie16', 'precioPromedio'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie19', 'precioPromedio'), 0)}</td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie16', 'totalVenta'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie19', 'totalVenta'), 0)}</td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie16', 'promedioEspecie'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie19', 'promedioEspecie'), 0)}</td>
                <td class="especie16 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie5', 'totalCantidad'),fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie20', 'totalCantidad'), 0)} </td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie5', 'totalPeso'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie20', 'totalPeso'), 0)} Kg.</td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie5', 'precioPromedio'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie20', 'precioPromedio'), 0)}</td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie5', 'totalVenta'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie20', 'totalVenta'), 0)}</td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie5', 'promedioEspecie'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie20', 'promedioEspecie'), 0)}</td>
                <td class="especie5 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie7', 'totalCantidad'),fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie21', 'totalCantidad'), 0)} </td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie7', 'totalPeso'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie21', 'totalPeso'), 0)} Kg.</td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie7', 'precioPromedio'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie21', 'precioPromedio'), 0)}</td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie7', 'totalVenta'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie21', 'totalVenta'), 0)}</td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie7', 'promedioEspecie'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie21', 'promedioEspecie'), 0)}</td>
                <td class="especie7 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>
                
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie14', 'totalCantidad'),fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie23', 'totalCantidad'), 0)} </td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie14', 'totalPeso'),fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie23', 'totalPeso'), 0)} Kg.</td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie14', 'precioPromedio'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie23', 'precioPromedio'), 0)}</td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie14', 'totalVenta'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie23', 'totalVenta'), 0)}</td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie14', 'promedioEspecie'), fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie23', 'promedioEspecie'), 0)}</td>
                <td class="especie14 text-center border-[1px] py-1 px-2 whitespace-nowrap">&nbsp;</td>

                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValor(item.datosTabla_tb_pesadasGeneral, 'especie8', 'totalCantidad')} </td>
                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie8', 'totalPeso')} Kg.</td>
                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie8', 'precioPromedio')}</td>
                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie8', 'totalVenta')}</td>
                <td class="especie8 text-center border-[1px] py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(item.datosTabla_tb_pesadasGeneral, 'especie8', 'promedioEspecie')}</td>
                
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidadTAS} </td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalPesoTAS.toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${precioPromedioTAS.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVentaTAS.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${promedioEspecieTAS.toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${parseFloat(fn_buscarValorItem(item.totalDescuentos, 'totalPesoDescuento')).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioDescuento ? totalPrecioDescuento : 0).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${parseFloat(fn_buscarValorItem(item.totalDescuentos, 'totalVentaDescuento')).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${resultadosTotales.totalCantidad}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${resultadosTotales.totalPeso} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${resultadosTotales.totalVenta}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${totalVentaAnterior.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${totalSaldoDelDia.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${totalPagosHoy.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap font-bold">S/. ${totalNuevoSaldo.toFixed(2)}</td>
                <td class="text-center border-y-[1px] border-l-[1px] border-r-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${item.limitEndeudamiento}</td>
                <td class="text-center border-y-[1px] border-l-[1px] border-r-2 py-1 px-2 whitespace-nowrap">${item.nombreCompleto}</td>
            </tr>
        `
    }

    function fn_crearFilaTotalTablaExcelResumenDelResumen(totalesPorEspecie, resultadosDescuentos, promediosEspeciesCompra) {

        function fn_buscarValor(obj, especie, valor) {
            return obj[especie] ? obj[especie][valor] : 0;
        }

        function fn_buscarValorDecimal(obj, especie, valor) {
            return obj[especie] ? obj[especie][valor] : "0.00";
        }

        function fn_buscarValorDecimalTAS(obj, especie, valor) {
            return obj && obj[especie] ? parseFloat(obj[especie][valor]) : 0;
        }

        function fn_calculaPromedioDecimalesTotales(valor1, valor2, valor3) {
            let resultado = parseFloat(valor1) + parseFloat(valor2) + parseFloat(valor3);
            let contador = 0;

            if(parseFloat(valor1) != 0){
                contador++;
            }
            
            if(parseFloat(valor2) != 0){
                contador++;
            }
            
            if(parseFloat(valor3) != 0){
                contador++;
            }

            let valorRetornar = resultado / contador;

            return valorRetornar ? valorRetornar.toFixed(2) : "0.00";
        }

        function fn_soloSumaTotalesDecimales(valor1, valor2, valor3) {
            let resultado = parseFloat(valor1) + parseFloat(valor2) + parseFloat(valor3);
            return resultado.toFixed(2);
        }

        function fn_soloSumaTotalesEnteros(valor1, valor2, valor3) {
            let resultado = parseInt(valor1) + parseInt(valor2) + parseInt(valor3);
            return resultado;
        }

        // Resultados

        let totalDeTotales = agruparTotalTotalesEspecies(totalesPorEspecie);

        let totalCantidadTAS = fn_buscarValor(totalesPorEspecie, 'especie9', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie10', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie11', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie12', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie13', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie15', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie6', 'totalCantidad') + fn_buscarValor(totalesPorEspecie, 'especie21', 'totalCantidad');
        
        let totalPesoTAS = fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie9', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie10', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie11', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie12', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie13', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie15', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie6', 'totalPeso') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie21', 'totalPeso');
        
        let totalVentaTAS = fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie9', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie10', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie11', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie12', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie13', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie15', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie6', 'totalVenta') + fn_buscarValorDecimalTAS(totalesPorEspecie, 'especie21', 'totalVenta');

        let totalPrecioDescuento = (resultadosDescuentos.totalVentaDescuento ? resultadosDescuentos.totalVentaDescuento : 0) / (resultadosDescuentos.totalPesoDescuento ? resultadosDescuentos.totalPesoDescuento : 0);

        let totalPesoFila = parseFloat(totalDeTotales.totalPeso) + parseFloat(resultadosDescuentos.totalPesoDescuento ? resultadosDescuentos.totalPesoDescuento : 0);

        let totalVentaFila = parseFloat(totalDeTotales.totalVenta) + parseFloat(resultadosDescuentos.totalVentaDescuento ? resultadosDescuentos.totalVentaDescuento : 0);
        
        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 sticky bottom-0">
                <td class="text-left font-bold text-sm border-t-2 border-r-[1px] border-l-2 border-b-2 py-1 px-2 text-white bg-blue-600 whitespace-nowrap sticky left-0">TOTAL</td>

                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(totalesPorEspecie, 'especie1', 'totalCantidad'), fn_buscarValor(totalesPorEspecie, 'especie2', 'totalCantidad'), fn_buscarValor(totalesPorEspecie, 'especie17', 'totalCantidad'))}</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(totalesPorEspecie, 'especie1', 'totalPeso'), fn_buscarValorDecimal(totalesPorEspecie, 'especie2', 'totalPeso'), fn_buscarValorDecimal(totalesPorEspecie, 'especie17', 'totalPeso'))} Kg.</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie1', 'precioPromedio'), fn_buscarValorDecimal(totalesPorEspecie, 'especie2', 'precioPromedio'), fn_buscarValorDecimal(totalesPorEspecie, 'especie17', 'precioPromedio'))}</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal, (totalesPorEspecie, 'especie1', 'totalVenta'), fn_buscarValorDecimal, (totalesPorEspecie, 'especie2', 'totalVenta'), fn_buscarValorDecimal, (totalesPorEspecie, 'especie17', 'totalVenta'))}</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie1', 'promedioEspecie'), fn_buscarValorDecimal(totalesPorEspecie, 'especie2', 'promedioEspecie'), fn_buscarValorDecimal(totalesPorEspecie, 'especie17', 'promedioEspecie'))}</td>
                <td class="especie1 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.yugo}</td>

                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(totalesPorEspecie, 'especie3', 'totalCantidad'), fn_buscarValor(totalesPorEspecie, 'especie4', 'totalCantidad'), fn_buscarValor(totalesPorEspecie, 'especie18', 'totalCantidad'))}</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(totalesPorEspecie, 'especie3', 'totalPeso'), fn_buscarValorDecimal(totalesPorEspecie, 'especie4', 'totalPeso'), fn_buscarValorDecimal(totalesPorEspecie, 'especie18', 'totalPeso'))} Kg.</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie3', 'precioPromedio'), fn_buscarValorDecimal(totalesPorEspecie, 'especie4', 'precioPromedio'), fn_buscarValorDecimal(totalesPorEspecie, 'especie18', 'precioPromedio'))}</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal, (totalesPorEspecie, 'especie3', 'totalVenta'), fn_buscarValorDecimal, (totalesPorEspecie, 'especie4', 'totalVenta'), fn_buscarValorDecimal, (totalesPorEspecie, 'especie18', 'totalVenta'))}</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie3', 'promedioEspecie'), fn_buscarValorDecimal(totalesPorEspecie, 'especie4', 'promedioEspecie'), fn_buscarValorDecimal(totalesPorEspecie, 'especie18', 'promedioEspecie'))}</td>
                <td class="especie3 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.tecnica}</td>

                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(totalesPorEspecie, 'especie16', 'totalCantidad'), fn_buscarValor(totalesPorEspecie, 'especie19', 'totalCantidad'), 0)}</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(totalesPorEspecie, 'especie16', 'totalPeso'), fn_buscarValorDecimal(totalesPorEspecie, 'especie19', 'totalPeso'), 0)} Kg.</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie16', 'precioPromedio'), fn_buscarValorDecimal(totalesPorEspecie, 'especie19', 'precioPromedio'), 0)}</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal, (totalesPorEspecie, 'especie16', 'totalVenta'), fn_buscarValorDecimal, (totalesPorEspecie, 'especie19', 'totalVenta'), 0)}</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie16', 'promedioEspecie'), fn_buscarValorDecimal(totalesPorEspecie, 'especie19', 'promedioEspecie'), 0)}</td>
                <td class="especie16 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.xx}</td>

                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(totalesPorEspecie, 'especie5', 'totalCantidad'), fn_buscarValor(totalesPorEspecie, 'especie20', 'totalCantidad'), 0)}</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(totalesPorEspecie, 'especie5', 'totalPeso'), fn_buscarValorDecimal(totalesPorEspecie, 'especie20', 'totalPeso'), 0)} Kg.</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie5', 'precioPromedio'), fn_buscarValorDecimal(totalesPorEspecie, 'especie20', 'precioPromedio'), 0)}</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal, (totalesPorEspecie, 'especie5', 'totalVenta'), fn_buscarValorDecimal, (totalesPorEspecie, 'especie20', 'totalVenta'), 0)}</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie5', 'promedioEspecie'), fn_buscarValorDecimal(totalesPorEspecie, 'especie20', 'promedioEspecie'), 0)}</td>
                <td class="especie5 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.gallinaDoble}</td>

                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(totalesPorEspecie, 'especie7', 'totalCantidad'), fn_buscarValor(totalesPorEspecie, 'especie22', 'totalCantidad'), 0)}</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(totalesPorEspecie, 'especie7', 'totalPeso'), fn_buscarValorDecimal(totalesPorEspecie, 'especie22', 'totalPeso'), 0)} Kg.</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie7', 'precioPromedio'), fn_buscarValorDecimal(totalesPorEspecie, 'especie22', 'precioPromedio'), 0)}</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal, (totalesPorEspecie, 'especie7', 'totalVenta'), fn_buscarValorDecimal, (totalesPorEspecie, 'especie22', 'totalVenta'), 0)}</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie7', 'promedioEspecie'), fn_buscarValorDecimal(totalesPorEspecie, 'especie22', 'promedioEspecie'), 0)}</td>
                <td class="especie7 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.gallo}</td>

                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesEnteros(fn_buscarValor(totalesPorEspecie, 'especie14', 'totalCantidad'), fn_buscarValor(totalesPorEspecie, 'especie23', 'totalCantidad'), 0)}</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_soloSumaTotalesDecimales(fn_buscarValorDecimal(totalesPorEspecie, 'especie14', 'totalPeso'), fn_buscarValorDecimal(totalesPorEspecie, 'especie23', 'totalPeso'), 0)} Kg.</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie14', 'precioPromedio'), fn_buscarValorDecimal(totalesPorEspecie, 'especie23', 'precioPromedio'), 0)}</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal, (totalesPorEspecie, 'especie14', 'totalVenta'), fn_buscarValorDecimal, (totalesPorEspecie, 'especie23', 'totalVenta'), 0)}</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-blue-600 text-white">${fn_calculaPromedioDecimalesTotales(fn_buscarValorDecimal(totalesPorEspecie, 'especie14', 'promedioEspecie'), fn_buscarValorDecimal(totalesPorEspecie, 'especie23', 'promedioEspecie'), 0)}</td>
                <td class="especie14 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap bg-red-600 text-white">${promediosEspeciesCompra.gallinaChica}</td>

                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValor(totalesPorEspecie, 'especie8', 'totalCantidad')}</td>
                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'totalPeso')} Kg.</td>
                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'precioPromedio')}</td>
                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'totalVenta')}</td>
                <td class="especie8 text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${fn_buscarValorDecimal(totalesPorEspecie, 'especie8', 'promedioEspecie')}</td>
                
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${totalCantidadTAS}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${totalPesoTAS.toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${"S/N"}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalVentaTAS.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${"S/N"}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(resultadosDescuentos.totalPesoDescuento ? resultadosDescuentos.totalPesoDescuento : 0).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioDescuento ? totalPrecioDescuento : 0).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${(resultadosDescuentos.totalVentaDescuento ? resultadosDescuentos.totalVentaDescuento : 0).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${totalDeTotales.totalCantidad}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${totalPesoFila.toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${totalVentaFila.toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalSaldoAnteriorSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalSaldoActualSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalCobranzaSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-bold">S/. ${totalNuevoSaldoSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-bold bg-red-600">&nbsp;</td>
                <td class="text-center border-t-2 border-l-[1px] border-r-2 border-b-2 py-1 px-2 whitespace-nowrap font-bold bg-blue-600">&nbsp;</td>
            </tr>
        `;
    }

});
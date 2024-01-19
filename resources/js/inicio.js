import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    fn_declarar_especies();
    fn_traerDatosEnTiempoReal();
    setInterval(fn_traerDatosEnTiempoReal, 4000);

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];


    // Asignar la fecha actual a los inputs
    $('#fechaProduccionAnterior').val(fechaHoy);

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

    function fn_traerDatosEnTiempoReal(){

        var cantidadVentaTotal = 0;
        var pesoVentaTotal = 0;
        var promedioVentaTotal = 0;

        var cantidadCompraTotal = 0;
        var pesoCompraTotal = 0;
        var promedioCompraTotal = 0;

        var cantidadMermaTotal = 0;
        var pesoMermaTotal = 0;
        var promedioMermaTotal = 0;

        var cantidadMermaTotalPorcentual = 0;
        var pesoMermaTotalPorcentual = 0;
        var promedioMermaTotalPorcentual = 0;

        $.ajax({
            url: '/fn_consulta_TraerDatosEnTiempoReal',
            method: 'GET',
            success: function(response) {

                let cantidadPrimerEspecie = 0
                let cantidadSegundaEspecie = 0
                let cantidadTerceraEspecie = 0
                let cantidadCuartaEspecie = 0
                let cantidadQuintaEspecie = 0
                let cantidadSextaEspecie = 0
                let cantidadSeptimaEspecie = 0
                let cantidadOctavaEspecie = 0
                let cantidadDecimaEspecie = 0
                let cantidadDecimaPrimeraEspecie = 0
                let cantidadDecimaSegundaEspecie = 0
                let cantidadDecimaTerceraEspecie = 0
                let cantidadDecimaCuartaEspecie = 0
                let cantidadDecimaQuintaEspecie = 0

                let pesoTotalPrimerEspecie = 0.0
                let pesoTotalSegundaEspecie = 0.0
                let pesoTotalTerceraEspecie = 0.0
                let pesoTotalCuartaEspecie = 0.0
                let pesoTotalQuintaEspecie = 0.0
                let pesoTotalSextaEspecie = 0.0
                let pesoTotalSeptimaEspecie = 0.0
                let pesoTotalOctavaEspecie = 0.0
                let pesoTotalDecimaEspecie = 0.0
                let pesoTotalDecimaPrimeraEspecie = 0.0
                let pesoTotalDecimaSegundaEspecie = 0.0
                let pesoTotalDecimaTerceraEspecie = 0.0
                let pesoTotalDecimaCuartaEspecie = 0.0
                let pesoTotalDecimaQuintaEspecie = 0.0

                let cantidadTotalesEspecie = 0
                let pesoTotalesEspecie = 0.0

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {

                        let idEspecie = parseInt(obj.idEspecie)
                        let cantidadPes = parseInt(obj.cantidadPes)
                        let pesoNetoPes = parseFloat(obj.pesoNetoPes)

                        if (idEspecie == primerEspecieGlobal) {
                            cantidadPrimerEspecie += cantidadPes
                            pesoTotalPrimerEspecie += pesoNetoPes
                        }else if (idEspecie == segundaEspecieGlobal) {
                            cantidadSegundaEspecie += cantidadPes
                            pesoTotalSegundaEspecie += pesoNetoPes
                        }else if (idEspecie == terceraEspecieGlobal) {
                            cantidadTerceraEspecie += cantidadPes
                            pesoTotalTerceraEspecie += pesoNetoPes
                        }else if (idEspecie == cuartaEspecieGlobal) {
                            cantidadCuartaEspecie += cantidadPes
                            pesoTotalCuartaEspecie += pesoNetoPes
                        }

                    });

                    cantidadTotalesEspecie = cantidadPrimerEspecie+cantidadSegundaEspecie+cantidadTerceraEspecie+cantidadCuartaEspecie
                    pesoTotalesEspecie = pesoTotalPrimerEspecie+pesoTotalSegundaEspecie+pesoTotalTerceraEspecie+pesoTotalCuartaEspecie

                    cantidadVentaTotal = cantidadTotalesEspecie;
                    pesoVentaTotal = pesoTotalesEspecie;
                    if (pesoTotalesEspecie != 0 && cantidadTotalesEspecie != 0) {
                        promedioVentaTotal = pesoTotalesEspecie/cantidadTotalesEspecie;
                    }else{
                        promedioVentaTotal = 0; 
                    }
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }   

                // $.ajax({
                //     url: '/fn_consulta_TraerDatosEnTiempoRealCompra',
                //     method: 'GET',
                //     success: function(response) {
        
                //         // Verificar si la respuesta es un arreglo de objetos
                //         if (Array.isArray(response)) {
                //             // Iterar sobre los objetos y mostrar sus propiedades
                //             let totalCantidadGuia = parseInt(response[0].totalCantidadGuia);
                //             let totalPesoGuia = parseFloat(response[0].totalPesoGuia);
                //             cantidadCompraTotal = totalCantidadGuia.toFixed(2);
                //             pesoCompraTotal = totalPesoGuia.toFixed(2);
        
                //         } else {
                //             console.log("La respuesta no es un arreglo de objetos.");
                //         }

                //         if (pesoCompraTotal != 0 && cantidadCompraTotal != 0){
                //             promedioCompraTotal = pesoCompraTotal/cantidadCompraTotal;
                //         }else{
                //             promedioCompraTotal = 0
                //         }
        
        
                //         $('#tblCantidadCompra').text(parseInt(cantidadCompraTotal));
                //         $('#tblPesoCompra').text(pesoCompraTotal);
                //         $('#tblPromedioCompra').text((promedioCompraTotal).toFixed(2));
        
                //         cantidadMermaTotal = cantidadCompraTotal-cantidadVentaTotal;
                //         pesoMermaTotal = pesoCompraTotal-pesoVentaTotal;
                //         promedioMermaTotal = promedioCompraTotal-promedioVentaTotal;
        
                //         $('#tblCantidadMerma').text(cantidadMermaTotal);
                //         $('#tblPesoMerma').text(pesoMermaTotal.toFixed(2));
                //         $('#tblPromedioMerma').text(promedioMermaTotal.toFixed(2));
        
                //         if (cantidadVentaTotal != 0 && cantidadCompraTotal != 0) {
                //             cantidadMermaTotalPorcentual = ((cantidadVentaTotal-cantidadCompraTotal)/cantidadCompraTotal)*100;
                //         }
                        
                //         if (pesoVentaTotal != 0 && pesoCompraTotal != 0) {
                //             pesoMermaTotalPorcentual = ((pesoVentaTotal-pesoCompraTotal)/pesoCompraTotal)*100;
                //         }
        
                //         if (promedioVentaTotal != 0 && promedioCompraTotal != 0) {
                //             promedioMermaTotalPorcentual = ((promedioVentaTotal-promedioCompraTotal)/promedioCompraTotal)*100;
                //         }
        
                //         $('#tblCantidadMermaPor').text(cantidadMermaTotalPorcentual.toFixed(2) + " %");
                //         $('#tblPesoMermaPor').text(pesoMermaTotalPorcentual.toFixed(2) + " %");
                //         $('#tblPromedioMermaPor').text(promedioMermaTotalPorcentual.toFixed(2) + " %");
                        
                //     },
                //     error: function(error) {
                //         console.error("ERROR",error);
                //     }
                // });

                $('#totalUnidadesPrimerEspecie').text(cantidadPrimerEspecie + " " + (cantidadPrimerEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgPrimerEspecie').text(pesoTotalPrimerEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesSegundaEspecie').text(cantidadSegundaEspecie + " " + (cantidadSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgSegundaEspecie').text(pesoTotalSegundaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesTerceraEspecie').text(cantidadTerceraEspecie + " " + (cantidadTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgTerceraEspecie').text(pesoTotalTerceraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesCuartaEspecie').text(cantidadCuartaEspecie + " " + (cantidadCuartaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgCuartaEspecie').text(pesoTotalCuartaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesEspecies').text(cantidadTotalesEspecie + " " + (cantidadTotalesEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgEspecies').text(pesoTotalesEspecie.toFixed(2) + " Kg");

                $('#tblCantidadVenta').text(cantidadVentaTotal);
                $('#tblPesoVenta').text(pesoVentaTotal.toFixed(2));
                $('#tblPromedioVenta').text(promedioVentaTotal.toFixed(2));
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });

    }

    $('.cerrarModalProduccionAnterior, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalProduccionAnterior').addClass('hidden');
            $('#ModalProduccionAnterior').removeClass('flex');
        }
    });

    $('#btnProduccionAnterior').on('click', function () {
        $('#ModalProduccionAnterior').addClass('flex');
        $('#ModalProduccionAnterior').removeClass('hidden');
    });

    $('#btnBuscarProduccionAnterior').on('click', function () {
        $('#ModalProduccionAnterior').addClass('hidden');
        $('#ModalProduccionAnterior').removeClass('flex');
        let fechaProduccionAnterior = $('#fechaProduccionAnterior').val();
        $('#fechaDeProduccion').text(fechaProduccionAnterior);
        fn_traerDatosDiasAnteriores(fechaProduccionAnterior);
        $('#contenedorGraficaActual').toggle('flex hidden');
        $('#contenedorGraficaAnterior').toggle('flex hidden');
        $('#btnRetrocesoProduccionAnterior').toggle('hidden');
        $('#btnProduccionAnterior').toggle('hidden');
    });

    $('#btnRetrocesoProduccionAnterior').on('click', function () {
        $('#fechaDeProduccion').text("Actual");
        $('#contenedorGraficaActual').toggle('flex hidden');
        $('#contenedorGraficaAnterior').toggle('flex hidden');
        $('#btnRetrocesoProduccionAnterior').toggle('hidden');
        $('#btnProduccionAnterior').toggle('hidden');
    });

    fn_TraerClientesAgregarSaldo();
    function fn_TraerClientesAgregarSaldo() {
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarSaldo',
            method: 'GET',
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    // Objeto para almacenar los resultados agrupados por codigoCli
                    let resultadosAgrupados = {};
                    let contador = 0;
    
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
                            footer: '<a href="/agregar_saldo">Ir a revisar</a>'
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
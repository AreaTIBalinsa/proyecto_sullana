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
    $('#fechaCambiarPrecioPesada').val(fechaHoy);

    fn_llamarAcumuladoConEskeleto(fechaHoy,fechaHoy);
    fn_declarar_especies();

    function fn_llamarAcumuladoConEskeleto(fechaInicio, fechaFin){
        fn_TraerReporteAcumuladoDetalle(fechaInicio,fechaFin);
        $('#eskeleto').removeClass('hidden');
        $('#eskeleto').addClass('sticky');
        $('#divReporteAcumuladoDetalleExcel').removeClass('overflow-auto');
        $('#divReporteAcumuladoDetalleExcel').addClass('overflow-hidden h-full');
        $('#eskeletoUno').removeClass('hidden');
        $('#eskeletoUno').addClass('sticky');
        $('#divTotalesUno').removeClass('overflow-auto');
        $('#divTotalesUno').addClass('overflow-hidden h-full max-h-[550px]');
        $('#eskeletoDos').removeClass('hidden');
        $('#eskeletoDos').addClass('sticky');
        $('#divTotalesDos').removeClass('overflow-auto');
        $('#divTotalesDos').addClass('overflow-hidden h-full max-h-[300px]');
    }

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
        // $('#eskeleto').removeClass('hidden');
        // $('#eskeleto').addClass('sticky');
        // $('#divReporteAcumuladoDetalleExcel').removeClass('overflow-auto');
        // $('#divReporteAcumuladoDetalleExcel').addClass('overflow-hidden h-full');
        // $('#eskeletoUno').removeClass('hidden');
        // $('#eskeletoUno').addClass('sticky');
        // $('#divTotalesUno').removeClass('overflow-auto');
        // $('#divTotalesUno').addClass('overflow-hidden h-full max-h-[550px]');
        // $('#eskeletoDos').removeClass('hidden');
        // $('#eskeletoDos').addClass('sticky');
        // $('#divTotalesDos').removeClass('overflow-auto');
        // $('#divTotalesDos').addClass('overflow-hidden h-full max-h-[300px]');
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

                        totalPesoDecimaNovenaEspecie: parseFloat(item.totalesDecimaNovenaEspecie[0]?.totalPesoDecimaNovenaEspecie || 0),
                        totalPesoDescuentoDecimaNovenaEspecie: parseFloat(item.totalesDecimaNovenaEspecie[0]?.totalPesoDescuentoDecimaNovenaEspecie || 0),
                        totalVentaDecimaNovenaEspecie: parseFloat(item.totalesDecimaNovenaEspecie[0]?.totalVentaDecimaNovenaEspecie || 0),
                        totalCantidadDecimaNovenaEspecie: parseInt(item.totalesDecimaNovenaEspecie[0]?.totalCantidadDecimaNovenaEspecie || 0),

                        totalPesoVigesimaEspecie: parseFloat(item.totalesVigesimaEspecie[0]?.totalPesoVigesimaEspecie || 0),
                        totalPesoDescuentoVigesimaEspecie: parseFloat(item.totalesVigesimaEspecie[0]?.totalPesoDescuentoVigesimaEspecie || 0),
                        totalVentaVigesimaEspecie: parseFloat(item.totalesVigesimaEspecie[0]?.totalVentaVigesimaEspecie || 0),
                        totalCantidadVigesimaEspecie: parseInt(item.totalesVigesimaEspecie[0]?.totalCantidadVigesimaEspecie || 0),

                        totalPesoVigesimaPrimeraEspecie: parseFloat(item.totalesVigesimaPrimeraEspecie[0]?.totalPesoVigesimaPrimeraEspecie || 0),
                        totalPesoDescuentoVigesimaPrimeraEspecie: parseFloat(item.totalesVigesimaPrimeraEspecie[0]?.totalPesoDescuentoVigesimaPrimeraEspecie || 0),
                        totalVentaVigesimaPrimeraEspecie: parseFloat(item.totalesVigesimaPrimeraEspecie[0]?.totalVentaVigesimaPrimeraEspecie || 0),
                        totalCantidadVigesimaPrimeraEspecie: parseInt(item.totalesVigesimaPrimeraEspecie[0]?.totalCantidadVigesimaPrimeraEspecie || 0),

                        totalPesoVigesimaSegundaEspecie: parseFloat(item.totalesVigesimaSegundaEspecie[0]?.totalPesoVigesimaSegundaEspecie || 0),
                        totalPesoDescuentoVigesimaSegundaEspecie: parseFloat(item.totalesVigesimaSegundaEspecie[0]?.totalPesoDescuentoVigesimaSegundaEspecie || 0),
                        totalVentaVigesimaSegundaEspecie: parseFloat(item.totalesVigesimaSegundaEspecie[0]?.totalVentaVigesimaSegundaEspecie || 0),
                        totalCantidadVigesimaSegundaEspecie: parseInt(item.totalesVigesimaSegundaEspecie[0]?.totalCantidadVigesimaSegundaEspecie || 0),

                        totalPesoVigesimaTerceraEspecie: parseFloat(item.totalesVigesimaTerceraEspecie[0]?.totalPesoVigesimaTerceraEspecie || 0),
                        totalPesoDescuentoVigesimaTerceraEspecie: parseFloat(item.totalesVigesimaTerceraEspecie[0]?.totalPesoDescuentoVigesimaTerceraEspecie || 0),
                        totalVentaVigesimaTerceraEspecie: parseFloat(item.totalesVigesimaTerceraEspecie[0]?.totalVentaVigesimaTerceraEspecie || 0),
                        totalCantidadVigesimaTerceraEspecie: parseInt(item.totalesVigesimaTerceraEspecie[0]?.totalCantidadVigesimaTerceraEspecie || 0),

                        totalCantidadNovenaEspecie: parseInt(item.totalesNovenaEspecie[0]?.totalCantidadNovenaEspecie || 0),
                        
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
                        
                        totalCantidadDescuentoDecimaNovenaEspecie: parseInt(item.totalesDecimaNovenaEspecie[0]?.totalCantidadDescuentoDecimaNovenaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaNovenaEspecie: parseFloat(item.totalesDecimaNovenaEspecie[0]?.totalVentaDescuentoDecimaNovenaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaEspecie: parseInt(item.totalesVigesimaEspecie[0]?.totalCantidadDescuentoVigesimaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaEspecie: parseFloat(item.totalesVigesimaEspecie[0]?.totalVentaDescuentoVigesimaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaPrimeraEspecie: parseInt(item.totalesVigesimaPrimeraEspecie[0]?.totalCantidadDescuentoVigesimaPrimeraEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaPrimeraEspecie: parseFloat(item.totalesVigesimaPrimeraEspecie[0]?.totalVentaDescuentoVigesimaPrimeraEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaSegundaEspecie: parseInt(item.totalesVigesimaSegundaEspecie[0]?.totalCantidadDescuentoVigesimaSegundaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaSegundaEspecie: parseFloat(item.totalesVigesimaSegundaEspecie[0]?.totalVentaDescuentoVigesimaSegundaEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaTerceraEspecie: parseInt(item.totalesVigesimaTerceraEspecie[0]?.totalCantidadDescuentoVigesimaTerceraEspecie.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaTerceraEspecie: parseFloat(item.totalesVigesimaTerceraEspecie[0]?.totalVentaDescuentoVigesimaTerceraEspecie.replace(/[^0-9.-]+/g,"") || 0),

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

                        totalPesoDecimaNovenaEspecie2: parseFloat(item.totalesDecimaNovenaEspecie2[0]?.totalPesoDecimaNovenaEspecie2 || 0),
                        totalPesoDescuentoDecimaNovenaEspecie2: parseFloat(item.totalesDecimaNovenaEspecie2[0]?.totalPesoDescuentoDecimaNovenaEspecie2 || 0),
                        totalVentaDecimaNovenaEspecie2: parseFloat(item.totalesDecimaNovenaEspecie2[0]?.totalVentaDecimaNovenaEspecie2 || 0),
                        totalCantidadDecimaNovenaEspecie2: parseInt(item.totalesDecimaNovenaEspecie2[0]?.totalCantidadDecimaNovenaEspecie2 || 0),

                        totalPesoVigesimaEspecie2: parseFloat(item.totalesVigesimaEspecie2[0]?.totalPesoVigesimaEspecie2 || 0),
                        totalPesoDescuentoVigesimaEspecie2: parseFloat(item.totalesVigesimaEspecie2[0]?.totalPesoDescuentoVigesimaEspecie2 || 0),
                        totalVentaVigesimaEspecie2: parseFloat(item.totalesVigesimaEspecie2[0]?.totalVentaVigesimaEspecie2 || 0),
                        totalCantidadVigesimaEspecie2: parseInt(item.totalesVigesimaEspecie2[0]?.totalCantidadVigesimaEspecie2 || 0),

                        totalPesoVigesimaPrimeraEspecie2: parseFloat(item.totalesVigesimaPrimeraEspecie2[0]?.totalPesoVigesimaPrimeraEspecie2 || 0),
                        totalPesoDescuentoVigesimaPrimeraEspecie2: parseFloat(item.totalesVigesimaPrimeraEspecie2[0]?.totalPesoDescuentoVigesimaPrimeraEspecie2 || 0),
                        totalVentaVigesimaPrimeraEspecie2: parseFloat(item.totalesVigesimaPrimeraEspecie2[0]?.totalVentaVigesimaPrimeraEspecie2 || 0),
                        totalCantidadVigesimaPrimeraEspecie2: parseInt(item.totalesVigesimaPrimeraEspecie2[0]?.totalCantidadVigesimaPrimeraEspecie2 || 0),

                        totalPesoVigesimaSegundaEspecie2: parseFloat(item.totalesVigesimaSegundaEspecie2[0]?.totalPesoVigesimaSegundaEspecie2 || 0),
                        totalPesoDescuentoVigesimaSegundaEspecie2: parseFloat(item.totalesVigesimaSegundaEspecie2[0]?.totalPesoDescuentoVigesimaSegundaEspecie2 || 0),
                        totalVentaVigesimaSegundaEspecie2: parseFloat(item.totalesVigesimaSegundaEspecie2[0]?.totalVentaVigesimaSegundaEspecie2 || 0),
                        totalCantidadVigesimaSegundaEspecie2: parseInt(item.totalesVigesimaSegundaEspecie2[0]?.totalCantidadVigesimaSegundaEspecie2 || 0),

                        totalPesoVigesimaTerceraEspecie2: parseFloat(item.totalesVigesimaTerceraEspecie2[0]?.totalPesoVigesimaTerceraEspecie2 || 0),
                        totalPesoDescuentoVigesimaTerceraEspecie2: parseFloat(item.totalesVigesimaTerceraEspecie2[0]?.totalPesoDescuentoVigesimaTerceraEspecie2 || 0),
                        totalVentaVigesimaTerceraEspecie2: parseFloat(item.totalesVigesimaTerceraEspecie2[0]?.totalVentaVigesimaTerceraEspecie2 || 0),
                        totalCantidadVigesimaTerceraEspecie2: parseInt(item.totalesVigesimaTerceraEspecie2[0]?.totalCantidadVigesimaTerceraEspecie2 || 0),

                        totalCantidadNovenaEspecie2: parseInt(item.totalesNovenaEspecie2[0]?.totalCantidadNovenaEspecie2 || 0),
                        
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

                        totalCantidadDescuentoDecimaNovenaEspecie2: parseInt(item.totalesDecimaNovenaEspecie2[0]?.totalCantidadDescuentoDecimaNovenaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaNovenaEspecie2: parseFloat(item.totalesDecimaNovenaEspecie2[0]?.totalVentaDescuentoDecimaNovenaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaEspecie2: parseInt(item.totalesVigesimaEspecie2[0]?.totalCantidadDescuentoVigesimaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaEspecie2: parseFloat(item.totalesVigesimaEspecie2[0]?.totalVentaDescuentoVigesimaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaPrimeraEspecie2: parseInt(item.totalesVigesimaPrimeraEspecie2[0]?.totalCantidadDescuentoVigesimaPrimeraEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaPrimeraEspecie2: parseFloat(item.totalesVigesimaPrimeraEspecie2[0]?.totalVentaDescuentoVigesimaPrimeraEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaSegundaEspecie2: parseInt(item.totalesVigesimaSegundaEspecie2[0]?.totalCantidadDescuentoVigesimaSegundaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaSegundaEspecie2: parseFloat(item.totalesVigesimaSegundaEspecie2[0]?.totalVentaDescuentoVigesimaSegundaEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaTerceraEspecie2: parseInt(item.totalesVigesimaTerceraEspecie2[0]?.totalCantidadDescuentoVigesimaTerceraEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaTerceraEspecie2: parseFloat(item.totalesVigesimaTerceraEspecie2[0]?.totalVentaDescuentoVigesimaTerceraEspecie2.replace(/[^0-9.-]+/g,"") || 0),
                        
                        /* ===================================================================== */
                        /* =============================Consulta 03============================= */
                        /* ===================================================================== */

                        totalPesoPrimerEspecie3: parseFloat(item.totalesPrimerEspecie3[0]?.totalPesoPrimerEspecie3 || 0),
                        totalPesoDescuentoPrimerEspecie3: parseFloat(item.totalesPrimerEspecie3[0]?.totalPesoDescuentoPrimerEspecie3 || 0),
                        totalVentaPrimerEspecie3: parseFloat(item.totalesPrimerEspecie3[0]?.totalVentaPrimerEspecie3 || 0),
                        totalCantidadPrimerEspecie3: parseInt(item.totalesPrimerEspecie3[0]?.totalCantidadPrimerEspecie3 || 0),

                        totalPesoSegundaEspecie3: parseFloat(item.totalesSegundaEspecie3[0]?.totalPesoSegundaEspecie3 || 0),
                        totalPesoDescuentoSegundaEspecie3: parseFloat(item.totalesSegundaEspecie3[0]?.totalPesoDescuentoSegundaEspecie3 || 0),
                        totalVentaSegundaEspecie3: parseFloat(item.totalesSegundaEspecie3[0]?.totalVentaSegundaEspecie3 || 0),
                        totalCantidadSegundaEspecie3: parseInt(item.totalesSegundaEspecie3[0]?.totalCantidadSegundaEspecie3 || 0),

                        totalPesoTerceraEspecie3: parseFloat(item.totalesTerceraEspecie3[0]?.totalPesoTerceraEspecie3 || 0),
                        totalPesoDescuentoTerceraEspecie3: parseFloat(item.totalesTerceraEspecie3[0]?.totalPesoDescuentoTerceraEspecie3 || 0),
                        totalVentaTerceraEspecie3: parseFloat(item.totalesTerceraEspecie3[0]?.totalVentaTerceraEspecie3 || 0),
                        totalCantidadTerceraEspecie3: parseInt(item.totalesTerceraEspecie3[0]?.totalCantidadTerceraEspecie3 || 0),

                        totalPesoCuartaEspecie3: parseFloat(item.totalesCuartaEspecie3[0]?.totalPesoCuartaEspecie3 || 0),
                        totalPesoDescuentoCuartaEspecie3: parseFloat(item.totalesCuartaEspecie3[0]?.totalPesoDescuentoCuartaEspecie3 || 0),
                        totalVentaCuartaEspecie3: parseFloat(item.totalesCuartaEspecie3[0]?.totalVentaCuartaEspecie3 || 0),
                        totalCantidadCuartaEspecie3: parseInt(item.totalesCuartaEspecie3[0]?.totalCantidadCuartaEspecie3 || 0),

                        totalPesoQuintaEspecie3: parseFloat(item.totalesQuintaEspecie3[0]?.totalPesoQuintaEspecie3 || 0),
                        totalPesoDescuentoQuintaEspecie3: parseFloat(item.totalesQuintaEspecie3[0]?.totalPesoDescuentoQuintaEspecie3 || 0),
                        totalVentaQuintaEspecie3: parseFloat(item.totalesQuintaEspecie3[0]?.totalVentaQuintaEspecie3 || 0),
                        totalCantidadQuintaEspecie3: parseInt(item.totalesQuintaEspecie3[0]?.totalCantidadQuintaEspecie3 || 0),

                        totalPesoSextaEspecie3: parseFloat(item.totalesSextaEspecie3[0]?.totalPesoSextaEspecie3 || 0),
                        totalPesoDescuentoSextaEspecie3: parseFloat(item.totalesSextaEspecie3[0]?.totalPesoDescuentoSextaEspecie3 || 0),
                        totalVentaSextaEspecie3: parseFloat(item.totalesSextaEspecie3[0]?.totalVentaSextaEspecie3 || 0),
                        totalCantidadSextaEspecie3: parseInt(item.totalesSextaEspecie3[0]?.totalCantidadSextaEspecie3 || 0),

                        totalPesoSeptimaEspecie3: parseFloat(item.totalesSeptimaEspecie3[0]?.totalPesoSeptimaEspecie3 || 0),
                        totalPesoDescuentoSeptimaEspecie3: parseFloat(item.totalesSeptimaEspecie3[0]?.totalPesoDescuentoSeptimaEspecie3 || 0),
                        totalVentaSeptimaEspecie3: parseFloat(item.totalesSeptimaEspecie3[0]?.totalVentaSeptimaEspecie3 || 0),
                        totalCantidadSeptimaEspecie3: parseInt(item.totalesSeptimaEspecie3[0]?.totalCantidadSeptimaEspecie3 || 0),

                        totalPesoOctavaEspecie3: parseFloat(item.totalesOctavaEspecie3[0]?.totalPesoOctavaEspecie3 || 0),
                        totalPesoDescuentoOctavaEspecie3: parseFloat(item.totalesOctavaEspecie3[0]?.totalPesoDescuentoOctavaEspecie3 || 0),
                        totalVentaOctavaEspecie3: parseFloat(item.totalesOctavaEspecie3[0]?.totalVentaOctavaEspecie3 || 0),
                        totalCantidadOctavaEspecie3: parseInt(item.totalesOctavaEspecie3[0]?.totalCantidadOctavaEspecie3 || 0),

                        totalPesoDecimaEspecie3: parseFloat(item.totalesDecimaEspecie3[0]?.totalPesoDecimaEspecie3 || 0),
                        totalPesoDescuentoDecimaEspecie3: parseFloat(item.totalesDecimaEspecie3[0]?.totalPesoDescuentoDecimaEspecie3 || 0),
                        totalVentaDecimaEspecie3: parseFloat(item.totalesDecimaEspecie3[0]?.totalVentaDecimaEspecie3 || 0),
                        totalCantidadDecimaEspecie3: parseInt(item.totalesDecimaEspecie3[0]?.totalCantidadDecimaEspecie3 || 0),

                        totalPesoDecimaPrimeraEspecie3: parseFloat(item.totalesDecimaPrimeraEspecie3[0]?.totalPesoDecimaPrimeraEspecie3 || 0),
                        totalPesoDescuentoDecimaPrimeraEspecie3: parseFloat(item.totalesDecimaPrimeraEspecie3[0]?.totalPesoDescuentoDecimaPrimeraEspecie3 || 0),
                        totalVentaDecimaPrimeraEspecie3: parseFloat(item.totalesDecimaPrimeraEspecie3[0]?.totalVentaDecimaPrimeraEspecie3 || 0),
                        totalCantidadDecimaPrimeraEspecie3: parseInt(item.totalesDecimaPrimeraEspecie3[0]?.totalCantidadDecimaPrimeraEspecie3 || 0),

                        totalPesoDecimaSegundaEspecie3: parseFloat(item.totalesDecimaSegundaEspecie3[0]?.totalPesoDecimaSegundaEspecie3 || 0),
                        totalPesoDescuentoDecimaSegundaEspecie3: parseFloat(item.totalesDecimaSegundaEspecie3[0]?.totalPesoDescuentoDecimaSegundaEspecie3 || 0),
                        totalVentaDecimaSegundaEspecie3: parseFloat(item.totalesDecimaSegundaEspecie3[0]?.totalVentaDecimaSegundaEspecie3 || 0),
                        totalCantidadDecimaSegundaEspecie3: parseInt(item.totalesDecimaSegundaEspecie3[0]?.totalCantidadDecimaSegundaEspecie3 || 0),

                        totalPesoDecimaTerceraEspecie3: parseFloat(item.totalesDecimaTerceraEspecie3[0]?.totalPesoDecimaTerceraEspecie3 || 0),
                        totalPesoDescuentoDecimaTerceraEspecie3: parseFloat(item.totalesDecimaTerceraEspecie3[0]?.totalPesoDescuentoDecimaTerceraEspecie3 || 0),
                        totalVentaDecimaTerceraEspecie3: parseFloat(item.totalesDecimaTerceraEspecie3[0]?.totalVentaDecimaTerceraEspecie3 || 0),
                        totalCantidadDecimaTerceraEspecie3: parseInt(item.totalesDecimaTerceraEspecie3[0]?.totalCantidadDecimaTerceraEspecie3 || 0),

                        totalPesoDecimaCuartaEspecie3: parseFloat(item.totalesDecimaCuartaEspecie3[0]?.totalPesoDecimaCuartaEspecie3 || 0),
                        totalPesoDescuentoDecimaCuartaEspecie3: parseFloat(item.totalesDecimaCuartaEspecie3[0]?.totalPesoDescuentoDecimaCuartaEspecie3 || 0),
                        totalVentaDecimaCuartaEspecie3: parseFloat(item.totalesDecimaCuartaEspecie3[0]?.totalVentaDecimaCuartaEspecie3 || 0),
                        totalCantidadDecimaCuartaEspecie3: parseInt(item.totalesDecimaCuartaEspecie3[0]?.totalCantidadDecimaCuartaEspecie3 || 0),

                        totalPesoDecimaQuintaEspecie3: parseFloat(item.totalesDecimaQuintaEspecie3[0]?.totalPesoDecimaQuintaEspecie3 || 0),
                        totalPesoDescuentoDecimaQuintaEspecie3: parseFloat(item.totalesDecimaQuintaEspecie3[0]?.totalPesoDescuentoDecimaQuintaEspecie3 || 0),
                        totalVentaDecimaQuintaEspecie3: parseFloat(item.totalesDecimaQuintaEspecie3[0]?.totalVentaDecimaQuintaEspecie3 || 0),
                        totalCantidadDecimaQuintaEspecie3: parseInt(item.totalesDecimaQuintaEspecie3[0]?.totalCantidadDecimaQuintaEspecie3 || 0),

                        totalPesoDecimaSextaEspecie3: parseFloat(item.totalesDecimaSextaEspecie3[0]?.totalPesoDecimaSextaEspecie3 || 0),
                        totalPesoDescuentoDecimaSextaEspecie3: parseFloat(item.totalesDecimaSextaEspecie3[0]?.totalPesoDescuentoDecimaSextaEspecie3 || 0),
                        totalVentaDecimaSextaEspecie3: parseFloat(item.totalesDecimaSextaEspecie3[0]?.totalVentaDecimaSextaEspecie3 || 0),
                        totalCantidadDecimaSextaEspecie3: parseInt(item.totalesDecimaSextaEspecie3[0]?.totalCantidadDecimaSextaEspecie3 || 0),

                        totalPesoDecimaSeptimaEspecie3: parseFloat(item.totalesDecimaSeptimaEspecie3[0]?.totalPesoDecimaSeptimaEspecie3 || 0),
                        totalPesoDescuentoDecimaSeptimaEspecie3: parseFloat(item.totalesDecimaSeptimaEspecie3[0]?.totalPesoDescuentoDecimaSeptimaEspecie3 || 0),
                        totalVentaDecimaSeptimaEspecie3: parseFloat(item.totalesDecimaSeptimaEspecie3[0]?.totalVentaDecimaSeptimaEspecie3 || 0),
                        totalCantidadDecimaSeptimaEspecie3: parseInt(item.totalesDecimaSeptimaEspecie3[0]?.totalCantidadDecimaSeptimaEspecie3 || 0),

                        totalPesoDecimaOctavaEspecie3: parseFloat(item.totalesDecimaOctavaEspecie3[0]?.totalPesoDecimaOctavaEspecie3 || 0),
                        totalPesoDescuentoDecimaOctavaEspecie3: parseFloat(item.totalesDecimaOctavaEspecie3[0]?.totalPesoDescuentoDecimaOctavaEspecie3 || 0),
                        totalVentaDecimaOctavaEspecie3: parseFloat(item.totalesDecimaOctavaEspecie3[0]?.totalVentaDecimaOctavaEspecie3 || 0),
                        totalCantidadDecimaOctavaEspecie3: parseInt(item.totalesDecimaOctavaEspecie3[0]?.totalCantidadDecimaOctavaEspecie3 || 0),

                        totalPesoDecimaNovenaEspecie3: parseFloat(item.totalesDecimaNovenaEspecie3[0]?.totalPesoDecimaNovenaEspecie3 || 0),
                        totalPesoDescuentoDecimaNovenaEspecie3: parseFloat(item.totalesDecimaNovenaEspecie3[0]?.totalPesoDescuentoDecimaNovenaEspecie3 || 0),
                        totalVentaDecimaNovenaEspecie3: parseFloat(item.totalesDecimaNovenaEspecie3[0]?.totalVentaDecimaNovenaEspecie3 || 0),
                        totalCantidadDecimaNovenaEspecie3: parseInt(item.totalesDecimaNovenaEspecie3[0]?.totalCantidadDecimaNovenaEspecie3 || 0),

                        totalPesoVigesimaEspecie3: parseFloat(item.totalesVigesimaEspecie3[0]?.totalPesoVigesimaEspecie3 || 0),
                        totalPesoDescuentoVigesimaEspecie3: parseFloat(item.totalesVigesimaEspecie3[0]?.totalPesoDescuentoVigesimaEspecie3 || 0),
                        totalVentaVigesimaEspecie3: parseFloat(item.totalesVigesimaEspecie3[0]?.totalVentaVigesimaEspecie3 || 0),
                        totalCantidadVigesimaEspecie3: parseInt(item.totalesVigesimaEspecie3[0]?.totalCantidadVigesimaEspecie3 || 0),

                        totalPesoVigesimaPrimeraEspecie3: parseFloat(item.totalesVigesimaPrimeraEspecie3[0]?.totalPesoVigesimaPrimeraEspecie3 || 0),
                        totalPesoDescuentoVigesimaPrimeraEspecie3: parseFloat(item.totalesVigesimaPrimeraEspecie3[0]?.totalPesoDescuentoVigesimaPrimeraEspecie3 || 0),
                        totalVentaVigesimaPrimeraEspecie3: parseFloat(item.totalesVigesimaPrimeraEspecie3[0]?.totalVentaVigesimaPrimeraEspecie3 || 0),
                        totalCantidadVigesimaPrimeraEspecie3: parseInt(item.totalesVigesimaPrimeraEspecie3[0]?.totalCantidadVigesimaPrimeraEspecie3 || 0),

                        totalPesoVigesimaSegundaEspecie3: parseFloat(item.totalesVigesimaSegundaEspecie3[0]?.totalPesoVigesimaSegundaEspecie3 || 0),
                        totalPesoDescuentoVigesimaSegundaEspecie3: parseFloat(item.totalesVigesimaSegundaEspecie3[0]?.totalPesoDescuentoVigesimaSegundaEspecie3 || 0),
                        totalVentaVigesimaSegundaEspecie3: parseFloat(item.totalesVigesimaSegundaEspecie3[0]?.totalVentaVigesimaSegundaEspecie3 || 0),
                        totalCantidadVigesimaSegundaEspecie3: parseInt(item.totalesVigesimaSegundaEspecie3[0]?.totalCantidadVigesimaSegundaEspecie3 || 0),

                        totalPesoVigesimaTerceraEspecie3: parseFloat(item.totalesVigesimaTerceraEspecie3[0]?.totalPesoVigesimaTerceraEspecie3 || 0),
                        totalPesoDescuentoVigesimaTerceraEspecie3: parseFloat(item.totalesVigesimaTerceraEspecie3[0]?.totalPesoDescuentoVigesimaTerceraEspecie3 || 0),
                        totalVentaVigesimaTerceraEspecie3: parseFloat(item.totalesVigesimaTerceraEspecie3[0]?.totalVentaVigesimaTerceraEspecie3 || 0),
                        totalCantidadVigesimaTerceraEspecie3: parseInt(item.totalesVigesimaTerceraEspecie3[0]?.totalCantidadVigesimaTerceraEspecie3 || 0),

                        totalCantidadNovenaEspecie3: parseInt(item.totalesNovenaEspecie3[0]?.totalCantidadNovenaEspecie3 || 0),
                        
                        totalCantidadDescuentoPrimerEspecie3: parseInt(item.totalesPrimerEspecie3[0]?.totalCantidadDescuentoPrimerEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoPrimerEspecie3: parseFloat(item.totalesPrimerEspecie3[0]?.totalVentaDescuentoPrimerEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoSegundaEspecie3: parseInt(item.totalesSegundaEspecie3[0]?.totalCantidadDescuentoSegundaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSegundaEspecie3: parseFloat(item.totalesSegundaEspecie3[0]?.totalVentaDescuentoSegundaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoTerceraEspecie3: parseInt(item.totalesTerceraEspecie3[0]?.totalCantidadDescuentoTerceraEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoTerceraEspecie3: parseFloat(item.totalesTerceraEspecie3[0]?.totalVentaDescuentoTerceraEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoCuartaEspecie3: parseInt(item.totalesCuartaEspecie3[0]?.totalCantidadDescuentoCuartaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoCuartaEspecie3: parseFloat(item.totalesCuartaEspecie3[0]?.totalVentaDescuentoCuartaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoQuintaEspecie3: parseInt(item.totalesQuintaEspecie3[0]?.totalCantidadDescuentoQuintaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoQuintaEspecie3: parseFloat(item.totalesQuintaEspecie3[0]?.totalVentaDescuentoQuintaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoSextaEspecie3: parseInt(item.totalesSextaEspecie3[0]?.totalCantidadDescuentoSextaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSextaEspecie3: parseFloat(item.totalesSextaEspecie3[0]?.totalVentaDescuentoSextaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoSeptimaEspecie3: parseInt(item.totalesSeptimaEspecie3[0]?.totalCantidadDescuentoSeptimaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoSeptimaEspecie3: parseFloat(item.totalesSeptimaEspecie3[0]?.totalVentaDescuentoSeptimaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoOctavaEspecie3: parseInt(item.totalesOctavaEspecie3[0]?.totalCantidadDescuentoOctavaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoOctavaEspecie3: parseFloat(item.totalesOctavaEspecie3[0]?.totalVentaDescuentoOctavaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaEspecie3: parseInt(item.totalesDecimaEspecie3[0]?.totalCantidadDescuentoDecimaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaEspecie3: parseFloat(item.totalesDecimaEspecie3[0]?.totalVentaDescuentoDecimaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaPrimeraEspecie3: parseInt(item.totalesDecimaPrimeraEspecie3[0]?.totalCantidadDescuentoDecimaPrimeraEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaPrimeraEspecie3: parseFloat(item.totalesDecimaPrimeraEspecie3[0]?.totalVentaDescuentoDecimaPrimeraEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaSegundaEspecie3: parseInt(item.totalesDecimaSegundaEspecie3[0]?.totalCantidadDescuentoDecimaSegundaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaSegundaEspecie3: parseFloat(item.totalesDecimaSegundaEspecie3[0]?.totalVentaDescuentoDecimaSegundaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaTerceraEspecie3: parseInt(item.totalesDecimaTerceraEspecie3[0]?.totalCantidadDescuentoDecimaTerceraEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaTerceraEspecie3: parseFloat(item.totalesDecimaTerceraEspecie3[0]?.totalVentaDescuentoDecimaTerceraEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaCuartaEspecie3: parseInt(item.totalesDecimaCuartaEspecie3[0]?.totalCantidadDescuentoDecimaCuartaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaCuartaEspecie3: parseFloat(item.totalesDecimaCuartaEspecie3[0]?.totalVentaDescuentoDecimaCuartaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaQuintaEspecie3: parseInt(item.totalesDecimaQuintaEspecie3[0]?.totalCantidadDescuentoDecimaQuintaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaQuintaEspecie3: parseFloat(item.totalesDecimaQuintaEspecie3[0]?.totalVentaDescuentoDecimaQuintaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaSextaEspecie3: parseInt(item.totalesDecimaSextaEspecie3[0]?.totalCantidadDescuentoDecimaSextaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaSextaEspecie3: parseFloat(item.totalesDecimaSextaEspecie3[0]?.totalVentaDescuentoDecimaSextaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoDecimaSeptimaEspecie3: parseInt(item.totalesDecimaSeptimaEspecie3[0]?.totalCantidadDescuentoDecimaSeptimaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaSeptimaEspecie3: parseFloat(item.totalesDecimaSeptimaEspecie3[0]?.totalVentaDescuentoDecimaSeptimaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoDecimaOctavaEspecie3: parseInt(item.totalesDecimaOctavaEspecie3[0]?.totalCantidadDescuentoDecimaOctavaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaOctavaEspecie3: parseFloat(item.totalesDecimaOctavaEspecie3[0]?.totalVentaDescuentoDecimaOctavaEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        totalCantidadDescuentoDecimaNovenaEspecie3: parseInt(item.totalesDecimaNovenaEspecie3[0]?.totalCantidadDescuentoDecimaNovenaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoDecimaNovenaEspecie3: parseFloat(item.totalesDecimaNovenaEspecie3[0]?.totalVentaDescuentoDecimaNovenaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaEspecie3: parseInt(item.totalesVigesimaEspecie3[0]?.totalCantidadDescuentoVigesimaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaEspecie3: parseFloat(item.totalesVigesimaEspecie3[0]?.totalVentaDescuentoVigesimaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaPrimeraEspecie3: parseInt(item.totalesVigesimaPrimeraEspecie3[0]?.totalCantidadDescuentoVigesimaPrimeraEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaPrimeraEspecie3: parseFloat(item.totalesVigesimaPrimeraEspecie3[0]?.totalVentaDescuentoVigesimaPrimeraEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaSegundaEspecie3: parseInt(item.totalesVigesimaSegundaEspecie3[0]?.totalCantidadDescuentoVigesimaSegundaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaSegundaEspecie3: parseFloat(item.totalesVigesimaSegundaEspecie3[0]?.totalVentaDescuentoVigesimaSegundaEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        
                        totalCantidadDescuentoVigesimaTerceraEspecie3: parseInt(item.totalesVigesimaTerceraEspecie3[0]?.totalCantidadDescuentoVigesimaTerceraEspecie3.replace(/[^0-9.-]+/g,"") || 0),
                        totalVentaDescuentoVigesimaTerceraEspecie3: parseFloat(item.totalesVigesimaTerceraEspecie3[0]?.totalVentaDescuentoVigesimaTerceraEspecie3.replace(/[^0-9.-]+/g,"") || 0),

                        /* ================================================================== */
                        /* ================================================================== */
                        /* ================================================================== */
                        ventaAnterior: parseFloat(item.ventaAnterior || 0),
                        ventaAnterior2: parseFloat(item.ventaAnterior2 || 0),
                        ventaAnterior3: parseFloat(item.ventaAnterior3 || 0),

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
                    "DecimaOctavaEspecie",
                    "DecimaNovenaEspecie",
                    "VigesimaEspecie",
                    "VigesimaPrimeraEspecie",
                    "VigesimaSegundaEspecie",
                    "VigesimaTerceraEspecie",
                    "NovenaEspecie"
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
                        const key3 = property + especie + "3";
                        const value1 = item[key] || 0;
                        const value2 = item[key2] || 0;
                        const value3 = item[key3] || 0;
                        const combinedValue = value1 + value2 + value3;
                  
                        processedItem[key] = combinedValue;
                      });
                    });
                  
                    // Procesar propiedades adicionales
                    $.each(additionalProperties, function(propertyIndex, property) {
                      if (property === "ventaAnterior") {
                        const ventaAnterior = parseFloat(item["ventaAnterior"] || 0);
                        const ventaAnterior2 = parseFloat(item["ventaAnterior2"] || 0);
                        const ventaAnterior3 = parseFloat(item["ventaAnterior3"] || 0);
                        processedItem["ventaAnterior"] = ventaAnterior + ventaAnterior2 + ventaAnterior3;
                      } else {
                        const value = (property in item) ? item[property] : 0;
                        processedItem[property] = value;
                      }
                    });
                  
                    processedData.push(processedItem);
                  });
                  
                  fn_construirFilasReporteAcumuladoDetalleExcel(processedData);                                       

            },
            error: function (error) {
                console.error("ERROR", error);
            },
        });
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
        fn_llamarAcumuladoConEskeleto(fechaEnviarTexto,fechaEnviarTexto);
        // fn_TraerReporteAcumuladoDetalle(fechaEnviarTexto,fechaEnviarTexto);
        
        let fechaFormateadaClick = formatearFecha(fechaEnviar);
        $("#fechaReporteExcelTitle").text(fechaFormateadaClick);
    });    

    function fn_construirFilasReporteAcumuladoDetalleExcel(combinedDataArray){
        let bodyReporteAcumuladoExcel="";

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
        let cantidad19 = 0;
        let cantidad20 = 0;
        let cantidad21 = 0;
        let cantidad22 = 0;
        let cantidad23 = 0;
        let cantidad9 = 0;

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
        let peso19 = 0.00;
        let peso20 = 0.00;
        let peso21 = 0.00;
        let peso22 = 0.00;
        let peso23 = 0.00;

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
        let venta19 = 0.00;
        let venta20 = 0.00;
        let venta21 = 0.00;
        let venta22 = 0.00;
        let venta23 = 0.00;

        let totalSaldoAnteriorSubTotales = 0;
        let totalSaldoActualSubTotales = 0;
        let totalCobranzaSubTotales = 0;
        let totalNuevoSaldoSubTotales = 0;

        let totalPesoDescTotalFor = 0;
        let totalVentaDescTotalFor = 0;
        let totalPrecioVentaDescTotalFor = 0;
        let contadorTotalPrecioVentaDescTotal = 0;

        combinedDataArray.forEach(function (item) {
            bodyReporteAcumuladoExcel += construirFilaExcel(item);

            peso1 += parseFloat(item.totalPesoPrimerEspecie) + parseFloat(item.totalPesoDescuentoPrimerEspecie);
            peso2 += parseFloat(item.totalPesoSegundaEspecie) + parseFloat(item.totalPesoDescuentoSegundaEspecie);
            peso3 += parseFloat(item.totalPesoTerceraEspecie) + parseFloat(item.totalPesoDescuentoTerceraEspecie);
            peso4 += parseFloat(item.totalPesoCuartaEspecie) + parseFloat(item.totalPesoDescuentoCuartaEspecie);
            peso5 += parseFloat(item.totalPesoQuintaEspecie) + parseFloat(item.totalPesoDescuentoQuintaEspecie);
            peso6 += parseFloat(item.totalPesoSextaEspecie) + parseFloat(item.totalPesoDescuentoSextaEspecie);
            peso7 += parseFloat(item.totalPesoSeptimaEspecie) + parseFloat(item.totalPesoDescuentoSeptimaEspecie);
            peso8 += parseFloat(item.totalPesoOctavaEspecie) + parseFloat(item.totalPesoDescuentoOctavaEspecie);
            peso10 += parseFloat(item.totalPesoDecimaEspecie) + parseFloat(item.totalPesoDescuentoDecimaEspecie);
            peso11 += parseFloat(item.totalPesoDecimaPrimeraEspecie) + parseFloat(item.totalPesoDescuentoDecimaPrimeraEspecie);
            peso12 += parseFloat(item.totalPesoDecimaSegundaEspecie) + parseFloat(item.totalPesoDescuentoDecimaSegundaEspecie);
            peso13 += parseFloat(item.totalPesoDecimaTerceraEspecie) + parseFloat(item.totalPesoDescuentoDecimaTerceraEspecie);
            peso14 += parseFloat(item.totalPesoDecimaCuartaEspecie) + parseFloat(item.totalPesoDescuentoDecimaCuartaEspecie);
            peso15 += parseFloat(item.totalPesoDecimaQuintaEspecie) + parseFloat(item.totalPesoDescuentoDecimaQuintaEspecie);
            peso16 += parseFloat(item.totalPesoDecimaSextaEspecie) + parseFloat(item.totalPesoDescuentoDecimaSextaEspecie);
            peso17 += parseFloat(item.totalPesoDecimaSeptimaEspecie) + parseFloat(item.totalPesoDescuentoDecimaSeptimaEspecie);
            peso18 += parseFloat(item.totalPesoDecimaOctavaEspecie) + parseFloat(item.totalPesoDescuentoDecimaOctavaEspecie);
            peso19 += parseFloat(item.totalPesoDecimaNovenaEspecie) + parseFloat(item.totalPesoDescuentoDecimaNovenaEspecie);
            peso20 += parseFloat(item.totalPesoVigesimaEspecie) + parseFloat(item.totalPesoDescuentoVigesimaEspecie);
            peso21 += parseFloat(item.totalPesoVigesimaPrimeraEspecie) + parseFloat(item.totalPesoDescuentoVigesimaPrimeraEspecie);
            peso22 += parseFloat(item.totalPesoVigesimaSegundaEspecie) + parseFloat(item.totalPesoDescuentoVigesimaSegundaEspecie);
            peso23 += parseFloat(item.totalPesoVigesimaTerceraEspecie) + parseFloat(item.totalPesoDescuentoVigesimaTerceraEspecie);

            cantidad1 += parseInt(item.totalCantidadPrimerEspecie) + parseInt(item.totalCantidadDescuentoPrimerEspecie);
            cantidad2 += parseInt(item.totalCantidadSegundaEspecie) + parseInt(item.totalCantidadDescuentoSegundaEspecie);
            cantidad3 += parseInt(item.totalCantidadTerceraEspecie) + parseInt(item.totalCantidadDescuentoTerceraEspecie);
            cantidad4 += parseInt(item.totalCantidadCuartaEspecie) + parseInt(item.totalCantidadDescuentoCuartaEspecie);
            cantidad5 += parseInt(item.totalCantidadQuintaEspecie) + parseInt(item.totalCantidadDescuentoQuintaEspecie);
            cantidad6 += parseInt(item.totalCantidadSextaEspecie) + parseInt(item.totalCantidadDescuentoSextaEspecie);
            cantidad7 += parseInt(item.totalCantidadSeptimaEspecie) + parseInt(item.totalCantidadDescuentoSeptimaEspecie);
            cantidad8 += parseInt(item.totalCantidadOctavaEspecie) + parseInt(item.totalCantidadDescuentoOctavaEspecie);
            cantidad10 += parseInt(item.totalCantidadDecimaEspecie) + parseInt(item.totalCantidadDescuentoDecimaEspecie);
            cantidad11 += parseInt(item.totalCantidadDecimaPrimeraEspecie) + parseInt(item.totalCantidadDescuentoDecimaPrimeraEspecie);
            cantidad12 += parseInt(item.totalCantidadDecimaSegundaEspecie) + parseInt(item.totalCantidadDescuentoDecimaSegundaEspecie);
            cantidad13 += parseInt(item.totalCantidadDecimaTerceraEspecie) + parseInt(item.totalCantidadDescuentoDecimaTerceraEspecie);
            cantidad14 += parseInt(item.totalCantidadDecimaCuartaEspecie) + parseInt(item.totalCantidadDescuentoDecimaCuartaEspecie);
            cantidad15 += parseInt(item.totalCantidadDecimaQuintaEspecie) + parseInt(item.totalCantidadDescuentoDecimaQuintaEspecie);
            cantidad16 += parseInt(item.totalCantidadDecimaSextaEspecie) + parseInt(item.totalCantidadDescuentoDecimaSextaEspecie);
            cantidad17 += parseInt(item.totalCantidadDecimaSeptimaEspecie) + parseInt(item.totalCantidadDescuentoDecimaSeptimaEspecie);
            cantidad18 += parseInt(item.totalCantidadDecimaOctavaEspecie) + parseInt(item.totalCantidadDescuentoDecimaOctavaEspecie);
            cantidad19 += parseInt(item.totalCantidadDecimaNovenaEspecie) + parseInt(item.totalCantidadDescuentoDecimaNovenaEspecie);
            cantidad20 += parseInt(item.totalCantidadVigesimaEspecie) + parseInt(item.totalCantidadDescuentoVigesimaEspecie);
            cantidad21 += parseInt(item.totalCantidadVigesimaPrimeraEspecie) + parseInt(item.totalCantidadDescuentoVigesimaPrimeraEspecie);
            cantidad22 += parseInt(item.totalCantidadVigesimaSegundaEspecie) + parseInt(item.totalCantidadDescuentoVigesimaSegundaEspecie);
            cantidad23 += parseInt(item.totalCantidadVigesimaTerceraEspecie) + parseInt(item.totalCantidadDescuentoVigesimaTerceraEspecie);
            cantidad9 += parseInt(item.totalCantidadNovenaEspecie);

            venta1 += parseFloat(item.totalVentaPrimerEspecie) + parseFloat(item.totalVentaDescuentoPrimerEspecie);
            venta2 += parseFloat(item.totalVentaSegundaEspecie) + parseFloat(item.totalVentaDescuentoSegundaEspecie);
            venta3 += parseFloat(item.totalVentaTerceraEspecie) + parseFloat(item.totalVentaDescuentoTerceraEspecie);
            venta4 += parseFloat(item.totalVentaCuartaEspecie) + parseFloat(item.totalVentaDescuentoCuartaEspecie);
            venta5 += parseFloat(item.totalVentaQuintaEspecie) + parseFloat(item.totalVentaDescuentoQuintaEspecie);
            venta6 += parseFloat(item.totalVentaSextaEspecie) + parseFloat(item.totalVentaDescuentoSextaEspecie);
            venta7 += parseFloat(item.totalVentaSeptimaEspecie) + parseFloat(item.totalVentaDescuentoSeptimaEspecie);
            venta8 += parseFloat(item.totalVentaOctavaEspecie) + parseFloat(item.totalVentaDescuentoOctavaEspecie);
            venta10 += parseFloat(item.totalVentaDecimaEspecie) + parseFloat(item.totalVentaDescuentoDecimaEspecie);
            venta11 += parseFloat(item.totalVentaDecimaPrimeraEspecie) + parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie);
            venta12 += parseFloat(item.totalVentaDecimaSegundaEspecie) + parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie);
            venta13 += parseFloat(item.totalVentaDecimaTerceraEspecie) + parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie);
            venta14 += parseFloat(item.totalVentaDecimaCuartaEspecie) + parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie);
            venta15 += parseFloat(item.totalVentaDecimaQuintaEspecie) + parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie);
            venta16 += parseFloat(item.totalVentaDecimaSextaEspecie) + parseFloat(item.totalVentaDescuentoDecimaSextaEspecie);
            venta17 += parseFloat(item.totalVentaDecimaSeptimaEspecie) + parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie);
            venta18 += parseFloat(item.totalVentaDecimaOctavaEspecie) + parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie);
            venta19 += parseFloat(item.totalVentaDecimaNovenaEspecie) + parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie);
            venta20 += parseFloat(item.totalVentaVigesimaEspecie) + parseFloat(item.totalVentaDescuentoVigesimaEspecie);
            venta21 += parseFloat(item.totalVentaVigesimaPrimeraEspecie) + parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie);
            venta22 += parseFloat(item.totalVentaVigesimaSegundaEspecie) + parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie);
            venta23 += parseFloat(item.totalVentaVigesimaTerceraEspecie) + parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie);

            // ======================================================

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
            let totalVentaDecimaNovenaEspecie = parseFloat(item.totalVentaDecimaNovenaEspecie);
            let totalVentaVigesimaEspecie = parseFloat(item.totalVentaVigesimaEspecie);
            let totalVentaVigesimaPrimeraEspecie = parseFloat(item.totalVentaVigesimaPrimeraEspecie);
            let totalVentaVigesimaSegundaEspecie = parseFloat(item.totalVentaVigesimaSegundaEspecie);
            let totalVentaVigesimaTerceraEspecie = parseFloat(item.totalVentaVigesimaTerceraEspecie);

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
            let totalVentaDescuentoDecimaNovenaEspecie = parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie);
            let totalVentaDescuentoVigesimaEspecie = parseFloat(item.totalVentaDescuentoVigesimaEspecie);
            let totalVentaDescuentoVigesimaPrimeraEspecie = parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie);
            let totalVentaDescuentoVigesimaSegundaEspecie = parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie);
            let totalVentaDescuentoVigesimaTerceraEspecie = parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie);

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
            let ventaTotalDecimaNovenaEspecie = totalVentaDecimaNovenaEspecie + totalVentaDescuentoDecimaNovenaEspecie;
            let ventaTotalVigesimaEspecie = totalVentaVigesimaEspecie + totalVentaDescuentoVigesimaEspecie;
            let ventaTotalVigesimaPrimeraEspecie = totalVentaVigesimaPrimeraEspecie + totalVentaDescuentoVigesimaPrimeraEspecie;
            let ventaTotalVigesimaSegundaEspecie = totalVentaVigesimaSegundaEspecie + totalVentaDescuentoVigesimaSegundaEspecie;
            let ventaTotalVigesimaTerceraEspecie = totalVentaVigesimaTerceraEspecie + totalVentaDescuentoVigesimaTerceraEspecie;

            let ventaTotal = ventaTotalPrimerEspecie + ventaTotalSegundaEspecie + ventaTotalTerceraEspecie + ventaTotalCuartaEspecie + ventaTotalQuintaEspecie + ventaTotalSextaEspecie + ventaTotalSeptimaEspecie + ventaTotalOctavaEspecie + ventaTotalDecimaSextaEspecie + ventaTotalDecimaSeptimaEspecie + ventaTotalDecimaOctavaEspecie + ventaTotalDecimaNovenaEspecie + ventaTotalVigesimaEspecie + ventaTotalVigesimaPrimeraEspecie + ventaTotalVigesimaSegundaEspecie + ventaTotalVigesimaTerceraEspecie + item.totalVentaDescuento;

            // + ventaTotalDecimaEspecie + ventaTotalDecimaPrimeraEspecie + ventaTotalDecimaSegundaEspecie + ventaTotalDecimaTerceraEspecie + ventaTotalDecimaCuartaEspecie + ventaTotalDecimaQuintaEspecie +

            let ventaAnterior = parseFloat(item.ventaAnterior);
            let pagoAnterior = parseFloat(item.pagoAnterior);
            let descuentoAnterior = parseFloat(item.totalVentaDescuentoAnterior);

            let totalVentaAnterior = ventaAnterior - pagoAnterior + descuentoAnterior;

            let saldoDelDia = totalVentaAnterior + ventaTotal;

            let saldoActual = saldoDelDia - parseFloat(item.pagos);

            totalSaldoAnteriorSubTotales += totalVentaAnterior;
            totalSaldoActualSubTotales += saldoDelDia;
            totalCobranzaSubTotales += parseFloat(item.pagos);
            totalNuevoSaldoSubTotales += saldoActual;

            let totalPesoDescTotal = parseFloat(item.totalPesoDescuento);
            let totalVentaDescTotal = parseFloat(item.totalVentaDescuento);
            let totalPrecioVentaDescTotal = 0;

            if (totalVentaDescTotal != 0){
                totalPrecioVentaDescTotal = totalVentaDescTotal/totalPesoDescTotal;
            }else{
                totalPrecioVentaDescTotal = 0;
            }

            totalPesoDescTotalFor += totalPesoDescTotal;
            totalVentaDescTotalFor += totalVentaDescTotal;
            totalPrecioVentaDescTotalFor += totalPrecioVentaDescTotal;
            if (totalPrecioVentaDescTotal > 0){
                contadorTotalPrecioVentaDescTotal++;
            }

        });
        //console.log("bodyReporteAcumuladoExcel",bodyReporteAcumuladoExcel);
        bodyReporteAcumuladoExcel += construirFilaTotalExcel(cantidad1, cantidad2, cantidad3, cantidad4, cantidad5, cantidad6
            , cantidad7, cantidad8, cantidad10, cantidad11, cantidad12, cantidad13
            , cantidad14, cantidad15, cantidad16, cantidad17, cantidad18, cantidad19, cantidad20, cantidad21, cantidad22, cantidad23, cantidad9,
            peso1, peso2, peso3 , peso4, peso5, peso6, peso7, peso8, peso10
            , peso11, peso12, peso13, peso14, peso15, peso16, peso17, peso18, peso19, peso20, peso21, peso22, peso23
            , venta1, venta2, venta3, venta4, venta5, venta6, venta7, venta8
            , venta10, venta11, venta12, venta13, venta14, venta15, venta16
            , venta17, venta18, venta19, venta20, venta21, venta22, venta23, totalSaldoAnteriorSubTotales, totalSaldoActualSubTotales, totalCobranzaSubTotales, totalNuevoSaldoSubTotales,
            totalPesoDescTotalFor,totalVentaDescTotalFor,totalPrecioVentaDescTotalFor, contadorTotalPrecioVentaDescTotal);
        
        let tbodyReporteAcumuladoExcel = $('#bodyReporteAcumuladoExcel');
        tbodyReporteAcumuladoExcel.empty();

        tbodyReporteAcumuladoExcel.html(bodyReporteAcumuladoExcel);
        $('#filtrarClienteReporteAcumuladoExcel').trigger('input');

        $("#contenedorRecalculandoDatos").removeClass('flex').addClass('hidden');

        $('#eskeleto').removeClass('sticky');
        $('#eskeleto').addClass('hidden');
        $('#divReporteAcumuladoDetalleExcel').addClass('overflow-auto');
        $('#divReporteAcumuladoDetalleExcel').removeClass('overflow-hidden h-full');

        $('#eskeletoUno').removeClass('sticky');
        $('#eskeletoUno').addClass('hidden');
        $('#divTotalesUno').addClass('overflow-auto');
        $('#divTotalesUno').removeClass('overflow-hidden h-full max-h-[550px]');

        $('#eskeletoDos').removeClass('sticky');
        $('#eskeletoDos').addClass('hidden');
        $('#divTotalesDos').addClass('overflow-auto');
        $('#divTotalesDos').removeClass('overflow-hidden h-full max-h-[300px]');

        let bodyReporteAcumuladoExcelTotales="";
        let tbodyReporteAcumuladoExcelTotales = $('#bodyReporteAcumuladoExcelTotales');
        tbodyReporteAcumuladoExcelTotales.empty();
        bodyReporteAcumuladoExcelTotales += construirFilaTotalesExcel();
        tbodyReporteAcumuladoExcelTotales.html(bodyReporteAcumuladoExcelTotales);

        let bodyReporteAcumuladoExcelTotalesTrozado="";
        let tbodyReporteAcumuladoExcelTotalesTrozado = $('#bodyReporteAcumuladoExcelTotalesTrozado');
        tbodyReporteAcumuladoExcelTotalesTrozado.empty();
        bodyReporteAcumuladoExcelTotalesTrozado += construirFilaTotalesExcelTrozado();
        tbodyReporteAcumuladoExcelTotalesTrozado.html(bodyReporteAcumuladoExcelTotalesTrozado);
    }

    var cantidadTotalesPrimerEspecie = 0
    var cantidadTotalesSegundaEspecie = 0
    var cantidadTotalesTerceraEspecie = 0
    var cantidadTotalesCuartaEspecie = 0
    var cantidadTotalesQuintaEspecie = 0
    var cantidadTotalesSextaEspecie = 0
    var cantidadTotalesSeptimaEspecie = 0
    var cantidadTotalesOctavaEspecie = 0
    var cantidadTotalesNovenaEspecie = 0
    var cantidadTotalesDecimaEspecie = 0
    var cantidadTotalesDecimaPrimeraEspecie = 0
    var cantidadTotalesDecimaSegundaEspecie = 0
    var cantidadTotalesDecimaTerceraEspecie = 0
    var cantidadTotalesDecimaCuartaEspecie = 0
    var cantidadTotalesDecimaQuintaEspecie = 0
    var cantidadTotalesDecimaSextaEspecie = 0
    var cantidadTotalesDecimaSeptimaEspecie = 0
    var cantidadTotalesDecimaOctavaEspecie = 0
    var cantidadTotalesDecimaNovenaEspecie = 0
    var cantidadTotalesVigesimaEspecie = 0
    var cantidadTotalesVigesimaPrimeraEspecie = 0
    var cantidadTotalesVigesimaSegundaEspecie = 0
    var cantidadTotalNovenaEspecie = 0

    var pesoTotalesPrimerEspecie = 0
    var pesoTotalesSegundaEspecie = 0
    var pesoTotalesTerceraEspecie = 0
    var pesoTotalesCuartaEspecie = 0
    var pesoTotalesQuintaEspecie = 0
    var pesoTotalesSextaEspecie = 0
    var pesoTotalesSeptimaEspecie = 0
    var pesoTotalesOctavaEspecie = 0
    var pesoTotalesNovenaEspecie = 0
    var pesoTotalesDecimaEspecie = 0
    var pesoTotalesDecimaPrimeraEspecie = 0
    var pesoTotalesDecimaSegundaEspecie = 0
    var pesoTotalesDecimaTerceraEspecie = 0
    var pesoTotalesDecimaCuartaEspecie = 0
    var pesoTotalesDecimaQuintaEspecie = 0
    var pesoTotalesDecimaSextaEspecie = 0
    var pesoTotalesDecimaSeptimaEspecie = 0
    var pesoTotalesDecimaOctavaEspecie = 0
    var pesoTotalesDecimaNovenaEspecie = 0
    var pesoTotalesVigesimaEspecie = 0
    var pesoTotalesVigesimaPrimeraEspecie = 0
    var pesoTotalesVigesimaSegundaEspecie = 0

    var precioTotalesPrimerEspecie = 0
    var precioTotalesSegundaEspecie = 0
    var precioTotalesTerceraEspecie = 0
    var precioTotalesCuartaEspecie = 0
    var precioTotalesQuintaEspecie = 0
    var precioTotalesSextaEspecie = 0
    var precioTotalesSeptimaEspecie = 0
    var precioTotalesOctavaEspecie = 0
    var precioTotalesNovenaEspecie = 0
    var precioTotalesDecimaEspecie = 0
    var precioTotalesDecimaPrimeraEspecie = 0
    var precioTotalesDecimaSegundaEspecie = 0
    var precioTotalesDecimaTerceraEspecie = 0
    var precioTotalesDecimaCuartaEspecie = 0
    var precioTotalesDecimaQuintaEspecie = 0
    var precioTotalesDecimaSextaEspecie = 0
    var precioTotalesDecimaSeptimaEspecie = 0
    var precioTotalesDecimaOctavaEspecie = 0
    var precioTotalesDecimaNovenaEspecie = 0
    var precioTotalesVigesimaEspecie = 0
    var precioTotalesVigesimaPrimeraEspecie = 0
    var precioTotalesVigesimaSegundaEspecie = 0

    function construirFilaTotalesExcel()
    {
        let cantidadTotalesEspecies = cantidadTotalesPrimerEspecie+cantidadTotalesSegundaEspecie+cantidadTotalesTerceraEspecie+cantidadTotalesCuartaEspecie+cantidadTotalesQuintaEspecie+cantidadTotalesSextaEspecie+cantidadTotalesSeptimaEspecie+cantidadTotalesOctavaEspecie+cantidadTotalesDecimaEspecie+cantidadTotalesDecimaPrimeraEspecie+cantidadTotalesDecimaSegundaEspecie+cantidadTotalesDecimaTerceraEspecie+cantidadTotalesDecimaCuartaEspecie+cantidadTotalesDecimaQuintaEspecie+cantidadTotalesDecimaSextaEspecie+cantidadTotalesDecimaSeptimaEspecie+cantidadTotalesDecimaOctavaEspecie+cantidadTotalesDecimaNovenaEspecie+cantidadTotalesVigesimaEspecie+cantidadTotalesVigesimaPrimeraEspecie+cantidadTotalesVigesimaSegundaEspecie+cantidadTotalNovenaEspecie

        let pesoTotalesEspecies = pesoTotalesPrimerEspecie+pesoTotalesSegundaEspecie+pesoTotalesTerceraEspecie+pesoTotalesCuartaEspecie+pesoTotalesQuintaEspecie+pesoTotalesSextaEspecie+pesoTotalesSeptimaEspecie+pesoTotalesOctavaEspecie+pesoTotalesDecimaQuintaEspecie+pesoTotalesDecimaSextaEspecie+pesoTotalesDecimaSeptimaEspecie+pesoTotalesDecimaOctavaEspecie+pesoTotalesDecimaNovenaEspecie+pesoTotalesVigesimaEspecie+pesoTotalesVigesimaPrimeraEspecie+pesoTotalesVigesimaSegundaEspecie+pesoTotalesNovenaEspecie+pesoTotalesDecimaEspecie+pesoTotalesDecimaPrimeraEspecie+pesoTotalesDecimaSegundaEspecie+pesoTotalesDecimaTerceraEspecie+pesoTotalesDecimaCuartaEspecie

        let precioTotalesEspecies = precioTotalesPrimerEspecie+precioTotalesSegundaEspecie+precioTotalesTerceraEspecie+precioTotalesCuartaEspecie+precioTotalesQuintaEspecie+precioTotalesSextaEspecie+precioTotalesSeptimaEspecie+precioTotalesOctavaEspecie+precioTotalesDecimaQuintaEspecie+precioTotalesDecimaSextaEspecie+precioTotalesDecimaSeptimaEspecie+precioTotalesDecimaOctavaEspecie+precioTotalesDecimaNovenaEspecie+precioTotalesVigesimaEspecie+precioTotalesVigesimaPrimeraEspecie+precioTotalesVigesimaSegundaEspecie+precioTotalesNovenaEspecie+precioTotalesDecimaEspecie+precioTotalesDecimaPrimeraEspecie+precioTotalesDecimaSegundaEspecie+precioTotalesDecimaTerceraEspecie+precioTotalesDecimaCuartaEspecie

        let pesoTotalNovenaEspecie = pesoTotalesNovenaEspecie+pesoTotalesDecimaEspecie+pesoTotalesDecimaPrimeraEspecie+pesoTotalesDecimaSegundaEspecie+pesoTotalesDecimaCuartaEspecie
        let precioTotalNovenaEspecie = precioTotalesNovenaEspecie+precioTotalesDecimaEspecie+precioTotalesDecimaPrimeraEspecie+precioTotalesDecimaSegundaEspecie+precioTotalesDecimaCuartaEspecie
        
        return `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">YUGO VIVO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesPrimerEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesPrimerEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesPrimerEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">YUGO PELADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesSegundaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesSegundaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesSegundaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">BRASA YUGO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaSextaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaSextaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaSextaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TECNICA VIVO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesTerceraEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesTerceraEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesTerceraEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TECNICA PELADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesCuartaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesCuartaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesCuartaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">BRASA TECNICA</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaSeptimaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaSeptimaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaSeptimaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO XX PELADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaQuintaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaQuintaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaQuintaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO XX VIVO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaOctavaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaOctavaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaOctavaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA DOBLE PELADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesQuintaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesQuintaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesQuintaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA DOBLE VIVO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaNovenaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaNovenaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaNovenaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">AHOGADOS</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesSextaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesSextaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesSextaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">SECOS</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesVigesimaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesVigesimaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesVigesimaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLO PELADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesSeptimaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesSeptimaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesSeptimaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLO VIVO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesVigesimaPrimeraEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesVigesimaPrimeraEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesVigesimaPrimeraEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO MUTILADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesOctavaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesOctavaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesOctavaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA CHICA VIVO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaTerceraEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaTerceraEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaTerceraEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">GALLINA CHICA PELADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesVigesimaSegundaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesVigesimaSegundaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesVigesimaSegundaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TROZADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalNovenaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalNovenaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalNovenaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-blue-600 border-b dark:border-gray-700 text-gray-200">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap font-bold">TOTAL :</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">${cantidadTotalesEspecies}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">${(pesoTotalesEspecies).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${(precioTotalesEspecies).toFixed(2)}</td> 
        </tr>
        `;
    }

    function construirFilaTotalesExcelTrozado()
    {
        let cantidadTotalesEspecies = cantidadTotalesNovenaEspecie+ cantidadTotalesDecimaEspecie+cantidadTotalesDecimaPrimeraEspecie+cantidadTotalesDecimaSegundaEspecie+cantidadTotalesDecimaCuartaEspecie+cantidadTotalesSextaEspecie+cantidadTotalesVigesimaEspecie+cantidadTotalesOctavaEspecie+cantidadTotalNovenaEspecie

        let pesoTotalesEspecies = pesoTotalesNovenaEspecie+pesoTotalesDecimaEspecie+pesoTotalesDecimaPrimeraEspecie+pesoTotalesDecimaSegundaEspecie+pesoTotalesDecimaCuartaEspecie+pesoTotalesSextaEspecie+pesoTotalesVigesimaEspecie+pesoTotalesOctavaEspecie

        let precioTotalesEspecies = precioTotalesNovenaEspecie+precioTotalesDecimaEspecie+precioTotalesDecimaPrimeraEspecie+precioTotalesDecimaSegundaEspecie+precioTotalesDecimaCuartaEspecie+precioTotalesSextaEspecie+precioTotalesVigesimaEspecie+precioTotalesOctavaEspecie
        
        let pesoTotalesEspeciesTrozado = pesoTotalesNovenaEspecie+pesoTotalesDecimaEspecie+pesoTotalesDecimaPrimeraEspecie+pesoTotalesDecimaSegundaEspecie+pesoTotalesDecimaCuartaEspecie

        let precioTotalesEspeciesTrozado = precioTotalesNovenaEspecie+precioTotalesDecimaEspecie+precioTotalesDecimaPrimeraEspecie+precioTotalesDecimaSegundaEspecie+precioTotalesDecimaCuartaEspecie

        return `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">AHOGADOS</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesSextaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesSextaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesSextaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">SECOS</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesVigesimaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesVigesimaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesVigesimaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">POLLO MUTILADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesOctavaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesOctavaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesOctavaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 tdMostrarTrozado">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">TROZADO</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalNovenaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesEspeciesTrozado).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesEspeciesTrozado).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">PECHUGA</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesNovenaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesNovenaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesNovenaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">PIERNA</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">ALAS</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaPrimeraEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaPrimeraEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaPrimeraEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">MENUDENCIA</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaSegundaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaSegundaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaSegundaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 trozadoOculto hidden">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap">OTROS</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${cantidadTotalesDecimaCuartaEspecie}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">${(pesoTotalesDecimaCuartaEspecie).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap">S/. ${(precioTotalesDecimaCuartaEspecie).toFixed(2)}</td> 
        </tr>
        <tr class="bg-blue-600 border-b dark:border-gray-700 text-gray-200">
            <td class="text-sm text-left border-2 py-1 px-2 whitespace-nowrap font-bold">TOTAL :</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">${cantidadTotalesEspecies}</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">${(pesoTotalesEspecies).toFixed(2)} Kg.</td>
            <td class="text-sm text-center border-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${(precioTotalesEspecies).toFixed(2)}</td> 
        </tr>
        `;
    }

    function construirFilaTotalExcel(
        cantidad1, cantidad2, cantidad3, cantidad4, cantidad5, cantidad6
            , cantidad7, cantidad8, cantidad10, cantidad11, cantidad12, cantidad13
            , cantidad14, cantidad15, cantidad16, cantidad17, cantidad18, cantidad19, cantidad20, cantidad21, cantidad22, cantidad23, cantidad9,
            peso1, peso2, peso3 , peso4, peso5, peso6, peso7, peso8, peso10
            , peso11, peso12, peso13, peso14, peso15, peso16, peso17, peso18, peso19, peso20, peso21, peso22, peso23
            , venta1, venta2, venta3, venta4, venta5, venta6, venta7, venta8
            , venta10, venta11, venta12, venta13, venta14, venta15, venta16
            , venta17, venta18, venta19, venta20, venta21, venta22, venta23, totalSaldoAnteriorSubTotales, totalSaldoActualSubTotales, totalCobranzaSubTotales, totalNuevoSaldoSubTotales,
            totalPesoDescTotalFor,totalVentaDescTotalFor,totalPrecioVentaDescTotalFor, contadorTotalPrecioVentaDescTotal) {

        let totalPrecioVentaDescTotalFinal = 0;

        if (totalPrecioVentaDescTotalFor != 0 && contadorTotalPrecioVentaDescTotal > 0){
            totalPrecioVentaDescTotalFinal = totalPrecioVentaDescTotalFor / contadorTotalPrecioVentaDescTotal;
        }

        let totalDeSubtotales = venta1 + venta2 + venta3 + venta4 + venta5 + venta6 + venta7 + venta8 + venta10 + venta11 + venta12 + venta13 + venta14 + venta15 + venta16 + venta17 + venta18 + venta19 + venta20 + venta21 + venta22 + venta23;
        let totalCantidadSubTotales = cantidad1 + cantidad2 + cantidad3 + cantidad4 + cantidad5 + cantidad6 + cantidad7 + cantidad8 + cantidad10 + cantidad11 + cantidad12 + cantidad13 + cantidad14 + cantidad15 + cantidad16 + cantidad17 + cantidad18 + cantidad19 + cantidad20 + cantidad21 + cantidad22 + cantidad23 + cantidad9;
        let totalPesoSubTotales = peso1 + peso2 + peso3 + peso4 + peso5 + peso6 + peso7 + peso8 + peso10 + peso11 + peso12 + peso13 + peso14 + peso15 + peso16 + peso17 + peso18 + peso19 + peso20 + peso21 + peso22+ peso23;
        
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

        let precio4 = 0;
        if (venta4 != 0 && peso4 != 0){
            precio4 = venta4 / peso4;
        }
        let promedio4 = 0;
        if (peso4 != 0 && cantidad4 != 0){
            promedio4 = peso4 / cantidad4;
        }

        let precio5 = 0;
        if (venta5 != 0 && peso5 != 0){
            precio5 = venta5 / peso5;
        }
        let promedio5 = 0;
        if (peso5 != 0 && cantidad5 != 0){
            promedio5 = peso5 / cantidad5;
        }

        let precio6 = 0;
        if (venta6 != 0 && peso6 != 0){
            precio6 = venta6 / peso6;
        }
        let promedio6 = 0;
        if (peso6 != 0 && cantidad6 != 0){
            promedio6 = peso6 / cantidad6;
        }

        let precio7 = 0;
        if (venta7 != 0 && peso7 != 0){
            precio7 = venta7 / peso7;
        }
        let promedio7 = 0;
        if (peso7 != 0 && cantidad7 != 0){
            promedio7 = peso7 / cantidad7;
        }

        let precio8 = 0;
        if (venta8 != 0 && peso8 != 0){
            precio8 = venta8 / peso8;
        }
        let promedio8 = 0;
        if (peso8 != 0 && cantidad8 != 0){
            promedio8 = peso8 / cantidad8;
        }

        let precio10 = 0;
        if (venta10 != 0 && peso10 != 0){
            precio10 = venta10 / peso10;
        }
        let promedio10 = 0;
        if (peso10 != 0 && cantidad10 != 0){
            promedio10 = peso10 / cantidad10;
        }

        let precio11 = 0;
        if (venta11 != 0 && peso11 != 0){
            precio11 = venta11 / peso11;
        }
        let promedio11 = 0;
        if (peso11 != 0 && cantidad11 != 0){
            promedio11 = peso11 / cantidad11;
        }

        let precio12 = 0;
        if (venta12 != 0 && peso12 != 0){
            precio12 = venta12 / peso12;
        }
        let promedio12 = 0;
        if (peso12 != 0 && cantidad12 != 0){
            promedio12 = peso12 / cantidad12;
        }

        let precio13 = 0;
        if (venta13 != 0 && peso13 != 0){
            precio13 = venta13 / peso13;
        }
        let promedio13 = 0;
        if (peso13 != 0 && cantidad13 != 0){
            promedio13 = peso13 / cantidad13;
        }

        let precio14 = 0;
        if (venta14 != 0 && peso14 != 0){
            precio14 = venta14 / peso14;
        }
        let promedio14 = 0;
        if (peso14 != 0 && cantidad14 != 0){
            promedio14 = peso14 / cantidad14;
        }

        let precio15 = 0;
        if (venta15 != 0 && peso15 != 0){
            precio15 = venta15 / peso15;
        }
        let promedio15 = 0;
        if (peso15 != 0 && cantidad15 != 0){
            promedio15 = peso15 / cantidad15;
        }

        let precio16 = 0;
        if (venta16 != 0 && peso16 != 0){
            precio16 = venta16 / peso16;
        }
        let promedio16 = 0;
        if (peso16 != 0 && cantidad16 != 0){
            promedio16 = peso16 / cantidad16;
        }

        let precio17 = 0;
        if (venta17 != 0 && peso17 != 0){
            precio17 = venta17 / peso17;
        }
        let promedio17 = 0;
        if (peso17 != 0 && cantidad17 != 0){
            promedio17 = peso17 / cantidad17;
        }

        let precio18 = 0;
        if (venta18 != 0 && peso18 != 0){
            precio18 = venta18 / peso18;
        }
        let promedio18 = 0;
        if (peso18 != 0 && cantidad18 != 0){
            promedio18 = peso18 / cantidad18;
        }

        let precio19 = 0;
        if (venta19 != 0 && peso19 != 0){
            precio19 = venta19 / peso19;
        }
        let promedio19 = 0;
        if (peso19 != 0 && cantidad19 != 0){
            promedio19 = peso19 / cantidad19;
        }

        let precio20 = 0;
        if (venta20 != 0 && peso20 != 0){
            precio20 = venta20 / peso20;
        }
        let promedio20 = 0;
        if (peso20 != 0 && cantidad20 != 0){
            promedio20 = peso20 / cantidad20;
        }

        let precio21 = 0;
        if (venta21 != 0 && peso21 != 0){
            precio21 = venta21 / peso21;
        }
        let promedio21 = 0;
        if (peso21 != 0 && cantidad21 != 0){
            promedio21 = peso21 / cantidad21;
        }

        let precio22 = 0;
        if (venta22 != 0 && peso22 != 0){
            precio22 = venta22 / peso22;
        }
        let promedio22 = 0;
        if (peso22 != 0 && cantidad22 != 0){
            promedio22 = peso22 / cantidad22;
        }

        let precio23 = 0;
        if (venta23 != 0 && peso23 != 0){
            precio23 = venta23 / peso23;
        }
        let promedio23 = 0;
        if (peso23 != 0 && cantidad23 != 0){
            promedio23 = peso23 / cantidad23;
        }

        let cantidad24 = cantidad10 + cantidad11 + cantidad12 + cantidad13 + cantidad15 + cantidad9;
        let peso24 = peso10 + peso11 + peso12 + peso13 + peso15;
        let venta24 = venta10 + venta11 + venta12 + venta13 + venta15;

        cantidadTotalesPrimerEspecie = cantidad1
        cantidadTotalesSegundaEspecie = cantidad2
        cantidadTotalesTerceraEspecie = cantidad3
        cantidadTotalesCuartaEspecie = cantidad4
        cantidadTotalesQuintaEspecie = cantidad5
        cantidadTotalesSextaEspecie = cantidad6
        cantidadTotalesSeptimaEspecie = cantidad7
        cantidadTotalesOctavaEspecie = cantidad8
        cantidadTotalesNovenaEspecie = cantidad10
        cantidadTotalesDecimaEspecie = cantidad11
        cantidadTotalesDecimaPrimeraEspecie = cantidad12
        cantidadTotalesDecimaSegundaEspecie = cantidad13
        cantidadTotalesDecimaTerceraEspecie = cantidad14
        cantidadTotalesDecimaCuartaEspecie = cantidad15
        cantidadTotalesDecimaQuintaEspecie = cantidad16
        cantidadTotalesDecimaSextaEspecie = cantidad17
        cantidadTotalesDecimaSeptimaEspecie = cantidad18
        cantidadTotalesDecimaOctavaEspecie = cantidad19
        cantidadTotalesDecimaNovenaEspecie = cantidad20
        cantidadTotalesVigesimaEspecie = cantidad21
        cantidadTotalesVigesimaPrimeraEspecie = cantidad22
        cantidadTotalesVigesimaSegundaEspecie = cantidad23
        cantidadTotalNovenaEspecie = cantidad9

        pesoTotalesPrimerEspecie = peso1
        pesoTotalesSegundaEspecie = peso2
        pesoTotalesTerceraEspecie = peso3
        pesoTotalesCuartaEspecie = peso4
        pesoTotalesQuintaEspecie = peso5
        pesoTotalesSextaEspecie = peso6
        pesoTotalesSeptimaEspecie = peso7
        pesoTotalesOctavaEspecie = peso8
        pesoTotalesNovenaEspecie = peso10
        pesoTotalesDecimaEspecie = peso11
        pesoTotalesDecimaPrimeraEspecie = peso12
        pesoTotalesDecimaSegundaEspecie = peso13
        pesoTotalesDecimaTerceraEspecie = peso14
        pesoTotalesDecimaCuartaEspecie = peso15
        pesoTotalesDecimaQuintaEspecie = peso16
        pesoTotalesDecimaSextaEspecie = peso17
        pesoTotalesDecimaSeptimaEspecie = peso18
        pesoTotalesDecimaOctavaEspecie = peso19
        pesoTotalesDecimaNovenaEspecie = peso20
        pesoTotalesVigesimaEspecie = peso21
        pesoTotalesVigesimaPrimeraEspecie = peso22
        pesoTotalesVigesimaSegundaEspecie = peso23

        precioTotalesPrimerEspecie = venta1
        precioTotalesSegundaEspecie = venta2
        precioTotalesTerceraEspecie = venta3
        precioTotalesCuartaEspecie = venta4
        precioTotalesQuintaEspecie = venta5
        precioTotalesSextaEspecie = venta6
        precioTotalesSeptimaEspecie = venta7
        precioTotalesOctavaEspecie = venta8
        precioTotalesNovenaEspecie = venta10
        precioTotalesDecimaEspecie = venta11
        precioTotalesDecimaPrimeraEspecie = venta12
        precioTotalesDecimaSegundaEspecie = venta13
        precioTotalesDecimaTerceraEspecie = venta14
        precioTotalesDecimaCuartaEspecie = venta15
        precioTotalesDecimaQuintaEspecie = venta16
        precioTotalesDecimaSextaEspecie = venta17
        precioTotalesDecimaSeptimaEspecie = venta18
        precioTotalesDecimaOctavaEspecie = venta19
        precioTotalesDecimaNovenaEspecie = venta20
        precioTotalesVigesimaEspecie = venta21
        precioTotalesVigesimaPrimeraEspecie = venta22
        precioTotalesVigesimaSegundaEspecie = venta23

            return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900 sticky bottom-0">
                <td class="text-left font-bold text-sm border-t-2 border-r-[1px] border-l-2 border-b-2 py-1 px-2 text-white bg-blue-600 whitespace-nowrap">TOTAL</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad1}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso1).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio1).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta1.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio1).toFixed(2)}</td> 

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad2}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso2).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio2).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta2.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio2).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad17}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso17).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio17).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta17.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio17).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad3}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso3).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio3).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta3.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio3).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad4}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso4).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio4).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta4.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio4).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad18}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso18).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio18).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta18.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio18).toFixed(2)}</td>
                
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad16}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso16).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio16).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta16.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio16).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad19}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso19).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio19).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta19.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio19).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad5}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso5).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio5).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta5.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio5).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad20}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso20).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio20).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta20.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio20).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad7}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso7).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio7).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta7.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio7).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad22}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso22).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio22).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta22.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio22).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad8}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso8).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio8).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta8.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio8).toFixed(2)}</td>
                
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad23}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso23).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio23).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta23.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio23).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad14}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso14).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(precio14).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta14.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(promedio14).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${cantidad24}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(peso24).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/N</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${venta24.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/N</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(totalPesoDescTotalFor).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVentaDescTotalFinal).toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${(totalVentaDescTotalFor).toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${totalCantidadSubTotales}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">${(totalPesoSubTotales).toFixed(2)} Kg.</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-semibold">S/. ${totalDeSubtotales.toFixed(2)}</td>

                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalSaldoAnteriorSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalSaldoActualSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap">S/. ${totalCobranzaSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-x-[1px] border-b-2 py-1 px-2 whitespace-nowrap font-bold">S/. ${totalNuevoSaldoSubTotales.toFixed(2)}</td>
                <td class="text-center border-t-2 border-l-[1px] border-r-2 border-b-2 py-1 px-2 whitespace-nowrap font-bold bg-blue-600">&nbsp;</td>
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

        let totalPeso19 = parseFloat(item.totalPesoDecimaNovenaEspecie);
        let totalCantidad19 = parseInt(item.totalCantidadDecimaNovenaEspecie);
        let totalVenta19 = parseFloat(item.totalVentaDecimaNovenaEspecie);
        let totalPesoDescuentoDecimaNovenaEspecie19 = parseFloat(item.totalPesoDescuentoDecimaNovenaEspecie);
        let totalCantidadDescuentoDecimaNovenaEspecie19 = parseInt(item.totalCantidadDescuentoDecimaNovenaEspecie);
        let totalVentaDescuentoDecimaNovenaEspecie19 = parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie);

        totalPeso19 = totalPeso19 + totalPesoDescuentoDecimaNovenaEspecie19;
        totalCantidad19 = totalCantidad19 + totalCantidadDescuentoDecimaNovenaEspecie19;
        totalVenta19 = totalVenta19 + totalVentaDescuentoDecimaNovenaEspecie19;

        let promedio19 = 0;
        if (totalPeso19 != 0){
            promedio19 = totalPeso19/totalCantidad19;
        }else{
            promedio19 = 0;
        }

        let totalPrecioVenta19 = 0;
        if (totalVenta19 != 0){
            totalPrecioVenta19 = totalVenta19/totalPeso19;
        }else{
            totalPrecioVenta19 = 0;
        }

        // ==============================================

        let totalPeso20 = parseFloat(item.totalPesoVigesimaEspecie);
        let totalCantidad20 = parseInt(item.totalCantidadVigesimaEspecie);
        let totalVenta20 = parseFloat(item.totalVentaVigesimaEspecie);
        let totalPesoDescuentoVigesimaEspecie20 = parseFloat(item.totalPesoDescuentoVigesimaEspecie);
        let totalCantidadDescuentoVigesimaEspecie20 = parseInt(item.totalCantidadDescuentoVigesimaEspecie);
        let totalVentaDescuentoVigesimaEspecie20 = parseFloat(item.totalVentaDescuentoVigesimaEspecie);

        totalPeso20 = totalPeso20 + totalPesoDescuentoVigesimaEspecie20;
        totalCantidad20 = totalCantidad20 + totalCantidadDescuentoVigesimaEspecie20;
        totalVenta20 = totalVenta20 + totalVentaDescuentoVigesimaEspecie20;

        let promedio20 = 0;
        if (totalPeso20 != 0){
            promedio20 = totalPeso20/totalCantidad20;
        }else{
            promedio20 = 0;
        }

        let totalPrecioVenta20 = 0;
        if (totalVenta20 != 0){
            totalPrecioVenta20 = totalVenta20/totalPeso20;
        }else{
            totalPrecioVenta20 = 0;
        }

        // ==============================================

        let totalPeso21 = parseFloat(item.totalPesoVigesimaPrimeraEspecie);
        let totalCantidad21 = parseInt(item.totalCantidadVigesimaPrimeraEspecie);
        let totalVenta21 = parseFloat(item.totalVentaVigesimaPrimeraEspecie);
        let totalPesoDescuentoVigesimaPrimeraEspecie21 = parseFloat(item.totalPesoDescuentoVigesimaPrimeraEspecie);
        let totalCantidadDescuentoVigesimaPrimeraEspecie21 = parseInt(item.totalCantidadDescuentoVigesimaPrimeraEspecie);
        let totalVentaDescuentoVigesimaPrimeraEspecie21 = parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie);

        totalPeso21 = totalPeso21 + totalPesoDescuentoVigesimaPrimeraEspecie21;
        totalCantidad21 = totalCantidad21 + totalCantidadDescuentoVigesimaPrimeraEspecie21;
        totalVenta21 = totalVenta21 + totalVentaDescuentoVigesimaPrimeraEspecie21;

        let promedio21 = 0;
        if (totalPeso21 != 0){
            promedio21 = totalPeso21/totalCantidad21;
        }else{
            promedio21 = 0;
        }

        let totalPrecioVenta21 = 0;
        if (totalVenta21 != 0){
            totalPrecioVenta21 = totalVenta21/totalPeso21;
        }else{
            totalPrecioVenta21 = 0;
        }

        // ==============================================

        let totalPeso22 = parseFloat(item.totalPesoVigesimaSegundaEspecie);
        let totalCantidad22 = parseInt(item.totalCantidadVigesimaSegundaEspecie);
        let totalVenta22 = parseFloat(item.totalVentaVigesimaSegundaEspecie);
        let totalPesoDescuentoVigesimaSegundaEspecie22 = parseFloat(item.totalPesoDescuentoVigesimaSegundaEspecie);
        let totalCantidadDescuentoVigesimaSegundaEspecie22 = parseInt(item.totalCantidadDescuentoVigesimaSegundaEspecie);
        let totalVentaDescuentoVigesimaSegundaEspecie22 = parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie);

        totalPeso22 = totalPeso22 + totalPesoDescuentoVigesimaSegundaEspecie22;
        totalCantidad22 = totalCantidad22 + totalCantidadDescuentoVigesimaSegundaEspecie22;
        totalVenta22 = totalVenta22 + totalVentaDescuentoVigesimaSegundaEspecie22;

        let promedio22 = 0;
        if (totalPeso22 != 0){
            promedio22 = totalPeso22/totalCantidad22;
        }else{
            promedio22 = 0;
        }

        let totalPrecioVenta22 = 0;
        if (totalVenta22 != 0){
            totalPrecioVenta22 = totalVenta22/totalPeso22;
        }else{
            totalPrecioVenta22 = 0;
        }

        // ==============================================

        let totalPeso23 = parseFloat(item.totalPesoVigesimaTerceraEspecie);
        let totalCantidad23 = parseInt(item.totalCantidadVigesimaTerceraEspecie);
        let totalVenta23 = parseFloat(item.totalVentaVigesimaTerceraEspecie);
        let totalPesoDescuentoVigesimaTerceraEspecie23 = parseFloat(item.totalPesoDescuentoVigesimaTerceraEspecie);
        let totalCantidadDescuentoVigesimaTerceraEspecie23 = parseInt(item.totalCantidadDescuentoVigesimaTerceraEspecie);
        let totalVentaDescuentoVigesimaTerceraEspecie23 = parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie);

        totalPeso23 = totalPeso23 + totalPesoDescuentoVigesimaTerceraEspecie23;
        totalCantidad23 = totalCantidad23 + totalCantidadDescuentoVigesimaTerceraEspecie23;
        totalVenta23 = totalVenta23 + totalVentaDescuentoVigesimaTerceraEspecie23;

        let promedio23 = 0;
        if (totalPeso23 != 0){
            promedio23 = totalPeso23/totalCantidad23;
        }else{
            promedio23 = 0;
        }

        let totalPrecioVenta23 = 0;
        if (totalVenta23 != 0){
            totalPrecioVenta23 = totalVenta23/totalPeso23;
        }else{
            totalPrecioVenta23 = 0;
        }

        // ==============================================

        let totalPeso24 = totalPeso10 + totalPeso11 + totalPeso12 + totalPeso13 + totalPeso15;
        let totalCantidad24 = totalCantidad10 + totalCantidad11 + totalCantidad12 + totalCantidad13 + totalCantidad15;
        let totalVenta24 = totalVenta10 + totalVenta11 + totalVenta12 + totalVenta13 + totalVenta15;
        let totalPesoDescuentoVigesimaCuartaEspecie24 = totalPesoDescuentoDecimaEspecie10 + totalPesoDescuentoDecimaPrimeraEspecie11 + totalPesoDescuentoDecimaSegundaEspecie12 + totalPesoDescuentoDecimaTerceraEspecie13 + totalPesoDescuentoDecimaCuartaEspecie14 + totalPesoDescuentoDecimaQuintaEspecie15;
        let totalCantidadDescuentoVigesimaCuartaEspecie24 = totalCantidadDescuentoDecimaEspecie10 + totalCantidadDescuentoDecimaPrimeraEspecie11 + totalCantidadDescuentoDecimaSegundaEspecie12 + totalCantidadDescuentoDecimaTerceraEspecie13 + totalCantidadDescuentoDecimaCuartaEspecie14 + totalCantidadDescuentoDecimaQuintaEspecie15;
        let totalVentaDescuentoVigesimaCuartaEspecie24 = totalVentaDescuentoDecimaEspecie10 + totalVentaDescuentoDecimaPrimeraEspecie11 + totalVentaDescuentoDecimaSegundaEspecie12 + totalVentaDescuentoDecimaTerceraEspecie13 + totalVentaDescuentoDecimaCuartaEspecie14 + totalVentaDescuentoDecimaQuintaEspecie15;

        totalPeso24 = totalPeso24 + totalPesoDescuentoVigesimaCuartaEspecie24;
        totalCantidad24 = totalCantidad24 + totalCantidadDescuentoVigesimaCuartaEspecie24;
        totalVenta24 = totalVenta24 + totalVentaDescuentoVigesimaCuartaEspecie24;

        let promedio24 = 0;
        if (totalPeso24 != 0){
            promedio24 = totalPeso24/totalCantidad24;
        }else{
            promedio24 = 0;
        }

        let totalPrecioVenta24 = 0;
        if (totalVenta24 != 0){
            totalPrecioVenta24 = totalVenta24/totalPeso24;
        }else{
            totalPrecioVenta24 = 0;
        }

        // ==============================================

        let totalDelTotalCantidad = 0;
        let totalDelTotalPeso = 0.00;
        let totalDelTotalVenta = 0.00;

        totalDelTotalCantidad = totalCantidad1 +totalCantidad2 + totalCantidad3 + totalCantidad4 + totalCantidad5 + totalCantidad6 + totalCantidad7 + totalCantidad8 + totalCantidad10 + totalCantidad11 + totalCantidad12 + totalCantidad13 + totalCantidad14 + totalCantidad15 + totalCantidad16 + totalCantidad17 + totalCantidad18 + totalCantidad19 + totalCantidad20 + totalCantidad21 + totalCantidad22 + totalCantidad23;

        totalDelTotalPeso = totalPeso1 + totalPeso2 + totalPeso3 + totalPeso4 + totalPeso5 + totalPeso6 + totalPeso7 + totalPeso8 + totalPeso10 + totalPeso11 + totalPeso12 + totalPeso13 + totalPeso14 + totalPeso15 + totalPeso16 + totalPeso17 + totalPeso18 + totalPeso19 + totalPeso20 + totalPeso21 + totalPeso22 + totalPeso23;

        totalDelTotalVenta = totalVenta1 + totalVenta2 + totalVenta3 + totalVenta4 + totalVenta5 + totalVenta6 + totalVenta7 + totalVenta8 + totalVenta10 + totalVenta11 + totalVenta12 + totalVenta13 + totalVenta14 + totalVenta15 + totalVenta16 + totalVenta17 + totalVenta18 + totalVenta19 + totalVenta20 + totalVenta21 + totalVenta22 + totalVenta23;

        // ==============================================

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
        let totalVentaDecimaNovenaEspecie = parseFloat(item.totalVentaDecimaNovenaEspecie);
        let totalVentaVigesimaEspecie = parseFloat(item.totalVentaVigesimaEspecie);
        let totalVentaVigesimaPrimeraEspecie = parseFloat(item.totalVentaVigesimaPrimeraEspecie);
        let totalVentaVigesimaSegundaEspecie = parseFloat(item.totalVentaVigesimaSegundaEspecie);
        let totalVentaVigesimaTerceraEspecie = parseFloat(item.totalVentaVigesimaTerceraEspecie);

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
        let totalVentaDescuentoDecimaNovenaEspecie = parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie);
        let totalVentaDescuentoVigesimaEspecie = parseFloat(item.totalVentaDescuentoVigesimaEspecie);
        let totalVentaDescuentoVigesimaPrimeraEspecie = parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie);
        let totalVentaDescuentoVigesimaSegundaEspecie = parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie);
        let totalVentaDescuentoVigesimaTerceraEspecie = parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie);

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
        let ventaTotalDecimaNovenaEspecie = totalVentaDecimaNovenaEspecie + totalVentaDescuentoDecimaNovenaEspecie;
        let ventaTotalVigesimaEspecie = totalVentaVigesimaEspecie + totalVentaDescuentoVigesimaEspecie;
        let ventaTotalVigesimaPrimeraEspecie = totalVentaVigesimaPrimeraEspecie + totalVentaDescuentoVigesimaPrimeraEspecie;
        let ventaTotalVigesimaSegundaEspecie = totalVentaVigesimaSegundaEspecie + totalVentaDescuentoVigesimaSegundaEspecie;
        let ventaTotalVigesimaTerceraEspecie = totalVentaVigesimaTerceraEspecie + totalVentaDescuentoVigesimaTerceraEspecie;

        let ventaTotal = ventaTotalPrimerEspecie + ventaTotalSegundaEspecie + ventaTotalTerceraEspecie + ventaTotalCuartaEspecie + ventaTotalQuintaEspecie + ventaTotalSextaEspecie + ventaTotalSeptimaEspecie + ventaTotalOctavaEspecie + ventaTotalDecimaEspecie + ventaTotalDecimaPrimeraEspecie + ventaTotalDecimaSegundaEspecie + ventaTotalDecimaTerceraEspecie + ventaTotalDecimaCuartaEspecie + ventaTotalDecimaQuintaEspecie + ventaTotalDecimaSextaEspecie + ventaTotalDecimaSeptimaEspecie + ventaTotalDecimaOctavaEspecie + ventaTotalDecimaNovenaEspecie + ventaTotalVigesimaEspecie + ventaTotalVigesimaPrimeraEspecie + ventaTotalVigesimaSegundaEspecie + ventaTotalVigesimaTerceraEspecie + item.totalVentaDescuento;

        let ventaAnterior = parseFloat(item.ventaAnterior);
        let pagoAnterior = parseFloat(item.pagoAnterior);
        let descuentoAnterior = parseFloat(item.totalVentaDescuentoAnterior);

        let totalVentaAnterior = ventaAnterior - pagoAnterior + descuentoAnterior;

        let saldoDelDia = totalVentaAnterior + ventaTotal;

        let saldoActual = saldoDelDia - parseFloat(item.pagos);

        // ==============================================

        let totalPesoDesc = parseFloat(item.totalPesoDescuento);

        let totalVentaDesc = parseFloat(item.totalVentaDescuento);

        let totalPrecioVentaDesc = 0;
        if (totalVentaDesc != 0){
            totalPrecioVentaDesc = totalVentaDesc/totalPesoDesc;
        }else{
            totalPrecioVentaDesc = 0;
        }

        totalDelTotalPeso = totalDelTotalPeso + totalPesoDesc;
        totalDelTotalVenta = totalDelTotalVenta + totalVentaDesc;

        return `
            <tr class="bg-white dark:text-gray-200 text-gray-900 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-left border-y-[1px] border-r-[1px] border-l-2 py-1 px-2 whitespace-nowrap">${item.nombreCompleto}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad1}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso1).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta1).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta1.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio1).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad2}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso2).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta2).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta2.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio2).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad17}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso17).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta17).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta17.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio17).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad3}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso3).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta3).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta3.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio3).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad4}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso4).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta4).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta4.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio4).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad18}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso18).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta18).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta18.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio18).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad16}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso16).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta16).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta16.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio16).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad19}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso19).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta19).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta19.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio19).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad5}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso5).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta5).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta5.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio5).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad20}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso20).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta20).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta20.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio20).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad7}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso7).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta7).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta7.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio7).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad22}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso22).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta22).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta22.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio22).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad8}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso8).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta8).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta8.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio8).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad23}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso23).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta23).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta23.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio23).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad14}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso14).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta14).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta14.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio14).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalCantidad24}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPeso24).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVenta24).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalVenta24.toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(promedio24).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalPesoDesc).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalPrecioVentaDesc).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${(totalVentaDesc).toFixed(2)}</td>

                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${totalDelTotalCantidad}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">${(totalDelTotalPeso).toFixed(2)} Kg.</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap text-black font-semibold bg-[#CAA122]">S/. ${totalDelTotalVenta.toFixed(2)}</td>
                
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(totalVentaAnterior).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(saldoDelDia).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap">S/. ${(item.pagos).toFixed(2)}</td>
                <td class="text-center border-[1px] py-1 px-2 whitespace-nowrap font-bold">S/. ${saldoActual.toFixed(2)}</td>
                <td class="text-center border-y-[1px] border-l-[1px] border-r-2 py-1 px-2 whitespace-nowrap">${item.nombreCompleto}</td>
            </tr>
        `;
    }

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

                        // Crear una nueva fila
                        let nuevaFila = `
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.idPesada}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.fechaRegistroPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.horaPes}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.nombreCompleto}</td>
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
                    fn_TraerReporteAcumuladoDetalle(fechaEnviarTexto,fechaEnviarTexto);
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
                    fn_ActualizarPrecioXPresentacion(codigoCliente,nuevoImporte,codigoEspecie);
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
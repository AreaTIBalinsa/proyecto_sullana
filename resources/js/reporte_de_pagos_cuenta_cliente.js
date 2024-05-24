import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function ($) {

    declarar_especies();

    var primerEspecieGlobal = 0;
    var segundaEspecieGlobal = 0;
    var terceraEspecieGlobal = 0;
    var cuartaEspecieGlobal = 0;
    var quintaEspecieGlobal = 0;
    var sextaEspecieGlobal = 0;
    var septimaEspecieGlobal = 0;
    var octavaEspecieGlobal = 0;
    var decimaEspecieGlobal = 0;
    var decimaPrimeraEspecieGlobal = 0;
    var decimaSegundaEspecieGlobal = 0;
    var decimaTerceraEspecieGlobal = 0;
    var decimaCuartaEspecieGlobal = 0;
    var decimaQuintaEspecieGlobal = 0;
    var decimaSextaEspecieGlobal = 0;
    var decimaSeptimaEspecieGlobal = 0;
    var decimaOctavaEspecieGlobal = 0;
    var decimaNovenaEspecieGlobal = 0;
    var vigesimaEspecieGlobal = 0;
    var vigesimaPrimeraEspecieGlobal = 0;
    var vigesimaSegundaEspecieGlobal = 0;
    var vigesimaTerceraEspecieGlobal = 0;

    var nombrePrimerEspecieGlobal = "";
    var nombreSegundaEspecieGlobal = "";
    var nombreTerceraEspecieGlobal = "";
    var nombreCuartaEspecieGlobal = "";
    var nombreQuintaEspecieGlobal = "";
    var nombreSextaEspecieGlobal = "";
    var nombreSeptimaEspecieGlobal = "";
    var nombreOctavaEspecieGlobal = "";
    var nombreDecimaEspecieGlobal = "";
    var nombreDecimaPrimeraEspecieGlobal = "";
    var nombreDecimaSegundaEspecieGlobal = "";
    var nombreDecimaTerceraEspecieGlobal = "";
    var nombreDecimaCuartaEspecieGlobal = "";
    var nombreDecimaQuintaEspecieGlobal = "";
    var nombreDecimaSextaEspecieGlobal = "";
    var nombreDecimaSeptimaEspecieGlobal = "";
    var nombreDecimaOctavaEspecieGlobal = "";
    var nombreDecimaNovenaEspecieGlobal = "";
    var nombreVigesimaEspecieGlobal = "";
    var nombreVigesimaPrimeraEspecieGlobal = "";
    var nombreVigesimaSegundaEspecieGlobal = "";
    var nombreVigesimaTerceraEspecieGlobal = "";

    function declarar_especies(){
        $.ajax({
            url: '/fn_consulta_DatosEspecie2',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Iterar sobre los objetos y mostrar sus propiedades
                    primerEspecieGlobal = parseInt(response[0].idEspecie);
                    segundaEspecieGlobal  = parseInt(response[1].idEspecie);
                    terceraEspecieGlobal = parseInt(response[2].idEspecie);
                    cuartaEspecieGlobal = parseInt(response[3].idEspecie);
                    quintaEspecieGlobal = parseInt(response[4].idEspecie);
                    sextaEspecieGlobal = parseInt(response[5].idEspecie);
                    septimaEspecieGlobal = parseInt(response[6].idEspecie);
                    octavaEspecieGlobal = parseInt(response[7].idEspecie);
                    decimaEspecieGlobal = parseInt(response[8].idEspecie);
                    decimaPrimeraEspecieGlobal = parseInt(response[9].idEspecie);
                    decimaSegundaEspecieGlobal = parseInt(response[10].idEspecie);
                    decimaTerceraEspecieGlobal = parseInt(response[11].idEspecie);
                    decimaCuartaEspecieGlobal = parseInt(response[12].idEspecie);
                    decimaQuintaEspecieGlobal = parseInt(response[13].idEspecie);
                    decimaSextaEspecieGlobal = parseInt(response[14].idEspecie);
                    decimaSeptimaEspecieGlobal = parseInt(response[15].idEspecie);
                    decimaOctavaEspecieGlobal = parseInt(response[16].idEspecie);
                    decimaNovenaEspecieGlobal = parseInt(response[17].idEspecie);
                    vigesimaEspecieGlobal = parseInt(response[18].idEspecie);
                    vigesimaPrimeraEspecieGlobal = parseInt(response[19].idEspecie);
                    vigesimaSegundaEspecieGlobal = parseInt(response[20].idEspecie);
                    vigesimaTerceraEspecieGlobal = parseInt(response[21].idEspecie);

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
                    nombreDecimaNovenaEspecieGlobal = response[17].nombreEspecie;
                    nombreVigesimaEspecieGlobal = response[18].nombreEspecie;
                    nombreVigesimaPrimeraEspecieGlobal = response[19].nombreEspecie;
                    nombreVigesimaSegundaEspecieGlobal = response[20].nombreEspecie;
                    nombreVigesimaTerceraEspecieGlobal = response[21].nombreEspecie;
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }
    
    $('#btnBuscarCuentaDelCliente').on('click', function () {
        let fechaDesde = $('#fechaDesdeCuentaDelCliente').val();
        let fechaHasta = $('#fechaHastaCuentaDelCliente').val();
        let codigoCliente = $('#selectedCodigoCliCuentaDelCliente').attr("value");
        fn_TraerCuentaDelCliente(fechaDesde,fechaHasta,codigoCliente);
    });

    
    function fn_TraerCuentaDelCliente(fechaDesde, fechaHasta, codigoCliente) {
        $.ajax({
            url: '/fn_consulta_TraerCuentaDelCliente',
            method: 'GET',
            data: {
                fechaDesde: fechaDesde,
                fechaHasta: fechaHasta,
                codigoCliente: codigoCliente,
            },
            success: function (response) {
    
                // Inicializar variables ventaAnterior y pagoAnterior con 0 si son null
                let ventaAnterior = parseFloat(response.ventaAnterior || 0);
                ventaAnterior += parseFloat(response.ventaAnterior2 || 0);

                let pagoAnterior = parseFloat(response.pagoAnterior || 0);
                let totalVentaDescuentoAnterior = parseFloat(response.totalVentaDescuentoAnterior || 0);
                let respuestaPagosDetallados = response.pagosDetallados
                respuestaPagosDetallados = respuestaPagosDetallados.original
    
                // Crear un objeto para almacenar los datos combinados por fecha
                var combinedData = {};
    
                // Inicializar propiedades con 0 en cada iteración
                response.totalesPrimerEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoPrimerEspecie = parseFloat(item.totalPesoPrimerEspecie);
                    combinedData[fecha].totalPesoDescuentoPrimerEspecie = parseFloat(item.totalPesoDescuentoPrimerEspecie);
                    combinedData[fecha].totalCantidadDescuentoPrimerEspecie = parseInt(item.totalCantidadDescuentoPrimerEspecie);
                    combinedData[fecha].totalVentaPrimerEspecie = parseFloat(item.totalVentaPrimerEspecie);
                    combinedData[fecha].totalCantidadPrimerEspecie = parseInt(item.totalCantidadPrimerEspecie);
                    combinedData[fecha].totalVentaDescuentoPrimerEspecie = parseFloat(item.totalVentaDescuentoPrimerEspecie);
                });
    
                response.totalesSegundaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoSegundaEspecie = parseFloat(item.totalPesoSegundaEspecie);
                    combinedData[fecha].totalPesoDescuentoSegundaEspecie = parseFloat(item.totalPesoDescuentoSegundaEspecie);
                    combinedData[fecha].totalCantidadDescuentoSegundaEspecie = parseInt(item.totalCantidadDescuentoSegundaEspecie);
                    combinedData[fecha].totalVentaSegundaEspecie = parseFloat(item.totalVentaSegundaEspecie);
                    combinedData[fecha].totalCantidadSegundaEspecie = parseInt(item.totalCantidadSegundaEspecie);
                    combinedData[fecha].totalVentaDescuentoSegundaEspecie = parseFloat(item.totalVentaDescuentoSegundaEspecie);
                });
    
                response.totalesTerceraEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoTerceraEspecie = parseFloat(item.totalPesoTerceraEspecie);
                    combinedData[fecha].totalPesoDescuentoTerceraEspecie = parseFloat(item.totalPesoDescuentoTerceraEspecie);
                    combinedData[fecha].totalCantidadDescuentoTerceraEspecie = parseInt(item.totalCantidadDescuentoTerceraEspecie);
                    combinedData[fecha].totalVentaTerceraEspecie = parseFloat(item.totalVentaTerceraEspecie);
                    combinedData[fecha].totalCantidadTerceraEspecie = parseInt(item.totalCantidadTerceraEspecie);
                    combinedData[fecha].totalVentaDescuentoTerceraEspecie = parseFloat(item.totalVentaDescuentoTerceraEspecie);
                });
    
                response.totalesCuartaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoCuartaEspecie = parseFloat(item.totalPesoCuartaEspecie);
                    combinedData[fecha].totalPesoDescuentoCuartaEspecie = parseFloat(item.totalPesoDescuentoCuartaEspecie);
                    combinedData[fecha].totalCantidadDescuentoCuartaEspecie = parseInt(item.totalCantidadDescuentoCuartaEspecie);
                    combinedData[fecha].totalVentaCuartaEspecie = parseFloat(item.totalVentaCuartaEspecie);
                    combinedData[fecha].totalCantidadCuartaEspecie = parseInt(item.totalCantidadCuartaEspecie);
                    combinedData[fecha].totalVentaDescuentoCuartaEspecie = parseFloat(item.totalVentaDescuentoCuartaEspecie);
                });

                // Inicia

                response.totalesQuintaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoQuintaEspecie = parseFloat(item.totalPesoQuintaEspecie);
                    combinedData[fecha].totalPesoDescuentoQuintaEspecie = parseFloat(item.totalPesoDescuentoQuintaEspecie);
                    combinedData[fecha].totalCantidadDescuentoQuintaEspecie = parseInt(item.totalCantidadDescuentoQuintaEspecie);
                    combinedData[fecha].totalVentaQuintaEspecie = parseFloat(item.totalVentaQuintaEspecie);
                    combinedData[fecha].totalCantidadQuintaEspecie = parseInt(item.totalCantidadQuintaEspecie);
                    combinedData[fecha].totalVentaDescuentoQuintaEspecie = parseFloat(item.totalVentaDescuentoQuintaEspecie);
                });

                response.totalesSextaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoSextaEspecie = parseFloat(item.totalPesoSextaEspecie);
                    combinedData[fecha].totalPesoDescuentoSextaEspecie = parseFloat(item.totalPesoDescuentoSextaEspecie);
                    combinedData[fecha].totalCantidadDescuentoSextaEspecie = parseInt(item.totalCantidadDescuentoSextaEspecie);
                    combinedData[fecha].totalVentaSextaEspecie = parseFloat(item.totalVentaSextaEspecie);
                    combinedData[fecha].totalCantidadSextaEspecie = parseInt(item.totalCantidadSextaEspecie);
                    combinedData[fecha].totalVentaDescuentoSextaEspecie = parseFloat(item.totalVentaDescuentoSextaEspecie);
                });

                response.totalesSeptimaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoSeptimaEspecie = parseFloat(item.totalPesoSeptimaEspecie);
                    combinedData[fecha].totalPesoDescuentoSeptimaEspecie = parseFloat(item.totalPesoDescuentoSeptimaEspecie);
                    combinedData[fecha].totalCantidadDescuentoSeptimaEspecie = parseInt(item.totalCantidadDescuentoSeptimaEspecie);
                    combinedData[fecha].totalVentaSeptimaEspecie = parseFloat(item.totalVentaSeptimaEspecie);
                    combinedData[fecha].totalCantidadSeptimaEspecie = parseInt(item.totalCantidadSeptimaEspecie);
                    combinedData[fecha].totalVentaDescuentoSeptimaEspecie = parseFloat(item.totalVentaDescuentoSeptimaEspecie);
                });

                response.totalesOctavaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoOctavaEspecie = parseFloat(item.totalPesoOctavaEspecie);
                    combinedData[fecha].totalPesoDescuentoOctavaEspecie = parseFloat(item.totalPesoDescuentoOctavaEspecie);
                    combinedData[fecha].totalCantidadDescuentoOctavaEspecie = parseInt(item.totalCantidadDescuentoOctavaEspecie);
                    combinedData[fecha].totalVentaOctavaEspecie = parseFloat(item.totalVentaOctavaEspecie);
                    combinedData[fecha].totalCantidadOctavaEspecie = parseInt(item.totalCantidadOctavaEspecie);
                    combinedData[fecha].totalVentaDescuentoOctavaEspecie = parseFloat(item.totalVentaDescuentoOctavaEspecie);
                });

                response.totalesDecimaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaEspecie = parseFloat(item.totalPesoDecimaEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaEspecie = parseFloat(item.totalPesoDescuentoDecimaEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaEspecie = parseInt(item.totalCantidadDescuentoDecimaEspecie);
                    combinedData[fecha].totalVentaDecimaEspecie = parseFloat(item.totalVentaDecimaEspecie);
                    combinedData[fecha].totalCantidadDecimaEspecie = parseInt(item.totalCantidadDecimaEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaEspecie = parseFloat(item.totalVentaDescuentoDecimaEspecie);
                });

                response.totalesDecimaPrimeraEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaPrimeraEspecie = parseFloat(item.totalPesoDecimaPrimeraEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaPrimeraEspecie = parseFloat(item.totalPesoDescuentoDecimaPrimeraEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaPrimeraEspecie = parseInt(item.totalCantidadDescuentoDecimaPrimeraEspecie);
                    combinedData[fecha].totalVentaDecimaPrimeraEspecie = parseFloat(item.totalVentaDecimaPrimeraEspecie);
                    combinedData[fecha].totalCantidadDecimaPrimeraEspecie = parseInt(item.totalCantidadDecimaPrimeraEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaPrimeraEspecie = parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie);
                });

                response.totalesDecimaSegundaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaSegundaEspecie = parseFloat(item.totalPesoDecimaSegundaEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaSegundaEspecie = parseFloat(item.totalPesoDescuentoDecimaSegundaEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaSegundaEspecie = parseInt(item.totalCantidadDescuentoDecimaSegundaEspecie);
                    combinedData[fecha].totalVentaDecimaSegundaEspecie = parseFloat(item.totalVentaDecimaSegundaEspecie);
                    combinedData[fecha].totalCantidadDecimaSegundaEspecie = parseInt(item.totalCantidadDecimaSegundaEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaSegundaEspecie = parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie);
                });

                response.totalesDecimaTerceraEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaTerceraEspecie = parseFloat(item.totalPesoDecimaTerceraEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaTerceraEspecie = parseFloat(item.totalPesoDescuentoDecimaTerceraEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaTerceraEspecie = parseInt(item.totalCantidadDescuentoDecimaTerceraEspecie);
                    combinedData[fecha].totalVentaDecimaTerceraEspecie = parseFloat(item.totalVentaDecimaTerceraEspecie);
                    combinedData[fecha].totalCantidadDecimaTerceraEspecie = parseInt(item.totalCantidadDecimaTerceraEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaTerceraEspecie = parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie);
                });

                response.totalesDecimaCuartaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaCuartaEspecie = parseFloat(item.totalPesoDecimaCuartaEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaCuartaEspecie = parseFloat(item.totalPesoDescuentoDecimaCuartaEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaCuartaEspecie = parseInt(item.totalCantidadDescuentoDecimaCuartaEspecie);
                    combinedData[fecha].totalVentaDecimaCuartaEspecie = parseFloat(item.totalVentaDecimaCuartaEspecie);
                    combinedData[fecha].totalCantidadDecimaCuartaEspecie = parseInt(item.totalCantidadDecimaCuartaEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaCuartaEspecie = parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie);
                });

                response.totalesDecimaQuintaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaQuintaEspecie = parseFloat(item.totalPesoDecimaQuintaEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaQuintaEspecie = parseFloat(item.totalPesoDescuentoDecimaQuintaEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaQuintaEspecie = parseInt(item.totalCantidadDescuentoDecimaQuintaEspecie);
                    combinedData[fecha].totalVentaDecimaQuintaEspecie = parseFloat(item.totalVentaDecimaQuintaEspecie);
                    combinedData[fecha].totalCantidadDecimaQuintaEspecie = parseInt(item.totalCantidadDecimaQuintaEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaQuintaEspecie = parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie);
                });

                response.totalesDecimaSextaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaSextaEspecie = parseFloat(item.totalPesoDecimaSextaEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaSextaEspecie = parseFloat(item.totalPesoDescuentoDecimaSextaEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaSextaEspecie = parseInt(item.totalCantidadDescuentoDecimaSextaEspecie);
                    combinedData[fecha].totalVentaDecimaSextaEspecie = parseFloat(item.totalVentaDecimaSextaEspecie);
                    combinedData[fecha].totalCantidadDecimaSextaEspecie = parseInt(item.totalCantidadDecimaSextaEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaSextaEspecie = parseFloat(item.totalVentaDescuentoDecimaSextaEspecie);
                });

                response.totalesDecimaSeptimaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaSeptimaEspecie = parseFloat(item.totalPesoDecimaSeptimaEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaSeptimaEspecie = parseFloat(item.totalPesoDescuentoDecimaSeptimaEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaSeptimaEspecie = parseInt(item.totalCantidadDescuentoDecimaSeptimaEspecie);
                    combinedData[fecha].totalVentaDecimaSeptimaEspecie = parseFloat(item.totalVentaDecimaSeptimaEspecie);
                    combinedData[fecha].totalCantidadDecimaSeptimaEspecie = parseInt(item.totalCantidadDecimaSeptimaEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaSeptimaEspecie = parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie);
                });

                response.totalesDecimaOctavaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaOctavaEspecie = parseFloat(item.totalPesoDecimaOctavaEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaOctavaEspecie = parseFloat(item.totalPesoDescuentoDecimaOctavaEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaOctavaEspecie = parseInt(item.totalCantidadDescuentoDecimaOctavaEspecie);
                    combinedData[fecha].totalVentaDecimaOctavaEspecie = parseFloat(item.totalVentaDecimaOctavaEspecie);
                    combinedData[fecha].totalCantidadDecimaOctavaEspecie = parseInt(item.totalCantidadDecimaOctavaEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaOctavaEspecie = parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie);
                });

                response.totalesDecimaNovenaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaNovenaEspecie += parseFloat(item.totalPesoDecimaNovenaEspecie);
                    combinedData[fecha].totalPesoDescuentoDecimaNovenaEspecie += parseFloat(item.totalPesoDescuentoDecimaNovenaEspecie);
                    combinedData[fecha].totalCantidadDescuentoDecimaNovenaEspecie += parseInt(item.totalCantidadDescuentoDecimaNovenaEspecie);
                    combinedData[fecha].totalVentaDecimaNovenaEspecie += parseFloat(item.totalVentaDecimaNovenaEspecie);
                    combinedData[fecha].totalCantidadDecimaNovenaEspecie += parseInt(item.totalCantidadDecimaNovenaEspecie);
                    combinedData[fecha].totalVentaDescuentoDecimaNovenaEspecie += parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie);
                });

                response.totalesVigesimaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoVigesimaEspecie += parseFloat(item.totalPesoVigesimaEspecie);
                    combinedData[fecha].totalPesoDescuentoVigesimaEspecie += parseFloat(item.totalPesoDescuentoVigesimaEspecie);
                    combinedData[fecha].totalCantidadDescuentoVigesimaEspecie += parseInt(item.totalCantidadDescuentoVigesimaEspecie);
                    combinedData[fecha].totalVentaVigesimaEspecie += parseFloat(item.totalVentaVigesimaEspecie);
                    combinedData[fecha].totalCantidadVigesimaEspecie += parseInt(item.totalCantidadVigesimaEspecie);
                    combinedData[fecha].totalVentaDescuentoVigesimaEspecie += parseFloat(item.totalVentaDescuentoVigesimaEspecie);
                });

                response.totalesVigesimaPrimeraEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoVigesimaPrimeraEspecie += parseFloat(item.totalPesoVigesimaPrimeraEspecie);
                    combinedData[fecha].totalPesoDescuentoVigesimaPrimeraEspecie += parseFloat(item.totalPesoDescuentoVigesimaPrimeraEspecie);
                    combinedData[fecha].totalCantidadDescuentoVigesimaPrimeraEspecie += parseInt(item.totalCantidadDescuentoVigesimaPrimeraEspecie);
                    combinedData[fecha].totalVentaVigesimaPrimeraEspecie += parseFloat(item.totalVentaVigesimaPrimeraEspecie);
                    combinedData[fecha].totalCantidadVigesimaPrimeraEspecie += parseInt(item.totalCantidadVigesimaPrimeraEspecie);
                    combinedData[fecha].totalVentaDescuentoVigesimaPrimeraEspecie += parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie);
                });

                response.totalesVigesimaSegundaEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoVigesimaSegundaEspecie += parseFloat(item.totalPesoVigesimaSegundaEspecie);
                    combinedData[fecha].totalPesoDescuentoVigesimaSegundaEspecie += parseFloat(item.totalPesoDescuentoVigesimaSegundaEspecie);
                    combinedData[fecha].totalCantidadDescuentoVigesimaSegundaEspecie += parseInt(item.totalCantidadDescuentoVigesimaSegundaEspecie);
                    combinedData[fecha].totalVentaVigesimaSegundaEspecie += parseFloat(item.totalVentaVigesimaSegundaEspecie);
                    combinedData[fecha].totalCantidadVigesimaSegundaEspecie += parseInt(item.totalCantidadVigesimaSegundaEspecie);
                    combinedData[fecha].totalVentaDescuentoVigesimaSegundaEspecie += parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie);
                });

                response.totalesVigesimaTerceraEspecie.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoVigesimaTerceraEspecie += parseFloat(item.totalPesoVigesimaTerceraEspecie);
                    combinedData[fecha].totalPesoDescuentoVigesimaTerceraEspecie += parseFloat(item.totalPesoDescuentoVigesimaTerceraEspecie);
                    combinedData[fecha].totalCantidadDescuentoVigesimaTerceraEspecie += parseInt(item.totalCantidadDescuentoVigesimaTerceraEspecie);
                    combinedData[fecha].totalVentaVigesimaTerceraEspecie += parseFloat(item.totalVentaVigesimaTerceraEspecie);
                    combinedData[fecha].totalCantidadVigesimaTerceraEspecie += parseInt(item.totalCantidadVigesimaTerceraEspecie);
                    combinedData[fecha].totalVentaDescuentoVigesimaTerceraEspecie += parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie);
                });

                // Termina

                response.totalesPrimerEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoPrimerEspecie += parseFloat(item.totalPesoPrimerEspecie2);
                    combinedData[fecha].totalPesoDescuentoPrimerEspecie += parseFloat(item.totalPesoDescuentoPrimerEspecie2);
                    combinedData[fecha].totalCantidadDescuentoPrimerEspecie += parseInt(item.totalCantidadDescuentoPrimerEspecie2);
                    combinedData[fecha].totalVentaPrimerEspecie += parseFloat(item.totalVentaPrimerEspecie2);
                    combinedData[fecha].totalCantidadPrimerEspecie += parseInt(item.totalCantidadPrimerEspecie2);
                    combinedData[fecha].totalVentaDescuentoPrimerEspecie += parseFloat(item.totalVentaDescuentoPrimerEspecie2);
                });
    
                response.totalesSegundaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoSegundaEspecie += parseFloat(item.totalPesoSegundaEspecie2);
                    combinedData[fecha].totalPesoDescuentoSegundaEspecie += parseFloat(item.totalPesoDescuentoSegundaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoSegundaEspecie += parseInt(item.totalCantidadDescuentoSegundaEspecie2);
                    combinedData[fecha].totalVentaSegundaEspecie += parseFloat(item.totalVentaSegundaEspecie2);
                    combinedData[fecha].totalCantidadSegundaEspecie += parseInt(item.totalCantidadSegundaEspecie2);
                    combinedData[fecha].totalVentaDescuentoSegundaEspecie += parseFloat(item.totalVentaDescuentoSegundaEspecie2);
                });
    
                response.totalesTerceraEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoTerceraEspecie += parseFloat(item.totalPesoTerceraEspecie2);
                    combinedData[fecha].totalPesoDescuentoTerceraEspecie += parseFloat(item.totalPesoDescuentoTerceraEspecie2);
                    combinedData[fecha].totalCantidadDescuentoTerceraEspecie += parseInt(item.totalCantidadDescuentoTerceraEspecie2);
                    combinedData[fecha].totalVentaTerceraEspecie += parseFloat(item.totalVentaTerceraEspecie2);
                    combinedData[fecha].totalCantidadTerceraEspecie += parseInt(item.totalCantidadTerceraEspecie2);
                    combinedData[fecha].totalVentaDescuentoTerceraEspecie += parseFloat(item.totalVentaDescuentoTerceraEspecie2);
                });
    
                response.totalesCuartaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoCuartaEspecie += parseFloat(item.totalPesoCuartaEspecie2);
                    combinedData[fecha].totalPesoDescuentoCuartaEspecie += parseFloat(item.totalPesoDescuentoCuartaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoCuartaEspecie += parseInt(item.totalCantidadDescuentoCuartaEspecie2);
                    combinedData[fecha].totalVentaCuartaEspecie += parseFloat(item.totalVentaCuartaEspecie2);
                    combinedData[fecha].totalCantidadCuartaEspecie += parseInt(item.totalCantidadCuartaEspecie2);
                    combinedData[fecha].totalVentaDescuentoCuartaEspecie += parseFloat(item.totalVentaDescuentoCuartaEspecie2);
                });

                // Inicia

                response.totalesQuintaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoQuintaEspecie += parseFloat(item.totalPesoQuintaEspecie2);
                    combinedData[fecha].totalPesoDescuentoQuintaEspecie += parseFloat(item.totalPesoDescuentoQuintaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoQuintaEspecie += parseInt(item.totalCantidadDescuentoQuintaEspecie2);
                    combinedData[fecha].totalVentaQuintaEspecie += parseFloat(item.totalVentaQuintaEspecie2);
                    combinedData[fecha].totalCantidadQuintaEspecie += parseInt(item.totalCantidadQuintaEspecie2);
                    combinedData[fecha].totalVentaDescuentoQuintaEspecie += parseFloat(item.totalVentaDescuentoQuintaEspecie2);
                });

                response.totalesSextaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoSextaEspecie += parseFloat(item.totalPesoSextaEspecie2);
                    combinedData[fecha].totalPesoDescuentoSextaEspecie += parseFloat(item.totalPesoDescuentoSextaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoSextaEspecie += parseInt(item.totalCantidadDescuentoSextaEspecie2);
                    combinedData[fecha].totalVentaSextaEspecie += parseFloat(item.totalVentaSextaEspecie2);
                    combinedData[fecha].totalCantidadSextaEspecie += parseInt(item.totalCantidadSextaEspecie2);
                    combinedData[fecha].totalVentaDescuentoSextaEspecie += parseFloat(item.totalVentaDescuentoSextaEspecie2);
                });

                response.totalesSeptimaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoSeptimaEspecie += parseFloat(item.totalPesoSeptimaEspecie2);
                    combinedData[fecha].totalPesoDescuentoSeptimaEspecie += parseFloat(item.totalPesoDescuentoSeptimaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoSeptimaEspecie += parseInt(item.totalCantidadDescuentoSeptimaEspecie2);
                    combinedData[fecha].totalVentaSeptimaEspecie += parseFloat(item.totalVentaSeptimaEspecie2);
                    combinedData[fecha].totalCantidadSeptimaEspecie += parseInt(item.totalCantidadSeptimaEspecie2);
                    combinedData[fecha].totalVentaDescuentoSeptimaEspecie += parseFloat(item.totalVentaDescuentoSeptimaEspecie2);
                });

                response.totalesOctavaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoOctavaEspecie += parseFloat(item.totalPesoOctavaEspecie2);
                    combinedData[fecha].totalPesoDescuentoOctavaEspecie += parseFloat(item.totalPesoDescuentoOctavaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoOctavaEspecie += parseInt(item.totalCantidadDescuentoOctavaEspecie2);
                    combinedData[fecha].totalVentaOctavaEspecie += parseFloat(item.totalVentaOctavaEspecie2);
                    combinedData[fecha].totalCantidadOctavaEspecie += parseInt(item.totalCantidadOctavaEspecie2);
                    combinedData[fecha].totalVentaDescuentoOctavaEspecie += parseFloat(item.totalVentaDescuentoOctavaEspecie2);
                });

                response.totalesDecimaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaEspecie += parseFloat(item.totalPesoDecimaEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaEspecie += parseFloat(item.totalPesoDescuentoDecimaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaEspecie += parseInt(item.totalCantidadDescuentoDecimaEspecie2);
                    combinedData[fecha].totalVentaDecimaEspecie += parseFloat(item.totalVentaDecimaEspecie2);
                    combinedData[fecha].totalCantidadDecimaEspecie += parseInt(item.totalCantidadDecimaEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaEspecie += parseFloat(item.totalVentaDescuentoDecimaEspecie2);
                });

                response.totalesDecimaPrimeraEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaPrimeraEspecie += parseFloat(item.totalPesoDecimaPrimeraEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaPrimeraEspecie += parseFloat(item.totalPesoDescuentoDecimaPrimeraEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaPrimeraEspecie += parseInt(item.totalCantidadDescuentoDecimaPrimeraEspecie2);
                    combinedData[fecha].totalVentaDecimaPrimeraEspecie += parseFloat(item.totalVentaDecimaPrimeraEspecie2);
                    combinedData[fecha].totalCantidadDecimaPrimeraEspecie += parseInt(item.totalCantidadDecimaPrimeraEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaPrimeraEspecie += parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie2);
                });

                response.totalesDecimaSegundaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaSegundaEspecie += parseFloat(item.totalPesoDecimaSegundaEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaSegundaEspecie += parseFloat(item.totalPesoDescuentoDecimaSegundaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaSegundaEspecie += parseInt(item.totalCantidadDescuentoDecimaSegundaEspecie2);
                    combinedData[fecha].totalVentaDecimaSegundaEspecie += parseFloat(item.totalVentaDecimaSegundaEspecie2);
                    combinedData[fecha].totalCantidadDecimaSegundaEspecie += parseInt(item.totalCantidadDecimaSegundaEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaSegundaEspecie += parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie2);
                });

                response.totalesDecimaTerceraEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaTerceraEspecie += parseFloat(item.totalPesoDecimaTerceraEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaTerceraEspecie += parseFloat(item.totalPesoDescuentoDecimaTerceraEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaTerceraEspecie += parseInt(item.totalCantidadDescuentoDecimaTerceraEspecie2);
                    combinedData[fecha].totalVentaDecimaTerceraEspecie += parseFloat(item.totalVentaDecimaTerceraEspecie2);
                    combinedData[fecha].totalCantidadDecimaTerceraEspecie += parseInt(item.totalCantidadDecimaTerceraEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaTerceraEspecie += parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie2);
                });

                response.totalesDecimaCuartaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaCuartaEspecie += parseFloat(item.totalPesoDecimaCuartaEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaCuartaEspecie += parseFloat(item.totalPesoDescuentoDecimaCuartaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaCuartaEspecie += parseInt(item.totalCantidadDescuentoDecimaCuartaEspecie2);
                    combinedData[fecha].totalVentaDecimaCuartaEspecie += parseFloat(item.totalVentaDecimaCuartaEspecie2);
                    combinedData[fecha].totalCantidadDecimaCuartaEspecie += parseInt(item.totalCantidadDecimaCuartaEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaCuartaEspecie += parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie2);
                });

                response.totalesDecimaQuintaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaQuintaEspecie += parseFloat(item.totalPesoDecimaQuintaEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaQuintaEspecie += parseFloat(item.totalPesoDescuentoDecimaQuintaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaQuintaEspecie += parseInt(item.totalCantidadDescuentoDecimaQuintaEspecie2);
                    combinedData[fecha].totalVentaDecimaQuintaEspecie += parseFloat(item.totalVentaDecimaQuintaEspecie2);
                    combinedData[fecha].totalCantidadDecimaQuintaEspecie += parseInt(item.totalCantidadDecimaQuintaEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaQuintaEspecie += parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie2);
                });

                response.totalesDecimaSextaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaSextaEspecie += parseFloat(item.totalPesoDecimaSextaEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaSextaEspecie += parseFloat(item.totalPesoDescuentoDecimaSextaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaSextaEspecie += parseInt(item.totalCantidadDescuentoDecimaSextaEspecie2);
                    combinedData[fecha].totalVentaDecimaSextaEspecie += parseFloat(item.totalVentaDecimaSextaEspecie2);
                    combinedData[fecha].totalCantidadDecimaSextaEspecie += parseInt(item.totalCantidadDecimaSextaEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaSextaEspecie += parseFloat(item.totalVentaDescuentoDecimaSextaEspecie2);
                });

                response.totalesDecimaSeptimaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaSeptimaEspecie += parseFloat(item.totalPesoDecimaSeptimaEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaSeptimaEspecie += parseFloat(item.totalPesoDescuentoDecimaSeptimaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaSeptimaEspecie += parseInt(item.totalCantidadDescuentoDecimaSeptimaEspecie2);
                    combinedData[fecha].totalVentaDecimaSeptimaEspecie += parseFloat(item.totalVentaDecimaSeptimaEspecie2);
                    combinedData[fecha].totalCantidadDecimaSeptimaEspecie += parseInt(item.totalCantidadDecimaSeptimaEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaSeptimaEspecie += parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie2);
                });

                response.totalesDecimaOctavaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0

                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaOctavaEspecie += parseFloat(item.totalPesoDecimaOctavaEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaOctavaEspecie += parseFloat(item.totalPesoDescuentoDecimaOctavaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaOctavaEspecie += parseInt(item.totalCantidadDescuentoDecimaOctavaEspecie2);
                    combinedData[fecha].totalVentaDecimaOctavaEspecie += parseFloat(item.totalVentaDecimaOctavaEspecie2);
                    combinedData[fecha].totalCantidadDecimaOctavaEspecie += parseInt(item.totalCantidadDecimaOctavaEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaOctavaEspecie += parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie2);
                });

                response.totalesDecimaNovenaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoDecimaNovenaEspecie += parseFloat(item.totalPesoDecimaNovenaEspecie2);
                    combinedData[fecha].totalPesoDescuentoDecimaNovenaEspecie += parseFloat(item.totalPesoDescuentoDecimaNovenaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoDecimaNovenaEspecie += parseInt(item.totalCantidadDescuentoDecimaNovenaEspecie2);
                    combinedData[fecha].totalVentaDecimaNovenaEspecie += parseFloat(item.totalVentaDecimaNovenaEspecie2);
                    combinedData[fecha].totalCantidadDecimaNovenaEspecie += parseInt(item.totalCantidadDecimaNovenaEspecie2);
                    combinedData[fecha].totalVentaDescuentoDecimaNovenaEspecie += parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie2);
                });

                response.totalesVigesimaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoVigesimaEspecie += parseFloat(item.totalPesoVigesimaEspecie2);
                    combinedData[fecha].totalPesoDescuentoVigesimaEspecie += parseFloat(item.totalPesoDescuentoVigesimaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoVigesimaEspecie += parseInt(item.totalCantidadDescuentoVigesimaEspecie2);
                    combinedData[fecha].totalVentaVigesimaEspecie += parseFloat(item.totalVentaVigesimaEspecie2);
                    combinedData[fecha].totalCantidadVigesimaEspecie += parseInt(item.totalCantidadVigesimaEspecie2);
                    combinedData[fecha].totalVentaDescuentoVigesimaEspecie += parseFloat(item.totalVentaDescuentoVigesimaEspecie2);
                });

                response.totalesVigesimaPrimeraEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoVigesimaPrimeraEspecie += parseFloat(item.totalPesoVigesimaPrimeraEspecie2);
                    combinedData[fecha].totalPesoDescuentoVigesimaPrimeraEspecie += parseFloat(item.totalPesoDescuentoVigesimaPrimeraEspecie2);
                    combinedData[fecha].totalCantidadDescuentoVigesimaPrimeraEspecie += parseInt(item.totalCantidadDescuentoVigesimaPrimeraEspecie2);
                    combinedData[fecha].totalVentaVigesimaPrimeraEspecie += parseFloat(item.totalVentaVigesimaPrimeraEspecie2);
                    combinedData[fecha].totalCantidadVigesimaPrimeraEspecie += parseInt(item.totalCantidadVigesimaPrimeraEspecie2);
                    combinedData[fecha].totalVentaDescuentoVigesimaPrimeraEspecie += parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie2);
                });

                response.totalesVigesimaSegundaEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoVigesimaSegundaEspecie += parseFloat(item.totalPesoVigesimaSegundaEspecie2);
                    combinedData[fecha].totalPesoDescuentoVigesimaSegundaEspecie += parseFloat(item.totalPesoDescuentoVigesimaSegundaEspecie2);
                    combinedData[fecha].totalCantidadDescuentoVigesimaSegundaEspecie += parseInt(item.totalCantidadDescuentoVigesimaSegundaEspecie2);
                    combinedData[fecha].totalVentaVigesimaSegundaEspecie += parseFloat(item.totalVentaVigesimaSegundaEspecie2);
                    combinedData[fecha].totalCantidadVigesimaSegundaEspecie += parseInt(item.totalCantidadVigesimaSegundaEspecie2);
                    combinedData[fecha].totalVentaDescuentoVigesimaSegundaEspecie += parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie2);
                });

                response.totalesVigesimaTerceraEspecie2.forEach(function (item) {
                    var fecha = item.fechaRegistroPes;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].totalPesoVigesimaTerceraEspecie += parseFloat(item.totalPesoVigesimaTerceraEspecie2);
                    combinedData[fecha].totalPesoDescuentoVigesimaTerceraEspecie += parseFloat(item.totalPesoDescuentoVigesimaTerceraEspecie2);
                    combinedData[fecha].totalCantidadDescuentoVigesimaTerceraEspecie += parseInt(item.totalCantidadDescuentoVigesimaTerceraEspecie2);
                    combinedData[fecha].totalVentaVigesimaTerceraEspecie += parseFloat(item.totalVentaVigesimaTerceraEspecie2);
                    combinedData[fecha].totalCantidadVigesimaTerceraEspecie += parseInt(item.totalCantidadVigesimaTerceraEspecie2);
                    combinedData[fecha].totalVentaDescuentoVigesimaTerceraEspecie += parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie2);
                });
    
                response.totalDescuentos.forEach(function (item) {
                    var fecha = item.fechaRegistroDesc;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
                    combinedData[fecha].totalPesoDescuento = parseFloat(item.totalPesoDescuento);
                    combinedData[fecha].totalVentaDescuento = parseFloat(item.totalVentaDescuento);
                });
    
                response.totalPagos.forEach(function (item) {
                    var fecha = item.fechaOperacionPag;
                    if (!combinedData[fecha]) {
                        combinedData[fecha] = {
                            totalPesoPrimerEspecie: 0,
                            totalPesoDescuentoPrimerEspecie: 0,
                            totalVentaPrimerEspecie: 0,
                            totalCantidadPrimerEspecie: 0,
                            totalPesoSegundaEspecie: 0,
                            totalPesoDescuentoSegundaEspecie: 0,
                            totalVentaSegundaEspecie: 0,
                            totalCantidadSegundaEspecie: 0,
                            totalPesoTerceraEspecie: 0,
                            totalPesoDescuentoTerceraEspecie: 0,
                            totalVentaTerceraEspecie: 0,
                            totalCantidadTerceraEspecie: 0,
                            totalPesoCuartaEspecie: 0,
                            totalPesoDescuentoCuartaEspecie: 0,
                            totalVentaCuartaEspecie: 0,
                            totalCantidadCuartaEspecie: 0,
                            totalPesoQuintaEspecie: 0,
                            totalPesoDescuentoQuintaEspecie: 0,
                            totalVentaQuintaEspecie: 0,
                            totalCantidadQuintaEspecie: 0,
                            totalPesoSextaEspecie: 0,
                            totalPesoDescuentoSextaEspecie: 0,
                            totalVentaSextaEspecie: 0,
                            totalCantidadSextaEspecie: 0,
                            totalPesoSeptimaEspecie: 0,
                            totalPesoDescuentoSeptimaEspecie: 0,
                            totalVentaSeptimaEspecie: 0,
                            totalCantidadSeptimaEspecie: 0,
                            totalPesoOctavaEspecie: 0,
                            totalPesoDescuentoOctavaEspecie: 0,
                            totalVentaOctavaEspecie: 0,
                            totalCantidadOctavaEspecie: 0,
                            totalPesoDecimaEspecie: 0,
                            totalPesoDescuentoDecimaEspecie: 0,
                            totalVentaDecimaEspecie: 0,
                            totalCantidadDecimaEspecie: 0,
                            totalPesoDecimaPrimeraEspecie: 0,
                            totalPesoDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDecimaPrimeraEspecie: 0,
                            totalCantidadDecimaPrimeraEspecie: 0,
                            totalPesoDecimaSegundaEspecie: 0,
                            totalPesoDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDecimaSegundaEspecie: 0,
                            totalCantidadDecimaSegundaEspecie: 0,
                            totalPesoDecimaTerceraEspecie: 0,
                            totalPesoDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDecimaTerceraEspecie: 0,
                            totalCantidadDecimaTerceraEspecie: 0,
                            totalPesoDecimaCuartaEspecie: 0,
                            totalPesoDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDecimaCuartaEspecie: 0,
                            totalCantidadDecimaCuartaEspecie: 0,
                            totalPesoDecimaQuintaEspecie: 0,
                            totalPesoDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDecimaQuintaEspecie: 0,
                            totalCantidadDecimaQuintaEspecie: 0,
                            totalPesoDecimaSextaEspecie: 0,
                            totalPesoDescuentoDecimaSextaEspecie: 0,
                            totalVentaDecimaSextaEspecie: 0,
                            totalCantidadDecimaSextaEspecie: 0,
                            totalPesoDecimaSeptimaEspecie: 0,
                            totalPesoDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDecimaSeptimaEspecie: 0,
                            totalCantidadDecimaSeptimaEspecie: 0,
                            totalPesoDecimaOctavaEspecie: 0,
                            totalPesoDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDecimaOctavaEspecie: 0,
                            totalCantidadDecimaOctavaEspecie: 0,
                            totalPesoDecimaNovenaEspecie: 0,
                            totalPesoDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDecimaNovenaEspecie: 0,
                            totalCantidadDecimaNovenaEspecie: 0,
                            totalPesoVigesimaEspecie: 0,
                            totalPesoDescuentoVigesimaEspecie: 0,
                            totalVentaVigesimaEspecie: 0,
                            totalCantidadVigesimaEspecie: 0,
                            totalPesoVigesimaPrimeraEspecie: 0,
                            totalPesoDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaVigesimaPrimeraEspecie: 0,
                            totalCantidadVigesimaPrimeraEspecie: 0,
                            totalPesoVigesimaSegundaEspecie: 0,
                            totalPesoDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaVigesimaSegundaEspecie: 0,
                            totalCantidadVigesimaSegundaEspecie: 0,
                            totalPesoVigesimaTerceraEspecie: 0,
                            totalPesoDescuentoVigesimaTerceraEspecie: 0,
                            totalVentaVigesimaTerceraEspecie: 0,
                            totalCantidadVigesimaTerceraEspecie: 0,
                            
                            totalPesoDescuento: 0,
                            totalVentaDescuento: 0,
                            pagos: 0,
                            totalCantidadDescuentoPrimerEspecie: 0,
                            totalCantidadDescuentoSegundaEspecie: 0,
                            totalCantidadDescuentoTerceraEspecie: 0,
                            totalCantidadDescuentoCuartaEspecie: 0,
                            totalCantidadDescuentoQuintaEspecie: 0,
                            totalCantidadDescuentoSextaEspecie: 0,
                            totalCantidadDescuentoSeptimaEspecie: 0,
                            totalCantidadDescuentoOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaEspecie: 0,
                            totalCantidadDescuentoDecimaPrimeraEspecie: 0,
                            totalCantidadDescuentoDecimaSegundaEspecie: 0,
                            totalCantidadDescuentoDecimaTerceraEspecie: 0,
                            totalCantidadDescuentoDecimaCuartaEspecie: 0,
                            totalCantidadDescuentoDecimaQuintaEspecie: 0,
                            totalCantidadDescuentoDecimaSextaEspecie: 0,
                            totalCantidadDescuentoDecimaSeptimaEspecie: 0,
                            totalCantidadDescuentoDecimaOctavaEspecie: 0,
                            totalCantidadDescuentoDecimaNovenaEspecie: 0,
                            totalCantidadDescuentoVigesimaEspecie: 0,
                            totalCantidadDescuentoVigesimaPrimeraEspecie: 0,
                            totalCantidadDescuentoVigesimaSegundaEspecie: 0,
                            totalCantidadDescuentoVigesimaTerceraEspecie: 0,

                            totalVentaDescuentoPrimerEspecie: 0,
                            totalVentaDescuentoSegundaEspecie: 0,
                            totalVentaDescuentoTerceraEspecie: 0,
                            totalVentaDescuentoCuartaEspecie: 0,
                            totalVentaDescuentoQuintaEspecie: 0,
                            totalVentaDescuentoSextaEspecie: 0,
                            totalVentaDescuentoSeptimaEspecie: 0,
                            totalVentaDescuentoOctavaEspecie: 0,
                            totalVentaDescuentoDecimaEspecie: 0,
                            totalVentaDescuentoDecimaPrimeraEspecie: 0,
                            totalVentaDescuentoDecimaSegundaEspecie: 0,
                            totalVentaDescuentoDecimaTerceraEspecie: 0,
                            totalVentaDescuentoDecimaCuartaEspecie: 0,
                            totalVentaDescuentoDecimaQuintaEspecie: 0,
                            totalVentaDescuentoDecimaSextaEspecie: 0,
                            totalVentaDescuentoDecimaSeptimaEspecie: 0,
                            totalVentaDescuentoDecimaOctavaEspecie: 0,
                            totalVentaDescuentoDecimaNovenaEspecie: 0,
                            totalVentaDescuentoVigesimaEspecie: 0,
                            totalVentaDescuentoVigesimaPrimeraEspecie: 0,
                            totalVentaDescuentoVigesimaSegundaEspecie: 0,
                            totalVentaDescuentoVigesimaTerceraEspecie: 0
                        };
                    }
    
                    combinedData[fecha].pagos = parseFloat(item.pagos);
                });
    
                // Ahora combinedData contiene los datos combinados por fecha
                fn_CrearTablaCuentaDelCliente(pagoAnterior, ventaAnterior, totalVentaDescuentoAnterior, combinedData, respuestaPagosDetallados);
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }    

    function fn_CrearTablaCuentaDelCliente (pagoAnterior,ventaAnterior,totalVentaDescuentoAnterior,combinedData, respuestaPagosDetallados){
        
        let bodyCuentaDelCliente="";
        let tbodyCuentaDelCliente = $('#bodyCuentaDelCliente');
        tbodyCuentaDelCliente.empty();

        let totalSaldoAnterior = ventaAnterior + parseFloat(totalVentaDescuentoAnterior)
        let totalPagos = pagoAnterior
        
        Object.keys(combinedData).forEach(function(fecha) { 
            bodyCuentaDelCliente += construirFilaFecha(fecha);
            let item = combinedData[fecha]
            bodyCuentaDelCliente += construirFilaDatos(item);
            bodyCuentaDelCliente += construirFilaDatosTotales(item,totalSaldoAnterior,totalPagos, fecha, respuestaPagosDetallados);
            totalPagos += parseFloat(item.pagos);
            let descuentosDePresentaciones = parseFloat(item.totalVentaDescuentoPrimerEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie)+parseFloat(item.totalVentaDescuentoQuintaEspecie)+parseFloat(item.totalVentaDescuentoSextaEspecie)+parseFloat(item.totalVentaDescuentoSeptimaEspecie)+parseFloat(item.totalVentaDescuentoOctavaEspecie)+parseFloat(item.totalVentaDescuentoDecimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie)+parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie)+parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSextaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie)+parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie)
            
            totalSaldoAnterior += parseFloat(item.totalVentaPrimerEspecie)+parseFloat(item.totalVentaSegundaEspecie)+parseFloat(item.totalVentaTerceraEspecie)+parseFloat(item.totalVentaCuartaEspecie)+parseFloat(item.totalVentaQuintaEspecie)+parseFloat(item.totalVentaSextaEspecie)+parseFloat(item.totalVentaSeptimaEspecie)+parseFloat(item.totalVentaOctavaEspecie)+parseFloat(item.totalVentaDecimaEspecie)+parseFloat(item.totalVentaDecimaPrimeraEspecie)+parseFloat(item.totalVentaDecimaSegundaEspecie)+parseFloat(item.totalVentaDecimaTerceraEspecie)+parseFloat(item.totalVentaDecimaCuartaEspecie)+parseFloat(item.totalVentaDecimaQuintaEspecie)+parseFloat(item.totalVentaDecimaSextaEspecie)+parseFloat(item.totalVentaDecimaSeptimaEspecie)+parseFloat(item.totalVentaDecimaOctavaEspecie)+parseFloat(item.totalVentaDecimaNovenaEspecie)+parseFloat(item.totalVentaVigesimaEspecie)+parseFloat(item.totalVentaVigesimaPrimeraEspecie)+parseFloat(item.totalVentaVigesimaSegundaEspecie)+parseFloat(item.totalVentaVigesimaTerceraEspecie)+parseFloat(item.totalVentaDescuento)+descuentosDePresentaciones;
        });
        if (bodyCuentaDelCliente == ""){
            tbodyCuentaDelCliente.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>`);
        }else{
            tbodyCuentaDelCliente.html(bodyCuentaDelCliente);
        }
    }

    function construirFilaDatosTotales(item,totalSaldoAnterior,totalPagos,fecha,respuestaPagosDetallados) {

        let ventasEspecies = parseFloat(item.totalVentaPrimerEspecie)+parseFloat(item.totalVentaSegundaEspecie)+parseFloat(item.totalVentaTerceraEspecie)+parseFloat(item.totalVentaCuartaEspecie)+parseFloat(item.totalVentaQuintaEspecie)+parseFloat(item.totalVentaSextaEspecie)+parseFloat(item.totalVentaSeptimaEspecie)+parseFloat(item.totalVentaOctavaEspecie)+parseFloat(item.totalVentaDecimaEspecie)+parseFloat(item.totalVentaDecimaPrimeraEspecie)+parseFloat(item.totalVentaDecimaSegundaEspecie)+parseFloat(item.totalVentaDecimaTerceraEspecie)+parseFloat(item.totalVentaDecimaCuartaEspecie)+parseFloat(item.totalVentaDecimaQuintaEspecie)+parseFloat(item.totalVentaDecimaSextaEspecie)+parseFloat(item.totalVentaDecimaSeptimaEspecie)+parseFloat(item.totalVentaDecimaOctavaEspecie)+parseFloat(item.totalVentaDecimaNovenaEspecie)+parseFloat(item.totalVentaVigesimaEspecie)+parseFloat(item.totalVentaVigesimaPrimeraEspecie)+parseFloat(item.totalVentaVigesimaSegundaEspecie)+parseFloat(item.totalVentaVigesimaTerceraEspecie)

        let descuentosVentasEspecies = parseFloat(item.totalVentaDescuentoPrimerEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie)+parseFloat(item.totalVentaDescuentoQuintaEspecie)+parseFloat(item.totalVentaDescuentoSextaEspecie)+parseFloat(item.totalVentaDescuentoSeptimaEspecie)+parseFloat(item.totalVentaDescuentoOctavaEspecie)+parseFloat(item.totalVentaDescuentoDecimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie)+parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie)+parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSextaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie)+parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie)+parseFloat(item.totalVentaDescuento)
        
        let totalSaldoAnteriorV = totalSaldoAnterior - parseFloat(totalPagos)

        let totalVentaDelDia = ventasEspecies+(descuentosVentasEspecies)
        let totalVentaDelDiaSaldoAnterior = totalVentaDelDia + parseFloat(totalSaldoAnteriorV)
        let saldoActual = totalVentaDelDiaSaldoAnterior - parseFloat(item.pagos)

        let pagosDetallados = "";
        let masDeUnPago = 0;
        
        if(respuestaPagosDetallados.length > 0) {
            pagosDetallados +=``;
            respuestaPagosDetallados.forEach(function(obj) {
                if (obj.fechaOperacionPag == fecha){
                    if (masDeUnPago == 0){
                        pagosDetallados += `
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap">PAGOS</td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(obj.cantidadAbonoPag).toFixed(2)}</td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                            </tr> `
                        masDeUnPago += 1
                    }else{
                        pagosDetallados += `
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(obj.cantidadAbonoPag).toFixed(2)}</td>
                                                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                                            </tr> `
                    }
                }
            });
        }

        if (masDeUnPago == 0){
            pagosDetallados += `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                    <td class="text-center py-1 px-2 whitespace-nowrap">PAGOS</td>
                    <td class="text-center py-1 px-2 whitespace-nowrap">S/. 0.00</td>
                    <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                </tr> `
        }
        masDeUnPago = 0;

        return `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap">TOTAL VENTA</td>
            <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDelDia).toFixed(2)}</h5></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap">SALDO ANTERIOR</td>
            <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalSaldoAnteriorV).toFixed(2)}</td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
        </tr>
        <tr class="bg-white dark:bg-gray-800 h-0.5">
            <td class="text-center" colspan="2"></td>
            <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap">SALDO DEL DIA</td>
            <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDelDiaSaldoAnterior).toFixed(2)}</td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
        </tr>

        ${pagosDetallados}

        <tr class="bg-white dark:bg-gray-800 h-0.5">
            <td class="text-center" colspan="2"></td>
            <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap">SALDO ACTUAL</td>
            <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(saldoActual).toFixed(2)}</td>
            <td class="text-center py-1 px-2 whitespace-nowrap"></td>
        </tr>
        `;
    }

    function construirFilaFecha(fecha) {
        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap">${fecha}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
            </tr>
        `;
    }

    function construirFilaDatos(item) {

        let precioPrimerEspecie = 0;
        if (parseFloat(item.totalPesoPrimerEspecie) !== 0) {
            precioPrimerEspecie = (parseFloat(item.totalVentaPrimerEspecie) / parseFloat(item.totalPesoPrimerEspecie)).toFixed(2);
        }

        let precioSegundaEspecie = 0;
        if (parseFloat(item.totalPesoSegundaEspecie) !== 0) {
            precioSegundaEspecie = (parseFloat(item.totalVentaSegundaEspecie) / parseFloat(item.totalPesoSegundaEspecie)).toFixed(2);
        }

        let precioTerceraEspecie = 0;
        if (parseFloat(item.totalPesoTerceraEspecie) !== 0) {
            precioTerceraEspecie = (parseFloat(item.totalVentaTerceraEspecie) / parseFloat(item.totalPesoTerceraEspecie)).toFixed(2);
        }

        let precioCuartaEspecie = 0;
        if (parseFloat(item.totalPesoCuartaEspecie) !== 0) {
            precioCuartaEspecie = (parseFloat(item.totalVentaCuartaEspecie) / parseFloat(item.totalPesoCuartaEspecie)).toFixed(2);
        }

        let precioQuintaEspecie = 0;
        if (parseFloat(item.totalPesoQuintaEspecie) !== 0) {
            precioQuintaEspecie = (parseFloat(item.totalVentaQuintaEspecie) / parseFloat(item.totalPesoQuintaEspecie)).toFixed(2);
        }

        let precioSextaEspecie = 0;
        if (parseFloat(item.totalPesoSextaEspecie) !== 0) {
            precioSextaEspecie = (parseFloat(item.totalVentaSextaEspecie) / parseFloat(item.totalPesoSextaEspecie)).toFixed(2);
        }

        let precioSeptimaEspecie = 0;
        if (parseFloat(item.totalPesoSeptimaEspecie) !== 0) {
            precioSeptimaEspecie = (parseFloat(item.totalVentaSeptimaEspecie) / parseFloat(item.totalPesoSeptimaEspecie)).toFixed(2);
        }

        let precioOctavaEspecie = 0;
        if (parseFloat(item.totalPesoOctavaEspecie) !== 0) {
            precioOctavaEspecie = (parseFloat(item.totalVentaOctavaEspecie) / parseFloat(item.totalPesoOctavaEspecie)).toFixed(2);
        }

        let precioDecimaEspecie = 0;
        if (parseFloat(item.totalPesoDecimaEspecie) !== 0) {
            precioDecimaEspecie = (parseFloat(item.totalVentaDecimaEspecie) / parseFloat(item.totalPesoDecimaEspecie)).toFixed(2);
        }

        let precioDecimaPrimeraEspecie = 0;
        if (parseFloat(item.totalPesoDecimaPrimeraEspecie) !== 0) {
            precioDecimaPrimeraEspecie = (parseFloat(item.totalVentaDecimaPrimeraEspecie) / parseFloat(item.totalPesoDecimaPrimeraEspecie)).toFixed(2);
        }

        let precioDecimaSegundaEspecie = 0;
        if (parseFloat(item.totalPesoDecimaSegundaEspecie) !== 0) {
            precioDecimaSegundaEspecie = (parseFloat(item.totalVentaDecimaSegundaEspecie) / parseFloat(item.totalPesoDecimaSegundaEspecie)).toFixed(2);
        }

        let precioDecimaTerceraEspecie = 0;
        if (parseFloat(item.totalPesoDecimaTerceraEspecie) !== 0) {
            precioDecimaTerceraEspecie = (parseFloat(item.totalVentaDecimaTerceraEspecie) / parseFloat(item.totalPesoDecimaTerceraEspecie)).toFixed(2);
        }

        let precioDecimaCuartaEspecie = 0;
        if (parseFloat(item.totalPesoDecimaCuartaEspecie) !== 0) {
            precioDecimaCuartaEspecie = (parseFloat(item.totalVentaDecimaCuartaEspecie) / parseFloat(item.totalPesoDecimaCuartaEspecie)).toFixed(2);
        }

        let precioDecimaQuintaEspecie = 0;
        if (parseFloat(item.totalPesoDecimaQuintaEspecie) !== 0) {
            precioDecimaQuintaEspecie = (parseFloat(item.totalVentaDecimaQuintaEspecie) / parseFloat(item.totalPesoDecimaQuintaEspecie)).toFixed(2);
        }

        let precioDecimaSextaEspecie = 0;
        if (parseFloat(item.totalPesoDecimaSextaEspecie) !== 0) {
            precioDecimaSextaEspecie = (parseFloat(item.totalVentaDecimaSextaEspecie) / parseFloat(item.totalPesoDecimaSextaEspecie)).toFixed(2);
        }

        let precioDecimaSeptimaEspecie = 0;
        if (parseFloat(item.totalPesoDecimaSeptimaEspecie) !== 0) {
            precioDecimaSeptimaEspecie = (parseFloat(item.totalVentaDecimaSeptimaEspecie) / parseFloat(item.totalPesoDecimaSeptimaEspecie)).toFixed(2);
        }

        let precioDecimaOctavaEspecie = 0;
        if (parseFloat(item.totalPesoDecimaOctavaEspecie) !== 0) {
            precioDecimaOctavaEspecie = (parseFloat(item.totalVentaDecimaOctavaEspecie) / parseFloat(item.totalPesoDecimaOctavaEspecie)).toFixed(2);
        }

        let precioDecimaNovenaEspecie = 0;
        if (parseFloat(item.totalPesoDecimaNovenaEspecie) !== 0) {
            precioDecimaNovenaEspecie = (parseFloat(item.totalVentaDecimaNovenaEspecie) / parseFloat(item.totalPesoDecimaNovenaEspecie)).toFixed(2);
        }

        let precioVigesimaEspecie = 0;
        if (parseFloat(item.totalPesoVigesimaEspecie) !== 0) {
            precioVigesimaEspecie = (parseFloat(item.totalVentaVigesimaEspecie) / parseFloat(item.totalPesoVigesimaEspecie)).toFixed(2);
        }

        let precioVigesimaPrimeraEspecie = 0;
        if (parseFloat(item.totalPesoVigesimaPrimeraEspecie) !== 0) {
            precioVigesimaPrimeraEspecie = (parseFloat(item.totalVentaVigesimaPrimeraEspecie) / parseFloat(item.totalPesoVigesimaPrimeraEspecie)).toFixed(2);
        }

        let precioVigesimaSegundaEspecie = 0;
        if (parseFloat(item.totalPesoVigesimaSegundaEspecie) !== 0) {
            precioVigesimaSegundaEspecie = (parseFloat(item.totalVentaVigesimaSegundaEspecie) / parseFloat(item.totalPesoVigesimaSegundaEspecie)).toFixed(2);
        }

        let precioVigesimaTerceraEspecie = 0;
        if (parseFloat(item.totalPesoVigesimaTerceraEspecie) !== 0) {
            precioVigesimaTerceraEspecie = (parseFloat(item.totalVentaVigesimaTerceraEspecie) / parseFloat(item.totalPesoVigesimaTerceraEspecie)).toFixed(2);
        }

        let totalCantidadDescuento = 0
        let totalPesoDescuento = parseFloat(item.totalPesoDescuento)
        let totalVentaDescuento = parseFloat(item.totalVentaDescuento)

        let precioDescuentoEspecies = 0;
        if (totalPesoDescuento !== 0) {
            precioDescuentoEspecies = (totalVentaDescuento / totalPesoDescuento).toFixed(2);
        }

        let totalCantidadPrimerEspecie = parseFloat(item.totalCantidadPrimerEspecie)+parseFloat(item.totalCantidadDescuentoPrimerEspecie);
        let totalCantidadSegundaEspecie = parseFloat(item.totalCantidadSegundaEspecie)+parseFloat(item.totalCantidadDescuentoSegundaEspecie);
        let totalCantidadTerceraEspecie = parseFloat(item.totalCantidadTerceraEspecie)+parseFloat(item.totalCantidadDescuentoTerceraEspecie);
        let totalCantidadCuartaEspecie = parseFloat(item.totalCantidadCuartaEspecie)+parseFloat(item.totalCantidadDescuentoCuartaEspecie);
        let totalCantidadQuintaEspecie = parseFloat(item.totalCantidadQuintaEspecie)+parseFloat(item.totalCantidadDescuentoQuintaEspecie);
        let totalCantidadSextaEspecie = parseFloat(item.totalCantidadSextaEspecie)+parseFloat(item.totalCantidadDescuentoSextaEspecie);
        let totalCantidadSeptimaEspecie = parseFloat(item.totalCantidadSeptimaEspecie)+parseFloat(item.totalCantidadDescuentoSeptimaEspecie);
        let totalCantidadOctavaEspecie = parseFloat(item.totalCantidadOctavaEspecie)+parseFloat(item.totalCantidadDescuentoOctavaEspecie);
        let totalCantidadDecimaEspecie = parseFloat(item.totalCantidadDecimaEspecie)+parseFloat(item.totalCantidadDescuentoDecimaEspecie);
        let totalCantidadDecimaPrimeraEspecie = parseFloat(item.totalCantidadDecimaPrimeraEspecie)+parseFloat(item.totalCantidadDescuentoDecimaPrimeraEspecie);
        let totalCantidadDecimaSegundaEspecie = parseFloat(item.totalCantidadDecimaSegundaEspecie)+parseFloat(item.totalCantidadDescuentoDecimaSegundaEspecie);
        let totalCantidadDecimaTerceraEspecie = parseFloat(item.totalCantidadDecimaTerceraEspecie)+parseFloat(item.totalCantidadDescuentoDecimaTerceraEspecie);
        let totalCantidadDecimaCuartaEspecie = parseFloat(item.totalCantidadDecimaCuartaEspecie)+parseFloat(item.totalCantidadDescuentoDecimaCuartaEspecie);
        let totalCantidadDecimaQuintaEspecie = parseFloat(item.totalCantidadDecimaQuintaEspecie)+parseFloat(item.totalCantidadDescuentoDecimaQuintaEspecie);
        let totalCantidadDecimaSextaEspecie = parseFloat(item.totalCantidadDecimaSextaEspecie)+parseFloat(item.totalCantidadDescuentoDecimaSextaEspecie);
        let totalCantidadDecimaSeptimaEspecie = parseFloat(item.totalCantidadDecimaSeptimaEspecie)+parseFloat(item.totalCantidadDescuentoDecimaSeptimaEspecie);
        let totalCantidadDecimaOctavaEspecie = parseFloat(item.totalCantidadDecimaOctavaEspecie)+parseFloat(item.totalCantidadDescuentoDecimaOctavaEspecie);
        let totalCantidadDecimaNovenaEspecie = parseFloat(item.totalCantidadDecimaNovenaEspecie)+parseFloat(item.totalCantidadDescuentoDecimaNovenaEspecie);
        let totalCantidadVigesimaEspecie = parseFloat(item.totalCantidadVigesimaEspecie)+parseFloat(item.totalCantidadDescuentoVigesimaEspecie);
        let totalCantidadVigesimaPrimeraEspecie = parseFloat(item.totalCantidadVigesimaPrimeraEspecie)+parseFloat(item.totalCantidadDescuentoVigesimaPrimeraEspecie);
        let totalCantidadVigesimaSegundaEspecie = parseFloat(item.totalCantidadVigesimaSegundaEspecie)+parseFloat(item.totalCantidadDescuentoVigesimaSegundaEspecie);
        let totalCantidadVigesimaTerceraEspecie = parseFloat(item.totalCantidadVigesimaTerceraEspecie)+parseFloat(item.totalCantidadDescuentoVigesimaTerceraEspecie);

        let totalPesoPrimerEspecie = parseFloat(item.totalPesoPrimerEspecie)+parseFloat(item.totalPesoDescuentoPrimerEspecie);
        let totalPesoSegundaEspecie = parseFloat(item.totalPesoSegundaEspecie)+parseFloat(item.totalPesoDescuentoSegundaEspecie);
        let totalPesoTerceraEspecie = parseFloat(item.totalPesoTerceraEspecie)+parseFloat(item.totalPesoDescuentoTerceraEspecie);
        let totalPesoCuartaEspecie = parseFloat(item.totalPesoCuartaEspecie)+parseFloat(item.totalPesoDescuentoCuartaEspecie);
        let totalPesoQuintaEspecie = parseFloat(item.totalPesoQuintaEspecie)+parseFloat(item.totalPesoDescuentoQuintaEspecie);
        let totalPesoSextaEspecie = parseFloat(item.totalPesoSextaEspecie)+parseFloat(item.totalPesoDescuentoSextaEspecie);
        let totalPesoSeptimaEspecie = parseFloat(item.totalPesoSeptimaEspecie)+parseFloat(item.totalPesoDescuentoSeptimaEspecie);
        let totalPesoOctavaEspecie = parseFloat(item.totalPesoOctavaEspecie)+parseFloat(item.totalPesoDescuentoOctavaEspecie);
        let totalPesoDecimaEspecie = parseFloat(item.totalPesoDecimaEspecie)+parseFloat(item.totalPesoDescuentoDecimaEspecie);
        let totalPesoDecimaPrimeraEspecie = parseFloat(item.totalPesoDecimaPrimeraEspecie)+parseFloat(item.totalPesoDescuentoDecimaPrimeraEspecie);
        let totalPesoDecimaSegundaEspecie = parseFloat(item.totalPesoDecimaSegundaEspecie)+parseFloat(item.totalPesoDescuentoDecimaSegundaEspecie);
        let totalPesoDecimaTerceraEspecie = parseFloat(item.totalPesoDecimaTerceraEspecie)+parseFloat(item.totalPesoDescuentoDecimaTerceraEspecie);
        let totalPesoDecimaCuartaEspecie = parseFloat(item.totalPesoDecimaCuartaEspecie)+parseFloat(item.totalPesoDescuentoDecimaCuartaEspecie);
        let totalPesoDecimaQuintaEspecie = parseFloat(item.totalPesoDecimaQuintaEspecie)+parseFloat(item.totalPesoDescuentoDecimaQuintaEspecie);
        let totalPesoDecimaSextaEspecie = parseFloat(item.totalPesoDecimaSextaEspecie)+parseFloat(item.totalPesoDescuentoDecimaSextaEspecie);
        let totalPesoDecimaSeptimaEspecie = parseFloat(item.totalPesoDecimaSeptimaEspecie)+parseFloat(item.totalPesoDescuentoDecimaSeptimaEspecie);
        let totalPesoDecimaOctavaEspecie = parseFloat(item.totalPesoDecimaOctavaEspecie)+parseFloat(item.totalPesoDescuentoDecimaOctavaEspecie);
        let totalPesoDecimaNovenaEspecie = parseFloat(item.totalPesoDecimaNovenaEspecie)+parseFloat(item.totalPesoDescuentoDecimaNovenaEspecie);
        let totalPesoVigesimaEspecie = parseFloat(item.totalPesoVigesimaEspecie)+parseFloat(item.totalPesoDescuentoVigesimaEspecie);
        let totalPesoVigesimaPrimeraEspecie = parseFloat(item.totalPesoVigesimaPrimeraEspecie)+parseFloat(item.totalPesoDescuentoVigesimaPrimeraEspecie);
        let totalPesoVigesimaSegundaEspecie = parseFloat(item.totalPesoVigesimaSegundaEspecie)+parseFloat(item.totalPesoDescuentoVigesimaEspecie);
        let totalPesoVigesimaTerceraEspecie = parseFloat(item.totalPesoVigesimaTerceraEspecie)+parseFloat(item.totalPesoDescuentoVigesimaTerceraEspecie);

        let totalVentaPrimerEspecie = parseFloat(item.totalVentaPrimerEspecie)+parseFloat(item.totalVentaDescuentoPrimerEspecie);
        let totalVentaSegundaEspecie = parseFloat(item.totalVentaSegundaEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie);
        let totalVentaTerceraEspecie = parseFloat(item.totalVentaTerceraEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie);
        let totalVentaCuartaEspecie = parseFloat(item.totalVentaCuartaEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie);
        let totalVentaQuintaEspecie = parseFloat(item.totalVentaQuintaEspecie)+parseFloat(item.totalVentaDescuentoQuintaEspecie);
        let totalVentaSextaEspecie = parseFloat(item.totalVentaSextaEspecie)+parseFloat(item.totalVentaDescuentoSextaEspecie);
        let totalVentaSeptimaEspecie = parseFloat(item.totalVentaSeptimaEspecie)+parseFloat(item.totalVentaDescuentoSeptimaEspecie);
        let totalVentaOctavaEspecie = parseFloat(item.totalVentaOctavaEspecie)+parseFloat(item.totalVentaDescuentoOctavaEspecie);
        let totalVentaDecimaEspecie = parseFloat(item.totalVentaDecimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaEspecie);
        let totalVentaDecimaPrimeraEspecie = parseFloat(item.totalVentaDecimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie);
        let totalVentaDecimaSegundaEspecie = parseFloat(item.totalVentaDecimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie);
        let totalVentaDecimaTerceraEspecie = parseFloat(item.totalVentaDecimaTerceraEspecie)+parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie);
        let totalVentaDecimaCuartaEspecie = parseFloat(item.totalVentaDecimaCuartaEspecie)+parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie);
        let totalVentaDecimaQuintaEspecie = parseFloat(item.totalVentaDecimaQuintaEspecie)+parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie);
        let totalVentaDecimaSextaEspecie = parseFloat(item.totalVentaDecimaSextaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSextaEspecie);
        let totalVentaDecimaSeptimaEspecie = parseFloat(item.totalVentaDecimaSeptimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie);
        let totalVentaDecimaOctavaEspecie = parseFloat(item.totalVentaDecimaOctavaEspecie)+parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie);
        let totalVentaDecimaNovenaEspecie = parseFloat(item.totalVentaDecimaNovenaEspecie)+parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie);
        let totalVentaVigesimaEspecie = parseFloat(item.totalVentaVigesimaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaEspecie);
        let totalVentaVigesimaPrimeraEspecie = parseFloat(item.totalVentaVigesimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie);
        let totalVentaVigesimaSegundaEspecie = parseFloat(item.totalVentaVigesimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie);
        let totalVentaVigesimaTerceraEspecie = parseFloat(item.totalVentaVigesimaTerceraEspecie)+parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie);

        return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombrePrimerEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadPrimerEspecie === 1 ? totalCantidadPrimerEspecie + ' Ud.' : totalCantidadPrimerEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoPrimerEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaPrimerEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioPrimerEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreSegundaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadSegundaEspecie === 1 ? totalCantidadSegundaEspecie + ' Ud.' : totalCantidadSegundaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoSegundaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaSegundaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioSegundaEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaSeptimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaSeptimaEspecie === 1 ? totalCantidadDecimaSeptimaEspecie + ' Ud.' : totalCantidadDecimaSeptimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaSeptimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaSeptimaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaSeptimaEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreTerceraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadTerceraEspecie === 1 ? totalCantidadTerceraEspecie + ' Ud.' : totalCantidadTerceraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoTerceraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaTerceraEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioTerceraEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreCuartaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadCuartaEspecie === 1 ? totalCantidadCuartaEspecie + ' Ud.' : totalCantidadCuartaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoCuartaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaCuartaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioCuartaEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaOctavaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaOctavaEspecie === 1 ? totalCantidadDecimaOctavaEspecie + ' Ud.' : totalCantidadDecimaOctavaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaOctavaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaOctavaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaOctavaEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaSextaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaSextaEspecie === 1 ? totalCantidadDecimaSextaEspecie + ' Ud.' : totalCantidadDecimaSextaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaSextaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaSextaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaSextaEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaNovenaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaNovenaEspecie === 1 ? totalCantidadDecimaNovenaEspecie + ' Ud.' : totalCantidadDecimaNovenaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaNovenaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaNovenaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaNovenaEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreQuintaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadQuintaEspecie === 1 ? totalCantidadQuintaEspecie + ' Ud.' : totalCantidadQuintaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoQuintaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaQuintaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioQuintaEspecie}/Kg.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreVigesimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadVigesimaEspecie === 1 ? totalCantidadVigesimaEspecie + ' Ud.' : totalCantidadVigesimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoVigesimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaVigesimaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioVigesimaEspecie}/Kg.</td>
            </tr>
            ${totalVentaSextaEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreSextaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadSextaEspecie === 1 ? totalCantidadSextaEspecie + ' Ud.' : totalCantidadSextaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoSextaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaSextaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioSextaEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaVigesimaPrimeraEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreVigesimaPrimeraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadVigesimaPrimeraEspecie === 1 ? totalCantidadVigesimaPrimeraEspecie + ' Ud.' : totalCantidadVigesimaPrimeraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoVigesimaPrimeraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaVigesimaPrimeraEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioVigesimaPrimeraEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaSeptimaEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreSeptimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadSeptimaEspecie === 1 ? totalCantidadSeptimaEspecie + ' Ud.' : totalCantidadSeptimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoSeptimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaSeptimaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioSeptimaEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaVigesimaSegundaEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreVigesimaSegundaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadVigesimaSegundaEspecie === 1 ? totalCantidadVigesimaSegundaEspecie + ' Ud.' : totalCantidadVigesimaSegundaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoVigesimaSegundaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaVigesimaSegundaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioVigesimaSegundaEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaOctavaEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreOctavaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadOctavaEspecie === 1 ? totalCantidadOctavaEspecie + ' Ud.' : totalCantidadOctavaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoOctavaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaOctavaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioOctavaEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaVigesimaTerceraEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreVigesimaTerceraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadVigesimaTerceraEspecie === 1 ? totalCantidadVigesimaTerceraEspecie + ' Ud.' : totalCantidadVigesimaTerceraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoVigesimaTerceraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaVigesimaTerceraEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioVigesimaTerceraEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaDecimaEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaEspecie === 1 ? totalCantidadDecimaEspecie + ' Ud.' : totalCantidadDecimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaDecimaPrimeraEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaPrimeraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaPrimeraEspecie === 1 ? totalCantidadDecimaPrimeraEspecie + ' Ud.' : totalCantidadDecimaPrimeraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaPrimeraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaPrimeraEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaPrimeraEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaDecimaSegundaEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaSegundaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaSegundaEspecie === 1 ? totalCantidadDecimaSegundaEspecie + ' Ud.' : totalCantidadDecimaSegundaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaSegundaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaSegundaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaSegundaEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaDecimaTerceraEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaTerceraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaTerceraEspecie === 1 ? totalCantidadDecimaTerceraEspecie + ' Ud.' : totalCantidadDecimaTerceraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaTerceraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaTerceraEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaTerceraEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaDecimaCuartaEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaCuartaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaCuartaEspecie === 1 ? totalCantidadDecimaCuartaEspecie + ' Ud.' : totalCantidadDecimaCuartaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaCuartaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaCuartaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaCuartaEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaDecimaQuintaEspecie ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${nombreDecimaQuintaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDecimaQuintaEspecie === 1 ? totalCantidadDecimaQuintaEspecie + ' Ud.' : totalCantidadDecimaQuintaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDecimaQuintaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDecimaQuintaEspecie).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDecimaQuintaEspecie}/Kg.</td>
            </tr>` : ''}
            ${totalVentaDescuento ? `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="text-center py-1 px-2 whitespace-nowrap"></td>
                <td class="text-center py-1 px-2 whitespace-nowrap">DESCUENTO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${totalCantidadDescuento === 1 ? totalCantidadDescuento + ' Ud.' : totalCantidadDescuento + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">${parseFloat(totalPesoDescuento).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${parseFloat(totalVentaDescuento).toFixed(2)}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap">S/. ${precioDescuentoEspecies}/Kg.</td>
            </tr>` : ''}
            <tr class="bg-white dark:bg-gray-800 h-0.5">
                <td class="text-center" colspan="2"></td>
                <td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="4"></td>
            </tr>
        `;
    }

})
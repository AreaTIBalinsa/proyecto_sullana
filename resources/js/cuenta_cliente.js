import jQuery from 'jquery';
import jsPDF from 'jspdf/dist/jspdf.es.min.js';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

window.$ = jQuery;

jQuery(function ($) {

    declarar_especies();
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    $('#fechaCuentaDelCliente').val(fechaHoy);
    $('#fechaCambiarPrecioPesada').val(fechaHoy);

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

                    // Obtener el select
                    let selectPresentacion = $('#presentacionAgregarDescuentoCliente');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectPresentacion.append($('<option>', {
                        value: '0',
                        text: 'Seleccione presentación',
                        disabled: true,
                        selected: true
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
                        });
                        selectPresentacion.append(option);
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
    
    $('#btnBuscarCuentaDelCliente').on('click', function () {
        let fechaHasta = $('#fechaCuentaDelCliente').val();
        let codigoCliente = $('#codigoClienteSeleccionado').val();
        fn_TraerCuentaDelCliente(fechaHasta,fechaHasta,codigoCliente);
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
                ventaAnterior += parseFloat(response.ventaAnterior3 || 0);

                let pagoAnterior = parseFloat(response.pagoAnterior || 0);
                
                let totalVentaDescuentoAnterior = parseFloat(response.totalVentaDescuentoAnterior || 0);
                let respuestaPagosDetallados = response.pagosDetallados
                respuestaPagosDetallados = respuestaPagosDetallados.original
                let respuestaDescuentosDetallados = response.descuentosDetallados
                respuestaDescuentosDetallados = respuestaDescuentosDetallados.original
    
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

                // Inicia 3

                response.totalesPrimerEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoPrimerEspecie += parseFloat(item.totalPesoPrimerEspecie3);
                    combinedData[fecha].totalPesoDescuentoPrimerEspecie += parseFloat(item.totalPesoDescuentoPrimerEspecie3);
                    combinedData[fecha].totalCantidadDescuentoPrimerEspecie += parseInt(item.totalCantidadDescuentoPrimerEspecie3);
                    combinedData[fecha].totalVentaPrimerEspecie += parseFloat(item.totalVentaPrimerEspecie3);
                    combinedData[fecha].totalCantidadPrimerEspecie += parseInt(item.totalCantidadPrimerEspecie3);
                    combinedData[fecha].totalVentaDescuentoPrimerEspecie += parseFloat(item.totalVentaDescuentoPrimerEspecie3);
                });
    
                response.totalesSegundaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoSegundaEspecie += parseFloat(item.totalPesoSegundaEspecie3);
                    combinedData[fecha].totalPesoDescuentoSegundaEspecie += parseFloat(item.totalPesoDescuentoSegundaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoSegundaEspecie += parseInt(item.totalCantidadDescuentoSegundaEspecie3);
                    combinedData[fecha].totalVentaSegundaEspecie += parseFloat(item.totalVentaSegundaEspecie3);
                    combinedData[fecha].totalCantidadSegundaEspecie += parseInt(item.totalCantidadSegundaEspecie3);
                    combinedData[fecha].totalVentaDescuentoSegundaEspecie += parseFloat(item.totalVentaDescuentoSegundaEspecie3);
                });
    
                response.totalesTerceraEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoTerceraEspecie += parseFloat(item.totalPesoTerceraEspecie3);
                    combinedData[fecha].totalPesoDescuentoTerceraEspecie += parseFloat(item.totalPesoDescuentoTerceraEspecie3);
                    combinedData[fecha].totalCantidadDescuentoTerceraEspecie += parseInt(item.totalCantidadDescuentoTerceraEspecie3);
                    combinedData[fecha].totalVentaTerceraEspecie += parseFloat(item.totalVentaTerceraEspecie3);
                    combinedData[fecha].totalCantidadTerceraEspecie += parseInt(item.totalCantidadTerceraEspecie3);
                    combinedData[fecha].totalVentaDescuentoTerceraEspecie += parseFloat(item.totalVentaDescuentoTerceraEspecie3);
                });
    
                response.totalesCuartaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoCuartaEspecie += parseFloat(item.totalPesoCuartaEspecie3);
                    combinedData[fecha].totalPesoDescuentoCuartaEspecie += parseFloat(item.totalPesoDescuentoCuartaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoCuartaEspecie += parseInt(item.totalCantidadDescuentoCuartaEspecie3);
                    combinedData[fecha].totalVentaCuartaEspecie += parseFloat(item.totalVentaCuartaEspecie3);
                    combinedData[fecha].totalCantidadCuartaEspecie += parseInt(item.totalCantidadCuartaEspecie3);
                    combinedData[fecha].totalVentaDescuentoCuartaEspecie += parseFloat(item.totalVentaDescuentoCuartaEspecie3);
                });

                // Inicia

                response.totalesQuintaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoQuintaEspecie += parseFloat(item.totalPesoQuintaEspecie3);
                    combinedData[fecha].totalPesoDescuentoQuintaEspecie += parseFloat(item.totalPesoDescuentoQuintaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoQuintaEspecie += parseInt(item.totalCantidadDescuentoQuintaEspecie3);
                    combinedData[fecha].totalVentaQuintaEspecie += parseFloat(item.totalVentaQuintaEspecie3);
                    combinedData[fecha].totalCantidadQuintaEspecie += parseInt(item.totalCantidadQuintaEspecie3);
                    combinedData[fecha].totalVentaDescuentoQuintaEspecie += parseFloat(item.totalVentaDescuentoQuintaEspecie3);
                });

                response.totalesSextaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoSextaEspecie += parseFloat(item.totalPesoSextaEspecie3);
                    combinedData[fecha].totalPesoDescuentoSextaEspecie += parseFloat(item.totalPesoDescuentoSextaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoSextaEspecie += parseInt(item.totalCantidadDescuentoSextaEspecie3);
                    combinedData[fecha].totalVentaSextaEspecie += parseFloat(item.totalVentaSextaEspecie3);
                    combinedData[fecha].totalCantidadSextaEspecie += parseInt(item.totalCantidadSextaEspecie3);
                    combinedData[fecha].totalVentaDescuentoSextaEspecie += parseFloat(item.totalVentaDescuentoSextaEspecie3);
                });

                response.totalesSeptimaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoSeptimaEspecie += parseFloat(item.totalPesoSeptimaEspecie3);
                    combinedData[fecha].totalPesoDescuentoSeptimaEspecie += parseFloat(item.totalPesoDescuentoSeptimaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoSeptimaEspecie += parseInt(item.totalCantidadDescuentoSeptimaEspecie3);
                    combinedData[fecha].totalVentaSeptimaEspecie += parseFloat(item.totalVentaSeptimaEspecie3);
                    combinedData[fecha].totalCantidadSeptimaEspecie += parseInt(item.totalCantidadSeptimaEspecie3);
                    combinedData[fecha].totalVentaDescuentoSeptimaEspecie += parseFloat(item.totalVentaDescuentoSeptimaEspecie3);
                });

                response.totalesOctavaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoOctavaEspecie += parseFloat(item.totalPesoOctavaEspecie3);
                    combinedData[fecha].totalPesoDescuentoOctavaEspecie += parseFloat(item.totalPesoDescuentoOctavaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoOctavaEspecie += parseInt(item.totalCantidadDescuentoOctavaEspecie3);
                    combinedData[fecha].totalVentaOctavaEspecie += parseFloat(item.totalVentaOctavaEspecie3);
                    combinedData[fecha].totalCantidadOctavaEspecie += parseInt(item.totalCantidadOctavaEspecie3);
                    combinedData[fecha].totalVentaDescuentoOctavaEspecie += parseFloat(item.totalVentaDescuentoOctavaEspecie3);
                });

                response.totalesDecimaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaEspecie += parseFloat(item.totalPesoDecimaEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaEspecie += parseFloat(item.totalPesoDescuentoDecimaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaEspecie += parseInt(item.totalCantidadDescuentoDecimaEspecie3);
                    combinedData[fecha].totalVentaDecimaEspecie += parseFloat(item.totalVentaDecimaEspecie3);
                    combinedData[fecha].totalCantidadDecimaEspecie += parseInt(item.totalCantidadDecimaEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaEspecie += parseFloat(item.totalVentaDescuentoDecimaEspecie3);
                });

                response.totalesDecimaPrimeraEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaPrimeraEspecie += parseFloat(item.totalPesoDecimaPrimeraEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaPrimeraEspecie += parseFloat(item.totalPesoDescuentoDecimaPrimeraEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaPrimeraEspecie += parseInt(item.totalCantidadDescuentoDecimaPrimeraEspecie3);
                    combinedData[fecha].totalVentaDecimaPrimeraEspecie += parseFloat(item.totalVentaDecimaPrimeraEspecie3);
                    combinedData[fecha].totalCantidadDecimaPrimeraEspecie += parseInt(item.totalCantidadDecimaPrimeraEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaPrimeraEspecie += parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie3);
                });

                response.totalesDecimaSegundaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaSegundaEspecie += parseFloat(item.totalPesoDecimaSegundaEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaSegundaEspecie += parseFloat(item.totalPesoDescuentoDecimaSegundaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaSegundaEspecie += parseInt(item.totalCantidadDescuentoDecimaSegundaEspecie3);
                    combinedData[fecha].totalVentaDecimaSegundaEspecie += parseFloat(item.totalVentaDecimaSegundaEspecie3);
                    combinedData[fecha].totalCantidadDecimaSegundaEspecie += parseInt(item.totalCantidadDecimaSegundaEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaSegundaEspecie += parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie3);
                });

                response.totalesDecimaTerceraEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaTerceraEspecie += parseFloat(item.totalPesoDecimaTerceraEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaTerceraEspecie += parseFloat(item.totalPesoDescuentoDecimaTerceraEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaTerceraEspecie += parseInt(item.totalCantidadDescuentoDecimaTerceraEspecie3);
                    combinedData[fecha].totalVentaDecimaTerceraEspecie += parseFloat(item.totalVentaDecimaTerceraEspecie3);
                    combinedData[fecha].totalCantidadDecimaTerceraEspecie += parseInt(item.totalCantidadDecimaTerceraEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaTerceraEspecie += parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie3);
                });

                response.totalesDecimaCuartaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaCuartaEspecie += parseFloat(item.totalPesoDecimaCuartaEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaCuartaEspecie += parseFloat(item.totalPesoDescuentoDecimaCuartaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaCuartaEspecie += parseInt(item.totalCantidadDescuentoDecimaCuartaEspecie3);
                    combinedData[fecha].totalVentaDecimaCuartaEspecie += parseFloat(item.totalVentaDecimaCuartaEspecie3);
                    combinedData[fecha].totalCantidadDecimaCuartaEspecie += parseInt(item.totalCantidadDecimaCuartaEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaCuartaEspecie += parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie3);
                });

                response.totalesDecimaQuintaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaQuintaEspecie += parseFloat(item.totalPesoDecimaQuintaEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaQuintaEspecie += parseFloat(item.totalPesoDescuentoDecimaQuintaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaQuintaEspecie += parseInt(item.totalCantidadDescuentoDecimaQuintaEspecie3);
                    combinedData[fecha].totalVentaDecimaQuintaEspecie += parseFloat(item.totalVentaDecimaQuintaEspecie3);
                    combinedData[fecha].totalCantidadDecimaQuintaEspecie += parseInt(item.totalCantidadDecimaQuintaEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaQuintaEspecie += parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie3);
                });

                response.totalesDecimaSextaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaSextaEspecie += parseFloat(item.totalPesoDecimaSextaEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaSextaEspecie += parseFloat(item.totalPesoDescuentoDecimaSextaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaSextaEspecie += parseInt(item.totalCantidadDescuentoDecimaSextaEspecie3);
                    combinedData[fecha].totalVentaDecimaSextaEspecie += parseFloat(item.totalVentaDecimaSextaEspecie3);
                    combinedData[fecha].totalCantidadDecimaSextaEspecie += parseInt(item.totalCantidadDecimaSextaEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaSextaEspecie += parseFloat(item.totalVentaDescuentoDecimaSextaEspecie3);
                });

                response.totalesDecimaSeptimaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaSeptimaEspecie += parseFloat(item.totalPesoDecimaSeptimaEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaSeptimaEspecie += parseFloat(item.totalPesoDescuentoDecimaSeptimaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaSeptimaEspecie += parseInt(item.totalCantidadDescuentoDecimaSeptimaEspecie3);
                    combinedData[fecha].totalVentaDecimaSeptimaEspecie += parseFloat(item.totalVentaDecimaSeptimaEspecie3);
                    combinedData[fecha].totalCantidadDecimaSeptimaEspecie += parseInt(item.totalCantidadDecimaSeptimaEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaSeptimaEspecie += parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie3);
                });

                response.totalesDecimaOctavaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaOctavaEspecie += parseFloat(item.totalPesoDecimaOctavaEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaOctavaEspecie += parseFloat(item.totalPesoDescuentoDecimaOctavaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaOctavaEspecie += parseInt(item.totalCantidadDescuentoDecimaOctavaEspecie3);
                    combinedData[fecha].totalVentaDecimaOctavaEspecie += parseFloat(item.totalVentaDecimaOctavaEspecie3);
                    combinedData[fecha].totalCantidadDecimaOctavaEspecie += parseInt(item.totalCantidadDecimaOctavaEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaOctavaEspecie += parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie3);
                });

                response.totalesDecimaNovenaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoDecimaNovenaEspecie += parseFloat(item.totalPesoDecimaNovenaEspecie3);
                    combinedData[fecha].totalPesoDescuentoDecimaNovenaEspecie += parseFloat(item.totalPesoDescuentoDecimaNovenaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoDecimaNovenaEspecie += parseInt(item.totalCantidadDescuentoDecimaNovenaEspecie3);
                    combinedData[fecha].totalVentaDecimaNovenaEspecie += parseFloat(item.totalVentaDecimaNovenaEspecie3);
                    combinedData[fecha].totalCantidadDecimaNovenaEspecie += parseInt(item.totalCantidadDecimaNovenaEspecie3);
                    combinedData[fecha].totalVentaDescuentoDecimaNovenaEspecie += parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie3);
                });

                response.totalesVigesimaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoVigesimaEspecie += parseFloat(item.totalPesoVigesimaEspecie3);
                    combinedData[fecha].totalPesoDescuentoVigesimaEspecie += parseFloat(item.totalPesoDescuentoVigesimaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoVigesimaEspecie += parseInt(item.totalCantidadDescuentoVigesimaEspecie3);
                    combinedData[fecha].totalVentaVigesimaEspecie += parseFloat(item.totalVentaVigesimaEspecie3);
                    combinedData[fecha].totalCantidadVigesimaEspecie += parseInt(item.totalCantidadVigesimaEspecie3);
                    combinedData[fecha].totalVentaDescuentoVigesimaEspecie += parseFloat(item.totalVentaDescuentoVigesimaEspecie3);
                });

                response.totalesVigesimaPrimeraEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoVigesimaPrimeraEspecie += parseFloat(item.totalPesoVigesimaPrimeraEspecie3);
                    combinedData[fecha].totalPesoDescuentoVigesimaPrimeraEspecie += parseFloat(item.totalPesoDescuentoVigesimaPrimeraEspecie3);
                    combinedData[fecha].totalCantidadDescuentoVigesimaPrimeraEspecie += parseInt(item.totalCantidadDescuentoVigesimaPrimeraEspecie3);
                    combinedData[fecha].totalVentaVigesimaPrimeraEspecie += parseFloat(item.totalVentaVigesimaPrimeraEspecie3);
                    combinedData[fecha].totalCantidadVigesimaPrimeraEspecie += parseInt(item.totalCantidadVigesimaPrimeraEspecie3);
                    combinedData[fecha].totalVentaDescuentoVigesimaPrimeraEspecie += parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie3);
                });

                response.totalesVigesimaSegundaEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoVigesimaSegundaEspecie += parseFloat(item.totalPesoVigesimaSegundaEspecie3);
                    combinedData[fecha].totalPesoDescuentoVigesimaSegundaEspecie += parseFloat(item.totalPesoDescuentoVigesimaSegundaEspecie3);
                    combinedData[fecha].totalCantidadDescuentoVigesimaSegundaEspecie += parseInt(item.totalCantidadDescuentoVigesimaSegundaEspecie3);
                    combinedData[fecha].totalVentaVigesimaSegundaEspecie += parseFloat(item.totalVentaVigesimaSegundaEspecie3);
                    combinedData[fecha].totalCantidadVigesimaSegundaEspecie += parseInt(item.totalCantidadVigesimaSegundaEspecie3);
                    combinedData[fecha].totalVentaDescuentoVigesimaSegundaEspecie += parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie3);
                });

                response.totalesVigesimaTerceraEspecie3.forEach(function (item) {
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
    
                    combinedData[fecha].totalPesoVigesimaTerceraEspecie += parseFloat(item.totalPesoVigesimaTerceraEspecie3);
                    combinedData[fecha].totalPesoDescuentoVigesimaTerceraEspecie += parseFloat(item.totalPesoDescuentoVigesimaTerceraEspecie3);
                    combinedData[fecha].totalCantidadDescuentoVigesimaTerceraEspecie += parseInt(item.totalCantidadDescuentoVigesimaTerceraEspecie3);
                    combinedData[fecha].totalVentaVigesimaTerceraEspecie += parseFloat(item.totalVentaVigesimaTerceraEspecie3);
                    combinedData[fecha].totalCantidadVigesimaTerceraEspecie += parseInt(item.totalCantidadVigesimaTerceraEspecie3);
                    combinedData[fecha].totalVentaDescuentoVigesimaTerceraEspecie += parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie3);
                });

                // Termina 3
    
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
                    var fecha = item.fechaRegistroPag;
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
                fn_CrearTablaCuentaDelCliente(pagoAnterior, ventaAnterior, totalVentaDescuentoAnterior, combinedData, respuestaPagosDetallados, respuestaDescuentosDetallados);
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    } 

    function fn_CrearTablaCuentaDelCliente (pagoAnterior,ventaAnterior,totalVentaDescuentoAnterior,combinedData, respuestaPagosDetallados, respuestaDescuentosDetallados){
        
        let bodyCuentaDelCliente="";
        let tbodyCuentaDelCliente = $('#bodyCuentaDelCliente');
        tbodyCuentaDelCliente.empty();
        let tbodyCuentaDelClientePagos = $('#bodyCuentaDelClientePagos');
        tbodyCuentaDelClientePagos.empty();
        let mensajeDeudaDiaCliente = $("#mensajeDeuda")

        let totalSaldoAnterior = ventaAnterior
        let totalPagos = pagoAnterior + parseFloat(totalVentaDescuentoAnterior)
        
        Object.keys(combinedData).forEach(function(fecha) { 
            let item = combinedData[fecha]
            bodyCuentaDelCliente += construirFilaDatos(item, fecha, respuestaDescuentosDetallados);
            bodyCuentaDelCliente += construirFilaDatosTotales(item,totalSaldoAnterior,totalPagos, fecha, respuestaPagosDetallados, respuestaDescuentosDetallados);
            totalPagos += parseFloat(item.pagos);
            let descuentosDePresentaciones = parseFloat(item.totalVentaDescuentoPrimerEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie)+parseFloat(item.totalVentaDescuentoQuintaEspecie)+parseFloat(item.totalVentaDescuentoSextaEspecie)+parseFloat(item.totalVentaDescuentoSeptimaEspecie)+parseFloat(item.totalVentaDescuentoOctavaEspecie)+parseFloat(item.totalVentaDescuentoDecimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie)+parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie)+parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSextaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie)+parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie)
            
            totalSaldoAnterior += parseFloat(item.totalVentaPrimerEspecie)+parseFloat(item.totalVentaSegundaEspecie)+parseFloat(item.totalVentaTerceraEspecie)+parseFloat(item.totalVentaCuartaEspecie)+parseFloat(item.totalVentaQuintaEspecie)+parseFloat(item.totalVentaSextaEspecie)+parseFloat(item.totalVentaSeptimaEspecie)+parseFloat(item.totalVentaOctavaEspecie)+parseFloat(item.totalVentaDecimaEspecie)+parseFloat(item.totalVentaDecimaPrimeraEspecie)+parseFloat(item.totalVentaDecimaSegundaEspecie)+parseFloat(item.totalVentaDecimaTerceraEspecie)+parseFloat(item.totalVentaDecimaCuartaEspecie)+parseFloat(item.totalVentaDecimaQuintaEspecie)+parseFloat(item.totalVentaDecimaSextaEspecie)+parseFloat(item.totalVentaDecimaSeptimaEspecie)+parseFloat(item.totalVentaDecimaOctavaEspecie)+parseFloat(item.totalVentaDecimaNovenaEspecie)+parseFloat(item.totalVentaVigesimaEspecie)+parseFloat(item.totalVentaVigesimaPrimeraEspecie)+parseFloat(item.totalVentaVigesimaSegundaEspecie)+parseFloat(item.totalVentaVigesimaTerceraEspecie)+parseFloat(item.totalVentaDescuento)+descuentosDePresentaciones;
        });
        if (bodyCuentaDelCliente == ""){
            tbodyCuentaDelCliente.html(`<tr class="rounded-lg border-b-2 bg-white"><td colspan="7" class="text-center">No hay datos</td></tr>`);
            tbodyCuentaDelClientePagos.html(`<tr class="rounded-lg border-b-2 bg-white"><td colspan="2" class="text-center">No hay datos</td></tr>`);
            mensajeDeudaDiaCliente.empty();
        }else{
            tbodyCuentaDelCliente.html(bodyCuentaDelCliente);

            // // Aplica rowspan dinámicamente a la celda de pagos
            // const pagosCelda = document.getElementById('idDeTablaPagos');
            // const pagosRows = tableBody.getElementsByClassName('contarFilaPagos');

            // // Asigna el rowspan basado en el número de filas con la clase 'contarFilaPagos'
            // pagosCelda.rowSpan = pagosRows.length;

            // // Elimina las celdas adicionales en la primera columna de las filas con la clase 'contarFilaPagos'
            // for (let i = 1; i < pagosRows.length; i++) {
            //     pagosRows[i].deleteCell(0);
            // }

            function formatearFecha(fechaISO) {
                const [year, month, day] = fechaISO.split('-').map(Number);
                const fecha = new Date(year, month - 1, day); // Crear el objeto Date con los componentes individuales
            
                const opciones = { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                };
            
                // Formatear la fecha
                const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
            
                // Capitalizar la primera letra del día
                return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
            }

            let lblTotalCuentaDia = $("#totalCuentaDia").attr("value")
            let lblTotalPagos = $("#totalPagos").attr("value")
            let lblTotalSaldo = $("#totalSaldo").attr("value")
            let fechaCuentaDelCliente = $('#fechaCuentaDelCliente').val().trim();
            let fechaFormateada = formatearFecha(fechaCuentaDelCliente);

            if (lblTotalCuentaDia != "" && lblTotalPagos != ""){
                let deudaDiaCalculo = parseFloat(lblTotalCuentaDia)-parseFloat(lblTotalPagos);
                let totalSaldo = parseFloat(lblTotalSaldo);
                let calculoAFavor = 0;
                totalSaldo = parseFloat(totalSaldo.toFixed(2));
                calculoAFavor = totalSaldo + deudaDiaCalculo;

                let totalFormateadoDeudaDiaCalculo = deudaDiaCalculo.toLocaleString('es-ES', {
                    minimumFractionDigits: 2,   
                    maximumFractionDigits: 2,
                    useGrouping: true,
                });
                let totalFormateadoLblTotalPagos = parseFloat(lblTotalPagos).toLocaleString('es-ES', {
                    minimumFractionDigits: 2,   
                    maximumFractionDigits: 2,
                    useGrouping: true,
                });
                let totalFormateadoLblTotalCuentaDia = parseFloat(lblTotalCuentaDia).toLocaleString('es-ES', {
                    minimumFractionDigits: 2,   
                    maximumFractionDigits: 2,
                    useGrouping: true,
                });

                let totalFormateadototalSaldo = parseFloat(totalSaldo).toLocaleString('es-ES', {
                    minimumFractionDigits: 2,   
                    maximumFractionDigits: 2,
                    useGrouping: true,
                });
                let totalFormateadocalculoAFavor = parseFloat(calculoAFavor).toLocaleString('es-ES', {
                    minimumFractionDigits: 2,   
                    maximumFractionDigits: 2,
                    useGrouping: true,
                });
                mensajeDeudaDiaCliente.empty();
                mensajeDeudaDiaCliente.html(`<p id="mensajeDeudaDia" class="md:mx-5 md:text-left text-center font-semibold text-black">El día de hoy ${fechaFormateada} ,  el monto de su guía es <b>${totalFormateadoLblTotalCuentaDia}</b> , ha abonado <b>${totalFormateadoLblTotalPagos}</b> . Dejando un saldo pendiente de <b>${totalFormateadoDeudaDiaCalculo}</b> . Así mismo teniendo en cuenta el saldo anterior <b>${totalFormateadototalSaldo}</b> , con el abono de hoy ${fechaFormateada} , su saldo actual es por el monto de <b>${totalFormateadocalculoAFavor}</b> .</p>`);
            }else{
                mensajeDeudaDiaCliente.empty();
                mensajeDeudaDiaCliente.html(`<p id="mensajeDeudaDia"></p>`);
            }

            let nombreCliente = $('#inputNombreClientes').val().trim();

            $('#cuentaClienteNombre').html(nombreCliente);
            contarFilas();

            const fechaCelda = document.getElementById('fechaTabla');
            const tableBody = document.getElementById('bodyCuentaDelCliente');
            const rows = tableBody.getElementsByTagName('tr');

            // Aplica rowspan dinámicamente
            fechaCelda.rowSpan = rows.length;

            // Elimina las celdas adicionales en la primera columna
            for (let i = 1; i < rows.length; i++) {
                rows[i].deleteCell(0);
            }
        }
    }

    var saldoActualGlobal = 0

    function construirFilaDatosTotales(item,totalSaldoAnterior,totalPagos,fecha,respuestaPagosDetallados) {

        let ventasEspecies = parseFloat(item.totalVentaPrimerEspecie)+parseFloat(item.totalVentaSegundaEspecie)+parseFloat(item.totalVentaTerceraEspecie)+parseFloat(item.totalVentaCuartaEspecie)+parseFloat(item.totalVentaQuintaEspecie)+parseFloat(item.totalVentaSextaEspecie)+parseFloat(item.totalVentaSeptimaEspecie)+parseFloat(item.totalVentaOctavaEspecie)+parseFloat(item.totalVentaDecimaEspecie)+parseFloat(item.totalVentaDecimaPrimeraEspecie)+parseFloat(item.totalVentaDecimaSegundaEspecie)+parseFloat(item.totalVentaDecimaTerceraEspecie)+parseFloat(item.totalVentaDecimaCuartaEspecie)+parseFloat(item.totalVentaDecimaQuintaEspecie)+parseFloat(item.totalVentaDecimaSextaEspecie)+parseFloat(item.totalVentaDecimaSeptimaEspecie)+parseFloat(item.totalVentaDecimaOctavaEspecie)+parseFloat(item.totalVentaDecimaNovenaEspecie)+parseFloat(item.totalVentaVigesimaEspecie)+parseFloat(item.totalVentaVigesimaPrimeraEspecie)+parseFloat(item.totalVentaVigesimaSegundaEspecie)+parseFloat(item.totalVentaVigesimaTerceraEspecie)

        let descuentosVentasEspecies = parseFloat(item.totalVentaDescuentoPrimerEspecie)+parseFloat(item.totalVentaDescuentoSegundaEspecie)+parseFloat(item.totalVentaDescuentoTerceraEspecie)+parseFloat(item.totalVentaDescuentoCuartaEspecie)+parseFloat(item.totalVentaDescuentoQuintaEspecie)+parseFloat(item.totalVentaDescuentoSextaEspecie)+parseFloat(item.totalVentaDescuentoSeptimaEspecie)+parseFloat(item.totalVentaDescuentoOctavaEspecie)+parseFloat(item.totalVentaDescuentoDecimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoDecimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoDecimaTerceraEspecie)+parseFloat(item.totalVentaDescuentoDecimaCuartaEspecie)+parseFloat(item.totalVentaDescuentoDecimaQuintaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSextaEspecie)+parseFloat(item.totalVentaDescuentoDecimaSeptimaEspecie)+parseFloat(item.totalVentaDescuentoDecimaOctavaEspecie)+parseFloat(item.totalVentaDescuentoDecimaNovenaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaPrimeraEspecie)+parseFloat(item.totalVentaDescuentoVigesimaSegundaEspecie)+parseFloat(item.totalVentaDescuentoVigesimaTerceraEspecie)+parseFloat(item.totalVentaDescuento)
        
        let totalSaldoAnteriorV = totalSaldoAnterior - parseFloat(totalPagos)

        let totalVentaDelDia = ventasEspecies+(descuentosVentasEspecies)
        let totalVentaDelDiaSaldoAnterior = totalVentaDelDia + parseFloat(totalSaldoAnteriorV)
        let saldoActual = totalVentaDelDiaSaldoAnterior - parseFloat(item.pagos)

        let pagosDetallados = "";
        let masDeUnPago = 0;

        let pagosDeHoy = 0;
        let pagosSumados = 0;
        let pagosARestar = 0;

        let pasoUnaVez = 0;

        function formatFecha(fecha) {
            const partes = fecha.split('-');
            return partes[2] + '-' + partes[1]; // Formato dd-mm
        }

        function limpiarNombreBanco(nombre) {
            // Expresiones regulares para detectar variantes y limpiar el nombre
            const regexBCP = /^BCP/;
            const regexBBVA = /^BBVA/;
            const regexIBK = /^IBK/;
            const regexCajaPiura = /^CAJA PIURA/;
            const regexCMAC = /^CMAC/;
            const regexYAPE = /^YAPE/;
        
            if (regexBCP.test(nombre)) {
                return "BCP";
            } else if (regexBBVA.test(nombre)) {
                return "BBVA";
            } else if (regexIBK.test(nombre)) {
                return "IBK";
            } else if (regexCajaPiura.test(nombre)) {
                return "CAJA PIURA";
            } else if (regexCMAC.test(nombre)) {
                return "CMAC";
            } else if (regexYAPE.test(nombre)) {
                return "YAPE";
            } else {
                return nombre; // Devuelve el nombre original si no coincide con ninguna variante
            }
        }

        let tbodyCuentaDelClientePagos = $('#bodyCuentaDelClientePagos');
        tbodyCuentaDelClientePagos.empty();
        let bodyCuentaDelClientePagos="";

        let variableBandera = true;

        if ($('#checkboxID').prop('checked')) {
            variableBandera = true;
        } else {
            variableBandera = false;
        }
        
        
        if(respuestaPagosDetallados.length > 0) {
            pagosDetallados +=``;
            respuestaPagosDetallados.forEach(function(obj) {
                if (obj.fechaOperacionPag != fecha && obj.fechaRegistroPag == fecha){
                    if(obj.tipoAbonoPag != "Saldo"){
                        pagosARestar += parseFloat(obj.cantidadAbonoPag);
                    }
                }
                if (obj.fechaOperacionPag == fecha || obj.fechaRegistroPag == fecha){
                    if(obj.tipoAbonoPag != "Saldo"){
                        if (variableBandera){
                            if (obj.fechaOperacionPag == fecha ){
                                pagosDeHoy += parseFloat(obj.cantidadAbonoPag);
                            }
                        }else{
                            if (obj.fechaRegistroPag == fecha ){
                                pagosDeHoy += parseFloat(obj.cantidadAbonoPag);
                            }
                        }
                        if (masDeUnPago == 0){
                            pagosDetallados += `
                                                <tr class="bg-white border-b contarFilaPagos border-black">
                                                    <td class="tablaEditableCuentaCliente sumarContenidoTabla text-center py-1 p-4 whitespace-nowrap font-semibold border-r-2 border-black">${obj.bancaPago === "FLETE" ? `<span class='text-red-600 font-bold'>${(parseFloat(obj.cantidadAbonoPag)*-1).toFixed(2)}</span>` : `${parseFloat(obj.cantidadAbonoPag).toFixed(2)}` }</td>
                                                    <td class="tablaEditableCuentaCliente convertirTextoMayuscula text-center py-1 p-4 whitespace-nowrap text-[#162B4E]">${obj.bancaPago === null ? obj.clasificacionPago == "2" ? obj.tipoAbonoPag + " CAMAL" : obj.tipoAbonoPag + " PAUL"  : limpiarNombreBanco(obj.bancaPago)} ${obj.fechaOperacionPag == fecha ? "" : formatFecha(obj.fechaOperacionPag)}</td>
                                                </tr>`
                            masDeUnPago += 1;
                        }else{
                            if (obj.fechaOperacionPag == fecha && pasoUnaVez == 0){
                                pagosDetallados += `
                                                <tr class="bg-white border-b contarFilaPagos border-black">
                                                    <td class="tablaEditableCuentaCliente sumarContenidoTabla text-center py-1 p-4 whitespace-nowrap font-semibold border-r-2 border-black">${obj.bancaPago === "FLETE" ? `<span class='text-red-600 font-bold'>${(parseFloat(obj.cantidadAbonoPag)*-1).toFixed(2)}</span>` : `${parseFloat(obj.cantidadAbonoPag).toFixed(2)}` }</td>
                                                    <td class="tablaEditableCuentaCliente convertirTextoMayuscula text-center py-1 p-4 whitespace-nowrap text-[#162B4E]">${obj.bancaPago === null ? obj.clasificacionPago == "2" ? obj.tipoAbonoPag + " CAMAL" : obj.tipoAbonoPag + " PAUL"  : limpiarNombreBanco(obj.bancaPago)} ${obj.fechaOperacionPag == fecha ? "" : formatFecha(obj.fechaOperacionPag)}</td>
                                                </tr> `
                                pasoUnaVez += 1;
                            }else{
                                pagosDetallados += `
                                                <tr class="bg-white border-b contarFilaPagos border-black">
                                                    <td class="tablaEditableCuentaCliente sumarContenidoTabla text-center py-1 p-4 whitespace-nowrap font-semibold border-r-2 border-black">${obj.bancaPago === "FLETE" ? `<span class='text-red-600 font-bold'>${(parseFloat(obj.cantidadAbonoPag)*-1).toFixed(2)}</span>` : `${parseFloat(obj.cantidadAbonoPag).toFixed(2)}` }</td>
                                                    <td class="tablaEditableCuentaCliente convertirTextoMayuscula text-center py-1 p-4 whitespace-nowrap text-[#162B4E]">${obj.bancaPago === null ? obj.clasificacionPago == "2" ? obj.tipoAbonoPag + " CAMAL" : obj.tipoAbonoPag + " PAUL"  : limpiarNombreBanco(obj.bancaPago)} ${obj.fechaOperacionPag == fecha ? "" : formatFecha(obj.fechaOperacionPag)}</td>
                                                </tr> `
                            }
                        }
                    }
                }
            });
        }

        if (masDeUnPago == 0){
            pagosDetallados += `
                <tr class="bg-white contarFilaPagos border-black">
                    <td class="tablaEditableCuentaCliente sumarContenidoTabla text-center py-1 px-2 whitespace-nowrap border-b border-black border-r-2 font-semibold">0.00</td>
                    <td class="tablaEditableCuentaCliente text-[#162B4E] convertirTextoMayuscula text-center py-1 px-2 whitespace-nowrap border-b border-black font-semibold"></td>
                </tr> `
        }
        masDeUnPago = 0;

        let totalFormateado = parseFloat(saldoActual).toLocaleString('es-ES', {
            minimumFractionDigits: 2,   
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalFormateadoPagosDeHoy = pagosDeHoy.toLocaleString('es-ES', {
            minimumFractionDigits: 2,   
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        let totalSaldoAnteriorV_doble = 0;

        if (variableBandera){
            totalSaldoAnteriorV_doble = totalSaldoAnteriorV;
        }else{
            totalSaldoAnteriorV_doble = parseFloat(totalSaldoAnteriorV) < 0 ? parseFloat(totalSaldoAnteriorV) - pagosARestar : parseFloat(totalSaldoAnteriorV) + pagosARestar;
        }
        
        $("#totalCuentaDia").attr("value", totalVentaDelDia);
        $("#totalPagos").attr("value", pagosDeHoy);
        $("#totalSaldo").attr("value", totalSaldoAnteriorV_doble);
        saldoActualGlobal = saldoActual;

        bodyCuentaDelClientePagos += `
        <tr class="bg-white border-b border-black contarFilaPagos">
            <td class="text-center py-1 px-2 whitespace-nowrap font-semibold border-r-2 border-black"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap font-bold border-b-2 border-black text-red-600">S/. ${parseFloat(totalSaldoAnteriorV_doble).toFixed(2)}</td>
        </tr>
        ${pagosDetallados}
        <tr class="border-b border-black">
            <td class="bg-white text-center py-1 px-2 whitespace-nowrap font-semibold border-r-2 border-black"></td>
            <td class="bg-[#FFC000] text-center py-1 px-2 whitespace-nowrap font-semibold">SALDO ACTUAL</td>
        </tr>
        <tr class="bg-white border-b border-black">
            <td class="text-center py-1 px-2 whitespace-nowrap font-bold border-r-2 border-black border-t-2" id="totalDePagos">S/. ${totalFormateadoPagosDeHoy}</td>
            <td class="text-center py-1 px-2 whitespace-nowrap font-bold text-red-600 border-t-2 border-black" id="totalSaldoActual">S/. ${totalFormateado}</td>
        </tr>
        `

        tbodyCuentaDelClientePagos.html(bodyCuentaDelClientePagos);

        let totalFormateadoTotalVentaDelDia = parseFloat(totalVentaDelDia).toLocaleString('es-ES', {
            minimumFractionDigits: 2,   
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        return `
        <tr class="bg-white border-b-2 border-t-2 border-black border-r-2">
            <td class="text-center py-1 px-2 whitespace-nowrap w-[90px]"></td>
            <td class="text-left py-1 px-4 whitespace-nowrap w-[200px] font-black border-r-2 border-black">TOTAL VENTA</td>
            <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]"></td>
            <td class="text-center py-1 px-2 whitespace-nowrap w-[150px] font-bold bg-red-600 text-white">S/. ${totalFormateadoTotalVentaDelDia}</h5></td>
        </tr>
        `;
    }

    function contarFilas() {
        let contarVenta = $('.filasContarVenta').length;
        let contarPagos = $('.contarFilaPagos').length;

        // console.log("filasContarVenta: " + contarVenta , "contarFilaPagos: " + contarPagos);
    
        if (contarVenta > contarPagos) {
            // console.log("filasContarVenta tiene más filas");
            let diferencia = (contarVenta - contarPagos) - 1;
            let nuevasFilas = "";
    
            for (var i = 0; i < diferencia; i++) {
                let nuevaFila = `
                    <tr class="bg-white contarFilaPagos border-b border-black">
                        <td class="tablaEditableCuentaCliente sumarContenidoTabla text-center py-1 p-4 whitespace-nowrap font-semibold border-r-2 border-black">&nbsp;</td>
                        <td class="tablaEditableCuentaCliente text-[#162B4E] convertirTextoMayuscula text-center py-1 p-4 whitespace-nowrap">&nbsp;</td>
                    </tr>
                `;
                nuevasFilas += nuevaFila;
            }
    
            // Agregar las nuevas filas al final de la tabla que contiene contarFilaPagos
            $('.contarFilaPagos:last').after(nuevasFilas);
    
        } else if (contarVenta < contarPagos){
            // console.log("contarFilaPagos tiene más filas o son iguales");

            let diferencia = (contarPagos - contarVenta) + 1;
            let nuevasFilas = "";
    
            for (var i = 0; i < diferencia; i++) {
                let nuevaFila = `
                    <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                        <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[130px] text-xl" id="fechaTabla">&nbsp;</td>
                        <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2">&nbsp;</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black">&nbsp;</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black">&nbsp;</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black">&nbsp;</td>
                        <td class="text-center py-1 px-2 whitespace-nowrap">&nbsp;</td>
                    </tr>
                `;
                nuevasFilas += nuevaFila;
            }
    
            // Agregar las nuevas filas al final de la tabla que contiene filasContarVenta
            $('.filasContarVenta:last').after(nuevasFilas);
        }
    }

    function construirFilaDatos(item, fecha, respuestaDescuentosDetallados) {

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
        let totalPesoVigesimaSegundaEspecie = parseFloat(item.totalPesoVigesimaSegundaEspecie)+parseFloat(item.totalPesoDescuentoVigesimaSegundaEspecie);
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

        let precioPrimerEspecie = 0;
        if (parseFloat(totalPesoPrimerEspecie) !== 0) {
            precioPrimerEspecie = (parseFloat(totalVentaPrimerEspecie) / parseFloat(totalPesoPrimerEspecie)).toFixed(2);
        }

        let precioSegundaEspecie = 0;
        if (parseFloat(totalPesoSegundaEspecie) !== 0) {
            precioSegundaEspecie = (parseFloat(totalVentaSegundaEspecie) / parseFloat(totalPesoSegundaEspecie)).toFixed(2);
        }

        let precioTerceraEspecie = 0;
        if (parseFloat(totalPesoTerceraEspecie) !== 0) {
            precioTerceraEspecie = (parseFloat(totalVentaTerceraEspecie) / parseFloat(totalPesoTerceraEspecie)).toFixed(2);
        }

        let precioCuartaEspecie = 0;
        if (parseFloat(totalPesoCuartaEspecie) !== 0) {
            precioCuartaEspecie = (parseFloat(totalVentaCuartaEspecie) / parseFloat(totalPesoCuartaEspecie)).toFixed(2);
        }

        let precioQuintaEspecie = 0;
        if (parseFloat(totalPesoQuintaEspecie) !== 0) {
            precioQuintaEspecie = (parseFloat(totalVentaQuintaEspecie) / parseFloat(totalPesoQuintaEspecie)).toFixed(2);
        }

        let precioSextaEspecie = 0;
        if (parseFloat(totalPesoSextaEspecie) !== 0) {
            precioSextaEspecie = (parseFloat(totalVentaSextaEspecie) / parseFloat(totalPesoSextaEspecie)).toFixed(2);
        }

        let precioSeptimaEspecie = 0;
        if (parseFloat(totalPesoSeptimaEspecie) !== 0) {
            precioSeptimaEspecie = (parseFloat(totalVentaSeptimaEspecie) / parseFloat(totalPesoSeptimaEspecie)).toFixed(2);
        }

        let precioOctavaEspecie = 0;
        if (parseFloat(totalPesoOctavaEspecie) !== 0) {
            precioOctavaEspecie = (parseFloat(totalVentaOctavaEspecie) / parseFloat(totalPesoOctavaEspecie)).toFixed(2);
        }

        let precioDecimaEspecie = 0;
        if (parseFloat(totalPesoDecimaEspecie) !== 0) {
            precioDecimaEspecie = (parseFloat(totalVentaDecimaEspecie) / parseFloat(totalPesoDecimaEspecie)).toFixed(2);
        }

        let precioDecimaPrimeraEspecie = 0;
        if (parseFloat(totalPesoDecimaPrimeraEspecie) !== 0) {
            precioDecimaPrimeraEspecie = (parseFloat(totalVentaDecimaPrimeraEspecie) / parseFloat(totalPesoDecimaPrimeraEspecie)).toFixed(2);
        }

        let precioDecimaSegundaEspecie = 0;
        if (parseFloat(totalPesoDecimaSegundaEspecie) !== 0) {
            precioDecimaSegundaEspecie = (parseFloat(totalVentaDecimaSegundaEspecie) / parseFloat(totalPesoDecimaSegundaEspecie)).toFixed(2);
        }

        let precioDecimaTerceraEspecie = 0;
        if (parseFloat(totalPesoDecimaTerceraEspecie) !== 0) {
            precioDecimaTerceraEspecie = (parseFloat(totalVentaDecimaTerceraEspecie) / parseFloat(totalPesoDecimaTerceraEspecie)).toFixed(2);
        }

        let precioDecimaCuartaEspecie = 0;
        if (parseFloat(totalPesoDecimaCuartaEspecie) !== 0) {
            precioDecimaCuartaEspecie = (parseFloat(totalVentaDecimaCuartaEspecie) / parseFloat(totalPesoDecimaCuartaEspecie)).toFixed(2);
        }

        let precioDecimaQuintaEspecie = 0;
        if (parseFloat(totalPesoDecimaQuintaEspecie) !== 0) {
            precioDecimaQuintaEspecie = (parseFloat(totalVentaDecimaQuintaEspecie) / parseFloat(totalPesoDecimaQuintaEspecie)).toFixed(2);
        }

        let precioDecimaSextaEspecie = 0;
        if (parseFloat(totalPesoDecimaSextaEspecie) !== 0) {
            precioDecimaSextaEspecie = (parseFloat(totalVentaDecimaSextaEspecie) / parseFloat(totalPesoDecimaSextaEspecie)).toFixed(2);
        }

        let precioDecimaSeptimaEspecie = 0;
        if (parseFloat(totalPesoDecimaSeptimaEspecie) !== 0) {
            precioDecimaSeptimaEspecie = (parseFloat(totalVentaDecimaSeptimaEspecie) / parseFloat(totalPesoDecimaSeptimaEspecie)).toFixed(2);
        }

        let precioDecimaOctavaEspecie = 0;
        if (parseFloat(totalPesoDecimaOctavaEspecie) !== 0) {
            precioDecimaOctavaEspecie = (parseFloat(totalVentaDecimaOctavaEspecie) / parseFloat(totalPesoDecimaOctavaEspecie)).toFixed(2);
        }

        let precioDecimaNovenaEspecie = 0;
        if (parseFloat(totalPesoDecimaNovenaEspecie) !== 0) {
            precioDecimaNovenaEspecie = (parseFloat(totalVentaDecimaNovenaEspecie) / parseFloat(totalPesoDecimaNovenaEspecie)).toFixed(2);
        }

        let precioVigesimaEspecie = 0;
        if (parseFloat(totalPesoVigesimaEspecie) !== 0) {
            precioVigesimaEspecie = (parseFloat(totalVentaVigesimaEspecie) / parseFloat(totalPesoVigesimaEspecie)).toFixed(2);
        }

        let precioVigesimaPrimeraEspecie = 0;
        if (parseFloat(totalPesoVigesimaPrimeraEspecie) !== 0) {
            precioVigesimaPrimeraEspecie = (parseFloat(totalVentaVigesimaPrimeraEspecie) / parseFloat(totalPesoVigesimaPrimeraEspecie)).toFixed(2);
        }

        let precioVigesimaSegundaEspecie = 0;
        if (parseFloat(totalPesoVigesimaSegundaEspecie) !== 0) {
            precioVigesimaSegundaEspecie = (parseFloat(totalVentaVigesimaSegundaEspecie) / parseFloat(totalPesoVigesimaSegundaEspecie)).toFixed(2);
        }

        let precioVigesimaTerceraEspecie = 0;
        if (parseFloat(totalPesoVigesimaTerceraEspecie) !== 0) {
            precioVigesimaTerceraEspecie = (parseFloat(totalVentaVigesimaTerceraEspecie) / parseFloat(totalPesoVigesimaTerceraEspecie)).toFixed(2);
        }

        let totalCantidadDescuento = 0
        let totalPesoDescuento = parseFloat(item.totalPesoDescuento)
        let totalVentaDescuento = parseFloat(item.totalVentaDescuento)

        let precioDescuentoEspecies = 0;
        if (totalPesoDescuento !== 0) {
            precioDescuentoEspecies = (totalVentaDescuento / totalPesoDescuento).toFixed(2);
        }

        function formatearFecha(fecha) {
            let fechaOriginal = String(fecha)
            const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Aep", "Oct", "Nov", "Dic"];
            const [anio, mes, dia] = fechaOriginal.split("-");
            return `${dia}-${meses[parseInt(mes, 10) - 1]}`;
        }

        let fechaExcel = formatearFecha(fecha)

        let descuentosDetallados = ``;
        let masDeUnDescuento = ``;
        
        if(respuestaDescuentosDetallados.length > 0) {
            respuestaDescuentosDetallados.forEach(function(obj) {
                if (obj.fechaRegistroDesc == fecha){
                    let totalVentaDescuentoDetallado = 0;
                    totalVentaDescuentoDetallado = parseFloat(obj.pesoDesc) * parseFloat(obj.precioDesc)
                    if (masDeUnDescuento == 0){
                        descuentosDetallados += `
                                        <tr class="bg-white border-b border-t-2 border-black filasContarVenta border-r-2">
                                            <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                                            <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${obj.observacion}</td>
                                            <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseInt(obj.cantidadDesc) === 1 ? obj.cantidadDesc + ' Ud.' : obj.cantidadDesc + ' Uds.'}</td>
                                            <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(obj.pesoDesc).toFixed(2)} Kg.</td>
                                            <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${parseFloat(obj.precioDesc).toFixed(2)}</td>
                                            <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDescuentoDetallado).toFixed(2)}</td>
                                        </tr>`
                                        masDeUnDescuento += 1;
                    }else{
                        descuentosDetallados += `
                                        <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                                        <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                                        <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${obj.observacion}</td>
                                        <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseInt(obj.cantidadDesc) === 1 ? obj.cantidadDesc + ' Ud.' : obj.cantidadDesc + ' Uds.'}</td>
                                        <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(obj.pesoDesc).toFixed(2)} Kg.</td>
                                        <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${parseFloat(obj.precioDesc).toFixed(2)}</td>
                                        <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDescuentoDetallado).toFixed(2)}</td>
                                    </tr>`
                    }
                }
            });
        }

        if (masDeUnDescuento == 0){
            descuentosDetallados += `
                <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">DESCUENTO</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">0 Uds.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">0.00 Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. 0.00</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. 0.00</td>
            </tr>`
        }
        masDeUnDescuento = 0;

        return `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px] h-[30px]">&nbsp;</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px] border-r-2 border-black h-[30px]">&nbsp;</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px] border-r-2 border-black h-[30px]">&nbsp;</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px] border-r-2 border-black h-[30px]">&nbsp;</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px] h-[30px]">&nbsp;</td>
            </tr>
            ${totalVentaPrimerEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombrePrimerEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadPrimerEspecie === 1 ? totalCantidadPrimerEspecie + ' Ud.' : totalCantidadPrimerEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoPrimerEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioPrimerEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaPrimerEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombrePrimerEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadPrimerEspecie === 1 ? totalCantidadPrimerEspecie + ' Ud.' : totalCantidadPrimerEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoPrimerEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioPrimerEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaPrimerEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaSegundaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreSegundaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadSegundaEspecie === 1 ? totalCantidadSegundaEspecie + ' Ud.' : totalCantidadSegundaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoSegundaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioSegundaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaSegundaEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreSegundaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadSegundaEspecie === 1 ? totalCantidadSegundaEspecie + ' Ud.' : totalCantidadSegundaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoSegundaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioSegundaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaSegundaEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaDecimaSeptimaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaSeptimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaSeptimaEspecie === 1 ? totalCantidadDecimaSeptimaEspecie + ' Ud.' : totalCantidadDecimaSeptimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaSeptimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaSeptimaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaSeptimaEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaSeptimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaSeptimaEspecie === 1 ? totalCantidadDecimaSeptimaEspecie + ' Ud.' : totalCantidadDecimaSeptimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaSeptimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaSeptimaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaSeptimaEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaTerceraEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreTerceraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadTerceraEspecie === 1 ? totalCantidadTerceraEspecie + ' Ud.' : totalCantidadTerceraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoTerceraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioTerceraEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaTerceraEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreTerceraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadTerceraEspecie === 1 ? totalCantidadTerceraEspecie + ' Ud.' : totalCantidadTerceraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoTerceraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioTerceraEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaTerceraEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaCuartaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreCuartaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadCuartaEspecie === 1 ? totalCantidadCuartaEspecie + ' Ud.' : totalCantidadCuartaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoCuartaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioCuartaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaCuartaEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreCuartaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadCuartaEspecie === 1 ? totalCantidadCuartaEspecie + ' Ud.' : totalCantidadCuartaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoCuartaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioCuartaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaCuartaEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaDecimaOctavaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaOctavaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaOctavaEspecie === 1 ? totalCantidadDecimaOctavaEspecie + ' Ud.' : totalCantidadDecimaOctavaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaOctavaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaOctavaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaOctavaEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaOctavaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaOctavaEspecie === 1 ? totalCantidadDecimaOctavaEspecie + ' Ud.' : totalCantidadDecimaOctavaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaOctavaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaOctavaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaOctavaEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaDecimaSextaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaSextaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaSextaEspecie === 1 ? totalCantidadDecimaSextaEspecie + ' Ud.' : totalCantidadDecimaSextaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaSextaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaSextaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaSextaEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaSextaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaSextaEspecie === 1 ? totalCantidadDecimaSextaEspecie + ' Ud.' : totalCantidadDecimaSextaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaSextaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaSextaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaSextaEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaDecimaNovenaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaNovenaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaNovenaEspecie === 1 ? totalCantidadDecimaNovenaEspecie + ' Ud.' : totalCantidadDecimaNovenaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaNovenaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaNovenaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaNovenaEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaNovenaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaNovenaEspecie === 1 ? totalCantidadDecimaNovenaEspecie + ' Ud.' : totalCantidadDecimaNovenaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaNovenaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaNovenaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaNovenaEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaQuintaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreQuintaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadQuintaEspecie === 1 ? totalCantidadQuintaEspecie + ' Ud.' : totalCantidadQuintaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoQuintaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioQuintaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaQuintaEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreQuintaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadQuintaEspecie === 1 ? totalCantidadQuintaEspecie + ' Ud.' : totalCantidadQuintaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoQuintaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioQuintaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaQuintaEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaVigesimaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreVigesimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadVigesimaEspecie === 1 ? totalCantidadVigesimaEspecie + ' Ud.' : totalCantidadVigesimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoVigesimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioVigesimaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaVigesimaEspecie).toFixed(2)}</td>
            </tr>` : `
            <tr class="bg-white border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreVigesimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadVigesimaEspecie === 1 ? totalCantidadVigesimaEspecie + ' Ud.' : totalCantidadVigesimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoVigesimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioVigesimaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaVigesimaEspecie).toFixed(2)}</td>
            </tr>`}
            ${totalVentaSextaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreSextaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadSextaEspecie === 1 ? totalCantidadSextaEspecie + ' Ud.' : totalCantidadSextaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoSextaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioSextaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaSextaEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaVigesimaPrimeraEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreVigesimaPrimeraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadVigesimaPrimeraEspecie === 1 ? totalCantidadVigesimaPrimeraEspecie + ' Ud.' : totalCantidadVigesimaPrimeraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoVigesimaPrimeraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioVigesimaPrimeraEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaVigesimaPrimeraEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaSeptimaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreSeptimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadSeptimaEspecie === 1 ? totalCantidadSeptimaEspecie + ' Ud.' : totalCantidadSeptimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoSeptimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioSeptimaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaSeptimaEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaVigesimaSegundaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreVigesimaSegundaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadVigesimaSegundaEspecie === 1 ? totalCantidadVigesimaSegundaEspecie + ' Ud.' : totalCantidadVigesimaSegundaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoVigesimaSegundaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioVigesimaSegundaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaVigesimaSegundaEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaOctavaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreOctavaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadOctavaEspecie === 1 ? totalCantidadOctavaEspecie + ' Ud.' : totalCantidadOctavaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoOctavaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioOctavaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaOctavaEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaVigesimaTerceraEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreVigesimaTerceraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadVigesimaTerceraEspecie === 1 ? totalCantidadVigesimaTerceraEspecie + ' Ud.' : totalCantidadVigesimaTerceraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoVigesimaTerceraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioVigesimaTerceraEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaVigesimaTerceraEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaDecimaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaEspecie === 1 ? totalCantidadDecimaEspecie + ' Ud.' : totalCantidadDecimaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaDecimaPrimeraEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaPrimeraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaPrimeraEspecie === 1 ? totalCantidadDecimaPrimeraEspecie + ' Ud.' : totalCantidadDecimaPrimeraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaPrimeraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaPrimeraEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaPrimeraEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaDecimaSegundaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaSegundaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaSegundaEspecie === 1 ? totalCantidadDecimaSegundaEspecie + ' Ud.' : totalCantidadDecimaSegundaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaSegundaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaSegundaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaSegundaEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaDecimaTerceraEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaTerceraEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaTerceraEspecie === 1 ? totalCantidadDecimaTerceraEspecie + ' Ud.' : totalCantidadDecimaTerceraEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaTerceraEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaTerceraEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaTerceraEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaDecimaCuartaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaCuartaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaCuartaEspecie === 1 ? totalCantidadDecimaCuartaEspecie + ' Ud.' : totalCantidadDecimaCuartaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaCuartaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaCuartaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaCuartaEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaDecimaQuintaEspecie ? `
            <tr class="bg-[#FEFF01] border-b border-black filasContarVenta border-r-2">
                <td class="text-center border-b-2 py-1 px-4 whitespace-nowrap border-r-2 border-black font-black w-[90px] text-lg" id="fechaTabla">${fechaExcel}</td>
                <td class="text-left py-1 px-4 whitespace-nowrap border-black border-r-2 w-[200px]">${nombreDecimaQuintaEspecieGlobal}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${totalCantidadDecimaQuintaEspecie === 1 ? totalCantidadDecimaQuintaEspecie + ' Ud.' : totalCantidadDecimaQuintaEspecie + ' Uds.'}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">${parseFloat(totalPesoDecimaQuintaEspecie).toFixed(2)} Kg.</td>
                <td class="text-center py-1 px-2 whitespace-nowrap border-r-2 border-black w-[150px]">S/. ${precioDecimaQuintaEspecie}</td>
                <td class="text-center py-1 px-2 whitespace-nowrap w-[150px]">S/. ${parseFloat(totalVentaDecimaQuintaEspecie).toFixed(2)}</td>
            </tr>` : ''}
            ${totalVentaDescuento ? `
            ${descuentosDetallados}` : ''}
        `;
    }

    $(document).on("click", "#btnEnviarCuentaWhatsApp", function() {
        let nombreCliente = $('#inputNombreClientes').val().trim();
        let fechaCuentaDelCliente = $('#fechaCuentaDelCliente').val().trim();
        let phoneNumber = $('#phoneInput').val().trim().replace(/\s/g, '');
        let horaFormateada = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/ /g, '');
        let nombreIMG = `${nombreCliente}-${fechaCuentaDelCliente}-${horaFormateada}.jpeg`;

        if(phoneNumber == ""){
            alertify.notify('Falta numero de telefono a enviar, solo se descarga la imagen.', 'error', 3);
            // Obtener el contenedor
            let container = document.getElementById('hmtlCapture');
        
            // Almacenar el ancho original y establecer el nuevo ancho
            let originalWidth = container.style.width;
            container.style.width = '1250px';
        
            // Usar setTimeout para dar tiempo al navegador para ajustar el tamaño
            setTimeout(function() {
                domtoimage.toJpeg(container, { quality: 0.95 })
                .then(function(dataUrl) {
                    // Restaurar el ancho original
                    container.style.width = originalWidth;
        
                    let link = document.createElement('a');
                    link.download = nombreIMG;
                    link.href = dataUrl;
                    link.click();
                })
                .catch(function(error) {
                    // Restaurar el ancho original si hay un error
                    container.style.width = originalWidth;
                    console.error('Error al capturar la imagen:', error);
                });
            }, 500);
        }else{
            // Obtener el contenedor
            let container = document.getElementById('hmtlCapture');
        
            // Almacenar el ancho original y establecer el nuevo ancho
            let originalWidth = container.style.width;
            container.style.width = '1250px';
        
            // Usar setTimeout para dar tiempo al navegador para ajustar el tamaño
            setTimeout(function() {
                domtoimage.toJpeg(container, { quality: 0.95 })
                .then(function(dataUrl) {
                    // Restaurar el ancho original
                    container.style.width = originalWidth;
        
                    let link = document.createElement('a');
                    link.download = nombreIMG;
                    link.href = dataUrl;
                    link.click();
        
                    // Abrir la ventana de WhatsApp
                    window.open(`https://web.whatsapp.com/send/?phone=%2B51${phoneNumber}&amp;text&amp;type=phone_number&amp;app_absent=0`, '_blank');
                })
                .catch(function(error) {
                    // Restaurar el ancho original si hay un error
                    container.style.width = originalWidth;
                    console.error('Error al capturar la imagen:', error);
                });
            }, 500);
        }
    });   
    
    $(document).on("click", "#btnEnviarCuentaWhatsAppTelefono", function() {
        let nombreCliente = $('#inputNombreClientes').val().trim();
        let fechaCuentaDelCliente = $('#fechaCuentaDelCliente').val().trim();
        let horaFormateada = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/ /g, '');
        let nombreIMG = `${nombreCliente}-${fechaCuentaDelCliente}-${horaFormateada}.jpeg`;
    
        // Obtener el contenedor
        let container = document.getElementById('hmtlCapture');
    
        // Almacenar el ancho original y establecer el nuevo ancho
        let originalWidth = container.style.width;
        container.style.width = '1250px';
    
        // Usar setTimeout para dar tiempo al navegador para ajustar el tamaño
        setTimeout(function() {
            domtoimage.toJpeg(container, { quality: 0.95 })
            .then(function(dataUrl) {
                // Restaurar el ancho original
                container.style.width = originalWidth;
    
                let link = document.createElement('a');
                link.download = nombreIMG;
                link.href = dataUrl;
                link.click();
            })
            .catch(function(error) {
                // Restaurar el ancho original si hay un error
                container.style.width = originalWidth;
                console.error('Error al capturar la imagen:', error);
            });
        }, 500);
    });  

    $(document).on("click", "#btnEnviarCuentaWhatsAppTelefonoAbrir", function() {
        let phoneNumber = $('#phoneInput').val().trim().replace(/\s/g, '');

        if(phoneNumber == ""){
            alertify.notify('Falta numero de telefono a enviar', 'error', 3);
            return;
        }
    
        window.open(`https://wa.me/+51${phoneNumber}?`);
    });  

    // =====================================================

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

        let fechaBuscaCuenta = $('#fechaCuentaDelCliente').val();
        $('#fechaCambiarPrecioPesada').val(fechaBuscaCuenta);
    });

    $('.cerrarModalCambiarPrecioPesada, #ModalCambiarPrecioPesada .opacity-75').on('click', function (e) {
        $('#ModalCambiarPrecioPesada').addClass('hidden');
        $('#ModalCambiarPrecioPesada').removeClass('flex');
    });

    $(document).on("click", "#btnAgregarDiferencia", function() {
        $('#ModalAgregarDescuentoCliente').addClass('flex');
        $('#ModalAgregarDescuentoCliente').removeClass('hidden');
        $('#idAgregarDescuentoCliente').focus();

        $('#fechaAgregarDescuento').val(fechaHoy);
        $('#presentacionAgregarDescuentoCliente').val($('#presentacionAgregarDescuentoCliente option:first').val());
        $('#codigoClienteSeleccionado3').val(0);
        $('#inputNombreClientes3').val("");
        $("#clienteSeleccionadoCorrecto3").removeClass("flex");
        $("#clienteSeleccionadoCorrecto3").addClass("hidden");
        $('#idAgregarDescuentoCliente').val('');
        $('#valorAgregarDescuentoCliente').val('');
        $('#valorAgregarDescuentoCliente').val('');
    });

    $('.cerrarModalAgregarDescuentoCliente, #ModalAgregarDescuentoCliente .opacity-75').on('click', function (e) {
        $('#ModalAgregarDescuentoCliente').addClass('hidden');
        $('#ModalAgregarDescuentoCliente').removeClass('flex');
    });

    $('#btnAgregarDescuentoCliente').on('click', function () {
        let todosCamposCompletos = true

        let codigoCliente = $('#codigoClienteSeleccionado3').val();
        let pesoAgregarDescuentoCliente = parseFloat($('#valorAgregarDescuentoCliente').val())*-1;
        let fechaAgregarDescuentoCliente = $('#fechaAgregarDescuento').val();
        let especieAgregarDescuentoCliente = $('#presentacionAgregarDescuentoCliente').find("option:selected").val();
        let comentarioAgregarDescuentoCliente = $('#comentarioAgregarDescuentoCliente').val();
        let precioAgregarDescuentoCliente = $('#valorPrecioDescuento').val();

        $('#divAgregarDescuentoCliente .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        // Validar que especieAgregarDescuentoCliente no sea igual a 0
        if (especieAgregarDescuentoCliente != "0") {
            if (todosCamposCompletos) {
                let valorCampo = parseFloat($('#valorAgregarDescuentoCliente').val());
                if (valorCampo > 0) {
                    fn_AgregarDescuentoCliente(codigoCliente, pesoAgregarDescuentoCliente, fechaAgregarDescuentoCliente, especieAgregarDescuentoCliente, precioAgregarDescuentoCliente, comentarioAgregarDescuentoCliente);
                } else {
                    alertify.notify('El peso en Kg no puede ser 0', 'error', 3);
                    $('#valorAgregarDescuentoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                }
            } else {
                // Mostrar una alerta de que debe completar los campos obligatorios
                alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
            }
        } else {
            // Mostrar una alerta de que especieAgregarDescuentoCliente no puede ser igual a 0
            alertify.notify('Debe seleccionar una especie', 'error', 3);
            $('#presentacionAgregarDescuentoCliente').removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }
    });

    function fn_AgregarDescuentoCliente(codigoCliente,pesoAgregarDescuentoCliente,fechaAgregarDescuentoCliente,especieAgregarDescuentoCliente,precioAgregarDescuentoCliente, comentarioAgregarDescuentoCliente) {
        $.ajax({
            url: '/fn_consulta_AgregarDescuentoCliente',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
                pesoAgregarDescuentoCliente: pesoAgregarDescuentoCliente,
                fechaAgregarDescuentoCliente: fechaAgregarDescuentoCliente,
                especieAgregarDescuentoCliente:especieAgregarDescuentoCliente,
                precioAgregarDescuentoCliente:precioAgregarDescuentoCliente,
                comentarioAgregarDescuentoCliente: comentarioAgregarDescuentoCliente,
            },
            success: function(response) {
                if (response.success) {

                    $('#comentarioAgregarDescuentoCliente').val('')
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro el descuento correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#divAgregarDescuentoCliente .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });

                    $('#presentacionAgregarDescuentoCliente').removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    $('#ModalAgregarDescuentoCliente').addClass('hidden');
                    $('#ModalAgregarDescuentoCliente').removeClass('flex');
                    $('#btnBuscarCuentaDelCliente').trigger('click');
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

    // Primer filtro Nombre

    let selectedIndex = -1;

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

    // Tercer filtro Nombre

    $('#inputNombreClientes3').on('input', function () {
        $('#codigoClienteSeleccionado3').val(0);
        $("#clienteSeleccionadoCorrecto3").removeClass("flex");
        $("#clienteSeleccionadoCorrecto3").addClass("hidden");
        const searchTerm = $(this).val().toLowerCase();
        const $filtrarClientes = $("#inputNombreClientes3").val();
        const filteredClientes = clientesArreglo.filter(cliente =>
            cliente.nombreCompleto.toLowerCase().includes(searchTerm)
        );
        if ($filtrarClientes.length > 0) {
            displayClientes3(filteredClientes);
            selectedIndex = -1; // Reset index when the input changes
        } else {
            const $contenedorDeClientes = $("#contenedorDeClientes3")
            $contenedorDeClientes.addClass('hidden');
        }
    });
    
    $('#inputNombreClientes3').on('keydown', function (event) {
        const $options = $('#contenedorDeClientes3 .option');
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
                    $("#clienteSeleccionadoCorrecto3").removeClass("hidden");
                    $("#clienteSeleccionadoCorrecto3").addClass("flex");
                }
            }
        }
    });
    
    function displayClientes3(clientesArreglo) {
        const $contenedor = $('#contenedorDeClientes3');
        $contenedor.empty();
        if (clientesArreglo.length > 0) {
            $contenedor.removeClass('hidden');
            clientesArreglo.forEach(cliente => {
                const $div = $('<div class="text-gray-800 text-sm dark:text-white font-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:hover:bg-gray-700 hover:bg-gray-200"></div>')
                    .text(cliente.nombreCompleto)
                    .addClass('option p-2')
                    .on('click', function () {
                        selectCliente3(cliente);
                    });
                $contenedor.append($div);
            });
        } else {
            $contenedor.addClass('hidden');
        }
    }
    
    function selectCliente3(cliente) {
        $('#inputNombreClientes3').val(cliente.nombreCompleto);
        $('#codigoClienteSeleccionado3').val(cliente.codigoCli);
        $('#contenedorDeClientes3').addClass('hidden');
        $("#clienteSeleccionadoCorrecto3").removeClass("hidden");
        $("#clienteSeleccionadoCorrecto3").addClass("flex");
        selectedIndex = -1;
    }
    
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.relative').length) {
            $('#contenedorDeClientes').addClass('hidden');
            $('#contenedorDeClientes2').addClass('hidden');
            $('#contenedorDeClientes3').addClass('hidden');
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
                    $('#especiesCambioPrecioPesadas').val(0);
                    $('#nuevoPrecioCambiarPesadas').val("");
                    $('#idCambiarPrecioPesadaCliente').val("");
                    $('#ModalCambiarPrecioPesada').addClass('hidden');
                    $('#ModalCambiarPrecioPesada').removeClass('flex');
                    $('#btnBuscarCuentaDelCliente').trigger('click');
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

    $(document).on('click', '#btnEditarTablaCuentaCliente', function () {
        // Selecciona todos los td con la clase tablaEditableCuentaCliente
        var $editableCells = $('.tablaEditableCuentaCliente');
        
        // Verifica si ya están en modo editable
        if ($editableCells.attr('contenteditable') === 'true') {
            // Si están editables, desactiva la edición
            $editableCells.attr('contenteditable', 'false');
            $("#btnEditarTablaCuentaCliente").text('Editar Tabla');
        } else {
            // Si no están editables, activa la edición
            $editableCells.attr('contenteditable', 'true');
            $("#btnEditarTablaCuentaCliente").text('Dejar de Editar Tabla');
        }
    });    

    $(document).on('input', '.sumarContenidoTabla', function () {
        let total = 0;
    
        // Itera sobre cada td con la clase sumarContenidoTabla
        $('.sumarContenidoTabla').each(function () {
            // Intenta convertir el contenido del td a un número
            let value = parseFloat($(this).text()) || 0;
            total += value;
        });

        let totalFormateadoCuenta = total.toLocaleString('es-ES', {
            minimumFractionDigits: 2,   
            maximumFractionDigits: 2,
            useGrouping: true,
        });
    
        
        let lblTotalCuentaDia2 = $("#totalCuentaDia").attr("value")
        let lblTotalSaldo2 = $("#totalSaldo").attr("value")
        
        let deudaDiaCalculo2 = parseFloat(lblTotalCuentaDia2)-parseFloat(total);
        let totalSaldo2 = parseFloat(lblTotalSaldo2);
        let calculoAFavor2 = 0;
        totalSaldo2 = parseFloat(totalSaldo2.toFixed(2));
        calculoAFavor2 = totalSaldo2 + deudaDiaCalculo2;

        if (Math.abs(calculoAFavor2) < 1e-10) {
            calculoAFavor2 = 0.00;
        }
        
        let totalFormateadoSaldo = calculoAFavor2.toLocaleString('es-ES', {
            minimumFractionDigits: 2,   
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        $("#totalPagos").attr("value", total);
    
        // Muestra el total en el elemento con id totalDePagos
        $('#totalDePagos').text(`S/. ${totalFormateadoCuenta}`);
        $('#totalSaldoActual').text(`S/. ${totalFormateadoSaldo}`);

        function formatearFecha(fechaISO) {
            const [year, month, day] = fechaISO.split('-').map(Number);
            const fecha = new Date(year, month - 1, day); // Crear el objeto Date con los componentes individuales
        
            const opciones = { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            };
        
            // Formatear la fecha
            const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
        
            // Capitalizar la primera letra del día
            return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
        }

        let lblTotalCuentaDia = $("#totalCuentaDia").attr("value")
        let lblTotalPagos = $("#totalPagos").attr("value")
        let lblTotalSaldo = $("#totalSaldo").attr("value")
        let fechaCuentaDelCliente = $('#fechaCuentaDelCliente').val().trim();
        let fechaFormateada = formatearFecha(fechaCuentaDelCliente);
        let mensajeDeudaDiaCliente = $("#mensajeDeuda")

        if (lblTotalCuentaDia != "" && lblTotalPagos != ""){
            let deudaDiaCalculo = parseFloat(lblTotalCuentaDia)-parseFloat(lblTotalPagos);
            let totalSaldo = parseFloat(lblTotalSaldo);
            let calculoAFavor = 0;
            totalSaldo = parseFloat(totalSaldo.toFixed(2));
            calculoAFavor = totalSaldo + deudaDiaCalculo;

            if (Math.abs(calculoAFavor) < 1e-10) {
                calculoAFavor = 0.00;
            }

            let totalFormateadoDeudaDiaCalculo = deudaDiaCalculo.toLocaleString('es-ES', {
                minimumFractionDigits: 2,   
                maximumFractionDigits: 2,
                useGrouping: true,
            });
            let totalFormateadoLblTotalPagos = parseFloat(lblTotalPagos).toLocaleString('es-ES', {
                minimumFractionDigits: 2,   
                maximumFractionDigits: 2,
                useGrouping: true,
            });
            let totalFormateadoLblTotalCuentaDia = parseFloat(lblTotalCuentaDia).toLocaleString('es-ES', {
                minimumFractionDigits: 2,   
                maximumFractionDigits: 2,
                useGrouping: true,
            });

            let totalFormateadototalSaldo = parseFloat(totalSaldo).toLocaleString('es-ES', {
                minimumFractionDigits: 2,   
                maximumFractionDigits: 2,
                useGrouping: true,
            });
            let totalFormateadocalculoAFavor = parseFloat(calculoAFavor).toLocaleString('es-ES', {
                minimumFractionDigits: 2,   
                maximumFractionDigits: 2,
                useGrouping: true,
            });
            mensajeDeudaDiaCliente.empty();
            mensajeDeudaDiaCliente.html(`<p id="mensajeDeudaDia" class="md:mx-5 md:text-left text-center font-semibold text-black">El día de hoy ${fechaFormateada} ,  el monto de su guía es <b>${totalFormateadoLblTotalCuentaDia}</b> , ha abonado <b>${totalFormateadoLblTotalPagos}</b> . Dejando un saldo pendiente de <b>${totalFormateadoDeudaDiaCalculo}</b> . Así mismo teniendo en cuenta el saldo anterior <b>${totalFormateadototalSaldo}</b> , con el abono de hoy ${fechaFormateada} , su saldo actual es por el monto de <b>${totalFormateadocalculoAFavor}</b> .</p>`);
        }else{
            mensajeDeudaDiaCliente.empty();
            mensajeDeudaDiaCliente.html(`<p id="mensajeDeudaDia"></p>`);
        }
    });
    
    $(document).on('input', '.convertirTextoMayuscula', function (e) {
        const $td = $(this);
        const originalContent = $td.text();
        const cursorPosition = getCaretPosition($td[0]);
    
        // Convierte el contenido a mayúsculas
        const uppercasedContent = originalContent.toUpperCase();
        $td.text(uppercasedContent);
    
        // Restaura la posición del cursor
        setCaretPosition($td[0], cursorPosition);
    }); 

    $(document).on('input', '.sumarContenidoTabla', function (e) {
        const $td = $(this);
        let originalContent = $td.text();
        const cursorPosition = getCaretPosition($td[0]);
    
        // Elimina caracteres no numéricos, excepto un punto decimal
        let filteredContent = originalContent.replace(/[^0-9.]/g, '');
    
        // Asegura que solo haya un punto decimal
        const parts = filteredContent.split('.');
        if (parts.length > 2) {
            filteredContent = parts[0] + '.' + parts.slice(1).join('');
        }
    
        // Limita los decimales a dos
        if (parts[1] && parts[1].length > 2) {
            filteredContent = parts[0] + '.' + parts[1].slice(0, 2);
        }
    
        // Actualiza el contenido del td con el valor filtrado
        $td.text(filteredContent);
    
        // Restaura la posición del cursor
        setCaretPosition($td[0], Math.min(cursorPosition, filteredContent.length));
    });
    
    // Función para obtener la posición actual del cursor
    function getCaretPosition(element) {
        let caretOffset = 0;
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
        return caretOffset;
    }
    
    // Función para establecer la posición del cursor
    function setCaretPosition(element, offset) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        range.setStart(element.firstChild, offset);
        range.setEnd(element.firstChild, offset);
        selection.removeAllRanges();
        selection.addRange(range);
    }

});
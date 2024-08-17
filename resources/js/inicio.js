import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    var verificarDatosTiempoReal;
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    fn_declarar_especies();
    fn_traerDatosEnTiempoReal(fechaHoy);
    fn_traerDatosTablaInicioDiferencias(fechaHoy, fechaHoy)

    setInterval(() => {
        if (verificarDatosTiempoReal === true) {
            fn_traerDatosTablaInicioDiferencias(fechaHoy, fechaHoy)
            fn_traerDatosEnTiempoReal(fechaHoy);
        }
    }, 10000);

    // Asignar la fecha actual a los inputs
    $('#fechaProduccionAnterior').val(fechaHoy);

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
        fn_traerDatosTablaInicioDiferencias(fechaProduccionAnterior, fechaProduccionAnterior)
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

    var primerEspecieGlobal = 0;
    var segundaEspecieGlobal = 0;
    var terceraEspecieGlobal = 0;
    var cuartaEspecieGlobal = 0;

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

    function fn_traerDatosEnTiempoReal(fechaHoy){

        $.ajax({
            url: '/fn_consulta_TraerDatosEnTiempoReal',
            method: 'GET',
            data: {
                fecha : fechaHoy,
            },
            success: function(response) {

                let cantidadPrimerEspecie = 0
                let cantidadSegundaEspecie = 0
                let cantidadTerceraEspecie = 0
                let cantidadCuartaEspecie = 0
                let cantidadQuintaEspecie = 0
                let cantidadSextaEspecie = 0
                let cantidadSeptimaEspecie = 0
                let cantidadOctavaEspecie = 0
                let cantidadNovenaEspecie = 0
                let cantidadDecimaEspecie = 0
                let cantidadDecimaPrimeraEspecie = 0
                let cantidadDecimaSegundaEspecie = 0
                let cantidadDecimaTerceraEspecie = 0
                let cantidadDecimaCuartaEspecie = 0
                let cantidadDecimaQuintaEspecie = 0
                let cantidadDecimaSextaEspecie = 0
                let cantidadDecimaSeptimaEspecie = 0
                let cantidadDecimaOctavaEspecie = 0
                let cantidadDecimaNovenaEspecie = 0
                let cantidadVigesimaEspecie = 0
                let cantidadVigesimaPrimeraEspecie = 0
                let cantidadVigesimaSegundaEspecie = 0
                let cantidadVigesimaTerceraEspecie = 0

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
                let pesoTotalDecimaSextaEspecie = 0.0
                let pesoTotalDecimaSeptimaEspecie = 0.0
                let pesoTotalDecimaOctavaEspecie = 0.0
                let pesoTotalDecimaNovenaEspecie = 0.0
                let pesoTotalVigesimaEspecie = 0.0
                let pesoTotalVigesimaPrimeraEspecie = 0.0
                let pesoTotalVigesimaSegundaEspecie = 0.0
                let pesoTotalVigesimaTerceraEspecie = 0.0

                let cantidadTotalesEspecie = 0
                let pesoTotalesEspecie = 0.0

                let cantidadTotalYugo = 0
                let pesoTotalYugo = 0
                let cantidadTotalTecnica = 0
                let pesoTotalTecnica = 0
                let cantidadTotalPolloXX = 0
                let pesoTotalPolloXX = 0
                let cantidadTotalGallo = 0
                let pesoTotalGallo = 0
                let cantidadTotalGallinaDoble = 0
                let pesoTotalGallinaDoble = 0
                let cantidadTotalGallinaChica = 0
                let pesoTotalGallinaChica = 0
                let cantidadTotalGallinaChicaFija = 0
                let pesoTotalGallinaChicaFija = 0
                let cantidadTotalPolloTrozado = 0
                let pesoTotalPolloTrozado = 0
                let cantidadTotalPolloMaltratado = 0
                let pesoTotalPolloMaltratado = 0

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // console.log(response)
                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {

                        let idEspecie = parseInt(obj.idEspecie)
                        let cantidadPes = parseInt(obj.cantidadPes)
                        let pesoNetoPes = parseFloat(obj.pesoNetoPes)
                        let pesoNetoJabas = parseFloat(obj.pesoNetoJabas)

                        if (idEspecie == 1) {
                            cantidadPrimerEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalPrimerEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalPrimerEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 2) {
                            cantidadSegundaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalSegundaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalSegundaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 3) {
                            cantidadTerceraEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalTerceraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalTerceraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 4) {
                            cantidadCuartaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalCuartaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalCuartaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 5) {
                            cantidadQuintaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalQuintaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalQuintaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 6) {
                            cantidadSextaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalSextaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalSextaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 7) {
                            cantidadSeptimaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalSeptimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalSeptimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 8) {
                            cantidadOctavaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalOctavaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalOctavaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 9) {
                            cantidadNovenaEspecie += cantidadPes
                        }else if (idEspecie == 10) {
                            cantidadDecimaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 11){
                            cantidadDecimaPrimeraEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaPrimeraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaPrimeraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 12){
                            cantidadDecimaSegundaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaSegundaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaSegundaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 13){
                            cantidadDecimaTerceraEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaTerceraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaTerceraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 14){
                            cantidadDecimaCuartaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaCuartaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaCuartaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 15){
                            cantidadDecimaQuintaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaQuintaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaQuintaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 16){
                            cantidadDecimaSextaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaSextaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaSextaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 17){
                            cantidadDecimaSeptimaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaSeptimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaSeptimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 18){
                            cantidadDecimaOctavaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaOctavaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaOctavaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 19){
                            cantidadDecimaNovenaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalDecimaNovenaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaNovenaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 20){
                            cantidadVigesimaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalVigesimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 21){
                            cantidadVigesimaPrimeraEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalVigesimaPrimeraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaPrimeraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 22){
                            cantidadVigesimaSegundaEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalVigesimaSegundaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaSegundaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 23){
                            cantidadVigesimaTerceraEspecie += cantidadPes
                            if(pesoNetoPes>0){
                                pesoTotalVigesimaTerceraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaTerceraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }

                    });

                    cantidadTotalesEspecie = cantidadPrimerEspecie + cantidadSegundaEspecie + cantidadTerceraEspecie +
                    cantidadCuartaEspecie + cantidadQuintaEspecie + cantidadSextaEspecie + cantidadSeptimaEspecie + cantidadOctavaEspecie +
                    cantidadDecimaEspecie + cantidadDecimaPrimeraEspecie + cantidadDecimaSegundaEspecie + cantidadDecimaTerceraEspecie +
                    cantidadDecimaCuartaEspecie + cantidadDecimaQuintaEspecie + cantidadDecimaSextaEspecie + cantidadDecimaSeptimaEspecie +
                    cantidadDecimaOctavaEspecie + cantidadDecimaNovenaEspecie + cantidadVigesimaEspecie + cantidadVigesimaPrimeraEspecie + cantidadVigesimaSegundaEspecie + cantidadVigesimaTerceraEspecie + cantidadNovenaEspecie;
                    pesoTotalesEspecie = pesoTotalPrimerEspecie + pesoTotalSegundaEspecie + pesoTotalTerceraEspecie + pesoTotalCuartaEspecie +
                    pesoTotalQuintaEspecie + pesoTotalSextaEspecie + pesoTotalSeptimaEspecie + pesoTotalOctavaEspecie + pesoTotalDecimaEspecie +
                    pesoTotalDecimaPrimeraEspecie + pesoTotalDecimaSegundaEspecie + pesoTotalDecimaTerceraEspecie + pesoTotalDecimaCuartaEspecie +
                    pesoTotalDecimaQuintaEspecie + pesoTotalDecimaSextaEspecie + pesoTotalDecimaSeptimaEspecie + pesoTotalDecimaOctavaEspecie + pesoTotalDecimaNovenaEspecie + pesoTotalVigesimaEspecie + pesoTotalVigesimaPrimeraEspecie + pesoTotalVigesimaSegundaEspecie + pesoTotalVigesimaTerceraEspecie;

                    cantidadTotalYugo = cantidadPrimerEspecie + cantidadSegundaEspecie + cantidadDecimaSeptimaEspecie
                    pesoTotalYugo = pesoTotalPrimerEspecie + pesoTotalSegundaEspecie + pesoTotalDecimaSeptimaEspecie

                    cantidadTotalTecnica = cantidadTerceraEspecie + cantidadCuartaEspecie + cantidadDecimaOctavaEspecie
                    pesoTotalTecnica = pesoTotalTerceraEspecie + pesoTotalCuartaEspecie + pesoTotalDecimaOctavaEspecie

                    cantidadTotalPolloXX = cantidadDecimaSextaEspecie + cantidadDecimaNovenaEspecie
                    pesoTotalPolloXX = pesoTotalDecimaSextaEspecie + pesoTotalDecimaNovenaEspecie

                    cantidadTotalGallo = cantidadSeptimaEspecie + cantidadVigesimaSegundaEspecie
                    pesoTotalGallo = pesoTotalSeptimaEspecie + pesoTotalVigesimaSegundaEspecie

                    cantidadTotalGallinaDoble = cantidadQuintaEspecie + cantidadVigesimaEspecie
                    pesoTotalGallinaDoble = pesoTotalQuintaEspecie + pesoTotalVigesimaEspecie

                    cantidadTotalGallinaChica = cantidadSextaEspecie + cantidadVigesimaPrimeraEspecie
                    pesoTotalGallinaChica = pesoTotalSextaEspecie + pesoTotalVigesimaPrimeraEspecie
                    
                    cantidadTotalGallinaChicaFija = cantidadDecimaCuartaEspecie + cantidadVigesimaTerceraEspecie
                    pesoTotalGallinaChicaFija = pesoTotalDecimaCuartaEspecie + pesoTotalVigesimaTerceraEspecie

                    cantidadTotalPolloTrozado = cantidadDecimaEspecie + cantidadDecimaPrimeraEspecie + cantidadDecimaSegundaEspecie + cantidadDecimaTerceraEspecie + 
                    cantidadDecimaQuintaEspecie + cantidadNovenaEspecie
                    pesoTotalPolloTrozado = pesoTotalDecimaEspecie + pesoTotalDecimaPrimeraEspecie + pesoTotalDecimaSegundaEspecie + pesoTotalDecimaTerceraEspecie + 
                    pesoTotalDecimaQuintaEspecie

                    cantidadTotalPolloMaltratado = cantidadOctavaEspecie
                    pesoTotalPolloMaltratado = pesoTotalOctavaEspecie

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

                $('#totalUnidadesPrimerEspecie').text(cantidadPrimerEspecie + " " + (cantidadPrimerEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgPrimerEspecie').text(pesoTotalPrimerEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesSegundaEspecie').text(cantidadSegundaEspecie + " " + (cantidadSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgSegundaEspecie').text(pesoTotalSegundaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesTerceraEspecie').text(cantidadTerceraEspecie + " " + (cantidadTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgTerceraEspecie').text(pesoTotalTerceraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesCuartaEspecie').text(cantidadCuartaEspecie + " " + (cantidadCuartaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgCuartaEspecie').text(pesoTotalCuartaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesQuintaEspecie').text(cantidadQuintaEspecie + " " + (cantidadQuintaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgQuintaEspecie').text(pesoTotalQuintaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesSextaEspecie').text(cantidadSextaEspecie + " " + (cantidadSextaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgSextaEspecie').text(pesoTotalSextaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesSeptimaEspecie').text(cantidadSeptimaEspecie + " " + (cantidadSeptimaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgSeptimaEspecie').text(pesoTotalSeptimaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesOctavaEspecie').text(cantidadOctavaEspecie + " " + (cantidadOctavaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgOctavaEspecie').text(pesoTotalOctavaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaEspecie').text(cantidadDecimaEspecie + " " + (cantidadDecimaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaEspecie').text(pesoTotalDecimaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaPrimeraEspecie').text(cantidadDecimaPrimeraEspecie + " " + (cantidadDecimaPrimeraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaPrimeraEspecie').text(pesoTotalDecimaPrimeraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaSegundaEspecie').text(cantidadDecimaSegundaEspecie + " " + (cantidadDecimaSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaSegundaEspecie').text(pesoTotalDecimaSegundaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaTerceraEspecie').text(cantidadDecimaTerceraEspecie + " " + (cantidadDecimaTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaTerceraEspecie').text(pesoTotalDecimaTerceraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaCuartaEspecie').text(cantidadDecimaCuartaEspecie + " " + (cantidadDecimaCuartaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaCuartaEspecie').text(pesoTotalDecimaCuartaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaQuintaEspecie').text(cantidadDecimaQuintaEspecie + " " + (cantidadDecimaQuintaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaQuintaEspecie').text(pesoTotalDecimaQuintaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaSextaEspecie').text(cantidadDecimaSextaEspecie + " " + (cantidadDecimaSextaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaSextaEspecie').text(pesoTotalDecimaSextaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaSeptimaEspecie').text(cantidadDecimaSeptimaEspecie + " " + (cantidadDecimaSeptimaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaSeptimaEspecie').text(pesoTotalDecimaSeptimaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaOctavaEspecie').text(cantidadDecimaOctavaEspecie + " " + (cantidadDecimaOctavaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaOctavaEspecie').text(pesoTotalDecimaOctavaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesDecimaNovenaEspecie').text(cantidadDecimaNovenaEspecie + " " + (cantidadDecimaNovenaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgDecimaNovenaEspecie').text(pesoTotalDecimaNovenaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesVigesimaEspecie').text(cantidadVigesimaEspecie + " " + (cantidadVigesimaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgVigesimaEspecie').text(pesoTotalVigesimaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesVigesimaPrimeraEspecie').text(cantidadVigesimaPrimeraEspecie + " " + (cantidadVigesimaPrimeraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgVigesimaPrimeraEspecie').text(pesoTotalVigesimaPrimeraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesVigesimaSegundaEspecie').text(cantidadVigesimaSegundaEspecie + " " + (cantidadVigesimaSegundaEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgVigesimaSegundaEspecie').text(pesoTotalVigesimaSegundaEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesVigesimaTerceraEspecie').text(cantidadVigesimaTerceraEspecie + " " + (cantidadVigesimaTerceraEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgVigesimaTerceraEspecie').text(pesoTotalVigesimaTerceraEspecie.toFixed(2) + " Kg");

                $('#totalUnidadesEspecies').text(cantidadTotalesEspecie + " " + (cantidadTotalesEspecie === 1 ? "Ud." : "Uds."));
                $('#totalKgEspecies').text(pesoTotalesEspecie.toFixed(2) + " Kg");
                $('#cantidadTotalYugo').text(cantidadTotalYugo + " " + (cantidadTotalYugo === 1 ? "Ud." : "Uds."));
                $('#pesoTotalYugo').text(pesoTotalYugo.toFixed(2) + " Kg");
                $('#cantidadTotalTecnica').text(cantidadTotalTecnica + " " + (cantidadTotalTecnica === 1 ? "Ud." : "Uds."));
                $('#pesoTotalTecnica').text(pesoTotalTecnica.toFixed(2) + " Kg");
                $('#cantidadTotalPolloXX').text(cantidadTotalPolloXX + " " + (cantidadTotalPolloXX === 1 ? "Ud." : "Uds."));
                $('#pesoTotalPolloXX').text(pesoTotalPolloXX.toFixed(2) + " Kg");
                $('#cantidadTotalGallo').text(cantidadTotalGallo + " " + (cantidadTotalGallo === 1 ? "Ud." : "Uds."));
                $('#pesoTotalGallo').text(pesoTotalGallo.toFixed(2) + " Kg");
                $('#cantidadTotalGallinaDoble').text(cantidadTotalGallinaDoble + " " + (cantidadTotalGallinaDoble === 1 ? "Ud." : "Uds."));
                $('#pesoTotalGallinaDoble').text(pesoTotalGallinaDoble.toFixed(2) + " Kg");
                $('#cantidadTotalGallinaChica').text(cantidadTotalGallinaChica + " " + (cantidadTotalGallinaChica === 1 ? "Ud." : "Uds."));
                $('#pesoTotalGallinaChica').text(pesoTotalGallinaChica.toFixed(2) + " Kg");
                $('#cantidadTotalGallinaChicaFija').text(cantidadTotalGallinaChicaFija + " " + (cantidadTotalGallinaChicaFija === 1 ? "Ud." : "Uds."));
                $('#pesoTotalGallinaChicaFija').text(pesoTotalGallinaChicaFija.toFixed(2) + " Kg");
                $('#cantidadTotalPolloTrozado').text(cantidadTotalPolloTrozado + " " + (cantidadTotalPolloTrozado === 1 ? "Ud." : "Uds."));
                $('#pesoTotalPolloTrozado').text(pesoTotalPolloTrozado.toFixed(2) + " Kg");
                $('#cantidadTotalPolloMaltratado').text(cantidadTotalPolloMaltratado + " " + (cantidadTotalPolloMaltratado === 1 ? "Ud." : "Uds."));
                $('#pesoTotalPolloMaltratado').text(pesoTotalPolloMaltratado.toFixed(2) + " Kg");
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });

    }

    function fn_traerDatosTablaInicioDiferencias(fechaDesde, fechaHasta){
        let consultaDatosEnTiempoReal = new Promise((resolve, reject) => {
            $.ajax({
                url: '/fn_consulta_TraerDatosEnTiempoReal',
                method: 'GET',
                data: { fecha: fechaDesde},
                success: function(response) {
                    let datosTiempoReal = {
                        cantidadPrimerEspecie: 0,
                        cantidadSegundaEspecie: 0,
                        cantidadTerceraEspecie: 0,
                        cantidadCuartaEspecie: 0,
                        cantidadQuintaEspecie: 0,
                        cantidadSextaEspecie: 0,
                        cantidadSeptimaEspecie: 0,
                        cantidadOctavaEspecie: 0,
                        cantidadNovenaEspecie: 0,
                        cantidadDecimaEspecie: 0,
                        cantidadDecimaPrimeraEspecie: 0,
                        cantidadDecimaSegundaEspecie: 0,
                        cantidadDecimaTerceraEspecie: 0,
                        cantidadDecimaCuartaEspecie: 0,
                        cantidadDecimaQuintaEspecie: 0,
                        cantidadDecimaSextaEspecie: 0,
                        cantidadDecimaSeptimaEspecie: 0,
                        cantidadDecimaOctavaEspecie: 0,
                        cantidadDecimaNovenaEspecie: 0,
                        cantidadVigesimaEspecie: 0,
                        cantidadVigesimaPrimeraEspecie: 0,
                        cantidadVigesimaSegundaEspecie: 0,
                        cantidadVigesimaTerceraEspecie: 0,
                        pesoTotalPrimerEspecie: 0.0,
                        pesoTotalSegundaEspecie: 0.0,
                        pesoTotalTerceraEspecie: 0.0,
                        pesoTotalCuartaEspecie: 0.0,
                        pesoTotalQuintaEspecie: 0.0,
                        pesoTotalSextaEspecie: 0.0,
                        pesoTotalSeptimaEspecie: 0.0,
                        pesoTotalOctavaEspecie: 0.0,
                        pesoTotalNovenaEspecie: 0.0,
                        pesoTotalDecimaEspecie: 0.0,
                        pesoTotalDecimaPrimeraEspecie: 0.0,
                        pesoTotalDecimaSegundaEspecie: 0.0,
                        pesoTotalDecimaTerceraEspecie: 0.0,
                        pesoTotalDecimaCuartaEspecie: 0.0,
                        pesoTotalDecimaQuintaEspecie: 0.0,
                        pesoTotalDecimaSextaEspecie: 0.0,
                        pesoTotalDecimaSeptimaEspecie: 0.0,
                        pesoTotalDecimaOctavaEspecie: 0.0,
                        pesoTotalDecimaNovenaEspecie: 0.0,
                        pesoTotalVigesimaEspecie: 0.0,
                        pesoTotalVigesimaPrimeraEspecie: 0.0,
                        pesoTotalVigesimaSegundaEspecie: 0.0,
                        pesoTotalVigesimaTerceraEspecie: 0.0,
                        pesoTotalesEspecie: 0.0,
                        cantidadTotalesEspecie: 0,
                        cantidadTotalYugo: 0,
                        pesoTotalYugo: 0,
                        cantidadTotalTecnica: 0,
                        pesoTotalTecnica: 0,
                        cantidadTotalPolloXX: 0,
                        pesoTotalPolloXX: 0,
                        cantidadTotalGallo: 0,
                        pesoTotalGallo : 0,
                        cantidadTotalGallinaDoble: 0,
                        pesoTotalGallinaDoble: 0,
                        cantidadTotalGallinaChica: 0,
                        cantidadTotalGallinaChicaFija: 0,
                        pesoTotalGallinaChicaFija: 0,
                        pesoTotalGallinaChica: 0,
                        cantidadTotalPolloMaltratado: 0,
                        pesoTotalPolloMaltratado: 0,
                        cantidadTotalPolloTrozado: 0,
                        pesoTotalPolloTrozado: 0,
                        cantidadTotalEspeciesOtros: 0,
                        pesoTotalEspeciesOtros: 0,
                    };

                    // Verificar si la respuesta es un arreglo de objetos
                    if (Array.isArray(response)) {

                        // console.log(response)
                        // Iterar sobre los objetos y mostrar sus propiedades
                        response.forEach(function(obj) {

                            let idEspecie = parseInt(obj.idEspecie);
                            let cantidadPes = parseInt(obj.cantidadPes);
                            let pesoNetoPes = parseFloat(obj.pesoNetoPes);
                            let pesoNetoJabas = parseFloat(obj.pesoNetoJabas);
                            let pesoNeto = Math.abs(pesoNetoPes - pesoNetoJabas);

                            switch(idEspecie) {
                                case 1:
                                    datosTiempoReal.cantidadPrimerEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalPrimerEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalPrimerEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 2:
                                    datosTiempoReal.cantidadSegundaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalSegundaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalSegundaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 3:
                                    datosTiempoReal.cantidadTerceraEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalTerceraEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalTerceraEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 4:
                                    datosTiempoReal.cantidadCuartaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalCuartaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalCuartaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 5:
                                    datosTiempoReal.cantidadQuintaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalQuintaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalQuintaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 6:
                                    datosTiempoReal.cantidadSextaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalSextaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalSextaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 7:
                                    datosTiempoReal.cantidadSeptimaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalSeptimaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalSeptimaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 8:
                                    datosTiempoReal.cantidadOctavaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalOctavaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalOctavaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 9:
                                    datosTiempoReal.cantidadNovenaEspecie += cantidadPes
                                    break;
                                case 10:
                                    datosTiempoReal.cantidadDecimaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 11:
                                    datosTiempoReal.cantidadDecimaPrimeraEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaPrimeraEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaPrimeraEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 12:
                                    datosTiempoReal.cantidadDecimaSegundaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaSegundaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaSegundaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 13:
                                    datosTiempoReal.cantidadDecimaTerceraEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaTerceraEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaTerceraEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 14:
                                    datosTiempoReal.cantidadDecimaCuartaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaCuartaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaCuartaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 15:
                                    datosTiempoReal.cantidadDecimaQuintaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaQuintaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaQuintaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 16:
                                    datosTiempoReal.cantidadDecimaSextaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaSextaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaSextaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 17:
                                    datosTiempoReal.cantidadDecimaSeptimaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaSeptimaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaSeptimaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 18:
                                    datosTiempoReal.cantidadDecimaOctavaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaOctavaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaOctavaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 19:
                                    datosTiempoReal.cantidadDecimaNovenaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalDecimaNovenaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalDecimaNovenaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 20:
                                    datosTiempoReal.cantidadVigesimaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalVigesimaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalVigesimaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 21:
                                    datosTiempoReal.cantidadVigesimaPrimeraEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalVigesimaPrimeraEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalVigesimaPrimeraEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 22:
                                    datosTiempoReal.cantidadVigesimaSegundaEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalVigesimaSegundaEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalVigesimaSegundaEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                case 23:
                                    datosTiempoReal.cantidadVigesimaTerceraEspecie += cantidadPes
                                    if(pesoNetoPes>0){
                                        datosTiempoReal.pesoTotalVigesimaTerceraEspecie += pesoNetoPes - pesoNetoJabas
                                    }else{
                                        datosTiempoReal.pesoTotalVigesimaTerceraEspecie += pesoNetoPes + pesoNetoJabas
                                    }
                                    break;
                                default:
                                    console.log("ID de especie no reconocido: " + idEspecie);
                                    break;
                            }

                        });

                        datosTiempoReal.cantidadTotalesEspecie = datosTiempoReal.cantidadPrimerEspecie + datosTiempoReal.cantidadSegundaEspecie +
                            datosTiempoReal.cantidadTerceraEspecie + datosTiempoReal.cantidadCuartaEspecie +
                            datosTiempoReal.cantidadQuintaEspecie + datosTiempoReal.cantidadSextaEspecie +
                            datosTiempoReal.cantidadSeptimaEspecie + datosTiempoReal.cantidadOctavaEspecie +
                            datosTiempoReal.cantidadNovenaEspecie + datosTiempoReal.cantidadDecimaEspecie +
                            datosTiempoReal.cantidadDecimaPrimeraEspecie + datosTiempoReal.cantidadDecimaSegundaEspecie +
                            datosTiempoReal.cantidadDecimaTerceraEspecie + datosTiempoReal.cantidadDecimaCuartaEspecie +
                            datosTiempoReal.cantidadDecimaQuintaEspecie + datosTiempoReal.cantidadDecimaSextaEspecie +
                            datosTiempoReal.cantidadDecimaSeptimaEspecie + datosTiempoReal.cantidadDecimaOctavaEspecie +
                            datosTiempoReal.cantidadDecimaNovenaEspecie + datosTiempoReal.cantidadVigesimaEspecie +
                            datosTiempoReal.cantidadVigesimaPrimeraEspecie + datosTiempoReal.cantidadVigesimaSegundaEspecie +
                            datosTiempoReal.cantidadVigesimaTerceraEspecie;

                        datosTiempoReal.pesoTotalesEspecie = datosTiempoReal.pesoTotalPrimerEspecie + datosTiempoReal.pesoTotalSegundaEspecie +
                            datosTiempoReal.pesoTotalTerceraEspecie + datosTiempoReal.pesoTotalCuartaEspecie +
                            datosTiempoReal.pesoTotalQuintaEspecie + datosTiempoReal.pesoTotalSextaEspecie +
                            datosTiempoReal.pesoTotalSeptimaEspecie + datosTiempoReal.pesoTotalOctavaEspecie +
                            datosTiempoReal.pesoTotalNovenaEspecie + datosTiempoReal.pesoTotalDecimaEspecie +
                            datosTiempoReal.pesoTotalDecimaPrimeraEspecie + datosTiempoReal.pesoTotalDecimaSegundaEspecie +
                            datosTiempoReal.pesoTotalDecimaTerceraEspecie + datosTiempoReal.pesoTotalDecimaCuartaEspecie +
                            datosTiempoReal.pesoTotalDecimaQuintaEspecie + datosTiempoReal.pesoTotalDecimaSextaEspecie +
                            datosTiempoReal.pesoTotalDecimaSeptimaEspecie + datosTiempoReal.pesoTotalDecimaOctavaEspecie +
                            datosTiempoReal.pesoTotalDecimaNovenaEspecie + datosTiempoReal.pesoTotalVigesimaEspecie +
                            datosTiempoReal.pesoTotalVigesimaPrimeraEspecie + datosTiempoReal.pesoTotalVigesimaSegundaEspecie +
                            datosTiempoReal.pesoTotalVigesimaTerceraEspecie;

                        datosTiempoReal.cantidadTotalYugo = datosTiempoReal.cantidadPrimerEspecie + datosTiempoReal.cantidadSegundaEspecie + datosTiempoReal.cantidadDecimaSeptimaEspecie
                        datosTiempoReal.pesoTotalYugo = datosTiempoReal.pesoTotalPrimerEspecie + datosTiempoReal.pesoTotalSegundaEspecie + datosTiempoReal.pesoTotalDecimaSeptimaEspecie
                        
                        datosTiempoReal.cantidadTotalTecnica = datosTiempoReal.cantidadTerceraEspecie + datosTiempoReal.cantidadCuartaEspecie + datosTiempoReal.cantidadDecimaOctavaEspecie
                        datosTiempoReal.pesoTotalTecnica = datosTiempoReal.pesoTotalTerceraEspecie + datosTiempoReal.pesoTotalCuartaEspecie + datosTiempoReal.pesoTotalDecimaOctavaEspecie

                        datosTiempoReal.cantidadTotalPolloXX = datosTiempoReal.cantidadDecimaSextaEspecie + datosTiempoReal.cantidadDecimaNovenaEspecie
                        datosTiempoReal.pesoTotalPolloXX = datosTiempoReal.pesoTotalDecimaSextaEspecie + datosTiempoReal.pesoTotalDecimaNovenaEspecie

                        datosTiempoReal.cantidadTotalGallo = datosTiempoReal.cantidadSeptimaEspecie + datosTiempoReal.cantidadVigesimaSegundaEspecie
                        datosTiempoReal.pesoTotalGallo = datosTiempoReal.pesoTotalSeptimaEspecie + datosTiempoReal.pesoTotalVigesimaSegundaEspecie

                        datosTiempoReal.cantidadTotalGallinaDoble = datosTiempoReal.cantidadQuintaEspecie + datosTiempoReal.cantidadVigesimaEspecie
                        datosTiempoReal.pesoTotalGallinaDoble = datosTiempoReal.pesoTotalQuintaEspecie + datosTiempoReal.pesoTotalVigesimaEspecie

                        datosTiempoReal.cantidadTotalGallinaChica = datosTiempoReal.cantidadSextaEspecie + datosTiempoReal.cantidadVigesimaPrimeraEspecie
                        datosTiempoReal.pesoTotalGallinaChica = datosTiempoReal.pesoTotalSextaEspecie + datosTiempoReal.pesoTotalVigesimaPrimeraEspecie

                        datosTiempoReal.cantidadTotalGallinaChicaFija = datosTiempoReal.cantidadDecimaCuartaEspecie + datosTiempoReal.cantidadVigesimaTerceraEspecie
                        datosTiempoReal.pesoTotalGallinaChicaFija = datosTiempoReal.pesoTotalDecimaCuartaEspecie + datosTiempoReal.pesoTotalVigesimaTerceraEspecie

                        datosTiempoReal.cantidadTotalPolloMaltratado = datosTiempoReal.cantidadOctavaEspecie
                        datosTiempoReal.pesoTotalPolloMaltratado = datosTiempoReal.pesoTotalOctavaEspecie
                        
                        datosTiempoReal.cantidadTotalPolloTrozado = datosTiempoReal.cantidadDecimaEspecie + datosTiempoReal.cantidadDecimaPrimeraEspecie + datosTiempoReal.cantidadDecimaSegundaEspecie + datosTiempoReal.cantidadDecimaTerceraEspecie + 
                        datosTiempoReal.cantidadDecimaQuintaEspecie + datosTiempoReal.cantidadNovenaEspecie
                        datosTiempoReal.pesoTotalPolloTrozado = datosTiempoReal.pesoTotalDecimaEspecie + datosTiempoReal.pesoTotalDecimaPrimeraEspecie + datosTiempoReal.pesoTotalDecimaSegundaEspecie + datosTiempoReal.pesoTotalDecimaTerceraEspecie + 
                        datosTiempoReal.pesoTotalDecimaQuintaEspecie
                        
                        datosTiempoReal.cantidadTotalEspeciesOtros = datosTiempoReal.cantidadTotalPolloTrozado + datosTiempoReal.cantidadTotalGallinaChica + datosTiempoReal.cantidadTotalPolloMaltratado
                        datosTiempoReal.pesoTotalEspeciesOtros = datosTiempoReal.pesoTotalPolloTrozado + datosTiempoReal.pesoTotalGallinaChica + datosTiempoReal.pesoTotalPolloMaltratado
                        // console.log(
                        //     "Cantidad",datosTiempoReal.cantidadTotalesEspecie, "Peso",datosTiempoReal.pesoTotalesEspecie);

                        } else {
                            console.log("La respuesta no es un arreglo de objetos.");
                        }
                    resolve(datosTiempoReal);
                },
                error: function(error) {
                    console.error("ERROR",error);
                }
            });
        });

        let consultaProveedores = new Promise((resolve, reject) => {
            $.ajax({
                url: '/fn_consulta_ConsultarProveedor',
                method: 'GET',
                data: {
                    fechaDesde: fechaDesde,
                    fechaHasta: fechaHasta,
                },
                success: function(response) {
                    let datosProveedores = {
                        pagoAProveedoresPorDia: 0.00,
                        cantidadAProveedoresPorDia: 0,
                        especiesProveedoresPorDia: 0,
                        pesoAProveedoresPorDia: 0.0,
                        pesoBrutoProveedoresPorDia: 0.0,
                        pesoTaraProveedoresPorDia: 0.0,
                        proveedores: {}
                    };
        
                    if (Array.isArray(response)) {
                        response.forEach(function(obj) {
                            let idProveedor = obj.idProveedor;
                            let nombreEspecie = obj.nombreEspecieCompra;
                            let precioGuia = parseFloat(obj.precioGuia || 0.00);
                            let pesoNeto = parseFloat(obj.pesoBrutoGuia) - parseFloat(obj.pesoTaraGuia);
                            let totalAPagar = precioGuia * pesoNeto;
        
                            // Inicializar datos del proveedor si no existe
                            if (!datosProveedores.proveedores[idProveedor]) {
                                datosProveedores.proveedores[idProveedor] = {
                                    especies: {}
                                };
                            }
        
                            let proveedorData = datosProveedores.proveedores[idProveedor];
        
                            // Inicializar datos de la especie si no existe
                            if (!proveedorData.especies[nombreEspecie]) {
                                proveedorData.especies[nombreEspecie] = {
                                    cantidad: 0,
                                    pesoTotal: 0
                                };
                            }
        
                            let especieData = proveedorData.especies[nombreEspecie];
        
                            especieData.cantidad += parseInt(obj.cantidadGuia);
                            if (parseFloat(obj.pesoBrutoGuia) > parseFloat(obj.pesoTaraGuia)) {
                                especieData.pesoTotal += parseFloat(obj.pesoBrutoGuia) - parseFloat(obj.pesoTaraGuia);
                            } else {
                                especieData.pesoTotal += parseFloat(obj.pesoBrutoGuia) + parseFloat(obj.pesoTaraGuia);
                            }
        
                            datosProveedores.pagoAProveedoresPorDia += totalAPagar;
                            datosProveedores.cantidadAProveedoresPorDia += parseInt(obj.cantidadGuia);
                            datosProveedores.pesoAProveedoresPorDia += pesoNeto;
                            datosProveedores.pesoBrutoProveedoresPorDia += parseFloat(obj.pesoBrutoGuia);
                            datosProveedores.pesoTaraProveedoresPorDia += parseFloat(obj.pesoTaraGuia);
                        });
        
                        resolve(datosProveedores);
                    } else {
                        console.log("La respuesta no es un arreglo de objetos.");
                        reject(new Error("La respuesta no es un arreglo de objetos."));
                    }
                },
                error: function(error) {
                    console.error("ERROR", error);
                    reject(error);
                }
            });
        });                

        Promise.all([consultaDatosEnTiempoReal, consultaProveedores])
            .then(function([datosTiempoReal, datosProveedores]) {
                // console.log('Datos de proveedores:', datosProveedores);

                let resultadoDiferenciaCantidad = datosProveedores.cantidadAProveedoresPorDia - datosTiempoReal.cantidadTotalesEspecie;
                let resultadoDiferenciaPeso = datosProveedores.pesoAProveedoresPorDia - datosTiempoReal.pesoTotalesEspecie;

                let tbodycantidadesPollosCalculo = $('#bodycantidadesPollosCalculo');

                // Construir filas HTML iniciales
                construirFilaTotalesCompradePollos(datosProveedores, datosTiempoReal, resultadoDiferenciaCantidad, resultadoDiferenciaPeso, fechaDesde)
                .then((result) => {
                    // Usa `result` aquí, por ejemplo, para insertarlo en el DOM
                    tbodycantidadesPollosCalculo.html(result);
                })
                .catch((error) => {
                    console.error("Error al construir la fila:", error);
                });
            })
            .catch(function(error) {
                console.error('Error en las consultas:', error);
            });
    }

    function clasificarEspecies(datosProveedores) {
        let clasificaciones = {
            MERMA_GALLO: {
                cantidad: 0,
                pesoTotal: 0
            },
            MERMA_YUGO: {
                cantidad: 0,
                pesoTotal: 0
            },
            MERMA_GALLINA: {
                cantidad: 0,
                pesoTotal: 0
            },
            MERMA_TECNICA: {
                cantidad: 0,
                pesoTotal: 0
            },
            MERMA_POLLO_XX: {
                cantidad: 0,
                pesoTotal: 0
            },
            MERMA_GALLINA_CHICA: {
                cantidad: 0,
                pesoTotal: 0
            },
            MERMA_OTROS: {
                cantidad: 0,
                pesoTotal: 0
            }
        };
    
        // Iterar sobre los proveedores y sus especies
        Object.keys(datosProveedores.proveedores).forEach(function(idProveedor) {
            let proveedorData = datosProveedores.proveedores[idProveedor];
    
            Object.keys(proveedorData.especies).forEach(function(nombreEspecie) {
                let especieData = proveedorData.especies[nombreEspecie];
                let especieUpper = nombreEspecie.toUpperCase();
    
                // Verificar y clasificar por tipo de especie
                if (especieUpper === "GALLO YUGO") {
                    clasificaciones.MERMA_GALLO.cantidad += especieData.cantidad;
                    clasificaciones.MERMA_GALLO.pesoTotal += especieData.pesoTotal;
                }
                if (especieUpper === "YUGO TRUJILLO AA" || especieUpper === "YUGO PIURA AA" || especieUpper === "YUGO PIURA") {
                    clasificaciones.MERMA_YUGO.cantidad += especieData.cantidad;
                    clasificaciones.MERMA_YUGO.pesoTotal += especieData.pesoTotal;
                }
                if (especieUpper === "YUGO PIURA GALLINA DOBLE" || especieUpper === "ATOCHE GALLINA DOBLE") {
                    clasificaciones.MERMA_GALLINA.cantidad += especieData.cantidad;
                    clasificaciones.MERMA_GALLINA.pesoTotal += especieData.pesoTotal;
                }
                if (especieUpper === "TECNICA AA" || especieUpper === "MASAY") {
                    clasificaciones.MERMA_TECNICA.cantidad += especieData.cantidad;
                    clasificaciones.MERMA_TECNICA.pesoTotal += especieData.pesoTotal;
                }
                if (especieUpper === "YUGO PIURA XX" || especieUpper === "YUGO TRUJILLO XX") {
                    clasificaciones.MERMA_POLLO_XX.cantidad += especieData.cantidad;
                    clasificaciones.MERMA_POLLO_XX.pesoTotal += especieData.pesoTotal;
                }
                if (especieUpper === "SALOMON GALLINA CHICA" || especieUpper === "YUGO PIURA GALLINA CHICA") {
                    clasificaciones.MERMA_GALLINA_CHICA.cantidad += especieData.cantidad;
                    clasificaciones.MERMA_GALLINA_CHICA.pesoTotal += especieData.pesoTotal;
                }
                if (especieUpper === "CHIMU" || especieUpper === "OTROS") {
                    clasificaciones.MERMA_OTROS.cantidad += especieData.cantidad;
                    clasificaciones.MERMA_OTROS.pesoTotal += especieData.pesoTotal;
                }
            });
        });
    
        return clasificaciones;
    }    


    function construirFilaTotalesCompradePollos(datosProveedores, datosTiempoReal, resultadoDiferenciaCantidad, resultadoDiferenciaPeso, fechaDesde) {
        let clasificaciones = clasificarEspecies(datosProveedores);
        let pesoAProveedoresPorDia = datosProveedores.pesoAProveedoresPorDia;
        let pesoTotalesEspecie = datosTiempoReal.pesoTotalesEspecie;
        let cantidadAProveedoresPorDia = datosProveedores.cantidadAProveedoresPorDia;
        let cantidadTotalesEspecie = datosTiempoReal.cantidadTotalesEspecie;
        let cantidadTotalYugo = datosTiempoReal.cantidadTotalYugo;
        let pesoTotalYugo = datosTiempoReal.pesoTotalYugo;
        let cantidadTotalTecnica = datosTiempoReal.cantidadTotalTecnica ;
        let pesoTotalTecnica = datosTiempoReal.pesoTotalTecnica;
        let cantidadTotalPolloXX = datosTiempoReal.cantidadTotalPolloXX;
        let pesoTotalPolloXX = datosTiempoReal.pesoTotalPolloXX;
        let cantidadTotalGallo = datosTiempoReal.cantidadTotalGallo;
        let pesoTotalGallo = datosTiempoReal.pesoTotalGallo;
        let cantidadTotalGallinaDoble = datosTiempoReal.cantidadTotalGallinaDoble;
        let pesoTotalGallinaDoble = datosTiempoReal.pesoTotalGallinaDoble;
        let cantidadTotalGallinaChicaFija = datosTiempoReal.cantidadTotalGallinaChicaFija;
        let pesoTotalGallinaChicaFija = datosTiempoReal.pesoTotalGallinaChicaFija;
        let cantidadTotalEspeciesOtros = datosTiempoReal.cantidadTotalEspeciesOtros;
        let pesoTotalEspeciesOtros = datosTiempoReal.pesoTotalEspeciesOtros;
        let mermaDiferenciaCantidadYugo = clasificaciones.MERMA_YUGO.cantidad - datosTiempoReal.cantidadTotalYugo;
        let mermaDiferenciaPesoYugo = clasificaciones.MERMA_YUGO.pesoTotal - datosTiempoReal.pesoTotalYugo;
        let mermaDiferenciaCantidadTecnica = clasificaciones.MERMA_TECNICA.cantidad - datosTiempoReal.cantidadTotalTecnica;
        let mermaDiferenciaPesoTecnica = clasificaciones.MERMA_TECNICA.pesoTotal - datosTiempoReal.pesoTotalTecnica;
        let mermaDiferenciaCantidadPolloXX = clasificaciones.MERMA_POLLO_XX.cantidad - datosTiempoReal.cantidadTotalPolloXX;
        let mermaDiferenciaPesoPolloXX = clasificaciones.MERMA_POLLO_XX.pesoTotal - datosTiempoReal.pesoTotalPolloXX;
        let mermaDiferenciaCantidadGallo = clasificaciones.MERMA_GALLO.cantidad - datosTiempoReal.cantidadTotalGallo;
        let mermaDiferenciaPesoGallo = clasificaciones.MERMA_GALLO.pesoTotal - datosTiempoReal.pesoTotalGallo;
        let mermaDiferenciaCantidadGallinaDoble = clasificaciones.MERMA_GALLINA.cantidad - datosTiempoReal.cantidadTotalGallinaDoble;
        let mermaDiferenciaPesoGallinaDoble = clasificaciones.MERMA_GALLINA.pesoTotal - datosTiempoReal.pesoTotalGallinaDoble;
        let mermaDiferenciaCantidadGallinaChica = clasificaciones.MERMA_GALLINA_CHICA.cantidad - datosTiempoReal.cantidadTotalGallinaChicaFija;
        let mermaDiferenciaPesoGallinaChica = clasificaciones.MERMA_GALLINA_CHICA.pesoTotal - datosTiempoReal.pesoTotalGallinaChicaFija;
        let mermaDiferenciaCantidadEspeciesOtros = clasificaciones.MERMA_OTROS.cantidad - datosTiempoReal.cantidadTotalEspeciesOtros;
        let mermaDiferenciaPesoEspeciesOtros = clasificaciones.MERMA_OTROS.pesoTotal - datosTiempoReal.pesoTotalEspeciesOtros;

        let totalPesoSoloPollosCompra = parseFloat(clasificaciones.MERMA_YUGO.pesoTotal) + parseFloat(clasificaciones.MERMA_TECNICA.pesoTotal) + parseFloat(clasificaciones.MERMA_POLLO_XX.pesoTotal) + parseFloat(clasificaciones.MERMA_OTROS.pesoTotal);
        let totalCantidadSoloPollosCompra = parseInt(clasificaciones.MERMA_YUGO.cantidad) + parseInt(clasificaciones.MERMA_TECNICA.cantidad) + parseInt(clasificaciones.MERMA_POLLO_XX.cantidad) + parseInt(clasificaciones.MERMA_OTROS.cantidad);
        let totalPesoSoloPollosVenta = parseFloat(pesoTotalYugo) + parseFloat(pesoTotalTecnica) + parseFloat(pesoTotalPolloXX) + parseFloat(pesoTotalEspeciesOtros); 
        let totalCantidadSoloPollosVenta = parseInt(cantidadTotalYugo) + parseInt(cantidadTotalTecnica) + parseInt(cantidadTotalPolloXX) + parseInt(cantidadTotalEspeciesOtros);
        let totalMermaPesoSoloPollos = parseFloat(mermaDiferenciaPesoYugo) + parseFloat(mermaDiferenciaPesoTecnica) + parseFloat(mermaDiferenciaPesoPolloXX) + parseFloat(mermaDiferenciaPesoEspeciesOtros);
        let totalMermaCantidadSoloPollos = parseInt(mermaDiferenciaCantidadYugo) + parseInt(mermaDiferenciaCantidadTecnica) + parseInt(mermaDiferenciaCantidadPolloXX) + parseInt(mermaDiferenciaCantidadEspeciesOtros);

        let date = new Date(fechaDesde + "T00:00:00Z");
        date.setUTCDate(date.getUTCDate() - 1);
        let dia = ("0" + date.getUTCDate()).slice(-2);
        let mes = ("0" + (date.getUTCMonth() + 1)).slice(-2);
        let anio = date.getUTCFullYear();
        let fechaDesdeAnterior = anio + '-' + mes + '-' + dia;
        // Realiza la solicitud AJAX para obtener sugerencias
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/fn_consulta_TraerStock',
                method: 'GET',
                data: {
                    fecha: fechaDesde
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
                        let totalPesoPollo = parseFloat((totalPesoSoloPollosCompra ? totalPesoSoloPollosCompra : 0)) + parseFloat(totalPesoStockPollo);
                        let totalCantidadPollo = parseInt((totalCantidadSoloPollosCompra ? totalCantidadSoloPollosCompra : 0)) + parseInt(totalCantidadStockPollo);
                        
                        let totalPesoGeneralPollo = parseFloat((pesoAProveedoresPorDia ? pesoAProveedoresPorDia : 0)) + parseFloat(totalPesoStockPollo);
                        let totalCantidadGeneralPollo = parseFloat((cantidadAProveedoresPorDia ? cantidadAProveedoresPorDia : 0)) + parseFloat(totalCantidadStockPollo);

                        totalMermaPesoSoloPollos = totalMermaPesoSoloPollos + totalPesoStockPollo;
                        totalMermaCantidadSoloPollos = totalMermaCantidadSoloPollos + totalCantidadStockPollo;

                        resultadoDiferenciaPeso = resultadoDiferenciaPeso + totalPesoStockPollo;
                        resultadoDiferenciaCantidad = resultadoDiferenciaCantidad + totalCantidadStockPollo;
                        let result = `
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Pollo Yugo</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_YUGO.cantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockYugoCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(clasificaciones.MERMA_YUGO.cantidad) + parseInt(stockYugoCantidad)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_YUGO.pesoTotal.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockYugoPeso.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(clasificaciones.MERMA_YUGO.pesoTotal) + parseFloat(stockYugoPeso)).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${cantidadTotalYugo ? cantidadTotalYugo : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(pesoTotalYugo ? pesoTotalYugo : 0).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadYugo ? mermaDiferenciaCantidadYugo : 0) + stockYugoCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${((mermaDiferenciaPesoYugo ? mermaDiferenciaPesoYugo : 0) + stockYugoPeso).toFixed(2)}</td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Pollo Tecnica</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_TECNICA.cantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockTecnicaCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(clasificaciones.MERMA_TECNICA.cantidad) + parseInt(stockTecnicaCantidad)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_TECNICA.pesoTotal.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockYugoPeso.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(clasificaciones.MERMA_TECNICA.pesoTotal) + parseFloat(stockYugoPeso)).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(cantidadTotalTecnica ? cantidadTotalTecnica : 0) + (cantidadTotalEspeciesOtros ? cantidadTotalEspeciesOtros : 0)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${((pesoTotalTecnica ? pesoTotalTecnica : 0) + (pesoTotalEspeciesOtros ? pesoTotalEspeciesOtros : 0)).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadTecnica ? mermaDiferenciaCantidadTecnica : 0) + (mermaDiferenciaCantidadEspeciesOtros ? mermaDiferenciaCantidadEspeciesOtros : 0) + stockTecnicaCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${((mermaDiferenciaPesoTecnica ? mermaDiferenciaPesoTecnica : 0) + (mermaDiferenciaPesoEspeciesOtros ? mermaDiferenciaPesoEspeciesOtros : 0) + stockYugoPeso).toFixed(2)}</td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Pollo XX</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_POLLO_XX.cantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockPolloXXCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(clasificaciones.MERMA_POLLO_XX.cantidad) + parseInt(stockPolloXXCantidad)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_POLLO_XX.pesoTotal.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockPolloXXPeso.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(clasificaciones.MERMA_POLLO_XX.pesoTotal) + parseFloat(stockPolloXXPeso)).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${cantidadTotalPolloXX ? cantidadTotalPolloXX : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(pesoTotalPolloXX ? pesoTotalPolloXX : 0).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadPolloXX ? mermaDiferenciaCantidadPolloXX : 0) + stockPolloXXCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${((mermaDiferenciaPesoPolloXX ? mermaDiferenciaPesoPolloXX : 0) + stockPolloXXPeso).toFixed(2)}</td>
                            </tr>
                            <tr class="bg-red-600 border-b dark:border-gray-700 text-gray-200">
                                <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white whitespace-nowrap">Total de Pollos</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadSoloPollosCompra ? totalCantidadSoloPollosCompra : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadStockPollo}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadPollo}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoSoloPollosCompra ? totalPesoSoloPollosCompra : 0).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoStockPollo).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoPollo).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadSoloPollosVenta ? totalCantidadSoloPollosVenta : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalPesoSoloPollosVenta ? totalPesoSoloPollosVenta : 0).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalMermaCantidadSoloPollos ? totalMermaCantidadSoloPollos : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(totalMermaPesoSoloPollos ? totalMermaPesoSoloPollos : 0).toFixed(2)}</td>
                            </tr>
                            <tr class="border-b dark:border-gray-700 bg-yellow-300 text-gray-900">
                                <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">Trozado, Secos y Ahogados</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap"></td>
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
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_GALLO.cantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGalloCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(clasificaciones.MERMA_GALLO.cantidad) + parseInt(stockGalloCantidad)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_GALLO.pesoTotal.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGalloPeso.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(clasificaciones.MERMA_GALLO.pesoTotal) + parseFloat(stockGalloPeso)).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${cantidadTotalGallo ? cantidadTotalGallo : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(pesoTotalGallo ? pesoTotalGallo : 0).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadGallo ? mermaDiferenciaCantidadGallo : 0) + stockGalloCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${((mermaDiferenciaPesoGallo ? mermaDiferenciaPesoGallo : 0) + stockGalloPeso).toFixed(2)}</td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Gallina Doble</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_GALLINA.cantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGallinaDobleCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(clasificaciones.MERMA_GALLINA.cantidad) + parseInt(stockGallinaDobleCantidad)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_GALLINA.pesoTotal.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGallinaDoblePeso.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(clasificaciones.MERMA_GALLINA.pesoTotal) + parseFloat(stockGallinaDoblePeso)).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${cantidadTotalGallinaDoble ? cantidadTotalGallinaDoble : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(pesoTotalGallinaDoble ? pesoTotalGallinaDoble : 0).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadGallinaDoble ? mermaDiferenciaCantidadGallinaDoble : 0) + stockGallinaDobleCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${((mermaDiferenciaPesoGallinaDoble ? mermaDiferenciaPesoGallinaDoble : 0) + stockGallinaDoblePeso).toFixed(2)}</td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 text-gray-900">
                                <td class="text-base uppercase font-semibold text-left border-2 py-2 px-3 text-white bg-blue-600 whitespace-nowrap">Gallina Chica</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_GALLINA_CHICA.cantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGallinaChicaCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${parseInt(clasificaciones.MERMA_GALLINA_CHICA.cantidad) + parseInt(stockGallinaChicaCantidad)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${clasificaciones.MERMA_GALLINA_CHICA.pesoTotal.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${stockGallinaChicaPeso.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(parseFloat(clasificaciones.MERMA_GALLINA_CHICA.pesoTotal) + parseFloat(stockGallinaChicaPeso)).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${cantidadTotalGallinaChicaFija ? cantidadTotalGallinaChicaFija : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(pesoTotalGallinaChicaFija ? pesoTotalGallinaChicaFija : 0).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(mermaDiferenciaCantidadGallinaChica ? mermaDiferenciaCantidadGallinaChica : 0) + stockGallinaChicaCantidad}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${((mermaDiferenciaPesoGallinaChica ? mermaDiferenciaPesoGallinaChica : 0) + stockGallinaChicaPeso).toFixed(2)}</td>
                            </tr>
                            <tr class="bg-red-600 uppercase border-b dark:border-gray-700 text-gray-200">
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 text-white whitespace-nowrap">Total General</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${cantidadAProveedoresPorDia ? cantidadAProveedoresPorDia : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadStockPollo}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalCantidadGeneralPollo}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(pesoAProveedoresPorDia ? pesoAProveedoresPorDia : 0).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalPesoStockPollo.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${totalPesoGeneralPollo.toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${cantidadTotalesEspecie ? cantidadTotalesEspecie : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(pesoTotalesEspecie ? pesoTotalesEspecie : 0).toFixed(2)}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${resultadoDiferenciaCantidad ? resultadoDiferenciaCantidad : 0}</td>
                                <td class="text-base font-semibold text-left border-2 py-2 px-3 whitespace-nowrap">${(resultadoDiferenciaPeso ? resultadoDiferenciaPeso : 0).toFixed(2)}</td>
                            </tr>
                        `;
                        resolve(result); // Resuelve la promesa con el resultado
                    } else {
                        reject("La respuesta no es un arreglo."); // Rechaza la promesa en caso de error
                    }
                },
                error: function (error) {
                    reject(error); // Rechaza la promesa si hay un error en la llamada AJAX
                }
            });
        });
    }

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
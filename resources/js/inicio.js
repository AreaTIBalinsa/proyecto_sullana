import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    fn_declarar_especies();
    fn_traerDatosEnTiempoReal();
    setInterval(fn_traerDatosEnTiempoReal, 10000);

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];


    // Asignar la fecha actual a los inputs
    $('#fechaProduccionAnterior').val(fechaHoy);

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

    function fn_traerDatosEnTiempoReal(){

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
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalPrimerEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalPrimerEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 2) {
                            cantidadSegundaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalSegundaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalSegundaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 3) {
                            cantidadTerceraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalTerceraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalTerceraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 4) {
                            cantidadCuartaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalCuartaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalCuartaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 5) {
                            cantidadQuintaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalQuintaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalQuintaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 6) {
                            cantidadSextaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalSextaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalSextaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 7) {
                            cantidadSeptimaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalSeptimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalSeptimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 8) {
                            cantidadOctavaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalOctavaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalOctavaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 10) {
                            cantidadDecimaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 11){
                            cantidadDecimaPrimeraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaPrimeraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaPrimeraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 12){
                            cantidadDecimaSegundaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaSegundaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaSegundaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 13){
                            cantidadDecimaTerceraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaTerceraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaTerceraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 14){
                            cantidadDecimaCuartaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaCuartaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaCuartaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 15){
                            cantidadDecimaQuintaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaQuintaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaQuintaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 16){
                            cantidadDecimaSextaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaSextaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaSextaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 17){
                            cantidadDecimaSeptimaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaSeptimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaSeptimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 18){
                            cantidadDecimaOctavaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaOctavaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaOctavaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 19){
                            cantidadDecimaNovenaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalDecimaNovenaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalDecimaNovenaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 20){
                            cantidadVigesimaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalVigesimaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 21){
                            cantidadVigesimaPrimeraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalVigesimaPrimeraEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaPrimeraEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 22){
                            cantidadVigesimaSegundaEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
                                pesoTotalVigesimaSegundaEspecie += pesoNetoPes - pesoNetoJabas
                            }else{
                                pesoTotalVigesimaSegundaEspecie += pesoNetoPes + pesoNetoJabas
                            }
                        }else if (idEspecie == 23){
                            cantidadVigesimaTerceraEspecie += cantidadPes
                            if(pesoNetoPes>pesoNetoJabas){
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
                    cantidadDecimaOctavaEspecie + cantidadDecimaNovenaEspecie + cantidadVigesimaEspecie + cantidadVigesimaPrimeraEspecie + cantidadVigesimaSegundaEspecie + cantidadVigesimaTerceraEspecie;
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

                    cantidadTotalPolloTrozado = cantidadDecimaEspecie + cantidadDecimaPrimeraEspecie + cantidadDecimaSegundaEspecie + cantidadDecimaTerceraEspecie + 
                    cantidadDecimaCuartaEspecie + cantidadDecimaQuintaEspecie
                    pesoTotalPolloTrozado = pesoTotalDecimaEspecie + pesoTotalDecimaPrimeraEspecie + pesoTotalDecimaSegundaEspecie + pesoTotalDecimaTerceraEspecie + 
                    pesoTotalDecimaCuartaEspecie + pesoTotalDecimaQuintaEspecie

                    cantidadTotalPolloMaltratado = cantidadOctavaEspecie + cantidadVigesimaTerceraEspecie
                    pesoTotalPolloMaltratado = pesoTotalOctavaEspecie + pesoTotalVigesimaTerceraEspecie

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
                // ========
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
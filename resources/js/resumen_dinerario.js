import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    const fechaHoyTabla = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

    $("#fechaFiltrarResumenDinerario").val(fechaHoy);
    $("#fechaFiltrarResumenDinerarioTripaDesde").val(fechaHoy);
    $("#fechaFiltrarResumenDinerarioTripaHasta").val(fechaHoy);
    bodyReporteDeResumenDinerario(fechaHoy, fechaHoy);
    bodyReporteDeResumenDinerarioEgresos(fechaHoy, fechaHoy);
    bodyReporteDeResumenDinerarioProveedores(fechaHoy, fechaHoy);
    
    $(document).on('click', '#btnBuscarResumenDinerario', function () {
        let fechaFiltrar = $("#fechaFiltrarResumenDinerario").val();
        bodyReporteDeResumenDinerario(fechaFiltrar, fechaFiltrar);
        bodyReporteDeResumenDinerarioEgresos(fechaFiltrar, fechaFiltrar);
        bodyReporteDeResumenDinerarioProveedores(fechaFiltrar, fechaFiltrar);
    });

    $(document).on('click', '#btnBuscarResumenDinerarioTripa', function () {
        let fechaFiltrar = $("#fechaFiltrarResumenDinerarioTripaDesde").val();
        let fechaFiltrar2 = $("#fechaFiltrarResumenDinerarioTripaHasta").val();
        bodyReporteDeResumenDinerarioControlTripa(fechaFiltrar, fechaFiltrar2);
    });

    function bodyReporteDeResumenDinerario(fecha, fecha2){
        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerPagosResumenDinerario',
            method: 'GET',
            data:{
                fecha : fecha,
                fecha2 : fecha2
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    let tbodyReporteDeResumenDinerario = $(`#bodyReporteDeResumenDinerario`);
                    tbodyReporteDeResumenDinerario.empty();

                    let totalIngresosBancos = 0;
                    let totalIngresosCamal = 0;
                    let totalIngresosPaul = 0;
                    let totalIngresosAGranjas = 0;

                    let totalBancos = 0;

                    let montoBCP = 0;
                    let montoBBVA = 0;
                    let montoIBK = 0;
                    let montoCAJAPIURA = 0;
                    let montoCMAC = 0;
                    let montoYAPE = 0;

                    function fn_limpiarNombreBanco(nombre) {
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
                            return nombre;
                        }
                    }

                    response.forEach(function (obj) {
                        let nombre = obj.campoExtra ? obj.campoExtra.toUpperCase() : "";
                        if(obj.clasificacionPago == "1"){
                            totalIngresosBancos += parseFloat(obj.cantidadAbonoPag);
                            totalBancos += parseFloat(obj.cantidadAbonoPag);
                            let columna = fn_limpiarNombreBanco(obj.bancaPago);
                            if (columna == "BCP") {
                                montoBCP += parseFloat(obj.cantidadAbonoPag);
                            }else if(columna == "BBVA"){
                                montoBBVA += parseFloat(obj.cantidadAbonoPag);
                            }else if(columna == "IBK"){
                                montoIBK += parseFloat(obj.cantidadAbonoPag);
                            }else if(columna == "CAJA PIURA"){
                                montoCAJAPIURA += parseFloat(obj.cantidadAbonoPag);
                            }else if(columna == "CMAC"){
                                montoCMAC += parseFloat(obj.cantidadAbonoPag);    
                            }else if(columna == "YAPE"){
                                montoYAPE += parseFloat(obj.cantidadAbonoPag);
                            }
                        }else if(obj.clasificacionPago == "2"){
                            if(!(nombre.includes("KARLA") && nombre.includes("BRECSY"))){
                                totalIngresosCamal += parseFloat(obj.cantidadAbonoPag);
                                totalBancos += parseFloat(obj.cantidadAbonoPag);
                            }
                        }else if(obj.clasificacionPago == "3"){
                            if(!(nombre.includes("SALDO") && nombre.includes("AYER"))){
                                totalIngresosPaul += parseFloat(obj.cantidadAbonoPag);
                                totalBancos += parseFloat(obj.cantidadAbonoPag);
                            }
                        }else if(obj.clasificacionPago == "5"){
                            totalIngresosAGranjas += parseFloat(obj.cantidadAbonoPag);
                            totalBancos += parseFloat(obj.cantidadAbonoPag);
                        }
                    });

                    function fn_parsearImporte(total){
                        let formateoTotal = parseFloat(total).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        });

                        return formateoTotal;
                    }

                    let nuevaFila = `
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer tdMostrarDetalleBancos">
                            <td class="border-r dark:border-gray-700 px-4 py-2 w-48 text-left whitespace-nowrap" colspan="2">${"Sumatoria de Bancos"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalIngresosBancos)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer toggleBancos hidden">
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i></td>
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap">${"BCP"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(montoBCP)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer toggleBancos hidden">
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i></td>
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap">${"BBVA"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(montoBBVA)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer toggleBancos hidden">
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i></td>
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap">${"IBK"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(montoIBK)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer toggleBancos hidden">
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i></td>
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap">${"CAJA PIURA"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(montoCAJAPIURA)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer toggleBancos hidden">
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i></td>
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap">${"CMAC"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(montoCMAC)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer toggleBancos hidden">
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap"><i class='bx bx-subdirectory-right text-2xl'></i></td>
                            <td class="border-r dark:border-gray-700 p-2 w-48 text-center whitespace-nowrap">${"YAPE"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(montoYAPE)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                            <td class="border-r dark:border-gray-700 px-4 py-2 w-48 text-left whitespace-nowrap" colspan="2">${"Depositos a Granja"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalIngresosAGranjas)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                            <td class="border-r dark:border-gray-700 px-4 py-2 w-48 text-left whitespace-nowrap" colspan="2">${"Caja Chica Camal"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalIngresosCamal)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                            <td class="border-r dark:border-gray-700 px-4 py-2 w-48 text-left whitespace-nowrap" colspan="2">${"Cobranza - Ingresos Paul"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalIngresosPaul)}</td>
                        </tr>
                        <tr class="bg-green-600 border-b dark:border-gray-700 text-white cursor-pointer">
                            <td class="border-r dark:border-gray-700 px-4 py-2 w-48 text-left whitespace-nowrap" colspan="2">${"Total"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalBancos)}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden" id="totalBancos">${totalBancos}</td>
                        </tr>
                    `;
                    
                    tbodyReporteDeResumenDinerario.append(nuevaFila);
                    fn_calcularResultado();

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }

    $(document).on("dblclick", ".tdMostrarDetalleBancos", function() {
        $(".toggleBancos").each(function() {
            if ($(this).is(":visible")) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }); 

    function bodyReporteDeResumenDinerarioEgresos(fecha, fecha2){
        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerPagosResumenDinerarioEgresosPaul',
            method: 'GET',
            data:{
                fecha : fecha,
                fecha2 : fecha2
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    let totalEgresosCamal = 0;
                    let totalEgresosPaul = 0;

                    let totalEgresos = 0;

                    response.forEach(function (obj) {
                        if(obj.clasificadoEgreso == "2"){
                            let nombre = obj.nombreEgresoCamal ? obj.nombreEgresoCamal.toUpperCase() : "";
                            if(!nombre.includes("AGENTE BCP") && !nombre.includes("YUGO") && !nombre.includes("TECAVI")){
                                totalEgresosPaul += parseFloat(obj.cantidadAbonoEgreso);
                                totalEgresos += parseFloat(obj.cantidadAbonoEgreso);
                            }
                        }
                    });

                    function fn_parsearImporte(total){
                        let formateoTotal = parseFloat(total).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        });

                        return formateoTotal;
                    }

                    $.ajax({
                        url: '/fn_consulta_TraerPagosResumenDinerarioEgresosCamal',
                        method: 'GET',
                        data:{
                            fecha : fecha,
                            fecha2 : fecha2
                        },
                        success: function (response) {
            
                            // Verificar si la respuesta es un arreglo de objetos
                            if (Array.isArray(response)) {
                                let tbodyReporteDeResumenDinerario = $(`#bodyReporteDeResumenDinerarioEgresos`);
                                tbodyReporteDeResumenDinerario.empty();

                                response.forEach(function (obj) {
                                    let nombre = obj.uso_detalle_egreso ? obj.uso_detalle_egreso.toUpperCase() : "";
                                    if(!nombre.includes("BURGOS") && !(nombre.includes("KARLA") && nombre.includes("BRECSY")) && !(nombre.includes("SOBRANTE") && nombre.includes("CAJA CHICA") && nombre.includes("KARLA")) && !(nombre.includes("ANA") && nombre.includes("DOMINGO") && nombre.includes("KARLA")) && !(nombre.includes("TRIPA") && nombre.includes("KARLA"))){
                                        totalEgresosCamal += parseFloat(obj.monto_detalle);
                                        totalEgresos += parseFloat(obj.monto_detalle);
                                    }
                                });

                                let nuevaFila = `
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer tdMostrarDetalleBancos">
                                        <td class="border-r dark:border-gray-700 px-4 py-2 text-left whitespace-nowrap">${"Egresos Camal"}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalEgresosCamal)}</td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer tdMostrarDetalleBancos">
                                        <td class="border-r dark:border-gray-700 px-4 py-2 text-left whitespace-nowrap">${"Egresos Paul"}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalEgresosPaul)}</td>
                                    </tr>
                                    <tr class="bg-red-600 border-b dark:border-gray-700 text-white cursor-pointer">
                                        <td class="border-r dark:border-gray-700 px-4 py-2 text-left whitespace-nowrap">${"Total"}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalEgresos)}</td>
                                        <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden" id="totalEgresos">${totalEgresos}</td>
                                    </tr>
                                `;
                                
                                tbodyReporteDeResumenDinerario.append(nuevaFila);
                                fn_calcularResultado();
                            }else {
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
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    };

    function bodyReporteDeResumenDinerarioProveedores(fecha, fecha2){
        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerPagosResumenDinerarioEgresosProveedores',
            method: 'GET',
            data:{
                fecha : fecha,
                fecha2 : fecha2
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    let tbodyReporteDeResumenDinerario = $(`#bodyReporteDeResumenDinerarioProveedores`);
                    tbodyReporteDeResumenDinerario.empty();

                    let totalTecnica = 0;
                    let totalYugo = 0;

                    let totalGuias = 0;

                    response.forEach(function (obj) {
                        let precioGuia = parseFloat(obj.precioGuia) ? parseFloat(obj.precioGuia) : 0;
                        let totalCalculo = (parseFloat(obj.pesoBrutoGuia) - parseFloat(obj.pesoTaraGuia)) * precioGuia;
                        let nombreProveedor = obj.nombreEspecie ? obj.nombreEspecie.toUpperCase() : "";
                        if (nombreProveedor.includes("YUGO")) {
                            totalYugo += parseFloat(totalCalculo);
                            totalGuias += parseFloat(totalCalculo);
                        }
                        if (nombreProveedor.includes("TECNICA")) {
                            totalTecnica += parseFloat(totalCalculo);
                            totalGuias += parseFloat(totalCalculo);
                        }
                    });

                    function fn_parsearImporte(total){
                        let formateoTotal = parseFloat(total).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        });

                        return formateoTotal;
                    }

                    let nuevaFila = `
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer tdMostrarDetalleBancos">
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-left whitespace-nowrap">${"Guia Yugo"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalYugo)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer tdMostrarDetalleBancos">
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-left whitespace-nowrap">${"Guia Tecnica"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalTecnica)}</td>
                        </tr>
                        <tr class="bg-blue-600 border-b dark:border-gray-700 text-white cursor-pointer">
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-left whitespace-nowrap">${"Total"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${fn_parsearImporte(totalGuias)}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden" id="totalGuias">${totalGuias}</td>
                        </tr>
                    `;
                    
                    tbodyReporteDeResumenDinerario.append(nuevaFila);
                    fn_calcularResultado();
                }else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    };

    function fn_calcularResultado(){
        let totalBancos = $("#totalBancos").text() ? $("#totalBancos").text() : "0";
        let totalEgresos = $("#totalEgresos").text() ? $("#totalEgresos").text() : "0";
        let totalGuias = $("#totalGuias").text() ? $("#totalGuias").text() : "0";

        let calcularResultado = parseFloat(totalBancos) - (parseFloat(totalEgresos) + parseFloat(totalGuias));

        function fn_parsearImporte(total){
            let formateoTotal = parseFloat(total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
            });

            return formateoTotal;
        }

        // console.log(totalBancos, totalEgresos, totalGuias);
        $("#resultadoResumenDinerario").html(`<p class="mt-5 px-4 py-2 rounded-lg bg-yellow-300 font-bold text-lg">Resultado Final : ${fn_parsearImporte(calcularResultado)}</p>`);
    }

    function bodyReporteDeResumenDinerarioControlTripa(fecha, fecha2){
        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerPagosResumenDinerarioEgresosCamal',
            method: 'GET',
            data:{
                fecha : fecha,
                fecha2 : fecha2
            },
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    let tbodyReporteDeResumenDinerario = $(`#bodyReporteDeResumenDinerarioControlTripa`);
                    tbodyReporteDeResumenDinerario.empty();

                    function fn_parsearImporte(total){
                        let formateoTotal = parseFloat(total).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                        });

                        return formateoTotal;
                    }

                    let totalTripaKarla = 0;

                    response.forEach(function (obj) {
                        let nombre = obj.uso_detalle_egreso ? obj.uso_detalle_egreso.toUpperCase() : "";
                        if((nombre.includes("TRIPA") && nombre.includes("KARLA")) || (nombre.includes("BRECSY") && nombre.includes("KARLA"))){
                            totalTripaKarla += parseFloat(obj.monto_detalle);
                            let nuevaFila = `
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer tdMostrarDetalleBancos">
                                    <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${obj.fecha_detalle}</td>
                                    <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${obj.uso_detalle_egreso}</td>
                                    <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${fn_parsearImporte(obj.monto_detalle)}</td>
                                </tr>
                            `;
                            
                            tbodyReporteDeResumenDinerario.append(nuevaFila);
                        }
                    });

                    let nuevaFila = `
                        <tr class="bg-orange-500 text-white cursor-pointer tdMostrarDetalleBancos">
                            <td class="dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">Total</td>
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap"></td>
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${fn_parsearImporte(totalTripaKarla)}</td>
                        </tr>
                    `;
                    
                    tbodyReporteDeResumenDinerario.append(nuevaFila);

                }else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    };

});
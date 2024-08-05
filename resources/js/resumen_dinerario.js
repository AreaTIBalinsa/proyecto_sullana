import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    const fechaHoyTabla = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

    $("#fechaFiltrarResumenDinerario").val(fechaHoy);
    bodyReporteDeResumenDinerario(fechaHoy);

    function bodyReporteDeResumenDinerario(fecha){
        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerPagosResumenDinerario',
            method: 'GET',
            data:{
                fecha : fecha
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

                    response.forEach(function (obj) {
                        if(obj.clasificacionPago == "1"){
                            totalIngresosBancos += parseFloat(obj.cantidadAbonoPag);
                        }else if(obj.clasificacionPago == "2"){
                            totalIngresosCamal += parseFloat(obj.cantidadAbonoPag);
                        }else if(obj.clasificacionPago == "3"){
                            totalIngresosPaul += parseFloat(obj.cantidadAbonoPag);
                        }else if(obj.clasificacionPago == "5"){
                            totalIngresosAGranjas += parseFloat(obj.cantidadAbonoPag);
                        }
                    });

                    let nuevaFila = `
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${"Sumatoria de Bancos"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalIngresosBancos.toFixed(2)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${"Depositos a Granja"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalIngresosAGranjas.toFixed(2)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${"Caja Chica Camal"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalIngresosCamal.toFixed(2)}</td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${"Cobranza - Ingresos Paul"}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${totalIngresosPaul.toFixed(2)}</td>
                        </tr>
                    `;
                    
                    tbodyReporteDeResumenDinerario.append(nuevaFila);

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
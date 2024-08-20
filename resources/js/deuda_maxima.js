import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    // Establecer la semana actual por defecto
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;

    // Calcular la semana actual
    const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    const currentYear = today.getFullYear();

    // Formatear el número de la semana y establecer el valor en el input
    const weekString = `${currentYear}-W${String(currentWeekNumber).padStart(2, '0')}`;
    $('#weekPicker').val(weekString);

    var timerInterval;

    fn_buscarDiasSemana();

    function fn_buscarDiasSemana(){
        let tbodyDeudaMaxima = $('#bodyDeudaMaxima');
        tbodyDeudaMaxima.empty();

        Swal.fire({
            title: '¡Atención!',
            html: 'Consultando datos, espere por favor.',
            timer: 999999999, // Establece un valor grande para que parezca indefinido
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        })

        const weekInput = $('#weekPicker').val();
        if (!weekInput) {
            alertify.notify('Por favor, seleccione una semana.', 'error', 3);
            return;
        }
        const [year, week] = weekInput.split('-W');
    
        const firstDayOfWeek = new Date(year, 0, (week - 1) * 7 + 1);

        const dayOfWeek = firstDayOfWeek.getDay();
        const dayOffset = (dayOfWeek <= 1 ? 1 : 8) - dayOfWeek;
        const monday = new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() + dayOffset));

        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(monday);
            day.setDate(monday.getDate() + i);
            
            // Formatear el día a YYYY-MM-DD
            const formattedDay = day.toISOString().split('T')[0];
            days.push(formattedDay);
        }

        const lunes = days[0];
        const martes = days[1];
        const miercoles = days[2];
        const jueves = days[3];
        const viernes = days[4];
        const sabado = days[5];
        const domingo = days[6];

        fn_CrearDeudaMaxima(lunes , martes , miercoles , jueves , viernes, sabado, domingo);
    }

    $('#btnBuscarSaldoSemanal').on('click', function() {
        fn_buscarDiasSemana();
    });
    

    $('.cerrarModalDeudaMaxima, #ModalDeudaMaxima .opacity-75').on('click', function (e) {
        $('#ModalDeudaMaxima').addClass('hidden');
        $('#ModalDeudaMaxima').removeClass('flex');
    });

    $(document).on("dblclick", "#tablaDeudaMaxima tbody tr", function() {
        let fila = $(this).closest('tr');
        let idCodigoCliente = fila.find('td:eq(0)').text();
        let nombreCompleto = fila.find('td:eq(1)').text();
        let montoDeuda = fila.find('td:eq(3)').text();

        $('#idCodigoClienteDeudaMaxima').attr('value', idCodigoCliente);
        $('#nombreClienteDeudaMaxima').text(nombreCompleto);
        $('#valorNuevoDeudaMaxima').val(montoDeuda);
        $('#ModalDeudaMaxima').removeClass('hidden');
        $('#ModalDeudaMaxima').addClass('flex');
        $('#valorNuevoDeudaMaxima').focus();
    });

    $('#btnDeudaMaxima').on('click', function () {
        let valorDeudaMaxima = $('#valorNuevoDeudaMaxima').val();
        let idCodigoClienteDeudaMaxima = $('#idCodigoClienteDeudaMaxima').attr('value');
        if (valorDeudaMaxima != "" && valorDeudaMaxima > 0){
            fn_ActualizarDeudaMaxima(valorDeudaMaxima,idCodigoClienteDeudaMaxima);
        }else{
            alertify.notify('Valor no valido, intente de nuevo.', 'error', 2);
        }
    });

    function fn_ActualizarDeudaMaxima(valorDeudaMaxima,idCodigoClienteDeudaMaxima){
        $.ajax({
            url: '/fn_consulta_ActualizarDeudaMaxima',
            method: 'GET',
            data: {
                valorDeudaMaxima: valorDeudaMaxima,
                idCodigoClienteDeudaMaxima:idCodigoClienteDeudaMaxima,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizó la deuda maxima correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('#ModalDeudaMaxima').addClass('hidden');
                    $('#ModalDeudaMaxima').removeClass('flex');
                    fn_DeudaMaximaClientes();
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

    $('#filtrarClienteDeudaMaxima').on('input', function() {
        let nombreFiltrar = $('#filtrarClienteDeudaMaxima').val().toUpperCase(); ; // Obtiene el valor del campo de filtro

        // Mostrar todas las filas
        $('#tablaDeudaMaxima tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaDeudaMaxima tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    });

    function fn_formatearImportes(numero){
        let totalFormateado = parseFloat(numero).toLocaleString('es-ES', {
            minimumFractionDigits: 2,   
            maximumFractionDigits: 2,
            useGrouping: true,
        });

        return totalFormateado;
    }

    async function fn_CrearDeudaMaxima(lunes, martes, miercoles, jueves, viernes, sabado, domingo) {
        try {
            // Crear un array de promesas
            let promesas = [
                fn_TraerReporteSemanalSaldos(lunes),
                fn_TraerReporteSemanalSaldos(martes),
                fn_TraerReporteSemanalSaldos(miercoles),
                fn_TraerReporteSemanalSaldos(jueves),
                fn_TraerReporteSemanalSaldos(viernes),
                fn_TraerReporteSemanalSaldos(sabado),
                fn_TraerReporteSemanalSaldos(domingo)
            ];
    
            // Esperar a que todas las promesas se completen
            let [arregloSaldosLunes, arregloSaldosMartes, arregloSaldosMiercoles, arregloSaldosJueves, arregloSaldosViernes, arregloSaldosSabado, arregloSaldosDomingo] = await Promise.all(promesas);

            function combinarSaldosPorDia(...saldosPorDias) {
                // Crear un objeto para acumular los datos consolidados por codigoCli
                let datosConsolidados = {};
            
                // Iterar sobre cada arreglo de saldos diario
                saldosPorDias.forEach((saldosPorDia, index) => {
                    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
                    const dia = dias[index];
            
                    // Iterar sobre cada cliente en el arreglo diario
                    for (let codigoCli in saldosPorDia) {
                        if (!datosConsolidados[codigoCli]) {
                            datosConsolidados[codigoCli] = {
                                nombreCompleto: saldosPorDia[codigoCli].nombreCompleto,
                                codigoCli: parseInt(codigoCli),
                                deudaTotal: 0,
                                cantidadPagos: 0,
                                ventaDescuentos: 0,
                                limitEndeudamiento: 0,
                                saldosPorDia: {}
                            };
                        }
            
                        // Acumular los datos diarios
                        datosConsolidados[codigoCli].deudaTotal += saldosPorDia[codigoCli].deudaTotal;
                        datosConsolidados[codigoCli].cantidadPagos += saldosPorDia[codigoCli].cantidadPagos;
                        datosConsolidados[codigoCli].ventaDescuentos += saldosPorDia[codigoCli].ventaDescuentos;
                        datosConsolidados[codigoCli].limitEndeudamiento = saldosPorDia[codigoCli].limitEndeudamiento;
            
                        // Guardar los saldos diarios
                        datosConsolidados[codigoCli].saldosPorDia[dia] = {
                            deudaTotal: saldosPorDia[codigoCli].deudaTotal,
                            cantidadPagos: saldosPorDia[codigoCli].cantidadPagos,
                            ventaDescuentos: saldosPorDia[codigoCli].ventaDescuentos,
                            limitEndeudamiento: saldosPorDia[codigoCli].limitEndeudamiento
                        };
                    }
                });
            
                // Convertir el objeto a un arreglo
                return Object.values(datosConsolidados);
            }

            let resultadosConsolidados = combinarSaldosPorDia(arregloSaldosLunes, arregloSaldosMartes, arregloSaldosMiercoles, arregloSaldosJueves, arregloSaldosViernes, arregloSaldosSabado, arregloSaldosDomingo);
            let tbodyDeudaMaxima = $('#bodyDeudaMaxima');
            let totalLunesGeneral = 0;
            let totalMartesGeneral = 0;
            let totalMiercolesGeneral = 0;
            let totalJuevesGeneral = 0;
            let totalViernesGeneral = 0;
            let totalSabadoGeneral = 0;
            let totalDomingoGeneral = 0;

            resultadosConsolidados.forEach(function(obj){
                if ((obj.nombreCompleto).trim() != "PAUL"){

                    let totalLunes = 0;
                    let totalMartes = 0;
                    let totalMiercoles = 0;
                    let totalJueves = 0;
                    let totalViernes = 0;
                    let totalSabado = 0;
                    let totalDomingo = 0;

                    // Obtener la fecha actual
                    let fechaActual = new Date();
                    let fechaLunes = new Date(lunes);
                    let fechaMartes = new Date(martes);
                    let fechaMiercoles = new Date(miercoles);
                    let fechaJueves = new Date(jueves);
                    let fechaViernes = new Date(viernes);
                    let fechaSabado = new Date(sabado);
                    let fechaDomingo = new Date(domingo);                
                    
                    totalLunes = fechaLunes > fechaActual ? 0 : obj.saldosPorDia.lunes.deudaTotal - obj.saldosPorDia.lunes.cantidadPagos + obj.saldosPorDia.lunes.ventaDescuentos;
                    totalMartes = fechaMartes > fechaActual ? 0 : obj.saldosPorDia.martes.deudaTotal - obj.saldosPorDia.martes.cantidadPagos + obj.saldosPorDia.martes.ventaDescuentos;
                    totalMiercoles = fechaMiercoles > fechaActual ? 0 : obj.saldosPorDia.miercoles.deudaTotal - obj.saldosPorDia.miercoles.cantidadPagos + obj.saldosPorDia.miercoles.ventaDescuentos;
                    totalJueves = fechaJueves > fechaActual ? 0 : obj.saldosPorDia.jueves.deudaTotal - obj.saldosPorDia.jueves.cantidadPagos + obj.saldosPorDia.jueves.ventaDescuentos;
                    totalViernes = fechaViernes > fechaActual ? 0 : obj.saldosPorDia.viernes.deudaTotal - obj.saldosPorDia.viernes.cantidadPagos + obj.saldosPorDia.viernes.ventaDescuentos;
                    totalSabado = fechaSabado > fechaActual ? 0 : obj.saldosPorDia.sabado.deudaTotal - obj.saldosPorDia.sabado.cantidadPagos + obj.saldosPorDia.sabado.ventaDescuentos;
                    totalDomingo = fechaDomingo > fechaActual ? 0 : obj.saldosPorDia.domingo.deudaTotal - obj.saldosPorDia.domingo.cantidadPagos + obj.saldosPorDia.domingo.ventaDescuentos;
                    
                    let totalLunesStr = fechaLunes > fechaActual ? "" : fn_formatearImportes(obj.saldosPorDia.lunes.deudaTotal - obj.saldosPorDia.lunes.cantidadPagos + obj.saldosPorDia.lunes.ventaDescuentos);
                    let totalMartesStr = fechaMartes > fechaActual ? "" : fn_formatearImportes(obj.saldosPorDia.martes.deudaTotal - obj.saldosPorDia.martes.cantidadPagos + obj.saldosPorDia.martes.ventaDescuentos);
                    let totalMiercolesStr = fechaMiercoles > fechaActual ? "" : fn_formatearImportes(obj.saldosPorDia.miercoles.deudaTotal - obj.saldosPorDia.miercoles.cantidadPagos + obj.saldosPorDia.miercoles.ventaDescuentos);
                    let totalJuevesStr = fechaJueves > fechaActual ? "" : fn_formatearImportes(obj.saldosPorDia.jueves.deudaTotal - obj.saldosPorDia.jueves.cantidadPagos + obj.saldosPorDia.jueves.ventaDescuentos);
                    let totalViernesStr = fechaViernes > fechaActual ? "" : fn_formatearImportes(obj.saldosPorDia.viernes.deudaTotal - obj.saldosPorDia.viernes.cantidadPagos + obj.saldosPorDia.viernes.ventaDescuentos);
                    let totalSabadoStr = fechaSabado > fechaActual ? "" : fn_formatearImportes(obj.saldosPorDia.sabado.deudaTotal - obj.saldosPorDia.sabado.cantidadPagos + obj.saldosPorDia.sabado.ventaDescuentos);
                    let totalDomingoStr = fechaDomingo > fechaActual ? "" : fn_formatearImportes(obj.saldosPorDia.domingo.deudaTotal - obj.saldosPorDia.domingo.cantidadPagos + obj.saldosPorDia.domingo.ventaDescuentos);

                    totalLunesGeneral+= totalLunes
                    totalMartesGeneral+= totalMartes
                    totalMiercolesGeneral+= totalMiercoles
                    totalJuevesGeneral+= totalJueves
                    totalViernesGeneral+= totalViernes
                    totalSabadoGeneral+= totalSabado
                    totalDomingoGeneral+= totalDomingo

                    let limitEndeudamiento = parseFloat(obj.limitEndeudamiento);

                    let totalFormateado = limitEndeudamiento.toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true,
                    }); 

                    let nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                    // Agregar las celdas con la información
                    nuevaFila.append($('<td class="hidden">').text(obj.codigoCli));
                    nuevaFila.append($('<td class="border dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                    nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap bg-red-600 text-white">').text(totalFormateado));
                    nuevaFila.append($('<td class="hidden">').text(obj.limitEndeudamiento));
                    nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalLunesStr));
                    nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalMartesStr));
                    nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalMiercolesStr));
                    nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalJuevesStr));
                    nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalViernesStr));
                    nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalSabadoStr));
                    nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(totalDomingoStr));
                    // Agregar la nueva fila al tbody
                    tbodyDeudaMaxima.append(nuevaFila);
                }
            });

            let nuevaFila = $('<tr class="bg-blue-600 text-white border-b dark:border-gray-700 cursor-pointer sticky bottom-0">');
            // Agregar las celdas con la información
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap" colspan="2">').text("TOTAL"));
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(totalLunesGeneral)));
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(totalMartesGeneral)));
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(totalMiercolesGeneral)));
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(totalJuevesGeneral)));
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(totalViernesGeneral)));
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(totalSabadoGeneral)));
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(totalDomingoGeneral)));
            // Agregar la nueva fila al tbody
            tbodyDeudaMaxima.append(nuevaFila);

            clearInterval(timerInterval);
            Swal.close();

        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }    

    function fn_crearArregloSaldo (response){
        let resultadosAgrupados = {};

        response.forEach(function (obj) {
            let codigoCli = obj.codigoCli;

            // console.log(obj);

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

        return resultadosAgrupados
    }

    function fn_TraerReporteSemanalSaldos(dia) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/fn_consulta_TraerReporteSemanalSaldos',
                method: 'GET',
                data: {
                    fecha: dia,
                },
                success: function (response) {
                    let resultadosAgrupados = fn_crearArregloSaldo(response);
                    resolve(resultadosAgrupados);
                },
                error: function (error) {
                    console.error("ERROR", error);
                    reject(error); // Rechaza la Promesa en caso de error
                }
            });
        });
    }

});
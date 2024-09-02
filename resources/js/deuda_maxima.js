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
            allowOutsideClick: false,
            allowEscapeKey: false,
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
                    setTimeout(function() {
                        $('#btnBuscarSaldoSemanal').trigger('click');
                    }, 1500);
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

            const dias = [
                { arreglo: arregloSaldosLunes, nombreDia: "lunes" },
                { arreglo: arregloSaldosMartes, nombreDia: "martes" },
                { arreglo: arregloSaldosMiercoles, nombreDia: "miercoles" },
                { arreglo: arregloSaldosJueves, nombreDia: "jueves" },
                { arreglo: arregloSaldosViernes, nombreDia: "viernes" },
                { arreglo: arregloSaldosSabado, nombreDia: "sabado" },
                { arreglo: arregloSaldosDomingo, nombreDia: "domingo" },
            ];

            // Objeto auxiliar para fusionar los datos
            const clientesAgrupados = {};

            // Iterar sobre cada día y su arreglo correspondiente
            dias.forEach((dia) => {
                dia.arreglo.forEach((cliente) => {
                    const codigoCli = cliente.codigoCli;

                    // Si el cliente no está en el objeto auxiliar, se añade
                    if (!clientesAgrupados[codigoCli]) {
                        clientesAgrupados[codigoCli] = {
                            codigoCli: cliente.codigoCli,
                            nombreCompleto: cliente.nombreCompleto,
                            limitEndeudamiento: cliente.limitEndeudamiento,
                        };
                    }

                    // Añadir los datos del día correspondiente al cliente
                    clientesAgrupados[codigoCli][dia.nombreDia] = {
                        datosTabla_tb_pesadasGeneral:
                            cliente.datosTabla_tb_pesadasGeneral,
                            ventaAnterior: cliente.ventaAnterior,
                            ventaAnterior2: cliente.ventaAnterior2,
                            ventaAnterior3: cliente.ventaAnterior3,
                            totalDescuentos: cliente.totalDescuentos,
                            totalPagos: cliente.totalPagos,
                            pagoAnterior: cliente.pagoAnterior,
                            totalVentaDescuentoAnterior:
                            cliente.totalVentaDescuentoAnterior,
                    };
                });
            });

            // Convertir el objeto en un arreglo
            const clientesConTotalesPorDia = Object.values(clientesAgrupados);

            let tbodyDeudaMaxima = $('#bodyDeudaMaxima');
            tbodyDeudaMaxima.empty();

            let totalLunesGeneral = 0;
            let totalMartesGeneral = 0;
            let totalMiercolesGeneral = 0;
            let totalJuevesGeneral = 0;
            let totalViernesGeneral = 0;
            let totalSabadoGeneral = 0;
            let totalDomingoGeneral = 0;
            let totalEndeudamiento = 0;
            
            clientesConTotalesPorDia.sort((a, b) => {
                if (a.nombreCompleto < b.nombreCompleto) {
                    return -1;
                }
                if (a.nombreCompleto > b.nombreCompleto) {
                    return 1;
                }
                return 0;
            });
            
            clientesConTotalesPorDia.forEach(function(obj){

                function fn_devuelveValorDia(obj, valor){
                    let totalADevolver = 0;
                    if (obj[valor]){
                        let deudaHoy = obj[valor]["datosTabla_tb_pesadasGeneral"][0];
                        let descuentosHoy = 0;
                        if (obj[valor]["totalDescuentos"][0] && obj[valor]["totalDescuentos"][0]["totalVentaDescuento"]){
                            descuentosHoy = obj[valor]["totalDescuentos"][0];
                            descuentosHoy = parseFloat(descuentosHoy["totalVentaDescuento"]);
                        }

                        let pagosHoy = 0;
                        if (obj[valor]["totalPagos"][0] && obj[valor]["totalPagos"][0]["pagos"]){
                            pagosHoy = obj[valor]["totalPagos"][0];
                            pagosHoy = parseFloat(pagosHoy["pagos"]);
                        }

                        deudaHoy = parseFloat(deudaHoy["totalVenta"]) + descuentosHoy;
                        let deudaAnterior = (parseFloat(obj[valor]["ventaAnterior"]) + parseFloat(obj[valor]["ventaAnterior2"]) + parseFloat(obj[valor]["ventaAnterior3"])) + parseFloat(obj[valor]["totalVentaDescuentoAnterior"]);
                        let pagosAnteriores = parseFloat(obj[valor]["pagoAnterior"]);
                        let deudaGeneral = deudaAnterior + deudaHoy;
                        let pagosGeneral = pagosAnteriores + pagosHoy;

                        totalADevolver = deudaGeneral - pagosGeneral;
                    }else{
                        totalADevolver = 0;
                    }

                    return totalADevolver;
                }

                totalLunesGeneral += fn_devuelveValorDia(obj,"lunes");
                totalMartesGeneral += fn_devuelveValorDia(obj,"martes");
                totalMiercolesGeneral += fn_devuelveValorDia(obj,"miercoles");
                totalJuevesGeneral += fn_devuelveValorDia(obj,"jueves");
                totalViernesGeneral += fn_devuelveValorDia(obj,"viernes");
                totalSabadoGeneral += fn_devuelveValorDia(obj,"sabado");
                totalDomingoGeneral += fn_devuelveValorDia(obj,"domingo");

                totalEndeudamiento += parseFloat(obj.limitEndeudamiento);

                let nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                // Agregar las celdas con la información
                nuevaFila.append($('<td class="hidden">').text(obj.codigoCli));
                nuevaFila.append($('<td class="border dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap bg-red-600 text-white">').text(fn_formatearImportes(obj.limitEndeudamiento)));
                nuevaFila.append($('<td class="hidden">').text(obj.limitEndeudamiento));
                nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(fn_devuelveValorDia(obj,"lunes"))));
                nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(fn_devuelveValorDia(obj,"martes"))));
                nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(fn_devuelveValorDia(obj,"miercoles"))));
                nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(fn_devuelveValorDia(obj,"jueves"))));
                nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(fn_devuelveValorDia(obj,"viernes"))));
                nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(fn_devuelveValorDia(obj,"sabado"))));
                nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(fn_devuelveValorDia(obj,"domingo"))));
                // Agregar la nueva fila al tbody
                tbodyDeudaMaxima.append(nuevaFila);

            })

            let nuevaFila = $('<tr class="bg-blue-600 text-white border-b dark:border-gray-700 cursor-pointer sticky bottom-0">');
            // Agregar las celdas con la información
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text("TOTAL"));
            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(fn_formatearImportes(totalEndeudamiento)));
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

    function fn_TraerReporteSemanalSaldos(dia) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/fn_consulta_TraerReporteAcumuladoDetalle',
                method: 'GET',
                data: {
                    fecha: dia,
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
    
                    const clientesConTotales = calcularTotales(clientesConAgrupacion);

                    clientesConTotales.forEach(cliente => {
                        // Inicializar los totales acumulados
                        let totalPeso = 0;
                        let totalVenta = 0;
                        let totalCantidad = 0;
                        let precioPromedio = 0;
                        let promedioEspecie = 0;
                        let especiesContadas = 0;
                      
                        // Iterar sobre cada especie en datosTabla_tb_pesadasGeneral
                        for (let especieKey in cliente.datosTabla_tb_pesadasGeneral) {
                          let especie = cliente.datosTabla_tb_pesadasGeneral[especieKey][0];
                          
                          // Sumar los valores de las especies
                          totalPeso += parseFloat(especie.totalPeso);
                          totalVenta += parseFloat(especie.totalVenta);
                          totalCantidad += especie.totalCantidad;
                          precioPromedio += parseFloat(especie.precioPromedio); 
                          promedioEspecie += parseFloat(especie.promedioEspecie); 
                          especiesContadas++;
                        }
                      
                        // Calcular los promedios correctos
                        precioPromedio = precioPromedio / especiesContadas;
                        promedioEspecie = promedioEspecie / especiesContadas;
                      
                        // Reemplazar datosTabla_tb_pesadasGeneral con los totales
                        cliente.datosTabla_tb_pesadasGeneral = [{
                          totalPeso: totalPeso.toFixed(2),
                          totalVenta: totalVenta.toFixed(2),
                          totalCantidad: totalCantidad,
                          precioPromedio: precioPromedio.toFixed(2),
                          promedioEspecie: promedioEspecie.toFixed(2)
                        }];
                      });
    
                    resolve(clientesConTotales);
    
                },
                error: function (error) {
                    console.error("ERROR", error);
                    reject(error);
                },
            });
        });
    }

});
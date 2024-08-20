import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    DataTableED('#tablaAgregarSaldo');
    $('#fechaSaldoDelCliente').val(fechaHoy);
    $('#fechaRegularSaldo').val(fechaHoy);
    fn_TraerClientesAgregarSaldo(fechaHoy);

    $('#btnBuscarSaldoDelCliente').on('click', function () {
        let fecha = $('#fechaSaldoDelCliente').val();
        fn_TraerClientesAgregarSaldo(fecha);
    });

    $('.cerrarModalCambiarPrecioPesada, #ModalCambiarPrecioPesada .opacity-75').on('click', function (e) {
        $('#ModalCambiarPrecioPesada').addClass('hidden');
        $('#ModalCambiarPrecioPesada').removeClass('flex');
    });

    function fn_TraerClientesAgregarSaldo(fecha) {
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarSaldo',
            method: 'GET',
            data: {
                fecha: fecha,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
    
                    // Objeto para almacenar los resultados agrupados por codigoCli
                    let resultadosAgrupados = {};
    
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
    
                    // Obtener el select
                    let tbodyAgregarSaldo = $('#bodyAgregarSaldo');
                    tbodyAgregarSaldo.empty();
                    let nuevaFila = "";
    
                    // Iterar sobre los resultados agrupados y mostrar en la tabla
                    Object.values(resultadosAgrupados).forEach(function (obj) {
                        let total = obj.deudaTotal - obj.cantidadPagos + obj.ventaDescuentos;

                        if (Math.abs(total) < 1e-10) {
                            total = 0.00;
                        }

                        // console.log(`Nombre Cliente : ${obj.nombreCompleto} \nTotal : ${total} \nDeudaTotal : ${obj.deudaTotal} \nAbonos : ${obj.cantidadPagos} \nDescuentos : ${obj.ventaDescuentos}`)
    
                        // Crear una nueva fila
                        if (total >= parseFloat(obj.limitEndeudamiento)) {
                            nuevaFila = $('<tr class="bg-red-600 border-b dark:border-gray-700 cursor-pointer text-white font-bold">');
                            // Agregar las celdas con la información
                            nuevaFila.append($('<td class="hidden">').text(obj.codigoCli));
                            nuevaFila.append($(`
                                <td class="border dark:border-gray-700 p-2 font-medium whitespace-nowrap">
                                    <div class="flex gap-4 justify-between">
                                        <div>
                                            ${obj.nombreCompleto}
                                        </div>
                                        <div class="pulsoAdvertencia">
                                            <img src="${rutaAdvertencia}" title="El cliente sobrepaso la deuda \n maxima : ${parseFloat(obj.limitEndeudamiento)}" alt="Advertencia" class="h-6 drop-shadow-[0_0_5px_rgba(255,255,255,0.80)]" />
                                        </div>
                                    </div>
                                </td>
                                <td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">${total.toFixed(2)}</td>
                            `));
                        }
                        else if(total < 0){
                            nuevaFila = $('<tr class="bg-green-600 border-b dark:border-gray-700 text-white hover:bg-green-700 cursor-pointer">');
                            // Agregar las celdas con la información
                            nuevaFila.append($('<td class="hidden">').text(obj.codigoCli));
                            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(parseFloat(total).toFixed(2)));
                        }else{
                            nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                            // Agregar las celdas con la información
                            nuevaFila.append($('<td class="hidden">').text(obj.codigoCli));
                            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 font-medium whitespace-nowrap">').text(obj.nombreCompleto));
                            nuevaFila.append($('<td class="border dark:border-gray-700 p-2 text-center whitespace-nowrap">').text(parseFloat(total).toFixed(2)));
                        }
    
                        // Agregar la nueva fila al tbody
                        tbodyAgregarSaldo.append(nuevaFila);
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
    
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }    

    $('.cerrarModalAgregarSaldo, #ModalAgregarSaldo .opacity-75').on('click', function (e) {
        $('#ModalAgregarSaldo').addClass('hidden');
        $('#ModalAgregarSaldo').removeClass('flex');
    });

    // $(document).on("dblclick", "#tablaAgregarSaldo tbody tr", function() {
    //     let fila = $(this).closest('tr');
    //     let idCodigoCliente = fila.find('td:eq(0)').text();
    //     let nombreCompleto = fila.find('td:eq(1)').text();
    //     $('#valorAgregarSaldo').val('');

    //     $('#idCodigoClienteAgregarSaldo').attr('value', idCodigoCliente);
    //     $('#nombreClienteAgregarSaldo').text(nombreCompleto);
    //     $('#ModalAgregarSaldo').removeClass('hidden');
    //     $('#ModalAgregarSaldo').addClass('flex');
    // });

    $('#btnAgregarSaldo').on('click', function () {
        let valorAgregarSaldo = $('#valorAgregarSaldo').val();
        valorAgregarSaldo = parseFloat(valorAgregarSaldo)*-1;
        let idCodigoClienteAgregarSaldo = $('#idCodigoClienteAgregarSaldo').attr('value');
        fn_AgregarSaldo(valorAgregarSaldo,idCodigoClienteAgregarSaldo);
    });

    function fn_AgregarSaldo(valorAgregarSaldo,idCodigoClienteAgregarSaldo){
        $.ajax({
            url: '/fn_consulta_AgregarSaldo',
            method: 'GET',
            data: {
                valorAgregarSaldo: valorAgregarSaldo,
                idCodigoClienteAgregarSaldo:idCodigoClienteAgregarSaldo,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se la agrego el saldo correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('#ModalAgregarSaldo').addClass('hidden');
                    $('#ModalAgregarSaldo').removeClass('flex');
                    let fechaBuscaCuenta = $('#fechaSaldoDelCliente').val();
                    fn_TraerClientesAgregarSaldo(fechaBuscaCuenta);
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

    $('#filtrarClienteAgregarSaldo').on('input', function() {
        let nombreFiltrar = $('#filtrarClienteAgregarSaldo').val().toUpperCase(); // Obtiene el valor del campo de filtro

        // Mostrar todas las filas
        $('#tablaAgregarSaldo tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaAgregarSaldo tbody tr').each(function() {
                let nombre = $(this).find('td:eq(1)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    });

    $('#idRegularSaldo').on('input', function () {
        let inputCuentaDelCliente = $(this).val();
        let contenedorClientes = $('#contenedorClientesRegularSaldo');
        contenedorClientes.empty();

        if (inputCuentaDelCliente.length > 1 || inputCuentaDelCliente != "") {
            fn_TraerClientesCuentaDelCliente(inputCuentaDelCliente)
        } else {
            contenedorClientes.empty();
            contenedorClientes.addClass('hidden');
        }
    });

    $(document).on("click", "#btnRegularSaldos", function() {      
        $('#ModalCambiarPrecioPesada').addClass('flex');
        $('#ModalCambiarPrecioPesada').removeClass('hidden');
        $('#selectedCodigoCliRegularSaldo').attr('value',"");
        $('#nuevoSaldoCliente').val("");
        $('#idRegularSaldo').val("");
        $("#nuevoSaldoCliente").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        $("#idRegularSaldo").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');

        let fechaBuscaCuenta = $('#fechaSaldoDelCliente').val();
        $('#fechaRegularSaldo').val(fechaBuscaCuenta);
        let fechaFormateada = fechaBuscaCuenta.split('-').reverse().join('-');
        $('#mensajeFechaSaldo').text(`El saldo del dia ${fechaFormateada} es :`);
        $('#saldoObtenido').text(`0`);
    });


    function fn_TraerClientesCuentaDelCliente(inputCuentaDelCliente) {

        $.ajax({
            url: '/fn_consulta_TraerClientesCuentaDelCliente',
            method: 'GET',
            data: {
                idCuentaDelCliente: inputCuentaDelCliente,
            },
            success: function (response) {
                // Limpia las sugerencias anteriores
                let contenedorClientes = $('#contenedorClientesRegularSaldo')
                contenedorClientes.empty();

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Iterar sobre los objetos y mostrar sus propiedades como sugerencias
                    response.forEach(function (obj) {
                        var suggestion = $('<div class="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 border-b border-gray-300/40">' + obj.nombreCompleto + '</div>');

                        // Maneja el clic en la sugerencia
                        suggestion.on("click", function () {
                            // Rellena el campo de entrada con el nombre completo
                            $('#idRegularSaldo').val(obj.nombreCompleto);

                            // Actualiza las etiquetas ocultas con los datos seleccionados
                            $('#selectedCodigoCliRegularSaldo').attr("value", obj.codigoCli);

                            let fechaBuscaCuenta = $('#fechaRegularSaldo').val();
                            fn_TraerClientesAgregarSaldoCliente(fechaBuscaCuenta, obj.codigoCli)

                            // Oculta las sugerencias
                            contenedorClientes.addClass('hidden');
                        });

                        contenedorClientes.append(suggestion);
                    });

                    // Muestra las sugerencias
                    contenedorClientes.removeClass('hidden');
                } else {
                    // Oculta las sugerencias si no hay resultados
                    contenedorClientes.addClass('hidden');
                }
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    };

    function fn_TraerClientesAgregarSaldoCliente(fecha, codigoCliente) {
        $.ajax({
            url: '/fn_consulta_TraerClientesAgregarSaldoCliente',
            method: 'GET',
            data: {
                fecha: fecha,
                codigoCliente: codigoCliente,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Objeto para almacenar los resultados agrupados por codigoCli
                    let resultadosAgrupados = {};
    
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
                                limitEndeudamiento: obj.limitEndeudamiento // Asume un solo valor
                            };
                        }
    
                        // Sumar las propiedades correspondientes
                        resultadosAgrupados[codigoCli].deudaTotal += parseFloat(obj.deudaTotal);
                        resultadosAgrupados[codigoCli].cantidadPagos += parseFloat(obj.cantidadPagos);
                        resultadosAgrupados[codigoCli].ventaDescuentos += parseFloat(obj.ventaDescuentos);
                    });
    
                    // Iterar sobre los resultados agrupados y mostrar en la tabla
                    Object.values(resultadosAgrupados).forEach(function (obj) {
                        let total = obj.deudaTotal - obj.cantidadPagos + obj.ventaDescuentos;
                        
                        // Formatear la fecha
                        let fechaBuscaCuenta = $('#fechaRegularSaldo').val();
                        let fechaFormateada = fechaBuscaCuenta.split('-').reverse().join('-');
                        
                        $('#mensajeFechaSaldo').text(`El saldo del día ${fechaFormateada} es:`);
                        $('#saldoObtenido').text(total.toFixed(2)); // Mostrar el saldo con dos decimales
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }

    $(document).on('change', '#fechaRegularSaldo', function (event) {
        let fechaBuscaCuenta = $('#fechaRegularSaldo').val();
        let codigoCli = $('#selectedCodigoCliRegularSaldo').attr("value");
        let fechaFormateada = fechaBuscaCuenta.split('-').reverse().join('-');

        if(codigoCli){
            $('#mensajeFechaSaldo').text(`El saldo del día ${fechaFormateada} es:`);
            fn_TraerClientesAgregarSaldoCliente(fechaBuscaCuenta,codigoCli)
        }else{
            $('#mensajeFechaSaldo').text(`El saldo del día ${fechaFormateada} es:`);
        }
    });

    $(document).on('click', '#btnRegularSaldoCliente', function (event) {
        let fechaBuscaCuenta = $('#fechaRegularSaldo').val();
        let codigoCli = $('#selectedCodigoCliRegularSaldo').attr("value");
        let saldoObtenido = parseFloat($('#saldoObtenido').text());
        let nuevoRegularSaldo = parseFloat($('#nuevoSaldoCliente').val());
        let nuevoPrecio = $('#nuevoSaldoCliente').val();
    
        // Calcular la diferencia
        let diferencia = nuevoRegularSaldo - saldoObtenido;
        diferencia = diferencia*-1

        let contadorErrores = 0;

        if (codigoCli == 0 || codigoCli == ""){
            contadorErrores++;
            $("#idRegularSaldo").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#idRegularSaldo").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }

        if(nuevoPrecio == ""){
            contadorErrores++;
            $("#nuevoSaldoCliente").removeClass('dark:border-gray-600 border-gray-300').addClass('border-red-500');
        }else{
            $("#nuevoSaldoCliente").removeClass('border-red-500').addClass('dark:border-gray-600 border-gray-300');
        }

        if(contadorErrores == 0){
            fn_AgregarSaldoRegular(fechaBuscaCuenta,codigoCli,diferencia);
        }else{
            alertify.notify('Debe rellenar todos los campos.', 'error', 3);
        }

    });
    
    function fn_AgregarSaldoRegular(fechaBuscaCuenta,codigoCli,diferencia){
        $.ajax({
            url: '/fn_consulta_AgregarSaldoRegular',
            method: 'GET',
            data: {
                fechaBuscaCuenta: fechaBuscaCuenta,
                codigoCli:codigoCli,
                diferencia:diferencia,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se regulo el saldo correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('#ModalCambiarPrecioPesada').addClass('hidden');
                    $('#ModalCambiarPrecioPesada').removeClass('flex');
                    let fechaBuscaCuenta = $('#fechaSaldoDelCliente').val();
                    fn_TraerClientesAgregarSaldo(fechaBuscaCuenta);
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
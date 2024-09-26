import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function ($) {

    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    $('#fechaDesdeCuentaDelCliente').val(fechaHoy);
    $('#fechaHastaCuentaDelCliente').val(fechaHoy);

    $('#btnBuscarCuentaDelCliente').on('click', function () {
        let fechaDesdeCuentaDelCliente = $('#fechaDesdeCuentaDelCliente').val();
        let fechaHastaCuentaDelCliente = $('#fechaHastaCuentaDelCliente').val();
        let codigoProveedor = $("#codigoClienteSeleccionado").val();
        let nombreProveedor = $("#inputNombreClientes").val();
        if (codigoProveedor != 0){
            fn_ConsultarProveedor(fechaHastaCuentaDelCliente, fechaHastaCuentaDelCliente, nombreProveedor);
        }else{
            let tbodyProveedor = $('#bodyCuentaDelCliente');
            tbodyProveedor.empty();
            alertify.notify('Debe seleccionar proveedor.', 'error', 3);
            tbodyProveedor.append(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="7" class="text-center">No hay datos</td></tr>`)
        }
    });

    var arrayListaProveedores = [
        {
            nombreProveedor : "TECNICA",
            codigoProveedor : 1
        },
        {
            nombreProveedor : "YUGO",
            codigoProveedor : 2
        },
        {
            nombreProveedor : "MASAY",
            codigoProveedor : 3
        },
        {
            nombreProveedor : "ATOCHE",
            codigoProveedor : 4
        },
        {
            nombreProveedor : "SALOMON",
            codigoProveedor : 5
        },
        {
            nombreProveedor : "OTROS",
            codigoProveedor : 6
        },
        {
            nombreProveedor : "CHIMU",
            codigoProveedor : 7
        },
    ]

    let selectedIndex = -1;

    $('#inputNombreClientes').on('input', function () {
        $('#codigoClienteSeleccionado').val(0);
        $("#clienteSeleccionadoCorrecto").removeClass("flex");
        $("#clienteSeleccionadoCorrecto").addClass("hidden");
        const searchTerm = $(this).val().toLowerCase();
        const $filtrarClientes = $("#inputNombreClientes").val();
        const filteredClientes = arrayListaProveedores.filter(cliente =>
            cliente.nombreProveedor.toLowerCase().includes(searchTerm)
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
    
    function displayClientes(arrayListaProveedores) { 
        const $contenedor = $('#contenedorDeClientes');
        $contenedor.empty();
        if (arrayListaProveedores.length > 0) {
            $contenedor.removeClass('hidden');
            arrayListaProveedores.forEach(cliente => {
                const $div = $('<div class="text-gray-800 text-sm dark:text-white font-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:hover:bg-gray-700 hover:bg-gray-200"></div>')
                    .text(cliente.nombreProveedor)
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
        $('#inputNombreClientes').val(cliente.nombreProveedor);
        $('#codigoClienteSeleccionado').val(cliente.codigoProveedor);
        $('#contenedorDeClientes').addClass('hidden');
        $("#clienteSeleccionadoCorrecto").removeClass("hidden");
        $("#clienteSeleccionadoCorrecto").addClass("flex");
        selectedIndex = -1;
    }

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.relative').length) {
            $('#contenedorDeClientes').addClass('hidden');
            selectedIndex = -1;
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

    function fn_ConsultarProveedor(fechaDesde, fechaHasta, nombreProveedor) {
        $.ajax({
        url: '/fn_consulta_ConsultarProveedorEstadoCuenta',
            method: 'GET',
            data:{
                fechaDesde:fechaDesde,
                fechaHasta:fechaHasta,
                nombreProveedor:nombreProveedor,
            },
            success: function (respuestaGuiasProveedores) {

                $.ajax({
                url: '/fn_consulta_ConsultarPagosProveedorEstadoCuenta',
                    method: 'GET',
                    data:{
                        fechaDesde:fechaDesde,
                        fechaHasta:fechaHasta,
                        nombreProveedor:nombreProveedor,
                    },
                    success: function (respuestaPagosProveedores) {

                        $.ajax({
                            url: '/fn_consulta_ConsultarPagosProveedorDirectoEstadoCuenta',
                            method: 'GET',
                            data:{
                                fechaDesde:fechaDesde,
                                fechaHasta:fechaHasta,
                                nombreProveedor:nombreProveedor,
                            },
                            success: function (respuestaPagosProveedoresDirecto) {

                                $.ajax({
                                    url: '/fn_consulta_ConsultarPagosProveedorPaulEstadoCuenta',
                                    method: 'GET',
                                    data:{
                                        fechaDesde:fechaDesde,
                                        fechaHasta:fechaHasta,
                                        nombreProveedor:nombreProveedor,
                                    },
                                    success: function (respuestaPagosProveedoresPaul) {

                                        $.ajax({
                                            url: '/fn_consulta_ConsultarCuentaAnteriorProveedorEstadoCuenta',
                                                method: 'GET',
                                                data:{
                                                    fechaDesde:fechaDesde,
                                                    fechaHasta:fechaHasta,
                                                    nombreProveedor:nombreProveedor,
                                                },
                                                success: function (respuestaCuentaAnterior) {

                                                    respuestaCuentaAnterior = respuestaCuentaAnterior[0]

                                                    let resultadoAnterior = parseFloat(respuestaCuentaAnterior["totalGuias"]) - (parseFloat(respuestaCuentaAnterior["totalPagos"]) + parseFloat(respuestaCuentaAnterior["totalPagosDirectos"]) + parseFloat(respuestaCuentaAnterior["totalPagosPaul"]));

                                                    // Obtener el select
                                                    let tbodyProveedor = $('#bodyCuentaDelCliente');
                                                    tbodyProveedor.empty();

                                                    let nuevaFila = "";
                                                    let pagoAProveedoresPorDia = 0.00;
                                                    let cantidadAProveedoresPorDia = 0;
                                                    let pesoAProveedoresPorDia = 0.0;
                                                    let pesoBrutoProveedoresPorDia = 0.0;
                                                    let pesoTaraProveedoresPorDia = 0.0;
                                                    let pagosProveedores = 0.0;

                                                    respuestaGuiasProveedores.forEach(function (obj) {
                                                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                        let precioGuia = 0.00;
                                                        if (obj.precioGuia != "" && obj.precioGuia != null) {
                                                            precioGuia = parseFloat(obj.precioGuia);
                                                        }
                                                        let pesoNeto = parseFloat(obj.pesoBrutoGuia)-parseFloat(obj.pesoTaraGuia);
                                                        let promedio = parseFloat(pesoNeto)/parseFloat(obj.cantidadGuia);
                                                        let totalAPagar = parseFloat(precioGuia)*parseFloat(pesoNeto);
                                                        pagoAProveedoresPorDia += totalAPagar;
                                                        cantidadAProveedoresPorDia += parseInt(obj.cantidadGuia);
                                                        pesoAProveedoresPorDia += parseFloat(pesoNeto);
                                                        pesoBrutoProveedoresPorDia += parseFloat(obj.pesoBrutoGuia);
                                                        pesoTaraProveedoresPorDia += parseFloat(obj.pesoTaraGuia);
                                                        // Agregar las celdas con la información
                                                        nuevaFila.append($('<td class="hidden">').text(obj.idGuia));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.numGuia));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.nombreEspecieCompra));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.cantidadGuia == 1 ? `${obj.cantidadGuia} Ud.` : `${obj.cantidadGuia} Uds.`));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((pesoNeto).toFixed(2)+" Kg."));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((promedio).toFixed(2)));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(precioGuia.toFixed(2)));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(`S/. ${fn_formatearImportes(totalAPagar)}`));
                                                        
                                                        // Agregar la nueva fila al tbody
                                                        tbodyProveedor.append(nuevaFila);
                                                    });

                                                    let estilos2 = resultadoAnterior > 0 ? "bg-red-600" : "bg-green-600";

                                                    nuevaFila = $('<tr class="bg-white border-b border-t-2 border-t-gray-700 dark:border-t-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("SALDO DEL DIA:"));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(`S/. ${fn_formatearImportes(pagoAProveedoresPorDia)}`));
                                                    tbodyProveedor.append(nuevaFila);
                                                    nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("SALDO ANTERIOR:"));
                                                    nuevaFila.append($(`<td class="border-r dark:border-gray-700 px-4 py-2 font-medium whitespace-nowrap text-white text-center ${estilos2}">`).text(`S/. ${fn_formatearImportes(resultadoAnterior)}`));
                                                    let resultadoSaldoActual = pagoAProveedoresPorDia + resultadoAnterior;
                                                    tbodyProveedor.append(nuevaFila);
                                                    nuevaFila = $('<tr class="bg-white border-b border-t-2 border-t-gray-700 dark:border-t-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("SALDO TOTAL:"));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(`S/. ${fn_formatearImportes(resultadoSaldoActual)}`));
                                                    tbodyProveedor.append(nuevaFila);

                                                    nuevaFila = $('<tr class="bg-white rowSpanPagos border-b border-t-2 border-t-gray-700 dark:border-t-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium whitespace-nowrap dark:text-white text-center" id="txtPagos">').text("PAGOS"));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r border-l-2 border-l-gray-700 dark:border-l-white dark:border-r-gray-700 px-4 py-2 font-medium bg-blue-600 whitespace-nowrap text-white text-center">').text("NOMBRE DEL DEPOSITANTE"));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium bg-blue-600 whitespace-nowrap text-white text-center">').text("CODIGO"));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium bg-blue-600 whitespace-nowrap text-white text-center">').text("BANCO"));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium bg-blue-600 whitespace-nowrap text-white text-center">').text("HORA"));
                                                    nuevaFila.append($('<td class="px-4 py-2 font-medium bg-blue-600 whitespace-nowrap text-white text-center">').text("IMPORTE"));
                                                    tbodyProveedor.append(nuevaFila);

                                                    let pasoUnaVezPagos = false;

                                                    respuestaPagosProveedores.forEach(function (obj) {
                                                        pagosProveedores += parseFloat(obj.cantidadAbonoPag);
                                                        if(pasoUnaVezPagos == false){
                                                            nuevaFila = $('<tr class="bg-white rowSpanPagos dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                            nuevaFila.append($('<td class="border-r border-b dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center uppercase">').text(obj.codigoCli));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.codigoTransferenciaPag));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.bancaPago));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.horaOperacionPag));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(fn_formatearImportes(obj.cantidadAbonoPag)));
                                                            tbodyProveedor.append(nuevaFila);
                                                            pasoUnaVezPagos = true;
                                                        }else{
                                                            nuevaFila = $('<tr class="bg-white rowSpanPagos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center uppercase">').text(obj.codigoCli));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.codigoTransferenciaPag));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.bancaPago));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.horaOperacionPag));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(fn_formatearImportes(obj.cantidadAbonoPag)));
                                                            tbodyProveedor.append(nuevaFila);
                                                        }
                                                    });

                                                    respuestaPagosProveedoresDirecto.forEach(function (obj) {
                                                        pagosProveedores += parseFloat(obj.cantidadAbonoPag);
                                                        if(pasoUnaVezPagos == false){
                                                            nuevaFila = $('<tr class="bg-white rowSpanPagos dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                            nuevaFila.append($('<td class="border-r border-b dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center uppercase">').text(obj.nombreCompleto));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.codigoTransferenciaPag));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.bancaPago));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.horaOperacionPag));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(fn_formatearImportes(obj.cantidadAbonoPag)));
                                                            tbodyProveedor.append(nuevaFila);
                                                            pasoUnaVezPagos = true;
                                                        }else{
                                                            nuevaFila = $('<tr class="bg-white rowSpanPagos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center uppercase">').text(obj.nombreCompleto));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.codigoTransferenciaPag));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.bancaPago));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.horaOperacionPag));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(fn_formatearImportes(obj.cantidadAbonoPag)));
                                                            tbodyProveedor.append(nuevaFila);
                                                        }
                                                    });

                                                    respuestaPagosProveedoresPaul.forEach(function (obj) {
                                                        pagosProveedores += parseFloat(obj.cantidadAbonoEgreso);
                                                        if(pasoUnaVezPagos == false){
                                                            nuevaFila = $('<tr class="bg-white rowSpanPagos dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                            nuevaFila.append($('<td class="border-r border-b dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center uppercase">').text("PAUL"));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r border-b border-t-2 border-t-gray-700 dark:border-t-white dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(fn_formatearImportes(obj.cantidadAbonoEgreso)));
                                                            tbodyProveedor.append(nuevaFila);
                                                            pasoUnaVezPagos = true;
                                                        }else{
                                                            nuevaFila = $('<tr class="bg-white rowSpanPagos border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center uppercase">').text("PAUL"));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(fn_formatearImportes(obj.cantidadAbonoEgreso)));
                                                            tbodyProveedor.append(nuevaFila);
                                                        }
                                                    });

                                                    if (respuestaPagosProveedores.length == 0 && respuestaPagosProveedoresDirecto.length == 0 && respuestaPagosProveedoresPaul.length == 0) {
                                                        nuevaFila = $('<tr class="bg-white rowSpanPagos border-b border-t-2 border-t-gray-700 dark:border-t-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("0,00"));
                                                        tbodyProveedor.append(nuevaFila);
                                                        pasoUnaVezPagos = true;
                                                    }

                                                    let resultado = (pagoAProveedoresPorDia + resultadoAnterior) - pagosProveedores;

                                                    let estilos = resultado > 0 ? "bg-red-600" : "bg-green-600";

                                                    nuevaFila = $('<tr class="bg-white border-b border-t-2 border-t-gray-700 dark:border-t-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("SALDO ACTUAL:"));
                                                    nuevaFila.append($(`<td class="border-r dark:border-gray-700 px-4 py-2 font-medium whitespace-nowrap text-white text-center ${estilos}">`).text(`S/. ${fn_formatearImportes(resultado)}`));
                                                    tbodyProveedor.append(nuevaFila);

                                                    actualizarRowSpanPagos();
                                                },
                                                error: function(error) {
                                                    console.error("ERROR",error);
                                                }
                                            });

                                    },
                                    error: function(error) {
                                        console.error("ERROR",error);
                                    }
                                });

                            },
                            error: function(error) {
                                console.error("ERROR",error);
                            }
                        });
                    },
                    error: function(error) {
                        console.error("ERROR",error);
                    }
                });
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    function actualizarRowSpanPagos() {
        let filasPagos = $('.rowSpanPagos').length;

        $('#txtPagos').attr('rowspan', filasPagos);
    }
    

})
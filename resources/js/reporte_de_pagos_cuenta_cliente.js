import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function ($) {

    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    $('#fechaDesdeCuentaDelCliente').val(fechaHoy);
    $('#fechaHastaCuentaDelCliente').val(fechaHoy);
    fn_ConsultarProveedor(fechaHoy, fechaHoy);

    $('#btnBuscarCuentaDelCliente').on('click', function () {
        let fechaDesdeCuentaDelCliente = $('#fechaDesdeCuentaDelCliente').val();
        let fechaHastaCuentaDelCliente = $('#fechaHastaCuentaDelCliente').val();
        fn_ConsultarProveedor(fechaDesdeCuentaDelCliente, fechaHastaCuentaDelCliente);
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

    function fn_ConsultarProveedor(fechaDesde, fechaHasta) {
        $.ajax({
        url: '/fn_consulta_ConsultarProveedor',
            method: 'GET',
            data:{
                fechaDesde:fechaDesde,
                fechaHasta:fechaHasta,
            },
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyProveedor = $('#bodyCuentaDelCliente');
                    tbodyProveedor.empty();

                    let fechasUnicas = new Set();
                    let sinRepetidos = response.filter((valorActual) => {
                        let fechaInicioString = JSON.stringify(valorActual.fechaGuia);
                        if (!fechasUnicas.has(fechaInicioString)) {
                            fechasUnicas.add(fechaInicioString);
                            return true;
                        }
                        return false;
                    });

                    let nuevaFila = "";

                    // Iterar sobre los objetos y mostrar sus propiedades
                    sinRepetidos.forEach(function(item) {

                        let pagoAProveedoresPorDia = 0.00;
                        let cantidadAProveedoresPorDia = 0;
                        let pesoAProveedoresPorDia = 0.0;
                        let pesoBrutoProveedoresPorDia = 0.0;
                        let pesoTaraProveedoresPorDia = 0.0;

                        if (sinRepetidos.length > 1) {
                            nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                            nuevaFila.append($('<td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(item.fechaGuia));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" colspan="9">').text(""));
                            tbodyProveedor.append(nuevaFila);
                        }

                        response.forEach(function (obj) {
                            if (item.fechaGuia === obj.fechaGuia) {
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
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("S/. "+(totalAPagar).toFixed(2)));
                                
                                // Agregar la nueva fila al tbody
                                tbodyProveedor.append(nuevaFila);
                            }
                        });
                        
                        nuevaFila = $('<tr class="bg-white dark:bg-gray-800 h-0.5">');
                        nuevaFila.append($('<td class="dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="9">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        tbodyProveedor.append(nuevaFila);
                        nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("TOTAL :"));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("S/. "+pagoAProveedoresPorDia.toFixed(2)));
                        tbodyProveedor.append(nuevaFila);
                    });
                    if (response.length == 0) {
                        tbodyProveedor.html(`<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

})
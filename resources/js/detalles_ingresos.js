import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];

    $("#fechaAgregarEgreso").val(fechaHoy);
    $("#fechaFiltrarDetallesEgresos").val(fechaHoy);
    fn_asignarHoraEgreso();
    fn_declararCategorias();
    fn_consulta_TraerTablasCategoriasEgresos();

    function fn_asignarHoraEgreso() {
        const ahoraEnNY2 = new Date();
        const hours = ahoraEnNY2.getHours().toString().padStart(2, '0');
        const minutes = ahoraEnNY2.getMinutes().toString().padStart(2, '0');
        const seconds = ahoraEnNY2.getSeconds().toString().padStart(2, '0');
        const currentTime = hours + ":" + minutes + ":" + seconds;
        
        $('#horaAgregarEgreso').val(currentTime);
    }

    /* let selectedIndex = -1;

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
    
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.relative').length) {
            $('#contenedorDeClientes').addClass('hidden');
            selectedIndex = -1;
        }
    }); */   
    
    $(document).on("input", ".convertirTextoEnMayusculasED", function() {      
        let input = $(this)[0];
        let start = input.selectionStart;
        let end = input.selectionEnd;
        
        let valor = $(this).val();
        valor = valor.toUpperCase();
        $(this).val(valor);
        
        input.setSelectionRange(start, end);
    });
    

    $(document).on("click", "#agregarCategoriaBtn", function() {      
        $('#ModalCrearCategoria').addClass('flex');
        $('#ModalCrearCategoria').removeClass('hidden');
        $('#inputNuevaCategoria').val("");
        $('#inputNuevaCategoria').focus();
    });

    $(document).on("click", "#agregarEgresoBtn", function() {      
        $('#ModalAgregarEgreso').addClass('flex');
        $('#ModalAgregarEgreso').removeClass('hidden');
        $('#usoAgregarEgreso').val('');
        $('#cantidadAgregarEgreso').val('');
        $('#precioAgregarEgreso').val('');
        $('#montoAgregarEgreso').val('');
        $('#comentarioAgregarEgreso').val('');
        $('#selectAgregarCategoria').val($('#selectAgregarCategoria option:first').val());
        fn_asignarHoraEgreso();
    });

    $('.cerrarModalCrearCategoria, #ModalCrearCategoria .opacity-75').on('click', function (e) {
        $('#ModalCrearCategoria').addClass('hidden');
        $('#ModalCrearCategoria').removeClass('flex');
    });

    $('.cerrarModalAgregarEgreso, #ModalAgregarEgreso .opacity-75').on('click', function (e) {
        $('#ModalAgregarEgreso').addClass('hidden');
        $('#ModalAgregarEgreso').removeClass('flex');
    });

    $('.cerrarModalAgregarEgresoEditar, #ModalAgregarEgresoEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarEgresoEditar').addClass('hidden');
        $('#ModalAgregarEgresoEditar').removeClass('flex');
    });

    $(document).on("click", "#btnCrearCategoria", function() {
        let nombreNuevaCategoria = $('#inputNuevaCategoria').val();
        if (nombreNuevaCategoria.trim() == ""){
            alertify.notify('Debe ingresar nombre de categoria', 'error', 3);
            return;
        }else{
            fn_CrearCategoria(nombreNuevaCategoria);
        }
    });

    function fn_CrearCategoria(nombreNuevaCategoria){
        $.ajax({
            url: '/fn_consulta_CrearCategoria2',
            method: 'GET',
            data: {
                nombreNuevaCategoria: nombreNuevaCategoria,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se agrego la categoria correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#ModalCrearCategoria').addClass('hidden');
                    $('#ModalCrearCategoria').removeClass('flex');
                    fn_declararCategorias();
                    fn_consulta_TraerTablasCategoriasEgresos();
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

    function eliminarEspacios(cadena) {
        return cadena.replace(/\s+/g, '');
    }

    function fn_consulta_TraerTablasCategoriasEgresos() {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerTablasCategoriasEgresos2',
            method: 'GET',
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let contenedorCategoriasEgresos = $('#contenedorCategoriasEgresos');
                    contenedorCategoriasEgresos.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        let nuevaFila = `
                        <div class="w-full overflow-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 tbodyLimpiar" id="tabla${obj.nombre_category}">
                                <caption class="bg-blue-600 p-2 w-full border-b-2 text-sm font-bold text-gray-100">${obj.nombre_category}</caption>
                                <thead class="text-xs text-gray-100 uppercase bg-blue-600 sticky top-0" id="header${obj.nombre_category}">
                                    <tr>
                                        <th class="px-2 py-4 text-center">Fecha</th>
                                        <th class="px-2 py-4 text-center">Hora</th>
                                        <th class="px-2 py-4 text-center">Cliente</th>
                                        <th class="px-2 py-4 text-center">Cantidad</th>
                                        <th class="px-2 py-4 text-center">Precio</th>
                                        <th class="px-2 py-4 text-center">Monto</th>
                                        <th class="px-2 py-4 text-center">Observación</th>
                                        <th class="px-2 py-4 text-center hidden">Categoria</th>
                                    </tr>
                                </thead>
                                <tbody id="bodyCategoria${eliminarEspacios(obj.nombre_category)}">
                                </tbody>
                            </table>
                        </div>
                        `;
                        
                        // Agregar la nueva tabla al tbody
                        contenedorCategoriasEgresos.append(nuevaFila);
                    });

                    fn_consulta_TraerTablasDetallesEgresos(fechaHoy);

                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });

    };

    function fn_consulta_TraerTablasDetallesEgresos(fecha) {

        // Realiza la solicitud AJAX para obtener sugerencias
        $.ajax({
            url: '/fn_consulta_TraerTablasDetallesEgresos2',
            method: 'GET',
            data: {
                fecha: fecha
            },
            success: function (response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
    
                    let totalesPorCategoria = {};
                    let totalCantidadSinClasificar = 0;
                    let totalMontoSinClasificar = 0;
                    $('.tbodyLimpiar tbody').empty();
    
                    response.forEach(function (obj) {
    
                        // Inicializar el objeto de totales para la categoría si no existe
                        if (!totalesPorCategoria[obj.nombre_category]) {
                            totalesPorCategoria[obj.nombre_category] = {
                                cantidad_total: 0,
                                monto_total: 0
                            };
                        }

                        if (parseInt(obj.id_category) == 0) {
                            totalCantidadSinClasificar += obj.cantidad_detalles ? parseInt(obj.cantidad_detalles) : 0;
                            totalMontoSinClasificar += obj.monto_detalle ? parseFloat(obj.monto_detalle) : 0;
                        }
    
                        // Acumular los totales por categoría
                        totalesPorCategoria[obj.nombre_category].cantidad_total += obj.cantidad_detalles ? parseInt(obj.cantidad_detalles) : 0;
                        totalesPorCategoria[obj.nombre_category].monto_total += obj.monto_detalle ? parseFloat(obj.monto_detalle) : 0;
                    });
    
                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        let nuevaFila = `
                            <tr class="eliminarDetalleEgreso bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.id_detalle}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.fecha_detalle}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.hora_detalle}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.uso_detalle_egreso}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.cantidad_detalles === null ? "" : obj.cantidad_detalles}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.precio_detalle}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.monto_detalle}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap">${obj.observacion === null ? "" : obj.observacion}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center whitespace-nowrap hidden">${obj.id_category}</td>
                            </tr>
                        `;
    
                        // Agregar la nueva fila al tbody correspondiente
                        if (parseInt(obj.id_category) != 0) {
                            let contenedorCategoriasEgresos = $(`#bodyCategoria${eliminarEspacios(obj.nombre_category)}`);
                            contenedorCategoriasEgresos.append(nuevaFila);
                        } else {
                            let contenedorCategoriasEgresos = $('#bodyCategoriaSinClasificar');
                            contenedorCategoriasEgresos.append(nuevaFila);
                        }
                    });
    
                    // Agregar las filas de totales por categoría
                    for (let category in totalesPorCategoria) {
                        let totales = totalesPorCategoria[category];
                        let filaTotales = `
                            <tr class="bg-blue-600 text-white font-bold">
                                <td colspan="3" class="border-r dark:border-gray-700 p-2 text-center">Total</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center">${totales.cantidad_total}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center">${totales.monto_total.toFixed(2)}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center hidden"></td>
                            </tr>
                        `;
    
                        let contenedorTotales = $(`#bodyCategoria${eliminarEspacios(category)}`);
                        contenedorTotales.append(filaTotales);
                    }

                    let nuevaFila = `
                            <tr class="bg-green-600 text-white font-bold">
                                <td colspan="3" class="border-r dark:border-gray-700 p-2 text-center">Total</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center">${totalCantidadSinClasificar}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center">${totalMontoSinClasificar.toFixed(2)}</td>
                                <td class="border-r dark:border-gray-700 p-2 text-center"></td>
                                <td class="border-r dark:border-gray-700 p-2 text-center hidden"></td>
                            </tr>
                        `;
    
                        let contenedorCategoriasEgresos = $('#bodyCategoriaSinClasificar');
                        contenedorCategoriasEgresos.append(nuevaFila);
    
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                    $('.tbodyLimpiar tbody').empty();
                }
    
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    
    };     

    function fn_declararCategorias(){
        $.ajax({
            url: '/fn_consulta_TraerTablasCategoriasEgresos2',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacion = $('#selectAgregarCategoria');
                    let selectPresentacionEditar = $('#selectAgregarCategoriaEditar');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();
                    selectPresentacionEditar.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectPresentacion.append($('<option>', {
                        value: '0',
                        text: 'Sin clasificar',
                        selected: true
                    }));
                    selectPresentacionEditar.append($('<option>', {
                        value: '0',
                        text: 'Sin clasificar',
                        selected: true
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.id_category,
                            text: obj.nombre_category
                        });
                        selectPresentacion.append(option);
                    });

                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.id_category,
                            text: obj.nombre_category
                        });
                        selectPresentacionEditar.append(option);
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

    // $(document).on('input', '.accionarSumaMonto', function () {
    //     let cantidad = parseFloat($("#cantidadAgregarEgreso").val().trim()) || 1;
    //     let precio = parseFloat($("#precioAgregarEgreso").val().trim()) || 0;
    //     let resultado = cantidad * precio;
    //     $("#montoAgregarEgreso").val(resultado.toFixed(2));
    // }); 

    $(document).on("click", "#btnBuscarDetallesEgresos", function() {     
        let fecha = $("#fechaFiltrarDetallesEgresos").val();
        fn_consulta_TraerTablasDetallesEgresos(fecha);
    });

    // $(document).on("click", "#btnAgregarEgreso", function() {
    //     let fechaDetalle = $('#fechaAgregarEgreso').val();
    //     let horaDetalle = $('#horaAgregarEgreso').val();
    //     let usoEgreso = $('#usoAgregarEgreso').val();
    //     let cantidadDetalle = $('#cantidadAgregarEgreso').val();
    //     let precioDetalle = $('#precioAgregarEgreso').val();
    //     let montoDetalle = $('#montoAgregarEgreso').val();
    //     let observacionDetalle = $('#comentarioAgregarEgreso').val();
    //     let categoriaDetalle = $('#selectAgregarCategoria').val();

    //     let comentarioAgregarPagoCliente = "";
    //     let horaAgregarPago = "12:00:00";
    //     let pagoDerivado = "6";
    //     let codCliente = "33";
    //     let formaDePagoEgreso = "Flete";
    //     let codAgregEgresoCliente = "";
    //     let bancoAgregEgresoCliente = "FLETE";
    //     let montoEgresoPagoo = parseFloat(montoDetalle)*-1;

    //     if (usoEgreso.trim() == ""){
    //         alertify.notify('Debe ingresar uso de egreso y seleccionar categoria', 'error', 3);
    //         return;
    //     }else if(montoDetalle.trim() == ""){
    //         alertify.notify('Debe ingresar precio y cantidad(opcional)', 'error', 3);
    //         return;
    //     }else{
    //         if (usoEgreso.includes("FLETE")) {
    //             fn_AgregarPagoClienteExcel(codCliente, montoEgresoPagoo, fechaDetalle, formaDePagoEgreso, codAgregEgresoCliente, comentarioAgregarPagoCliente, bancoAgregEgresoCliente, horaAgregarPago, pagoDerivado, usoEgreso, fechaDetalle)
    //         }
    //         fn_AgregarDetalleEgreso(fechaDetalle, horaDetalle, usoEgreso, cantidadDetalle, precioDetalle, montoDetalle, observacionDetalle, categoriaDetalle);
    //     }
    // });

    function fn_AgregarDetalleEgreso(fechaDetalle, horaDetalle, usoEgreso, cantidadDetalle, precioDetalle, montoDetalle, observacionDetalle, categoriaDetalle) {
        return $.ajax({
            url: '/fn_consulta_AgregarDetalleEgreso2',
            method: 'GET',
            data: {
                fechaDetalle: fechaDetalle,
                horaDetalle: horaDetalle,
                usoEgreso: usoEgreso,
                cantidadDetalle: cantidadDetalle,
                precioDetalle: precioDetalle,
                montoDetalle: montoDetalle,
                observacionDetalle: observacionDetalle,
                categoriaDetalle: categoriaDetalle,
            },
            success: function(response) {
                // if (response.success) {
                //     Swal.fire({
                //         position: 'center',
                //         icon: 'success',
                //         title: 'Se agrego el egreso correctamente',
                //         showConfirmButton: false,
                //         timer: 2000
                //     });
                //     $('#ModalAgregarEgreso').addClass('hidden');
                //     $('#ModalAgregarEgreso').removeClass('flex');
                //     $("#btnBuscarDetallesEgresos").trigger('click');
                // }
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

    $(document).on("dblclick", ".eliminarDetalleEgreso", function() {      
        $('#ModalAgregarEgresoEditar').addClass('flex');
        $('#ModalAgregarEgresoEditar').removeClass('hidden');
        let idDetalleEgreso = $(this).closest("tr").find("td:eq(0)").text();
        let fecha = $(this).closest("tr").find("td:eq(1)").text();
        let hora = $(this).closest("tr").find("td:eq(2)").text();
        let usoEgreso = $(this).closest("tr").find("td:eq(3)").text();
        let cantidad = $(this).closest("tr").find("td:eq(4)").text();
        let precio = $(this).closest("tr").find("td:eq(5)").text();
        let monto = $(this).closest("tr").find("td:eq(6)").text();
        let observacion = $(this).closest("tr").find("td:eq(7)").text();
        let categoria = $(this).closest("tr").find("td:eq(8)").text();

        $("#fechaAgregarEgresoEditar").val(fecha);
        $("#horaAgregarEgresoEditar").val(hora);
        $("#usoAgregarEgresoEditar").val(usoEgreso);
        $("#cantidadAgregarEgresoEditar").val(cantidad);
        $("#precioAgregarEgresoEditar").val(precio);
        $("#montoAgregarEgresoEditar").val(monto);
        $("#comentarioAgregarEgresoEditar").val(observacion);
        $("#selectAgregarCategoriaEditar").val(categoria);
        $("#idDetalleEgreso").val(idDetalleEgreso);
        
    });

    $(document).on('contextmenu', '.eliminarDetalleEgreso', function (e) {
        e.preventDefault();
        let idDetalleEgreso = $(this).closest("tr").find("td:first").text();
        Swal.fire({
            title: '¿Desea eliminar el Registro?',
            text: "¡Estas seguro de eliminar el registro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
            fn_EliminarEgreso(idDetalleEgreso);
            }
        })
    });

    function fn_EliminarEgreso(idDetalleEgreso){
        $.ajax({
            url: '/fn_consulta_EliminarDetalleEgreso2',
            method: 'GET',
            data: {
                idDetalleEgreso: idDetalleEgreso,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino el registro correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#btnBuscarDetallesEgresos').trigger('click');
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

    $(document).on("click", "#btnAgregarEgresoEditar", function() {
        let fechaDetalle = $('#fechaAgregarEgresoEditar').val();
        let horaDetalle = $('#horaAgregarEgresoEditar').val();
        let usoEgreso = $('#usoAgregarEgresoEditar').val();
        let cantidadDetalle = $('#cantidadAgregarEgresoEditar').val();
        let precioDetalle = $('#precioAgregarEgresoEditar').val();
        let montoDetalle = $('#montoAgregarEgresoEditar').val();
        let observacionDetalle = $('#comentarioAgregarEgresoEditar').val();
        let categoriaDetalle = $('#selectAgregarCategoriaEditar').val();
        let idDetalleEgreso = $('#idDetalleEgreso').val();

        if (usoEgreso.trim() == ""){
            alertify.notify('Debe ingresar uso de egreso y seleccionar categoria', 'error', 3);
            return;
        }else if(montoDetalle.trim() == ""){
            alertify.notify('Debe ingresar precio y cantidad(opcional)', 'error', 3);
            return;
        }else{
            fn_AgregarDetalleEgresoEditar(fechaDetalle, horaDetalle, usoEgreso, cantidadDetalle, precioDetalle, montoDetalle, observacionDetalle, categoriaDetalle, idDetalleEgreso);
        }
    });

    function fn_AgregarDetalleEgresoEditar(fechaDetalle, horaDetalle, usoEgreso, cantidadDetalle, precioDetalle, montoDetalle, observacionDetalle, categoriaDetalle, idDetalleEgreso) {
        $.ajax({
            url: '/fn_consulta_AgregarDetalleEgresoEditar2',
            method: 'GET',
            data: {
                fechaDetalle: fechaDetalle,
                horaDetalle: horaDetalle,
                usoEgreso: usoEgreso,
                cantidadDetalle: cantidadDetalle,
                precioDetalle: precioDetalle,
                montoDetalle: montoDetalle,
                observacionDetalle: observacionDetalle,
                categoriaDetalle: categoriaDetalle,
                idDetalleEgreso: idDetalleEgreso,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se agrego el egreso correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#ModalAgregarEgresoEditar').addClass('hidden');
                    $('#ModalAgregarEgresoEditar').removeClass('flex');
                    $("#btnBuscarDetallesEgresos").trigger('click');
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

    $(document).on('input', '.accionarSumaMontoEditar', function () {
        let cantidad = parseFloat($("#cantidadAgregarEgresoEditar").val().trim()) || 1;
        let precio = parseFloat($("#precioAgregarEgresoEditar").val().trim()) || 0;
        let resultado = cantidad * precio;
        $("#montoAgregarEgresoEditar").val(resultado.toFixed(2));
    }); 

    function fn_AgregarPagoClienteExcel(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente,bancoAgregarPagoCliente,horaAgregarPago, pagoDerivado, nombreCliente, fechaRegistroPagoCliente){
        return  $.ajax({
            url: '/fn_consulta_AgregarPagoCliente2',
            method: 'GET',
            data: {
                codigoCliente: codigoCliente,
                montoAgregarPagoCliente: montoAgregarPagoCliente,
                fechaAgregarPagoCliente: fechaAgregarPagoCliente,
                formaDePago:formaDePago,
                codAgregarPagoCliente:codAgregarPagoCliente,
                comentarioAgregarPagoCliente:comentarioAgregarPagoCliente,
                bancoAgregarPagoCliente:bancoAgregarPagoCliente,
                horaAgregarPago:horaAgregarPago,
                pagoDerivado:pagoDerivado,
                nombreCliente:nombreCliente,
                fechaRegistroPagoCliente:fechaRegistroPagoCliente,
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

    fn_TraerEgresosCajaChica();

    var egresosCajaChicaArreglo = [];

    function fn_TraerEgresosCajaChica() {
        $.ajax({
            url: '/fn_consulta_TraerEgresosCajaChica2',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response) && response.length > 0) {
                    // Transformar el JSON a un arreglo de strings
                    let egresosArreglo = response.map(function(item) {
                        return item.uso_detalle_egreso;
                    });
                    
                    // Asignar el arreglo transformado a egresosCajaChicaArreglo
                    egresosCajaChicaArreglo = egresosArreglo;
                    // console.log(egresosCajaChicaArreglo);
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    $(document).on("input", ".autocompleteEgresosCajaChica", function() {
        let input = $(this);
        let value = input.val().toUpperCase();  // Convertir a mayúsculas
        input.val(value);  // Asignar el valor en mayúsculas

        let suggestion = "";

        if (value.length > 0) {
            let regex = new RegExp("^" + value, "i");
            let match = egresosCajaChicaArreglo.find(function(word) {
                return word.match(regex);
            });

            if (match) {
                suggestion = match.toUpperCase();  // Asegurarse de que la sugerencia también esté en mayúsculas
            }
        }

        if (suggestion) {
            input.val(suggestion);
            input[0].setSelectionRange(value.length, suggestion.length);
        }
    });

    $(document).on("keydown", ".autocompleteEgresosCajaChica", function(e) {
        let input = $(this);
        let value = input.val().toUpperCase();
        let start = input[0].selectionStart;
        let end = input[0].selectionEnd;

        if (e.key === "Tab" || e.key === "Enter" || e.key === "ArrowRight") {
            let suggestion = "";

            if (value.length > 0) {
                let regex = new RegExp("^" + value, "i");
                let match = egresosCajaChicaArreglo.find(function(word) {
                    return word.match(regex);
                });

                if (match) {
                    suggestion = match.toUpperCase();  // Asegurarse de que la sugerencia también esté en mayúsculas
                }
            }

            if (suggestion) {
                e.preventDefault();
                input.val(suggestion);
                input[0].setSelectionRange(suggestion.length, suggestion.length);
            }
        } else if (e.key === "Backspace") {
            if (start === end && end < value.length) {
                input.val(value.substring(0, start));
                input[0].setSelectionRange(start, start);
                e.preventDefault();
            } else {
                input.val(value.substring(0, start - 1) + value.substring(end));
                input[0].setSelectionRange(start - 1, start - 1);
                e.preventDefault();
            }
        }
    });

    tablaEditableEgreso()
    function tablaEditableEgreso(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePagosExcelEgreso');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntradaEgreso(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntradaEgreso(tbody) {

        const ahoraEnNY2 = new Date();
        const hours = ahoraEnNY2.getHours().toString().padStart(2, '0');
        const minutes = ahoraEnNY2.getMinutes().toString().padStart(2, '0');
        const seconds = ahoraEnNY2.getSeconds().toString().padStart(2, '0');
        const currentTime = hours + ":" + minutes + ":" + seconds;

        let nuevaFila = $('<tr class="bg-white pagosAgregarExcelEgreso border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer dark:text-white text-gray-900">');
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text(currentTime));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white" contenteditable="false">').html(`<input type="text" class="autocompleteEgresosCajaChica text-sm bg-transparent dark:text-white text-gray-900 border-none">`));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap accionarSumaMonto validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap accionarSumaMonto validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="false">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="true">').text(""));
        tbody.append(nuevaFila);
    
        // Evento para agregar una nueva fila si la actual no está vacía
        nuevaFila.on('input', function() {
            let vacio = true;
            nuevaFila.find('td').each(function() {
                if ($(this).text().trim() !== "") {
                    vacio = false;
                }
            });
            if (!vacio) {
                agregarFilaEntradaEgreso(tbody);
                // copiarDatosPenultimaFila4();
                nuevaFila.off('input');
            }
        });
    
        // Evento para calcular y actualizar el resultado
        nuevaFila.on('input', '.accionarSumaMonto', function() {
            let cantidad = parseFloat(nuevaFila.find('td').eq(2).text().trim()) || 1;
            let precio = parseFloat(nuevaFila.find('td').eq(3).text().trim()) || 0;
            let resultado = cantidad * precio;
            nuevaFila.find('td').eq(4).text(resultado.toFixed(2));
        });
    };

    $(document).on('input', '.validarFormatoHoraTablas', function () {
        let inputValue = $(this).text();
        let regex = /^(?:2[0-3]|[01][0-9]):(?:[0-5][0-9]):(?:[0-5][0-9])$/;
    
        // Verificar si el valor cumple con el formato de hora HH:MM:SS
        if (regex.test(inputValue)) {
            $(this).css('background-color', 'rgb(22 163 74)');
        } else {
            $(this).css('background-color', 'rgb(185 28 28)');
        }
    });

    $(document).on('input', '.accionarSumaMonto', function () {
        let fila = $(this).closest('tr');
        let cantidad = parseFloat(fila.find('td').eq(2).text().trim()) || 1;
        let precio = parseFloat(fila.find('td').eq(3).text().trim()) || 0;
        let resultado = cantidad * precio;
        fila.find('td').eq(4).text(resultado.toFixed(2));
    });  

    function hacerCeldasEditables(tbody) {
        tbody.on('keydown', 'td[contenteditable="true"], td input', function(e) {
            let currentElement = $(this);
            let currentTd = currentElement.closest('td');
            let currentRow = currentTd.parent();
            let currentTdIndex = currentTd.index();
    
            function focusNextCell(nextTd) {
                while (nextTd.length && !nextTd.is('[contenteditable="true"]') && !nextTd.find('input').length) {
                    nextTd = nextTd.next();
                }
                if (nextTd.length) {
                    let nextInput = nextTd.find('input').first();
                    if (nextInput.length) {
                        nextInput.focus();
                    } else {
                        nextTd.focus();
                    }
                }
            }
    
            function focusPrevCell(prevTd) {
                while (prevTd.length && !prevTd.is('[contenteditable="true"]') && !prevTd.find('input').length) {
                    prevTd = prevTd.prev();
                }
                if (prevTd.length) {
                    let prevInput = prevTd.find('input').first();
                    if (prevInput.length) {
                        prevInput.focus();
                    } else {
                        prevTd.focus();
                    }
                }
            }
    
            if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
    
                if (e.key === "ArrowRight") {
                    let nextTd = currentTd.nextAll('td').first();
                    if (nextTd.length) {
                        focusNextCell(nextTd);
                    } else {
                        let nextRow = currentRow.next();
                        if (nextRow.length) {
                            let nextTdInNextRow = nextRow.children().eq(currentTdIndex);
                            focusNextCell(nextTdInNextRow);
                        }
                    }
                } else if (e.key === "ArrowLeft") {
                    let prevTd = currentTd.prevAll('td').first();
                    if (prevTd.length) {
                        focusPrevCell(prevTd);
                    } else {
                        let prevRow = currentRow.prev();
                        if (prevRow.length) {
                            let prevTdInPrevRow = prevRow.children().eq(currentTdIndex);
                            focusPrevCell(prevTdInPrevRow);
                        }
                    }
                } else if (e.key === "ArrowDown") {
                    let nextRow = currentRow.next();
                    if (nextRow.length) {
                        let nextTdInNextRow = nextRow.children().eq(currentTdIndex);
                        focusNextCell(nextTdInNextRow);
                    }
                } else if (e.key === "ArrowUp") {
                    let prevRow = currentRow.prev();
                    if (prevRow.length) {
                        let prevTdInPrevRow = prevRow.children().eq(currentTdIndex);
                        focusPrevCell(prevTdInPrevRow);
                    }
                }
            }
        });
    }    

    $(document).on("click", "#btnAgregarEgreso", function() {
        $("#btnAgregarEgreso").attr('disabled','disabled');
        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcelEgreso:not(:last-child)').length;

        if(totalRequests == 0){
            $("#btnAgregarEgreso").removeAttr('disabled');
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
                        title: 'Se registraron todos los egresos correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // Realizar la acción después de que todas las consultas se completen
                $('#ModalAgregarEgreso').addClass('hidden');
                $('#ModalAgregarEgreso').removeClass('flex');
                $("#btnAgregarEgreso").removeAttr('disabled');
                $("#btnBuscarDetallesEgresos").trigger('click');
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcelEgreso:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaDetalle = $('#fechaAgregarEgreso').val();
            let categoriaDetalle = $('#selectAgregarCategoria').val();
            let horaDetalle = filaActual.find('td:eq(0)').text().trim();
            let usoReporteEgreso = filaActual.find('td:eq(1)').find('input').val().trim();
            let cantidadAgregEgresoCliente = filaActual.find('td:eq(2)').text().trim();
            let precioEgresoCliente = filaActual.find('td:eq(3)').text().trim();
            let montoAgregEgresoCliente = filaActual.find('td:eq(4)').text().trim();
            let comentarioAgregarPagoCliente = filaActual.find('td:eq(5)').text().trim();

            let pagoDerivado = "6";
            let codCliente = "33";
            let formaDePagoEgreso = "Flete";
            let codAgregEgresoCliente = "";
            let bancoAgregEgresoCliente = "FLETE";

            let montoEgresoPagoo = parseFloat(montoAgregEgresoCliente)*-1;

            if (!precioEgresoCliente, !montoAgregEgresoCliente) {
                alertify.notify('Los campos de precios no pueden estar vacios', 'error', 3);
                failedRequests++;
            }else{
                if (usoReporteEgreso.includes("FLETE")) {
                    fn_AgregarPagoClienteExcel(codCliente, montoEgresoPagoo, fechaDetalle, formaDePagoEgreso, codAgregEgresoCliente, comentarioAgregarPagoCliente, bancoAgregEgresoCliente, horaDetalle, pagoDerivado, usoReporteEgreso, fechaDetalle)
                }
                fn_AgregarDetalleEgreso(fechaDetalle, horaDetalle, usoReporteEgreso, cantidadAgregEgresoCliente, precioEgresoCliente, montoAgregEgresoCliente, comentarioAgregarPagoCliente, categoriaDetalle)
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

    $(document).on('input', '.validarSoloNumerosDosDecimalesTablas', function (event) {
        let inputValue = $(this).text();
        let originalValue = inputValue;
    
        // Elimina todos los caracteres excepto los dígitos y un punto decimal
        inputValue = inputValue.replace(/[^0-9.]/g, '');
    
        // Verifica si ya hay un punto decimal presente
        if (inputValue.indexOf('.') !== -1) {
            // Si ya hay un punto, elimina los puntos adicionales
            inputValue = inputValue.replace(/(\..*)\./g, '$1');
    
            // Limita el número de decimales a dos
            let decimalPart = inputValue.split('.')[1];
            if (decimalPart && decimalPart.length > 2) {
                decimalPart = decimalPart.substring(0, 2);
                inputValue = inputValue.split('.')[0] + '.' + decimalPart;
            }
        }
    
        // Si el valor ha cambiado, actualizar el contenido
        if (inputValue !== originalValue) {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let cursorPosition = range.startOffset;
    
            $(this).text(inputValue);
    
            // Restaurar la posición del cursor
            let newRange = document.createRange();
            newRange.setStart(this.firstChild, cursorPosition);
            newRange.setEnd(this.firstChild, cursorPosition);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    });

});
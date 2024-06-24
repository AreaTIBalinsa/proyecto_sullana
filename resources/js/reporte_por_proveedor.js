import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    
    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorProveedor').val(fechaHoy);
    $('#fechaHastaReportePorProveedor').val(fechaHoy);
    $('#fechaRegistrarGuia').val(fechaHoy);

    fn_ConsultarProveedor(fechaHoy,fechaHoy);
    fn_declararProveedor();
    fn_declararProveedorEditar();

    $('#btnBuscarReportePorProveedor').on('click', function () {
        let fechaDesde = $('#fechaDesdeReportePorProveedor').val();
        let fechaHasta = $('#fechaHastaReportePorProveedor').val();
        fn_ConsultarProveedor(fechaDesde, fechaHasta);
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
                    let tbodyProveedor = $('#bodyReportePorProveedor');
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
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" colspan="7">').text(""));
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
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.pesoBrutoGuia));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.pesoTaraGuia));
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((pesoNeto).toFixed(2)+" Kg."));
                                
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((promedio).toFixed(2)));
                                if (tipoUsuario =='Administrador'){
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(precioGuia.toFixed(2)));
                                    nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("S/. "+(totalAPagar).toFixed(2)));
                                }
                                nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-center items-center gap-2">').append($('<button class="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-lg btnEditarReportePorProveedor">').html("<i class='bx bxs-edit text-base'></i>")).append($('<button class="bg-red-600 hover:bg-red-700 p-2 rounded-lg btnEliminarReportePorProveedor">').html("<i class='bx bxs-trash text-base' ></i>"))
                                );
                                
                                // Agregar la nueva fila al tbody
                                tbodyProveedor.append(nuevaFila);
                            }
                        });
                        if (tipoUsuario =='Administrador'){
                            nuevaFila = $('<tr class="bg-white dark:bg-gray-800 h-0.5">');
                            nuevaFila.append($('<td class="dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="9">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            tbodyProveedor.append(nuevaFila);
                            nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("TOTALES:"));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((cantidadAProveedoresPorDia == 1 ? `${cantidadAProveedoresPorDia} Ud.` : `${cantidadAProveedoresPorDia} Uds.`)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(pesoBrutoProveedoresPorDia.toFixed(2) + " Kg."));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(pesoTaraProveedoresPorDia.toFixed(2) + " Kg."));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(pesoAProveedoresPorDia.toFixed(2) + " Kg."));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("S/. "+pagoAProveedoresPorDia.toFixed(2)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                            tbodyProveedor.append(nuevaFila);
                        }
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

    $(document).on('input', '#valorCantidadAgregarGuia', function () {
        let inputValue = $(this).val();
        inputValue = inputValue.replace(/[^0-9]/g, '');

        $(this).val(inputValue);
    });

    function fn_declararProveedor(){
        $.ajax({
            url: '/fn_consulta_DatosProveedor',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacion = $('#idProveedorAgregarGuia');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacion.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectPresentacion.append($('<option>', {
                        value: '0',
                        text: 'Seleccione proveedor',
                        disabled: true,
                        selected: true
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        console.log(obj);
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
                        });
                        selectPresentacion.append(option);
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

    function fn_declararProveedorEditar(){
        $.ajax({
            url: '/fn_consulta_DatosProveedor',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacionEditar = $('#idProveedorAgregarGuiaEditar');
                    
                    // Vaciar el select actual, si es necesario
                    selectPresentacionEditar.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
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

    $('.cerrarModalRegistrarGuias, #ModalRegistrarGuias .opacity-75').on('click', function (e) {
        $('#ModalRegistrarGuias').addClass('hidden');
        $('#ModalRegistrarGuias').removeClass('flex');
    });

    $('#btnAgregarGuiasReportePorProveedor').on('click', function () {
        $('#ModalRegistrarGuias').addClass('flex');
        $('#ModalRegistrarGuias').removeClass('hidden');
        $('#valorNumeroGuiaAgregarGuia').focus();

        $('#valorNumeroGuiaAgregarGuia').val('');
        $('#fechaRegistrarGuia').val(fechaHoy);
        $('#idProveedorAgregarGuia').val($('#idProveedorAgregarGuia option:first').val());
        $('#idEspecieAgregarGuia').val($('#idEspecieAgregarGuia option:first').val());
        $('#valorCantidadAgregarGuia').val('');
        $('#valorPesoBruto').val('');
        $('#valorPesoTara').val('');
        $('#valorPrecioAgregarGuia').val('');
    });

    $('#btnGuardarRegistrarGuias').on('click', function () {
        let idProveedor = $('#idProveedorAgregarGuia').val();
        let cantidadAgregarGuia = $('#valorCantidadAgregarGuia').val();
        let precioPesoBruto = $('#valorPesoBruto').val();
        let precioPesoTara = $('#valorPesoTara').val();
        let precioAgregarGuia = $('#valorPrecioAgregarGuia').val();
        let fechaRegistrarGuia = $('#fechaRegistrarGuia').val();
        let valorNumeroGuiaAgregarGuia = $('#valorNumeroGuiaAgregarGuia').val();
        
        fn_RegistrarGuia(idProveedor,cantidadAgregarGuia,precioPesoBruto,precioPesoTara,precioAgregarGuia,fechaRegistrarGuia,valorNumeroGuiaAgregarGuia);

    });

    $('#btnGuardarRegistrarGuiasEditar').on('click', function () {
        let idProveedorEditar = $('#idProveedorAgregarGuiaEditar').val();
        let cantidadAgregarGuiaEditar = $('#valorCantidadAgregarGuiaEditar').val();
        let pesoAgregarGuiaEditar = $('#valorPesoAgregarGuiaEditar').val();
        let precioAgregarGuiaEditar = $('#valorPrecioAgregarGuiaEditar').val();
        let pesoBrutoEditar = $('#valorPesoBrutoEditar').val();
        let pesoTaraEditar = $('#valorPesoTaraEditar').val();
        let fechaRegistrarGuiaEditar = $('#fechaRegistrarGuiaEditar').val();
        let valorNumeroGuiaAgregarGuiaEditar = $('#valorNumeroGuiaAgregarGuiaEditar').val();
        let idActualizarGuia = $('#idGuiaEditar').attr('value');
        
        fn_RegistrarGuiaEditar(idActualizarGuia,idProveedorEditar,cantidadAgregarGuiaEditar,pesoAgregarGuiaEditar,precioAgregarGuiaEditar,pesoBrutoEditar,pesoTaraEditar,fechaRegistrarGuiaEditar,valorNumeroGuiaAgregarGuiaEditar);

    });

    function fn_RegistrarGuiaEditar(idActualizarGuia,idProveedorEditar,cantidadAgregarGuiaEditar,pesoAgregarGuiaEditar,precioAgregarGuiaEditar,pesoBrutoEditar,pesoTaraEditar,fechaRegistrarGuiaEditar,valorNumeroGuiaAgregarGuiaEditar){
        $.ajax({
            url: '/fn_consulta_RegistrarGuiaEditar',
            method: 'GET',
            data: {
                idActualizarGuia:idActualizarGuia,
                idProveedorEditar: idProveedorEditar,
                cantidadAgregarGuiaEditar:cantidadAgregarGuiaEditar,
                pesoAgregarGuiaEditar:pesoAgregarGuiaEditar,
                pesoBrutoEditar:pesoBrutoEditar,
                pesoTaraEditar:pesoTaraEditar,
                precioAgregarGuiaEditar:precioAgregarGuiaEditar,
                fechaRegistrarGuiaEditar:fechaRegistrarGuiaEditar,
                valorNumeroGuiaAgregarGuiaEditar:valorNumeroGuiaAgregarGuiaEditar,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo la guia correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#ModalRegistrarGuiasEditar').addClass('hidden');
                    $('#ModalRegistrarGuiasEditar').removeClass('flex');
                    $('#btnBuscarReportePorProveedor').trigger('click');
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

    function fn_RegistrarGuia(idProveedor,cantidadAgregarGuia,precioPesoBruto,precioPesoTara,precioAgregarGuia,fechaRegistrarGuia,valorNumeroGuiaAgregarGuia){
        $.ajax({
            url: '/fn_consulta_RegistrarGuia',
            method: 'GET',
            data: {
                idProveedor: idProveedor,
                cantidadAgregarGuia:cantidadAgregarGuia,
                precioPesoBruto:precioPesoBruto,
                precioPesoTara:precioPesoTara,
                precioAgregarGuia:precioAgregarGuia,
                fechaRegistrarGuia:fechaRegistrarGuia,
                valorNumeroGuiaAgregarGuia:valorNumeroGuiaAgregarGuia,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro la guia correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#ModalRegistrarGuias').addClass('hidden');
                    $('#ModalRegistrarGuias').removeClass('flex');
                    $('#btnBuscarReportePorProveedor').trigger('click');
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

    $(document).on('click', '.btnEliminarReportePorProveedor', function () {
        let codigoGuia = $(this).closest("tr").find("td:first").text();
        Swal.fire({
            title: '¿Desea eliminar la guia?',
            text: "¡Estas seguro de eliminar la guia!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                fn_EliminarGuia(codigoGuia);
            }
          })
    });

    function fn_EliminarGuia(codigoGuia){
        $.ajax({
            url: '/fn_consulta_EliminarGuia',
            method: 'GET',
            data: {
                codigoGuia: codigoGuia,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino la guia correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#btnBuscarReportePorProveedor').trigger('click');
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

    $(document).on('click', '.btnEditarReportePorProveedor', function () {
        let codigoGuia = $(this).closest("tr").find("td:first").text();
        fn_EditarGuia(codigoGuia);
    });

    $('.cerrarModalRegistrarGuiasEditar, #ModalRegistrarGuiasEditar .opacity-75').on('click', function (e) {
        $('#ModalRegistrarGuiasEditar').addClass('hidden');
        $('#ModalRegistrarGuiasEditar').removeClass('flex');
    });

    function fn_EditarGuia(codigoGuia){
        $.ajax({
            url: '/fn_consulta_EditarGuia',
            method: 'GET',
            data: {
                codigoGuia: codigoGuia,
            },
            success: function(response) {

                response.forEach(function(obj) {

                    $('#idProveedorAgregarGuiaEditar').val(obj.idProveedor);
                    $('#idEspecieAgregarGuiaEditar').val(obj.idEspecie);
                    $('#valorCantidadAgregarGuiaEditar').val(obj.cantidadGuia);
                    $('#valorPrecioAgregarGuiaEditar').val(obj.precioGuia);
                    $('#valorPesoBrutoEditar').val(obj.pesoBrutoGuia);
                    $('#valorPesoTaraEditar').val(obj.pesoTaraGuia);
                    $('#fechaRegistrarGuiaEditar').val(obj.fechaGuia);
                    $('#valorNumeroGuiaAgregarGuiaEditar').val(obj.numGuia);
                    $('#idGuiaEditar').attr("value",obj.idGuia);
                    $('#idProveedorAgregarGuiaEditar').trigger('change');

                    $('#ModalRegistrarGuiasEditar').addClass('flex');
                    $('#ModalRegistrarGuiasEditar').removeClass('hidden');

                });
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
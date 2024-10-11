import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    const fechaHoyTabla = new Date().toISOString().split('T')[0].split('-').reverse().join('-');
    var arregloProveedores = [];
    
    // Asignar la fecha actual a los inputs
    $('#fechaDesdeReportePorProveedor').val(fechaHoy);
    $('#fechaDesdeReportePorProveedorControlStock').val(fechaHoy);
    $('#fechaHastaReportePorProveedor').val(fechaHoy);
    $('#fechaHastaReportePorProveedorControlStock').val(fechaHoy);
    $('#fechaRegistrarGuia').val(fechaHoy);

    fn_ConsultarProveedor(fechaHoy,fechaHoy);
    fn_TraerPagosFechasProveedores(fechaHoy,fechaHoy);
    fn_TraerControlStock(fechaHoy,fechaHoy);
    fn_declararProveedor();
    fn_declararProveedorStock();
    fn_declararProveedorEditar();

    $('#btnBuscarReportePorProveedor').on('click', function () {
        let fechaDesdeReportePorProveedor = $('#fechaDesdeReportePorProveedor').val();
        let fechaHastaReportePorProveedor = $('#fechaHastaReportePorProveedor').val();
        fn_TraerPagosFechasProveedores(fechaDesdeReportePorProveedor,fechaHastaReportePorProveedor);
        fn_ConsultarProveedor(fechaDesdeReportePorProveedor, fechaHastaReportePorProveedor);
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
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" colspan="9">').text(""));
                            tbodyProveedor.append(nuevaFila);
                        }

                        response.forEach(function (obj) {
                            if (item.fechaGuia === obj.fechaGuia) {
                                nuevaFila = $('<tr class="bg-white border-b h-12 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
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
                        
                        nuevaFila = $('<tr class="bg-white dark:bg-gray-800 h-0.5">');
                        nuevaFila.append($('<td class="dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        nuevaFila.append($('<td class="text-center h-0.5 bg-gray-800 dark:bg-gray-300" colspan="9">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        tbodyProveedor.append(nuevaFila);
                        nuevaFila = $('<tr class="bg-white h-12 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("TOTALES :"));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text((cantidadAProveedoresPorDia == 1 ? `${cantidadAProveedoresPorDia} Ud.` : `${cantidadAProveedoresPorDia} Uds.`)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(pesoBrutoProveedoresPorDia.toFixed(2) + " Kg."));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(pesoTaraProveedoresPorDia.toFixed(2) + " Kg."));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(pesoAProveedoresPorDia.toFixed(2) + " Kg."));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        if (tipoUsuario =='Administrador'){
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text("S/. "+pagoAProveedoresPorDia.toFixed(2)));
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(""));
                        }
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

                    arregloProveedores = response;

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
                        // console.log(obj);
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

        let especie = "";

        if(idProveedor == 1){
            especie = "TECNICA"
        }else if(idProveedor == 2 || idProveedor == 3 || idProveedor == 4 || idProveedor == 5 || idProveedor == 6 || idProveedor == 7 || idProveedor == 11 || idProveedor == 12){
            especie = "YUGO"
        }else if(idProveedor == 8){
            especie = "MASAY"
        }else if(idProveedor == 9){
            especie = "CHIMU"
        }else if(idProveedor == 10){
            especie = "OTROS"
        }else if(idProveedor == 19){
            especie = "SALOMON"
        }else if(idProveedor == 20){
            especie = "ATOCHE"
        }
        
        fn_RegistrarGuia(idProveedor,cantidadAgregarGuia,precioPesoBruto,precioPesoTara,precioAgregarGuia,fechaRegistrarGuia,valorNumeroGuiaAgregarGuia, especie);

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

        let especie = "";
        
        fn_RegistrarGuiaEditar(idActualizarGuia,idProveedorEditar,cantidadAgregarGuiaEditar,pesoAgregarGuiaEditar,precioAgregarGuiaEditar,pesoBrutoEditar,pesoTaraEditar,fechaRegistrarGuiaEditar,valorNumeroGuiaAgregarGuiaEditar, especie);

    });

    function fn_RegistrarGuiaEditar(idActualizarGuia,idProveedorEditar,cantidadAgregarGuiaEditar,pesoAgregarGuiaEditar,precioAgregarGuiaEditar,pesoBrutoEditar,pesoTaraEditar,fechaRegistrarGuiaEditar,valorNumeroGuiaAgregarGuiaEditar, especie){
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
                especie:especie,
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

    function fn_RegistrarGuia(idProveedor,cantidadAgregarGuia,precioPesoBruto,precioPesoTara,precioAgregarGuia,fechaRegistrarGuia,valorNumeroGuiaAgregarGuia, especie){
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
                especie:especie,
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

    function fn_TraerPagosFechasProveedores(fechaDesdeTraerProveedores, fechaHastaTraerProveedores) {
        $.ajax({
            url: '/fn_consulta_TraerPagosFechasProveedores',
            method: 'GET',
            data: {
                fechaDesdeTraerProveedores: fechaDesdeTraerProveedores,
                fechaHastaTraerProveedores: fechaHastaTraerProveedores,
            },
            success: function(response) {
                // console.log(response)
                if (Array.isArray(response)) {
                    let tbodyReporteDePagosProveedores = $('#bodyReporteDePagosProveedores');
                    tbodyReporteDePagosProveedores.empty();
    
                    let totalPago = 0;
                    let nuevaFila = "";
    
                    response.forEach(function(obj) {
                        totalPago += parseFloat(obj.cantidadAbonoPag);

                        nuevaFila = $('<tr class="editarPagos bg-white text-gray-900 h-12 dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
                        nuevaFila.append($('<td class="hidden">').text(obj.idPagos));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 font-medium py-2 text-center cursor-pointer whitespace-nowrap">').text(obj.fechaOperacionPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 font-medium py-2 text-center text-gray-900 whitespace-nowrap dark:text-white uppercase">').text(obj.codigoCli));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 font-medium py-2 text-center cursor-pointer whitespace-nowrap">').text(parseFloat(obj.cantidadAbonoPag).toFixed(2)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 font-medium py-2 text-center cursor-pointer whitespace-nowrap">').text(obj.codigoTransferenciaPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 font-medium py-2 text-center cursor-pointer whitespace-nowrap">').text(obj.horaOperacionPag));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 font-medium py-2 text-center cursor-pointer whitespace-nowrap">').text(obj.bancaPago));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 font-medium py-2 text-center cursor-pointer whitespace-nowrap">').text(obj.tipoAbonoPag));
                        nuevaFila.append($('<td class="p-2 text-center cursor-pointer">').text(obj.observacion));
                        nuevaFila.append($('<td class="p-2 text-center cursor-pointer hidden">').text(obj.codigoCli));
                        tbodyReporteDePagosProveedores.append(nuevaFila);
                    });
    
                    if (response.length == 0) {
                        tbodyReporteDePagosProveedores.html(`<tr class="rounded-lg border-2 border-r-[1px] dark:border-gray-700"><td colspan="8" class="text-center">No hay datos</td></tr>`);
                    }else{
                        agregarFilaTotal(tbodyReporteDePagosProveedores, totalPago);
                    }
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });
    }

    function agregarFilaTotal(tbody, totalPago) {
        let nuevaFila = $('<tr class="bg-white border-b text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');
        nuevaFila.append($('<td class="border-r dark:border-r-gray-700 border-t-2 border-t-white p-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">').text("SALDO TOTAL:"));
        nuevaFila.append($('<td class="border-r dark:border-r-gray-700 border-t-2 border-t-white p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="border-r dark:border-r-gray-700 border-t-2 border-t-white p-2 text-center cursor-pointer whitespace-nowrap">').text("S/. " + totalPago.toFixed(2)));
        nuevaFila.append($('<td class="border-r dark:border-r-gray-700 border-t-2 border-t-white p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="border-r dark:border-r-gray-700 border-t-2 border-t-white p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="border-r dark:border-r-gray-700 border-t-2 border-t-white p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="border-r dark:border-r-gray-700 border-t-2 border-t-white p-2 text-center cursor-pointer">').text(""));
        nuevaFila.append($('<td class="p-2 text-center cursor-pointer border-t-2 border-t-white">').text(""));
        tbody.append(nuevaFila);
    }

    tablaEditable()
    function tablaEditable(){
        let tbodyReporteDePagosExcel = $('#bodyReporteDePagosExcel');
        tbodyReporteDePagosExcel.empty();
        agregarFilaEntrada(tbodyReporteDePagosExcel);
        hacerCeldasEditables(tbodyReporteDePagosExcel);
    }

    function agregarFilaEntrada(tbody) {
        let nuevaFila = $('<tr class="bg-white pagosAgregarExcel border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">');
        nuevaFila.append($('<td class="outline-none border-l-2 border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoFechaTablas text-gray-900 dark:text-white" contenteditable="true">').text(`${fechaHoyTabla}`));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase nombreClienteTablaExcel" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarSoloNumerosDosDecimalesTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap validarFormatoHoraTablas text-gray-900 dark:text-white" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap convertirMayusculasTablas bancoCopiar" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none border-r dark:border-gray-700 p-2 text-center cursor-pointer whitespace-nowrap" contenteditable="false">').html(`<select class="w-full uppercase outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="YUGO">YUGO</option>
            <option value="TECNICA">TECNICA</option>
            </select>`));
        nuevaFila.append($('<td class="outline-none border-r-[1px] dark:border-gray-700 p-2 text-center cursor-pointer" contenteditable="true">').text(""));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden" contenteditable="true">').text("1"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer hidden codigoDeClienteTablaExcel" contenteditable="false">').text("0"));
        nuevaFila.append($('<td class="outline-none p-2 text-center cursor-pointer validarFormatoFechaTablas text-gray-900 dark:text-white fechaRegistroPago" contenteditable="true">').text(`${fechaHoyTabla}`));
        tbody.append(nuevaFila);
    
        // nuevaFila.find('.nombreClienteTablaExcel').on('input', function() {
        //     let inputText = $(this).text().trim();
        //     let currentCell = $(this);
        //     let codigoClienteCell = currentCell.closest('tr').find('td').eq(9); 
    
        //     if (inputText.length >= 1) { // Activar autocompletar después de 3 caracteres
        //         currentCell.removeClass('bg-green-500');
                
        //         codigoClienteCell.text("0");
        //         fn_TraerClientesAgregarPagoClienteTablaExcel(inputText, (clientes) => {
        //             if (clientes) {
        //                 showSuggestions(currentCell, clientes);
        //             } else {
        //                 $('.suggestions-list').remove();
        //                 currentCell.removeClass('bg-green-500');
        //                 codigoClienteCell.text("0");
        //             }
        //         });
        //     } else {
        //         currentCell.removeClass('bg-green-500');
        //         hideSuggestions(currentCell);
        //         codigoClienteCell.text("0");
        //     }
        // });
    
        // nuevaFila.find('.nombreClienteTablaExcel').on('keydown', function(e) {
        //     let suggestionsList = $('.suggestions-list');
        //     let highlighted = suggestionsList.find('.highlighted');
        //     if (e.key === 'ArrowDown') {
        //         if (highlighted.length === 0) {
        //             suggestionsList.children().first().addClass('highlighted');
        //         } else {
        //             highlighted.removeClass('highlighted').next().addClass('highlighted');
        //         }
        //         e.preventDefault();
        //     } else if (e.key === 'ArrowUp') {
        //         if (highlighted.length !== 0) {
        //             highlighted.removeClass('highlighted').prev().addClass('highlighted');
        //         }
        //         e.preventDefault();
        //     } else if (e.key === 'Enter') {
        //         if (highlighted.length !== 0) {
        //             highlighted.click();
        //             e.preventDefault();
        //         }
        //     }
        // });
    
        nuevaFila.on('input', function() {
            let vacio = true;
            nuevaFila.find('td').each(function() {
                if ($(this).text().trim() !== "") {
                    vacio = false;
                }
            });
            if (!vacio) {
                agregarFilaEntrada(tbody);
                copiarDatosPenultimaFila();
                nuevaFila.off('input');
            }
        });
    }
    
    function copiarDatosPenultimaFila() {
        let filas = $('.pagosAgregarExcel');
        if (filas.length > 1) {
            let penultimaFila = filas.eq(filas.length - 2);
            let ultimaFila = filas.eq(filas.length - 1);
            let datosColumna0 = penultimaFila.find('td').eq(0).text();
            let datosColumna5 = penultimaFila.find('td').eq(5).text();
            let datosColumna10 = penultimaFila.find('td').eq(10).text();
            
            ultimaFila.find('td').eq(0).text(datosColumna0);
            ultimaFila.find('td').eq(5).text(datosColumna5.toLocaleUpperCase());
            ultimaFila.find('td').eq(10).text(datosColumna10);
        }
    } 
    
    function fn_TraerClientesAgregarPagoClienteTablaExcel(inputAgregarPagoCliente, callback) {
        if (Array.isArray(arregloProveedores) && arregloProveedores.length > 0) {
            const filteredClients = arregloProveedores.filter(cliente =>
                cliente.nombreEspecie.includes(inputAgregarPagoCliente.toUpperCase())
            );
            callback(filteredClients);
        } else {
            callback(null);
        }
    }
    
    function showSuggestions(cell, clientes) {
        hideSuggestions(cell); // Remove existing suggestions if any
    
        let suggestions = $('<div class="suggestions-list bg-white border-2 border-gray-500"></div>').css({
            position: 'absolute',
            zIndex: 1000
        });
    
        clientes.forEach(cliente => {
            let suggestionItem = $('<div class="suggestion-item p-1"></div>').text(cliente.nombreEspecie).css({
                cursor: 'pointer'
            });
    
            suggestionItem.on('click', function() {
                cell.text(cliente.nombreEspecie);
                cell.data('selectedCliente', cliente);
                cell.addClass('bg-green-500');
                hideSuggestions(cell);

                let codigoClienteCell = cell.closest('tr').find('td').eq(9); 
                codigoClienteCell.text(cliente.idEspecie);
            });
    
            suggestions.append(suggestionItem);
        });
    
        $('body').append(suggestions);
        let offset = cell.offset();
        suggestions.css({ top: offset.top + cell.outerHeight(), left: offset.left });
    }
    
    function hideSuggestions(cell) {
        $('.suggestions-list').remove();
    }
    
    function hacerCeldasEditables(tbody) {
        tbody.on('keydown', 'td[contenteditable="true"]', function(e) {
            let currentTd = $(this);
            let currentRow = currentTd.parent();
            let currentTdIndex = currentTd.index();
    
            if (e.key === "ArrowRight") {
                e.preventDefault();
                let nextTd = currentTd.nextAll('td[contenteditable="true"]').first();
                if (nextTd.length) {
                    nextTd.focus();
                } else {
                    let nextRow = currentRow.next();
                    if (nextRow.length) {
                        nextRow.children('td[contenteditable="true"]').first().focus();
                    }
                }
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                let prevTd = currentTd.prevAll('td[contenteditable="true"]').first();
                if (prevTd.length) {
                    prevTd.focus();
                } else {
                    let prevRow = currentRow.prev();
                    if (prevRow.length) {
                        prevRow.children('td[contenteditable="true"]').last().focus();
                    }
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                let nextRow = currentRow.next();
                if (nextRow.length) {
                    nextRow.children().eq(currentTdIndex).focus();
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                let prevRow = currentRow.prev();
                if (prevRow.length) {
                    prevRow.children().eq(currentTdIndex).focus();
                }
            }
        });
    }

    $(document).on('input', '.validarFormatoFechaTablas', function () {
        copiarDatosPenultimaFila();
        let inputValue = $(this).text();
        let regex = /^\d{2}-\d{2}-\d{4}$/; // Expresión regular para formato dd-mm-yyyy
        
        // Verificar si el valor cumple con el formato de fecha DD-MM-YYYY
        if (regex.test(inputValue)) {
            // Convertir el formato dd-mm-yyyy a yyyy-mm-dd
            let partesFecha = inputValue.split('-');
            let inputDate = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
            let currentDate = new Date();
            
            // Comparar con la fecha actual (solo la fecha, sin la hora)
            if (inputDate <= currentDate.setHours(0,0,0,0)) {
                $(this).css('background-color', 'rgb(22 163 74)');
            } else {
                $(this).css('background-color', 'rgb(185 28 28)');
            }
        } else {
            $(this).css('background-color', 'rgb(185 28 28)');
        }
    });  
    
    $(document).on('input', '.bancoCopiar', function () {
        copiarDatosPenultimaFila();
    });

    $(document).on('input', '.fechaRegistroPago', function () {
        // Obtener el valor del input actual
        let valor = $(this).text().trim();
        
        // Actualizar todas las celdas con la clase 'fechaRegistroPago' excepto la actual
        $('.fechaRegistroPago').not(this).each(function () {
            $(this).text(valor);
        });
    });    
    
    // validarFormatoHoraTablas

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

    $(document).on('click', function (event) {
        let contenedorClientes = $('#contenedorClientesCuentaDelCliente');
        let inputCuentaDelCliente = $('#idCuentaDelCliente');

        if (!contenedorClientes.is(event.target) && contenedorClientes.has(event.target).length === 0 && !inputCuentaDelCliente.is(event.target)) {
            contenedorClientes.addClass('hidden');
        }
    });

    $(document).on('input', '.convertirMayusculasTablas', function () {
        let inputValue = $(this).text();
    
        // Convertir el valor a mayúsculas
        let inputValueMayusculas = inputValue.toUpperCase();
    
        // Si el valor ha cambiado, actualizar el contenido
        if (inputValue !== inputValueMayusculas) {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let cursorPosition = range.startOffset;
    
            $(this).text(inputValueMayusculas);
    
            // Restaurar la posición del cursor
            let newRange = document.createRange();
            newRange.setStart(this.firstChild, cursorPosition);
            newRange.setEnd(this.firstChild, cursorPosition);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
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

    $(document).on('click', '#registrar_agregarPagos_Excel', function () {

        $("#registrar_agregarPagos_Excel").attr('disabled','disabled');

        let arregloCodigos = [];

        $('.pagosAgregarExcel:not(:last-child)').each(function() {
            let filaActual = $(this);
            let codAgregarPagoCliente = filaActual.find('td:eq(3)').text().trim();
            if (codAgregarPagoCliente != ""){
                if(arregloCodigos.includes(codAgregarPagoCliente)){
                    filaActual.remove();
                }else{
                    arregloCodigos.push(codAgregarPagoCliente);
                }
            }
        });

        // Crear contadores para realizar una acción después de todas las consultas completadas y fallidas
        let completedRequests = 0;
        let failedRequests = 0;
        let totalRequests = $('.pagosAgregarExcel:not(:last-child)').length;

        if(totalRequests == 0){
            $("#registrar_agregarPagos_Excel").removeAttr('disabled');
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
                        title: 'Se registraron todos los pagos correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // Realizar la acción después de que todas las consultas se completen
                let fechaDesdeReportePorProveedor = $('#fechaDesdeReportePorProveedor').val();
                let fechaHastaReportePorProveedor = $('#fechaHastaReportePorProveedor').val();
                fn_TraerPagosFechasProveedores(fechaDesdeReportePorProveedor,fechaHastaReportePorProveedor);
                fn_ConsultarProveedor(fechaDesdeReportePorProveedor, fechaHastaReportePorProveedor);
                $("#registrar_agregarPagos_Excel").removeAttr('disabled');
            }
        }
    
        // Recorrer todas las filas con la clase pagosAgregarExcel, excluyendo la última fila
        $('.pagosAgregarExcel:not(:last-child)').each(function() {
            let filaActual = $(this); // Guardar referencia a la fila actual
    
            // Obtener los datos de cada celda de la fila actual
            let fechaAgregarPagoCliente = filaActual.find('td:eq(0)').text().trim();
            fechaAgregarPagoCliente = fechaAgregarPagoCliente.split('-').reverse().join('-');
            let nombreCliente = filaActual.find('td:eq(1)').text().trim();
            let montoAgregarPagoCliente = filaActual.find('td:eq(2)').text().trim();
            let codAgregarPagoCliente = filaActual.find('td:eq(3)').text().trim();
            let horaAgregarPago = filaActual.find('td:eq(4)').text().trim();
            let bancoAgregarPagoCliente = filaActual.find('td:eq(5)').text().trim();
            let formaDePago = "Transferencia"
            let especie = filaActual.find('td:eq(6)').find('select').val().trim();
            let comentarioAgregarPagoCliente = filaActual.find('td:eq(7)').text().trim();
            let pagoDerivado = filaActual.find('td:eq(8)').text().trim();
            let codigoCliente = filaActual.find('td:eq(9)').text().trim();
            let fechaRegistroPagoCliente = filaActual.find('td:eq(10)').text().trim();
            fechaRegistroPagoCliente = fechaRegistroPagoCliente.split('-').reverse().join('-');

            // if(codigoCliente == 1){
            //     especie = "TECNICA"
            // }else if(codigoCliente == 2 || codigoCliente == 3 || codigoCliente == 4 || codigoCliente == 5 || codigoCliente == 6 || codigoCliente == 7 || codigoCliente == 11 || codigoCliente == 12){
            //     especie = "YUGO"
            // }else if(codigoCliente == 8){
            //     especie = "MASAY"
            // }else if(codigoCliente == 9){
            //     especie = "CHIMU"
            // }else if(codigoCliente == 10){
            //     especie = "OTROS"
            // }else if(codigoCliente == 19){
            //     especie = "SALOMON"
            // }else if(codigoCliente == 20){
            //     especie = "ATOCHE"
            // }
    
            formaDePago = formaDePago[0].toUpperCase() + formaDePago.slice(1);
    
            // Validar que montoAgregarPagoCliente no esté vacío
            if (!montoAgregarPagoCliente) {
                alertify.notify('El campo importe no puede estar vacio', 'error', 3);
                failedRequests++;
            }else {
                $.ajax({
                    url: '/fn_consulta_VerificarCodigoPagoProveedores',
                    method: 'GET',
                    data: {
                        codAgregarPagoCliente: codAgregarPagoCliente,
                    },
                    success: function(response) {
                        // Verificar si la respuesta es un arreglo de objetos
                        if (Array.isArray(response) && response.length > 0) {
                            response = response[0];
                            let responseNombre = response.nombreCompleto;
                            let responseFecha = response.fechaOperacionPag;
                            let responseHora = response.horaOperacionPag;
                            let responseBanco = response.bancaPago;
                            let responseCodTransferencia = response.codigoTransferenciaPag;
                            let responseMonto = response.cantidadAbonoPag;
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: 'Codigo de Operación Encontrado',
                                html: (`
                                    <hr>
                                    <br>
                                    <ul style="text-align: left; list-style-position: inside;">
                                        <li><b>Nombre : </b>${responseNombre}</li>
                                        <li><b>Fecha : </b>${responseFecha}</li>
                                        <li><b>Hora : </b>${responseHora}</li>
                                        <li><b>Monto : </b>${responseMonto}</li>
                                        <li><b>Banco : </b>${responseBanco}</li>
                                        <li><b>Codigo de Tranferencia : </b>${responseCodTransferencia}</li>
                                    </ul>`),
                            });
                            failedRequests++;
                            checkCompletion();
                        } else {
                            // Llamar a la función fn_AgregarPagoCliente con los datos de la fila actual
                            fn_AgregarPagoClienteExcel(nombreCliente, montoAgregarPagoCliente, fechaAgregarPagoCliente, formaDePago, codAgregarPagoCliente, comentarioAgregarPagoCliente, bancoAgregarPagoCliente, horaAgregarPago, pagoDerivado, nombreCliente, fechaRegistroPagoCliente, especie)
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
                    },
                    error: function(error) {
                        console.error("ERROR", error);
                        failedRequests++;
                        checkCompletion();
                    }
                });
            }
        });
    }); 

    function fn_AgregarPagoClienteExcel(codigoCliente,montoAgregarPagoCliente,fechaAgregarPagoCliente,formaDePago,codAgregarPagoCliente,comentarioAgregarPagoCliente,bancoAgregarPagoCliente,horaAgregarPago, pagoDerivado, nombreCliente, fechaRegistroPagoCliente, especie){
        return  $.ajax({
            url: '/fn_consulta_AgregarPagoClienteProveedores',
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
                fechaRegistroPagoCliente: fechaRegistroPagoCliente,
                especie: especie,
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

    $(document).on('contextmenu', '.editarPagos', function (e) {
        e.preventDefault();
        let codigoPago = $(this).closest("tr").find("td:first").text();
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
            fn_EliminarPesada(codigoPago);
            }
        })
    });

    function fn_EliminarPesada(codigoPago){
        $.ajax({
            url: '/fn_consulta_EliminarPagoProveedor',
            method: 'GET',
            data: {
                codigoPago: codigoPago,
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
                    // Realizar la acción después de que todas las consultas se completen
                    let fechaDesdeReportePorProveedor = $('#fechaDesdeReportePorProveedor').val();
                    let fechaHastaReportePorProveedor = $('#fechaHastaReportePorProveedor').val();
                    fn_TraerPagosFechasProveedores(fechaDesdeReportePorProveedor,fechaHastaReportePorProveedor);
                    fn_ConsultarProveedor(fechaDesdeReportePorProveedor, fechaHastaReportePorProveedor);
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

    $('.cerrarModalAgregarPagoProveedoresEditar, #ModalAgregarPagoProveedoresEditar .opacity-75').on('click', function (e) {
        $('#ModalAgregarPagoProveedoresEditar').addClass('hidden');
        $('#ModalAgregarPagoProveedoresEditar').removeClass('flex');
    });

    $(document).on("dblclick", "tr.editarPagos", function() {
        let fila = $(this).closest('tr');
        let idReporteDePago= fila.find('td:eq(0)').text();
        let fecha= fila.find('td:eq(1)').text();
        let nombreCliente= fila.find('td:eq(2)').text();
        let importe= fila.find('td:eq(3)').text();
        let codigoTransferencia= fila.find('td:eq(4)').text();
        let hora= fila.find('td:eq(5)').text();
        let banco= fila.find('td:eq(6)').text();
        let formaDePago= fila.find('td:eq(7)').text();
        let observacion= fila.find('td:eq(8)').text();
        let codigoCli= fila.find('td:eq(9)').text();

        $("#inputNombreClientes").val(nombreCliente);
        $("#clienteSeleccionadoCorrecto").removeClass("hidden");
        $("#clienteSeleccionadoCorrecto").addClass("flex");
        $("#codigoClienteSeleccionado").val(codigoCli);
        $("#fechaAgregarPagoEditar").val(fecha);
        $("#horaAgregarPagoEditar").val(hora);
        $("#valorAgregarPagoClienteEditar").val(importe);
        $("#bancoAgregarPagoClienteEditar").val(banco);
        $("#codAgregarPagoClienteEditar").val(codigoTransferencia);
        $("#formaDePagoEditar").val(formaDePago);
        $("#comentarioAgregarPagoClienteEditar").val(observacion);
        $("#idEditarPagoProveedor").val(idReporteDePago);
        
        $('#ModalAgregarPagoProveedoresEditar').addClass('flex');
        $('#ModalAgregarPagoProveedoresEditar').removeClass('hidden');
    });

    // Primer filtro Nombre

    let selectedIndex = -1;

    $('#inputNombreClientes').on('input', function () {
        $('#codigoClienteSeleccionado').val(0);
        $("#clienteSeleccionadoCorrecto").removeClass("flex");
        $("#clienteSeleccionadoCorrecto").addClass("hidden");
        const searchTerm = $(this).val().toLowerCase();
        const $filtrarClientes = $("#inputNombreClientes").val();
        const filteredClientes = arregloProveedores.filter(cliente =>
            cliente.nombreEspecie.toLowerCase().includes(searchTerm)
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
    
    function displayClientes(arregloProveedores) {
        const $contenedor = $('#contenedorDeClientes');
        $contenedor.empty();
        if (arregloProveedores.length > 0) {
            $contenedor.removeClass('hidden');
            arregloProveedores.forEach(cliente => {
                const $div = $('<div class="text-gray-800 text-sm dark:text-white font-medium cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:hover:bg-gray-700 hover:bg-gray-200"></div>')
                    .text(cliente.nombreEspecie)
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
        $('#inputNombreClientes').val(cliente.nombreEspecie);
        $('#codigoClienteSeleccionado').val(cliente.idEspecie);
        $('#contenedorDeClientes').addClass('hidden');
        $("#clienteSeleccionadoCorrecto").removeClass("hidden");
        $("#clienteSeleccionadoCorrecto").addClass("flex");
        selectedIndex = -1;
    }

    $(document).on('click', '#btnAgregarPagoClienteEditar', function (e) {
        let nombreCliente = $("#inputNombreClientes").val();
        let codigoEspecie = $("#codigoClienteSeleccionado").val();
        let fechaPago = $("#fechaAgregarPagoEditar").val();
        let horaPago = $("#horaAgregarPagoEditar").val();
        let importePago = $("#valorAgregarPagoClienteEditar").val();
        let bancoPago = $("#bancoAgregarPagoClienteEditar").val();
        let codigoTransferencia = $("#codAgregarPagoClienteEditar").val();
        let formaPago = $("#formaDePagoEditar").val();
        let comentarioPago = $("#comentarioAgregarPagoClienteEditar").val();
        let idPagoEditar = $("#idEditarPagoProveedor").val();

        if (nombreCliente === '' || codigoEspecie === '0' || fechaPago === '' || horaPago === '' || importePago === '' || bancoPago === '' || codigoTransferencia === '' || formaPago === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios, excepto comentario',
            })
            return;
        }else{
            $.ajax({
                url: '/fn_consulta_actualizarPagoProveedor',
                method: 'GET',
                data: {
                    codigoEspecie: codigoEspecie,
                    fechaPago: fechaPago,
                    horaPago: horaPago,
                    importePago: importePago,
                    bancoPago: bancoPago,
                    codigoTransferencia: codigoTransferencia,
                    formaPago: formaPago,
                    comentarioPago: comentarioPago,
                    idPago: idPagoEditar,
                },
                success: function(response) {
                    if (response.success) {
                        Swal.fire({
                            position: 'center',
                            icon:'success',
                            title: 'Se actualizo el registro correctamente',
                            showConfirmButton: false,
                            timer: 2000
                        });

                        // Realizar la acción después de que todas las consultas se completen
                        let fechaDesdeReportePorProveedor = $('#fechaDesdeReportePorProveedor').val();
                        let fechaHastaReportePorProveedor = $('#fechaHastaReportePorProveedor').val();
                        fn_TraerPagosFechasProveedores(fechaDesdeReportePorProveedor,fechaHastaReportePorProveedor);
                        fn_ConsultarProveedor(fechaDesdeReportePorProveedor, fechaHastaReportePorProveedor);
                        $('#ModalAgregarPagoProveedoresEditar').addClass('hidden');
                        $('#ModalAgregarPagoProveedoresEditar').removeClass('flex');
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

    $(document).on('input', '.mayusculasGaaa', function () {
        let inputValue = $(this).text();
    
        // Convertir el valor a mayúsculas
        let inputValueMayusculas = inputValue.toUpperCase();
    
        // Si el valor ha cambiado, actualizar el contenido
        if (inputValue !== inputValueMayusculas) {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let cursorPosition = range.startOffset;
    
            $(this).text(inputValueMayusculas);
    
            // Restaurar la posición del cursor
            let newRange = document.createRange();
            newRange.setStart(this.firstChild, cursorPosition);
            newRange.setEnd(this.firstChild, cursorPosition);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    });

    function fn_TraerControlStock(fechaDesde,fechaHasta){
        $.ajax({
            url: '/fn_consulta_TraerControlStock',
            method: 'GET',
            data: {
                fechaDesde: fechaDesde,
                fechaHasta: fechaHasta,
            },
            success: function(response) {
                if (Array.isArray(response)) {
                    let tbodyReporteControlStock = $('#bodyReporteControlStock');
                    tbodyReporteControlStock.empty();

                    let totalCantidades = 0;
                    let totalPeso = 0;
                    let totalDinero = 0;

                    response.forEach(function (obj) {
                        totalCantidades += parseInt(obj.cantidad_stock);
                        totalPeso += parseFloat(obj.peso_stock);
                        let total = parseFloat(obj.precio_stock) * parseInt(obj.peso_stock)
                        totalDinero += total;
                        let nuevaFila = `
                        <tr class="bg-white eliminarStock border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 text-gray-900 dark:text-white dark:hover:bg-gray-600 cursor-pointer">
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap hidden">${obj.id_stock}</td>
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${obj.fecha_stock}</td>
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${obj.nombreEspecie}</td>
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${obj.cantidad_stock}</td>
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${obj.peso_stock}</td>
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap hidden">${obj.idProveedor}</td>
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${obj.precio_stock}</td>
                            <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${(total).toFixed(2)}</td>
                        </tr>
                        `;
                        tbodyReporteControlStock.append(nuevaFila);
                    });

                    let nuevaFila = `
                    <tr class="bg-blue-600 dark:border-gray-700 text-white cursor-pointer font-bold">
                        <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap"></td>
                        <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">TOTAL :</td>
                        <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${totalCantidades} ${totalCantidades != 1 ? "Uds." : "Ud."}</td>
                        <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">${totalPeso.toFixed(2)} Kg.</td>
                        <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap"></td>
                        <td class="border-r dark:border-gray-700 px-4 py-2 text-center whitespace-nowrap">S/. ${totalDinero.toFixed(2)}</td>
                    </tr>
                    `;
                    tbodyReporteControlStock.append(nuevaFila);
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
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
    };

    function fn_declararProveedorStock(){
        $.ajax({
            url: '/fn_consulta_DatosProveedorStock',
            method: 'GET',
            success: function(response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Obtener el select
                    let selectPresentacion = $('#idProveedorAgregarStock');
                    let selectPresentacionEditar = $('#idProveedorAgregarStockEditar');
                    
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
                        // console.log(obj);
                        let option = $('<option>', {
                            value: obj.idEspecie,
                            text: obj.nombreEspecie
                        });
                        selectPresentacion.append(option);
                    });

                    response.forEach(function(obj) {
                        // console.log(obj);
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


    $('.cerrarModalRegistrarStock, #ModalRegistrarStock .opacity-75').on('click', function (e) {
        $('#ModalRegistrarStock').addClass('hidden');
        $('#ModalRegistrarStock').removeClass('flex');
    });
    $('.cerrarModalRegistrarStockEditar, #ModalRegistrarStockEditar .opacity-75').on('click', function (e) {
        $('#ModalRegistrarStockEditar').addClass('hidden');
        $('#ModalRegistrarStockEditar').removeClass('flex');
    });

    $('#btnAgregarStockReportePorProveedor').on('click', function () {
        $('#ModalRegistrarStock').addClass('flex');
        $('#ModalRegistrarStock').removeClass('hidden');

        $('#fechaRegistrarStock').val(fechaHoy);
        $('#idProveedorAgregarStock').val($('#idProveedorAgregarStock option:first').val());
        $('#valorCantidadAgregarStock').val("");
        $('#valorPesoStock').val("");
        $('#valorPrecioStock').val("");
    });

    $('#btnGuardarRegistrarStock').on('click', function () {
        let fechaStock = $('#fechaRegistrarStock').val();
        let idProveedor = $('#idProveedorAgregarStock').val();
        let valorCantidad = $('#valorCantidadAgregarStock').val();
        let valorPeso = $('#valorPesoStock').val();
        let precioNuevo = $('#valorPrecioStock').val();

        if(!idProveedor || !valorCantidad || !valorPeso || !precioNuevo){
            alertify.notify('Debe rellenar todos los campos', 'error', 3);
        }else{
            fn_RegistrarStock(fechaStock, idProveedor , valorCantidad , valorPeso, precioNuevo)
        }
        
    });

    function fn_RegistrarStock(fechaStock, idProveedor , valorCantidad , valorPeso, precioNuevo){
        $.ajax({
            url: '/fn_consulta_RegistrarStock',
            method: 'GET',
            data: {
                fechaStock: fechaStock,
                idProveedor: idProveedor,
                valorCantidad: valorCantidad,
                valorPeso: valorPeso,
                precioNuevo: precioNuevo,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro el stock correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    // Realizar la acción después de que todas las consultas se completen
                    $('#ModalRegistrarStock').addClass('hidden');
                    $('#ModalRegistrarStock').removeClass('flex');
                    let fechaDesdeReportePorProveedorControlStock = $('#fechaDesdeReportePorProveedorControlStock').val();
                    let fechaHastaReportePorProveedorControlStock = $('#fechaHastaReportePorProveedorControlStock').val();
                    fn_TraerControlStock(fechaDesdeReportePorProveedorControlStock,fechaHastaReportePorProveedorControlStock);
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

    $(document).on('contextmenu', '.eliminarStock', function (e) {
        e.preventDefault();
        let codigoStock = $(this).closest("tr").find("td:first").text();
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
                fn_EliminarStock(codigoStock);
            }
        })
    });

    function fn_EliminarStock(codigoStock){
        $.ajax({
            url: '/fn_consulta_EliminarStock',
            method: 'GET',
            data: {
                codigoStock: codigoStock,
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
                    // Realizar la acción después de que todas las consultas se completen
                    let fechaDesdeReportePorProveedorControlStock = $('#fechaDesdeReportePorProveedorControlStock').val();
                    let fechaHastaReportePorProveedorControlStock = $('#fechaHastaReportePorProveedorControlStock').val();
                    fn_TraerControlStock(fechaDesdeReportePorProveedorControlStock,fechaHastaReportePorProveedorControlStock);
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

    $(document).on("dblclick", "tr.eliminarStock", function() {
        let fila = $(this).closest('tr');
        let idReporteDePago= fila.find('td:eq(0)').text();
        let fecha= fila.find('td:eq(1)').text();
        let cantidad= fila.find('td:eq(3)').text();
        let peso= fila.find('td:eq(4)').text();
        let proveedor= fila.find('td:eq(5)').text();
        let precio= fila.find('td:eq(6)').text();

        $("#idStockEditar").val(idReporteDePago);
        $("#fechaRegistrarStockEditar").val(fecha);
        $("#idProveedorAgregarStockEditar").val(proveedor);
        $("#valorCantidadAgregarStockEditar").val(cantidad);
        $("#valorPesoStockEditar").val(peso);
        $("#valorPrecioStockEditar").val(precio);
        
        $('#ModalRegistrarStockEditar').addClass('flex');
        $('#ModalRegistrarStockEditar').removeClass('hidden');
    });

    $('#btnGuardarRegistrarStockEditar').on('click', function () {
        let fechaStock = $('#fechaRegistrarStockEditar').val();
        let idProveedor = $('#idProveedorAgregarStockEditar').val();
        let valorCantidad = $('#valorCantidadAgregarStockEditar').val();
        let valorPeso = $('#valorPesoStockEditar').val();
        let precioNuevo = $('#valorPrecioStockEditar').val();
        let idStock = $('#idStockEditar').val();

        if(!idProveedor || !valorCantidad || !valorPeso || !idStock || !precioNuevo){
            alertify.notify('Debe rellenar todos los campos', 'error', 3);
        }else{
            fn_RegistrarStockEditar(fechaStock, idProveedor , valorCantidad , valorPeso, idStock, precioNuevo)
        }
        
    });

    function fn_RegistrarStockEditar(fechaStock, idProveedor , valorCantidad , valorPeso, idStock, precioNuevo){
        $.ajax({
            url: '/fn_consulta_RegistrarStockEditar',
            method: 'GET',
            data: {
                fechaStock: fechaStock,
                idProveedor: idProveedor,
                valorCantidad: valorCantidad,
                valorPeso: valorPeso,
                precioNuevo: precioNuevo,
                idStock: idStock
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se edito el registro correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    // Realizar la acción después de que todas las consultas se completen
                    $('#ModalRegistrarStockEditar').addClass('hidden');
                    $('#ModalRegistrarStockEditar').removeClass('flex');
                    let fechaDesdeReportePorProveedorControlStock = $('#fechaDesdeReportePorProveedorControlStock').val();
                    let fechaHastaReportePorProveedorControlStock = $('#fechaHastaReportePorProveedorControlStock').val();
                    fn_TraerControlStock(fechaDesdeReportePorProveedorControlStock,fechaHastaReportePorProveedorControlStock);
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

    $('#btnBuscarReportePorProveedorControlStock').on('click', function () {
        let fechaDesdeReportePorProveedorControlStock = $('#fechaDesdeReportePorProveedorControlStock').val();
        let fechaHastaReportePorProveedorControlStock = $('#fechaHastaReportePorProveedorControlStock').val();
        fn_TraerControlStock(fechaDesdeReportePorProveedorControlStock,fechaHastaReportePorProveedorControlStock);
    });

});
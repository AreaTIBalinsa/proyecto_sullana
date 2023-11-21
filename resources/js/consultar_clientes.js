import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function ($) {
    
    fn_ConsultarClientes();
    fn_TraerDocumentosEditar();
    fn_TraerZonasEditar();
    fn_TraerGruposConsultarClientes();
    fn_TraerGruposConsultarClientesEditar();

    DataTableED('#tablaConsultarClientes');

    function fn_ConsultarClientes() {
        $.ajax({
            url: '/fn_consulta_ConsultarClientes',
            method: 'GET',
            success: function (response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyConsultarClientes = $('#bodyConsultarClientes');
                    tbodyConsultarClientes.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idCliente));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').text(obj.codigoCli));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($(`<h5 class="min-w-max px-2">`).text(obj.nombreTipoDocumento)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.numDocumentoCli)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(fn_formatearCelular(obj.contactoCli))));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($(`<h5 class="max-w-[100px] m-auto px-2 overflow-hidden whitespace-nowrap text-ellipsis" x-data="tooltip()" x-spread="tooltip" x-position="top" title="${obj.direccionCli}">`).text(obj.direccionCli)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($(`<h5 class="m-auto px-2 overflow-hidden whitespace-nowrap">`).text(obj.nombreZon)));
                        if (obj.estadoCliente == "ACTIVO"){
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<p class="bg-[#0FDA62] text-xs text-gray-50 rounded-xl inline-block py-1 px-4 capitalize">').text(obj.estadoCliente)));
                        }else if(obj.estadoCliente == "INHABILITADO"){
                            nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<p class="bg-[#B9B9C0] text-xs text-gray-900 rounded-xl inline-block py-1 px-4 capitalize">').text(obj.estadoCliente)));
                        };
                        nuevaFila.append($('<td class="hidden">').text(obj.idGrupo));

                        
                        // Agregar la nueva fila al tbody
                        tbodyConsultarClientes.append(nuevaFila);
                    });
                    let nombreFiltrar = $('#filtrarConsultarClientes').val();
                    if (nombreFiltrar != ""){
                        $('#filtrarConsultarClientes').trigger('input');
                    }
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }

            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    }

    $('#filtrarConsultarClientes, #tipoPolloConsultarClientes').on('input change', function() {
        let nombreFiltrar = $('#filtrarConsultarClientes').val().toUpperCase(); // Obtiene el valor del campo de filtro de nombre
        let tipoPolloFiltrar = $('#tipoPolloConsultarClientes').val(); // Obtiene el valor seleccionado del select
    
        // Mostrar todas las filas
        $('#tablaConsultarClientes tbody tr').show();
    
        // Filtrar por nombre si se proporciona un valor
        if (nombreFiltrar) {
            $('#tablaConsultarClientes tbody tr').each(function() {
                let nombre = $(this).find('td:eq(2)').text().toUpperCase().trim();
                if (nombre.indexOf(nombreFiltrar) === -1) {
                    $(this).hide();
                }
            });
        }
    
        // Filtrar por tipo de pollo si se selecciona un valor en el select
        if (tipoPolloFiltrar !== "0") {
            $('#tablaConsultarClientes tbody tr').each(function() {
                let columna = $(this).find('td:eq(9)').text().trim(); // Considerando que la columna es la 10 (índice 9)
                if (columna !== tipoPolloFiltrar) {
                    $(this).hide();
                }
            });
        }
    });     

    function fn_TraerGruposConsultarClientes(){
        $.ajax({
            url: '/fn_consulta_TraerGruposConsultarClientes',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectTipoPollo = $('#tipoPolloConsultarClientes');
                    // Vaciar el select actual, si es necesario
                    selectTipoPollo.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectTipoPollo.append($('<option>', {
                        value: '0',
                        text: 'Todos'
                    }));

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idGrupo,
                            text: obj.nombreGrupo
                        });
                        selectTipoPollo.append(option);
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

    function fn_TraerGruposConsultarClientesEditar(){
        $.ajax({
            url: '/fn_consulta_TraerGruposConsultarClientes',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectTipoPolloEditar = $('#valorEditarTipoDePollo');
                    // Vaciar el select actual, si es necesario
                    selectTipoPolloEditar.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idGrupo,
                            text: obj.nombreGrupo
                        });
                        selectTipoPolloEditar.append(option);
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

    function fn_TraerZonasEditar(){
        $.ajax({
            url: '/fn_consulta_TraerZonas',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectZona = $('#valorEditarZonaCliente');
                    
                    // Vaciar el select actual, si es necesario
                    selectZona.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idZona,
                            text: obj.nombreZon
                        });
                        selectZona.append(option);
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

    function fn_TraerDocumentosEditar(){
        $.ajax({
            url: '/fn_consulta_TraerDocumentos',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectDocumentos = $('#valorEditarTipoDeDocumento');
                    
                    // Vaciar el select actual, si es necesario
                    selectDocumentos.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        let option = $('<option>', {
                            value: obj.idTipoDocumento,
                            text: obj.nombreTipoDocumento
                        });
                        selectDocumentos.append(option);
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

    $('.cerrarModalEditarDatosdeCliente, .modal-content').on('click', function (e) {
        if (e.target === this) {
            $('#ModalEditarDatosdeCliente').addClass('hidden');
            $('#ModalEditarDatosdeCliente').removeClass('flex');
        }
    });

    function fn_formatearCelular(number) {
        // Convierte el número en una cadena y elimina los espacios existentes
        let numberStr = String(number).replace(/\s+/g, '');
    
        // Divide el número en grupos de tres dígitos
        let formattedNumber = numberStr.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    
        return formattedNumber;
    }

    $(document).on('input', '.especialDNI', function () {
        let inputValue = $(this).val();
        inputValue = inputValue.replace(/[^0-9]/g, '');

        if (inputValue.length > 8) {
            inputValue = inputValue.substr(0, 8);
        }

        $(this).val(inputValue);
    });
    
    $(document).on('input', '.especialRUC', function () {
        let inputValue = $(this).val();
        inputValue = inputValue.replace(/[^0-9]/g, '');

        if (inputValue.length > 11) {
            inputValue = inputValue.substr(0, 11);
        }

        $(this).val(inputValue);
    });
    
    $(document).on('input', '.especialPasaporte', function () {
        let inputValue = $(this).val();
        inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    
        if (inputValue.length > 20) {
            inputValue = inputValue.substr(0, 20);
        }
    
        $(this).val(inputValue);
    }); 

    $("#valorEditarTipoDeDocumento").on("change", function () {
        // Obtén el valor seleccionado del select
        let tipoDocumento = $(this).val();
        $("#valorEditarNumeroDeDocumento").removeClass("especialDNI rounded-bl-lg especialRUC especialPasaporte");
        $("#valorEditarNumeroDeDocumento").val("");
        
        if (tipoDocumento == 1) {
            $("#valorEditarNumeroDeDocumento").addClass("especialDNI");
        }else if (tipoDocumento == 2) {
            $("#valorEditarNumeroDeDocumento").addClass("especialPasaporte");
        }else if (tipoDocumento == 3) {
            $("#valorEditarNumeroDeDocumento").addClass("especialRUC");
        }
    });

    $(document).on("dblclick", "#tablaConsultarClientes tbody tr ", function() {
        let codigoCli = $(this).find('td:eq(1)').text();

        fn_TraerConsultarClienteEditar(codigoCli)

        function fn_TraerConsultarClienteEditar(codigoCli){
            $.ajax({
                url: '/fn_consulta_TraerConsultarClienteEditar',
                method: 'GET',
                data:{
                    codigoCli:codigoCli,
                },
                success: function(response) {
    
                    // Verificar si la respuesta es un arreglo de objetos
                    if (Array.isArray(response)) {
    
                        // Iterar sobre los objetos y mostrar sus propiedades
                        response.forEach(function(obj) {

                            $("#valorEditarCodigoCliente").val(obj.codigoCli);
                            $("#valorEditarTipoDePollo").val(obj.idGrupo);
                            $("#valorEditarNombresCliente").val(obj.nombresCli);
                            $("#valorEditarTipoDeDocumento").val(obj.tipoDocumentoCli);
                            $("#valorEditarNumeroDeCelular").val(fn_formatearCelular(obj.contactoCli));                            
                            $("#valorEditarDireccionCliente").val(obj.direccionCli);
                            $("#valorEditarZonaCliente").val(obj.idZona);
                            $("#valorEditarApellidoPaternoCliente").val(obj.apellidoPaternoCli);
                            $("#valorEditarApellidoMaternoCliente").val(obj.apellidoMaternoCli);
                            $("#valorEditarComentario").val(obj.comentarioCli);

                            let usuarioRegistroConsultar = "Cliente registrado por "+(obj.nombreCompletoUsu)+"."

                            $("#usuarioRegistroConsultar").html(usuarioRegistroConsultar)

                            $("#valorEditarNumeroDeDocumento").removeClass("especialDNI rounded-bl-lg especialRUC especialPasaporte");
                            
                            if (obj.tipoDocumentoCli == 1) {
                                $("#valorEditarNumeroDeDocumento").addClass("especialDNI");
                            }else if (obj.tipoDocumentoCli == 2) {
                                $("#valorEditarNumeroDeDocumento").addClass("especialPasaporte");
                            }else if (obj.tipoDocumentoCli == 3) {
                                $("#valorEditarNumeroDeDocumento").addClass("especialRUC");
                            }

                            $("#valorEditarNumeroDeDocumento").val(obj.numDocumentoCli);

                            if (obj.idEstadoCli == "1"){
                                $("#opcionActivo").prop("checked", true);
                            }else if(obj.idEstadoCli == "2"){
                                $("#opcionDeshabilitado").prop("checked", true);
                            }
                            $('#ModalEditarDatosdeCliente').addClass('flex');
                            $('#ModalEditarDatosdeCliente').removeClass('hidden');

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
    });

    $('#btnEditarDatosdeCliente').on('click', function () {
        let todosCamposCompletos = true;

        let tipoPollo = $('#valorEditarTipoDePollo').val();
        let codigoCli = $('#valorEditarCodigoCliente').val();
        let zonaPollo = $('#valorEditarZonaCliente').val();
        let nombresCli = $('#valorEditarNombresCliente').val().toUpperCase();
        let apellidoPaternoCli = $('#valorEditarApellidoPaternoCliente').val().toUpperCase();
        let apellidoMaternoCli = $('#valorEditarApellidoMaternoCliente').val().toUpperCase();
        let tipoDocumentoCli = $('#valorEditarTipoDeDocumento').val();
        let documentoCli = $('#valorEditarNumeroDeDocumento').val().toUpperCase();
        let contactoCli = $('#valorEditarNumeroDeCelular').val();
        let direccionCli = $('#valorEditarDireccionCliente').val();
        let comentarioCli = $('#valorEditarComentario').val();
        let estadoCli = $("input[name='opcionEstado']:checked").val();

        let zonaPolloTexto = $('#valorEditarZonaCliente option:selected').text();
        let tipoDocumentoCliTexto = $('#valorEditarTipoDeDocumento option:selected').text();
    
        $('#divEditarDatosClientes .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        if (todosCamposCompletos) {
            fn_ActualizarCliente(apellidoPaternoCli,apellidoMaternoCli,nombresCli,tipoDocumentoCli,documentoCli,contactoCli,direccionCli,estadoCli,codigoCli,tipoPollo,comentarioCli,zonaPollo,zonaPolloTexto,tipoDocumentoCliTexto);
        } else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Los campos no pueden estar vacios', 'error', 3);
        }
    });

    function fn_ActualizarCliente(apellidoPaternoCli,apellidoMaternoCli,nombresCli,tipoDocumentoCli,documentoCli,contactoCli,direccionCli,estadoCli,codigoCli,tipoPollo,comentarioCli,zonaPollo,zonaPolloTexto,tipoDocumentoCliTexto){
        $.ajax({
            url: '/fn_consulta_ActualizarCliente',
            method: 'GET',
            data: {
                apellidoPaternoCli: apellidoPaternoCli,
                apellidoMaternoCli: apellidoMaternoCli,
                nombresCli:nombresCli,
                tipoDocumentoCli:tipoDocumentoCli,
                documentoCli:documentoCli,
                contactoCli:contactoCli,
                direccionCli:direccionCli,
                estadoCli:estadoCli,
                codigoCli:codigoCli,
                idGrupo:tipoPollo,
                comentarioCli:comentarioCli,
                zonaPollo:zonaPollo,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo al cliente correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#bodyConsultarClientes tr').each(function () {
                        let idFila = $(this).find('td:eq(1)').text();
                        if (idFila == codigoCli) {
                            $(this).find('td:eq(2)').text(nombresCli+" "+apellidoPaternoCli+" "+apellidoMaternoCli);
                            $(this).find('td:eq(3)').text(tipoDocumentoCliTexto);
                            $(this).find('td:eq(4)').text(documentoCli);
                            $(this).find('td:eq(5)').text(contactoCli);
                            $(this).find('td:eq(6)').text(direccionCli);
                            $(this).find('td:eq(7)').text(zonaPolloTexto);
                            $(this).find('td:eq(8)').empty();
                            if (estadoCli == "1") {
                                $(this).find('td:eq(8)').append($('<p class="bg-[#0FDA62] text-xs text-gray-50 rounded-xl inline-block py-1 px-4 capitalize">ACTIVO</p>'));
                            } else if (estadoCli == "2") {
                                $(this).find('td:eq(8)').append($('<p class="bg-[#B9B9C0] text-xs text-gray-900 rounded-xl inline-block py-1 px-4 capitalize">INHABILITADO</p>'));
                            }
                            return false;
                        }
                    });
                    $('#ModalEditarDatosdeCliente').addClass('hidden');
                    $('#ModalEditarDatosdeCliente').removeClass('flex');
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

    $('#btnEliminarCliente').on('click', function () {
        let codigoCli = $('#valorEditarCodigoCliente').val();
        Swal.fire({
            title: '¿Desea eliminar el Cliente?',
            text: "¡Estas seguro de eliminar al cliente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: '¡No, cancelar!',
            confirmButtonText: '¡Si,eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              fn_EliminarCliente(codigoCli);
            }
          })
    });

    function fn_EliminarCliente(codigoCli){
        $.ajax({
            url: '/fn_consulta_EliminarCliente',
            method: 'GET',
            data: {
                codigoCli: codigoCli,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino al cliente correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    fn_ConsultarClientes();
                    $('#ModalEditarDatosdeCliente').addClass('hidden');
                    $('#ModalEditarDatosdeCliente').removeClass('flex');
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
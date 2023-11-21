import jQuery from 'jquery';

window.$ = jQuery;

jQuery(function($) {

    fn_TraerGrupos()
    fn_TraerZonas()
    fn_TraerCodigoCli()
    fn_TraerDocumentos()

    /* ============ Eventos ============ */
    
    $('#registroClientes .entradaEnMayusculas').on('input', function() {
        // Obtiene el valor actual del campo
        let valorCampo = $(this).val();
    
        // Convierte el valor a mayúsculas
        valorCampo = valorCampo.toUpperCase();
    
        // Establece el valor modificado en el campo
        $(this).val(valorCampo);
    }); 

    $('#registrar_usuario_submit').on('click', function () {
        let todosCamposCompletos = true;

        let tipoPollo = $('#tipoPollo').val();
        let codigoCli = $('#codigoCli').val();
        let zonaPollo = $('#zonaPollo').val();
        let nombresCli = $('#nombresCli').val().toUpperCase();
        let apellidoPaternoCli = $('#apellidoPaternoCli').val().toUpperCase();
        let apellidoMaternoCli = $('#apellidoMaternoCli').val().toUpperCase();
        let tipoDocumentoCli = $('#tipoDocumentoCli').val();
        let documentoCli = $('#documentoCli').val().toUpperCase();
        let contactoCli = $('#contactoCli').val();
        let direccionCli = $('#direccionCli').val();
        let comentarioCli = $('#comentarioCli').val();
        let estadoCli = 1
        let usuarioRegistroCli = $('#usuarioRegistroCli').data('id');
    
        $('#registroClientes .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });
    
        if (todosCamposCompletos) {
            fn_RegistrarCliente(apellidoPaternoCli,apellidoMaternoCli,nombresCli,tipoDocumentoCli,documentoCli,contactoCli,direccionCli,estadoCli,usuarioRegistroCli,codigoCli,tipoPollo,comentarioCli,zonaPollo);
        } else {
            // Mostrar una alerta de que debe completar los campos obligatorios
            alertify.notify('Debe rellenar todos los campos obligatorios', 'error', 3);
        }
    });
      
    // Asigna el evento "change" al select con id="tipoDocumentoCli"
    $("#tipoDocumentoCli").on("change", function () {
        // Obtén el valor seleccionado del select
        let tipoDocumento = $(this).val();
        // Llama a la función "validarDocumento()" con el valor seleccionado como parámetro
        if (tipoDocumento != 0){
            $("#documentoCli").removeAttr("disabled");
        }
        $("#documentoCli").removeClass("especialDNI rounded-bl-lg especialRUC especialPasaporte");
        $("#documentoCli").val("");
        
        if (tipoDocumento == 1) {
            $("#documentoCli").addClass("especialDNI rounded-bl-lg");
            $("#documentoCli").removeClass("rounded-b-lg");
            $("#especialBuscarPorDNI").removeClass("hidden");
            $("#especialBuscarPorDNI").addClass("flex");
            $("#documentoCli").removeClass("md:rounded-r-lg");
            $("#documentoCli").addClass("md:rounded-none");
        }else if (tipoDocumento == 2) {
            $("#documentoCli").addClass("rounded-b-lg especialPasaporte");
            $("#especialBuscarPorDNI").removeClass("flex");
            $("#especialBuscarPorDNI").addClass("hidden");
            $("#documentoCli").addClass("md:rounded-r-lg");
        }else if (tipoDocumento == 3) {
            $("#documentoCli").addClass("rounded-b-lg especialRUC");
            $("#especialBuscarPorDNI").removeClass("flex");
            $("#especialBuscarPorDNI").addClass("hidden");
            $("#documentoCli").addClass("md:rounded-r-lg");
        }
        else {
            $("#documentoCli").addClass("rounded-b-lg");
            $("#especialBuscarPorDNI").removeClass("flex");
            $("#especialBuscarPorDNI").addClass("hidden");
            $("#documentoCli").addClass("md:rounded-r-lg");
        }
    });

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

    /* ============ Funciones ============ */

    $('#especialBuscarPorDNI').on('click', function () {
        let dni = $('#documentoCli').val();
    
        $.ajax({
            url: '/consultarDNI',
            method: 'GET',
            data: { dni: dni },
            success: function (response) {
                $('#nombresCli').val(response.nombres)
                $('#apellidoPaternoCli').val(response.apellidoPaterno)
                $('#apellidoMaternoCli').val(response.apellidoMaterno)
            },
            error: function (error) {
                console.error("ERROR", error);
            }
        });
    });  

    function fn_TraerGrupos(){
        $.ajax({
            url: '/fn_consulta_TraerGrupos',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectTipoPollo = $('#tipoPollo');
                    
                    // Vaciar el select actual, si es necesario
                    selectTipoPollo.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectTipoPollo.append($('<option>', {
                        value: '0',
                        text: 'Seleccione tipo',
                        disabled: true,
                        selected: true
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

    function fn_TraerZonas(){
        $.ajax({
            url: '/fn_consulta_TraerZonas',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectZona = $('#zonaPollo');
                    
                    // Vaciar el select actual, si es necesario
                    selectZona.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectZona.append($('<option>', {
                        value: '0',
                        text: 'Seleccione zona',
                        disabled: true,
                        selected: true
                    }));

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

    function fn_TraerDocumentos(){
        $.ajax({
            url: '/fn_consulta_TraerDocumentos',
            method: 'GET',
            success: function(response) {

                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let selectDocumentos = $('#tipoDocumentoCli');
                    
                    // Vaciar el select actual, si es necesario
                    selectDocumentos.empty();

                    // Agregar la opción inicial "Seleccione tipo"
                    selectDocumentos.append($('<option>', {
                        value: '0',
                        text: 'Seleccione tipo de documento',
                        disabled: true,
                        selected: true
                    }));

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

    function fn_TraerCodigoCli(){
        $.ajax({
            url: '/fn_consulta_TraerCodigoCli',
            method: 'GET',
            success: function(response) {
                let codigoCli = response.codigoCli; // Obtener el valor de codigoCli
    
                // Verificar si codigoCli es un número
                if (typeof codigoCli === 'number') {
                    // Sumarle 1 al valor de codigoCli
                    let nuevoCodigoCli = codigoCli + 1;
                    let selectCodigoCli = $('#codigoCli');
                    selectCodigoCli.val(nuevoCodigoCli);
                } else {
                    console.log("El valor de codigoCli no es un número.");
                }
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }    

    function fn_RegistrarCliente(apellidoPaternoCli,apellidoMaternoCli,nombresCli,tipoDocumentoCli,documentoCli,contactoCli,direccionCli,estadoCli,usuarioRegistroCli,codigoCli,tipoPollo,comentarioCli,zonaPollo){
        $.ajax({
            url: '/fn_consulta_RegistrarCliente',
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
                usuarioRegistroCli:usuarioRegistroCli,
                codigoCli:codigoCli,
                idGrupo:tipoPollo,
                comentarioCli:comentarioCli,
                zonaPollo:zonaPollo
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro al cliente correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#registroClientes input, #registroClientes select, #registroClientes textarea').val('');
                    $('#registroClientes .validarCampo').each(function() {
                        $(this).removeClass('border-green-500 border-red-500').addClass('dark:border-gray-600 border-gray-300');
                    });
                    $("#documentoCli").removeClass("especialDNI");
                    $("#documentoCli").addClass("rounded-r-lg");
                    $("#especialBuscarPorDNI").removeClass("flex");
                    $("#especialBuscarPorDNI").addClass("hidden");
                    fn_TraerGrupos();
                    fn_TraerZonas();
                    fn_TraerCodigoCli();
                    fn_TraerDocumentos();
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
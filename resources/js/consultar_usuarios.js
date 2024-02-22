import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {

    fn_ConsultarUsuarios();
    var tipoUsuario = $('#tipoUsuario').data('id');
    var usuarioRegistroCli = $('#usuarioRegistroCli').data('id');

    function fn_ConsultarUsuarios() {
        $.ajax({
            url: '/fn_consulta_ConsultarUsuarios',
            method: 'GET',
            success: function (response) {
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyConsultarUsuarios = $('#bodyConsultarUsuarios');
                    tbodyConsultarUsuarios.empty();

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function (obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.id));
                        
                    //     nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">')
                    //     .append($('<h5 class="min-w-max px-2">').append($('<img src="' + obj.rutaPerfilUsu + '" alt="Perfil" class="absolute w-8 h-8 rounded-full">'),obj.nombreCompleto))
                    // );
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">').append($('<h5 class="min-w-max px-2">').text(obj.nombreCompleto)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($(`<h5 class="min-w-max px-2">`).text(obj.celularUsu)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.email)));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 p-2 text-center">').append($('<h5 class="min-w-max px-2">').text(obj.tipoUsu)));
                        
                        // Agregar la nueva fila al tbody
                        tbodyConsultarUsuarios.append(nuevaFila);
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

    $('.cerrarModalEditarDatosdeUsuario, #ModalEditarDatosdeUsuario .opacity-75').on('click', function (e) {
        $('#ModalEditarDatosdeUsuario').addClass('hidden');
        $('#ModalEditarDatosdeUsuario').removeClass('flex');
    });

    $(document).on("dblclick", "#tablaConsultarUsuarios tbody tr", function() {

        let codigoUsu = $(this).find('td:eq(0)').text();
    
        // Realizar una solicitud AJAX adicional para obtener datos adicionales
        $.ajax({
            url: '/fn_consulta_ConsultarUsuariosEditar',
            method: 'GET',
            data:{
                codigoUsu:codigoUsu,
            },
            success: function(response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        $("#valorEditarCodigoUsuario").val(obj.id);
                        $("#valorEditarApellidoPaternoUsuario").val(obj.apellidoPaternoUsu);
                        $("#valorEditarApellidoMaternoUsuario").val(obj.apellidoMaternoUsu);
                        $("#valorEditarNombresUsuario").val(obj.nombresUsu);
                        $("#valorEditarDniUsuario").val(obj.dniUsu);
                        $("#valorEditarNumeroDeCelularUsuario").val(obj.celularUsu);
                        $("#valorEditarDireccionUsuario").val(obj.direccionUsu);
                        $("#valorEditarTipoDeUsuario").val((obj.tipoUsu));
                        $("#valorEditarCorreoElectronicoUsuario").val(obj.email);
                        $("#valorEditarNombreDeUsuario").val(obj.username);
                        $("#valorEditarContrasenaUsuario").val("");

                        $("#valorEditarSexoUsuario").val(obj.sexoUsu);
                        if (obj.sexoUsu == "M"){
                            $("#opcionSexoMasculino").prop("checked", true);
                            $('#rutaPerfilUsuEditar').attr('value','img/hombre.png');
                        }else if(obj.sexoUsu == "F"){
                            $("#opcionSexoFemenino").prop("checked", true);
                            $('#rutaPerfilUsuEditar').attr('value','img/mujer.png');
                        }
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
                
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });

        $.ajax({
            url: '/fn_consulta_ConsultarRolesUsuariosEditar',
            method: 'GET',
            data:{
                codigoUsu:codigoUsu,
            },
            success: function(response) {
    
                // Verificar si la respuesta es un arreglo de objetos
                if (Array.isArray(response)) {
                    
                    let rolesUsuario = $('#EditarRolesUsuarios');
                    rolesUsuario.empty();
                    let nuevaFila = "";

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {

                        if (obj.estadoRol == "si"){
                            nuevaFila = $(`<div class="flex items-center gap-2 px-5 py-1 rounded-xl">
                            <input checked id="${obj.idSubMenu}" data-idRol="${obj.idRol}" data="${obj.idMenu}" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="${obj.idSubMenu}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${obj.nombreSubMenu}</label>
                            </div>`);
                        }else if (obj.estadoRol == "no"){
                            nuevaFila = $(`<div class="flex items-center gap-2 px-5 py-1 rounded-xl">
                            <input id="${obj.idSubMenu}" data-idRol="${obj.idRol}" data="${obj.idMenu}" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="${obj.idSubMenu}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${obj.nombreSubMenu}</label>
                            </div>`);
                        }

                        rolesUsuario.append(nuevaFila);

                        $('#ModalEditarDatosdeUsuario').addClass('flex');
                        $('#ModalEditarDatosdeUsuario').removeClass('hidden');
                    });
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
                
            },
            error: function(error) {
                console.error("ERROR", error);
            }
        });

    });

    $('#btnEditarDatosdeUsuario').on('click', function () {
        let todosCamposCompletos = true;
        let passwordActualizar = false; 

        let codigoUsu = $("#valorEditarCodigoUsuario").val();
        let apellidoPaternoUsu = $('#valorEditarApellidoPaternoUsuario').val();
        let apellidoMaternoUsu = $('#valorEditarApellidoMaternoUsuario').val();
        let nombresUsu = $('#valorEditarNombresUsuario').val();
        let dniUsu = $('#valorEditarDniUsuario').val();
        let celularUsu = $('#valorEditarNumeroDeCelularUsuario').val();
        let direccionUsu = $('#valorEditarDireccionUsuario').val();
        let tipoUsu = $('#valorEditarTipoDeUsuario option:selected').val();
        let email = $('#valorEditarCorreoElectronicoUsuario').val();
        let username = $('#valorEditarNombreDeUsuario').val();
        let sexoUsu  = $("input[name='opcionSexo']:checked").val();
        let password = $("#valorEditarContrasenaUsuario").val();

        $('#ModalEditarDatosdeUsuario .validarCampo').each(function() {
            let valorCampo = $(this).val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $(this).removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $(this).removeClass('border-red-500').addClass('border-green-500');
            }
        });

        if($('#opcionActualizarConstrasena').is(':checked')){
            passwordActualizar = true;
            let valorCampo = $("#valorEditarContrasenaUsuario").val();
    
            if (valorCampo === null || valorCampo.trim() === '') {
                $("#valorEditarContrasenaUsuario").removeClass('border-green-500 dark:border-gray-600 border-gray-300').addClass('border-red-500');
                todosCamposCompletos = false;
            } else {
                $("#valorEditarContrasenaUsuario").removeClass('border-red-500').addClass('border-green-500');
            }
        }

        // Llama a tu función de validación personalizada
        if (todosCamposCompletos) {
            if (passwordActualizar == true){
                fn_ActualizarUsuarioExtra(codigoUsu, apellidoPaternoUsu,apellidoMaternoUsu,nombresUsu,dniUsu,celularUsu,direccionUsu,tipoUsu,email,username,sexoUsu,password);
            }else if (passwordActualizar == false){
                fn_ActualizarUsuario(codigoUsu, apellidoPaternoUsu,apellidoMaternoUsu,nombresUsu,dniUsu,celularUsu,direccionUsu,tipoUsu,email,username,sexoUsu)
            }
        } else {
            // Si la validación falla, muestra un mensaje o realiza otra acción
            alertify.notify('Debe rellenar todos los campos', 'error', 3);
        }
    });

    $('#opcionActualizarConstrasena').on('change',function() {
        if ($(this).is(':checked')) {
            $('#valorEditarContrasenaUsuario').removeClass('hidden');
        } else {
            $('#valorEditarContrasenaUsuario').addClass('hidden');
        }
    });

    function fn_ActualizarUsuario(codigoUsu, apellidoPaternoUsu,apellidoMaternoUsu,nombresUsu,dniUsu,celularUsu,direccionUsu,tipoUsu,email,username,sexoUsu){
        $.ajax({
            url: '/fn_consulta_ActualizarUsuario',
            method: 'GET',
            data: {
                codigoUsu: codigoUsu,
                apellidoPaternoUsu: apellidoPaternoUsu,
                apellidoMaternoUsu: apellidoMaternoUsu,
                nombresUsu:nombresUsu,
                dniUsu:dniUsu,
                celularUsu:celularUsu,
                direccionUsu:direccionUsu,
                tipoUsu:tipoUsu,
                email:email,
                username:username,
                sexoUsu:sexoUsu,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el usuario correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });

                    $('#EditarRolesUsuarios input[type="checkbox"]').each(function() {
                        let idRol = $(this).attr('data-idRol');
                        let idMenu = $(this).attr('data');
                        let idSubMenu = $(this).attr('id');
                        let estadoRol = $(this).is(':checked') ? 'si' : 'no';
                        let codigoUsu = $("#valorEditarCodigoUsuario").val();
                        fn_RegistrarUsuarioRolesEditar(idRol, idMenu, idSubMenu, estadoRol, codigoUsu);
                    });
                    
                    fn_ConsultarUsuarios();
                    $('#ModalEditarDatosdeUsuario').addClass('hidden');
                    $('#ModalEditarDatosdeUsuario').removeClass('flex');
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

    function fn_ActualizarUsuarioExtra(codigoUsu, apellidoPaternoUsu,apellidoMaternoUsu,nombresUsu,dniUsu,celularUsu,direccionUsu,tipoUsu,email,username,sexoUsu,password){
        $.ajax({
            url: '/fn_consulta_ActualizarUsuarioExtra',
            method: 'GET',
            data: {
                codigoUsu: codigoUsu,
                apellidoPaternoUsu: apellidoPaternoUsu,
                apellidoMaternoUsu: apellidoMaternoUsu,
                nombresUsu:nombresUsu,
                dniUsu:dniUsu,
                celularUsu:celularUsu,
                direccionUsu:direccionUsu,
                tipoUsu:tipoUsu,
                email:email,
                username:username,
                sexoUsu:sexoUsu,
                password:password,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo el usuario correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });

                    $('#EditarRolesUsuarios input[type="checkbox"]').each(function() {
                        let idRol = $(this).attr('data-idRol');
                        let idMenu = $(this).attr('data');
                        let idSubMenu = $(this).attr('id');
                        let estadoRol = $(this).is(':checked') ? 'si' : 'no';
                        let codigoUsu = $("#valorEditarCodigoUsuario").val();
                        fn_RegistrarUsuarioRolesEditar(idRol, idMenu, idSubMenu, estadoRol, codigoUsu);
                    });
                    
                    fn_ConsultarUsuarios();
                    $('#ModalEditarDatosdeUsuario').addClass('hidden');
                    $('#ModalEditarDatosdeUsuario').removeClass('flex');
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

    $('#opcionSexoMasculino, #opcionSexoFemenino').on("change", function () {
        // Remueve las clases de fondo de todos los labels
        $('label').removeClass('bg-sky-600 bg-pink-500');
        
        // Agrega la clase de fondo apropiada al label asociado
        if (this.checked) {
            if ($(this).attr('id') === 'opcionSexoMasculino') {
                $('#rutaPerfilUsuEditar').attr('value','img/hombre.png');
            } else if ($(this).attr('id') === 'opcionSexoFemenino') {
                $('#rutaPerfilUsuEditar').attr('value','img/mujer.png');
            }
        }
    });

    $('#ModalEditarDatosdeUsuario .entradaEnMayusculas').on('input', function() {
        // Obtiene el valor actual del campo
        let valorCampo = $(this).val();
    
        // Convierte el valor a mayúsculas
        valorCampo = valorCampo.toUpperCase();
    
        // Establece el valor modificado en el campo
        $(this).val(valorCampo);
    });
    
    $('#valorEditarDniUsuario').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();

        // Elimina los espacios en blanco y caracteres no numéricos
        inputValue = inputValue.replace(/[^0-9]/g, '');
        
        // Limita la entrada a 8 caracteres
        if (inputValue.length > 8) {
            inputValue = inputValue.substr(0, 8);
        }

        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    function fn_RegistrarUsuarioRolesEditar(idRol, idMenu, idSubMenu, estadoRol, usuarioRegistroCli){
        $.ajax({
            url: '/fn_consulta_RegistrarUsuarioRolesEditar',
            method: 'GET',
            data: {
                idRol: idRol,
                idMenu: idMenu,
                idSubMenu: idSubMenu,
                estadoRol: estadoRol,
                usuarioRegistroCli: usuarioRegistroCli,
            },
            success: function(response) {
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

    $(document).on('contextmenu', '#bodyConsultarUsuarios tr', function (e) {
        e.preventDefault();
        if (tipoUsuario =='Administrador'){
            let codigoUsuario = $(this).closest("tr").find("td:first").text();
            Swal.fire({
                title: '¿Desea eliminar el Usuario?',
                text: "¡Estas seguro de eliminar el usuario!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '¡No, cancelar!',
                confirmButtonText: '¡Si,eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fn_EliminarUsuario(codigoUsuario);
                }
            })
        }
    });

    function fn_EliminarUsuario(codigoUsuario){
        $.ajax({
            url: '/fn_consulta_EliminarUsuario',
            method: 'GET',
            data: {
                codigoUsuario: codigoUsuario,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino al usuario correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    fn_ConsultarUsuarios();
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
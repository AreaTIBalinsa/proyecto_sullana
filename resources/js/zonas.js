import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    fn_ConsultarZonas();
    var tipoUsuario = $('#tipoUsuario').data('id');

    function fn_ConsultarZonas() {
        $.ajax({
        url: '/fn_consulta_ConsultarZonas',
            method: 'GET',
            success: function (response) {
                if (Array.isArray(response)) {
                    // Obtener el select
                    let tbodyZonas = $('#bodyConsultarZonas');
                    tbodyZonas.empty();
                    let contadorZonas = 0

                    // Iterar sobre los objetos y mostrar sus propiedades
                    response.forEach(function(obj) {
                        // Crear una nueva fila
                        let nuevaFila = $('<tr class="tblZonas bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">');

                        // Agregar las celdas con la información
                        nuevaFila.append($('<td class="hidden">').text(obj.idZona));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">').text(obj.nombreZon));
                        nuevaFila.append($('<td class="border-r dark:border-gray-700 px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">').text(obj.cantidadClientesZona));
                        // Agregar la nueva fila al tbody
                        tbodyZonas.append(nuevaFila);
                        contadorZonas += 1
                    });
                    $("#contadorZonas").html(contadorZonas);
                } else {
                    console.log("La respuesta no es un arreglo de objetos.");
                }
                
            },
            error: function(error) {
                console.error("ERROR",error);
            }
        });
    }

    $('.cerrarModalZonas').on('click', function (e) {
        if (e.target === this) {
            $('#ModalZonas').addClass('hidden');
            $('#ModalZonas').removeClass('flex');
        }
    });

    $('#registrar_agregarZona').on('click', function () {
        $('#ModalZonas').addClass('flex');
        $('#ModalZonas').removeClass('hidden');
        $('#nombreAgregarZona').focus();
    });

    $('#btnAgregarZonas').on('click', function () {
        let nombreAgregarZona = $('#nombreAgregarZona').val();
    
        if (nombreAgregarZona === null || nombreAgregarZona.trim() === '') {
            alertify.notify('Debe escribir el nombre de la zona', 'error', 3);
        } else {
            fn_AgregarZona(nombreAgregarZona);
        }
    });

    function fn_AgregarZona(nombreAgregarZona){
        $.ajax({
            url: '/fn_consulta_AgregarZona',
            method: 'GET',
            data: {
                nombreAgregarZona: nombreAgregarZona,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se registro la zona correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('#ModalZonas').addClass('hidden');
                    $('#ModalZonas').removeClass('flex');
                    fn_ConsultarZonas();
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

    $('.campoNombreZona').on('input', function() {
        // Obtiene el valor actual del campo
        let valorCampo = $(this).val();
    
        // Convierte el valor a mayúsculas
        valorCampo = valorCampo.toUpperCase();
    
        // Establece el valor modificado en el campo
        $(this).val(valorCampo);
    });

    $('.cerrarModalZonasEditar').on('click', function (e) {
        if (e.target === this) {
            $('#ModalZonasEditar').addClass('hidden');
            $('#ModalZonasEditar').removeClass('flex');
        }
    });
    
    $(document).on("dblclick", "#tablaConsultarZonas tbody tr", function() {
        let codigoZona = $(this).closest("tr").find('td:eq(0)').text();
        if (tipoUsuario =='Administrador'){
            let fila = $(this).closest('tr');
            let nombreZona = fila.find('td:eq(1)').text();
            
            $('#ModalZonasEditar').addClass('flex');
            $('#ModalZonasEditar').removeClass('hidden');

            $('#idZonaEditar').attr("value",codigoZona);
            $('#nombreAgregarZonaEditar').val(nombreZona);
            $('#nombreAgregarZonaEditar').focus();
        }
    });

    $('#btnAgregarZonasEditar').on('click', function () {
        let nombreEditarZona = $('#nombreAgregarZonaEditar').val();
        let idZonaEditar = $('#idZonaEditar').attr("value");
    
        if (nombreEditarZona === null || nombreEditarZona.trim() === '') {
            alertify.notify('Debe escribir el nombre de la zona', 'error', 3);
        } else {
            fn_EditarZona(idZonaEditar,nombreEditarZona);
        }
    });

    function fn_EditarZona(idZonaEditar,nombreEditarZona){
        $.ajax({
            url: '/fn_consulta_EditarZona',
            method: 'GET',
            data: {
                idZonaEditar:idZonaEditar,
                nombreEditarZona: nombreEditarZona,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se actualizo la zona correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    $('#ModalZonasEditar').addClass('hidden');
                    $('#ModalZonasEditar').removeClass('flex');
                    fn_ConsultarZonas();
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

    $(document).on('contextmenu', '#tablaConsultarZonas tbody tr', function (e) {
        e.preventDefault();
    
        let codigoZona = $(this).closest("tr").find('td:eq(0)').text();
        if (tipoUsuario == 'Administrador') {
            Swal.fire({
                title: '¿Desea eliminar el Registro?',
                text: '¡Estás seguro de eliminar la zona!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '¡No, cancelar!',
                confirmButtonText: '¡Sí, eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fn_EliminarZona(codigoZona);
                }
            });
        }
    });   

    function fn_EliminarZona(codigoZona){
        $.ajax({
            url: '/fn_consulta_EliminarZona',
            method: 'GET',
            data: {
                codigoZona:codigoZona,
            },
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se elimino la zona correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    fn_ConsultarZonas();
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
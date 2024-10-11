import jQuery from 'jquery';
window.$ = jQuery;
import 'flowbite';
import { forEach } from 'jszip';

jQuery(function($) {

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');

    $('#fechaDesdeComentarios').val(fechaHoy);
    $('#fechaHastaComentarios').val(fechaHoy);

    $('#btnBuscarComentarios').on('click', function() {
        fn_listarComentarios();
    });

    function fn_listarComentarios() {
        $.ajax({
            url: '/fn_listarComentarios',
            type: 'GET',
            data: {
                fechaDesde: $('#fechaDesdeComentarios').val(),
                fechaHasta: $('#fechaHastaComentarios').val()
            },
            success: function(response) {
                $('#bodyComentarios').empty();
                response.forEach(function (obj) {

                    let nuevaFila = `
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td class="border-r dark:border-gray-700 p-2 text-center">${obj.fecha_comentario}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">${obj.nombreCompleto}</td>
                            <td class="border-r dark:border-gray-700 p-2 text-center capitalize">${obj.comentario}</td>
                        </tr>
                    `;

                    $('#bodyComentarios').append(nuevaFila);
                });

                if (response.length == 0) {
                    $('#bodyComentarios').append('<tr class="rounded-lg border-2 dark:border-gray-700"><td colspan=3" class="text-center">No hay comentarios</td></tr>');
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    }

    fn_listarComentarios();
});
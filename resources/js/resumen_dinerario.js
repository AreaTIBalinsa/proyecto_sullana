import jQuery from 'jquery';
window.$ = jQuery;

jQuery(function($) {
    
    const ahoraEnNY = new Date();
    const fechaHoy = new Date(ahoraEnNY.getFullYear(), ahoraEnNY.getMonth(), ahoraEnNY.getDate()).toISOString().split('T')[0];
    var tipoUsuario = $('#tipoUsuario').data('id');
    const fechaHoyTabla = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

});
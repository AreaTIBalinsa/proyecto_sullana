import jQuery from 'jquery';
window.$ = jQuery;
import 'flowbite';

jQuery(function($) {
    declarar_mensaje_bienvenida();

    function declarar_mensaje_bienvenida(){
        // Obtener la hora actual
        let horaActual = new Date().getHours();
    
        // Definir los mensajes según la hora
        let mensaje;
    
        if (horaActual >=0 && horaActual < 6) {
            mensaje = 'Has madrugado mucho hoy';
        } else if (horaActual >= 6 && horaActual < 12) {
            mensaje = 'Buenos dias';
        }else if (horaActual >= 12 && horaActual < 19) {
            mensaje = 'Buenas tardes';
        } else if (horaActual >=19 && horaActual < 24) {
            mensaje = 'Buenas noches';
        }
    
        // Mostrar el mensaje de bienvenida
        $('#mensaje_bienvenida').text(mensaje);
    }

    $('#preloader_sistema').fadeOut('slow');

    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // El navegador está en modo oscuro
        $('.base_swith').addClass('bg-green-500');
        $('.base_swith').removeClass('bg-slate-700');
        $('.circulo_swith').addClass('prendido');
        $('html').addClass('dark');
    } else {
        // El navegador no está en modo oscuro
        $('.base_swith').removeClass('bg-green-500');
        $('.base_swith').addClass('bg-slate-700');
        $('.circulo_swith').removeClass('prendido');
        $('html').removeClass('dark');
    }

    if(localStorage.getItem('modoOscuro') === 'true') {
        // Aplicar el modo oscuro
        $('html').addClass('dark');
        $('.base_swith').addClass('bg-green-500');
        $('.base_swith').removeClass('bg-slate-700');
        $('.circulo_swith').addClass('prendido');
    }else{
        $('html').removeClass('dark');
        $('.base_swith').removeClass('bg-green-500');
        $('.base_swith').addClass('bg-slate-700');
        $('.circulo_swith').removeClass('prendido');
    }

    $('#swith_modo_oscuro').on('click', function(){
        $('.base_swith').toggleClass('bg-green-500 bg-slate-700');
        $('.circulo_swith').toggleClass('prendido');
        $('html').toggleClass('dark');
        localStorage.setItem('modoOscuro', $('html').hasClass('dark'));
    });

    $('#passwordMos').on('click', function(){
        $('#password').attr('type', 'text');
        $('#passwordMosl').addClass('hidden');
        $('#passwordOcul').removeClass('hidden');
    })

    $('#passwordOcu').on('click', function(){
        $('#password').attr('type', 'password');
        $('#passwordOcul').addClass('hidden');
        $('#passwordMosl').removeClass('hidden');
    })

    /* ============ Eventos para validar campos entrada || Solo numeros, y 2 decimales ============ */

    $('.validarSoloNumerosDosDecimales').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();
        
        // Elimina todos los caracteres excepto los dígitos y un punto decimal
        inputValue = inputValue.replace(/[^0-9.]/g, '');
    
        // Verifica si ya hay un punto decimal presente
        if (inputValue.indexOf('.') !== -1) {
            // Si ya hay un punto, elimina los puntos adicionales
            inputValue = inputValue.replace(/(\..*)\./g, '$1');
            
            // Limita el número de decimales a tres
            let decimalPart = inputValue.split('.')[1];
            if (decimalPart && decimalPart.length > 2) {
                decimalPart = decimalPart.substring(0, 2);
                inputValue = inputValue.split('.')[0] + '.' + decimalPart;
            }
        }
        
        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    $('.validarSoloNumerosDosDecimalesSaldo').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();
    
        // Elimina todos los caracteres excepto los dígitos, un punto decimal y el signo negativo
        inputValue = inputValue.replace(/[^0-9.-]/g, '');
    
        // Verifica si hay más de un signo negativo y lo elimina si es necesario
        if ((inputValue.match(/-/g) || []).length > 1) {
            inputValue = inputValue.replace(/-+/g, '-').replace(/^-/, '');
        }
    
        // Asegúrate de que el signo negativo esté al principio
        if (inputValue.indexOf('-') > 0) {
            inputValue = '-' + inputValue.replace(/-/g, '');
        }
    
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
    
        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    /* ============ Eventos para validar campos entrada || Formato de Celular 999 999 999 ============ */

    $('.validarEntradasDeCelular').on('input', function () {
        // Obtiene el valor actual del input
        let inputValue = $(this).val();

        // Elimina los espacios en blanco y caracteres no numéricos
        inputValue = inputValue.replace(/[^0-9]/g, '');
        
        // Divide el valor en grupos de tres caracteres
        const groups = inputValue.match(/.{1,3}/g);
        
        // Si hay grupos, une con espacios y establece el valor en el input
        if (groups) {
            inputValue = groups.join(' ');
        }
        
        // Limita la entrada a 11 caracteres (incluyendo espacios)
        if (inputValue.length > 9) {
            inputValue = inputValue.substr(0, 11);
        }

        // Establece el valor limpio en el input
        $(this).val(inputValue);
    });

    /* ============ Termina Eventos para validar campos entrada ============ */
    
});
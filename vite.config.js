import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 
                    'resources/js/app.js',
                    'resources/js/consultar_clientes.js',
                    'resources/js/consultar_usuarios.js',
                    'resources/js/inicio.js',
                    'resources/js/pesadas.js',
                    'resources/js/precios.js',
                    'resources/js/register.js',
                    'resources/js/registrar_clientes.js',
                    'resources/js/reporte_de_pagos_cuenta_cliente.js',
                    'resources/js/reporte_de_pagos.js',
                    'resources/js/reporte_por_cliente.js',
                    'resources/js/reporte_por_proveedor.js',
                    'resources/js/agregar_saldo.js',
                    'resources/js/reporte_acumulado.js',
                    'resources/js/configuraciones.js',
                    'resources/js/pedidos.js',
                    'resources/js/caja_chica.js',
                    'resources/js/deuda_maxima.js',
                    'resources/js/seguimiento_pedidos.js',
                    'resources/js/cuenta_cliente.js',
                    'resources/js/pesadas_web.js',
                    'resources/js/pesadas_web_merma.js',
                    'resources/js/reporte_ingresos.js',
                    'resources/js/detalles_egresos.js',
                    'resources/js/detalles_ingresos.js',
                    'resources/js/resumen_dinerario.js',
                    'resources/js/comentarios.js',
                ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '$': 'jQuery'
        },
    },
});

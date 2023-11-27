<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubmenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_submenus')->insert([
            ['idSubMenu' => 1, 'idMenu' => 0, 'nombreSubMenu' => 'Inicio', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/home', 'iconHtml' => 'bx bx-home', 'estadoSubMenu' => 1],
            ['idSubMenu' => 2, 'idMenu' => 1, 'nombreSubMenu' => 'Agregar Cliente', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/registrar_clientes', 'iconHtml' => 'bx bx-user-plus', 'estadoSubMenu' => 1],
            ['idSubMenu' => 3, 'idMenu' => 1, 'nombreSubMenu' => 'Consultar Cliente', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/consultar_clientes', 'iconHtml' => 'bx bxs-group', 'estadoSubMenu' => 1],
            ['idSubMenu' => 4, 'idMenu' => 2, 'nombreSubMenu' => 'Reporte Acumulado', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/reporte_acumulado', 'iconHtml' => 'bx bxs-report', 'estadoSubMenu' => 1],
            ['idSubMenu' => 5, 'idMenu' => 2, 'nombreSubMenu' => 'Reporte de Pagos', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/reporte_de_pagos', 'iconHtml' => 'bx bxs-wallet', 'estadoSubMenu' => 1],
            ['idSubMenu' => 6, 'idMenu' => 2, 'nombreSubMenu' => 'Reporte Por Cliente', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/reporte_por_cliente', 'iconHtml' => 'bx bx-file-find', 'estadoSubMenu' => 1],
            ['idSubMenu' => 7, 'idMenu' => 2, 'nombreSubMenu' => 'Reporte por Proveedor', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/reporte_por_proveedor', 'iconHtml' => 'fa-solid fa-drumstick-bite', 'estadoSubMenu' => 1],
            ['idSubMenu' => 8, 'idMenu' => 3, 'nombreSubMenu' => 'Precios', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/precios', 'iconHtml' => 'bx bxs-dollar-circle', 'estadoSubMenu' => 1],
            ['idSubMenu' => 9, 'idMenu' => 3, 'nombreSubMenu' => 'Pesadas', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/pesadas', 'iconHtml' => 'bx bxs-analyse', 'estadoSubMenu' => 1],
            ['idSubMenu' => 10, 'idMenu' => 3, 'nombreSubMenu' => 'Configurar conversion', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/valor_conversion', 'iconHtml' => 'bx bx-message-square-edit', 'estadoSubMenu' => 1],
            ['idSubMenu' => 11, 'idMenu' => 3, 'nombreSubMenu' => 'Agregar Saldo', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/agregar_saldo', 'iconHtml' => 'bx bx-money-withdraw', 'estadoSubMenu' => 1],
            ['idSubMenu' => 12, 'idMenu' => 4, 'nombreSubMenu' => 'Agregar Usuario', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/registrar_usuarios', 'iconHtml' => 'bx bxs-user-badge', 'estadoSubMenu' => 1],
            ['idSubMenu' => 13, 'idMenu' => 4, 'nombreSubMenu' => 'Consultar Usuario', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/consultar_usuarios', 'iconHtml' => 'bx bxs-user-account', 'estadoSubMenu' => 1],
            ['idSubMenu' => 14, 'idMenu' => 4, 'nombreSubMenu' => 'Configuraciones', 'idNombreSubMenu' => '#', 'hrefSubMenu' => '/configuraciones', 'iconHtml' => 'bx bx-cog', 'estadoSubMenu' => 1],
        ]);
    }
}

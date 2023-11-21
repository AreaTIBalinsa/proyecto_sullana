<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesDeUsuarioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_roles_de_usuario')->insert([
            ['idRol' => 1, 'idUsuario' => 1, 'idMenu' => 0, 'idSubMenu' => 1, 'estadoRol' => "si"],
            ['idRol' => 2, 'idUsuario' => 1, 'idMenu' => 1, 'idSubMenu' => 2, 'estadoRol' => "si"],
            ['idRol' => 3, 'idUsuario' => 1, 'idMenu' => 1, 'idSubMenu' => 3, 'estadoRol' => "si"],
            ['idRol' => 4, 'idUsuario' => 1, 'idMenu' => 2, 'idSubMenu' => 5, 'estadoRol' => "si"],
            ['idRol' => 5, 'idUsuario' => 1, 'idMenu' => 2, 'idSubMenu' => 6, 'estadoRol' => "si"],
            ['idRol' => 6, 'idUsuario' => 1, 'idMenu' => 2, 'idSubMenu' => 7, 'estadoRol' => "si"],
            ['idRol' => 7, 'idUsuario' => 1, 'idMenu' => 2, 'idSubMenu' => 8, 'estadoRol' => "si"],
            ['idRol' => 8, 'idUsuario' => 1, 'idMenu' => 3, 'idSubMenu' => 9, 'estadoRol' => "si"],
            ['idRol' => 9, 'idUsuario' => 1, 'idMenu' => 3, 'idSubMenu' => 10, 'estadoRol' => "si"],
            ['idRol' => 10, 'idUsuario' => 1, 'idMenu' => 3, 'idSubMenu' => 11, 'estadoRol' => "si"],
            ['idRol' => 11, 'idUsuario' => 1, 'idMenu' => 3, 'idSubMenu' => 12, 'estadoRol' => "si"],
            ['idRol' => 12, 'idUsuario' => 1, 'idMenu' => 4, 'idSubMenu' => 13, 'estadoRol' => "si"],
            ['idRol' => 13, 'idUsuario' => 1, 'idMenu' => 4, 'idSubMenu' => 14, 'estadoRol' => "si"],
            ['idRol' => 14, 'idUsuario' => 1, 'idMenu' => 4, 'idSubMenu' => 15, 'estadoRol' => "si"],
        ]);
    }
}

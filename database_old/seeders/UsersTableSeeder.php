<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'id' => 1,
            'apellidoPaternoUsu' => 'SANTOS',
            'apellidoMaternoUsu' => 'VILCHEZ',
            'nombresUsu' => 'EDINSON',
            'sexoUsu' => 'M',
            'dniUsu' => '12345678',
            'celularUsu' => '987 654 321',
            'direccionUsu' => 'LA UNION',
            'tipoUsu' => 'Administrador',
            'rutaPerfilUsu' => 'img/hombre.png',
            'email' => 'edinsonsantos@example.com',
            'username' => 'esanvil',
            'email_verified_at' => null,
            'password' => Hash::make('Edinson110404#.'),
            'remember_token' => null,
            'created_at' => '2023-08-18 22:05:51',
            'updated_at' => '2023-08-18 22:05:51',
        ]);
    }
}

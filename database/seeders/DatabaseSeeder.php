<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            EspeciesVentaTableSeeder::class,
            PasswordTableSeeder::class,
            PuertosTableSeeder::class,
            PrecioXPresentacionTableSeeder::class,
            ClientesTableSeeder::class,
            UsersTableSeeder::class,
            MenusTableSeeder::class,
            SubmenusTableSeeder::class,
            RolesDeUsuarioTableSeeder::class,
            EstadosSeeder::class,
            TipoDocumentoSeeder::class,
            PreciosMinimosTableSeeder::class,
            EspeciesCompraTableSeeder::class,
            PesosDeTara::class,
        ]);
    }
}

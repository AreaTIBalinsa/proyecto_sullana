<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrecioXPresentacionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_precio_x_presentacion')->insert([
            'idPrecio' => 1,
            'codigoCli' => 99999,
            'primerEspecie' => 10.00,
            'segundaEspecie' => 10.00,
            'terceraEspecie' => 10.00,
            'cuartaEspecie' => 10.00,
            'valorConversionPrimerEspecie' => 1.000,
            'valorConversionSegundaEspecie' => 1.000,
            'valorConversionTerceraEspecie' => 1.000,
            'valorConversionCuartaEspecie' => 1.000,
        ]);
    }
}

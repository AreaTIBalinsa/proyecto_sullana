<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PreciosMinimosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_precios_minimos')->insert([
            ['idPrecioMinimo' => 1, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "YUGO VIVO"],
            ['idPrecioMinimo' => 2, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "YUGO PELADO"],
            ['idPrecioMinimo' => 3, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "TECNICA VIVO"],
            ['idPrecioMinimo' => 4, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "TECNICA PELADO"],
            ['idPrecioMinimo' => 5, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "GALLINA DOBLE"],
            ['idPrecioMinimo' => 6, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "GALLINA CHICA"],
            ['idPrecioMinimo' => 7, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "GALLO"],
            ['idPrecioMinimo' => 8, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO MALTRATADO"],
            ['idPrecioMinimo' => 9, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "PECHUGA"],
            ['idPrecioMinimo' => 10, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "PIERNA"],
            ['idPrecioMinimo' => 11, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "ALAS"],
            ['idPrecioMinimo' => 12, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "MENUDENCIA"],
            ['idPrecioMinimo' => 13, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "DORSO"],
            ['idPrecioMinimo' => 14, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "OTROS"],
            ['idPrecioMinimo' => 15, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO XX"],
            ['idPrecioMinimo' => 16, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "BRASA YUGO"],
            ['idPrecioMinimo' => 17, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "BRASA TECNICA"],
        ]);
    }
}
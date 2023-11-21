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
            ['idPrecioMinimo' => 1, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO YUGO VIVO"],
            ['idPrecioMinimo' => 2, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO PERLA VIVO"],
            ['idPrecioMinimo' => 3, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO CHIMU VIVO"],
            ['idPrecioMinimo' => 4, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO XX VIVO"],
            ['idPrecioMinimo' => 5, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO YUGO BENEFICIADO"],
            ['idPrecioMinimo' => 6, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO PERLA BENEFICIADO"],
            ['idPrecioMinimo' => 7, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO CHIMU BENEFICIADO"],
            ['idPrecioMinimo' => 8, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO XX BENEFICIADO"],
        ]);
    }
}

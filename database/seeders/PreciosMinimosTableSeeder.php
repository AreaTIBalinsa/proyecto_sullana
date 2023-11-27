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
            ['idPrecioMinimo' => 1, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO VIVO VIVO"],
            ['idPrecioMinimo' => 2, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO PELADO VIVO"],
            ['idPrecioMinimo' => 3, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "TECNICO VIVO VIVO"],
            ['idPrecioMinimo' => 4, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "TECNICO PELADO VIVO"],
            ['idPrecioMinimo' => 5, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "GALLINA DOBLE VIVO"],
            ['idPrecioMinimo' => 6, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "GALLINA CHICA VIVO"],
            ['idPrecioMinimo' => 7, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "GALLO VIVO"],
            ['idPrecioMinimo' => 8, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO MALTRATADO VIVO"],
            ['idPrecioMinimo' => 9, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "PECHUGA VIVO"],
            ['idPrecioMinimo' => 10, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "PIERNA VIVO"],
            ['idPrecioMinimo' => 11, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "ALAS VIVO"],
            ['idPrecioMinimo' => 12, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "MENUDENCIA VIVO"],
            ['idPrecioMinimo' => 13, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "DORSO VIVO"],
            ['idPrecioMinimo' => 14, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "OTROS VIVO"],
            ['idPrecioMinimo' => 15, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO VIVO BENEFICIADO"],
            ['idPrecioMinimo' => 16, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO PELADO BENEFICIADO"],
            ['idPrecioMinimo' => 17, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "TECNICO VIVO BENEFICIADO"],
            ['idPrecioMinimo' => 18, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "TECNICO PELADO BENEFICIADO"],
            ['idPrecioMinimo' => 19, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "GALLINA DOBLE BENEFICIADO"],
            ['idPrecioMinimo' => 20, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "GALLINA CHICA BENEFICIADO"],
            ['idPrecioMinimo' => 21, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "GALLO BENEFICIADO"],
            ['idPrecioMinimo' => 22, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "POLLO MALTRATADO BENEFICIADO"],
            ['idPrecioMinimo' => 23, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "PECHUGA BENEFICIADO"],
            ['idPrecioMinimo' => 24, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "PIERNA BENEFICIADO"],
            ['idPrecioMinimo' => 25, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "ALAS BENEFICIADO"],
            ['idPrecioMinimo' => 26, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "MENUDENCIA BENEFICIADO"],
            ['idPrecioMinimo' => 27, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "DORSO BENEFICIADO"],
            ['idPrecioMinimo' => 28, 'precioMinimo' => 5, 'nombreEspeciePrecioMinimo' => "OTROS BENEFICIADO"],
        ]);
    }
}

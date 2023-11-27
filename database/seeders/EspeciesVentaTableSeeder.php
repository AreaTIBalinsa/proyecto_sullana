<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EspeciesVentaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_especies_venta')->insert([
            ['idEspecie' => 1, 'nombreEspecie' => 'YUGO VIVO'],
            ['idEspecie' => 2, 'nombreEspecie' => 'YUGO PELADO'],
            ['idEspecie' => 3, 'nombreEspecie' => 'TECNICO VIVO'],
            ['idEspecie' => 4, 'nombreEspecie' => 'TECNICO PELADO'],
            ['idEspecie' => 5, 'nombreEspecie' => 'GALLINA DOBLE'],
            ['idEspecie' => 6, 'nombreEspecie' => 'GALLINA CHICA'],
            ['idEspecie' => 7, 'nombreEspecie' => 'GALLO'],
            ['idEspecie' => 8, 'nombreEspecie' => 'POLLO MALTRATADO'],
            ['idEspecie' => 9, 'nombreEspecie' => 'POLLO TROZADO'],
            ['idEspecie' => 10, 'nombreEspecie' => 'PECHUGA'],
            ['idEspecie' => 11, 'nombreEspecie' => 'PIERNA'],
            ['idEspecie' => 12, 'nombreEspecie' => 'ALAS'],
            ['idEspecie' => 13, 'nombreEspecie' => 'MENUDENCIA'],
            ['idEspecie' => 14, 'nombreEspecie' => 'DORSO'],
            ['idEspecie' => 15, 'nombreEspecie' => 'OTROS'],
        ]);
    }
}

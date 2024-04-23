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
            ['idEspecie' => 3, 'nombreEspecie' => 'TECNICA VIVO'],
            ['idEspecie' => 4, 'nombreEspecie' => 'TECNICA PELADO'],
            ['idEspecie' => 5, 'nombreEspecie' => 'GALLINA DOBLE PELADO'],
            ['idEspecie' => 6, 'nombreEspecie' => 'GALLINA CHICA PELADO'],
            ['idEspecie' => 7, 'nombreEspecie' => 'GALLO PELADO'],
            ['idEspecie' => 8, 'nombreEspecie' => 'POLLO MALTRATADO'],
            ['idEspecie' => 9, 'nombreEspecie' => 'POLLO TROZADO'],
            ['idEspecie' => 10, 'nombreEspecie' => 'PECHUGA'],
            ['idEspecie' => 11, 'nombreEspecie' => 'PIERNA'],
            ['idEspecie' => 12, 'nombreEspecie' => 'ALAS'],
            ['idEspecie' => 13, 'nombreEspecie' => 'MENUDENCIA'],
            ['idEspecie' => 14, 'nombreEspecie' => 'DORSO'],
            ['idEspecie' => 15, 'nombreEspecie' => 'OTROS'],
            ['idEspecie' => 16, 'nombreEspecie' => 'POLLO XX PELADO'],
            ['idEspecie' => 17, 'nombreEspecie' => 'BRASA YUGO'],
            ['idEspecie' => 18, 'nombreEspecie' => 'BRASA TECNICA'],
            ['idEspecie' => 19, 'nombreEspecie' => 'POLLO XX VIVO'],
            ['idEspecie' => 20, 'nombreEspecie' => 'GALLINA DOBLE VIVO'],
            ['idEspecie' => 21, 'nombreEspecie' => 'GALLINA CHICA VIVO'],
            ['idEspecie' => 22, 'nombreEspecie' => 'GALLO VIVO']
        ]);
    }
}
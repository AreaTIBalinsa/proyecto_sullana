<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EspeciesCompraTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_especies_compra')->insert([
            ['idEspecie' => 1, 'nombreEspecie' => 'POLLO YUGO'],
            ['idEspecie' => 2, 'nombreEspecie' => 'POLLO PERLA'],
            ['idEspecie' => 3, 'nombreEspecie' => 'POLLO CHIMU'],
            ['idEspecie' => 4, 'nombreEspecie' => 'CAMIONES'],
            ['idEspecie' => 5, 'nombreEspecie' => 'STOCK CAAS'],
        ]);
    }
}

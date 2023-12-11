<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PesosDeTara extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pesos_de_jabas')->insert([
            'idCubetas' => 1,
            'pesoColorCubetaUno' => '1.000',
            'pesoColorCubetaDos' => '2.000',
            'pesoColorCubetaTres' => '3.000',
            'pesoColorCubetaCuatro' => '4.000',
            'pesoColorCubetaCinco' => '5.000',
            'pesoColorJavaUno' => '6.000',
            'pesoColorJavaDos' => '7.000',
            'pesoColorJavaTres' => '8.000',
            'pesoColorJavaCuatro' => '9.000',
            'pesoColorJavaCinco' => '10.000',
            'pesoColorJavaSeis' => '11.000',
            'pesoColorJavaSiete' => '12.000',
        ]);
    }
}

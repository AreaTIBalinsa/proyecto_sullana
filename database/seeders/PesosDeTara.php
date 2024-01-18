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
            'pesoColorJavaUno' => '5.000',
            'pesoColorJavaDos' => '6.100',
            'pesoColorJavaTres' => '5.200',
            'pesoColorJavaCuatro' => '4.200',
            'pesoColorJavaCinco' => '4.400',
            'pesoColorJavaSeis' => '5.800',
            'pesoColorJavaSiete' => '4.000',
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_estados')->insert([
            ['idEstadoCli' => 1, 'estadoCliente' => 'ACTIVO'],
            ['idEstadoCli' => 2, 'estadoCliente' => 'INHABILITADO'],
        ]);
    }
}

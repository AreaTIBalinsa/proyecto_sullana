<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GruposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_grupos')->insert([
            ['idGrupo' => 1, 'nombreGrupo' => 'POLLO VIVO'],
            ['idGrupo' => 2, 'nombreGrupo' => 'BENEFICIADO'],
        ]);
    }
}

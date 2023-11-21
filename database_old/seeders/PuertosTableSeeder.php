<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PuertosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_puertos')->insert([
            'idPuertos' => 1,
            'puerto_indicador1' => 5,
            'puerto_indicador2' => 4,
            'puerto_indicadorArduino' => 7,
            'puerto_HostIP' => '192.168.1.195',
            'puerto_ApiURLSERVIDOR' => 'https://balinsa.com/apiPython/ApiEdinsonServidor.php',
            'puerto_ApiURLLOCAL' => 'https://balinsa.com/apiPython/ApiEdinsonLocal.php',
        ]);
    }
}

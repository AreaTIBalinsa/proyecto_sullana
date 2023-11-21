<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_clientes')->insert([
            'idCliente' => 1,
            'apellidoPaternoCli' => '',
            'apellidoMaternoCli' => '',
            'nombresCli' => 'GENERICO',
            'tipoDocumentoCli' => '1',
            'numDocumentoCli' => '87654321',
            'contactoCli' => '987 654 321',
            'direccionCli' => 'PIURA',
            'idEstadoCli' => 1,
            'fechaRegistroCli' => '2023-09-05',
            'horaRegistroCli' => '11:16:00',
            'usuarioRegistroCli' => 1,
            'codigoCli' => 99999,
            'comentarioCli' => 'Nada',
            'estadoEliminadoCli' => '1',
        ]);
    }
}

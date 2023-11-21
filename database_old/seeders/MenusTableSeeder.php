<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tb_menus')->insert([
            ['idMenu' => 1, 'nombreMenu' => 'CLIENTES', 'iconHtml' => 'fa-solid fa-users'],
            ['idMenu' => 2, 'nombreMenu' => 'REPORTES', 'iconHtml' => 'fa-solid fa-users'],
            ['idMenu' => 3, 'nombreMenu' => 'CONTABILIDAD', 'iconHtml' => 'fa-solid fa-users'],
            ['idMenu' => 4, 'nombreMenu' => 'SISTEMA', 'iconHtml' => 'fa-solid fa-users'],
        ]);
    }
}

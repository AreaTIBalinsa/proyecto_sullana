<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_roles_de_usuario', function (Blueprint $table) {
            $table->id('idRol');
            $table->integer('idUsuario');
            $table->integer('idMenu');
            $table->integer('idSubMenu');
            $table->char('estadoRol', 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_roles_de_usuario');
    }
};

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
        Schema::create('tb_puertos', function (Blueprint $table) {
            $table->id('idPuertos');
            $table->integer('puerto_indicador1')->nullable();
            $table->integer('puerto_indicador2')->nullable();
            $table->integer('puerto_indicadorArduino')->nullable();
            $table->string('puerto_HostIP', 100)->nullable();
            $table->string('puerto_ApiURLSERVIDOR', 500)->nullable();
            $table->string('puerto_ApiURLLOCAL',500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_puertos');
    }
};

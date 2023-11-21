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
        Schema::create('tb_precios_minimos', function (Blueprint $table) {
            $table->id('idPrecioMinimo');
            $table->decimal('precioMinimo', 8, 3);
            $table->string('nombreEspeciePrecioMinimo',150);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_precios_minimos');
    }
};

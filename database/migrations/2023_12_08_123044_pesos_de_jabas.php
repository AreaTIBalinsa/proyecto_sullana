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
        //
        Schema::create('pesos_de_jabas', function (Blueprint $table) {
            $table->id('idCubetas');
            $table->decimal('pesoColorCubetaUno', 8, 3);
            $table->decimal('pesoColorCubetaDos', 8, 3);
            $table->decimal('pesoColorCubetaTres', 8, 3);
            $table->decimal('pesoColorCubetaCuatro', 8, 3);
            $table->decimal('pesoColorCubetaCinco', 8, 3);
            $table->decimal('pesoColorJavaUno', 8, 3);
            $table->decimal('pesoColorJavaDos', 8, 3);
            $table->decimal('pesoColorJavaTres', 8, 3);
            $table->decimal('pesoColorJavaCuatro', 8, 3);
            $table->decimal('pesoColorJavaCinco', 8, 3);
            $table->decimal('pesoColorJavaSeis', 8, 3);
            $table->decimal('pesoColorJavaSiete', 8, 3);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesos_de_jabas');
    }
};

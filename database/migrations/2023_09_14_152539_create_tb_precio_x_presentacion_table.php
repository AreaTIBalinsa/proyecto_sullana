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
        Schema::create('tb_precio_x_presentacion', function (Blueprint $table) {
            $table->id('idPrecio');
            $table->integer('codigoCli');
            $table->decimal('primerEspecie', 8, 2)->default(10.00);
            $table->decimal('segundaEspecie', 8, 2)->default(10.00);
            $table->decimal('terceraEspecie', 8, 2)->default(10.00);
            $table->decimal('cuartaEspecie', 8, 2)->default(10.00);
            $table->decimal('valorConversionPrimerEspecie', 8, 3)->default(1.000);
            $table->decimal('valorConversionSegundaEspecie', 8, 3)->default(1.000);
            $table->decimal('valorConversionTerceraEspecie', 8, 3)->default(1.000);
            $table->decimal('valorConversionCuartaEspecie', 8, 3)->default(1.000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_precio_x_presentacion');
    }
};

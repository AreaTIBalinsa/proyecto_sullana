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
            $table->decimal('quintaEspecie', 8, 2)->default(10.00);
            $table->decimal('sextaEspecie', 8, 2)->default(10.00);
            $table->decimal('septimaEspecie', 8, 2)->default(10.00);
            $table->decimal('octavaEspecie', 8, 2)->default(10.00);
            $table->decimal('novenaEspecie', 8, 2)->default(10.00);
            $table->decimal('decimaEspecie', 8, 2)->default(10.00);
            $table->decimal('decimaPrimeraEspecie', 8, 2)->default(10.00);
            $table->decimal('decimaSegundaEspecie', 8, 2)->default(10.00);
            $table->decimal('decimaTerceraEspecie', 8, 2)->default(10.00);
            $table->decimal('decimaCuartaEspecie', 8, 2)->default(10.00);
            $table->decimal('decimaQuintaOtrasEspecies', 8, 2)->default(10.00);
            $table->decimal('decimaSextaEspecie', 8, 2)->default(10.00);
            $table->decimal('decimaSeptimaEspecie', 8, 2)->default(10.00);
            $table->decimal('decimaOctavaEspecie', 8, 2)->default(10.00);
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
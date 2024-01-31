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
        Schema::create('tb_pagos', function (Blueprint $table) {
            $table->id('idPagos');
            $table->integer('codigoCli');
            $table->string('tipoAbonoPag', 100)->nullable();
            $table->decimal('cantidadAbonoPag', 8, 2)->nullable();
            $table->date('fechaOperacionPag');
            $table->string('codigoTransferenciaPag', 100)->nullable();
            $table->string('observacion', 200)->nullable();
            $table->date('fechaRegistroPag');
            $table->integer('estadoPago')->default(1);
            $table->string('bancaPago')->nullable();
            $table->time('horaOperacionPag')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pagos');
    }
};

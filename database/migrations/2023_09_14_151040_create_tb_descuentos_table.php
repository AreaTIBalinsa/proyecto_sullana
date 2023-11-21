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
        Schema::create('tb_descuentos', function (Blueprint $table) {
            $table->id('idDescuento');
            $table->date('fechaRegistroDesc');
            $table->string('especieDesc', 50);
            $table->decimal('pesoDesc', 8, 3);
            $table->integer('codigoCli');
            $table->decimal('precioDesc', 8, 3)->nullable();
            $table->integer('cantidadDesc')->default(0);
            $table->time('horaRegistroDesc');
            $table->date('fechaRegistroDescuento');
            $table->integer('estadoDescuento')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_descuentos');
    }
};

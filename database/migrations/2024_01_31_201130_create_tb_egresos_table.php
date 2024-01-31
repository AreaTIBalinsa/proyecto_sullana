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
        Schema::create('tb_egresos', function (Blueprint $table) {
            $table->id('idEgresos');
            $table->string('nombreEgresoCamal');
            $table->string('tipoAbonoEgreso', 100)->nullable();
            $table->decimal('cantidadAbonoEgreso', 8, 2)->nullable();
            $table->date('fechaOperacionEgreso');
            $table->string('codigoTransferenciaEgreso', 100)->nullable();
            $table->date('fechaRegistroEgreso');
            $table->integer('estadoEgreso')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_egresos');
    }
};

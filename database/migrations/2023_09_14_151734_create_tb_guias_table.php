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
        Schema::create('tb_guias', function (Blueprint $table) {
            $table->id('idGuia');
            $table->string('numGuia', 100)->nullable();
            $table->decimal('pesoGuia', 8, 2);
            $table->integer('cantidadGuia');
            $table->decimal('precioGuia', 8, 2)->nullable();
            $table->date('fechaGuia')->default(now());
            $table->integer('idProveedor');
            $table->integer('idEspecie');
            $table->integer('estadoGuia')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_guias');
    }
};

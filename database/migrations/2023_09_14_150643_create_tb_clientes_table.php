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
        Schema::create('tb_clientes', function (Blueprint $table) {
            $table->id('idCliente');
            $table->string('apellidoPaternoCli', 50)->nullable();
            $table->string('apellidoMaternoCli', 50)->nullable();
            $table->char('nombresCli', 50);
            $table->string('tipoDocumentoCli', 100);
            $table->string('numDocumentoCli', 100);
            $table->string('contactoCli', 50)->nullable();
            $table->string('direccionCli', 200)->nullable();
            $table->integer('idEstadoCli');
            $table->date('fechaRegistroCli');
            $table->time('horaRegistroCli');
            $table->integer('usuarioRegistroCli');
            $table->integer('codigoCli')->unique();
            $table->string('comentarioCli', 300)->nullable();
            $table->integer('estadoEliminadoCli')->default(1);
            $table->timestamps();
            $table->decimal('limitEndeudamiento',8,2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_clientes');
    }
};

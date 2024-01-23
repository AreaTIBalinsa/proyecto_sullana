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
        Schema::create('tb_pedidos', function (Blueprint $table) {
            $table->id('idPedido');
            $table->integer('codigoCliPedidos')->default(0);
            $table->integer('pedidoPrimerEspecie')->default(0);
            $table->integer('pedidoSegundaEspecie')->default(0);
            $table->integer('pedidoTercerEspecie')->default(0);
            $table->integer('pedidoCuartaEspecie')->default(0);
            $table->integer('pedidoQuintaEspecie')->default(0);
            $table->integer('pedidoSextaEspecie')->default(0);
            $table->integer('pedidoSeptimaEspecie')->default(0);
            $table->integer('pedidoOctavaEspecie')->default(0);
            $table->integer('pedidoNovenaEspecie')->default(0);
            $table->integer('pedidoDecimaEspecie')->default(0);
            $table->string('descripcionPedido', 500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pedidos');
    }
};

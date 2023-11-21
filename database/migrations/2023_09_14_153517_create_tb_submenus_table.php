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
        Schema::create('tb_submenus', function (Blueprint $table) {
            $table->id('idSubMenu');
            $table->integer('idMenu');
            $table->string('nombreSubMenu', 100);
            $table->string('idNombreSubMenu', 100);
            $table->string('hrefSubMenu', 100);
            $table->string('iconHtml', 100);
            $table->integer('estadoSubMenu');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_submenus');
    }
};

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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('apellidoPaternoUsu')->nullable();
            $table->string('apellidoMaternoUsu')->nullable();
            $table->string('nombresUsu');
            $table->string('sexoUsu');
            $table->string('dniUsu')->nullable();
            $table->string('celularUsu')->nullable();
            $table->string('direccionUsu')->nullable();
            $table->string('tipoUsu');
            $table->string('rutaPerfilUsu')->nullable();
            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

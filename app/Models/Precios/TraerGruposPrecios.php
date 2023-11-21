<?php

namespace App\Models\Precios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TraerGruposPrecios extends Model
{
    use HasFactory;

    protected $table = 'tb_grupos'; // Nombre de la tabla
    protected $primaryKey = 'idGrupo'; // Clave primaria
    public $timestamps = false; // No se gestionarán marcas de tiempo

    protected $fillable = [
        'idGrupo',
        'nombreGrupo',
    ];
}

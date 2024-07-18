<?php

namespace App\Models\DetallesEgresos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgregarCategoriasEgresos extends Model
{
    protected $table = 'tb_categorias_egresos'; // Nombre de tu tabla
    protected $primaryKey = 'id_category'; // Clave primaria
    public $timestamps = false;

    protected $fillable = [
        'id_category',
        'nombre_category',
    ];
}

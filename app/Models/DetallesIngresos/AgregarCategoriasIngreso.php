<?php

namespace App\Models\DetallesIngresos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgregarCategoriasIngreso extends Model
{
    protected $table = 'tb_categorias_ingresos'; // Nombre de tu tabla
    protected $primaryKey = 'id_category'; // Clave primaria
    public $timestamps = false;

    protected $fillable = [
        'id_category',
        'nombre_category',
    ];
}

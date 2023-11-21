<?php

namespace App\Models\Precios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualizarPreciosMinimos extends Model
{
    use HasFactory;
    protected $table = 'tb_precios_minimos'; // Nombre de tu tabla
    protected $primaryKey = 'idPrecioMinimo'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPrecioMinimo',
        'precioMinimo',
    ];
}
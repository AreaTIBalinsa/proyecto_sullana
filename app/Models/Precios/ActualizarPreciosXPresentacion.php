<?php

namespace App\Models\Precios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualizarPreciosXPresentacion extends Model
{
    use HasFactory;
    protected $table = 'tb_precio_x_presentacion'; // Nombre de tu tabla
    protected $primaryKey = 'idPrecio'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPrecio',
        'primerEspecie',
        'segundaEspecie',
        'terceraEspecie',
        'cuartaEspecie',
    ];
}

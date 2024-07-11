<?php

namespace App\Models\Pesadas;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosEspeciePesadas extends Model
{
    use HasFactory;

    protected $table = 'tb_especies_venta'; // Nombre de la tabla
    protected $primaryKey = 'idEspecie'; // Clave primaria
    public $timestamps = true; // No se gestionarán marcas de tiempo

    protected $fillable = [
        'idEspecie',
        'nombreEspecie',
    ];
}

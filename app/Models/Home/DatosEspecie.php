<?php

namespace App\Models\Home;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosEspecie extends Model
{
    use HasFactory;

    protected $table = 'tb_especies_venta'; // Nombre de la tabla
    protected $primaryKey = 'idEspecie'; // Clave primaria
    public $timestamps = false; // No se gestionarán marcas de tiempo

    protected $fillable = [
        'idEspecie',
        'nombreEspecie',
    ];
}

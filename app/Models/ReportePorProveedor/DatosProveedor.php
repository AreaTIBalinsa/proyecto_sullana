<?php

namespace App\Models\ReportePorProveedor;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosProveedor extends Model
{
    use HasFactory;

    protected $table = 'tb_especies_compra'; // Nombre de la tabla
    protected $primaryKey = 'idEspecie'; // Clave primaria
    public $timestamps = false; // No se gestionarán marcas de tiempo

    protected $fillable = [
        'idEspecie',
        'nombreEspecie',
    ];
}

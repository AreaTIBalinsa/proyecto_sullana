<?php

namespace App\Models\Home;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TraerDatosEnTiempoReal extends Model
{
    use HasFactory;
    protected $table = 'tb_pesadas'; // Nombre de la tabla
    protected $primaryKey = 'idPesada'; // Clave primaria
    public $timestamps = false; // No se gestionarán marcas de tiempo

    protected $fillable = [
        'idEspecie',
        'pesoNetoPes',
        'cantidadPes',
        'pesoNetoJabas',
    ];
}

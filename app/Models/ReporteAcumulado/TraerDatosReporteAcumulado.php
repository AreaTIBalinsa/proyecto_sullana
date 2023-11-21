<?php

namespace App\Models\ReporteAcumulado;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TraerDatosReporteAcumulado extends Model
{
    use HasFactory;
    protected $table = 'tb_pesadas'; // Nombre de la tabla
    protected $primaryKey = 'idPesada'; // Clave primaria
    public $timestamps = false; // No se gestionarán marcas de tiempo

    protected $fillable = [
        'idEspecie',
        'pesoNetoPes',
        'cantidadPes',
        'valorConversion',
        'idGrupo',
        'fechaRegistroPes',
    ];
}

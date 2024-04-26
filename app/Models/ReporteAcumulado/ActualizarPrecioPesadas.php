<?php

namespace App\Models\ReporteAcumulado;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualizarPrecioPesadas extends Model
{
    use HasFactory;
    protected $table = 'tb_pesadas'; // Nombre de tu tabla
    protected $primaryKey = 'idPesada'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPesada',
        'fechaRegistroPes',
        'codigoCli',
        'idEspecie',
        'precioPes',
    ];

}

<?php

namespace App\Models\ReporteAcumulado;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualizarPrecioPesadas2 extends Model
{
    use HasFactory;
    protected $table = 'tb_pesadas2'; // Nombre de tu tabla
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

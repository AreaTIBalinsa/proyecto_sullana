<?php

namespace App\Models\AgregarPesadas;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgregarPesadasWebMerma extends Model
{
    use HasFactory;
    protected $table = 'tb_pesadas4'; // Nombre de tu tabla
    protected $primaryKey = 'idPesada'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPesada',
        'idProceso',
        'idEspecie',
        'pesoNetoPes',
        'horaPes',
        'codigoCli',
        'fechaRegistroPes',
        'cantidadPes',
        'precioPes',
        'pesoNetoJabas',
        'numeroJabasPes',
        'numeroCubetasPes',
        'estadoPes',
        'estadoWebPes',
        'observacionPes',
    ];

}

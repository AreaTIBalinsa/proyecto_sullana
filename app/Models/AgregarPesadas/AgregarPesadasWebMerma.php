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
        'idEspecie',
        'pesoNetoPes',
        'horaPes',
        'fechaRegistroPes',
        'cantidadPes',
        'precioPes',
        'pesoNetoJabas',
        'numeroJabasPes',
        'numeroCubetasPes',
        'estadoPes',
        'observacionPes',
    ];

}

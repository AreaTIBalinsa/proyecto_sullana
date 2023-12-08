<?php

namespace App\Models\AgregarPagoCliente;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualizarDescuentoCliente extends Model
{
    use HasFactory;
    protected $table = 'tb_descuentos'; // Nombre de tu tabla
    protected $primaryKey = 'idDescuento'; // Clave primaria
    public $timestamps = false;

    protected $fillable = [
        'idDescuento',
        'codigoCli',
        'fechaRegistroDesc',
        'especieDesc',
        'pesoDesc',
        'observacion',
    ];

}
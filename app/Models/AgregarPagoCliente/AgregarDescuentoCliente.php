<?php

namespace App\Models\AgregarPagoCliente;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgregarDescuentoCliente extends Model
{
    use HasFactory;
    protected $table = 'tb_descuentos'; // Nombre de tu tabla
    protected $primaryKey = 'idDescuento'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idDescuento',
        'fechaRegistroDesc',
        'especieDesc',
        'pesoDesc',
        'codigoCli',
        'precioDesc',
        'cantidadDesc',
        'observacion',
        'horaRegistroDesc',
        'fechaRegistroDescuento',
        'estadoDescuento',
    ];

}

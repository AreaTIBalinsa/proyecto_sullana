<?php

namespace App\Models\ReportePorProveedor;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgregarPagoClienteProveedores extends Model
{
    use HasFactory;
    protected $table = 'tb_pagos_proveedores'; // Nombre de tu tabla
    protected $primaryKey = 'idPagos'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPagos',
        'codigoCli',
        'tipoAbonoPag',
        'cantidadAbonoPag',
        'fechaOperacionPag',
        'codigoTransferenciaPag',
        'observacion',
        'fechaRegistroPag',
        'estadoPago',
        'horaOperacionPag',
        'bancaPago',
        'clasificacionPago',
    ];

}

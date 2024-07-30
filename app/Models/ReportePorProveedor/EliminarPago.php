<?php

namespace App\Models\ReportePorProveedor;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EliminarPago extends Model
{
    protected $table = 'tb_pagos_proveedores'; // Nombre de tu tabla
    protected $primaryKey = 'idPagos'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'estadoPago',
    ];
}

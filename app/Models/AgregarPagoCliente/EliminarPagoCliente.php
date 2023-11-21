<?php

namespace App\Models\AgregarPagoCliente;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EliminarPagoCliente extends Model
{
    use HasFactory;
    protected $table = 'tb_pagos'; // Nombre de tu tabla
    protected $primaryKey = 'idPagos'; // Clave primaria
    public $timestamps = false;

    protected $fillable = [
        'idPagos',
        'estadoPago',
    ];

}

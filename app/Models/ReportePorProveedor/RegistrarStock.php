<?php

namespace App\Models\ReportePorProveedor;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrarStock extends Model
{
    protected $table = 'tb_stock'; // Nombre de tu tabla
    protected $primaryKey = 'id_stock'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'fecha_stock',
        'cantidad_stock',
        'peso_stock',
        'idProveedor',
    ];
}

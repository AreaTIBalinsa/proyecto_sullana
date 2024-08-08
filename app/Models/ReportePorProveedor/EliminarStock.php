<?php

namespace App\Models\ReportePorProveedor;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EliminarStock extends Model
{
    protected $table = 'tb_stock'; // Nombre de tu tabla
    protected $primaryKey = 'id_stock'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'estado_stock',
    ];
}

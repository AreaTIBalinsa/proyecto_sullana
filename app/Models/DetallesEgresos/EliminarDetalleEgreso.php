<?php

namespace App\Models\DetallesEgresos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EliminarDetalleEgreso extends Model
{
    use HasFactory;
    protected $table = 'tb_detalles_egresos'; // Nombre de tu tabla
    protected $primaryKey = 'id_detalle'; // Clave primaria
    public $timestamps = false;

    protected $fillable = [
        'id_detalle',
        'estadoDetalle',
        'updated_at',
    ];

}

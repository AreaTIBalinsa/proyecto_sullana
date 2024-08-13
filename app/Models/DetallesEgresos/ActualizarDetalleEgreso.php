<?php

namespace App\Models\DetallesEgresos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualizarDetalleEgreso extends Model
{
    use HasFactory;
    protected $table = 'tb_detalles_egresos'; // Nombre de tu tabla
    protected $primaryKey = 'id_detalle'; // Clave primaria
    public $timestamps = false;

    protected $fillable = [
        'id_detalle',
        'fecha_detalle',
        'hora_detalle',
        'uso_detalle_egreso',
        'cantidad_detalles',
        'precio_detalle',
        'monto_detalle',
        'observacion',
        'id_category',
        'updated_at',
        'campoExtra',
    ];

}

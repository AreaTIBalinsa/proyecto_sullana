<?php

namespace App\Models\AgregarEgresoCliente;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgregarEgresoCliente extends Model
{
    use HasFactory;
    protected $table = 'tb_egresos'; // Nombre de tu tabla
    protected $primaryKey = 'idEgresos'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idEgresos',
        'nombreEgresoCamal',
        'tipoAbonoEgreso',
        'cantidadAbonoEgreso',
        'fechaOperacionEgreso',
        'bancoEgreso',
        'cantidadEgreso',
        'montoEgreso',
        'codigoTransferenciaEgreso',
        'fechaRegistroEgreso',
        'estadoEgreso',
        'clasificadoEgreso',
    ];

}

<?php

namespace App\Models\Pesadas;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CambiarPesadaCliente extends Model
{
    protected $table = 'tb_pesadas'; // Nombre de tu tabla
    protected $primaryKey = 'idPesada'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPesada',
        'idProceso',
        'codigoCli',
        'precioPes',
        'valorConversion',
        'estadoWebPes',
    ];
}

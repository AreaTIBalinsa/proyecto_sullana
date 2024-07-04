<?php

namespace App\Models\ReportePorCliente;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PesoJabasReportePorCliente3 extends Model
{
    protected $table = 'tb_pesadas3'; // Nombre de tu tabla
    protected $primaryKey = 'idPesada'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'pesoNetoJabas',
        'estadoWebPes',
    ];
}

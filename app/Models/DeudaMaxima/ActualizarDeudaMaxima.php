<?php

namespace App\Models\DeudaMaxima;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualizarDeudaMaxima extends Model
{
    use HasFactory;
    protected $table = 'tb_clientes'; // Nombre de tu tabla
    protected $primaryKey = 'idCliente'; // Clave primaria
    public $timestamps = false;

    protected $fillable = [
        'idCliente',
        'limitEndeudamiento',
        'codigoCli',
    ];

}

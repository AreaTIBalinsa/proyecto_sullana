<?php

namespace App\Models\ConsultarClientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EliminarCliente extends Model
{
    protected $table = 'tb_clientes'; // Nombre de tu tabla
    protected $primaryKey = 'idCliente'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'estadoEliminadoCli',
    ];
}

<?php

namespace App\Models\RegistrarClientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TraerCodigoCli extends Model
{
    use HasFactory;

    protected $table = 'tb_clientes'; // Nombre de la tabla
    protected $primaryKey = 'idCliente'; // Clave primaria
    public $timestamps = false; // No se gestionarán marcas de tiempo

    protected $fillable = [
        'idCliente',
        'codigoCli',
    ];
}

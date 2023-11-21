<?php

namespace App\Models\RegistrarClientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TraerZonas extends Model
{
    use HasFactory;

    protected $table = 'tb_zonas'; // Nombre de la tabla
    protected $primaryKey = 'idZona'; // Clave primaria
    public $timestamps = false; // No se gestionarán marcas de tiempo

    protected $fillable = [
        'idZona',
        'nombreZon',
    ];
}

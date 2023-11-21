<?php

namespace App\Models\RegistrarClientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TraerDocumentos extends Model
{
    use HasFactory;

    protected $table = 'tb_tipo_documento'; // Nombre de la tabla
    protected $primaryKey = 'idTipoDocumento'; // Clave primaria
    public $timestamps = false; // No se gestionarán marcas de tiempo

    protected $fillable = [
        'idTipoDocumento',
        'nombreTipoDocumento',
    ];
}

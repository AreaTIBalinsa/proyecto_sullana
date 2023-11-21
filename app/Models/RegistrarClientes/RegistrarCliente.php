<?php

namespace App\Models\RegistrarClientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrarCliente extends Model
{
    protected $table = 'tb_clientes'; // Nombre de tu tabla
    protected $primaryKey = 'idCliente'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'apellidoPaternoCli',
        'apellidoMaternoCli',
        'nombresCli',
        'tipoDocumentoCli',
        'numDocumentoCli',
        'contactoCli',
        'direccionCli',
        'idEstadoCli',
        'fechaRegistroCli',
        'horaRegistroCli',
        'usuarioRegistroCli',
        'codigoCli',
        'idGrupo',
        'comentarioCli',
        'idZona',
        'estadoEliminadoCli',
    ];
}

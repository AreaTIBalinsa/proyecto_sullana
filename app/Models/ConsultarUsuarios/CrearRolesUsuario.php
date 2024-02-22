<?php

namespace App\Models\ConsultarUsuarios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrearRolesUsuario extends Model
{
    protected $table = 'tb_roles_de_usuario'; // Nombre de tu tabla
    protected $primaryKey = 'idRol'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idRol',
        'idMenu',
        'idSubMenu',
        'estadoRol',
        'idUsuario'
    ];
}

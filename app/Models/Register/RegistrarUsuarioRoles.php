<?php

namespace App\Models\Register;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrarUsuarioRoles extends Model
{
    protected $table = 'tb_roles_de_usuario'; // Nombre de tu tabla
    protected $primaryKey = 'idRol'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idUsuario',
        'idMenu',
        'idSubMenu',
        'estadoRol',
    ];
}

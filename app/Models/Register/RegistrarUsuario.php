<?php

namespace App\Models\Register;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrarUsuario extends Model
{
    protected $table = 'users'; // Nombre de tu tabla
    protected $primaryKey = 'id'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'apellidoPaternoUsu',
        'apellidoMaternoUsu',
        'nombresUsu',
        'sexoUsu',
        'dniUsu',
        'celularUsu',
        'direccionUsu',
        'tipoUsu',
        'rutaPerfilUsu',
        'email',
        'username',
        'password',
    ];
}

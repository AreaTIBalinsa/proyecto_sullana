<?php

namespace App\Models\Zonas;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EditarZona extends Model
{
    use HasFactory;
    protected $table = 'tb_zonas'; // Nombre de tu tabla
    protected $primaryKey = 'idZona'; // Clave primaria
    public $timestamps = false;

    protected $fillable = [
        'nombreZon',
    ];

}

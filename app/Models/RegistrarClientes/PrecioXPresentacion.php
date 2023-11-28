<?php

namespace App\Models\RegistrarClientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrecioXPresentacion extends Model
{
    protected $table = 'tb_precio_x_presentacion'; // Nombre de tu tabla
    protected $primaryKey = 'idPrecio'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'codigoCli',
        'primerEspecie',
        'segundaEspecie',
        'terceraEspecie',
        'cuartaEspecie',
        'quintaEspecie',
        'sextaEspecie',
        'septimaEspecie',
        'octavaEspecie',
        'novenaEspecie',
        'decimaEspecie',
        'decimaPrimeraEspecie',
        'decimaSegundaEspecie',
        'decimaTerceraEspecie',
        'decimaCuartaEspecie',
        'decimaQuintaOtrasEspecies',
    ];
}

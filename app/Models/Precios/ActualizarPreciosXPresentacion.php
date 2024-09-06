<?php

namespace App\Models\Precios;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualizarPreciosXPresentacion extends Model
{
    use HasFactory;
    protected $table = 'tb_precio_x_presentacion'; // Nombre de tu tabla
    protected $primaryKey = 'idPrecio'; // Clave primaria
    public $timestamps = false;

    protected $fillable = [
        'idPrecio',
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
        'decimaQuintaOtrasEspecie',
        'decimaSextaEspecie',
        'decimaSeptimaEspecie',
        'decimaOctavaEspecie',
        'decimaNovenaEspecie',
        'vigesimaEspecie',
        'vigesimaPrimeraEspecie',
        'vigesimaSegundaEspecie',
        'vigesimaTerceraEspecie',
        'ultimaActualizacionUsuario',
        'updated_at',
    ];
}
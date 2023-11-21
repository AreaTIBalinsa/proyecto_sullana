<?php

namespace App\Models\ValorConversion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualizarValorConversion extends Model
{
    use HasFactory;
    protected $table = 'tb_precio_x_presentacion'; // Nombre de tu tabla
    protected $primaryKey = 'idPrecio'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPrecio',
        'valorConversionPrimerEspecie',
        'valorConversionSegundaEspecie',
        'valorConversionTerceraEspecie',
        'valorConversionCuartaEspecie',
    ];
}

<?php

namespace App\Models\ConsultarClientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValorDeConversion extends Model
{
    protected $table = 'tb_precio_x_presentacion'; // Nombre de tu tabla
    protected $primaryKey = 'idPrecio'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'codigoCli',
        'valorConversionPrimerEspecie',
        'valorConversionSegundaEspecie',
        'valorConversionTerceraEspecie',
        'valorConversionCuartaEspecie',
    ];
}

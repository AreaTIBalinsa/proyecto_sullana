<?php

namespace App\Models\AgregarPedido;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgregarPedido extends Model
{
    use HasFactory;
    protected $table = 'tb_pedidos'; // Nombre de tu tabla
    protected $primaryKey = 'idPedido'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPedido',
        'codigoCliPedidos',
        'pedidoPrimerEspecie',
        'pedidoSegundaEspecie',
        'pedidoTercerEspecie',
        'pedidoCuartaEspecie',
        'pedidoQuintaEspecie',
        'pedidoSextaEspecie',
        'pedidoSeptimaEspecie',
        'pedidoOctavaEspecie',
        'pedidoNovenaEspecie',
        'pedidoDecimaEspecie',
        'pedidoDecimaPrimeraEspecie',
        'pedidoDecimaSegundaEspecie',
        'pedidoDecimaTerceraEspecie',
        'pedidoDecimaCuartaEspecie',
        'comentarioPedido',
        'estadoPedido',
    ];

}

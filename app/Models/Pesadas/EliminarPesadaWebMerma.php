<?php

namespace App\Models\Pesadas;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EliminarPesadaWebMerma extends Model
{
    use HasFactory;
    protected $table = 'tb_pesadas4'; // Nombre de tu tabla
    protected $primaryKey = 'idPesada'; // Clave primaria
    public $timestamps = true;

    protected $fillable = [
        'idPesada',
        'estadoPes',
    ];

}

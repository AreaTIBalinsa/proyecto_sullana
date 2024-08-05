<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarSaldo\AgregarSaldoCliente;
use Carbon\Carbon;

class ResumenDinerarioController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('resumen_dinerario');
        }
        return redirect('/login');
    }

    public function consulta_TraerPagosResumenDinerario(Request $request){

        $fecha = $request->input('fecha');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT * FROM tb_pagos WHERE estadoPago = 1 AND tipoAbonoPag != ? AND tipoAbonoPag != ? AND fechaOperacionPag BETWEEN ? AND ?
            ',["Saldo", "Flete", $fecha, $fecha]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}

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
        $fecha2 = $request->input('fecha2');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT * FROM tb_pagos WHERE estadoPago = 1 AND tipoAbonoPag != ? AND tipoAbonoPag != ? AND fechaOperacionPag BETWEEN ? AND ?
            ',["Saldo", "Flete", $fecha, $fecha2]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPagosResumenDinerarioEgresosPaul(Request $request){

        $fecha = $request->input('fecha');
        $fecha2 = $request->input('fecha2');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT * FROM tb_egresos WHERE estadoEgreso = 1 AND fechaOperacionEgreso BETWEEN ? AND ?
            ',[$fecha, $fecha2]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPagosResumenDinerarioEgresosCamal(Request $request){

        $fecha = $request->input('fecha');
        $fecha2 = $request->input('fecha2');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT * FROM tb_detalles_egresos WHERE estadoDetalle = 1 AND fecha_detalle BETWEEN ? AND ?
            ',[$fecha, $fecha2]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPagosResumenDinerarioEgresosProveedores(Request $request){

        $fecha = $request->input('fecha');
        $fecha2 = $request->input('fecha2');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT numGuia,
            cantidadGuia,
            pesoBrutoGuia,
            pesoTaraGuia,
            precioGuia,
            fechaGuia,
            estadoGuia,
            nombreEspecie
            FROM tb_guias 
            INNER JOIN tb_especies_compra ON tb_guias.idProveedor = tb_especies_compra.idEspecie 
            WHERE estadoGuia = 1 AND fechaGuia BETWEEN ? AND ?
            ',[$fecha, $fecha2]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}

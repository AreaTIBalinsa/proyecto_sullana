<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPagoCliente\TraerClientesAgregarPagoCliente;

class ConfiguracionesController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('configuraciones');
        }
        return redirect('/login');
    }

    public function consulta_TraerClientesPedidos(Request $request){

        $nombreRegistrarPedidoCliente = $request->input('inputRegistrarPedido');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesAgregarPagoCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=','1')
                ->where('idEstadoCli','=','1')
                ->where(function($query) use ($nombreRegistrarPedidoCliente) {
                    $query->where('nombresCli', 'LIKE', "%$nombreRegistrarPedidoCliente%")
                        ->orWhere('apellidoPaternoCli', 'LIKE', "%$nombreRegistrarPedidoCliente%")
                        ->orWhere('apellidoMaternoCli', 'LIKE', "%$nombreRegistrarPedidoCliente%");
                })
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EspeciesPedido (){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT idEspecie, nombreEspecie
                FROM tb_especies_venta where 
                idEspecie != 9 and idEspecie != 10
                and idEspecie != 11 and idEspecie != 13
                and idEspecie != 12 and idEspecie != 14
                and idEspecie != 15 and idEspecie != 8');
            
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}

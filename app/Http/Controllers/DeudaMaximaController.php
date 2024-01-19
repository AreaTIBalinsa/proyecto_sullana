<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\DeudaMaxima\ActualizarDeudaMaxima;

class DeudaMaximaController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('deuda_maxima');
        }
        return redirect('/login');
    }

    public function consulta_DeudaMaximaClientes(Request $request){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT 
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto, 
                codigoCli,limitEndeudamiento 
            FROM tb_clientes WHERE idEstadoCli = 1
            ');
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }  

    public function consulta_ActualizarDeudaMaxima(Request $request){

        $idCodigoClienteDeudaMaxima = $request->input('idCodigoClienteDeudaMaxima');
        $valorDeudaMaxima = $request->input('valorDeudaMaxima');

        if (Auth::check()) {
            $actualizarDeudaMaxima = new ActualizarDeudaMaxima;
            $actualizarDeudaMaxima->where('codigoCli', $idCodigoClienteDeudaMaxima)
                ->update([
                    'limitEndeudamiento' => $valorDeudaMaxima,
                ]);
            
            return response()->json(['success' => true], 200);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }  
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ValorConversion\ActualizarValorConversion;

class ValorDeConversionController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('valor_conversion');
        }
        return redirect('/login');
    }

    public function consulta_TraerValorConversion(Request $request){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT tb_precio_x_presentacion.idPrecio, 
                   tb_precio_x_presentacion.codigoCli, 
                   tb_precio_x_presentacion.valorConversionPrimerEspecie,valorConversionSegundaEspecie,
                   valorConversionTerceraEspecie,valorConversionCuartaEspecie,
                   tb_zonas.idZona,
                   IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_precio_x_presentacion
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_precio_x_presentacion.codigoCli
            INNER JOIN tb_zonas on tb_zonas.idZona = tb_clientes.idZona  
            WHERE tb_clientes.idEstadoCli = 1 and tb_clientes.idGrupo = 1 and estadoEliminadoCli = 1 ORDER BY FIELD(tb_zonas.idZona,4,2,3,1),nombreCompleto ASC');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarValorConversion(Request $request){

        $idClienteActualizarConversion = $request->input('idClienteActualizarConversion');
        $nuevoValorConversion = $request->input('nuevoValorConversion');
        $numeroEspecieValorDeConversion = $request->input('numeroEspecieValorDeConversion');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            switch ($numeroEspecieValorDeConversion) {
                case 1:
                    ActualizarValorConversion::where('idPrecio', $idClienteActualizarConversion)
                        ->update(['valorConversionPrimerEspecie' => $nuevoValorConversion]);
                    break;
                case 2:
                    ActualizarValorConversion::where('idPrecio', $idClienteActualizarConversion)
                        ->update(['valorConversionSegundaEspecie' => $nuevoValorConversion]);
                    break;
                case 3:
                    ActualizarValorConversion::where('idPrecio', $idClienteActualizarConversion)
                        ->update(['valorConversionTerceraEspecie' => $nuevoValorConversion]);
                    break;
                case 4:
                    ActualizarValorConversion::where('idPrecio', $idClienteActualizarConversion)
                        ->update(['valorConversionCuartaEspecie' => $nuevoValorConversion]);
                    break;
                default:
                    return response()->json(['error' => 'Número de especie inválido'], 400);
            }

            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Precios\ActualizarPreciosXPresentacion;
use App\Models\Precios\TraerGruposPrecios;
use App\Models\Precios\ActualizarPreciosMinimos;

class PreciosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('precios');
        }
        return redirect('/login');
    }

    public function consulta_TraerPreciosXPresentacion(Request $request){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT tb_precio_x_presentacion.idPrecio, 
            tb_precio_x_presentacion.codigoCli, 
            tb_precio_x_presentacion.primerEspecie,
            tb_precio_x_presentacion.segundaEspecie,
            tb_precio_x_presentacion.terceraEspecie,
            tb_precio_x_presentacion.cuartaEspecie,
            tb_clientes.idGrupo,
            tb_zonas.idZona,
            IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_precio_x_presentacion
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_precio_x_presentacion.codigoCli 
            INNER JOIN tb_zonas on tb_zonas.idZona = tb_clientes.idZona 
            WHERE tb_clientes.idEstadoCli = 1 and tb_clientes.estadoEliminadoCli != 0 ORDER BY FIELD(tb_zonas.idZona,4,2,3,1),nombreCompleto ASC');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPrecioXPresentacion(Request $request){

        $idClienteActualizarPrecioXPresentacion = $request->input('idClienteActualizarPrecioXPresentacion');
        $valorActualizarPrecioXPresentacion = $request->input('valorActualizarPrecioXPresentacion');
        $numeroEspeciePrecioXPresentacion = $request->input('numeroEspeciePrecioXPresentacion');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            switch ($numeroEspeciePrecioXPresentacion) {
                case 1:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['primerEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 2:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['segundaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 3:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['terceraEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 4:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['cuartaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                default:
                    return response()->json(['error' => 'Número de especie inválido'], 400);
            }

            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerGruposPrecios(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerGruposPrecios::select('idGrupo', 'nombreGrupo')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPreciosMinimos(Request $request){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT idPrecioMinimo,
                    precioMinimo,
                    nombreEspeciePrecioMinimo
                    FROM tb_precios_minimos ORDER BY idPrecioMinimo ASC');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPrecioMinimo(Request $request)
    {
        $idEspecie = $request->input('idEspecie');
        $precio = $request->input('precio');

        if (Auth::check()) {
            ActualizarPreciosMinimos::where('idPrecioMinimo', $idEspecie)
            ->update(['precioMinimo' => $precio]);
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarNuevoPrecioPollo(Request $request){

        $idCodigoCliente = $request->input('idCodigoCliente');
        $resultadoEspecieUno = $request->input('resultadoEspecieUno');
        $resultadoEspecieDos = $request->input('resultadoEspecieDos');
        $resultadoEspecieTres = $request->input('resultadoEspecieTres');
        $resultadoEspecieCuatro = $request->input('resultadoEspecieCuatro');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            ActualizarPreciosXPresentacion::where('idPrecio', $idCodigoCliente)
                ->update(['primerEspecie' => $resultadoEspecieUno,
                'segundaEspecie' => $resultadoEspecieDos,
                'terceraEspecie' => $resultadoEspecieTres,
                'cuartaEspecie' => $resultadoEspecieCuatro]);
                
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}

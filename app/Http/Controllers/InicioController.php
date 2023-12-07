<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Home\DatosEspecie;
use App\Models\Home\TraerDatosEnTiempoReal;

class InicioController extends Controller
{
    public function index(){
        if (Auth::check()){
            return view('welcome');
        }
        return redirect('/login');
    }

    public function consulta_DatosEspecie(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DatosEspecie::select('idEspecie', 'nombreEspecie')
                ->orderBy('idEspecie', 'asc')
                ->where('idEspecie', '!=' , '9')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDatosEnTiempoReal(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerDatosEnTiempoReal::select('idEspecie', 'pesoNetoPes', 'cantidadPes', 'valorConversion', 'idGrupo')
                ->whereRaw('fechaRegistroPes = CURDATE()')
                ->where('estadoPes', '=', 1)
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDatosEnTiempoRealCompra(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::table('tb_guias')
                ->selectRaw('IFNULL(SUM(cantidadGuia), 0) as totalCantidadGuia, IFNULL(SUM(pesoGuia), 0) as totalPesoGuia')
                ->whereRaw('fechaGuia = CURDATE()')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDatosDiasAnteriores(Request $request)
    {
        $fecha = $request->input('fecha');
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerDatosEnTiempoReal::select('idEspecie', 'pesoNetoPes', 'cantidadPes', 'valorConversion', 'idGrupo')
                ->where('fechaRegistroPes', '=', $fecha)
                ->where('estadoPes', '=', 1)
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDatosDiasAnterioresCompra(Request $request)
    {
        $fecha = $request->input('fecha');
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::table('tb_guias')
                ->selectRaw('IFNULL(SUM(cantidadGuia), 0) as totalCantidadGuia, IFNULL(SUM(pesoGuia), 0) as totalPesoGuia')
                ->whereRaw('fechaGuia = ?', [$fecha])
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}

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
                ->orderByRaw("FIELD(idEspecie,1,2,17,3,4,18,16,19,5,20,6,21,7,22,8,23,10,11,12,13,14,15)")
                ->orderBy('idEspecie', 'asc')
                ->where('idEspecie', '!=' , '9')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_DatosEspecie2(Request $request)
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
        $fecha = $request->input('fecha');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT
                    tb_pesadas.idPesada, 
                    tb_pesadas.idEspecie,
                    tb_pesadas.pesoNetoPes,
                    tb_pesadas.fechaRegistroPes,
                    tb_pesadas.cantidadPes,
                    tb_pesadas.precioPes,
                    tb_pesadas.pesoNetoJabas,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas.codigoCli
                WHERE fechaRegistroPes = ? and estadoPes = 1
                UNION
                SELECT 
                    tb_pesadas3.idPesada, 
                    tb_pesadas3.idEspecie,
                    tb_pesadas3.pesoNetoPes,
                    tb_pesadas3.fechaRegistroPes,
                    tb_pesadas3.cantidadPes,
                    tb_pesadas3.precioPes,
                    tb_pesadas3.pesoNetoJabas,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas3
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas3.codigoCli
                WHERE fechaRegistroPes = ? and estadoPes = 1
                UNION
                SELECT 
                    tb_pesadas2.idPesada, 
                    tb_pesadas2.idEspecie,
                    tb_pesadas2.pesoNetoPes,
                    tb_pesadas2.fechaRegistroPes,
                    tb_pesadas2.cantidadPes,
                    tb_pesadas2.precioPes,
                    tb_pesadas2.pesoNetoJabas,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas2
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas2.codigoCli
                WHERE fechaRegistroPes = ? and estadoPes = 1
                ORDER BY fechaRegistroPes DESC, idPesada ASC' , [$fecha, $fecha, $fecha]);

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

    public function consulta_TraerStock(Request $request)
    {
        $fecha = $request->input('fecha');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT
                    tb_stock.id_stock, 
                    tb_stock.fecha_stock,
                    tb_stock.cantidad_stock,
                    tb_stock.peso_stock,
                    tb_stock.estado_stock,
                    tb_stock.idProveedor,
                    tb_stock.precio_stock,
                    tb_especies_compra.nombreEspecie
                FROM tb_stock
                INNER JOIN tb_especies_compra ON tb_especies_compra.idEspecie = tb_stock.idProveedor
                WHERE fecha_stock = ? and estado_stock = 1' , [$fecha]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}

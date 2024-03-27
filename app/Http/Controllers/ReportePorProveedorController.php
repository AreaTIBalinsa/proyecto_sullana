<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ReportePorProveedor\DatosProveedor;
use App\Models\ReportePorProveedor\RegistrarGuia;
use App\Models\ReportePorProveedor\EliminarGuia;
use App\Models\ReportePorProveedor\ActualizarGuia;

class ReportePorProveedorController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_por_proveedor');
        }
        return redirect('/login');
    }

    public function consulta_ConsultarProveedor(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('select idGuia, 
                    numGuia,
                    tb_especies_compra.nombreEspecie as nombreEspecieCompra,
                    tb_guias.idProveedor,
                    pesoGuia,
                    cantidadGuia,
                    precioGuia,
                    fechaGuia
                    from tb_guias
                    INNER JOIN tb_especies_compra ON tb_guias.idProveedor = tb_especies_compra.idEspecie 
                    WHERE tb_guias.estadoGuia = 1 AND fechaGuia BETWEEN ? AND ? order by idGuia asc',[$fechaDesde,$fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_DatosProveedor(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DatosProveedor::select('idEspecie', 'nombreEspecie')
                ->orderBy('idEspecie', 'asc')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarGuia(Request $request)
    {
        $idProveedor = $request->input('idProveedor');
        $cantidadAgregarGuia = $request->input('cantidadAgregarGuia');
        $pesoAgregarGuia = $request->input('pesoAgregarGuia');
        $precioAgregarGuia = $request->input('precioAgregarGuia');
        $fechaRegistrarGuia = $request->input('fechaRegistrarGuia');
        $valorNumeroGuiaAgregarGuia = $request->input('valorNumeroGuiaAgregarGuia');

        if (Auth::check()) {
            $registrarGuia = new RegistrarGuia;
            $registrarGuia->idProveedor = $idProveedor;
            $registrarGuia->cantidadGuia = $cantidadAgregarGuia;
            $registrarGuia->precioGuia = $precioAgregarGuia;
            $registrarGuia->pesoGuia = $pesoAgregarGuia;
            $registrarGuia->fechaGuia = $fechaRegistrarGuia;
            $registrarGuia->numGuia = $valorNumeroGuiaAgregarGuia;
            $registrarGuia->save();
        
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarGuia(Request $request)
    {
        $codigoGuia = $request->input('codigoGuia');

        if (Auth::check()) {
            $EliminarGuia = new EliminarGuia;
            $EliminarGuia->where('idGuia', $codigoGuia)
                ->update([
                    'estadoGuia' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EditarGuia(Request $request){

        $codigoGuia = $request->input('codigoGuia');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            select idGuia, 
            numGuia,
            idEspecie,
            idProveedor,
            pesoGuia,
            cantidadGuia,
            precioGuia,
            fechaGuia
            from tb_guias
            WHERE idGuia = ?',[$codigoGuia]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarGuiaEditar(Request $request)
    {
        $idActualizarGuia = $request->input('idActualizarGuia');
        $idProveedorEditar = $request->input('idProveedorEditar');
        $cantidadAgregarGuiaEditar = $request->input('cantidadAgregarGuiaEditar');
        $pesoAgregarGuiaEditar = $request->input('pesoAgregarGuiaEditar');
        $precioAgregarGuiaEditar = $request->input('precioAgregarGuiaEditar');
        $fechaRegistrarGuiaEditar = $request->input('fechaRegistrarGuiaEditar');
        $valorNumeroGuiaAgregarGuiaEditar = $request->input('valorNumeroGuiaAgregarGuiaEditar');

        if (Auth::check()) {
            $ActualizarGuia = new ActualizarGuia;
            $ActualizarGuia->where('idGuia', $idActualizarGuia)
                ->update([
                    'idProveedor' => $idProveedorEditar,
                    'cantidadGuia' => $cantidadAgregarGuiaEditar,
                    'pesoGuia' => $pesoAgregarGuiaEditar,
                    'precioGuia' => $precioAgregarGuiaEditar,
                    'fechaGuia' => $fechaRegistrarGuiaEditar,
                    'numGuia' => $valorNumeroGuiaAgregarGuiaEditar,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}
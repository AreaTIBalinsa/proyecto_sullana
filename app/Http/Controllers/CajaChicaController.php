<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarEgresoCliente\AgregarEgresoCliente;

class CajaChicaController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('caja_chica');
        }
        return redirect('/login');
    }

    public function consulta_AgregarEgreso (Request $request){

        $montoAgregEgresoCliente = $request->input('montoAgregEgresoCliente');
        $fechaAgregEgresoCliente = $request->input('fechaAgregEgresoCliente');
        $formaDePagoEgreso = $request->input('formaDePagoEgreso');
        $bancoAgregEgresoCliente = $request->input('bancoAgregEgresoCliente');
        $codAgregEgresoCliente = $request->input('codAgregEgresoCliente');
        $usoReporteEgreso = $request->input('usoReporteEgreso');

        if (Auth::check()) {
            $agregarEgresoCliente = new AgregarEgresoCliente;
            $agregarEgresoCliente->cantidadAbonoEgreso = $montoAgregEgresoCliente;
            $agregarEgresoCliente->fechaOperacionEgreso = $fechaAgregEgresoCliente;
            $agregarEgresoCliente->tipoAbonoEgreso = $formaDePagoEgreso;
            $agregarEgresoCliente->bancoEgreso = $bancoAgregEgresoCliente;
            $agregarEgresoCliente->codigoTransferenciaEgreso = $codAgregEgresoCliente;
            $agregarEgresoCliente->nombreEgresoCamal = $usoReporteEgreso;
            $agregarEgresoCliente->fechaRegistroEgreso = now()->setTimezone('America/New_York')->toDateString();
            $agregarEgresoCliente->estadoEgreso = 1;
            $agregarEgresoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerEgresosFechas(Request $request){

        $fechaDesdeTraerPagos = $request->input('fechaDesdeTraerPagos');
        $fechaHastaTraerPagos = $request->input('fechaHastaTraerPagos');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT 
            nombreEgresoCamal, 
            idEgresos,tipoAbonoEgreso,cantidadAbonoEgreso,fechaOperacionEgreso,bancoEgreso,codigoTransferenciaEgreso,fechaRegistroEgreso,estadoEgreso 
            FROM tb_egresos 
            WHERE estadoEgreso = 1 and fechaOperacionEgreso BETWEEN ? AND ?', [$fechaDesdeTraerPagos, $fechaHastaTraerPagos]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }  

    public function consulta_EliminarEgreso(Request $request){

        $codigoEgreso = $request->input('codigoEgreso');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            DB::select('
            UPDATE tb_egresos SET estadoEgreso = 0
            WHERE idEgresos = ? ',[$codigoEgreso]);
    
            // Devuelve los datos en formato JSON
            return response()->json(['success' => true], 200);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    } 

    public function consulta_AgregarEgresoEditar(Request $request){
        
        $idReporteDeEgreso = $request->input('idReporteDeEgreso');
        $idAgregarEgresoEditar = $request->input('idAgregarEgresoEditar');
        $valorAgregarEgresoClienteEditar = $request->input('valorAgregarEgresoClienteEditar');
        $formaDePagoEgresoEditar = $request->input('formaDePagoEgresoEditar');
        $bancoAgregarEgresoClienteEditar = $request->input('bancoAgregarEgresoClienteEditar');
        $fechaAgregarEgresoEditar = $request->input('fechaAgregarEgresoEditar');
        $codAgregarEgresoClienteEditar = $request->input('codAgregarEgresoClienteEditar');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            DB::select('
            UPDATE tb_egresos SET 
            codigoTransferenciaEgreso = ?,
            fechaOperacionEgreso = ?,
            bancoEgreso = ?,
            tipoAbonoEgreso = ?,
            cantidadAbonoEgreso = ?,
            nombreEgresoCamal = ?
            WHERE idEgresos = ? ',[$codAgregarEgresoClienteEditar,$fechaAgregarEgresoEditar,$bancoAgregarEgresoClienteEditar,$formaDePagoEgresoEditar,$valorAgregarEgresoClienteEditar,$idAgregarEgresoEditar,$idReporteDeEgreso]);
    
            // Devuelve los datos en formato JSON
            return response()->json(['success' => true], 200);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}

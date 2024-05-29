<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarEgresoCliente\AgregarEgresoCliente;
use App\Models\AgregarPagoCliente\AgregarPagoCliente;

class CajaChicaController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('caja_chica');
        }
        return redirect('/login');
    }

    public function consulta_TraerPagosFechas(Request $request){

        $fechaDesde = $request->input('fechaDesdeTraerPagos');
        $fechaHasta = $request->input('fechaHastaTraerPagos');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT tb_pagos.idPagos, 
                    tb_pagos.cantidadAbonoPag,
                    tb_pagos.tipoAbonoPag,
                    tb_pagos.fechaOperacionPag,
                    tb_pagos.codigoTransferenciaPag,
                    tb_pagos.observacion,
                    tb_pagos.fechaRegistroPag,
                    tb_pagos.horaOperacionPag,
                    tb_pagos.bancaPago,
                   IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_pagos
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
            WHERE tb_pagos.estadoPago = 1 and clasificacionPago = 2 and tipoAbonoPag != ? and fechaOperacionPag BETWEEN ? AND ?', ["Saldo",$fechaDesde, $fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarPagoCliente(Request $request){

        $codigoCliente = $request->input('codigoCliente');
        $montoAgregarPagoCliente = $request->input('montoAgregarPagoCliente');
        $fechaAgregarPagoCliente = $request->input('fechaAgregarPagoCliente');
        $formaDePago = $request->input('formaDePago');
        $codAgregarPagoCliente = $request->input('codAgregarPagoCliente');
        $comentarioAgregarPagoCliente = $request->input('comentarioAgregarPagoCliente');
        $bancoAgregarPagoCliente = $request->input('bancoAgregarPagoCliente');
        $horaAgregarPago = $request->input('horaAgregarPago');

        if (Auth::check()) {
            $agregarPagoCliente = new AgregarPagoCliente;
            $agregarPagoCliente->codigoCli = $codigoCliente;
            $agregarPagoCliente->tipoAbonoPag = $formaDePago;
            $agregarPagoCliente->cantidadAbonoPag = $montoAgregarPagoCliente;
            $agregarPagoCliente->fechaOperacionPag = $fechaAgregarPagoCliente;
            $agregarPagoCliente->codigoTransferenciaPag = $codAgregarPagoCliente;
            $agregarPagoCliente->observacion = $comentarioAgregarPagoCliente;
            $agregarPagoCliente->bancaPago = $bancoAgregarPagoCliente;
            $agregarPagoCliente->horaOperacionPag = $horaAgregarPago;
            $agregarPagoCliente->fechaRegistroPag = now()->setTimezone('America/New_York')->toDateString();
            $agregarPagoCliente->estadoPago = 1;
            $agregarPagoCliente->clasificacionPago = 2;
            $agregarPagoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
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
            $agregarEgresoCliente->clasificadoEgreso = 1;
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
            WHERE estadoEgreso = 1 and clasificadoEgreso = 1 and fechaOperacionEgreso BETWEEN ? AND ?', [$fechaDesdeTraerPagos, $fechaHastaTraerPagos]);
    
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

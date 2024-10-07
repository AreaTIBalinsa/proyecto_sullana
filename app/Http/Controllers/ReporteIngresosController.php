<?php

namespace App\Http\Controllers;

use App\Models\AgregarPagoCliente\AgregarPagoCliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReporteIngresosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_ingresos');
        }
        return redirect('/login');
    }

    public function consulta_TraerPagosFechasReporteIngresos(Request $request){

        $fechaDesde = $request->input('fechaDesdeTraerIngresosBancos');
        $fechaHasta = $request->input('fechaHastaTraerIngresosBancos');
        $importePago = $request->input('importePago');
        $codigoPago = $request->input('codigoPago');
        $obtenerNombreCompleto = $request->input('obtenerNombreCompleto');
    
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT 
                    tb_pagos.idPagos, 
                    tb_pagos.cantidadAbonoPag,
                    tb_pagos.tipoAbonoPag,
                    tb_pagos.fechaOperacionPag,
                    tb_pagos.codigoTransferenciaPag,
                    tb_pagos.observacion,
                    tb_pagos.fechaRegistroPag,
                    tb_pagos.horaOperacionPag,
                    tb_pagos.bancaPago,
                    tb_pagos.clasificacionPago,
                    tb_pagos.codigoCli,
                    tb_pagos.campoExtra,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM 
                    tb_pagos
                LEFT JOIN 
                    tb_clientes 
                ON 
                    tb_clientes.codigoCli = tb_pagos.codigoCli  
                WHERE 
                    tb_pagos.estadoPago = 1 
                    AND tb_pagos.clasificacionPago IN (1, 2, 3) 
                    AND tb_pagos.tipoAbonoPag != ? 
                    AND tb_pagos.fechaOperacionPag BETWEEN ? AND ?
                    AND IFNULL(tb_pagos.cantidadAbonoPag, "") LIKE ? 
                    AND IFNULL(tb_pagos.codigoTransferenciaPag, "") LIKE ?
                    AND IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli), "") LIKE ?
                    ORDER BY nombreCompleto', ["Saldo", $fechaDesde, $fechaHasta, "%$importePago%", "%$codigoPago%", "%$obtenerNombreCompleto%"]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }    

    public function consulta_TraerPagosDirectoGranjaFechasBanco(Request $request){

        $fechaDesde = $request->input('fechaDesdeTraerIngresosBancos');
        $fechaHasta = $request->input('fechaHastaTraerIngresosBancos');
        $importePago = $request ->input('importePago');
        $codigoPago = $request ->input('codigoPago');
        $obtenerNombreCompleto = $request->input('obtenerNombreCompleto');

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
                tb_pagos.clasificacionPago,
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pagos
                LEFT JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
                WHERE tb_pagos.estadoPago = 1 
                AND tb_pagos.clasificacionPago = 5
                AND tb_pagos.tipoAbonoPag != ? 
                AND tb_pagos.fechaOperacionPag BETWEEN ? AND ? 
                AND tb_pagos.cantidadAbonoPag LIKE ? 
                AND tb_pagos.codigoTransferenciaPag LIKE ?
                AND (CONCAT_WS(" ", nombresCli, apellidoPaternoCli) LIKE ?)
                ORDER BY nombreCompleto', ["Saldo", $fechaDesde, $fechaHasta, "%$importePago%", "%$codigoPago%", "%$obtenerNombreCompleto%"]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_VerificarPagoUpdate(Request $request){

        $fechaAgregarPagoCliente = $request->input('fechaAgregarPagoCliente');
        $montoAgregarPagoCliente = $request->input('montoAgregarPagoCliente');
        $bancoAgregarPagoCliente = $request ->input('bancoAgregarPagoCliente');

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
                tb_pagos.clasificacionPago
                FROM tb_pagos
                WHERE tb_pagos.estadoPago = 1 
                AND tb_pagos.clasificacionPago = 1
                AND tb_pagos.codigoCli = 0
                AND tb_pagos.tipoAbonoPag != ? 
                AND tb_pagos.fechaOperacionPag = ? 
                AND tb_pagos.cantidadAbonoPag = ? 
                AND tb_pagos.bancaPago = ?', ["Saldo", $fechaAgregarPagoCliente, $montoAgregarPagoCliente, $bancoAgregarPagoCliente]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPagoClienteExcel(Request $request)
    {
        $idPagoActualizar = $request->input('idPagoActualizar');
        $codigoCliente = $request->input('codigoCliente');
        $montoAgregarPagoCliente = $request->input('montoAgregarPagoCliente');
        $fechaAgregarPagoCliente = $request->input('fechaAgregarPagoCliente');
        $formaDePago = $request->input('formaDePago');
        $codAgregarPagoCliente = $request->input('codAgregarPagoCliente');
        $comentarioAgregarPagoCliente = $request->input('comentarioAgregarPagoCliente');
        $bancoAgregarPagoCliente = $request->input('bancoAgregarPagoCliente');
        $horaAgregarPago = $request->input('horaAgregarPago');
        $pagoDerivado = $request->input('pagoDerivado');
        $nombreCliente = $request->input('nombreCliente');
        $fechaRegistroPagoCliente = $request->input('fechaRegistroPagoCliente');

        if (Auth::check()) {
            // Retrieve the existing record using idPagoActualizar
            $agregarPagoCliente = AgregarPagoCliente::find($idPagoActualizar);

            // Check if the record exists
            if ($agregarPagoCliente) {
                // Update the existing record with the new data
                $agregarPagoCliente->codigoCli = $codigoCliente;
                $agregarPagoCliente->tipoAbonoPag = $formaDePago;
                $agregarPagoCliente->cantidadAbonoPag = $montoAgregarPagoCliente;
                $agregarPagoCliente->fechaOperacionPag = $fechaAgregarPagoCliente;
                $agregarPagoCliente->codigoTransferenciaPag = $codAgregarPagoCliente;
                $agregarPagoCliente->observacion = $comentarioAgregarPagoCliente;
                $agregarPagoCliente->bancaPago = $bancoAgregarPagoCliente;
                $agregarPagoCliente->horaOperacionPag = $horaAgregarPago;
                // $agregarPagoCliente->fechaRegistroPag = $fechaRegistroPagoCliente === null ? now()->setTimezone('America/New_York')->toDateString() : $fechaRegistroPagoCliente;
                $agregarPagoCliente->estadoPago = 1;
                $agregarPagoCliente->clasificacionPago = $pagoDerivado;
                $agregarPagoCliente->campoExtra = $nombreCliente;
                
                // Save the updated record
                $agregarPagoCliente->save();

                return response()->json(['success' => true], 200);
            } else {
                // If the record does not exist, return an error response
                return response()->json(['error' => 'Pago no encontrado'], 404);
            }
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}

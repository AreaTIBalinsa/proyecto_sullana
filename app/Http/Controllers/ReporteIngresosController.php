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
}

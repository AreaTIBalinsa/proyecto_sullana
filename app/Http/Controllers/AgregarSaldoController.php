<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarSaldo\AgregarSaldoCliente;
use Carbon\Carbon;

class AgregarSaldoController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('agregar_saldo');
        }
        return redirect('/login');
    }

    public function consulta_TraerClientesAgregarSaldo(Request $request){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT 
                IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                tc.codigoCli as codigoCli, 
                COALESCE(SUM(CASE WHEN tp.pesoNetoPes > tp.pesoNetoJabas THEN (tp.pesoNetoPes - tp.pesoNetoJabas) ELSE (tp.pesoNetoPes + tp.pesoNetoJabas) END * tp.precioPes), 0) as deudaTotal, 
                COALESCE(tpg.sumaPagos, 0) as cantidadPagos, 
                COALESCE(td.ventaDescuentos, 0) as ventaDescuentos,
                limitEndeudamiento 
            FROM tb_clientes tc
            LEFT JOIN tb_pesadas tp ON tc.codigoCli = tp.codigoCli AND tp.estadoPes = 1
            LEFT JOIN (
                SELECT codigoCli, SUM(cantidadAbonoPag) as sumaPagos
                FROM tb_pagos
                WHERE estadoPago = 1
                GROUP BY codigoCli
            ) tpg ON tc.codigoCli = tpg.codigoCli
            LEFT JOIN (
                SELECT codigoCli, SUM(pesoDesc * precioDesc) as ventaDescuentos
                FROM tb_descuentos
                WHERE estadoDescuento = 1
                GROUP BY codigoCli
            ) td ON tc.codigoCli = td.codigoCli
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg.sumaPagos, td.ventaDescuentos, limitEndeudamiento

            UNION

            SELECT 
                IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                tc.codigoCli as codigoCli, 
                COALESCE(SUM(CASE WHEN tp3.pesoNetoPes > tp3.pesoNetoJabas THEN (tp3.pesoNetoPes - tp3.pesoNetoJabas) ELSE (tp3.pesoNetoPes + tp3.pesoNetoJabas) END * tp3.precioPes), 0) as deudaTotal, 
                0 as cantidadPagos, 
                0 as ventaDescuentos,
                0 as limitEndeudamiento 
            FROM tb_clientes tc
            LEFT JOIN tb_pesadas3 tp3 ON tc.codigoCli = tp3.codigoCli AND tp3.estadoPes = 1
            LEFT JOIN (
                SELECT codigoCli, SUM(cantidadAbonoPag) as sumaPagos
                FROM tb_pagos
                WHERE estadoPago = 1
                GROUP BY codigoCli
            ) tpg3 ON tc.codigoCli = tpg3.codigoCli
            LEFT JOIN (
                SELECT codigoCli, SUM(pesoDesc * precioDesc) as ventaDescuentos
                FROM tb_descuentos
                WHERE estadoDescuento = 1
                GROUP BY codigoCli
            ) td3 ON tc.codigoCli = td3.codigoCli
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg3.sumaPagos, td3.ventaDescuentos, limitEndeudamiento

            UNION

            SELECT 
                IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                tc.codigoCli as codigoCli, 
                COALESCE(SUM(CASE WHEN tp2.pesoNetoPes > tp2.pesoNetoJabas THEN (tp2.pesoNetoPes - tp2.pesoNetoJabas) ELSE (tp2.pesoNetoPes + tp2.pesoNetoJabas) END * tp2.precioPes), 0) as deudaTotal, 
                0 as cantidadPagos, 
                0 as ventaDescuentos,
                0 as limitEndeudamiento 
            FROM tb_clientes tc
            LEFT JOIN tb_pesadas2 tp2 ON tc.codigoCli = tp2.codigoCli AND tp2.estadoPes = 1
            LEFT JOIN (
                SELECT codigoCli, SUM(cantidadAbonoPag) as sumaPagos
                FROM tb_pagos
                WHERE estadoPago = 1
                GROUP BY codigoCli
            ) tpg2 ON tc.codigoCli = tpg2.codigoCli
            LEFT JOIN (
                SELECT codigoCli, SUM(pesoDesc * precioDesc) as ventaDescuentos
                FROM tb_descuentos
                WHERE estadoDescuento = 1
                GROUP BY codigoCli
            ) td2 ON tc.codigoCli = td2.codigoCli
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg2.sumaPagos, td2.ventaDescuentos, limitEndeudamiento
            ORDER BY nombreCompleto ASC;
            ');
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }    

    public function consulta_AgregarSaldo(Request $request){

        $idCodigoClienteAgregarSaldo = $request->input('idCodigoClienteAgregarSaldo');
        $valorAgregarSaldo = $request->input('valorAgregarSaldo');

        if (Auth::check()) {
            $agregarSaldoCliente = new AgregarSaldoCliente;
            $agregarSaldoCliente->codigoCli = $idCodigoClienteAgregarSaldo;
            $agregarSaldoCliente->tipoAbonoPag = "Saldo";
            $agregarSaldoCliente->cantidadAbonoPag = $valorAgregarSaldo;
            $agregarSaldoCliente->fechaOperacionPag = Carbon::now()->setTimezone('America/Lima')->toDateString();
            $agregarSaldoCliente->codigoTransferenciaPag = "";
            $agregarSaldoCliente->observacion = "";
            $agregarSaldoCliente->fechaRegistroPag = Carbon::now()->setTimezone('America/Lima')->toDateString();
            $agregarSaldoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}

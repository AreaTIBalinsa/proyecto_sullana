<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarSaldo\AgregarSaldoCliente;

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
                COALESCE(SUM(tp.pesoNetoPes * tp.precioPes / tp.valorConversion), 0) as deudaTotal, 
                COALESCE(tpg.sumaPagos, 0) as cantidadPagos, 
                COALESCE(td.ventaDescuentos, 0) as ventaDescuentos 
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
            INNER JOIN tb_zonas ON tb_zonas.idZona = tc.idZona
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg.sumaPagos, td.ventaDescuentos
            ORDER BY FIELD(tb_zonas.idZona, 4, 2, 3, 1), nombreCompleto ASC;
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
            $agregarSaldoCliente->fechaOperacionPag = now()->setTimezone('America/New_York')->toDateString();
            $agregarSaldoCliente->codigoTransferenciaPag = "";
            $agregarSaldoCliente->observacion = "";
            $agregarSaldoCliente->fechaRegistroPag = now()->setTimezone('America/New_York')->toDateString();
            $agregarSaldoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarSaldo\AgregarSaldoCliente;
use Carbon\Carbon;

class ResumenDinerarioController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('resumen_dinerario');
        }
        return redirect('/login');
    }

    public function consulta_TraerClientesAgregarSaldo(Request $request){

        $fecha = $request->input('fecha');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT 
                IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                tc.codigoCli as codigoCli, 
                COALESCE(SUM(CASE 
                    WHEN tp.pesoNetoPes > tp.pesoNetoJabas AND fechaRegistroPes <= ? THEN (tp.pesoNetoPes - tp.pesoNetoJabas) * tp.precioPes 
                    WHEN fechaRegistroPes <= ? THEN (tp.pesoNetoPes + tp.pesoNetoJabas) * tp.precioPes 
                    ELSE 0 
                END), 0) as deudaTotal, 
                COALESCE(tpg.sumaPagos, 0) as cantidadPagos, 
                COALESCE(td.ventaDescuentos, 0) as ventaDescuentos,
                limitEndeudamiento 
            FROM tb_clientes tc
            LEFT JOIN tb_pesadas tp ON tc.codigoCli = tp.codigoCli AND tp.estadoPes = 1
            LEFT JOIN (
                SELECT codigoCli, SUM(cantidadAbonoPag) as sumaPagos
                FROM tb_pagos
                WHERE estadoPago = 1 AND fechaOperacionPag <= ?
                GROUP BY codigoCli
            ) tpg ON tc.codigoCli = tpg.codigoCli
            LEFT JOIN (
                SELECT codigoCli, SUM(pesoDesc * precioDesc) as ventaDescuentos
                FROM tb_descuentos
                WHERE estadoDescuento = 1 AND fechaRegistroDesc <= ?
                GROUP BY codigoCli
            ) td ON tc.codigoCli = td.codigoCli
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg.sumaPagos, td.ventaDescuentos, limitEndeudamiento

            UNION

            SELECT 
                IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                tc.codigoCli as codigoCli, 
                COALESCE(SUM(CASE 
                    WHEN tp3.pesoNetoPes > tp3.pesoNetoJabas AND fechaRegistroPes <= ? THEN (tp3.pesoNetoPes - tp3.pesoNetoJabas) * tp3.precioPes 
                    WHEN fechaRegistroPes <= ? THEN (tp3.pesoNetoPes + tp3.pesoNetoJabas) * tp3.precioPes 
                    ELSE 0 
                END), 0) as deudaTotal, 
                0 as cantidadPagos, 
                0 as ventaDescuentos,
                0 as limitEndeudamiento 
            FROM tb_clientes tc
            LEFT JOIN tb_pesadas3 tp3 ON tc.codigoCli = tp3.codigoCli AND tp3.estadoPes = 1
            LEFT JOIN (
                SELECT codigoCli, SUM(cantidadAbonoPag) as sumaPagos
                FROM tb_pagos
                WHERE estadoPago = 1 AND fechaOperacionPag <= ?
                GROUP BY codigoCli
            ) tpg3 ON tc.codigoCli = tpg3.codigoCli
            LEFT JOIN (
                SELECT codigoCli, SUM(pesoDesc * precioDesc) as ventaDescuentos
                FROM tb_descuentos
                WHERE estadoDescuento = 1 AND fechaRegistroDesc <= ?
                GROUP BY codigoCli
            ) td3 ON tc.codigoCli = td3.codigoCli
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg3.sumaPagos, td3.ventaDescuentos, limitEndeudamiento

            UNION

            SELECT 
                IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                tc.codigoCli as codigoCli, 
                COALESCE(SUM(CASE 
                    WHEN tp2.pesoNetoPes > tp2.pesoNetoJabas AND fechaRegistroPes <= ? THEN (tp2.pesoNetoPes - tp2.pesoNetoJabas) * tp2.precioPes 
                    WHEN fechaRegistroPes <= ? THEN (tp2.pesoNetoPes + tp2.pesoNetoJabas) * tp2.precioPes 
                    ELSE 0 
                END), 0) as deudaTotal, 
                0 as cantidadPagos, 
                0 as ventaDescuentos,
                0 as limitEndeudamiento 
            FROM tb_clientes tc
            LEFT JOIN tb_pesadas2 tp2 ON tc.codigoCli = tp2.codigoCli AND tp2.estadoPes = 1
            LEFT JOIN (
                SELECT codigoCli, SUM(cantidadAbonoPag) as sumaPagos
                FROM tb_pagos
                WHERE estadoPago = 1 AND fechaOperacionPag <= ?
                GROUP BY codigoCli
            ) tpg2 ON tc.codigoCli = tpg2.codigoCli
            LEFT JOIN (
                SELECT codigoCli, SUM(pesoDesc * precioDesc) as ventaDescuentos
                FROM tb_descuentos
                WHERE estadoDescuento = 1 AND fechaRegistroDesc <= ?
                GROUP BY codigoCli
            ) td2 ON tc.codigoCli = td2.codigoCli
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg2.sumaPagos, td2.ventaDescuentos, limitEndeudamiento
            ORDER BY nombreCompleto ASC
            ',[$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }  
    
    public function consulta_TraerClientesAgregarSaldoCliente(Request $request)
    {
        $fecha = $request->input('fecha');
        $codigoCliente = $request->input('codigoCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT 
                    IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                    tc.codigoCli as codigoCli, 
                    COALESCE(SUM(CASE 
                        WHEN tp.pesoNetoPes > tp.pesoNetoJabas AND fechaRegistroPes <= ? THEN (tp.pesoNetoPes - tp.pesoNetoJabas) * tp.precioPes 
                        WHEN fechaRegistroPes <= ? THEN (tp.pesoNetoPes + tp.pesoNetoJabas) * tp.precioPes 
                        ELSE 0 
                    END), 0) as deudaTotal, 
                    COALESCE(tpg.sumaPagos, 0) as cantidadPagos, 
                    COALESCE(td.ventaDescuentos, 0) as ventaDescuentos,
                    limitEndeudamiento 
                FROM tb_clientes tc
                LEFT JOIN tb_pesadas tp ON tc.codigoCli = tp.codigoCli AND tp.estadoPes = 1
                LEFT JOIN (
                    SELECT codigoCli, SUM(cantidadAbonoPag) as sumaPagos
                    FROM tb_pagos
                    WHERE estadoPago = 1 AND fechaOperacionPag <= ?
                    GROUP BY codigoCli
                ) tpg ON tc.codigoCli = tpg.codigoCli
                LEFT JOIN (
                    SELECT codigoCli, SUM(pesoDesc * precioDesc) as ventaDescuentos
                    FROM tb_descuentos
                    WHERE estadoDescuento = 1 AND fechaRegistroDesc <= ?
                    GROUP BY codigoCli
                ) td ON tc.codigoCli = td.codigoCli
                WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0 AND tc.codigoCli = ?
                GROUP BY tc.codigoCli, tpg.sumaPagos, td.ventaDescuentos, limitEndeudamiento

                UNION

                SELECT 
                    IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                    tc.codigoCli as codigoCli, 
                    COALESCE(SUM(CASE 
                        WHEN tp3.pesoNetoPes > tp3.pesoNetoJabas AND fechaRegistroPes <= ? THEN (tp3.pesoNetoPes - tp3.pesoNetoJabas) * tp3.precioPes 
                        WHEN fechaRegistroPes <= ? THEN (tp3.pesoNetoPes + tp3.pesoNetoJabas) * tp3.precioPes 
                        ELSE 0 
                    END), 0) as deudaTotal, 
                    0 as cantidadPagos, 
                    0 as ventaDescuentos,
                    0 as limitEndeudamiento 
                FROM tb_clientes tc
                LEFT JOIN tb_pesadas3 tp3 ON tc.codigoCli = tp3.codigoCli AND tp3.estadoPes = 1
                LEFT JOIN (
                    SELECT codigoCli, SUM(cantidadAbonoPag) as sumaPagos
                    FROM tb_pagos
                    WHERE estadoPago = 1 AND fechaOperacionPag <= ?
                    GROUP BY codigoCli
                ) tpg3 ON tc.codigoCli = tpg3.codigoCli
                LEFT JOIN (
                    SELECT codigoCli, SUM(pesoDesc * precioDesc) as ventaDescuentos
                    FROM tb_descuentos
                    WHERE estadoDescuento = 1 AND fechaRegistroDesc <= ?
                    GROUP BY codigoCli
                ) td3 ON tc.codigoCli = td3.codigoCli
                WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0 AND tc.codigoCli = ?
                GROUP BY tc.codigoCli, tpg3.sumaPagos, td3.ventaDescuentos, limitEndeudamiento

                UNION

                SELECT 
                    IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                    tc.codigoCli as codigoCli, 
                    COALESCE(SUM(CASE 
                        WHEN tp2.pesoNetoPes > tp2.pesoNetoJabas AND fechaRegistroPes <= ? THEN (tp2.pesoNetoPes - tp2.pesoNetoJabas) * tp2.precioPes 
                        WHEN fechaRegistroPes <= ? THEN (tp2.pesoNetoPes + tp2.pesoNetoJabas) * tp2.precioPes 
                        ELSE 0 
                    END), 0) as deudaTotal, 
                    0 as cantidadPagos, 
                    0 as ventaDescuentos,
                    0 as limitEndeudamiento 
                FROM tb_clientes tc
                LEFT JOIN tb_pesadas2 tp2 ON tc.codigoCli = tp2.codigoCli AND tp2.estadoPes = 1
                LEFT JOIN (
                    SELECT codigoCli, SUM(cantidadAbonoPag) as sumaPagos
                    FROM tb_pagos
                    WHERE estadoPago = 1 AND fechaOperacionPag <= ?
                    GROUP BY codigoCli
                ) tpg2 ON tc.codigoCli = tpg2.codigoCli
                LEFT JOIN (
                    SELECT codigoCli, SUM(pesoDesc * precioDesc) as ventaDescuentos
                    FROM tb_descuentos
                    WHERE estadoDescuento = 1 AND fechaRegistroDesc <= ?
                    GROUP BY codigoCli
                ) td2 ON tc.codigoCli = td2.codigoCli
                WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0 AND tc.codigoCli = ?
                GROUP BY tc.codigoCli, tpg2.sumaPagos, td2.ventaDescuentos, limitEndeudamiento
                ORDER BY nombreCompleto ASC
            ', [
                $fecha, $fecha, $fecha, $fecha, $codigoCliente,
                $fecha, $fecha, $fecha, $fecha, $codigoCliente,
                $fecha, $fecha, $fecha, $fecha, $codigoCliente
            ]);
            
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

    public function consulta_AgregarSaldoRegular(Request $request){

        $codigoCli = $request->input('codigoCli');
        $valorAgregarSaldo = $request->input('diferencia');
        $fechaPago = $request->input('fechaBuscaCuenta');

        if (Auth::check()) {
            $agregarSaldoCliente = new AgregarSaldoCliente;
            $agregarSaldoCliente->codigoCli = $codigoCli;
            $agregarSaldoCliente->tipoAbonoPag = "Saldo";
            $agregarSaldoCliente->cantidadAbonoPag = $valorAgregarSaldo;
            $agregarSaldoCliente->fechaOperacionPag = $fechaPago;
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

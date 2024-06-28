<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPagoCliente\TraerClientesAgregarPagoCliente;
use App\Models\AgregarPagoCliente\TraerClientesAgregarDescuentoCliente;
use App\Models\AgregarPagoCliente\TraerClientesCuentaDelCliente;
use App\Models\AgregarPagoCliente\AgregarPagoCliente;
use App\Models\AgregarPagoCliente\EliminarPagoCliente;
use App\Models\AgregarPagoCliente\ActualizarPagoCliente;
use App\Models\AgregarPagoCliente\AgregarDescuentoCliente;
use App\Models\AgregarPagoCliente\ActualizarDescuentoCliente;
use App\Models\AgregarPagoCliente\EliminarDescuentoCliente;
use App\Models\AgregarEgresoCliente\AgregarEgresoCliente;

class ReporteDePagosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_de_pagos');
        }
        return redirect('/login');
    }

    public function show2(){
        if (Auth::check()){
            return view('estado_de_cuenta');
        }
        return redirect('/login');
    }

    public function consulta_TraerClientesAgregarPagoCliente(Request $request){

        $nombreAgregarPagoCliente = $request->input('inputAgregarPagoCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesAgregarPagoCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=','1')
                ->where('idEstadoCli','=','1')
                ->where(function($query) use ($nombreAgregarPagoCliente) {
                    $query->where('nombresCli', 'LIKE', "%$nombreAgregarPagoCliente%")
                        ->orWhere('apellidoPaternoCli', 'LIKE', "%$nombreAgregarPagoCliente%")
                        ->orWhere('apellidoMaternoCli', 'LIKE', "%$nombreAgregarPagoCliente%");
                })
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDeudaTotal(Request $request){

        $codigoCliente = $request->input('codigoCliente');
        
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
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0 AND tc.codigoCli = ?
            GROUP BY tc.codigoCli, tpg.sumaPagos, td.ventaDescuentos, limitEndeudamiento

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
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0 AND tc.codigoCli = ?
            GROUP BY tc.codigoCli, tpg2.sumaPagos, td2.ventaDescuentos, limitEndeudamiento
            ORDER BY nombreCompleto ASC;
            ', [$codigoCliente, $codigoCliente]);
        
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
        
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }     

    public function consulta_TraerClientesAgregarDescuento(Request $request){

        $nombreReportePorCliente = $request->input('idAgregarDescuento');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesAgregarDescuentoCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=',1)
                ->where('idEstadoCli','=',1)
                ->where(function($query) use ($nombreReportePorCliente) {
                    $query->where('nombresCli', 'LIKE', "%$nombreReportePorCliente%")
                        ->orWhere('apellidoPaternoCli', 'LIKE', "%$nombreReportePorCliente%")
                        ->orWhere('apellidoMaternoCli', 'LIKE', "%$nombreReportePorCliente%");
                })
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerClientesCuentaDelCliente(Request $request){

        $nombreCuentaDelCliente = $request->input('idCuentaDelCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesCuentaDelCliente::select('idCliente','contactoCli', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=',1)
                ->where('idEstadoCli','=',1)
                ->where(function($query) use ($nombreCuentaDelCliente) {
                    $query->where('nombresCli', 'LIKE', "%$nombreCuentaDelCliente%")
                        ->orWhere('apellidoPaternoCli', 'LIKE', "%$nombreCuentaDelCliente%")
                        ->orWhere('apellidoMaternoCli', 'LIKE', "%$nombreCuentaDelCliente%");
                })
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_VentaAnterior($codigoCli, $fecha) {
        $consulta = DB::table('tb_pesadas')
        ->selectRaw('COALESCE(SUM(CASE WHEN pesoNetoPes > pesoNetoJabas THEN (pesoNetoPes - pesoNetoJabas) ELSE (pesoNetoPes + pesoNetoJabas) END * precioPes), 0) AS ventaAnterior')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)    
            ->where('fechaRegistroPes', '<', $fecha)
            ->value('ventaAnterior');
    
        return $consulta;
    }    

    public function consulta_PrimeraEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadPrimerEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_SegundaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSegundaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_TerceraEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadTerceraEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_CuartaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadCuartaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    // Otras Especies

    public function consulta_QuintaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadQuintaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_SextaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSextaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_SeptimaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSeptimaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_OctavaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadOctavaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaPrimeraEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaPrimeraEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaSegundaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaSegundaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaTerceraEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaTerceraEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaCuartaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaCuartaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaQuintaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaQuintaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaSextaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 16 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 16 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 16 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 16 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 16 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 16 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaSextaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaSeptimaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 17 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 17 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 17 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 17 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 17 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 17 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaSeptimaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaOctavaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 18 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 18 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 18 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 18 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 18 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 18 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaOctavaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaNovenaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 19 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaNovenaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 19 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaNovenaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 19 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaNovenaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 19 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaNovenaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 19 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaNovenaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 19 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaNovenaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_VigesimaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 20 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoVigesimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 20 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoVigesimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 20 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoVigesimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 20 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaVigesimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 20 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoVigesimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 20 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadVigesimaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_VigesimaPrimeraEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 21 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoVigesimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 21 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoVigesimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 21 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoVigesimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 21 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaVigesimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 21 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoVigesimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 21 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadVigesimaPrimeraEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_VigesimaSegundaEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 22 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoVigesimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 22 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoVigesimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 22 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoVigesimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 22 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaVigesimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 22 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoVigesimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 22 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadVigesimaSegundaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_VigesimaTerceraEspecie($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 23 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoVigesimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 23 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoVigesimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 23 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoVigesimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 23 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaVigesimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 23 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoVigesimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 23 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadVigesimaTerceraEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    /* ================================================================== */
    /* =============================Consulta============================= */
    /* ================================================================== */

    public function consulta_VentaAnterior2($codigoCli, $fecha) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('COALESCE(SUM(CASE WHEN pesoNetoPes > pesoNetoJabas THEN (pesoNetoPes - pesoNetoJabas) ELSE (pesoNetoPes + pesoNetoJabas) END * precioPes), 0) AS ventaAnterior')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)    
            ->where('fechaRegistroPes', '<', $fecha)
            ->value('ventaAnterior');
    
        return $consulta;
    }        

    public function consulta_PrimeraEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadPrimerEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_SegundaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSegundaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_TerceraEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadTerceraEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_CuartaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadCuartaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    // Otras Especies

    public function consulta_QuintaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadQuintaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_SextaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSextaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_SeptimaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSeptimaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_OctavaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadOctavaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaPrimeraEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaPrimeraEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaSegundaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaSegundaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaTerceraEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaTerceraEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaCuartaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaCuartaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaQuintaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaQuintaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaSextaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 16 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 16 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 16 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 16 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 16 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 16 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaSextaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaSeptimaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 17 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 17 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 17 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 17 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 17 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 17 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaSeptimaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaOctavaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 18 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 18 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 18 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 18 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 18 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 18 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaOctavaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaNovenaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 19 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaNovenaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 19 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaNovenaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 19 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaNovenaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 19 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaNovenaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 19 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaNovenaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 19 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaNovenaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_VigesimaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 20 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoVigesimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 20 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoVigesimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 20 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoVigesimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 20 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaVigesimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 20 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoVigesimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 20 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadVigesimaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_VigesimaPrimeraEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 21 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoVigesimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 21 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoVigesimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 21 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoVigesimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 21 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaVigesimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 21 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoVigesimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 21 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadVigesimaPrimeraEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_VigesimaSegundaEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 22 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoVigesimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 22 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoVigesimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 22 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoVigesimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 22 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaVigesimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 22 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoVigesimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 22 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadVigesimaSegundaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_VigesimaTerceraEspecie2($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 23 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoVigesimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 23 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoVigesimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 23 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoVigesimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 23 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaVigesimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 23 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoVigesimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 23 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadVigesimaTerceraEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $codigoCli)
            ->whereBetween('fechaRegistroPes', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    /* ================================================================== */
    /* =============================Consulta============================= */
    /* ================================================================== */
    
    public function consulta_Descuentos($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_descuentos')
            ->selectRaw('fechaRegistroDesc')
            ->selectRaw('SUM(pesoDesc) AS totalPesoDescuento')
            ->selectRaw('SUM(pesoDesc * precioDesc) AS totalVentaDescuento')
            ->where('codigoCli', $codigoCli)
            ->where('estadoDescuento', '=',1)
            ->whereBetween('fechaRegistroDesc', [$fechaInicio, $fechaFin])
            ->groupBy('fechaRegistroDesc')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_DescuentosAnteriores($codigoCli, $fecha) {
        $consulta = DB::table('tb_descuentos')
            ->selectRaw('COALESCE(SUM(pesoDesc * precioDesc), 0) AS totalVentaDescuentoAnteriores')
            ->where('codigoCli', $codigoCli)
            ->where('estadoDescuento', '=',1)
            ->where('fechaRegistroDesc', '<', $fecha)
            ->value('totalVentaDescuentoAnteriores');
    
        return $consulta;
    }  
    
    public function consulta_PagoAnterior($codigoCli, $fecha) {
        $consulta = DB::table('tb_pagos')
            ->selectRaw('COALESCE(SUM(cantidadAbonoPag), 0) AS pagos')
            ->where('codigoCli', $codigoCli)
            ->where('estadoPago', '=', 1)
            ->where('fechaOperacionPag', '<', $fecha)
            ->value('pagoAnterior');
    
        return $consulta;
    }
    
    public function consulta_Pagos($codigoCli, $fechaInicio, $fechaFin) {
        $consulta = DB::table('tb_pagos')
            ->selectRaw('fechaOperacionPag')
            ->selectRaw('COALESCE(SUM(cantidadAbonoPag), 0) AS pagos')
            ->where('codigoCli', $codigoCli)
            ->where('estadoPago', '=', 1)
            ->whereBetween('fechaOperacionPag', [$fechaInicio, $fechaFin])
            ->groupBy('fechaOperacionPag')
            ->get();
    
        return $consulta;
    }     
    
    public function consulta_TraerCuentaDelCliente(Request $request) {

        $fechaInicio = $request->input('fechaDesde');
        $fechaFin = $request->input('fechaHasta');
        $codigoCli = $request->input('codigoCliente');

        if (Auth::check()) {
    
            $datos = [
                'totalesPrimerEspecie' => $this->consulta_PrimeraEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesSegundaEspecie' => $this->consulta_SegundaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesTerceraEspecie' => $this->consulta_TerceraEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesCuartaEspecie' => $this->consulta_CuartaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesQuintaEspecie' => $this->consulta_QuintaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesSextaEspecie' => $this->consulta_SextaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesSeptimaEspecie' => $this->consulta_SeptimaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesOctavaEspecie' => $this->consulta_OctavaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaEspecie' => $this->consulta_DecimaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaPrimeraEspecie' => $this->consulta_DecimaPrimeraEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaSegundaEspecie' => $this->consulta_DecimaSegundaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaTerceraEspecie' => $this->consulta_DecimaTerceraEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaCuartaEspecie' => $this->consulta_DecimaCuartaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaQuintaEspecie' => $this->consulta_DecimaQuintaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaSextaEspecie' => $this->consulta_DecimaSextaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaSeptimaEspecie' => $this->consulta_DecimaSeptimaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaOctavaEspecie' => $this->consulta_DecimaOctavaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaNovenaEspecie' => $this->consulta_DecimaNovenaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesVigesimaEspecie' => $this->consulta_VigesimaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesVigesimaPrimeraEspecie' => $this->consulta_VigesimaPrimeraEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesVigesimaSegundaEspecie' => $this->consulta_VigesimaSegundaEspecie($codigoCli, $fechaInicio, $fechaFin),
                'totalesVigesimaTerceraEspecie' => $this->consulta_VigesimaTerceraEspecie($codigoCli, $fechaInicio, $fechaFin),

                'totalesPrimerEspecie2' => $this->consulta_PrimeraEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesSegundaEspecie2' => $this->consulta_SegundaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesTerceraEspecie2' => $this->consulta_TerceraEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesCuartaEspecie2' => $this->consulta_CuartaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesQuintaEspecie2' => $this->consulta_QuintaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesSextaEspecie2' => $this->consulta_SextaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesSeptimaEspecie2' => $this->consulta_SeptimaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesOctavaEspecie2' => $this->consulta_OctavaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaEspecie2' => $this->consulta_DecimaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaPrimeraEspecie2' => $this->consulta_DecimaPrimeraEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaSegundaEspecie2' => $this->consulta_DecimaSegundaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaTerceraEspecie2' => $this->consulta_DecimaTerceraEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaCuartaEspecie2' => $this->consulta_DecimaCuartaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaQuintaEspecie2' => $this->consulta_DecimaQuintaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaSextaEspecie2' => $this->consulta_DecimaSextaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaSeptimaEspecie2' => $this->consulta_DecimaSeptimaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaOctavaEspecie2' => $this->consulta_DecimaOctavaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesDecimaNovenaEspecie2' => $this->consulta_DecimaNovenaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesVigesimaEspecie2' => $this->consulta_VigesimaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesVigesimaPrimeraEspecie2' => $this->consulta_VigesimaPrimeraEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesVigesimaSegundaEspecie2' => $this->consulta_VigesimaSegundaEspecie2($codigoCli, $fechaInicio, $fechaFin),
                'totalesVigesimaTerceraEspecie2' => $this->consulta_VigesimaTerceraEspecie2($codigoCli, $fechaInicio, $fechaFin),

                'ventaAnterior2' => $this->consulta_VentaAnterior2($codigoCli, $fechaInicio),

                'totalDescuentos' => $this->consulta_Descuentos($codigoCli, $fechaInicio, $fechaFin),
                'totalPagos' => $this->consulta_Pagos($codigoCli, $fechaInicio, $fechaFin),
                'ventaAnterior' => $this->consulta_VentaAnterior($codigoCli, $fechaInicio),
                'pagoAnterior' => $this->consulta_PagoAnterior($codigoCli, $fechaInicio),
                'totalVentaDescuentoAnterior' => $this->consulta_DescuentosAnteriores($codigoCli, $fechaInicio),
                'pagosDetallados' => $this->consulta_pagosDetallados($codigoCli, $fechaInicio)
            ];
    
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
        $pagoDerivado = $request->input('pagoDerivado');

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
            $agregarPagoCliente->clasificacionPago = $pagoDerivado;
            $agregarPagoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarDescuentoCliente(Request $request){

        $codigoCliente = $request->input('codigoCliente');
        $pesoAgregarDescuentoCliente = $request->input('pesoAgregarDescuentoCliente');
        $especieAgregarDescuentoCliente = $request->input('especieAgregarDescuentoCliente');
        $fechaAgregarDescuentoCliente = $request->input('fechaAgregarDescuentoCliente');
        $precioAgregarDescuentoCliente = $request->input('precioAgregarDescuentoCliente');
        $comentarioAgregarDescuentoCliente = $request->input('comentarioAgregarDescuentoCliente');

        if (Auth::check()) {
            $agregarDescuentoCliente = new AgregarDescuentoCliente;
            $agregarDescuentoCliente->codigoCli = $codigoCliente;
            $agregarDescuentoCliente->fechaRegistroDesc = $fechaAgregarDescuentoCliente;
            $agregarDescuentoCliente->especieDesc = $especieAgregarDescuentoCliente;
            $agregarDescuentoCliente->pesoDesc = $pesoAgregarDescuentoCliente;
            $agregarDescuentoCliente->precioDesc = $precioAgregarDescuentoCliente;
            $agregarDescuentoCliente->cantidadDesc = 0;
            $agregarDescuentoCliente->observacion = $comentarioAgregarDescuentoCliente;
            $agregarDescuentoCliente->fechaRegistroDescuento = now()->setTimezone('America/New_York')->toDateString();
            $agregarDescuentoCliente->horaRegistroDesc = now()->setTimezone('America/New_York')->toTimeString();
            $agregarDescuentoCliente->estadoDescuento = 1;
            $agregarDescuentoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPreciosClienteDescuento(Request $request){

        $codigoCliente = $request->input('codigoCliente');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT idPrecio, 
                codigoCli, 
                primerEspecie,
                segundaEspecie,
                terceraEspecie,
                cuartaEspecie,
                quintaEspecie,
                sextaEspecie,
                septimaEspecie,
                octavaEspecie,
                novenaEspecie,
                decimaEspecie,
                decimaPrimeraEspecie,
                decimaSegundaEspecie,
                decimaTerceraEspecie,
                decimaCuartaEspecie,
                decimaQuintaOtrasEspecies
            FROM tb_precio_x_presentacion
            WHERE codigoCli = ? ',[$codigoCliente]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
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
        LEFT JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
        WHERE tb_pagos.estadoPago = 1 and clasificacionPago = 1 and tipoAbonoPag != ? and fechaOperacionPag BETWEEN ? AND ? ORDER BY nombreCompleto', ["Saldo",$fechaDesde, $fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPagosFechasItem2(Request $request){

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
        LEFT JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
        WHERE tb_pagos.estadoPago = 1 and clasificacionPago = 2 and tipoAbonoPag != ? and fechaOperacionPag BETWEEN ? AND ? ORDER BY nombreCompleto', ["Saldo",$fechaDesde, $fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPagosFechasItem3(Request $request){

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
        LEFT JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
        WHERE tb_pagos.estadoPago = 1 and clasificacionPago = 3 and tipoAbonoPag != ? and fechaOperacionPag BETWEEN ? AND ? ORDER BY nombreCompleto', ["Saldo",$fechaDesde, $fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPagosDirectoGranjaFechas(Request $request){

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
        LEFT JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
        WHERE tb_pagos.estadoPago = 1 and clasificacionPago = 5 and tipoAbonoPag != ? and fechaOperacionPag BETWEEN ? AND ? ORDER BY nombreCompleto', ["Saldo",$fechaDesde, $fechaHasta]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EditarPago(Request $request){

        $idReporteDePago = $request->input('idReporteDePago');

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
                    tb_clientes.codigoCli,
                   IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_pagos
            LEFT JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
            WHERE tb_pagos.idPagos = ?', [$idReporteDePago]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPagoCliente(Request $request){

        $idReporteDePago = $request->input('idReporteDePago');
        $codigoCliente = $request->input('codigoCliente');
        $montoAgregarPagoCliente = $request->input('montoAgregarPagoCliente');
        $fechaAgregarPagoCliente = $request->input('fechaAgregarPagoCliente');
        $formaDePago = $request->input('formaDePago');
        $codAgregarPagoCliente = $request->input('codAgregarPagoCliente');
        $comentarioAgregarPagoCliente = $request->input('comentarioAgregarPagoCliente');
        $horaAgregarPagoEditar = $request->input('horaAgregarPagoEditar');
        $bancoAgregarPagoClienteEditar = $request->input('bancoAgregarPagoClienteEditar');

        if (Auth::check()) {
            $actualizarPagoCliente = new ActualizarPagoCliente;
            $actualizarPagoCliente->where('idPagos', $idReporteDePago)
                ->update([
                    'codigoCli' => $codigoCliente,
                    'tipoAbonoPag' => $formaDePago,
                    'cantidadAbonoPag' => $montoAgregarPagoCliente,
                    'fechaOperacionPag' => $fechaAgregarPagoCliente,
                    'codigoTransferenciaPag' => $codAgregarPagoCliente,
                    'observacion' => $comentarioAgregarPagoCliente,
                    'bancaPago'=> $bancoAgregarPagoClienteEditar,
                    'horaOperacionPag'=> $horaAgregarPagoEditar,
                ]);
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarPago(Request $request)
    {
        $codigoPago = $request->input('codigoPago');

        if (Auth::check()) {
            $EliminarPagoCliente = new EliminarPagoCliente;
            $EliminarPagoCliente->where('idPagos', $codigoPago)
                ->update([
                    'estadoPago' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistroDescuentos(Request $request) {
        $fechaDesde = $request->input('fechaDesdeTraerDescuentos');
        $fechaHasta = $request->input('fechaHastaTraerDescuentos');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT tb_descuentos.idDescuento,
                tb_descuentos.fechaRegistroDesc,
                tb_especies_venta.nombreEspecie,
                tb_descuentos.pesoDesc,
                tb_descuentos.precioDesc,
                tb_descuentos.cantidadDesc,
                tb_descuentos.observacion,
                tb_descuentos.horaRegistroDesc,
                tb_descuentos.fechaRegistroDescuento,
                tb_descuentos.estadoDescuento,
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_descuentos
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_descuentos.codigoCli
                INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_descuentos.especieDesc
                WHERE tb_descuentos.estadoDescuento = 1 and fechaRegistroDescuento BETWEEN ? AND ?', [$fechaDesde, $fechaHasta]);
            
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    ///
    public function consulta_TraerPresentacionEspecies (){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT idEspecie, nombreEspecie
                FROM tb_especies_venta');
            
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EditarDescuentoCliente(Request $request)
    {
        $idDescuento = $request->input('idDescuento');
        $nombreClienteEditar = $request->input('nombreClienteEditar');
        $fechaRegistroDesc = $request->input('fechaRegistroDesc');
        $nombreEspecie = $request->input('nombreEspecie');
        $pesoDesc = $request->input('pesoDesc');
        $observacion = $request->input('observacion');
        $precioDescuento = $request->input('precioDescuento');

        if (Auth::check()) {
            $ActualizarDescuentoCliente = new ActualizarDescuentoCliente;
            $ActualizarDescuentoCliente->where('idDescuento', $idDescuento)
                ->update([
                    'codigoCli' => $nombreClienteEditar,
                    'fechaRegistroDesc' => $fechaRegistroDesc,
                    'especieDesc' => $nombreEspecie,
                    'pesoDesc' => $pesoDesc,
                    'observacion' => $observacion,
                    'precioDesc' => $precioDescuento,
                ]);
            
            return response()->json(['success' => true], 200);
        }
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EditarDescuentos(Request $request) {

        $codigoDescuento = $request->input('codigoDescuento');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT tb_descuentos.idDescuento,
            tb_descuentos.fechaRegistroDesc,
            tb_descuentos.pesoDesc,
            tb_descuentos.precioDesc,
            tb_descuentos.cantidadDesc,
            tb_descuentos.observacion,
            tb_descuentos.horaRegistroDesc,
            tb_descuentos.fechaRegistroDescuento,
            tb_descuentos.codigoCli,
            tb_descuentos.especieDesc,
            IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_descuentos
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_descuentos.codigoCli WHERE idDescuento = ?', [$codigoDescuento]);
            
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarDescuento(Request $request)
    {
        $codigoDescuento = $request->input('codigoDescuento');

        if (Auth::check()) {
            $EliminarDescuentoCliente = new EliminarDescuentoCliente;
            $EliminarDescuentoCliente->where('idDescuento', $codigoDescuento)
                ->update([
                    'estadoDescuento' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_pagosDetallados($codigoCli, $fechaPagos) {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT fechaOperacionPag, cantidadAbonoPag, tipoAbonoPag, bancaPago, fechaRegistroPag, clasificacionPago
                FROM tb_pagos
                WHERE codigoCli = ? 
                AND estadoPago = 1 
                AND (fechaOperacionPag = ? OR fechaRegistroPag <= ?)
                ORDER BY fechaOperacionPag asc', [$codigoCli, $fechaPagos, $fechaPagos]);
            
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }    

    public function consulta_VerificarCodigoPago(Request $request){

        $codAgregarPagoCliente = $request->input('codAgregarPagoCliente');

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
                    tb_clientes.codigoCli,
                   IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_pagos
            LEFT JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli
            WHERE codigoTransferenciaPag = ? AND estadoPago = 1',[$codAgregarPagoCliente]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarEgresoPaul(Request $request){

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
            $agregarEgresoCliente->clasificadoEgreso = 2;
            $agregarEgresoCliente->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerEgresosPaulFechas(Request $request){

        $fechaDesdeTraerPagos = $request->input('fechaDesdeTraerPagos');
        $fechaHastaTraerPagos = $request->input('fechaHastaTraerPagos');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT 
            nombreEgresoCamal, 
            idEgresos,tipoAbonoEgreso,cantidadAbonoEgreso,fechaOperacionEgreso,bancoEgreso,codigoTransferenciaEgreso,fechaRegistroEgreso,estadoEgreso, cantidadEgreso, montoEgreso  
            FROM tb_egresos 
            WHERE estadoEgreso = 1 and clasificadoEgreso = 2 and fechaOperacionEgreso BETWEEN ? AND ?', [$fechaDesdeTraerPagos, $fechaHastaTraerPagos]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }  

}

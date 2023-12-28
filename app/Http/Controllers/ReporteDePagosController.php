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

class ReporteDePagosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_de_pagos');
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
                    COALESCE(SUM(CASE WHEN tp.pesoNetoPes > tp.pesoNetoJabas THEN (tp.pesoNetoPes - tp.pesoNetoJabas) ELSE (tp.pesoNetoPes + tp.pesoNetoJabas) END * tp.precioPes), 0) as deudaTotal,
                    COALESCE((SELECT SUM(tpg.cantidadAbonoPag) FROM tb_pagos tpg WHERE tpg.codigoCli = ? AND tpg.estadoPago = 1), 0) as cantidadPagos,
                    COALESCE(SUM(DISTINCT td.pesoDesc * td.precioDesc), 0) as ventaDescuentos
                FROM tb_pesadas tp
                LEFT JOIN tb_descuentos td ON tp.codigoCli = td.codigoCli AND td.estadoDescuento = 1
                WHERE tp.estadoPes = 1 AND tp.codigoCli = ?
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
            $datos = TraerClientesCuentaDelCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
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

    // Termina
    
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

                'totalDescuentos' => $this->consulta_Descuentos($codigoCli, $fechaInicio, $fechaFin),
                'totalPagos' => $this->consulta_Pagos($codigoCli, $fechaInicio, $fechaFin),
                'ventaAnterior' => $this->consulta_VentaAnterior($codigoCli, $fechaInicio),
                'pagoAnterior' => $this->consulta_PagoAnterior($codigoCli, $fechaInicio),
                'totalVentaDescuentoAnterior' => $this->consulta_DescuentosAnteriores($codigoCli, $fechaInicio),
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

        if (Auth::check()) {
            $agregarPagoCliente = new AgregarPagoCliente;
            $agregarPagoCliente->codigoCli = $codigoCliente;
            $agregarPagoCliente->tipoAbonoPag = $formaDePago;
            $agregarPagoCliente->cantidadAbonoPag = $montoAgregarPagoCliente;
            $agregarPagoCliente->fechaOperacionPag = $fechaAgregarPagoCliente;
            $agregarPagoCliente->codigoTransferenciaPag = $codAgregarPagoCliente;
            $agregarPagoCliente->observacion = $comentarioAgregarPagoCliente;
            $agregarPagoCliente->fechaRegistroPag = now()->setTimezone('America/New_York')->toDateString();
            $agregarPagoCliente->estadoPago = 1;
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
                   IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_pagos
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
            WHERE tb_pagos.estadoPago = 1 and fechaRegistroPag BETWEEN ? AND ?', [$fechaDesde, $fechaHasta]);

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
                    tb_clientes.codigoCli,
                   IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_pagos
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pagos.codigoCli  
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
}

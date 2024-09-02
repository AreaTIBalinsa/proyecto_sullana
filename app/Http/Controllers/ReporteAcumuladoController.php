<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ReporteAcumulado\TraerDatosReporteAcumulado;
use App\Models\ReporteAcumulado\ActualizarPrecioPesadas;
use App\Models\ReporteAcumulado\ActualizarPrecioPesadas2;
use App\Models\ReporteAcumulado\ActualizarPrecioPesadas3;

class ReporteAcumuladoController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_acumulado');
        }
        return redirect('/login');
    }

    public function consulta_TraerReporteAcumulado(Request $request)
    {
        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT idEspecie, pesoNetoPes, cantidadPes, fechaRegistroPes, pesoNetoJabas
                FROM tb_pesadas
                WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ?
                
                UNION ALL
                
                SELECT idEspecie, pesoNetoPes, cantidadPes, fechaRegistroPes, pesoNetoJabas
                FROM tb_pesadas2
                WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ?

                UNION ALL

                SELECT idEspecie, pesoNetoPes, cantidadPes, fechaRegistroPes, pesoNetoJabas
                FROM tb_pesadas3
                WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ?

            ', [$fechaDesde, $fechaHasta, $fechaDesde, $fechaHasta]);

            // Devuelve los datos en formato JSON
            return $datos;
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_VentaAnterior($fecha, $clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('COALESCE(SUM(CASE WHEN pesoNetoPes > 0 THEN (pesoNetoPes - pesoNetoJabas) ELSE (pesoNetoPes + pesoNetoJabas) END * precioPes), 0) AS ventaAnterior')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes', '<', $fecha)
            ->value('ventaAnterior');
    
        return $consulta;
    }        

    public function consulta_VentaAnterior2($fecha, $clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('COALESCE(SUM(CASE WHEN pesoNetoPes > 0 THEN (pesoNetoPes - pesoNetoJabas) ELSE (pesoNetoPes + pesoNetoJabas) END * precioPes), 0) AS ventaAnterior')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes', '<', $fecha)
            ->value('ventaAnterior');
    
        return $consulta;
    }        

    public function consulta_VentaAnterior3($fecha, $clienteCodigo) {
        $consulta = DB::table('tb_pesadas3')
            ->selectRaw('COALESCE(SUM(CASE WHEN pesoNetoPes > 0 THEN (pesoNetoPes - pesoNetoJabas) ELSE (pesoNetoPes + pesoNetoJabas) END * precioPes), 0) AS ventaAnterior')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes', '<', $fecha)
            ->value('ventaAnterior');
    
        return $consulta;
    }        

    public function consulta_PrimeraEspecie($fecha, $clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->select('fechaRegistroPes', 'pesoNetoPes', 'cantidadPes', 'pesoNetoJabas', 'precioPes', 'idEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes', '=', $fecha)
            ->get();
    
        return $consulta;
    }

    public function consulta_PrimeraEspecie2($fecha, $clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->select('fechaRegistroPes', 'pesoNetoPes', 'cantidadPes', 'pesoNetoJabas', 'precioPes', 'idEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes', '=', $fecha)
            ->get();
    
        return $consulta;
    }    

    public function consulta_PrimeraEspecie3($fecha, $clienteCodigo) {
        $consulta = DB::table('tb_pesadas3')
            ->select('fechaRegistroPes', 'pesoNetoPes', 'cantidadPes', 'pesoNetoJabas', 'precioPes', 'idEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes', '=', $fecha)
            ->get();
    
        return $consulta;
    }    

    /* ================================================================== */
    /* =============================Consulta============================= */
    /* ================================================================== */
    
    public function consulta_Descuentos($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_descuentos')
            ->selectRaw('fechaRegistroDesc')
            ->selectRaw('SUM(pesoDesc) AS totalPesoDescuento')
            ->selectRaw('SUM(pesoDesc * precioDesc) AS totalVentaDescuento')
            ->where('fechaRegistroDesc','=', $fecha)
            ->where('estadoDescuento', '=',1)
            ->where('codigoCli', $clienteCodigo)
            ->groupBy('fechaRegistroDesc')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_DescuentosAnteriores($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_descuentos')
            ->selectRaw('COALESCE(SUM(pesoDesc * precioDesc), 0) AS totalVentaDescuentoAnteriores')
            ->where('fechaRegistroDesc', '<', $fecha)
            ->where('estadoDescuento', '=',1)
            ->where('codigoCli', $clienteCodigo)
            ->value('totalVentaDescuentoAnteriores');
    
        return $consulta;
    }  
    
    public function consulta_PagoAnterior($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pagos')
            ->selectRaw('COALESCE(SUM(cantidadAbonoPag), 0) AS pagos')
            ->where('estadoPago', '=', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPag', '<', $fecha)
            ->value('pagoAnterior');
    
        return $consulta;
    }
    
    public function consulta_Pagos($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pagos')
            ->selectRaw('fechaRegistroPag')
            ->selectRaw('COALESCE(SUM(cantidadAbonoPag), 0) AS pagos')
            ->where('estadoPago', '=', 1)
            ->where('fechaRegistroPag', '=', $fecha)
            ->where('codigoCli', $clienteCodigo)
            ->groupBy('fechaRegistroPag')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_ConsultarClientes($fecha) {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos con UNION ALL
            $datos = DB::select('
                SELECT DISTINCT c.codigoCli, c.limitEndeudamiento,
                       IFNULL(CONCAT_WS(" ", c.nombresCli, c.apellidoPaternoCli, c.apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_clientes AS c
                INNER JOIN (
                    SELECT codigoCli FROM tb_pesadas WHERE fechaRegistroPes = ?
                    UNION ALL
                    SELECT codigoCli FROM tb_pesadas2 WHERE fechaRegistroPes = ?
                    UNION ALL
                    SELECT codigoCli FROM tb_pesadas3 WHERE fechaRegistroPes = ?
                ) AS p ON c.codigoCli = p.codigoCli
                WHERE c.estadoEliminadoCli = 1
                ORDER BY nombreCompleto ASC
            ', [$fecha, $fecha, $fecha]);
            
            return $datos;
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }           

    public function consulta_TraerReporteAcumuladoDetalle(Request $request) {

        $fecha = $request->input('fecha');
    
        if (Auth::check()) {
            // Obtener la lista de clientes
            $clientes = $this->consulta_ConsultarClientes($fecha);
    
            $datos = [];
    
            foreach ($clientes as $cliente) {
                $clienteCodigo = $cliente->codigoCli;
    
                $datosCliente = [
                    'cliente' => $cliente,
                    'datosTabla_tb_pesadas' => $this->consulta_PrimeraEspecie($fecha, $clienteCodigo),
                    'ventaAnterior' => $this->consulta_VentaAnterior($fecha, $clienteCodigo),

                    'datosTabla_tb_pesadas2' => $this->consulta_PrimeraEspecie2($fecha, $clienteCodigo),
                    'ventaAnterior2' => $this->consulta_VentaAnterior2($fecha, $clienteCodigo),

                    'datosTabla_tb_pesadas3' => $this->consulta_PrimeraEspecie3($fecha, $clienteCodigo),
                    'ventaAnterior3' => $this->consulta_VentaAnterior3($fecha, $clienteCodigo),

                    'totalDescuentos' => $this->consulta_Descuentos($fecha, $clienteCodigo),
                    'totalPagos' => $this->consulta_Pagos($fecha, $clienteCodigo),
                    'pagoAnterior' => $this->consulta_PagoAnterior($fecha, $clienteCodigo),
                    'totalVentaDescuentoAnterior' => $this->consulta_DescuentosAnteriores($fecha, $clienteCodigo),
                ];
    
                $datos[] = $datosCliente;
            }
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_CambiarPrecioPesadas(Request $request)
    {
        $codigoCliente = $request->input('codigoCliente');
        $fechaCambioPrecio = $request->input('fechaCambioPrecio');
        $especieCambioPrecio = $request->input('especieCambioPrecio');
        $nuevoPrecio = $request->input('nuevoPrecio');

        if (Auth::check()) {
            $ActualizarPrecioCliente = new ActualizarPrecioPesadas;
            $ActualizarPrecioCliente->where('codigoCli', $codigoCliente)
                ->where('fechaRegistroPes', $fechaCambioPrecio)
                ->where('idEspecie', $especieCambioPrecio)
                ->update([
                    'precioPes' => $nuevoPrecio,
                    'estadoWebPes' => 0,
                ]);

            $ActualizarPrecioCliente2 = new ActualizarPrecioPesadas2;
            $ActualizarPrecioCliente2->where('codigoCli', $codigoCliente)
                ->where('fechaRegistroPes', $fechaCambioPrecio)
                ->where('idEspecie', $especieCambioPrecio)
                ->update([
                    'precioPes' => $nuevoPrecio,
                    'estadoWebPes' => 0,
                ]);

            $ActualizarPrecioCliente3 = new ActualizarPrecioPesadas3;
            $ActualizarPrecioCliente3->where('codigoCli', $codigoCliente)
                ->where('fechaRegistroPes', $fechaCambioPrecio)
                ->where('idEspecie', $especieCambioPrecio)
                ->update([
                    'precioPes' => $nuevoPrecio,
                    'estadoWebPes' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDetallesTrozado(Request $request){

        $fecha = $request->input('fecha');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT 
                    tb_pesadas.idPesada,
                    tb_pesadas.idProceso,
                    tb_pesadas.idEspecie,
                    tb_especies_venta.nombreEspecie,
                    tb_pesadas.pesoNetoPes,
                    tb_pesadas.horaPes,
                    tb_pesadas.codigoCli,
                    tb_pesadas.fechaRegistroPes,
                    tb_pesadas.cantidadPes,
                    tb_pesadas.precioPes,
                    tb_pesadas.pesoNetoJabas,
                    tb_pesadas.numeroJabasPes,
                    tb_pesadas.numeroCubetasPes,
                    tb_pesadas.estadoPes,
                    tb_pesadas.estadoWebPes,
                    tb_pesadas.observacionPes,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas.codigoCli
                INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas.idEspecie
                WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ? AND tb_pesadas.idEspecie IN (9, 10, 11, 12, 13, 15)
                UNION
                SELECT 
                    tb_pesadas3.idPesada,
                    tb_pesadas3.idProceso,
                    tb_pesadas3.idEspecie,
                    tb_especies_venta.nombreEspecie,
                    tb_pesadas3.pesoNetoPes,
                    tb_pesadas3.horaPes,
                    tb_pesadas3.codigoCli,
                    tb_pesadas3.fechaRegistroPes,
                    tb_pesadas3.cantidadPes,
                    tb_pesadas3.precioPes,
                    tb_pesadas3.pesoNetoJabas,
                    tb_pesadas3.numeroJabasPes,
                    tb_pesadas3.numeroCubetasPes,
                    tb_pesadas3.estadoPes,
                    tb_pesadas3.estadoWebPes,
                    tb_pesadas3.observacionPes,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas3
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas3.codigoCli
                INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas3.idEspecie
                WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ? AND tb_pesadas3.idEspecie IN (9, 10, 11, 12, 13, 15)
                UNION
                SELECT 
                    tb_pesadas2.idPesada,
                    tb_pesadas2.idProceso,
                    tb_pesadas2.idEspecie,
                    tb_especies_venta.nombreEspecie,
                    tb_pesadas2.pesoNetoPes,
                    tb_pesadas2.horaPes,
                    tb_pesadas2.codigoCli,
                    tb_pesadas2.fechaRegistroPes,
                    tb_pesadas2.cantidadPes,
                    tb_pesadas2.precioPes,
                    tb_pesadas2.pesoNetoJabas,
                    tb_pesadas2.numeroJabasPes,
                    tb_pesadas2.numeroCubetasPes,
                    tb_pesadas2.estadoPes,
                    tb_pesadas2.estadoWebPes,
                    tb_pesadas2.observacionPes,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas2
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas2.codigoCli
                INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas2.idEspecie
                WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ? AND tb_pesadas2.idEspecie IN (9, 10, 11, 12, 13, 15)
                ORDER BY fechaRegistroPes DESC, idEspecie ASC', [$fecha, $fecha, $fecha, $fecha, $fecha, $fecha]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDetalles(Request $request){

        $fecha = $request->input('fecha');
        $especie = $request->input('especie');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT 
                    tb_pesadas.idPesada,
                    tb_pesadas.idProceso,
                    tb_pesadas.idEspecie,
                    tb_especies_venta.nombreEspecie,
                    tb_pesadas.pesoNetoPes,
                    tb_pesadas.horaPes,
                    tb_pesadas.codigoCli,
                    tb_pesadas.fechaRegistroPes,
                    tb_pesadas.cantidadPes,
                    tb_pesadas.precioPes,
                    tb_pesadas.pesoNetoJabas,
                    tb_pesadas.numeroJabasPes,
                    tb_pesadas.numeroCubetasPes,
                    tb_pesadas.estadoPes,
                    tb_pesadas.estadoWebPes,
                    tb_pesadas.observacionPes,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas.codigoCli
                INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas.idEspecie
                WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ? AND tb_pesadas.idEspecie IN (?)
                UNION
                SELECT 
                    tb_pesadas3.idPesada,
                    tb_pesadas3.idProceso,
                    tb_pesadas3.idEspecie,
                    tb_especies_venta.nombreEspecie,
                    tb_pesadas3.pesoNetoPes,
                    tb_pesadas3.horaPes,
                    tb_pesadas3.codigoCli,
                    tb_pesadas3.fechaRegistroPes,
                    tb_pesadas3.cantidadPes,
                    tb_pesadas3.precioPes,
                    tb_pesadas3.pesoNetoJabas,
                    tb_pesadas3.numeroJabasPes,
                    tb_pesadas3.numeroCubetasPes,
                    tb_pesadas3.estadoPes,
                    tb_pesadas3.estadoWebPes,
                    tb_pesadas3.observacionPes,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas3
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas3.codigoCli
                INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas3.idEspecie
                WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ? AND tb_pesadas3.idEspecie IN (?)
                UNION
                SELECT 
                    tb_pesadas2.idPesada,
                    tb_pesadas2.idProceso,
                    tb_pesadas2.idEspecie,
                    tb_especies_venta.nombreEspecie,
                    tb_pesadas2.pesoNetoPes,
                    tb_pesadas2.horaPes,
                    tb_pesadas2.codigoCli,
                    tb_pesadas2.fechaRegistroPes,
                    tb_pesadas2.cantidadPes,
                    tb_pesadas2.precioPes,
                    tb_pesadas2.pesoNetoJabas,
                    tb_pesadas2.numeroJabasPes,
                    tb_pesadas2.numeroCubetasPes,
                    tb_pesadas2.estadoPes,
                    tb_pesadas2.estadoWebPes,
                    tb_pesadas2.observacionPes,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas2
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas2.codigoCli
                INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas2.idEspecie
                WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ? AND tb_pesadas2.idEspecie IN (?)
                ORDER BY fechaRegistroPes DESC, idPesada ASC', [$fecha, $fecha, $especie, $fecha, $fecha, $especie, $fecha, $fecha, $especie]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
    
}

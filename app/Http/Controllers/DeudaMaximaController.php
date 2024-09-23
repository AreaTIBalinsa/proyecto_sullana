<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\DeudaMaxima\ActualizarDeudaMaxima;

class DeudaMaximaController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('deuda_maxima');
        }
        return redirect('/login');
    }

    public function consulta_DeudaMaximaClientes(Request $request){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT 
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto, 
                codigoCli,limitEndeudamiento 
            FROM tb_clientes WHERE idEstadoCli = 1
            ');
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }  

    public function consulta_ActualizarDeudaMaxima(Request $request){

        $idCodigoClienteDeudaMaxima = $request->input('idCodigoClienteDeudaMaxima');
        $valorDeudaMaxima = $request->input('valorDeudaMaxima');

        if (Auth::check()) {
            $actualizarDeudaMaxima = new ActualizarDeudaMaxima;
            $actualizarDeudaMaxima->where('codigoCli', $idCodigoClienteDeudaMaxima)
                ->update([
                    'limitEndeudamiento' => $valorDeudaMaxima,
                ]);
            
            return response()->json(['success' => true], 200);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }  

    public function consulta_TraerReporteSemanalSaldos(Request $request){

        $fecha = $request->input('fecha');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT 
                IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                tc.codigoCli AS codigoCli, 
                COALESCE(SUM(CASE 
                    WHEN tp.pesoNetoPes > 0 AND fechaRegistroPes <= ? THEN (tp.pesoNetoPes - tp.pesoNetoJabas) * tp.precioPes 
                    WHEN fechaRegistroPes <= ? THEN (tp.pesoNetoPes + tp.pesoNetoJabas) * tp.precioPes 
                    ELSE 0 
                END), 0) AS deudaTotal, 
                COALESCE(SUM(CASE 
                    WHEN tp.pesoNetoPes > 0 AND fechaRegistroPes = ? THEN (tp.pesoNetoPes - tp.pesoNetoJabas) * tp.precioPes 
                    WHEN fechaRegistroPes = ? THEN (tp.pesoNetoPes + tp.pesoNetoJabas) * tp.precioPes 
                    ELSE 0 
                END), 0) AS deudaHoy, 
                COALESCE(tpg.sumaPagos, 0) AS cantidadPagos, 
                COALESCE(td.ventaDescuentos, 0) AS ventaDescuentos,
                limitEndeudamiento 
            FROM tb_clientes tc
            LEFT JOIN tb_pesadas tp ON tc.codigoCli = tp.codigoCli AND tp.estadoPes = 1
            LEFT JOIN (
                SELECT codigoCli, SUM(cantidadAbonoPag) AS sumaPagos
                FROM tb_pagos
                WHERE estadoPago = 1 AND fechaOperacionPag <= ?
                GROUP BY codigoCli
            ) tpg ON tc.codigoCli = tpg.codigoCli
            LEFT JOIN (
                SELECT codigoCli, SUM(pesoDesc * precioDesc) AS ventaDescuentos
                FROM tb_descuentos
                WHERE estadoDescuento = 1 AND fechaRegistroDesc <= ?
                GROUP BY codigoCli
            ) td ON tc.codigoCli = td.codigoCli
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg.sumaPagos, td.ventaDescuentos, limitEndeudamiento

            UNION ALL

            SELECT 
                IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                tc.codigoCli AS codigoCli, 
                COALESCE(SUM(CASE 
                    WHEN tp3.pesoNetoPes > 0 AND fechaRegistroPes <= ? THEN (tp3.pesoNetoPes - tp3.pesoNetoJabas) * tp3.precioPes 
                    WHEN fechaRegistroPes <= ? THEN (tp3.pesoNetoPes + tp3.pesoNetoJabas) * tp3.precioPes 
                    ELSE 0 
                END), 0) AS deudaTotal, 
                COALESCE(SUM(CASE 
                    WHEN tp3.pesoNetoPes > 0 AND fechaRegistroPes = ? THEN (tp3.pesoNetoPes - tp3.pesoNetoJabas) * tp3.precioPes 
                    WHEN fechaRegistroPes = ? THEN (tp3.pesoNetoPes + tp3.pesoNetoJabas) * tp3.precioPes 
                    ELSE 0 
                END), 0) AS deudaHoy, 
                0 AS cantidadPagos, 
                0 AS ventaDescuentos,
                0 AS limitEndeudamiento 
            FROM tb_clientes tc
            LEFT JOIN tb_pesadas3 tp3 ON tc.codigoCli = tp3.codigoCli AND tp3.estadoPes = 1
            LEFT JOIN (
                SELECT codigoCli, SUM(cantidadAbonoPag) AS sumaPagos
                FROM tb_pagos
                WHERE estadoPago = 1 AND fechaOperacionPag <= ?
                GROUP BY codigoCli
            ) tpg3 ON tc.codigoCli = tpg3.codigoCli
            LEFT JOIN (
                SELECT codigoCli, SUM(pesoDesc * precioDesc) AS ventaDescuentos
                FROM tb_descuentos
                WHERE estadoDescuento = 1 AND fechaRegistroDesc <= ?
                GROUP BY codigoCli
            ) td3 ON tc.codigoCli = td3.codigoCli
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg3.sumaPagos, td3.ventaDescuentos, limitEndeudamiento

            UNION ALL

            SELECT 
                IFNULL(CONCAT_WS(" ", MAX(nombresCli), MAX(apellidoPaternoCli), MAX(apellidoMaternoCli)), "") AS nombreCompleto, 
                tc.codigoCli AS codigoCli, 
                COALESCE(SUM(CASE 
                    WHEN tp2.pesoNetoPes > 0 AND fechaRegistroPes = ? THEN (tp2.pesoNetoPes - tp2.pesoNetoJabas) * tp2.precioPes 
                    WHEN fechaRegistroPes <= ? THEN (tp2.pesoNetoPes + tp2.pesoNetoJabas) * tp2.precioPes 
                    ELSE 0 
                END), 0) AS deudaTotal, 
                COALESCE(SUM(CASE 
                    WHEN tp2.pesoNetoPes > 0 AND fechaRegistroPes = ? THEN (tp2.pesoNetoPes - tp2.pesoNetoJabas) * tp2.precioPes 
                    WHEN fechaRegistroPes = ? THEN (tp2.pesoNetoPes + tp2.pesoNetoJabas) * tp2.precioPes 
                    ELSE 0 
                END), 0) AS deudaHoy,
                0 AS cantidadPagos, 
                0 AS ventaDescuentos,
                0 AS limitEndeudamiento 
            FROM tb_clientes tc
            LEFT JOIN tb_pesadas2 tp2 ON tc.codigoCli = tp2.codigoCli AND tp2.estadoPes = 1
            LEFT JOIN (
                SELECT codigoCli, SUM(cantidadAbonoPag) AS sumaPagos
                FROM tb_pagos
                WHERE estadoPago = 1 AND fechaOperacionPag <= ?
                GROUP BY codigoCli
            ) tpg2 ON tc.codigoCli = tpg2.codigoCli
            LEFT JOIN (
                SELECT codigoCli, SUM(pesoDesc * precioDesc) AS ventaDescuentos
                FROM tb_descuentos
                WHERE estadoDescuento = 1 AND fechaRegistroDesc <= ?
                GROUP BY codigoCli
            ) td2 ON tc.codigoCli = td2.codigoCli
            WHERE tc.idEstadoCli = 1 AND tc.estadoEliminadoCli != 0
            GROUP BY tc.codigoCli, tpg2.sumaPagos, td2.ventaDescuentos, limitEndeudamiento

            ORDER BY nombreCompleto ASC;
            ',[$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha,$fecha]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
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
                LEFT JOIN (
                    SELECT codigoCli FROM tb_pesadas
                    UNION ALL
                    SELECT codigoCli FROM tb_pesadas2
                    UNION ALL
                    SELECT codigoCli FROM tb_pesadas3
                ) AS p ON c.codigoCli = p.codigoCli
                WHERE c.estadoEliminadoCli = 1 AND c.nombresCli != "PAUL"
                ORDER BY nombreCompleto ASC
            ');
            
            return $datos;
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }           

    public function consulta_TraerReporteAcumuladoDetalleDeudaMaxima(Request $request) {

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
}

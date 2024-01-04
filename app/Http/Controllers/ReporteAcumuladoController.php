<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ReporteAcumulado\TraerDatosReporteAcumulado;

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
            $datos = TraerDatosReporteAcumulado::select('idEspecie', 'pesoNetoPes', 'cantidadPes','fechaRegistroPes','pesoNetoJabas')
                ->where('estadoPes', '=', 1)
                ->whereBetween('fechaRegistroPes', [$fechaDesde, $fechaHasta])
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_VentaAnterior($fecha, $clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('COALESCE(SUM(CASE WHEN pesoNetoPes > pesoNetoJabas THEN (pesoNetoPes - pesoNetoJabas) ELSE (pesoNetoPes + pesoNetoJabas) END * precioPes), 0) AS ventaAnterior')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes', '<', $fecha)
            ->value('ventaAnterior');
    
        return $consulta;
    }        

    public function consulta_PrimeraEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoPrimerEspecie')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadPrimerEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_SegundaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSegundaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_TerceraEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadTerceraEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_CuartaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadCuartaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    // Otras Especies

    public function consulta_QuintaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 5 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadQuintaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_SextaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSextaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 6 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSextaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_SeptimaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSeptimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 7 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSeptimaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_OctavaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoOctavaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 8 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadOctavaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 10 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaPrimeraEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaPrimeraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 11 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaPrimeraEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaSegundaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaSegundaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 12 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaSegundaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaTerceraEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaTerceraEspecie')
            ->selectRaw('SUM(IF(idEspecie = 13 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaTerceraEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaCuartaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaCuartaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 14 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaCuartaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaQuintaEspecie($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaQuintaEspecie')
            ->selectRaw('SUM(IF(idEspecie = 15 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaQuintaEspecie')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    // Termina

    /* ================================================================== */
    /* =============================Consulta============================= */
    /* ================================================================== */

    public function consulta_VentaAnterior2($fecha, $clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('COALESCE(SUM(CASE WHEN pesoNetoPes > pesoNetoJabas THEN (pesoNetoPes - pesoNetoJabas) ELSE (pesoNetoPes + pesoNetoJabas) END * precioPes), 0) AS ventaAnterior2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes', '<', $fecha)
            ->value('ventaAnterior');
    
        return $consulta;
    }        

    public function consulta_PrimeraEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoPrimerEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 1 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadPrimerEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_SegundaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 2 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSegundaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_TerceraEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 3 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadTerceraEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_CuartaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 4 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadCuartaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    // Otras Especies

    public function consulta_QuintaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 5 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadQuintaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_SextaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSextaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 6 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSextaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_SeptimaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoSeptimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 7 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadSeptimaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_OctavaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoOctavaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 8 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadOctavaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 10 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaPrimeraEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaPrimeraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 11 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaPrimeraEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaSegundaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaSegundaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 12 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaSegundaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaTerceraEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaTerceraEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 13 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaTerceraEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaCuartaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaCuartaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 14 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaCuartaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
            ->get();
    
        return $consulta;
    }

    public function consulta_DecimaQuintaEspecie2($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pesadas2')
            ->selectRaw('fechaRegistroPes')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes > 0.0, pesoNetoPes - pesoNetoJabas, 0)) AS totalPesoDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes < 0.0, pesoNetoPes + pesoNetoJabas, 0)) AS totalPesoDescuentoDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND cantidadPes < 0, cantidadPes, 0)) AS totalCantidadDescuentoDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes > 0.0, (pesoNetoPes - pesoNetoJabas) * precioPes, 0)) AS totalVentaDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND pesoNetoPes < 0.0, (pesoNetoPes + pesoNetoJabas) * precioPes, 0)) AS totalVentaDescuentoDecimaQuintaEspecie2')
            ->selectRaw('SUM(IF(idEspecie = 15 AND cantidadPes > 0, cantidadPes, 0)) AS totalCantidadDecimaQuintaEspecie2')
            ->where('estadoPes', 1)
            ->where('codigoCli', $clienteCodigo)
            ->where('fechaRegistroPes','=', $fecha)
            ->groupBy('fechaRegistroPes')
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
            ->where('fechaOperacionPag', '<', $fecha)
            ->value('pagoAnterior');
    
        return $consulta;
    }
    
    public function consulta_Pagos($fecha,$clienteCodigo) {
        $consulta = DB::table('tb_pagos')
            ->selectRaw('fechaOperacionPag')
            ->selectRaw('COALESCE(SUM(cantidadAbonoPag), 0) AS pagos')
            ->where('estadoPago', '=', 1)
            ->where('fechaOperacionPag', '=', $fecha)
            ->where('codigoCli', $clienteCodigo)
            ->groupBy('fechaOperacionPag')
            ->get();
    
        return $consulta;
    }
    
    public function consulta_ConsultarClientes(){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT idCliente,codigoCli,
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_clientes 
            WHERE estadoEliminadoCli = 1 ORDER BY nombreCompleto ASC');

            // Devuelve los datos en formato JSON
            return $datos;
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerReporteAcumuladoDetalle(Request $request) {

        $fecha = $request->input('fecha');
    
        if (Auth::check()) {
            // Obtener la lista de clientes
            $clientes = $this->consulta_ConsultarClientes();
    
            $datos = [];
    
            foreach ($clientes as $cliente) {
                $clienteCodigo = $cliente->codigoCli;
    
                $datosCliente = [
                    'cliente' => $cliente,
                    'totalesPrimerEspecie' => $this->consulta_PrimeraEspecie($fecha, $clienteCodigo),
                    'totalesSegundaEspecie' => $this->consulta_SegundaEspecie($fecha, $clienteCodigo),
                    'totalesTerceraEspecie' => $this->consulta_TerceraEspecie($fecha, $clienteCodigo),
                    'totalesCuartaEspecie' => $this->consulta_CuartaEspecie($fecha, $clienteCodigo),
                    'totalesQuintaEspecie' => $this->consulta_QuintaEspecie($fecha, $clienteCodigo),
                    'totalesSextaEspecie' => $this->consulta_SextaEspecie($fecha, $clienteCodigo),
                    'totalesSeptimaEspecie' => $this->consulta_SeptimaEspecie($fecha, $clienteCodigo),
                    'totalesOctavaEspecie' => $this->consulta_OctavaEspecie($fecha, $clienteCodigo),
                    'totalesDecimaEspecie' => $this->consulta_DecimaEspecie($fecha, $clienteCodigo),
                    'totalesDecimaPrimeraEspecie' => $this->consulta_DecimaPrimeraEspecie($fecha, $clienteCodigo),
                    'totalesDecimaSegundaEspecie' => $this->consulta_DecimaSegundaEspecie($fecha, $clienteCodigo),
                    'totalesDecimaTerceraEspecie' => $this->consulta_DecimaTerceraEspecie($fecha, $clienteCodigo),
                    'totalesDecimaCuartaEspecie' => $this->consulta_DecimaCuartaEspecie($fecha, $clienteCodigo),
                    'totalesDecimaQuintaEspecie' => $this->consulta_DecimaQuintaEspecie($fecha, $clienteCodigo),
                    'ventaAnterior' => $this->consulta_VentaAnterior($fecha, $clienteCodigo),

                    'totalesPrimerEspecie2' => $this->consulta_PrimeraEspecie2($fecha, $clienteCodigo),
                    'totalesSegundaEspecie2' => $this->consulta_SegundaEspecie2($fecha, $clienteCodigo),
                    'totalesTerceraEspecie2' => $this->consulta_TerceraEspecie2($fecha, $clienteCodigo),
                    'totalesCuartaEspecie2' => $this->consulta_CuartaEspecie2($fecha, $clienteCodigo),
                    'totalesQuintaEspecie2' => $this->consulta_QuintaEspecie2($fecha, $clienteCodigo),
                    'totalesSextaEspecie2' => $this->consulta_SextaEspecie2($fecha, $clienteCodigo),
                    'totalesSeptimaEspecie2' => $this->consulta_SeptimaEspecie2($fecha, $clienteCodigo),
                    'totalesOctavaEspecie2' => $this->consulta_OctavaEspecie2($fecha, $clienteCodigo),
                    'totalesDecimaEspecie2' => $this->consulta_DecimaEspecie2($fecha, $clienteCodigo),
                    'totalesDecimaPrimeraEspecie2' => $this->consulta_DecimaPrimeraEspecie2($fecha, $clienteCodigo),
                    'totalesDecimaSegundaEspecie2' => $this->consulta_DecimaSegundaEspecie2($fecha, $clienteCodigo),
                    'totalesDecimaTerceraEspecie2' => $this->consulta_DecimaTerceraEspecie2($fecha, $clienteCodigo),
                    'totalesDecimaCuartaEspecie2' => $this->consulta_DecimaCuartaEspecie2($fecha, $clienteCodigo),
                    'totalesDecimaQuintaEspecie2' => $this->consulta_DecimaQuintaEspecie2($fecha, $clienteCodigo),
                    'ventaAnterior2' => $this->consulta_VentaAnterior2($fecha, $clienteCodigo),

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
    
    // Las otras funciones de consulta_PagoAnterior, consulta_Pagos, etc., también deben recibir $clienteCodigo y aplicarlo en sus consultas.
        
    
}

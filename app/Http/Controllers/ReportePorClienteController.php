<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ReportePorCliente\TraerClientesReportePorCliente;
use App\Models\ReportePorCliente\CantidadReportePorCliente;
use App\Models\ReportePorCliente\CantidadReportePorCliente2;
use App\Models\ReportePorCliente\PesoReportePorCliente;
use App\Models\ReportePorCliente\PesoReportePorCliente2;
use App\Models\ReportePorCliente\PesoJabasReportePorCliente;
use App\Models\ReportePorCliente\PesoJabasReportePorCliente2;
use App\Models\ReportePorCliente\EliminarReportePorCliente;
use App\Models\ReportePorCliente\EliminarReportePorCliente2;
use Illuminate\Support\Facades\DB;

class ReportePorClienteController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('reporte_por_cliente');
        }
        return redirect('/login');
    }

    public function consulta_TraerClientesReportePorCliente(Request $request){

        $nombreReportePorCliente = $request->input('idClientePorReporte');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesReportePorCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=','1')
                ->where('idEstadoCli','=','1')
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

    public function consulta_TraerReportePorCliente(Request $request){

    $fechaDesde = $request->input('fechaDesde');
    $fechaHasta = $request->input('fechaHasta');
    $codigoCliente = $request->input('codigoCliente');

    if (Auth::check()) {
        // Realiza la consulta a la base de datos
        $datos = DB::select('
            SELECT 
                "tb_pesadas" AS tabla_iden,
                fechaRegistroPes, 
                nombreEspecie,
                pesoNetoPes, 
                pesoNetoJabas, 
                cantidadPes, 
                observacionPes, 
                horaPes,
                tb_pesadas.idPesada
            FROM tb_pesadas 
            INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas.idEspecie
            WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ? AND tb_pesadas.codigoCli = ?
            UNION
            SELECT 
                "tb_pesadas2" AS tabla_iden,
                fechaRegistroPes, 
                nombreEspecie,
                pesoNetoPes, 
                pesoNetoJabas, 
                cantidadPes, 
                observacionPes, 
                horaPes,
                tb_pesadas2.idPesada
            FROM tb_pesadas2 
            INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas2.idEspecie
            WHERE estadoPes = 1 AND fechaRegistroPes BETWEEN ? AND ? AND tb_pesadas2.codigoCli = ?
            ORDER BY fechaRegistroPes, idPesada ASC', [$fechaDesde, $fechaHasta, $codigoCliente, $fechaDesde, $fechaHasta, $codigoCliente]);

        // Devuelve los datos en formato JSON
        return response()->json($datos);
    }

    // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
    return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarCantidadReportePorCliente(Request $request)
    {
        $idCodigoPesada = $request->input('idCodigoPesada');
        $nuevoCantidadReportePorCliente = $request->input('nuevoCantidadReportePorCliente');
        $tablaIdentificadoraCan = $request->input('tablaIdentificadoraCan');

        if (Auth::check()) {
            // Seleccionar el modelo en función de la tablaIdentificadoraCan
            $modeloCantidadReportePorCliente = ($tablaIdentificadoraCan === 'tb_pesadas') ? new CantidadReportePorCliente : new CantidadReportePorCliente2;

            $modeloCantidadReportePorCliente->where('idPesada', $idCodigoPesada)
                ->update([
                    'cantidadPes' => $nuevoCantidadReportePorCliente,
                    'estadoWebPes' => 0,
                ]);

            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPesoReportePorCliente(Request $request)
    {
        $idCodigoPesada = $request->input('idCodigoPesada');
        $nuevoPesoReportePorCliente = $request->input('nuevoPesoReportePorCliente');
        $tablaIdentificadoraPeso = $request->input('tablaIdentificadoraPeso');

        if (Auth::check()) {
            $PesoReportePorCliente = ($tablaIdentificadoraPeso === 'tb_pesadas') ? new PesoReportePorCliente : new PesoReportePorCliente2;
            $PesoReportePorCliente->where('idPesada', $idCodigoPesada)
                ->update([
                    'pesoNetoPes' => $nuevoPesoReportePorCliente,
                    'estadoWebPes' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPesoJabasReportePorCliente(Request $request)
    {
        $idCodigoPesada = $request->input('idCodigoPesada');
        $nuevoPesoJabasReportePorCliente = $request->input('nuevoPesoReportePorCliente');
        $tablaIdentificadoraPeso = $request->input('tablaIdentificadoraPeso');

        if (Auth::check()) {
            $PesoJabasReportePorCliente = ($tablaIdentificadoraPeso === 'tb_pesadas') ? new PesoJabasReportePorCliente : new PesoJabasReportePorCliente2;
            $PesoJabasReportePorCliente->where('idPesada', $idCodigoPesada)
                ->update([
                    'pesoNetoJabas' => $nuevoPesoJabasReportePorCliente,
                    'estadoWebPes' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarPesada(Request $request)
    {
        $codigoPesada = $request->input('codigoPesada');
        $identifiTabla = $request->input('identifiTabla');

        if (Auth::check()) {
            if ($identifiTabla == "tb_pesadas"){
                $EliminarReportePorCliente = new EliminarReportePorCliente;
                $EliminarReportePorCliente->where('idPesada', $codigoPesada)
                    ->update([
                        'estadoPes' => 0,
                        'estadoWebPes' => 0,
                    ]);
                
                return response()->json(['success' => true], 200);
            }else if ($identifiTabla == "tb_pesadas2"){
                $EliminarReportePorCliente = new EliminarReportePorCliente2;
                $EliminarReportePorCliente->where('idPesada', $codigoPesada)
                    ->update([
                        'estadoPes' => 0,
                        'estadoWebPes' => 0,
                    ]);
                
                return response()->json(['success' => true], 200);
            }
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}

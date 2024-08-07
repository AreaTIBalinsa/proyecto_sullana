<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPesadas\AgregarPesadasWeb;
use App\Models\Pesadas\DatosEspeciePesadas;
use App\Models\Pesadas\EliminarPesadaWeb;
use Carbon\Carbon;

class PesadasWebController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('pesadas_web');
        }
        return redirect('/login');
    }

    public function consulta_registrarPesadas(Request $request){

        $idEspecie = $request->input('codigoEspecieAgregarPesada');
        $pesoNetoPes = $request->input('pesoBrutoAgregarPesada');
        $cantidadAgregarPesada = $request->input('cantidadAgregarPesada');
        $pesoTaraAgregarPesada = $request->input('pesoTaraAgregarPesada');
        $precioAgregarPesada = $request->input('precioAgregarPesada');
        $observacionAgregarPesada = $request->input('observacionAgregarPesada');
        $fechaAgregarPesada = $request->input('fechaAgregarPesada');
        $codigoCli = $request->input('codigoCli');

        if (Auth::check()) {
            $agregarPesadasWeb = new AgregarPesadasWeb;
            $agregarPesadasWeb->idProceso = 0;
            $agregarPesadasWeb->idEspecie = $idEspecie;
            $agregarPesadasWeb->pesoNetoPes = $pesoNetoPes;
            $agregarPesadasWeb->horaPes = Carbon::now()->setTimezone('America/Lima')->format('H:i:s');
            $agregarPesadasWeb->codigoCli = $codigoCli;
            $agregarPesadasWeb->fechaRegistroPes = $fechaAgregarPesada;
            $agregarPesadasWeb->cantidadPes = $cantidadAgregarPesada;
            $agregarPesadasWeb->precioPes = $precioAgregarPesada;
            $agregarPesadasWeb->pesoNetoJabas = $pesoTaraAgregarPesada === null ? 0 : $pesoTaraAgregarPesada;
            $agregarPesadasWeb->numeroJabasPes = 0;
            $agregarPesadasWeb->numeroCubetasPes = 0;
            $agregarPesadasWeb->estadoPes = 1;
            $agregarPesadasWeb->estadoWebPes = 1;
            $agregarPesadasWeb->observacionPes = $observacionAgregarPesada === null ? "" : $observacionAgregarPesada;
            $agregarPesadasWeb->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDatosPesadas3(Request $request)
    {
        $fechaDesdePesadas = $request->input('fechaDesdePesadas');
        $fechaHastaPesadas = $request->input('fechaHastaPesadas');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT
                    tb_pesadas3.idPesada, 
                    tb_pesadas3.idEspecie,
                    tb_pesadas3.pesoNetoPes,
                    tb_pesadas3.fechaRegistroPes,
                    tb_pesadas3.cantidadPes,
                    tb_pesadas3.pesoNetoJabas,
                    tb_pesadas3.precioPes,
                    tb_pesadas3.observacionPes,
                    tb_pesadas3.codigoCli,
                    tb_especies_venta.nombreEspecie,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas3
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas3.codigoCli
                INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas3.idEspecie
                WHERE fechaRegistroPes BETWEEN ? AND ? AND estadoPes = 1', [$fechaDesdePesadas,$fechaHastaPesadas]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarPesada(Request $request)
    {
        $codigoPesada = $request->input('codigoPesada');

        if (Auth::check()) {
            $EliminarPesadaWeb = new EliminarPesadaWeb;
            $EliminarPesadaWeb->where('idPesada', $codigoPesada)
                ->update([
                    'estadoPes' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EditarPesadasWeb(Request $request){
        $codigoPesada = $request->input('codigoPesada');
    
        if (Auth::check()) {
            $datos = DB::select('
                SELECT tb_pesadas3.idPesada,
                    tb_pesadas3.idEspecie,
                    tb_pesadas3.pesoNetoPes,
                    tb_pesadas3.fechaRegistroPes,
                    tb_pesadas3.cantidadPes,
                    tb_pesadas3.pesoNetoJabas,
                    tb_pesadas3.precioPes,
                    tb_pesadas3.observacionPes,
                    tb_pesadas3.codigoCli,
                    tb_especies_venta.nombreEspecie,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas3
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas3.codigoCli
                INNER JOIN tb_especies_venta ON tb_especies_venta.idEspecie = tb_pesadas3.idEspecie
                WHERE idPesada = ?', [$codigoPesada]);
    
            return response()->json($datos);
        }
    
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_DatosPesadasWeb(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DatosEspeciePesadas::select('idEspecie', 'nombreEspecie')
                ->orderBy('idEspecie', 'asc')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
    
    public function consulta_EditarDatosPesadas(Request $request) {
        $idPesadaWebEditar = $request->input('idPesadaWebEditar');
        $idEditarPesadasWebCliente = $request->input('idEditarPesadasWebCliente');
        $fechaEditarPesada = $request->input('fechaEditarPesada');
        $especieEditarPesada = $request->input('especieEditarPesada');
        $cantidadEditarPesada = $request->input('cantidadEditarPesada');
        $pesoBrutoEditarPesada = $request->input('pesoBrutoEditarPesada');
        $pesoJabasEditarPesada = $request->input('pesoJabasEditarPesada');
        $precioEditarPesada = $request->input('precioEditarPesada');
        $comentarioEditarPesada = $request->input('comentarioEditarPesada');
    
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            DB::update('
                UPDATE tb_pesadas3
                SET 
                    codigoCli = ?,
                    fechaRegistroPes = ?,
                    idEspecie = ?,
                    cantidadPes = ?,
                    pesoNetoPes = ?,
                    pesoNetoJabas = ?,
                    precioPes = ?,
                    observacionPes = ?
                WHERE idPesada = ?',
                [$idEditarPesadasWebCliente, $fechaEditarPesada, $especieEditarPesada, $cantidadEditarPesada, $pesoBrutoEditarPesada, $pesoJabasEditarPesada, $precioEditarPesada, $comentarioEditarPesada, $idPesadaWebEditar]
            );
    
            // Devuelve los datos en formato JSON
            return response()->json(['success' => true], 200);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }    
}

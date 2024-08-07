<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPedido\AgregarPedido;
use App\Models\AgregarPedido\EliminarPedidoCliente;
use App\Models\AgregarPedido\ActualizarPedidoCliente;


class PedidosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('pedidos');
        }
        return redirect('/login');
    }

    public function consulta_TraerCantidadStockPollos(Request $request){
        if (Auth::check()){
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT
                    tb_pesadas.idPesada, 
                    tb_pesadas.idEspecie,
                    tb_pesadas.pesoNetoPes,
                    tb_pesadas.fechaRegistroPes,
                    tb_pesadas.cantidadPes,
                    tb_pesadas.pesoNetoJabas,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas.codigoCli
                WHERE fechaRegistroPes = DATE(NOW()) and estadoPes = 1
                UNION
                SELECT 
                    tb_pesadas3.idPesada, 
                    tb_pesadas3.idEspecie,
                    tb_pesadas3.pesoNetoPes,
                    tb_pesadas3.fechaRegistroPes,
                    tb_pesadas3.cantidadPes,
                    tb_pesadas3.pesoNetoJabas,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas3
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas3.codigoCli
                WHERE fechaRegistroPes = DATE(NOW()) and estadoPes = 1
                UNION
                SELECT 
                    tb_pesadas2.idPesada, 
                    tb_pesadas2.idEspecie,
                    tb_pesadas2.pesoNetoPes,
                    tb_pesadas2.fechaRegistroPes,
                    tb_pesadas2.cantidadPes,
                    tb_pesadas2.pesoNetoJabas,
                    IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
                FROM tb_pesadas2
                INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pesadas2.codigoCli
                WHERE fechaRegistroPes = DATE(NOW()) and estadoPes = 1
                ORDER BY fechaRegistroPes DESC, idPesada ASC');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPedidosClientes(Request $request)
    {
        $fechaBuscarPedidos = $request->input('fechaBuscarPedidos');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                SELECT 
                    IFNULL(CONCAT_WS(" ", c.nombresCli, c.apellidoPaternoCli, c.apellidoMaternoCli), "") AS nombreCompleto, 
                    c.codigoCli as codigoCliPedidos, 
                    COALESCE(p.fechaRegistroPedido, ?) AS fechaRegistroPedido, 
                    COALESCE(p.pedidoPrimerEspecie, 0) AS pedidoPrimerEspecie, 
                    COALESCE(p.pedidoSegundaEspecie, 0) AS pedidoSegundaEspecie,
                    COALESCE(p.pedidoTercerEspecie, 0) AS pedidoTercerEspecie, 
                    COALESCE(p.pedidoCuartaEspecie, 0) AS pedidoCuartaEspecie, 
                    COALESCE(p.pedidoQuintaEspecie, 0) AS pedidoQuintaEspecie, 
                    COALESCE(p.pedidoSextaEspecie, 0) AS pedidoSextaEspecie, 
                    COALESCE(p.pedidoSeptimaEspecie, 0) AS pedidoSeptimaEspecie, 
                    COALESCE(p.pedidoOctavaEspecie, 0) AS pedidoOctavaEspecie, 
                    COALESCE(p.pedidoNovenaEspecie, 0) AS pedidoNovenaEspecie, 
                    COALESCE(p.pedidoDecimaEspecie, 0) AS pedidoDecimaEspecie, 
                    COALESCE(p.pedidoDecimaPrimeraEspecie, 0) AS pedidoDecimaPrimeraEspecie, 
                    COALESCE(p.pedidoDecimaSegundaEspecie, 0) AS pedidoDecimaSegundaEspecie, 
                    COALESCE(p.pedidoDecimaTerceraEspecie, 0) AS pedidoDecimaTerceraEspecie, 
                    COALESCE(p.pedidoDecimaCuartaEspecie, 0) AS pedidoDecimaCuartaEspecie, 
                    COALESCE(p.comentarioPedido, "") AS comentarioPedido
                FROM tb_clientes c
                LEFT JOIN tb_pedidos p ON c.codigoCli = p.codigoCliPedidos AND p.fechaRegistroPedido = ?
                WHERE c.idEstadoCli = 1 AND c.estadoEliminadoCli = 1
                ORDER BY nombreCompleto ASC', [$fechaBuscarPedidos, $fechaBuscarPedidos]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }


    public function consulta_AgregarPedidoCliente(Request $request){

        $selectedCodigoCliPedidos = $request->input('selectedCodigoCliPedidos');
        $primerEspecie = $request->input('primerEspecie');
        $segundaEspecie = $request->input('segundaEspecie');
        $terceraEspecie = $request->input('terceraEspecie');
        $cuartaEspecie = $request->input('cuartaEspecie');
        $quintaEspecie = $request->input('quintaEspecie');
        $sextaEspecie = $request->input('sextaEspecie');
        $septimaEspecie = $request->input('septimaEspecie');
        $octavaEspecie = $request->input('octavaEspecie');
        $novenaEspecie = $request->input('novenaEspecie');
        $decimaEspecie = $request->input('decimaEspecie');
        $decimaPrimeraEspecie = $request->input('decimaPrimeraEspecie');
        $decimaSegundaEspecie = $request->input('decimaSegundaEspecie');
        $decimaTerceraEspecie = $request->input('decimaTerceraEspecie');
        $decimaCuartaEspecie = $request->input('decimaCuartaEspecie');
        $pedidoComentario = $request->input('comentarioPedido');
        $fechaAgregarPedido = $request->input('fechaAgregarPedido');

        if (Auth::check()) {
            $agregarPedido = new AgregarPedido;
            $agregarPedido->codigoCliPedidos = $selectedCodigoCliPedidos;
            $agregarPedido->pedidoPrimerEspecie = $primerEspecie === null ? 0 : $primerEspecie;
            $agregarPedido->pedidoSegundaEspecie = $segundaEspecie === null ? 0 : $segundaEspecie;
            $agregarPedido->pedidoTercerEspecie = $terceraEspecie === null ? 0 : $terceraEspecie;
            $agregarPedido->pedidoCuartaEspecie = $cuartaEspecie === null ? 0 : $cuartaEspecie;
            $agregarPedido->pedidoQuintaEspecie = $quintaEspecie === null ? 0 : $quintaEspecie;
            $agregarPedido->pedidoSextaEspecie = $sextaEspecie === null ? 0 : $sextaEspecie;
            $agregarPedido->pedidoSeptimaEspecie = $septimaEspecie === null ? 0 : $septimaEspecie;
            $agregarPedido->pedidoOctavaEspecie = $octavaEspecie === null ? 0 : $octavaEspecie;
            $agregarPedido->pedidoNovenaEspecie = $novenaEspecie === null ? 0 : $novenaEspecie;
            $agregarPedido->pedidoDecimaEspecie = $decimaEspecie === null ? 0 : $decimaEspecie;
            $agregarPedido->pedidoDecimaPrimeraEspecie = $decimaPrimeraEspecie === null ? 0 : $decimaPrimeraEspecie;
            $agregarPedido->pedidoDecimaSegundaEspecie = $decimaSegundaEspecie === null ? 0 : $decimaSegundaEspecie;
            $agregarPedido->pedidoDecimaTerceraEspecie = $decimaTerceraEspecie === null ? 0 : $decimaTerceraEspecie;
            $agregarPedido->pedidoDecimaCuartaEspecie = $decimaCuartaEspecie === null ? 0 : $decimaCuartaEspecie;
            $agregarPedido->comentarioPedido = $pedidoComentario;
            $agregarPedido->fechaRegistroPedido = $fechaAgregarPedido;
            $agregarPedido->estadoPedido = 1;
            $agregarPedido->save();

            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarPedido(Request $request)
    {
        $codigoPedido = $request->input('codigoPedido');

        if (Auth::check()) {
            $EliminarPedidoCliente = new EliminarPedidoCliente;
            $EliminarPedidoCliente->where('idPedido', $codigoPedido)
                ->update([
                    'estadoPedido' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPedidoCliente(Request $request)
    {
        $primerEspecie = $request->input('primerEspecie');
        $segundaEspecie = $request->input('segundaEspecie');
        $terceraEspecie = $request->input('terceraEspecie');
        $cuartaEspecie = $request->input('cuartaEspecie');
        $quintaEspecie = $request->input('quintaEspecie');
        $sextaEspecie = $request->input('sextaEspecie');
        $septimaEspecie = $request->input('septimaEspecie');
        $octavaEspecie = $request->input('octavaEspecie');
        $novenaEspecie = $request->input('novenaEspecie');
        $decimaEspecie = $request->input('decimaEspecie');
        $decimaPrimeraEspecie = $request->input('decimaPrimeraEspecie');
        $decimaSegundaEspecie = $request->input('decimaSegundaEspecie');
        $decimaTerceraEspecie = $request->input('decimaTerceraEspecie');
        $decimaCuartaEspecie = $request->input('decimaCuartaEspecie');
        $pedidoComentario = $request->input('comentarioPedido');
        $fechaAgregarPedido = $request->input('fechaAgregarPedido');
        $idPedidoCliente = $request->input('idPedidoCliente');

        if (Auth::check()) {
            $ActualizarPedidoCliente = new ActualizarPedidoCliente;
            $ActualizarPedidoCliente->where('idPedido', $idPedidoCliente)
                ->update([
                    'pedidoPrimerEspecie' => $primerEspecie === null ? 0 : $primerEspecie,
                    'pedidoSegundaEspecie' => $segundaEspecie === null ? 0 : $segundaEspecie,
                    'pedidoTercerEspecie' => $terceraEspecie === null ? 0 : $terceraEspecie,
                    'pedidoCuartaEspecie' => $cuartaEspecie === null ? 0 : $cuartaEspecie,
                    'pedidoQuintaEspecie' => $quintaEspecie === null ? 0 : $quintaEspecie,
                    'pedidoSextaEspecie' => $sextaEspecie === null ? 0 : $sextaEspecie,
                    'pedidoSeptimaEspecie' => $septimaEspecie === null ? 0 : $septimaEspecie,
                    'pedidoOctavaEspecie' => $octavaEspecie === null ? 0 : $octavaEspecie,
                    'pedidoNovenaEspecie' => $novenaEspecie === null ? 0 : $novenaEspecie,
                    'pedidoDecimaEspecie' => $decimaEspecie === null ? 0 : $decimaEspecie,
                    'pedidoDecimaPrimeraEspecie' => $decimaPrimeraEspecie === null ? 0 : $decimaPrimeraEspecie,
                    'pedidoDecimaSegundaEspecie' => $decimaSegundaEspecie === null ? 0 : $decimaSegundaEspecie,
                    'pedidoDecimaTerceraEspecie' => $decimaTerceraEspecie === null ? 0 : $decimaTerceraEspecie,
                    'pedidoDecimaCuartaEspecie' => $decimaCuartaEspecie === null ? 0 : $decimaCuartaEspecie,
                    'comentarioPedido' => $pedidoComentario,

                    'fechaRegistroPedido' => $fechaAgregarPedido,
                ]);
            
            return response()->json(['success' => true], 200);
        }
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPedidosAnteriores(Request $request ){

        $fechaTraerPedido = $request->input('fechaTraerPedido');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT
            idPedido,codigoCliPedidos,pedidoPrimerEspecie,pedidoSegundaEspecie,
            pedidoTercerEspecie,pedidoCuartaEspecie,pedidoQuintaEspecie,pedidoSextaEspecie,
            pedidoSeptimaEspecie,pedidoOctavaEspecie,pedidoNovenaEspecie,pedidoDecimaEspecie,pedidoDecimaPrimeraEspecie,
            pedidoDecimaSegundaEspecie, pedidoDecimaTerceraEspecie, pedidoDecimaCuartaEspecie, comentarioPedido,
            IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto,fechaRegistroPedido
            FROM tb_pedidos
            INNER JOIN tb_clientes on tb_clientes.codigoCli = tb_pedidos.codigoCliPedidos
            WHERE estadoPedido = 1 and fechaRegistroPedido = ?
            ORDER BY nombreCompleto ASC',[$fechaTraerPedido]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_VerificarPedido(Request $request) {
        $selectedCodigoCliPedidos = $request->input('selectedCodigoCliPedidos');
        $fechaAgregarPedido = $request->input('fechaAgregarPedido');
    
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $pedidoExistente = DB::table('tb_pedidos')
                ->where('codigoCliPedidos', $selectedCodigoCliPedidos)
                ->where('fechaRegistroPedido', $fechaAgregarPedido)
                ->where('estadoPedido', 1)
                ->exists();
    
            // Devuelve true si el pedido existe, false de lo contrario
            return response()->json(['existePedido' => $pedidoExistente]);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarActualizarPedido(Request $request) {
        $fechaPedido = $request->input('fechaPedido');
        $codigoCli = $request->input('codigoCli');
        $columnaPedido = $request->input('columnaPedido');
        $nuevoValor = $request->input('nuevoContenido');
    
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $pedidoExistente = DB::table('tb_pedidos')
                ->where('codigoCliPedidos', $codigoCli)
                ->where('fechaRegistroPedido', $fechaPedido)
                ->where('estadoPedido', 1)
                ->exists();

            if (!$pedidoExistente) {
                $agregarPedido = new AgregarPedido;
                $agregarPedido->codigoCliPedidos = $codigoCli;
                $agregarPedido->pedidoPrimerEspecie = 0;
                $agregarPedido->pedidoSegundaEspecie = 0;
                $agregarPedido->pedidoTercerEspecie = 0;
                $agregarPedido->pedidoCuartaEspecie = 0;
                $agregarPedido->pedidoQuintaEspecie = 0;
                $agregarPedido->pedidoSextaEspecie = 0;
                $agregarPedido->pedidoSeptimaEspecie = 0;
                $agregarPedido->pedidoOctavaEspecie = 0;
                $agregarPedido->pedidoNovenaEspecie = 0;
                $agregarPedido->pedidoDecimaEspecie = 0;
                $agregarPedido->pedidoDecimaPrimeraEspecie = 0;
                $agregarPedido->pedidoDecimaSegundaEspecie = 0;
                $agregarPedido->pedidoDecimaTerceraEspecie = 0;
                $agregarPedido->pedidoDecimaCuartaEspecie = 0;
                $agregarPedido->comentarioPedido = "";
                $agregarPedido->fechaRegistroPedido = $fechaPedido;
                $agregarPedido->estadoPedido = 1;
                $agregarPedido->save();
            }
            
            switch ($columnaPedido) {
                case 1:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoPrimerEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 2:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoSegundaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 3:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoTercerEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 4:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoCuartaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 5:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoQuintaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 6:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoSextaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 7:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoSeptimaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 8:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoOctavaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 9:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoNovenaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 10:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoDecimaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 11:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoDecimaPrimeraEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 12:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoDecimaSegundaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 13:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoDecimaTerceraEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;
                case 14:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['pedidoDecimaCuartaEspecie' => $nuevoValor === null ? 0 : $nuevoValor]);
                    break;     
                case 15:
                    AgregarPedido::where('codigoCliPedidos', $codigoCli)
                    ->where('fechaRegistroPedido', $fechaPedido)
                        ->update(['comentarioPedido' => $nuevoValor]);
                    break;        
                default:
                    return response()->json(['error' => 'Número de especie inválido'], 400);
            }

            return response()->json(['success' => true], 200);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
    
}

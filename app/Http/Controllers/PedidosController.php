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

    public function consulta_TraerPedidosClientes(Request $request ){

        $fechaBuscarPedidos = $request->input('fechaBuscarPedidos');

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
            ORDER BY nombreCompleto ASC',[$fechaBuscarPedidos]);

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
    
}

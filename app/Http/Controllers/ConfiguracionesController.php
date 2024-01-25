<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPagoCliente\TraerClientesAgregarPagoCliente;
use App\Models\Configuraciones\AgregarPedidoCliente;

class ConfiguracionesController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('configuraciones');
        }
        return redirect('/login');
    }

    public function consulta_TraerClientesPedidos(Request $request){

        $nombreRegistrarPedidoCliente = $request->input('inputRegistrarPedido');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesAgregarPagoCliente::select('idCliente', 'codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=','1')
                ->where('idEstadoCli','=','1')
                ->where(function($query) use ($nombreRegistrarPedidoCliente) {
                    $query->where('nombresCli', 'LIKE', "%$nombreRegistrarPedidoCliente%")
                        ->orWhere('apellidoPaternoCli', 'LIKE', "%$nombreRegistrarPedidoCliente%")
                        ->orWhere('apellidoMaternoCli', 'LIKE', "%$nombreRegistrarPedidoCliente%");
                })
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EspeciesPedido (){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT idEspecie, nombreEspecie
                FROM tb_especies_venta where 
                idEspecie != 9 and idEspecie != 10
                and idEspecie != 11 and idEspecie != 13
                and idEspecie != 12 and idEspecie != 14
                and idEspecie != 15 and idEspecie != 8');
            
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerListaPedidos (){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT idPedido,codigoCliPedidos,pedidoPrimerEspecie,pedidoSegundaEspecie,
            pedidoTercerEspecie,pedidoCuartaEspecie,pedidoQuintaEspecie,pedidoSextaEspecie,
            pedidoSeptimaEspecie,pedidoOctavaEspecie,pedidoNovenaEspecie,pedidoDecimaEspecie,
            IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_pedidos
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pedidos.codigoCliPedidos WHERE estadoPedido = 1');
            
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarPedidosClientes(Request $request){

        $idRegistrarPedidoCliente = $request->input('idRegistrarPedidoCliente');
        $fechaProgramacionPedidosModal = $request->input('fechaProgramacionPedidosModal');
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
    
        if (Auth::check()) {
            // Busca un registro existente con la fecha y código proporcionados
            $pedidoExistente = AgregarPedidoCliente::where('codigoCliPedidos', $idRegistrarPedidoCliente)
                ->where('fechaRegistroPedido', $fechaProgramacionPedidosModal)
                ->first();
    
            if ($pedidoExistente) {
                // Actualiza el registro existente
                $pedidoExistente->update([
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
                ]);
            } else {
                // Crea un nuevo registro si no existe uno con la fecha y código proporcionados
                $agregarPedidoCliente = new AgregarPedidoCliente;
                $agregarPedidoCliente->codigoCliPedidos = $idRegistrarPedidoCliente;
                $agregarPedidoCliente->fechaRegistroPedido = $fechaProgramacionPedidosModal;
                $agregarPedidoCliente->pedidoPrimerEspecie = $primerEspecie === null ? 0 : $primerEspecie;
                $agregarPedidoCliente->pedidoSegundaEspecie = $segundaEspecie === null ? 0 : $segundaEspecie;
                $agregarPedidoCliente->pedidoTercerEspecie = $terceraEspecie === null ? 0 : $terceraEspecie;
                $agregarPedidoCliente->pedidoCuartaEspecie = $cuartaEspecie === null ? 0 : $cuartaEspecie;
                $agregarPedidoCliente->pedidoQuintaEspecie = $quintaEspecie === null ? 0 : $quintaEspecie;
                $agregarPedidoCliente->pedidoSextaEspecie = $sextaEspecie === null ? 0 : $sextaEspecie;
                $agregarPedidoCliente->pedidoSeptimaEspecie = $septimaEspecie === null ? 0 : $septimaEspecie;
                $agregarPedidoCliente->pedidoOctavaEspecie = $octavaEspecie === null ? 0 : $octavaEspecie;
                $agregarPedidoCliente->pedidoNovenaEspecie = $novenaEspecie === null ? 0 : $novenaEspecie;
                $agregarPedidoCliente->pedidoDecimaEspecie = $decimaEspecie === null ? 0 : $decimaEspecie;
                $agregarPedidoCliente->save();
            }
    
            return response()->json(['success' => true], 200);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }    

}

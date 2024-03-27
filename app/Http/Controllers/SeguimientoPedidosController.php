<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SeguimientoPedidosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('seguimiento_pedidos');
        }
        return redirect('/login');
    }

    public function consulta_TraerPedidosSeguimientoClientes(Request $request ){

        $fechaBuscarPedidos = $request->input('fechaBuscarPedidos');
    
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto,
                idPedido,
                codigoCliPedidos,
                SUM(CASE WHEN tb_pesadas.idEspecie = 1 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadPrimerEspecie,
                SUM(CASE WHEN tb_pesadas.idEspecie = 2 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadSegundaEspecie,
                SUM(CASE WHEN tb_pesadas.idEspecie = 3 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadTerceraEspecie,
                SUM(CASE WHEN tb_pesadas.idEspecie = 4 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadCuartaEspecie,
                SUM(CASE WHEN tb_pesadas.idEspecie = 5 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadQuintaEspecie,
                SUM(CASE WHEN tb_pesadas.idEspecie = 6 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadSextaEspecie,
                SUM(CASE WHEN tb_pesadas.idEspecie = 7 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadSeptimaEspecie,
                SUM(CASE WHEN tb_pesadas.idEspecie = 16 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadOctavaEspecie,
                SUM(CASE WHEN tb_pesadas.idEspecie = 17 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadNovenaEspecie,
                SUM(CASE WHEN tb_pesadas.idEspecie = 18 THEN tb_pesadas.cantidadPes ELSE 0 END) AS sumaCantidadDecimaEspecie,
    
                SUM(CASE WHEN tb_pesadas2.idEspecie = 1 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadPrimerEspecieDos,
                SUM(CASE WHEN tb_pesadas2.idEspecie = 2 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadSegundaEspecieDos,
                SUM(CASE WHEN tb_pesadas2.idEspecie = 3 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadTerceraEspecieDos,
                SUM(CASE WHEN tb_pesadas2.idEspecie = 4 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadCuartaEspecieDos,
                SUM(CASE WHEN tb_pesadas2.idEspecie = 5 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadQuintaEspecieDos,
                SUM(CASE WHEN tb_pesadas2.idEspecie = 6 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadSextaEspecieDos,
                SUM(CASE WHEN tb_pesadas2.idEspecie = 7 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadSeptimaEspecieDos,
                SUM(CASE WHEN tb_pesadas2.idEspecie = 16 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadOctavaEspecieDos,
                SUM(CASE WHEN tb_pesadas2.idEspecie = 17 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadNovenaEspecieDos,
                SUM(CASE WHEN tb_pesadas2.idEspecie = 18 THEN tb_pesadas2.cantidadPes ELSE 0 END) AS sumaCantidadDecimaEspecieDos,
    
                MAX(tb_pedidos.fechaRegistroPedido) AS fechaRegistroPedido,
                MAX(tb_pedidos.estadoPedido) AS estadoPedido,
    
                tb_pedidos.pedidoPrimerEspecie AS cantidadPrimerEspecie,
                tb_pedidos.pedidoSegundaEspecie AS cantidadSegundaEspecie,
                tb_pedidos.pedidoTercerEspecie AS cantidadTerceraEspecie,
                tb_pedidos.pedidoCuartaEspecie AS cantidadCuartaEspecie,
                tb_pedidos.pedidoQuintaEspecie AS cantidadQuintaEspecie,
                tb_pedidos.pedidoSextaEspecie AS cantidadSextaEspecie,
                tb_pedidos.pedidoSeptimaEspecie AS cantidadSeptimaEspecie,
                tb_pedidos.pedidoOctavaEspecie AS cantidadOctavaEspecie,
                tb_pedidos.pedidoNovenaEspecie AS cantidadNovenaEspecie,
                tb_pedidos.pedidoDecimaEspecie AS cantidadDecimaEspecie              
    
            FROM tb_pedidos
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_pedidos.codigoCliPedidos
            LEFT JOIN tb_pesadas ON tb_pesadas.codigoCli = tb_pedidos.codigoCliPedidos
                                AND DATE(tb_pesadas.fechaRegistroPes) = DATE(tb_pedidos.fechaRegistroPedido)
                                AND tb_pesadas.estadoPes = 1
            LEFT JOIN tb_pesadas2 ON tb_pesadas2.codigoCli = tb_pedidos.codigoCliPedidos
                                    AND DATE(tb_pesadas2.fechaRegistroPes) = DATE(tb_pedidos.fechaRegistroPedido)
                                    AND tb_pesadas2.estadoPes = 1
            WHERE estadoPedido = 1 AND fechaRegistroPedido = ?
            GROUP BY idPedido, nombreCompleto, codigoCliPedidos, cantidadPrimerEspecie, cantidadSegundaEspecie, cantidadTerceraEspecie, 
            cantidadCuartaEspecie, cantidadQuintaEspecie, cantidadSextaEspecie, cantidadSeptimaEspecie, cantidadOctavaEspecie,
            cantidadNovenaEspecie, cantidadDecimaEspecie
            ORDER BY nombreCompleto ASC;
            ',[$fechaBuscarPedidos]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
    
}

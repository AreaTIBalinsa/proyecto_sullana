<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ComentariosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('comentarios');
        }
        return redirect('/login');
    }

    public function listarComentarios(Request $request) {

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');
    
        if (Auth::check()) {
            // Realiza la consulta a la base de datos con UNION de ambas tablas
            $datos = DB::select('
            SELECT 
                codCliente,
                comentario,
                fecha_comentario,
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_comentario_x_cliente
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_comentario_x_cliente.codCliente
            WHERE fecha_comentario BETWEEN ? AND ?
    
            UNION
    
            SELECT 
                codCliente,
                comentario,
                fecha_comentario,
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_comentario_x_cliente2
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_comentario_x_cliente2.codCliente
            WHERE fecha_comentario BETWEEN ? AND ?', [$fechaDesde, $fechaHasta, $fechaDesde, $fechaHasta]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, devuelve un error
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }    

}

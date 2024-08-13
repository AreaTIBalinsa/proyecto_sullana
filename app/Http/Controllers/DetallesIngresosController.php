<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\DetallesEgresos\AgregarCategoriasEgresos;
use App\Models\DetallesEgresos\AgregarDetalleEgreso;
use App\Models\DetallesEgresos\ActualizarDetalleEgreso;
use App\Models\DetallesEgresos\EliminarDetalleEgreso;
use Carbon\Carbon;

class DetallesIngresosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('detalles_egresos');
        }
        return redirect('/login');
    }

    public function consulta_CrearCategoria(Request $request){

        $nombreNuevaCategoria = $request->input('nombreNuevaCategoria');

        if (Auth::check()) {
            $agregarCategoriasEgresos = new AgregarCategoriasEgresos;
            $agregarCategoriasEgresos->nombre_category = $nombreNuevaCategoria;
            $agregarCategoriasEgresos->created_at = Carbon::now()->setTimezone('America/Lima')->toDateTimeString();
            $agregarCategoriasEgresos->updated_at = Carbon::now()->setTimezone('America/Lima')->toDateTimeString();
            $agregarCategoriasEgresos->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerTablasCategoriasEgresos(){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT id_category,nombre_category 
            FROM tb_categorias_egresos
            WHERE estadoCategory = 1');
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    } 

    public function consulta_TraerTablasDetallesEgresos(Request $request){

        $fecha = $request->input('fecha');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT 
                id_detalle,
                fecha_detalle,
                hora_detalle,
                uso_detalle_egreso,
                cantidad_detalles,
                precio_detalle,
                monto_detalle,
                observacion,
                tb_detalles_egresos.id_category,
                tb_categorias_egresos.nombre_category,
                campoExtra
            FROM tb_detalles_egresos
            LEFT JOIN tb_categorias_egresos ON tb_categorias_egresos.id_category = tb_detalles_egresos.id_category
            WHERE estadoDetalle = 1 AND fecha_detalle = ? ORDER BY id_detalle ASC',[$fecha]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    } 

    public function consulta_AgregarDetalleEgreso (Request $request){

        $fechaDetalle = $request->input('fechaDetalle');
        $horaDetalle = $request->input('horaDetalle');
        $usoEgreso = $request->input('usoEgreso');
        $cantidadDetalle = $request->input('cantidadDetalle');
        $precioDetalle = $request->input('precioDetalle');
        $montoDetalle = $request->input('montoDetalle');
        $observacionDetalle = $request->input('observacionDetalle');
        $categoriaDetalle = $request->input('categoriaDetalle');
        $cargoPlanilla = $request->input('cargoPlanilla');

        if (Auth::check()) {
            $agregarDetalleEgreso = new AgregarDetalleEgreso;
            $agregarDetalleEgreso->fecha_detalle = $fechaDetalle;
            $agregarDetalleEgreso->hora_detalle = $horaDetalle;
            $agregarDetalleEgreso->uso_detalle_egreso = $usoEgreso;
            $agregarDetalleEgreso->cantidad_detalles = $cantidadDetalle;
            $agregarDetalleEgreso->precio_detalle = $precioDetalle;
            $agregarDetalleEgreso->monto_detalle = $montoDetalle;
            $agregarDetalleEgreso->observacion = $observacionDetalle;
            $agregarDetalleEgreso->id_category = $categoriaDetalle;
            $agregarDetalleEgreso->estadoDetalle = 1;
            $agregarDetalleEgreso->created_at = Carbon::now()->setTimezone('America/Lima')->toDateTimeString();
            $agregarDetalleEgreso->updated_at = Carbon::now()->setTimezone('America/Lima')->toDateTimeString();
            $agregarDetalleEgreso->campoExtra = $cargoPlanilla;
            $agregarDetalleEgreso->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarDetalleEgreso (Request $request){

        $idDetalleEgreso = $request->input('idDetalleEgreso');

        if (Auth::check()) {
            $eliminarDetalleEgreso = new EliminarDetalleEgreso;
            $eliminarDetalleEgreso->where('id_detalle', $idDetalleEgreso)
                ->update([
                    'estadoDetalle' => 0,
                    'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(),
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarDetalleEgresoEditar (Request $request){

        $idDetalleEgreso = $request->input('idDetalleEgreso');
        $fechaDetalle = $request->input('fechaDetalle');
        $horaDetalle = $request->input('horaDetalle');
        $usoEgreso = $request->input('usoEgreso');
        $cantidadDetalle = $request->input('cantidadDetalle');
        $precioDetalle = $request->input('precioDetalle');
        $montoDetalle = $request->input('montoDetalle');
        $observacionDetalle = $request->input('observacionDetalle');
        $categoriaDetalle = $request->input('categoriaDetalle');
        $selectEditarEgresoPlanilla = $request->input('selectEditarEgresoPlanilla');

        if (Auth::check()) {
            $actualizarDetalleEgreso = new ActualizarDetalleEgreso;
            $actualizarDetalleEgreso->where('id_detalle', $idDetalleEgreso)
                ->update([
                    'fecha_detalle' => $fechaDetalle,
                    'hora_detalle' => $horaDetalle,
                    'uso_detalle_egreso' => $usoEgreso,
                    'cantidad_detalles' => $cantidadDetalle,
                    'precio_detalle' => $precioDetalle,
                    'monto_detalle' => $montoDetalle,
                    'observacion' => $observacionDetalle,
                    'id_category' => $categoriaDetalle,
                    'campoExtra' => $selectEditarEgresoPlanilla,
                    'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(),
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDetallesEgresos(Request $request){

        $fechaDesde = $request->input('fechaDesde');
        $fechaHasta = $request->input('fechaHasta');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT
                d.id_detalle,
                d.fecha_detalle,
                d.hora_detalle,
                d.uso_detalle_egreso,
                d.cantidad_detalles,
                d.precio_detalle,
                d.monto_detalle,
                d.observacion,
                d.id_category,
                c.nombre_category,
                d.estadoDetalle,
                d.created_at,
                d.updated_at
            FROM (
                SELECT
                    id_detalle,
                    fecha_detalle,
                    hora_detalle,
                    uso_detalle_egreso,
                    cantidad_detalles,
                    precio_detalle,
                    CASE 
                        WHEN id_category = 0 THEN monto_detalle
                        ELSE SUM(monto_detalle) OVER (PARTITION BY id_category, fecha_detalle)
                    END AS monto_detalle,
                    observacion,
                    id_category,
                    estadoDetalle,
                    created_at,
                    updated_at,
                    ROW_NUMBER() OVER (PARTITION BY id_category, fecha_detalle ORDER BY id_detalle) AS rn
                FROM tb_detalles_egresos
                WHERE fecha_detalle BETWEEN ? AND ? AND estadoDetalle = 1
            ) AS d
            LEFT JOIN tb_categorias_egresos c ON c.id_category = d.id_category
            WHERE d.id_category = 0 OR d.rn = 1
            ORDER BY d.fecha_detalle ASC, d.id_detalle ASC
            ',[$fechaDesde,$fechaHasta]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    } 

    public function consulta_TraerModalDetallesEgresos(Request $request){

        $fecha = $request->input('fecha');
        $categoria = $request->input('categoria');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT 
                id_detalle,
                fecha_detalle,
                hora_detalle,
                uso_detalle_egreso,
                cantidad_detalles,
                precio_detalle,
                monto_detalle,
                observacion,
                tb_detalles_egresos.id_category,
                tb_categorias_egresos.nombre_category
            FROM tb_detalles_egresos
            LEFT JOIN tb_categorias_egresos ON tb_categorias_egresos.id_category = tb_detalles_egresos.id_category
            WHERE estadoDetalle = 1 AND fecha_detalle = ? AND tb_detalles_egresos.id_category = ?',[$fecha,$categoria]);
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    } 
}
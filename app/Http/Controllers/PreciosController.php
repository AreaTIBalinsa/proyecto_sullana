<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Precios\ActualizarPreciosXPresentacion;
use App\Models\Precios\TraerGruposPrecios;
use App\Models\Precios\ActualizarPreciosMinimos;

class PreciosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('precios');
        }
        return redirect('/login');
    }

    public function consulta_TraerPreciosXPresentacion(Request $request){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT tb_precio_x_presentacion.idPrecio, 
            tb_precio_x_presentacion.codigoCli, 
            tb_precio_x_presentacion.primerEspecie,
            tb_precio_x_presentacion.segundaEspecie,
            tb_precio_x_presentacion.terceraEspecie,
            tb_precio_x_presentacion.cuartaEspecie,
            tb_precio_x_presentacion.quintaEspecie,
            tb_precio_x_presentacion.sextaEspecie,
            tb_precio_x_presentacion.septimaEspecie,
            tb_precio_x_presentacion.octavaEspecie,
            tb_precio_x_presentacion.novenaEspecie,
            tb_precio_x_presentacion.decimaEspecie,
            tb_precio_x_presentacion.decimaPrimeraEspecie,
            tb_precio_x_presentacion.decimaSegundaEspecie,
            tb_precio_x_presentacion.decimaTerceraEspecie,
            tb_precio_x_presentacion.decimaCuartaEspecie,
            tb_precio_x_presentacion.decimaQuintaOtrasEspecies,
            tb_precio_x_presentacion.decimaSextaEspecie,
            tb_precio_x_presentacion.decimaSeptimaEspecie,
            tb_precio_x_presentacion.decimaOctavaEspecie,
            tb_precio_x_presentacion.decimaNovenaEspecie,
            tb_precio_x_presentacion.vigesimaEspecie,
            tb_precio_x_presentacion.vigesimaPrimeraEspecie,
            tb_precio_x_presentacion.vigesimaSegundaEspecie,
            tb_precio_x_presentacion.vigesimaTerceraEspecie,
            IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_precio_x_presentacion
            INNER JOIN tb_clientes ON tb_clientes.codigoCli = tb_precio_x_presentacion.codigoCli 
            WHERE tb_clientes.idEstadoCli = 1 and tb_clientes.estadoEliminadoCli != 0 ORDER BY nombreCompleto ASC');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPrecioXPresentacion(Request $request){

        $idClienteActualizarPrecioXPresentacion = $request->input('idClienteActualizarPrecioXPresentacion');
        $valorActualizarPrecioXPresentacion = $request->input('valorActualizarPrecioXPresentacion');
        $numeroEspeciePrecioXPresentacion = $request->input('numeroEspeciePrecioXPresentacion');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            switch ($numeroEspeciePrecioXPresentacion) {
                case 1:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['primerEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 2:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['segundaEspecie' => $valorActualizarPrecioXPresentacion,
                                    'decimaSeptimaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 3:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['terceraEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 4:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['cuartaEspecie' => $valorActualizarPrecioXPresentacion,
                                    'decimaOctavaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 5:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['quintaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 6:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['sextaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 7:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['septimaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 8:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['octavaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 9:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 10:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaPrimeraEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 11:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaSegundaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 12:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaTerceraEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 13:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaCuartaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;
                case 14:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaQuintaOtrasEspecies' => $valorActualizarPrecioXPresentacion]);
                    break;     
                case 15:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaSextaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;     
                case 16:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaSeptimaEspecie' => $valorActualizarPrecioXPresentacion,
                                    'segundaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;     
                case 17:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaOctavaEspecie' => $valorActualizarPrecioXPresentacion,
                                    'cuartaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;     
                case 18:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaNovenaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;     
                case 19:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['vigesimaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;     
                case 20:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['vigesimaPrimeraEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;     
                case 21:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['vigesimaSegundaEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;     
                case 22:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['vigesimaTerceraEspecie' => $valorActualizarPrecioXPresentacion]);
                    break;     
                default:
                    return response()->json(['error' => 'Número de especie inválido'], 400);
            }

            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerGruposPrecios(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerGruposPrecios::select('idGrupo', 'nombreGrupo')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerPreciosMinimos(Request $request){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT idPrecioMinimo,
                    precioMinimo,
                    nombreEspeciePrecioMinimo
                    FROM tb_precios_minimos ORDER BY idPrecioMinimo ASC');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarPrecioMinimo(Request $request)
    {
        $idEspecie = $request->input('idEspecie');
        $precio = $request->input('precio');

        if (Auth::check()) {
            ActualizarPreciosMinimos::where('idPrecioMinimo', $idEspecie)
            ->update(['precioMinimo' => $precio]);
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_AgregarNuevoPrecioPollo(Request $request){

        $idCodigoCliente = $request->input('idCodigoCliente');
        $resultadoEspecieUno = $request->input('resultadoEspecieUno');
        $resultadoEspecieDos = $request->input('resultadoEspecieDos');
        $resultadoEspecieTres = $request->input('resultadoEspecieTres');
        $resultadoEspecieCuatro = $request->input('resultadoEspecieCuatro');
        $resultadoEspecieCinco = $request->input('resultadoEspecieCinco');
        $resultadoEspecieSeis = $request->input('resultadoEspecieSeis');
        $resultadoEspecieSiete = $request->input('resultadoEspecieSiete');
        $resultadoEspecieOcho = $request->input('resultadoEspecieOcho');
        $resultadoEspecieNueve = $request->input('resultadoEspecieNueve');
        $resultadoEspecieDiez = $request->input('resultadoEspecieDiez');
        $resultadoEspecieOnce = $request->input('resultadoEspecieOnce');
        $resultadoEspecieDoce = $request->input('resultadoEspecieDoce');
        $resultadoEspecieTrece = $request->input('resultadoEspecieTrece');
        $resultadoEspecieCatorce = $request->input('resultadoEspecieCatorce');
        $resultadoEspecieQuince = $request->input('resultadoEspecieQuince');
        $resultadoEspecieDieciseis = $request->input('resultadoEspecieDieciseis');
        $resultadoEspecieDiecisiete = $request->input('resultadoEspecieDiecisiete');
        $resultadoEspecieDieciocho = $request->input('resultadoEspecieDieciocho');
        $resultadoEspecieDiecinueve = $request->input('resultadoEspecieDiecinueve');
        $resultadoEspecieVeinte = $request->input('resultadoEspecieVeinte');
        $resultadoEspecieVeinteUno = $request->input('resultadoEspecieVeinteUno');
        $resultadoEspecieVeinteDos = $request->input('resultadoEspecieVeinteDos');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            ActualizarPreciosXPresentacion::where('idPrecio', $idCodigoCliente)
                ->update(['primerEspecie' => $resultadoEspecieUno,
                'segundaEspecie' => $resultadoEspecieDos,
                'terceraEspecie' => $resultadoEspecieTres,
                'cuartaEspecie' => $resultadoEspecieCuatro,
                'quintaEspecie' => $resultadoEspecieCinco,
                'sextaEspecie' => $resultadoEspecieSeis,
                'septimaEspecie' => $resultadoEspecieSiete,
                'octavaEspecie' => $resultadoEspecieOcho,
                'novenaEspecie' => $resultadoEspecieNueve,
                'decimaPrimeraEspecie' => $resultadoEspecieDiez,
                'decimaSegundaEspecie' => $resultadoEspecieOnce,
                'decimaTerceraEspecie' => $resultadoEspecieDoce,
                'decimaCuartaEspecie' => $resultadoEspecieTrece,
                'decimaQuintaOtrasEspecies' => $resultadoEspecieCatorce,
                'decimaSextaEspecie' => $resultadoEspecieQuince,
                'decimaSeptimaEspecie' => $resultadoEspecieDieciseis,
                'decimaOctavaEspecie' => $resultadoEspecieDiecisiete,
                'decimaNovenaEspecie' => $resultadoEspecieDieciocho,
                'vigesimaEspecie' => $resultadoEspecieDiecinueve,
                'vigesimaPrimeraEspecie' => $resultadoEspecieVeinte,
                'vigesimaSegundaEspecie' => $resultadoEspecieVeinteUno,
                'vigesimaTerceraEspecie' => $resultadoEspecieVeinteDos]);
                
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}
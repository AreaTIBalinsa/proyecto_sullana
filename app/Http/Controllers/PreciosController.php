<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Precios\ActualizarPreciosXPresentacion;
use App\Models\Precios\TraerGruposPrecios;
use App\Models\Precios\ActualizarPreciosMinimos;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class PreciosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('precios');
        }
        return redirect('/login');
    }

    public function guardarPrecios(Request $request)
    {
        // Obtener los datos enviados desde la petición
        $data = $request->input('data');

        // Crear el nombre del archivo con fecha y hora actuales
        $filename = 'precios_' . now()->format('Ymd_His') . '.json';

        // Guardar el archivo en la carpeta 'precios' dentro del almacenamiento local
        Storage::disk('local')->put('precios/' . $filename, $data);

        return response()->json(['message' => 'Archivo JSON guardado exitosamente']);
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
                tb_precio_x_presentacion.ultimaActualizacionUsuario,
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
        $valorActualizarPrecioXPresentacion1 = $request->input('valorActualizarPrecioXPresentacion');
        $valorActualizarPrecioXPresentacion = $valorActualizarPrecioXPresentacion1 === null ? 0 : $valorActualizarPrecioXPresentacion1;
        $numeroEspeciePrecioXPresentacion = $request->input('numeroEspeciePrecioXPresentacion');
        $ultimaActualizacionUsuario = $request->input('ultimaActualizacionUsuario');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            switch ($numeroEspeciePrecioXPresentacion) {
                case 1:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['primerEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 2:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['segundaEspecie' => $valorActualizarPrecioXPresentacion,
                                    'decimaSeptimaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 3:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['terceraEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 4:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['cuartaEspecie' => $valorActualizarPrecioXPresentacion,
                                    'decimaOctavaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 5:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['quintaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 6:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['sextaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 7:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['septimaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 8:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['octavaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 9:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 10:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaPrimeraEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 11:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaSegundaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 12:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaTerceraEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 13:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaCuartaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;
                case 14:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaQuintaOtrasEspecies' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;     
                case 15:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaSextaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;     
                case 16:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaSeptimaEspecie' => $valorActualizarPrecioXPresentacion,
                                    'segundaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;     
                case 17:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaOctavaEspecie' => $valorActualizarPrecioXPresentacion,
                                    'cuartaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;     
                case 18:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['decimaNovenaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;     
                case 19:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['vigesimaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;     
                case 20:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['vigesimaPrimeraEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;     
                case 21:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['vigesimaSegundaEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
                    break;     
                case 22:
                    ActualizarPreciosXPresentacion::where('idPrecio', $idClienteActualizarPrecioXPresentacion)
                        ->update(['vigesimaTerceraEspecie' => $valorActualizarPrecioXPresentacion, 'updated_at' => Carbon::now()->setTimezone('America/Lima')->toDateTimeString(), 'ultimaActualizacionUsuario' => $ultimaActualizacionUsuario]);
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

    public function consulta_AgregarNuevoPrecioPollo(Request $request)
    {
        $idCodigoCliente = $request->input('idCodigoCliente');
        $ultimaActualizacionUsuario = $request->input('ultimaActualizacionUsuario');
        
        // Los valores que recibes de la solicitud
        $nuevosValores = [
            'primerEspecie' => $request->input('resultadoEspecieUno'),
            'segundaEspecie' => $request->input('resultadoEspecieDos'),
            'terceraEspecie' => $request->input('resultadoEspecieTres'),
            'cuartaEspecie' => $request->input('resultadoEspecieCuatro'),
            'quintaEspecie' => $request->input('resultadoEspecieCinco'),
            'sextaEspecie' => $request->input('resultadoEspecieSeis'),
            'septimaEspecie' => $request->input('resultadoEspecieSiete'),
            'octavaEspecie' => $request->input('resultadoEspecieOcho'),
            'decimaEspecie' => $request->input('resultadoEspecieNueve'),
            'decimaPrimeraEspecie' => $request->input('resultadoEspecieDiez'),
            'decimaSegundaEspecie' => $request->input('resultadoEspecieOnce'),
            'decimaTerceraEspecie' => $request->input('resultadoEspecieDoce'),
            'decimaCuartaEspecie' => $request->input('resultadoEspecieTrece'),
            'decimaQuintaOtrasEspecies' => $request->input('resultadoEspecieCatorce'),
            'decimaSextaEspecie' => $request->input('resultadoEspecieQuince'),
            'decimaSeptimaEspecie' => $request->input('resultadoEspecieDieciseis'),
            'decimaOctavaEspecie' => $request->input('resultadoEspecieDiecisiete'),
            'decimaNovenaEspecie' => $request->input('resultadoEspecieDieciocho'),
            'vigesimaEspecie' => $request->input('resultadoEspecieDiecinueve'),
            'vigesimaPrimeraEspecie' => $request->input('resultadoEspecieVeinte'),
            'vigesimaSegundaEspecie' => $request->input('resultadoEspecieVeinteUno'),
            'vigesimaTerceraEspecie' => $request->input('resultadoEspecieVeinteDos'),
        ];
        
        if (Auth::check()) {
            // Obtener los valores actuales de la base de datos
            $valoresActuales = ActualizarPreciosXPresentacion::where('idPrecio', $idCodigoCliente)->first();

            if (!$valoresActuales) {
                return response()->json(['error' => 'Registro no encontrado'], 404);
            }

            // Crear un array para los valores sumados
            $valoresSumados = [];

            foreach ($nuevosValores as $key => $nuevoValor) {
                // Convertir valores a float antes de sumarlos
                $valorActual = (float) $valoresActuales->$key;
                $valorNuevo = (float) $nuevoValor;

                // Sumar el valor nuevo al valor actual
                $valoresSumados[$key] = $valorActual + $valorNuevo;
            }

            // Agregar updated_at con la hora actual
            $valoresSumados['updated_at'] = Carbon::now()->setTimezone('America/Lima')->toDateTimeString();
            $valoresSumados['ultimaActualizacionUsuario'] = $ultimaActualizacionUsuario;

            // Actualizar la base de datos con los nuevos valores sumados
            ActualizarPreciosXPresentacion::where('idPrecio', $idCodigoCliente)
                ->update($valoresSumados);

            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, devolver un error
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\RegistrarClientes\TraerGrupos;
use App\Models\RegistrarClientes\TraerZonas;
use App\Models\RegistrarClientes\TraerCodigoCli;
use App\Models\RegistrarClientes\TraerDocumentos;
use App\Models\RegistrarClientes\RegistrarCliente;
use App\Models\RegistrarClientes\PrecioXPresentacion;

class RegistrarClientesController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('registrar_clientes');
        }
        return redirect('/login');
    }

    public function consulta_TraerGrupos(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerGrupos::select('idGrupo', 'nombreGrupo')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerZonas(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerZonas::select('idZona', 'nombreZon')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerDocumentos(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerDocumentos::select('idTipoDocumento', 'nombreTipoDocumento')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerCodigoCli(Request $request)
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos para obtener el último código diferente de 99999
            $ultimoCodigoCli = TraerCodigoCli::select('codigoCli')
                ->where('codigoCli', '<>', 99999)
                ->orderBy('idCliente', 'desc')
                ->limit(1)
                ->get();

            if (!$ultimoCodigoCli->isEmpty()) {
                // Devuelve el código encontrado en formato JSON
                return response()->json(['codigoCli' => $ultimoCodigoCli[0]->codigoCli]);
            } else {
                // Si no se encontró ningún código diferente de 99999, devuelve 0
                return response()->json(['codigoCli' => 0]);
            }
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarCliente(Request $request)
    {
        $apellidoPaternoCli = $request->input('apellidoPaternoCli');
        $apellidoMaternoCli = $request->input('apellidoMaternoCli');
        $nombresCli = $request->input('nombresCli');
        $tipoDocumentoCli = $request->input('tipoDocumentoCli');
        $documentoCli = $request->input('documentoCli');
        $contactoCli = $request->input('contactoCli');
        $direccionCli = $request->input('direccionCli');
        $estadoCli = $request->input('estadoCli');
        $usuarioRegistroCli = $request->input('usuarioRegistroCli');
        $codigoCli = $request->input('codigoCli');
        $idGrupo = $request->input('idGrupo');
        $comentarioCli = $request->input('comentarioCli');
        $zonaPollo = $request->input('zonaPollo');

        if (Auth::check()) {
            $registrarCliente = new RegistrarCliente;
            $registrarCliente->apellidoPaternoCli = $apellidoPaternoCli;
            $registrarCliente->apellidoMaternoCli = $apellidoMaternoCli;
            $registrarCliente->nombresCli = $nombresCli;
            $registrarCliente->tipoDocumentoCli = $tipoDocumentoCli;
            $registrarCliente->numDocumentoCli = $documentoCli;
            $registrarCliente->contactoCli = $contactoCli;
            $registrarCliente->direccionCli = $direccionCli;
            $registrarCliente->idEstadoCli = $estadoCli;
            $registrarCliente->fechaRegistroCli = now()->setTimezone('America/New_York')->toDateString();
            $registrarCliente->horaRegistroCli = now()->setTimezone('America/New_York')->toTimeString();
            $registrarCliente->usuarioRegistroCli = $usuarioRegistroCli;
            $registrarCliente->codigoCli = $codigoCli;
            $registrarCliente->idGrupo = $idGrupo;
            $registrarCliente->comentarioCli = $comentarioCli;
            $registrarCliente->idZona = $zonaPollo;
            $registrarCliente->estadoEliminadoCli = 1;
            $registrarCliente->save();
            
            $registrarPreciosXPresentacion = new PrecioXPresentacion;
            $registrarPreciosXPresentacion->codigoCli = $codigoCli;
            $registrarPreciosXPresentacion->primerEspecie = 10.00;
            $registrarPreciosXPresentacion->segundaEspecie = 10.00;
            $registrarPreciosXPresentacion->terceraEspecie = 10.00;
            $registrarPreciosXPresentacion->cuartaEspecie = 10.00;
            $registrarPreciosXPresentacion->valorConversionPrimerEspecie = 1.000;
            $registrarPreciosXPresentacion->valorConversionSegundaEspecie = 1.000;
            $registrarPreciosXPresentacion->valorConversionTerceraEspecie = 1.000;
            $registrarPreciosXPresentacion->valorConversionCuartaEspecie = 1.000;
            $registrarPreciosXPresentacion->save();
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ConsultarClientes\TraerGruposConsultarClientes;
use App\Models\ConsultarClientes\ActualizarCliente;
use App\Models\ConsultarClientes\EliminarCliente;
use App\Models\ConsultarClientes\ValorDeConversion;

class ConsultarClientesController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('consultar_clientes');
        }
        return redirect('/login');
    }

    public function consulta_ConsultarClientes(){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT idCliente,nombreTipoDocumento,numDocumentoCli,
                contactoCli,direccionCli,estadoCliente,
                fechaRegistroCli,horaRegistroCli,usuarioRegistroCli,
                codigoCli,idGrupo,comentarioCli,
                nombreZon,estadoEliminadoCli,
                IFNULL(CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli), "") AS nombreCompleto
            FROM tb_clientes 
            INNER JOIN tb_zonas on tb_zonas.idZona = tb_clientes.idZona 
            INNER JOIN tb_estados on tb_estados.idEstadoCli = tb_clientes.idEstadoCli
            INNER JOIN tb_tipo_documento on tb_tipo_documento.idTipoDocumento = tb_clientes.tipoDocumentoCli WHERE estadoEliminadoCli = 1 ORDER BY FIELD(tb_zonas.idZona,4,2,3,1),nombreCompleto ASC');

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerGruposConsultarClientes()
    {
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerGruposConsultarClientes::select('idGrupo', 'nombreGrupo')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_TraerConsultarClienteEditar(Request $request){

        $codigoCli = $request->input('codigoCli');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
                    SELECT idCliente,nombreTipoDocumento,numDocumentoCli,
                contactoCli,direccionCli,estadoCliente,tipoDocumentoCli,
                fechaRegistroCli,horaRegistroCli,usuarioRegistroCli,
                codigoCli,idGrupo,comentarioCli,
                estadoEliminadoCli,tb_clientes.idEstadoCli,idZona,
                IFNULL(CONCAT_WS(" ", nombresUsu, apellidoPaternoUsu, apellidoMaternoUsu), "") AS nombreCompletoUsu,
                nombresCli, apellidoPaternoCli, apellidoMaternoCli
            FROM tb_clientes
            INNER JOIN users on users.id = tb_clientes.usuarioRegistroCli
            INNER JOIN tb_estados on tb_estados.idEstadoCli = tb_clientes.idEstadoCli
            INNER JOIN tb_tipo_documento on tb_tipo_documento.idTipoDocumento = tb_clientes.tipoDocumentoCli
            WHERE codigoCli = ?',[$codigoCli]);

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarCliente(Request $request)
    {
        $apellidoPaternoCli = $request->input('apellidoPaternoCli');
        $apellidoMaternoCli = $request->input('apellidoMaternoCli');
        $nombresCli = $request->input('nombresCli');
        $tipoDocumentoCli = $request->input('tipoDocumentoCli');
        $documentoCli = $request->input('documentoCli');
        $contactoCli = $request->input('contactoCli');
        $direccionCli = $request->input('direccionCli');
        $estadoCli = $request->input('estadoCli');
        $codigoCli = $request->input('codigoCli');
        $idGrupo = $request->input('idGrupo');
        $comentarioCli = $request->input('comentarioCli');
        $zonaPollo = $request->input('zonaPollo');

        if (Auth::check()) {
            $ActualizarCliente = new ActualizarCliente;
            $ActualizarCliente->where('codigoCli', $codigoCli)
                ->update([
                    'apellidoPaternoCli' => $apellidoPaternoCli,
                    'apellidoMaternoCli' => $apellidoMaternoCli,
                    'nombresCli' => $nombresCli,
                    'tipoDocumentoCli' => $tipoDocumentoCli,
                    'numDocumentoCli' => $documentoCli,
                    'contactoCli' => $contactoCli,
                    'direccionCli' => $direccionCli,
                    'idEstadoCli' => $estadoCli,
                    'idGrupo' => $idGrupo,
                    'comentarioCli' => $comentarioCli,
                    'idZona' => $zonaPollo,
                ]);

            if ($idGrupo == 2){
                $ValorDeConversion = new ValorDeConversion;
                $ValorDeConversion->where('codigoCli', $codigoCli)
                ->update([
                    'valorConversionPrimerEspecie' => 1.000,
                    'valorConversionSegundaEspecie' => 1.000,
                    'valorConversionTerceraEspecie' => 1.000,
                    'valorConversionCuartaEspecie' => 1.000,
                ]);
            }
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_EliminarCliente(Request $request)
    {
        $codigoCli = $request->input('codigoCli');

        if (Auth::check()) {
            $EliminarCliente = new EliminarCliente;
            $EliminarCliente->where('codigoCli', $codigoCli)
                ->update([
                    'estadoEliminadoCli' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ConsultarUsuarios\ActualizarUsuario;
use App\Models\ConsultarUsuarios\ActualizarUsuarioExtra;
use App\Models\ConsultarUsuarios\ActualizarRolesUsuario;
use App\Models\ConsultarUsuarios\CrearRolesUsuario;
use App\Models\ConsultarUsuarios\EliminarUsuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ConsultarUsuariosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('consultar_usuarios');
        }
        return redirect('/login');
    }

    public function consulta_ConsultarUsuarios(){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT id,sexoUsu,dniUsu,
                celularUsu,direccionUsu,tipoUsu,
                rutaPerfilUsu,email,username,
                email_verified_at,password,remember_token,
                IFNULL(CONCAT_WS(" ", nombresUsu, apellidoPaternoUsu, apellidoMaternoUsu), "") AS nombreCompleto
            FROM users WHERE estadoUser = 1 and id != 1');
            
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ConsultarUsuariosEditar(Request $request){

        $codigoUsu = $request->input('codigoUsu');

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('
            SELECT id,sexoUsu,dniUsu,
                celularUsu,direccionUsu,tipoUsu,
                rutaPerfilUsu,email,username,
                email_verified_at,password,remember_token,
                nombresUsu, apellidoPaternoUsu, apellidoMaternoUsu
            FROM users WHERE id = ?',[$codigoUsu]);
            
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ConsultarRolesUsuariosEditar(Request $request){

        $codigoUsu = $request->input('codigoUsu');
    
        if (Auth::check()) {
            // Consulta para obtener todos los submenús
            $submenus = DB::table('tb_submenus')
                ->where('estadoSubMenu', 1)
                ->get();
    
            // Consulta para obtener las asignaciones específicas para un usuario
            $asignaciones = DB::table('tb_roles_de_usuario')
                ->join('tb_submenus', 'tb_roles_de_usuario.idSubMenu', '=', 'tb_submenus.idSubMenu')
                ->select('idRol', 'idUsuario', 'tb_roles_de_usuario.idMenu', 'tb_roles_de_usuario.idSubMenu', 'estadoRol', 'nombreSubMenu')
                ->where('idUsuario', $codigoUsu)
                ->get();
    
            // Combinar los resultados en un solo array
            $datos = [];
    
            foreach ($submenus as $submenu) {
                $asignacion = $asignaciones->where('idSubMenu', $submenu->idSubMenu)->first();
            
                if ($asignacion) {
                    $datos[] = [
                        'idRol' => $asignacion->idRol,
                        'idUsuario' => $asignacion->idUsuario,
                        'idMenu' => $asignacion->idMenu,
                        'idSubMenu' => $asignacion->idSubMenu,
                        'estadoRol' => $asignacion->estadoRol,
                        'nombreSubMenu' => $asignacion->nombreSubMenu,
                    ];
                } else {
                    // Si no hay asignación, se agrega un registro con valores predeterminados o nulos
                    $datos[] = [
                        'idRol' => 0,
                        'idUsuario' => 0,
                        'idMenu' => $submenu->idMenu,
                        'idSubMenu' => $submenu->idSubMenu,
                        'estadoRol' => 'no',
                        'nombreSubMenu' => $submenu->nombreSubMenu,
                    ];
                }
            }            
    
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }    

    public function consulta_ActualizarUsuario(Request $request)
    {
        $apellidoPaternoUsu = $request->input('apellidoPaternoUsu');
        $apellidoMaternoUsu = $request->input('apellidoMaternoUsu');
        $nombresUsu = $request->input('nombresUsu');
        $dniUsu = $request->input('dniUsu');
        $celularUsu = $request->input('celularUsu');
        $direccionUsu = $request->input('direccionUsu');
        $tipoUsu = $request->input('tipoUsu');
        $email = $request->input('email');
        $codigoUsu = $request->input('codigoUsu');
        $username = $request->input('username');
        $sexoUsu = $request->input('sexoUsu');

        if (Auth::check()) {
            $ActualizarUsuario = new ActualizarUsuario;
            $ActualizarUsuario->where('id', $codigoUsu)
                ->update([
                    'apellidoPaternoUsu' => $apellidoPaternoUsu,
                    'apellidoMaternoUsu' => $apellidoMaternoUsu,
                    'nombresUsu' => $nombresUsu,
                    'dniUsu' => $dniUsu,
                    'celularUsu' => $celularUsu,
                    'direccionUsu' => $direccionUsu,
                    'tipoUsu' => $tipoUsu,
                    'email' => $email,
                    'username' => $username,
                    'sexoUsu' => $sexoUsu,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_ActualizarUsuarioExtra(Request $request)
    {
        $apellidoPaternoUsu = $request->input('apellidoPaternoUsu');
        $apellidoMaternoUsu = $request->input('apellidoMaternoUsu');
        $nombresUsu = $request->input('nombresUsu');
        $dniUsu = $request->input('dniUsu');
        $celularUsu = $request->input('celularUsu');
        $direccionUsu = $request->input('direccionUsu');
        $tipoUsu = $request->input('tipoUsu');
        $email = $request->input('email');
        $codigoUsu = $request->input('codigoUsu');
        $username = $request->input('username');
        $sexoUsu = $request->input('sexoUsu');
        $password = Hash::make($request->input('password'));

        if (Auth::check()) {
            $ActualizarUsuario = new ActualizarUsuarioExtra;
            $ActualizarUsuario->where('id', $codigoUsu)
                ->update([
                    'apellidoPaternoUsu' => $apellidoPaternoUsu,
                    'apellidoMaternoUsu' => $apellidoMaternoUsu,
                    'nombresUsu' => $nombresUsu,
                    'dniUsu' => $dniUsu,
                    'celularUsu' => $celularUsu,
                    'direccionUsu' => $direccionUsu,
                    'tipoUsu' => $tipoUsu,
                    'email' => $email,
                    'username' => $username,
                    'sexoUsu' => $sexoUsu,
                    'password' => $password,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarUsuarioRolesEditar(Request $request){

        $idRol = $request->input('idRol');
        $idMenu = $request->input('idMenu');
        $idSubMenu = $request->input('idSubMenu');
        $estadoRol = $request->input('estadoRol');
        $usuarioRegistroCli = $request->input('usuarioRegistroCli');
    
        if (Auth::check()) {
            $existingRecord = ActualizarRolesUsuario::where('idRol', $idRol)
                ->where('idSubMenu', $idSubMenu)
                ->where('idUsuario', $usuarioRegistroCli)
                ->first();
    
            if ($existingRecord) {
                // Si existe un registro, actualízalo
                $existingRecord->update([
                    'idMenu' => $idMenu,
                    'idSubMenu' => $idSubMenu,
                    'estadoRol' => $estadoRol,
                ]);
            } else {
                // Si no existe un registro, crea uno nuevo
                CrearRolesUsuario::create([
                    'idMenu' => $idMenu,
                    'idSubMenu' => $idSubMenu,
                    'estadoRol' => $estadoRol,
                    'idUsuario' => $usuarioRegistroCli,
                ]);
            }
    
            return response()->json(['success' => true], 200);
        }
    
        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }    

    public function consulta_EliminarUsuario(Request $request)
    {
        $codigoUsuario = $request->input('codigoUsuario');

        if (Auth::check()) {
            $EliminarUsuario = new EliminarUsuario;
            $EliminarUsuario->where('id', $codigoUsuario)
                ->update([
                    'estadoUser' => 0,
                ]);
            
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

}
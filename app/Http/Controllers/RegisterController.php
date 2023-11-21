<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Register\RegistrarUsuario;
use App\Models\Register\RegistrarUsuarioRoles;

class RegisterController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('register');
        }
        return redirect('/login');
    }

    public function consulta_RegistrarUsuario(Request $request){

        $apellidoPaternoUsu = $request->input('apellidoPaternoUsu');
        $apellidoMaternoUsu = $request->input('apellidoMaternoUsu');
        $nombresUsu = $request->input('nombresUsu');
        $sexoUsu = $request->input('sexoUsu');
        $dniUsu = $request->input('dniUsu');
        $celularUsu = $request->input('celularUsu');
        $direccionUsu = $request->input('direccionUsu');
        $tipoUsu = $request->input('tipoUsu');
        $rutaPerfilUsu = $request->input('rutaPerfilUsu');
        $email = $request->input('email');
        $username = $request->input('username');
        $password = Hash::make($request->input('password'));

        if (Auth::check()) {
            $registrarUsuario = new RegistrarUsuario;
            $registrarUsuario->apellidoPaternoUsu = $apellidoPaternoUsu;
            $registrarUsuario->apellidoMaternoUsu = $apellidoMaternoUsu;
            $registrarUsuario->nombresUsu = $nombresUsu;
            $registrarUsuario->sexoUsu = $sexoUsu;
            $registrarUsuario->dniUsu = $dniUsu;
            $registrarUsuario->celularUsu = $celularUsu;
            $registrarUsuario->direccionUsu = $direccionUsu;
            $registrarUsuario->tipoUsu = $tipoUsu;
            $registrarUsuario->rutaPerfilUsu = $rutaPerfilUsu;
            $registrarUsuario->email = $email;
            $registrarUsuario->username = $username;
            $registrarUsuario->password = $password;
            $registrarUsuario->save();
            $idUsuario = $registrarUsuario->id;
    
            return response()->json(['success' => true, 'idUsuario' => $idUsuario], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RegistrarUsuarioRoles(Request $request){

        $idUsuario = $request->input('idUsuario');
        $idMenu = $request->input('idMenu');
        $idSubMenu = $request->input('idSubMenu');
        $estadoRol = $request->input('estadoRol');

        if (Auth::check()) {
            $registrarUsuarioRoles = new RegistrarUsuarioRoles;
            $registrarUsuarioRoles->idUsuario = $idUsuario;
            $registrarUsuarioRoles->idMenu = $idMenu;
            $registrarUsuarioRoles->idSubMenu = $idSubMenu;
            $registrarUsuarioRoles->estadoRol = $estadoRol;
            $registrarUsuarioRoles->save();
    
            return response()->json(['success' => true], 200);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    public function consulta_RolesUsuario(Request $request){
        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = DB::select('select idSubMenu,idMenu,nombreSubMenu,idNombreSubMenu,hrefSubMenu,iconHtml,estadoSubMenu FROM tb_submenus WHERE estadoSubMenu = 1');
            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use App\Models\AgregarPagoCliente\TraerClientesAgregarPagoCliente;
use Carbon\Carbon;

class LoginController extends Controller
{
    public function show(){
        if (Auth::check()){
            return redirect('/home');
        }
        return view('/login');
    }

    public function login(LoginRequest $request){
        $credentials = $request->getCredentials();
    
        if(!Auth::validate($credentials)){
            return redirect('/login')->withErrors('Credenciales no válidas')->withInput();
        }
    
        $user = Auth::getProvider()->retrieveByCredentials($credentials);
        Auth::login($user);
    
        return $this->authenticated($request, $user);
    }
    

    public function authenticated(Request $request, $user){
        return redirect()->to('/home');
    }

    public function logout(){
        Session::flush();

        Auth::logout();

        return redirect()->to('/login');
    }

    public function consulta_TraerClientes(){

        if (Auth::check()) {
            // Realiza la consulta a la base de datos
            $datos = TraerClientesAgregarPagoCliente::select('codigoCli',DB::raw('CONCAT_WS(" ", nombresCli, apellidoPaternoCli, apellidoMaternoCli) AS nombreCompleto'))
                ->where('estadoEliminadoCli','=','1')
                ->where('idEstadoCli','=','1')
                ->get();

            // Devuelve los datos en formato JSON
            return response()->json($datos);
        }

        // Si el usuario no está autenticado, puedes devolver un error o redirigirlo
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}

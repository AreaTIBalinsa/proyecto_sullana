<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Twilio\Rest\Client;

class CuentaClienteController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('cuenta_cliente');
        }
        return redirect('/login');
    }
}

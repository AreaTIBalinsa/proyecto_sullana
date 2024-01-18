<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CajaChicaController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('caja_chica');
        }
        return redirect('/login');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DetallesIngresosController extends Controller
{
    public function show(){
        if (Auth::check()){
            return view('detalles_ingresos');
        }
        return redirect('/login');
    }
}
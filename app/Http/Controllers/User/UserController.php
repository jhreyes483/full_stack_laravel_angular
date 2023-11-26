<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function pruebas(Request $request){
        return "accion de pruebas de USER-CONTROLLER";
    }

    public function register(Request $request){




        return "Acion de registro de usuario  $request->name";
    }

    public function login(Request $request){
        return "Accion login";
    }
}

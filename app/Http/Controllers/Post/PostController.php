<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function pruebas(Request $request){
        return "accion de pruebas de POST-CONTROLLER";
    }
}

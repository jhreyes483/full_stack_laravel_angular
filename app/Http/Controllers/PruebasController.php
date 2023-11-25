<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PruebasController extends Controller
{


    public function index(){
        $animales = ['perro', 'gato', 'tigre'];
        $titulo = 'animales';
        return view('pruebas.index', compact('animales','titulo'));
    }

}

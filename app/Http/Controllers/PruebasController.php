<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post; 
use App\Models\Category;

class PruebasController extends Controller
{

    public function index(){
        $animales = ['perro', 'gato', 'tigre'];
        $titulo = 'animales';
        return view('pruebas.index', compact('animales','titulo'));
    }

    public function testOrm(){
        $categories = Category::all();
        foreach($categories as $category){
            echo '<h1>'.$category->name.'</h1>';
            foreach($category->posts as $post){
                echo '<h5>'.$post->title.'</h5>';
            }
        }
    }
}

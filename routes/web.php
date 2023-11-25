<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pruebas/{nombre?}', function ($nombre=null) {
    $textto = '<h2>Texto desde una ruta</h2>';
    return $textto.$nombre;
});

Route::get('/pruebas2/{nombre?}', function ($nombre=null) {
    $textto = '<h2>Texto desde una ruta</h2>'.$nombre;
    return view('pruebas', [
        'texto'=>$textto
    ]);
});

Route::get('/animales','App\Http\Controllers\PruebasController@index');

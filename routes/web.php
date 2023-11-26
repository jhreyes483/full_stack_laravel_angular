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

/******RUTAS DE PRUEBA **************/
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
Route::get('/test-orm','App\Http\Controllers\PruebasController@testOrm');
/************************************** */


// RUTAS DE API
// Rutas de pruebas
Route::get('/usuario/pruebas', 'App\Http\Controllers\User\UserController@pruebas');
Route::get('/post/pruebas', 'App\Http\Controllers\Post\PostController@pruebas');
Route::get('/category/pruebas', 'App\Http\Controllers\Category\CategoryController@pruebas');


/* Metodos HTTP comunes

GET: Conseguir datos o recursos
POST: Guardar datos o recursos o hacer logica desde un formulario
PUT: Actualiza<r datos o recursos
DELETE: Eliminar datos o recursos

*/
Route::post('/api/register', 'App\Http\Controllers\User\UserController@register');
Route::post('/api/login', 'App\Http\Controllers\User\UserController@login');

Route::group(['prefix' => '/api/user', 'middleware' => ['auth-jwt']], function () {
    Route::put('/update', 'App\Http\Controllers\User\UserController@update');
    Route::post('/upload', 'App\Http\Controllers\User\UserController@upload');
    Route::post('/detail{id}', 'App\Http\Controllers\User\UserController@detail');
});

Route::get('api/user/avatar/{filename}', 'App\Http\Controllers\User\UserController@detail');


// genera todas las rutas automaticas category 
Route::resource('api/category', 'App\Http\Controllers\Category\CategoryController');

// genera todas las rutas automaticas post
Route::resource('api/post', 'App\Http\Controllers\Post\PostController');

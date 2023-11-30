<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Category;

class CategoryController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth-jwt', ['except' => ['index', 'show']]);
    }

    public function pruebas(Request $request)
    {
        return "accion de pruebas de CATEGORY-CONTROLLER";
    }


    public function store(Request $request)
    {
        $validate = $this->validateRequest($request, [
            'name'     => 'required|alpha',
        ]);

        if (!$validate['error']) {
            $category = new Category;
            $category->name = $request->name;
            $category->save();

            $data =  [
                'status'      => 'success',
                'code'        => 200,
                'msg'         => 'Categoria creada',
                'category'    => $category
            ];
        } else {

            $data =  [
                'status' => 'error',
                'code'  => 404,
                'msg'   => $validate['msg']
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function index()
    {
        $categories = Category::all();
        $data =  [
            'status'      => 'success',
            'code'        => 200,
            'msg'         => 'Categories',
            'categories'  => $categories
        ];
        return response()->json($data, $data['code']);
    }

    public function create()
    {
    }

    public function destroy()
    {
    }

    public function update($id, Request $request)
    {
        $validate  = $this->validateRequest($request, [
            'name'     => 'required|alpha',
        ]);

        if (!$validate['error']) {


            $category = new Category;
            $category = Category::find($id);
            $category->name = $request->name;
            $category->save();

            $data =  [
                'status'      => 'success',
                'code'        => 200,
                'msg'         => 'Categoria editada',
                'category'    => $category
            ];

        } else {

            $data =  [
                'status' => 'error',
                'code'  => 404,
                'msg'   => $validate['msg']
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $category = Category::find($id);
        if (is_object($category)) {
            $data = [
                'status'      => 'success',
                'code'        => 200,
                'msg'         => 'Categories',
                'category'    => $category
            ];
        } else {
            $data = [
                'status'      => 'error',
                'code'        => 400,
                'msg'         => 'La categoria no existe',
            ];
        }
        return response()->json($data, $data['code']);
    }

    public function edit()
    {
    }
}

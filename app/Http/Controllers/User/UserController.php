<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Helpers\SessionAuth;


class UserController extends Controller
{

    use SessionAuth;

    public function pruebas(Request $request)
    {
        return "accion de pruebas de USER-CONTROLLER";
    }

    public function register(Request $request)
    {
        $data =  [
            'status' => 'succcess',
            'code'  => 200,
            'msg'   => 'El usuario se ha creado correctamente'
        ];
        // validar datos
        $validate = $this->validateRequest($request, [
            'name'     => 'required|alpha'/* alfabetico */,
            'surname'  => 'required|alpha',
            'email'    => 'required|email|unique:users',
            'password' => 'required'
        ]);

        if ($validate['error']) {
            $data =  [
                'status' => 'error',
                'code'  => 404,
                'msg'   => $validate['msg'],
                'user'  => []
            ];
        }

        $password = md5($request->password);
        $user     = new User;

        $user->name     = $request->name;
        $user->surname  = $request->surname;
        $user->email    = $request->email;
        $user->password = $password;
        $user->role     = 'ROLE_USER';
        $user->save();

        $data['user'] = $user;
        return response()->json($data, $data['code']);
    }

    public function login(Request $request)
    {
        $JwtAuth = new \App\Helpers\JwtAuth();
        return $JwtAuth->signup($request->email, md5($request->password), 0);
    }

    public function update(Request $request)
    {


       // $JwtAuth    = new \App\Helpers\JwtAuth();

        $user     = $this->getUserAuth($request);
        $validate = $this->validateRequest($request, [
            'name'     => 'required|alpha',
            'surname'  => 'required|alpha',
            //'email'    => 'required|email|unique:users'
        ]);

        if ($validate['error']) {
            $data =  [
                'status' => 'error',
                'code'  => 404,
                'msg'   => $validate['msg'],
                'user'  => []
            ];
        }
        $user           = User::find($user->id);
        $user->name     = $request->name;
        $user->surname  = $request->surname;
        // $user->email    = $request->email;
        $user->save();

        $data =  [
            'status' => 'success',
            'code'  => 200,
            'msg'   => 'Usuario actualizado',
            'user'  => $user
        ];


        return response()->json($data, $data['code']);
    }

    public function upload(Request $request)
    {
        $validate = $this->validateRequest($request, [
            'file0'   => 'required|image|mimes:png,jpg,jpeg,gif',
        ]);

        if ($validate['error']) {
            return [
                'status' => 'error',
                'code'  => 404,
                'msg'   => $validate['msg'],
            ];
        }

        $image = $request->file('file0');

        if($image){
            $image_name = time().$image->getClientOriginalName();
            \Storage::disk('users')->put($image_name, \File::get($image));

            $data = [
                'image'  => $image_name,
                'status' => 'success',
                'code'   => 200
            ];
        }else{
            $data = [
                'code'   => 400,
                'status' => 'error',
                'msg'    => 'Error al subir imagen'
            ];
        }



        return response()->json($data, $data['code']);
    }

 
}

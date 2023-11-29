<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
            'status' => 'success',
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
            return  [
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
        return $JwtAuth->signup($request->email, md5($request->password), 1);
    }

    public function update(Request $request)
    {

        $user     = $this->getUserAuth($request);
               $validate = $this->validateRequest($request, [
            'name'        => 'required|alpha',
            'surname'     => 'required|alpha',
            'email'       => 'required'
        ]);

        if ($validate['error']) {
            return  [
                'status' => 'error',
                'code'  => 404,
                'msg'   => $validate['msg'],
                'user'  => []
            ];
        }
        $user           = User::find($user->id);
        $user->name     = $request->name;
        $user->surname  = $request->surname;
        $user->description = $request->description?? $user->description;
        $user->email    = $request->email;
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


            $user     = $this->getUserAuth($request);
            $user     = User::find($user->id);
            $user->image = $image_name;
            $user->save(); 



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


    public function getImage($filename){
        $isset = \Storage::disk('users')->exists($filename);
        if($isset){
            $file = \Storage::disk('users')->get($filename);
            return new Response($file, 200);
        }else{
            $data = [
                'code'   => 404,
                'status' => 'error',
                'msg'    => 'La imagen no existe'
            ];
            return response()->json($data, $data['code']);
        }
    }

    public function detail($id){
        $user = User::find($id);
        if(is_object($user)){
            $data = [
                'status' => 'success',
                'code'   => 200,
                'msg'    => 'datos users',
                'user'   => $user   
            ];
        }else{
            $data = [
                'status' => 'error',
                'code'   => 404,
                'msg'    => 'El usuario no existe'
            ];
        }
        return response()->json($data, $data['code']);
        

    }
 
}

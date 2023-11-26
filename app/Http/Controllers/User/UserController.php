<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;


class UserController extends Controller
{
    public function pruebas(Request $request){
        return "accion de pruebas de USER-CONTROLLER";
    }

    public function register(Request $request){
        $data =  [
            'status'=>'succcess',
            'code'  => 200,
            'msg'   => 'El usuario se ha creado correctamente'
        ];
        // validar datos
        $validate = $this->validateRequest($request,[
            'name'     => 'required|alpha'/* alfabetico */,
            'surname'  => 'required|alpha',
            'email'    => 'required|email|unique:users',
            'password' => 'required'
        ]);

        if($validate['error']){
            $data =  [
                'status'=>'error',
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

    public function login(Request $request){
        $JwtAuth = new \App\Helpers\JwtAuth();
        $email = 'victor@victor.com';
        $password = md5('password');
        return $JwtAuth->signup( $request->email, md5($request->password) ,0);
    }

    public function update(Request $request){
        $JwtAuth    = new \App\Helpers\JwtAuth();
        $token      = $request->header('Authorization');
        $checkToken = $JwtAuth->checkToken($token);

        if($checkToken){
            echo '<h1>Login correcto</h1>';
        }else{
            echo '<h1>Login incorrecto</h1>';
        }
        die();

    }


    public function validateRequest($request, $rules){
        $error = false;
        $msg    ='ok';

        $validator =Validator::make($request->all(), $rules,
        [
            'required'    => "El campo ':attribute' es requerido.",
            'required_if' => "El campo ':attribute' es requerido cuando el role_id es 26.",
            'numeric'     => "El campo ':attribute' debe ser de tipo númerico.",
            'date'        => "El campo ':attribute' debe ser de tipo fecha.",
            'min'         => "El campo ':attribute' debe ser mayor o igual a :min.",
            'date_format' => "El campo ':attribute' debe tener el formato YYYY-mm-dd.",
            'in'          => "El valor de ':attribute' no es válido"
        ]
        );
        if($validator->fails()){
           $error  = true;
           $msg    = array_values($validator->errors()->toArray())[0][0] ??'error request';
        }

        return compact('error','msg');
    }
}

<?php

namespace App\Helpers;

//use Firebase\JWT\JWT;

use Firebase\JWT\JWT;

use Illuminate\Support\Facades\DB;
use App\Models\User;

class JwtAuth
{

    public function __construct()
    {
        $this->key = 'clave secreta del token';
    }

    public $key;
    public function signup($email, $password, $getToken = false)
    {
        $data['status'] = true;
        $data['token']  = '';
        $data['msg']    = 'Usuario autenticado';
        $user = User::where([
            'email'    => $email,
            'password' => $password
        ])->first();

        if (is_object($user)) {
            $token = [
                'id'     => $user->id,
                'email'   => $user->email,
                'name'    => $user->name,
                'surname' => $user->surname,
                'iar'     => time(),
                'exp'     => time() + (7 * 24 * 60 * 60) /* caduca dentro de una semana el token */
            ];
            $jwt    = JWT::encode($token, $this->key, 'HS256');

            $data['token']   = $jwt;
            if ($getToken) {
                $data['name']    = $user->name;
                $data['surname'] = $user->surname;
                $data['email']   = $user->email;
                $data['id']      = $user->id;
            }
        } else {
            $data = [
                'status' => 'error',
                'msg'    => 'Login incorrecto'
            ];
        }

        return $data;
    }


    public function checkToken($jwt, $getIdentity = false)
    {
        try {
            $jwt     = str_replace('"', '', $jwt);
            $auth    = false;
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);
        } catch (\Throwable $th) {
            $auth = false;
            //throw $th;
        }

        if (!empty($decoded) && is_object($decoded) && isset($decoded->id /* Esta gurdado el id del usuario dentr del token */)) {
            $auth = true;
        } else {
            $auth = false;
        }

        if ($getIdentity) {
            return $decoded;
        }
        return $auth;
    }


    public function getUserAuth($request){
        $token      = $request->header('Authorization');
        return JWT::decode($token, $this->key, ['HS256']);
    }

    public function getKey(){
        return $this->key;
    }
}

<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
trait SessionAuth{

    public function getUserAuth($request){
        $JwtAuth    = new \App\Helpers\JwtAuth();
        $token      = $request->header('Authorization');
        return JWT::decode($token,  $JwtAuth->getKey(), ['HS256'])??NULL;
    }

}


?>
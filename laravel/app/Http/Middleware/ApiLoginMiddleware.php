<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiLoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $JwtAuth    = new \App\Helpers\JwtAuth();
        $token      = $request->header('Authorization');
        $checkToken = $JwtAuth->checkToken($token);
        if(!$checkToken){
            $data =  [
                'status'=>'error',
                'code'  => 400,
                'msg'   => 'Usuario no esta autenticado',
            ];
            return response()->json($data, $data['code']);
        }
        return $next($request);
    }
}

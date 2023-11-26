<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function validateRequest($request, $rules)
    {
        $error = false;
        $msg    = 'ok';

        $validator = Validator::make(
            $request->all(),
            $rules,
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
        if ($validator->fails()) {
            $error  = true;
            $msg    = array_values($validator->errors()->toArray())[0][0] ?? 'error request';
        }
        return compact('error', 'msg');
    }
}

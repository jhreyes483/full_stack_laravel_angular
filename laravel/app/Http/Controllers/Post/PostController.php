<?php

namespace App\Http\Controllers\Post;

use App\Helpers\SessionAuth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Http\Response;

class PostController extends Controller
{
    use SessionAuth;
    public function __construct()
    {
        $this->middleware(
            'auth-jwt', 
            [
                'except' => [
                    'index', 
                    'show',
                    'getPostByCategory',
                    'getPostByUser',
                    'getImage'
                    ]
                ]
            );
    }

    public function index()
    {
        $posts = Post::all()->Load('category');

        return response()->json([
            'code'   => 200,
            'status' => 'success',
            'msg'   => 'posts',
            'posts' => $posts
        ]);
    }

    public function show($id)
    {
        $post = Post::find($id);

        if (is_object($post)) {
            $data = [
                'code'   => 200,
                'status' => 'success',
                'msg'    => 'post',
                'post'   => $post->load('category')
                                 ->load('user')
            ];
        } else {
            $data = [
                'code'  => 404,
                'status'=> 'error',
                'msg'   => 'No existe  post',
                'post'  => $post
            ];
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {

        $validate = $this->validateRequest($request, [
            'title'       => 'required',
            'content'     => 'required',
            'category_id' => 'required|int',
            'image'       => 'required'
        ]);
        if (!$validate['error']) {
            $user = $this->getUserAuth($request);

            $post = new Post;
            $post->title       = $request->title;
            $post->content     = $request->content;
            $post->category_id = $request->category_id;
            $post->user_id     = $user->id;
            $post->image       = $request->image;
            $post->save();

            $data = [
                'code'   => 200,
                'status' => 'success',
                'msg'    => 'Gardo el post',
                'post'   =>  $post->load('category')
            ];

            return response()->json($data, $data['code']);
        } else {
            $data = [
                'code'  => 400,
                'status' => 'error',
                'msg'   => $validate['msg']
            ];
        }
        return response()->json($data, $data['code']);
    }

    public function update($id, Request $request)
    {
        $error     = false;
        $validate  = $this->validateRequest($request, [
            'title'       => 'required',
            'content'     => 'required',
            'category_id' => 'required|int'
        ]);

        if($validate['error']){
            $error = true;
            return [
                'status' => 'error',
                'code'   => 400,
                'msg'    => $validate['msg']
            ];
        }

        $user = $this->getUserAuth($request);
        $post = Post::find($id);

        if (!$error && ($post->user_id != $user->id)) {
            $error = true;
            $data  =  [
                'status' => 'error',
                'code'   => 400,
                'msg'    => 'No tiene pormisos para edita este post, solo el autor puede'
            ];
        }

        if (!$error) {
            $post->title       = $request->title;
            $post->content     = $request->content;
            $post->category_id = $request->category_id;
            $post->save();

            $data = [
                'code'   => 200,
                'status' => 'success',
                'msg'    => 'Edito el post',
                'post'   =>  $post->load('category')
            ];
        }

        return response()->json($data, $data['code']);
    }


    public function pruebas(Request $request)
    {
        return "accion de pruebas de POST-CONTROLLER";
    }

    public function destroy($id, Request $request)
    {

        $post    = Post::find($id);
        $user    = $this->getUserAuth($request);
        $error   = false;

        /*
        $post = Post::where('id',$id)
                    ->where('user_id', $user->id)
                    ->first();
        */

        if (empty($post)) {
            $error = true;
            $data  =  [
                'status' => 'error',
                'code'   => 404,
                'msg'    => 'El post no existe'
            ];
        }

        if (!$error && ($post->user_id != $user->id)) {
            $error = true;
            $data  =  [
                'status' => 'error',
                'code'   => 400,
                'msg'    => 'No tiene pormisos para eliminar este post, solo el autor puede'
            ];
        }

        if (!$error) {
            $post->delete();
            $data = [
                'code'   => 200,
                'status' => 'success',
                'msg'    => 'Elimino el registro',
                'post'   => $post
            ];
        }
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
                'code'  => 400,
                'msg'   => $validate['msg'],
            ];
        }

        $image = $request->file('file0');

        if($image){
            $image_name = time().$image->getClientOriginalName();
            \Storage::disk('images')->put($image_name, \File::get($image));

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
        $isset = \Storage::disk('images')->exists($filename);
        if($isset){
            $file = \Storage::disk('images')->get($filename);
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

    public function getPostByCategory($id){
        $posts = Post::where('category_id', $id)->get();
        return  response()->json( [
            'status' => 'success',
            'code'   => 200,
            'posts'  => $posts
        ], 200 );
    }

    public function getPostByUser($id){
        $posts  = Post::where('user_id', $id)->get();
        return  response()->json( [
            'status' => 'success',
            'code'   => 200,
            'posts'  => $posts
        ], 200 );
    }
}

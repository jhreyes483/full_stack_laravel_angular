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
        $this->middleware('auth-jwt', ['except' => ['index', 'show']]);
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
                'post'  => $post->load('category')
            ];
        } else {
            $data = [
                'code'  => 404,
                'status' => 'error',
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
            'category_id' => 'required|int'
        ]);
        if (!$validate['error']) {
            $user = $this->getUserAuth($request);

            $post = new Post;
            $post->title       = $request->title;
            $post->content     = $request->content;
            $post->category_id = $request->category_id;
            $post->user_id     = $user->id;
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
        $validate  = $this->validateRequest($request, [
            'title'       => 'required',
            'content'     => 'required',
            'category_id' => 'required|int'
        ]);
        if (!$validate['error']) {
            $post = new Post;
            $post->title       = $request->title;
            $post->content     = $request->content;
            $post->category_id = $request->category_id;
            $post->save();

            $data = [
                'code'   => 200,
                'status' => 'success',
                'msg'    => 'Guardo el post',
                'post'   =>  $post->load('category')
            ];
        } else {

            $data =  [
                'status' => 'error',
                'code'  => 400,
                'msg'   => $validate['msg']
            ];
        }
        return response()->json($data, $data['code']);
    }


    public function pruebas(Request $request)
    {
        return "accion de pruebas de POST-CONTROLLER";
    }

    public function destroy($id){
   
        $post = Post::find($id);
        if(!empty(  $post )){
            $post->delete();
            $data = [
                'code'   => 200,
                'status' => 'success',
                'msg'    => 'Elimino el registro',
                'post'   => $post
            ];
        }else{
            $data =  [
                'status' => 'error',
                'code'  => 404,
                'msg'   => 'El post no existe'
            ];
        }
     
        return response()->json($data, $data['code']);
    }
}

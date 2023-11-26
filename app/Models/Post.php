<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected  $table = 'posts';
    protected $fillable = [];


    // Relacion de uno a muchos inversa (muchos a uno)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // de uno a muchos inversa (muchos a uno)
    }

    // Relacion de uno a muchos inversa (muchos a uno)
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id'); // de uno a muchos inversa (muchos a uno)
    }
}

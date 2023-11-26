<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;


class Post extends Model
{
    use HasFactory;
    protected  $table = 'posts';
    protected $fillable = [];


    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    /**
     * Obtener la fecha de actualización en un formato específico.
     *
     * @return string
     */
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }



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

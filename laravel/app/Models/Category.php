<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;


class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [

    ];

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



    // Relacion de uno a muchos
    public function posts(){
       // return $this->hasMany('App\Post');
       return $this->hasMany(Post::class);
    }

}

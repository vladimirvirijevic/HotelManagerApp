<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'name', 'price', 'capacity'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }
}

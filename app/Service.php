<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name', 'price'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function tickets(){
        return $this->hasMany('App\Ticket');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'address', 'note'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function bookings() {
        return $this->belongsToMany('App\Booking');
    }
}

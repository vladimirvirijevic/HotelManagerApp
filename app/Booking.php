<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'startDate', 'endDate', 'price', 'status', 'note'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function client(){
        return $this->hasOne('App\Client');
    }

    public function room(){
        return $this->hasOne('App\Room');
    }
}

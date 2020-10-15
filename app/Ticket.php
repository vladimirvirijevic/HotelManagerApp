<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = ['name', 'internalUpdate', 'description', 'contributors'];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function users(){
        return $this->belongsToMany('App\User', 'contributors');
    }

    public function service(){
        return $this->belongsTo('App\Service');
    }

    public function setService(Service $service)
    {
        $this->service_id = $service->id;
    }
}

<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'hotel'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function rooms(){
        return $this->hasMany('App\Room');
    }

    public function clients(){
        return $this->hasMany('App\Client');
    }

    public function articles(){
        return $this->hasMany('App\Article');
    }

    public function services(){
        return $this->hasMany('App\Service');
    }

    public function bookings(){
        return $this->hasMany('App\Booking');
    }

    public function departments(){
        return $this->hasMany('App\Department');
    }

    public function units(){
        return $this->hasMany('App\Unit');
    }

    public function importedArticles(){
        return $this->hasMany('App\ImportedArticle');
    }

    public function tickets(){
        return $this->hasMany('App\Ticket');
    }

    public function ticketUpdates(){
        return $this->hasMany('App\TicketUpdate');
    }

    public function contributions(){
        return $this->belongsToMany('App\Ticket', 'contributors');
    }
}

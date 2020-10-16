<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeEntry extends Model
{
    protected $fillable = [
        'duration', 'startTime', 'endTime', 'contributor_id'
    ];

    public function ticketUpdate() {
        return $this->belongsTo('App\TicketUpdate');
    }
}

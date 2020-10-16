<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketUpdate extends Model
{
    protected $fillable = [
        'name', 'description', 'internalUpdate'
    ];

    public function ticket() {
        return $this->belongsTo('App\Ticket');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function timeEntries() {
        return $this->hasMany('App\TimeEntry');
    }

    public function setTicket(Ticket $ticket) {
        $this->ticket_id = $ticket->id;
    }
}

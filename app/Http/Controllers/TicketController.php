<?php

namespace App\Http\Controllers;

use App\Service;
use App\Ticket;

use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        $tickets = $user->tickets()->get();

        foreach($tickets as $ticket) {
            $ticket->service = Service::find($ticket->service_id);
            $ticket->owner = $user;
        }

        return response()->json(['message' => 'Success', 'tickets' => $tickets],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request)
    {
        $validator = $this->validateTicket();
        if($validator->fails()){
            return response()->json(['message' => $validator->messages(), 'data' => null],400);
        }

        $user = Auth::user();
        $ticket = new Ticket($validator->validate());
        $ticket->description = ($request->description != null) ? $request->description : "";
        $ticket->internalUpdate = ($request->internalUpdate != null) ? $request->internalUpdate : "";

        $service = Service::find($request->service);
        $ticket->setService($service);

        if($user->tickets()->save($ticket)){

            foreach ($request->contributors as $contributorId) {
                $contributor = User::find($contributorId);
                $ticket->users()->attach($contributor);
            }

            return response()->json(['message' => 'Ticket added', 'ticket' => $ticket],200);
        }

        return response()->json(['message' => 'Error Occured', 'ticket' => null],400);
    }

    public function validateTicket(){
        $user = Auth::user();
        return Validator::make(request()->all(), [
            'name' => 'required|string|unique:tickets,name,NULL,id,user_id,'. $user->id
        ]);
    }
}

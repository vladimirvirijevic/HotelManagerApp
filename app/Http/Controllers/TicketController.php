<?php

namespace App\Http\Controllers;

use App\Service;
use App\Ticket;

use App\TicketUpdate;
use App\TimeEntry;
use App\User;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class TicketController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

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
     * Get a resource
     *
     * @return JsonResponse
     */
    public function getById($id)
    {
        $ticket = Ticket::find($id);
        $ticket->owner = $ticket->user;
        $ticket->serviceName = $ticket->service->name;
        $ticket->contributors = $ticket->users;

        $ticket->updates = $ticket->updates()->get();

        foreach ($ticket->updates as $update) {
            $update->timeEntries = TimeEntry::where('ticket_update_id', $update->id)->get();
            $update->user = User::find($update->user_id);
        }

        foreach ($ticket->updates as $update) {
            foreach ($update->timeEntries as $timeEntry) {
                $timeEntry->user = User::find($timeEntry->contributor_id);
            }
        }

        return response()->json(['message' => 'Success', 'ticket' => $ticket],200);
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

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request)
    {
        $ticketUpdate = new TicketUpdate($request->toArray());
        $ticketUpdate->description = ($ticketUpdate->description != null) ? $ticketUpdate->description : "";
        $ticketUpdate->internalUpdate = ($ticketUpdate->internalUpdate != null) ? $ticketUpdate->internalUpdate : "";

        $ticket = Ticket::find($request->ticketId);

        $ticketUpdate->setTicket($ticket);
        $user = Auth::user();

        if ($user->ticketUpdates()->save($ticketUpdate)) {
            foreach ($request->contributors as $contributor) {
                $timeEntry = new TimeEntry($contributor);
                $ticketUpdate->timeEntries()->save($timeEntry);
            }

            return response()->json(['message' => 'Ticket Update created', 'ticketUpdate' => $ticketUpdate], 200);
        }

//        return response()->json(['message' => 'Ticket Update created', 'ticketUpdate' => $ticketUpdate], 200);
        return response()->json(['message' => 'Error Occured', 'ticketUpdate' => null],400);
    }

    public function validateTicket(){
        $user = Auth::user();
        return Validator::make(request()->all(), [
            'name' => 'required|string|unique:tickets,name,NULL,id,user_id,'. $user->id
        ]);
    }
}

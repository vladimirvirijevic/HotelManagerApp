<?php

namespace App\Http\Controllers;

use App\Booking;
use App\Room;
use App\Client;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class BookingController extends Controller
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
        $bookings = Booking::whereHas('user', function (Builder $query) {
            $user = Auth::user();
            $query->where('hotel', 'like', $user->hotel);
        })->get();

        foreach ($bookings as $booking) {
            $booking->client = Client::find($booking->client_id);
            $booking->room = Client::find($booking->room_id);
        }

        return response()->json(['message'=>'Success','bookings'=>$bookings],200);
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
        $validator = $this->validateBooking();
        if($validator->fails()){
            return response()->json(['message'=>$validator->messages(),'data'=>null],400);
        }

        $room = Room::find($request->room);
        $client = Client::find($request->client);
        $user = Auth::user();

        $start = strtotime($request->startDate);
        $end = strtotime($request->endDate);
        $days = ($end - $start) / (60 * 60 * 24) + 1;

        $booking = new Booking($validator->validate());

        if ($request->note == null) {
            $booking->note = "";
        }
        else {
            $booking->note = $request->note;
        }

        $booking->price = $room->price * $days;
        $booking->room_id = $request->room;
        $booking->client_id = $request->client;

        $client->bookings()->attach($request->client);
        $room->bookings()->attach($request->room);

        if($user->bookings()->save($booking)){
            return response()->json(['message'=>'Booking added','booking'=>$booking],200);
        }

        return response()->json(['message'=>'Error Occured','room'=>null],400);
    }

    public function validateBooking() {
        return Validator::make(request()->all(), [
            'startDate' => 'required|string|max:100',
            'endDate' => 'required|string|max:100',
            'status' => 'required'
        ]);
    }
}

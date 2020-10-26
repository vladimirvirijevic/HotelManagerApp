<?php

namespace App\Http\Controllers;

use App\Booking;
use App\Room;
use App\Client;

use Carbon\CarbonPeriod;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;
use SebastianBergmann\Comparator\Book;

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
            $booking->room = Room::find($booking->room_id);
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

        // Check if room is booked
        if ($this->canBookRoom($request->room, $request->startDate, $request->endDate) == false) {
            return response()->json(['message'=>'Room is booked during that period','booking'=>null],400);
        }

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
            $booking->client = $client;
            $booking->room = $room;
            return response()->json(['message'=>'Booking added','booking'=>$booking],200);
        }

        return response()->json(['message'=>'Error Occured','booking'=>null],400);
    }

    public function delete($id) {
        $loggedUser = Auth::user();

        $booking = Booking::where('id', $id)
                    ->where('user_id', $loggedUser->id)->first();

        if ($booking == null) {
            return response()->json(['Message' => 'Booking does not exists'], 404);
        }

        $booking->delete();

        return response()->json(['Message' => 'Booking deleted successfully'], 200);
    }

    public function changeStatus($id, Request $request) {
        $loggedUser = Auth::user();

        $booking = Booking::where('id', $id)
            ->where('user_id', $loggedUser->id)->first();

        if ($booking == null) {
            return response()->json(['Message' => 'Booking does not exists'], 404);
        }

        //$booking->update(array('status' => $request->status));
        $booking->status = $request->status;
        $booking->save();

        return response()->json(['Message' => 'Booking successfully updated', 'booking' => $booking], 200);
    }

    public function validateBooking() {
        return Validator::make(request()->all(), [
            'startDate' => 'required|string|max:100',
            'endDate' => 'required|string|max:100',
            'status' => 'required'
        ]);
    }

    public function canBookRoom($roomId, $startDate, $endDate) {
        $bookingsToCheck = Booking::where('room_id', $roomId)->get();
        $datesToBook = CarbonPeriod::create($startDate, $endDate)->toArray();;

        foreach ($bookingsToCheck as $bookingToCheck) {
            $bookedDates = CarbonPeriod::create($bookingToCheck->startDate, $bookingToCheck->endDate)->toArray();;
            if (count(array_intersect($datesToBook, $bookedDates)) > 0) {
                return false;
            }
        }

        return true;
    }
}

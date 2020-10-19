<?php

namespace App\Http\Controllers;

use App\Room;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class RoomController extends Controller
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
        $rooms = Room::whereHas('user', function (Builder $query) {
            $user = Auth::user();
            $query->where('hotel', 'like', $user->hotel);
        })->get();

        return response()->json(['message'=>'Success','rooms'=>$rooms],200);
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
        $validator = $this->validateRoom();
        if($validator->fails()){
            return response()->json(['message'=>$validator->messages(),'data'=>null],400);
        }

        $user = Auth::user();
        $room = new Room($validator->validate());

        if($user->rooms()->save($room)){
            return response()->json(['message'=>'Room added','room'=>$room],200);
        }

        return response()->json(['message'=>'Error Occured','room'=>null],400);
    }

    public function validateRoom(){
        return Validator::make(request()->all(), [
            'name' => 'required|unique:rooms|string|max:100',
            'capacity' => 'required',
            'price' => 'required'
        ]);
    }

    public function delete($id) {
        $room = Room::find($id);

        if ($room == null) {
            return response()->json(['Message' => 'Room does not exists!'], 404);
        }

        $user = Auth::user();
        if ($room->user->id != $user->id) {
            return response()->json(['Message' => 'Unauthorized!'], 401);
        }

        $room->delete();

        return response()->json(['Message' => 'Room deleted successfuly!'], 200);
    }
}

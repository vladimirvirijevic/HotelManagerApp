<?php

namespace App\Http\Controllers;

use App\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

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
        $room = Room::all();
        return response()->json(['message'=>'Success','data'=>$room],200);
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
            return response()->json(['message'=>'Room added','data'=>$room],200);
        }

        return response()->json(['message'=>'Error Occured','data'=>null],400);
    }

    public function validateRoom(){
        return Validator::make(request()->all(), [
            'name' => 'required|unique:rooms|string|min:3|max:255',
            'capacity' => 'required',
            'price' => 'required'
        ]);
    }
}

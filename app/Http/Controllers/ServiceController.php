<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class ServiceController extends Controller
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
        $services = Service::whereHas('user', function (Builder $query) {
            $user = Auth::user();
            $query->where('hotel', 'like', $user->hotel);
        })->get();

        return response()->json(['message'=>'Success','services'=>$services],200);
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
        $validator = $this->validateService();
        if($validator->fails()){
            return response()->json(['message'=>$validator->messages(),'data'=>null],400);
        }

        $user = Auth::user();
        $service = new Service($validator->validate());

        if($user->services()->save($service)){
            return response()->json(['message'=>'Service added','service'=>$service],200);
        }

        return response()->json(['message'=>'Error Occured','room'=>null],400);
    }

    public function validateService(){
        return Validator::make(request()->all(), [
            'name' => 'required|unique:services|string|max:100',
            'price' => 'required'
        ]);
    }
}

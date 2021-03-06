<?php

namespace App\Http\Controllers;

use App\Client;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class ClientController extends Controller
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
        $clients = Client::whereHas('user', function (Builder $query) {
            $user = Auth::user();
            $query->where('hotel', 'like', $user->hotel);
        })->get();

        return response()->json(['message'=>'Success','clients'=>$clients],200);
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
        $validator = $this->validateClient();
        if($validator->fails()){
            return response()->json(['message'=>$validator->messages(),'data'=>null],400);
        }

        $user = Auth::user();
        $client = new Client($validator->validate());

        if($user->clients()->save($client)){
            return response()->json(['message'=>'Client added','client'=>$client],200);
        }

        return response()->json(['message'=>'Error Occured','room'=>null],400);
    }

    public function validateClient(){
        return Validator::make(request()->all(), [
            'name' => 'required|unique:clients|string|max:100',
            'email' => 'required|string|max:100',
            'phone' => 'required|string|max:100',
            'address' => 'required|string|max:100',
            'note' => 'required|string|max:255'
        ]);
    }

    public function delete($id) {
        $client = Client::find($id);

        if ($client == null) {
            return response()->json(['Message' => 'Client does not exists!'], 404);
        }

        $user = Auth::user();
        if ($client->user->id != $user->id) {
            return response()->json(['Message' => 'Unauthorized!'], 401);
        }

        $client->delete();

        return response()->json(['Message' => 'Client deleted successfully!'], 200);
    }
}

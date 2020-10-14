<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
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
        $loggedUser = Auth::user();
        $users = User::where('hotel', $loggedUser->hotel)
                     ->where('id', '!=', $loggedUser->id)->get();

        return response()->json(['message' => 'OK', 'users' => $users], 200);
    }
}

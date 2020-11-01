<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
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
    public function index() {
        $loggedUser = Auth::user();
        $users = User::where('hotel', $loggedUser->hotel)
                     ->where('id', '!=', $loggedUser->id)->get();

        return response()->json(['message' => 'OK', 'users' => $users], 200);
    }

    public function info() {
        $user = Auth::user();

        return response()->json(['message' => 'OK', 'user' => $user], 200);
    }

    public function changeUsername($id, Request $request) {
        $user = Auth::user();

        if ($user->id != $id) {
            return response()->json(['Message' => 'Unauthorized'], 401);
        }

        $user->name = $request->name;
        $user->save();

        return response()->json(['Message' => 'User updated successfully!', 'user' => $user], 200);
    }
}

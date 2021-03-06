<?php

namespace App\Http\Controllers;

use App\ImportedArticle;
use App\Unit;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $units = Unit::whereHas('user', function (Builder $query) {
            $user = Auth::user();
            $query->where('hotel', 'like', $user->hotel);
        })->get();

        return response()->json(['message' => 'Success', 'units' => $units],200);
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
        $validator = $this->validateUnit();
        if($validator->fails()){
            return response()->json(['message' => $validator->messages(), 'data' => null],400);
        }

        $user = Auth::user();
        $unit = new Unit($validator->validate());

        if($user->units()->save($unit)){
            return response()->json(['message' => 'Unit added', 'unit'=>$unit],200);
        }

        return response()->json(['message' => 'Error Occured', 'unit' => null],400);
    }

    public function validateUnit(){
        $user = Auth::user();
        return Validator::make(request()->all(), [
            'name' => 'required|string|unique:units,name,NULL,id,user_id,'. $user->id,
        ]);
    }

    public function delete($id) {
        $unit = Unit::find($id);

        if ($unit == null) {
            return response()->json(['Message' => 'Unit does not exists!'], 404);
        }

        if(ImportedArticle::where('unit_id', $unit->id)->exists()) {
            return response()->json(['Message' => 'Unit is in use!'], 409);
        }

        $user = Auth::user();
        if ($unit->user->id != $user->id) {
            return response()->json(['Message' => 'Unauthorized!'], 401);
        }

        $unit->delete();

        return response()->json(['Message' => 'Unit deleted successfully!'], 200);
    }
}

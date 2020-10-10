<?php

namespace App\Http\Controllers;

Use App\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class DepartmentController extends Controller
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
        $departments = Department::whereHas('user', function (Builder $query) {
            $user = Auth::user();
            $query->where('hotel', 'like', $user->hotel);
        })->get();

        return response()->json(['message'=>'Success','departments'=>$departments],200);
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
        $validator = $this->validateDepartment();
        if($validator->fails()){
            return response()->json(['message'=>$validator->messages(),'data'=>null],400);
        }

        $user = Auth::user();
        $department = new Department($validator->validate());

        if($user->departments()->save($department)){
            return response()->json(['message'=>'Department added','department'=>$department],200);
        }

        return response()->json(['message'=>'Error Occured','department'=>null],400);
    }

    public function validateDepartment(){
        return Validator::make(request()->all(), [
            'name' => 'required|unique:departments|string|max:100',
        ]);
    }
}

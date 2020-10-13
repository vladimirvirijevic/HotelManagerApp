<?php

namespace App\Http\Controllers;

use App\Article;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $articles = Article::whereHas('user', function (Builder $query) {
            $user = Auth::user();
            $query->where('hotel', 'like', $user->hotel);
        })->get();

        return response()->json(['message' => 'Success', 'articles' => $articles],200);
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
        $validator = $this->validateArticle();
        if($validator->fails()){
            return response()->json(['message' => $validator->messages(), 'data' => null],400);
        }

        $user = Auth::user();
        $article = new Article($validator->validate());

        if($user->articles()->save($article)){
            return response()->json(['message' => 'Article added', 'article'=>$article],200);
        }

        return response()->json(['message' => 'Error Occured', 'article' => null],400);
    }

    public function validateArticle(){
        $user = Auth::user();
        return Validator::make(request()->all(), [
            'name' => 'required|string|unique:articles,name,NULL,id,user_id,'. $user->id,
        ]);
    }
}

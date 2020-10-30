<?php

namespace App\Http\Controllers;

use App\Article;
use App\Department;
use App\Exports\ImportedArticleExport;
use App\Exports\ImportedArticleExportModel;
use App\ImportedArticle;
use App\Service;
use Maatwebsite\Excel\Facades\Excel;

use App\Unit;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Builder;

class ImportedArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $importedArticles = ImportedArticle::whereHas('user', function (Builder $query) {
            $user = Auth::user();
            $query->where('hotel', 'like', $user->hotel);
        })->get();

        foreach ($importedArticles as $importedArticle) {
            $importedArticle->article = Article::find($importedArticle->article_id);
            $importedArticle->department = Department::find($importedArticle->department_id);
            $importedArticle->unit = Unit::find($importedArticle->unit_id);
        }

        return response()->json(['message' => 'Success', 'importedArticles' => $importedArticles],200);
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
        $validator = $this->validateImportedArticle();
        if($validator->fails()){
            return response()->json(['message' => $validator->messages(), 'data' => null],400);
        }

        $user = Auth::user();
        $importedArticle = new ImportedArticle($validator->validate());

        if($user->importedArticles()->save($importedArticle)){
            $importedArticle->article = Article::find($importedArticle->article_id);
            $importedArticle->department = Department::find($importedArticle->department_id);
            $importedArticle->unit = Unit::find($importedArticle->unit_id);
            return response()->json(['message' => 'Unit added', 'importedArticle' => $importedArticle],200);
        }

        return response()->json(['message' => 'Error Occured', 'importedArticle' => null],400);
    }

    public function export(Request $request)
    {
        $articles = ImportedArticle::all();

        $exportedArticles = [];

        foreach ($articles as $article) {
            $department = Department::find($article->department_id);
            $articleImport = Article::find($article->article_id);
            $unit = Unit::find($article->unit_id);

            $importedArticleExport = new ImportedArticleExportModel();
            $importedArticleExport->id = $article->id;
            $importedArticleExport->department = $department->name;
            $importedArticleExport->article = $articleImport->name;
            $importedArticleExport->amount = $article->amount;
            $importedArticleExport->unit = $unit->name;
            $importedArticleExport->date = $article->date;
            array_push($exportedArticles, $importedArticleExport);
        }

        $export = new ImportedArticleExport($exportedArticles);

        return Excel::download($export, 'articles.xlsx');
    }

    public function delete($id) {
        $importedArticle = ImportedArticle::find($id);

        if ($importedArticle == null) {
            return response()->json(['Message' => 'Imported Article does not exists!'], 404);
        }

        $user = Auth::user();

        if ($importedArticle->user->id != $user->id) {
            return response()->json(['Message' => 'Unauthorized!'], 401);
        }

        $importedArticle->delete();

        return response()->json(['Message' => 'Imported Article deleted successfully!'], 200);
    }

    public function validateImportedArticle(){
        return Validator::make(request()->all(), [
            'date' => 'required',
            'amount' => 'required',
            'department_id' => 'required',
            'article_id' => 'required',
            'unit_id' => 'required',
            'type' => 'required'
        ]);
    }
}

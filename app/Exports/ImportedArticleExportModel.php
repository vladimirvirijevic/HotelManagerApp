<?php

namespace App\Exports;

use App\ImportedArticle;
use Illuminate\Database\Eloquent\Model;

class ImportedArticleExportModel
{
    public $id;
    public $department;
    public $article;
    public $amount;
    public $unit;
    public $date;
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImportedArticle extends Model
{
    protected $fillable = [
        'name', 'article_id', 'department_id', 'unit_id', 'amount', 'date', 'type'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }
}

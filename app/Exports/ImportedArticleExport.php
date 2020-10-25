<?php

namespace App\Exports;

use App\ImportedArticle;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ImportedArticleExport implements FromArray, WithHeadings
{
    protected $articles;

    public function __construct(array $articles)
    {
        $this->articles = $articles;
    }

    public function array(): array
    {
        return $this->articles;
    }

    public function headings(): array
    {
        return [
            'Id',
            'Department',
            'Article',
            'Amount',
            'Unit',
            'Date'
        ];
    }


}

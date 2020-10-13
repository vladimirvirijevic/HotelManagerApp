<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImportedArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imported_articles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('date');
            $table->float('amount', 8, 2);
            $table->bigInteger('department_id')->unsigned();
            $table->bigInteger('unit_id')->unsigned();
            $table->bigInteger('article_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onCascade('delete');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('imported_articles');
    }
}

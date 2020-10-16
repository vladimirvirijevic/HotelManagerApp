<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimeEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('time_entries', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('duration');
            $table->string('startTime');
            $table->string('endTime');
            $table->bigInteger('ticket_update_id')->unsigned();
            $table->foreign('ticket_update_id')
                ->references('id')
                ->on('ticket_updates')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('time_entries');
    }
}

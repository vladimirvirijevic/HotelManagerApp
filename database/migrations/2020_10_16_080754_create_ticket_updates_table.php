<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketUpdatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket_updates', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('description');
            $table->string('internalUpdate');
            $table->bigInteger('ticket_id')->unsigned();
            $table->foreign('ticket_id')
                    ->references('id')
                    ->on('tickets')
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
        Schema::dropIfExists('ticket_updates');
    }
}

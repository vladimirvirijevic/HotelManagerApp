<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('startDate');
            $table->string('endDate');
            $table->string('status');
            $table->float('price', 8, 2);
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('room_id')->unsigned();
            $table->bigInteger('client_id')->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onCascade('delete');
            $table->foreign('room_id')
                ->references('id')
                ->on('rooms')
                ->onCascade('delete');
            $table->foreign('client_id')
                ->references('id')
                ->on('clients')
                ->onCascade('delete');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}

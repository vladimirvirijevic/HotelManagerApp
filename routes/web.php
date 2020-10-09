<?php

use Illuminate\Support\Facades\Route;

// Route::view('/{path?}', 'app');

Route::get( '/{path?}', function(){
    return view( 'app' );
} )->where('path', '.*');

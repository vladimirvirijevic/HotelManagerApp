<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'room'
], function ($router) {
    Route::get('all', 'RoomController@index');
    Route::post('store', 'RoomController@store');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'client'
], function ($router) {
    Route::get('all', 'ClientController@index');
    Route::post('store', 'ClientController@store');
});

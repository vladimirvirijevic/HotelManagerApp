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

Route::group([
    'middleware' => 'api',
    'prefix' => 'service'
], function ($router) {
    Route::get('all', 'ServiceController@index');
    Route::post('store', 'ServiceController@store');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'booking'
], function ($router) {
    Route::get('all', 'BookingController@index');
    Route::post('store', 'BookingController@store');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'department'
], function ($router) {
    Route::get('all', 'DepartmentController@index');
    Route::post('store', 'DepartmentController@store');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'article'
], function ($router) {
    Route::get('all', 'ArticleController@index');
    Route::post('store', 'ArticleController@store');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'unit'
], function ($router) {
    Route::get('all', 'UnitController@index');
    Route::post('store', 'UnitController@store');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'importedArticle'
], function ($router) {
    Route::get('all', 'ImportedArticleController@index');
    Route::post('store', 'ImportedArticleController@store');
});

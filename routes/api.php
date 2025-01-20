<?php

use App\Http\Controllers\TaskController;

Route::get('/todos','TaskController@index');
Route::post('/todos','TaskController@store');
Route::put('/todo/{id}','TaskController@update');
Route::delete('/todo/{id}','TaskController@destroy');
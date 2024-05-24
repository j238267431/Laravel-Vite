<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpaController;
// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/{any}', [SpaController::class, 'index'])->where('any', '.*');

<?php

use App\Http\Controllers\Api\DeskController;
use App\Http\Controllers\Api\DeskListController;
use App\Http\Controllers\Api\CardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'desks' => DeskController::class,
    'desk-lists' => DeskListController::class,
    'card' => CardController::class,
]);
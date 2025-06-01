<?php

use App\Http\Actions\Budget\BudgetStoreUpdateAction;
use App\Http\Actions\Category\CategoryIndexAction;
use App\Http\Actions\Home\HomeIndexAction;
use App\Http\Actions\Transaction\TransactionDestroyAction;
use App\Http\Actions\Transaction\TransactionStoreAction;
use App\Http\Actions\Transaction\TransactionUpdateAction;
use Illuminate\Support\Facades\Route;

Route::prefix('home')->group(function () {
    Route::get('/', HomeIndexAction::class);
});

Route::prefix('transaction')->group(function () {
    Route::post('/', TransactionStoreAction::class);
    Route::put('/{id}', TransactionUpdateAction::class);
    Route::delete('/{id}', TransactionDestroyAction::class);
});

Route::prefix('category')->group(function () {
    Route::get('/', CategoryIndexAction::class);
});

Route::prefix('budget')->group(function () {
    Route::post('/', BudgetStoreUpdateAction::class);
});
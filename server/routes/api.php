<?php

use App\Http\Actions\Budget\BudgetStoreUpdateAction;
use App\Http\Actions\Budget\GetMonthlyBudgetAction;
use App\Http\Actions\Category\CategoryIndexAction;
use App\Http\Actions\Transaction\TransactionDestroyAction;
use App\Http\Actions\Transaction\TransactionIndexAction;
use App\Http\Actions\Transaction\TransactionStoreAction;
use App\Http\Actions\Transaction\TransactionUpdateAction;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('transaction')->group(function () {
    Route::get('/currentMonth', TransactionIndexAction::class);
    Route::post('/', TransactionStoreAction::class);
    Route::put('/{id}', TransactionUpdateAction::class);
    Route::delete('/{id}', TransactionDestroyAction::class);
});

Route::prefix('category')->group(function () {
    Route::get('/', CategoryIndexAction::class);
});

Route::prefix('budget')->group(function () {
    Route::get('/currentMonth', GetMonthlyBudgetAction::class);
    Route::post('/', BudgetStoreUpdateAction::class);
});
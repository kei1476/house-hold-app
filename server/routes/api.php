<?php

use App\Http\Actions\Budget\BudgetStoreUpdateAction;
use App\Http\Actions\Budget\GetMonthlyBudgetAction;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::prefix('transaction')->group(function () {
    Route::get('/currentMonth', [TransactionController::class, 'index']);
    Route::post('/', [TransactionController::class, 'store']);
    Route::put('/{id}', [TransactionController::class, 'update']);
    Route::delete('/{id}', [TransactionController::class, 'destroy']);
});

Route::prefix('category')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
});

Route::prefix('budget')->group(function () {
    Route::get('/currentMonth', GetMonthlyBudgetAction::class);
    Route::post('/', BudgetStoreUpdateAction::class);
});
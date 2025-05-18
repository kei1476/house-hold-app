<?php

namespace App\Providers;

use App\Services\BudgetService;
use App\Services\Contracts\BudgetServiceInterface;
use App\Services\Contracts\TransactionServiceInterface;
use App\Services\TransactionService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(BudgetServiceInterface::class, BudgetService::class);
        $this->app->bind(TransactionServiceInterface::class, TransactionService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

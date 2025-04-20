<?php

namespace App\Services;

use App\Services\Contracts\BudgetServiceInterface;
use App\Models\Budget;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class BudgetService implements BudgetServiceInterface
{
    /**
     * Display a listing of the resource.
     */
    public function getMonthlyBudgetAmount($budgetMonth): Budget|null
    {
        return Budget::where('target_month', $budgetMonth)->first();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(array $attributes): Budget
    {
        return Budget::create($attributes);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(array $attributes, int $id): Budget
    {
        $budget = Budget::find($id);
        $budget->update($attributes);

        return $budget;
    }
}
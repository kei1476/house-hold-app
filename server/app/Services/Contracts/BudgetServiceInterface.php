<?php
namespace App\Services\Contracts;

use App\Models\Budget;
use Carbon\Carbon;

interface BudgetServiceInterface
{
    public function getMonthlyBudgetAmount($budgetMonth): Budget|null;

    public function store(array $attributes): Budget;

    public function update(array $attributes, int $id): Budget;
}
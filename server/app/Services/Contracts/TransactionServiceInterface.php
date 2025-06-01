<?php
namespace App\Services\Contracts;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Collection;

interface TransactionServiceInterface
{
    public function getMonthlyTransactions(string $currentMonth): Collection | null;

    public function store(array $attributes): Transaction;

    public function update(array $attributes, int $id): Transaction;
}
<?php

namespace App\Services;

use App\Services\Contracts\TransactionServiceInterface;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class TransactionService implements TransactionServiceInterface
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $currentMonth): Collection | null
    {
        $start = Carbon::parse($currentMonth)->firstOfMonth();
        $end = Carbon::parse($currentMonth)->endOfMonth();

        $transactions = Transaction::query()
            ->with('category')
            ->whereBetween('date', [$start, $end])
            ->get();

        return $transactions;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(array $attribute): Transaction
    {
        try {
            $newTransaction = Transaction::create($attribute);
            $newTransaction->load('category');

            return $newTransaction;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(array $attributes, $id): Transaction
    {
        $transaction = Transaction::find($id);

        try {
            $transaction->update($attributes['transaction']);
            $transaction->load('category');

            return $transaction;
        }catch(\Throwable $th){
            throw $th;
        }
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentMonth = $request->query('currentMonth');
        $start = Carbon::parse($currentMonth)->firstOfMonth();
        $end = Carbon::parse($currentMonth)->endOfMonth();

        $transactions = Transaction::query()
            ->with('category')
            ->whereBetween('date', [$start, $end])
            ->get();

        return TransactionResource::collection($transactions);;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $newTransaction = Transaction::create($request->get('transaction'));
            $newTransaction->load('category');
            return new TransactionResource($newTransaction);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);
        $attributes = $request->all();

        try {
            $transaction->update($attributes['transaction']);
            $transaction->load('category');
            return new TransactionResource($transaction);
        }catch(\Throwable $th){
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Transaction::destroy($id);
    }
}

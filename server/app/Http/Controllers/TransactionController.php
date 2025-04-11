<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        $transactions = DB::table('transactions')
            ->select(
                'transactions.id',
                'transactions.category_id',
                'categories.name AS category_name',
                'transactions.date',
                'transactions.type',
                'transactions.amount',
                'transactions.content'
            )
            ->leftJoin('categories', 'categories.id', '=', 'transactions.category_id')
            ->whereBetween('date', [$start, $end])
            ->get()
            ->toArray();

        return response()->json($transactions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $requestPram = $request->get('params');
        $newTransaction = Transaction::create($requestPram['transaction']);
        $newTransaction->load('category');

        $res = [
            'id' => $newTransaction->id,
            'type' => $newTransaction->type,
            'date' => $newTransaction->date,
            'amount' => $newTransaction->amount,
            'content' => $newTransaction->content,
            'category_id' => $newTransaction->category->id,
            'category_name' => $newTransaction->category->name
        ];

        return response()->json($res);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);
        $attributes = $request->all();
        $transaction->update($attributes['params']['transaction']);

        $transaction->load('category');
        Log::debug(Carbon::parse($transaction->date)->format('Y-m-d H:i:s'));
        $res = [
            'id' => $transaction->id,
            'type' => $transaction->type,
            'date' => Carbon::parse($transaction->date)->format('Y-m-d H:i:s'),
            'amount' => $transaction->amount,
            'content' => $transaction->content,
            'category_id' => $transaction->category->id,
            'category_name' => $transaction->category->name
        ];
Log::debug($res);
        return $res;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Transaction::destroy($id);
    }
}

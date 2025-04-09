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
        Log::debug($newTransaction);

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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Transaction::destroy($id);
    }
}

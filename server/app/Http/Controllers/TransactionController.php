<?php

namespace App\Http\Controllers;

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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
        //
    }
}

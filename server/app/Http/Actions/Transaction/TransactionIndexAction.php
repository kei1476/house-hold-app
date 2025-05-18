<?php

namespace App\Http\Actions\Transaction;

use App\Http\Resources\TransactionResource;
use App\Services\Contracts\TransactionServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

/**
 * Class TransactionIndexAction
 *
 * @package App\Http\Actions\Transaction
 */
class TransactionIndexAction extends Controller
{
    /**
     * @param Request $request
     */
    public function __invoke(Request $request, TransactionServiceInterface $transactionService)
    {
        $currentMonth = $request->input('currentMonth');
        $transactions = $transactionService->index($currentMonth);

        return TransactionResource::collection($transactions);
    }
}
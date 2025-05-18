<?php

namespace App\Http\Actions\Transaction;

use App\Http\Resources\TransactionResource;
use App\Services\Contracts\TransactionServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

/**
 * Class TransactionStoreAction
 *
 * @package App\Http\Actions\Transaction
 */
class TransactionStoreAction extends Controller
{
    /**
     * @param Request $request
     */
    public function __invoke(Request $request, TransactionServiceInterface $transactionService)
    {
        $requestedTransactionData = $request->get('transaction');
        $transactions = $transactionService->store($requestedTransactionData);

        return TransactionResource::collection($transactions);
    }
}
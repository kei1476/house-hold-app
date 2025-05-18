<?php

namespace App\Http\Actions\Transaction;

use App\Http\Resources\TransactionResource;
use App\Services\Contracts\TransactionServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

/**
 * Class TransactionUpdateAction
 *
 * @package App\Http\Actions\Transaction
 */
class TransactionUpdateAction extends Controller
{
    /**
     * @param Request $request
     */
    public function __invoke(Request $request, $id, TransactionServiceInterface $transactionService)
    {
        $requestedTransactionData = $request->all();
        $transactions = $transactionService->update($requestedTransactionData, $id);

        return TransactionResource::collection($transactions);
    }
}
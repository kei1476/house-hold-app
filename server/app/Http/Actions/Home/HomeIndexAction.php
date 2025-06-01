<?php

namespace App\Http\Actions\Home;

use App\Http\Resources\BudgetResource;
use App\Services\BudgetService;
use App\Services\Contracts\BudgetServiceInterface;
use App\Http\Resources\TransactionResource;
use App\Services\TransactionService;
use App\Services\Contracts\TransactionServiceInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

/**
 * Class HomeIndexAction
 *
 */
class HomeIndexAction extends Controller
{
    public readonly BudgetService $budgetService;
    public readonly TransactionService $transactionService;

    public function __construct(BudgetServiceInterface $budgetService, TransactionServiceInterface $transactionService)
    {
        $this->budgetService = $budgetService;
        $this->transactionService = $transactionService;
    }

    /**
     * @param Request $request
     */
    public function __invoke(Request $request)
    {
        $currentMonth = $request->input('currentMonth');
        $budgetAmount = $this->budgetService->getMonthlyBudget(Carbon::parse($currentMonth)->firstOfMonth());
        $transactions = $this->transactionService->getMonthlyTransactions($currentMonth);

        return [
            'budget' => new BudgetResource($budgetAmount, $currentMonth),
            'transactions' => TransactionResource::collection($transactions)
        ];
    }
}
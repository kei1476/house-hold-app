<?php

namespace App\Http\Actions\Budget;

use App\Http\Resources\BudgetResource;
use App\Services\Contracts\BudgetServiceInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

/**
 * Class GetMonthlyBudgetAction
 *
 * @package App\Http\Actions\Budget
 */
class GetMonthlyBudgetAction extends Controller
{
    /**
     * @param Request $request
     */
    public function __invoke(Request $request, BudgetServiceInterface $budgetService)
    {
        $budgetMonth = $request->input('currentMonth');
        $budgetAmount = $budgetService->getMonthlyBudgetAmount(Carbon::parse($budgetMonth)->firstOfMonth());

        return new BudgetResource($budgetAmount, $budgetMonth);
    }
}
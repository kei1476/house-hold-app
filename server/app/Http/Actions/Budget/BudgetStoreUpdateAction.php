<?php

namespace App\Http\Actions\Budget;

use App\Http\Resources\BudgetResource;
use App\Services\Contracts\BudgetServiceInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

/**
 * Class BudgetStoreAction
 *
 * @package App\Http\Actions\Budget
 */
class BudgetStoreUpdateAction extends Controller
{
    /**
     * @param Request $request
     */
    public function __invoke(Request $request, BudgetServiceInterface $budgetService)
    {

        $attributes = [
            'budget_amount' => $request->input('budgetAmount'),
            'target_month' => Carbon::parse($request->input('currentMonth'))->firstOfMonth()
        ];

        $id = (int)$request->input('id');

        if($id === 0) {
            $newBudget = $budgetService->store($attributes);
        }else {
            $newBudget = $budgetService->update($attributes, $id);
        }

        return new BudgetResource($newBudget);
    }
}
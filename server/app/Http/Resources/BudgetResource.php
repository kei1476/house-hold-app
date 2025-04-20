<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BudgetResource extends JsonResource
{
    protected $targetMonth;

    public function __construct($resource, $targetMonth = '')
    {
        // 必ず親クラスの __construct() を呼び出す
        parent::__construct($resource);
        $this->targetMonth = $targetMonth;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id ?? 0,
            'target_month' => isset($this->target_month) ? Carbon::parse($this->target_month)->format('Y-m-d') : $this->targetMonth,
            'budget_amount' => $this->budget_amount ?? 0,
        ];
    }
}

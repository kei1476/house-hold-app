<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'date' => Carbon::parse($this->date)->format('Y-m-d'),
            'amount' => $this->amount,
            'content' => $this->content,
            'category_id' => $this->category->id,
            'category_name' => $this->category->name
        ];
    }
}

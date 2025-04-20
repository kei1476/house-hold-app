<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    protected $table = 'budgets';

    protected $casts = [
		'id' => 'int',
		'budget_amount' => 'int',
		'target_month' => 'datetime:yyyy-MM',
	];

	protected $fillable = [
        'target_month',
		'budget_amount',
	];
}

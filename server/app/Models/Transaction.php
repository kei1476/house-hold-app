<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

	protected $casts = [
		'id' => 'int',
		'category_id' => 'int',
		'amount' => 'int',
		'date' => 'date:yyyy-MM-dd',
	];

	protected $fillable = [
		'category_id',
        'date',
		'type',
		'amount',
		'content',
	];

    // -----------------------------------------------------------------------------------------------------------------
    // Relation
    // -----------------------------------------------------------------------------------------------------------------
	public function category(): BelongsTo
    {
		return $this->belongsTo(Category::class);
	}
}

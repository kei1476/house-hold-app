<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $startOfCurrentMonth = Carbon::now()->startOfMonth();
        $startOfPreMonth = $startOfCurrentMonth->copy()->subMonth();

        Transaction::create([
            'category_id' => 6,
            'date' => $startOfCurrentMonth->toDateString(),
            'type' => 'expense',
            'amount' => 520,
            'content' => '地下鉄',
        ]);
        Transaction::create([
            'category_id' => 1,
            'date' => $startOfCurrentMonth->toDateString(),
            'type' => 'expense',
            'amount' => 120,
            'content' => 'おにぎり',
        ]);
        Transaction::create([
            'category_id' => 1,
            'date' => $startOfCurrentMonth->copy()->addDay(5)->toDateString(),
            'type' => 'expense',
            'amount' => 600,
            'content' => '弁当',
        ]);
        Transaction::create([
            'category_id' => 2,
            'date' => $startOfCurrentMonth->copy()->addDay(5)->toDateString(),
            'type' => 'expense',
            'amount' => 250,
            'content' => '歯ブラシ',
        ]);
        Transaction::create([
            'category_id' => 5,
            'date' => $startOfCurrentMonth->copy()->addDay(10)->toDateString(),
            'type' => 'expense',
            'amount' => 13000,
            'content' => 'Tシャツ',
        ]);
        Transaction::create([
            'category_id' => 7,
            'date' => $startOfCurrentMonth->copy()->addDay(10)->toDateString(),
            'type' => 'income',
            'amount' => 350000,
            'content' => '給与',
        ]);
        Transaction::create([
            'category_id' => 6,
            'date' => $startOfPreMonth->toDateString(),
            'type' => 'expense',
            'amount' => 520,
            'content' => '地下鉄',
        ]);
        Transaction::create([
            'category_id' => 1,
            'date' => $startOfPreMonth->toDateString(),
            'type' => 'expense',
            'amount' => 120,
            'content' => 'おにぎり',
        ]);
        Transaction::create([
            'category_id' => 1,
            'date' => $startOfPreMonth->copy()->addDay(7)->toDateString(),
            'type' => 'expense',
            'amount' => 600,
            'content' => '弁当',
        ]);
        Transaction::create([
            'category_id' => 2,
            'date' => $startOfPreMonth->copy()->addDay(7)->toDateString(),
            'type' => 'expense',
            'amount' => 250,
            'content' => '歯ブラシ',
        ]);
        Transaction::create([
            'category_id' => 5,
            'date' => $startOfPreMonth->copy()->addDay(14)->toDateString(),
            'type' => 'expense',
            'amount' => 13000,
            'content' => 'Tシャツ',
        ]);
        Transaction::create([
            'category_id' => 7,
            'date' => $startOfPreMonth->copy()->addDay(14)->toDateString(),
            'type' => 'income',
            'amount' => 350000,
            'content' => '給与',
        ]);
    }
}

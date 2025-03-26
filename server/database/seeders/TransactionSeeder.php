<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Transaction::create([
            'category_id' => 6,
            'date' => '2025-3-2',
            'type' => 1,
            'amount' => 520,
            'content' => '地下鉄',
        ]);
        Transaction::create([
            'category_id' => 1,
            'date' => '2025-3-2',
            'type' => 1,
            'amount' => 120,
            'content' => 'おにぎり',
        ]);
        Transaction::create([
            'category_id' => 1,
            'date' => '2025-3-12',
            'type' => 1,
            'amount' => 600,
            'content' => '弁当',
        ]);
        Transaction::create([
            'category_id' => 2,
            'date' => '2025-3-12',
            'type' => 1,
            'amount' => 250,
            'content' => '歯ブラシ',
        ]);
        Transaction::create([
            'category_id' => 5,
            'date' => '2025-3-20',
            'type' => 1,
            'amount' => 13000,
            'content' => 'Tシャツ',
        ]);
        Transaction::create([
            'category_id' => 7,
            'date' => '2025-3-30',
            'type' => 2,
            'amount' => 350000,
            'content' => '給与',
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'type' => 'expense',
            'name' => '食費'
        ]);
        Category::create([
            'type' => 'expense',
            'name' => '日用品'
        ]);
        Category::create([
            'type' => 'expense',
            'name' => '家賃'
        ]);
        Category::create([
            'type' => 'expense',
            'name' => '水道光熱費'
        ]);
        Category::create([
            'type' => 'expense',
            'name' => '娯楽'
        ]);
        Category::create([
            'type' => 'expense',
            'name' => '交通費'
        ]);
        Category::create([
            'type' => 'income',
            'name' => '給与'
        ]);
        Category::create([
            'type' => 'income',
            'name' => '副収入'
        ]);
    }
}

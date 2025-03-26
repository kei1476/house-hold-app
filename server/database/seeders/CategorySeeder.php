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
            'type' => 1,
            'name' => '食費'
        ]);
        Category::create([
            'type' => 1,
            'name' => '日用品'
        ]);
        Category::create([
            'type' => 1,
            'name' => '家賃'
        ]);
        Category::create([
            'type' => 1,
            'name' => '水道光熱費'
        ]);
        Category::create([
            'type' => 1,
            'name' => '娯楽'
        ]);
        Category::create([
            'type' => 1,
            'name' => '交通費'
        ]);
        Category::create([
            'type' => 2,
            'name' => '給与'
        ]);
        Category::create([
            'type' => 2,
            'name' => '副収入'
        ]);
    }
}

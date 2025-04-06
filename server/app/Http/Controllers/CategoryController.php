<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $type = $request->type;

        $categories = Category::query()
            ->where('type', $type)
            ->select('id', 'type','name')
            ->get();

        return response()->json($categories);
    }
}

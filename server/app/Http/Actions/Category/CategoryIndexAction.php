<?php

namespace App\Http\Actions\Category;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

/**
 * Class CategoryIndexAction
 *
 * @package App\Http\Actions\Category
 */
class CategoryIndexAction extends Controller
{
    /**
     * @param Request $request
     */
    public function __invoke(Request $request)
    {
        $type = $request->type;

        $categories = Category::query()
            ->where('type', $type)
            ->select('id', 'type','name')
            ->get();

        return response()->json($categories);
    }
}
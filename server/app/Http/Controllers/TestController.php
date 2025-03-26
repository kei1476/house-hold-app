<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();
        return response()->json($transactions);
    }
}

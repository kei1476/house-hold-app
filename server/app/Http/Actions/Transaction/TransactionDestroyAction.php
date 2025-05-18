<?php

namespace App\Http\Actions\Transaction;

use App\Models\Transaction;
use Illuminate\Routing\Controller;

/**
 * Class TransactionDestroyAction
 *
 * @package App\Http\Actions\Transaction
 */
class TransactionDestroyAction extends Controller
{
    /**
     * @param string $id
     */
    public function __invoke(string $id)
    {
        Transaction::destroy($id);
    }
}
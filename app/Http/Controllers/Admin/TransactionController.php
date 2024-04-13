<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transaction = Transaction::with('user', 'car')->paginate(5);
        return Inertia::render('Admin/Transaction/Index', [
            'transaction' => $transaction
        ]);
    }

    public function approve($id)
    {
        $transaction = Transaction::with('car')->findOrFail($id);
        $transaction->status = "APPROVE";
        $transaction->save();

        $startTimestamp = strtotime($transaction->start_date);
        $endTimestamp = strtotime($transaction->end_date);

        $timeDifference = $endTimestamp - $startTimestamp;
        
        $daysDifference = ceil($timeDifference / (60 * 60 * 24));

        $total_price = $daysDifference * $transaction->car->price;

        Orders::create([
            "user_id" => $transaction->user_id,
            "car_id" => $transaction->car->id,
            "transaction_id" => $transaction->id,
            "total_price" => $total_price,
        ]);
    }
}

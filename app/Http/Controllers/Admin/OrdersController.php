<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrdersController extends Controller
{
    public function index(){
        $order = Orders::with('user', 'car', 'transaction')->paginate(5);
        return Inertia::render('Admin/Order/Index', [
            'order' => $order
        ]);
    }

    public function returned($id){
        $order = Orders::findOrFail($id);
        $order->status = "RETURN";
        $order->save();

        $transaction = Transaction::with('car')->findOrFail($order->transaction_id);
        $transaction->status = "RETURN";
        $transaction->save();
    }
}

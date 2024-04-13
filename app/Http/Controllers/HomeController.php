<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarResource;
use App\Models\Car;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function PHPUnit\Framework\isEmpty;

class HomeController extends Controller
{
    public function Home()
    {
        return Inertia::render("Welcome");
    }

    public function rent(Request $request)
    {
        $query = Car::query();

        if (request("merk")) {
            $query->where("merk", "like", "%" . request("merk") . "%");
        }
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if ($request->has('start_date') && $request->has('end_date')) {
            $startDate = $request->input('start_date');
            $endDate = $request->input('end_date');

            // Memfilter mobil yang tidak memiliki transaksi sewa yang bertabrakan dengan rentang tanggal yang dipilih
            $query->whereDoesntHave('transactions', function ($query) use ($startDate, $endDate) {
                $query->where(function ($query) use ($startDate, $endDate) {
                    $query->where('start_date', '<=', $endDate)
                        ->where('end_date', '>=', $startDate);
                });
            });
        }

        $car = $query->paginate(10);

        return Inertia::render("Rent", [
            'car' => CarResource::collection($car),
        ]);
    }

    public function rent_post(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        $startDate = $request->start_date;
        $endDate = $request->end_date;

        $query = Car::query();

        $query->whereDoesntHave('transactions', function ($query) use ($startDate, $endDate) {
            $query->where(function ($query) use ($startDate, $endDate) {
                $query->where('start_date', '<=', $endDate)
                    ->where('end_date', '>=', $startDate)->where('status', "APPROVE");
            });
        });

        $car = $query->where('id', $request->id)->get();
        if($car->isEmpty()){
            return back()->withErrors('your error message');
        }

        Transaction::create([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'user_id' => Auth::user()->id,
            'car_id' => $request->id,
        ]);

        return redirect(route('home', absolute: false));
    }
}

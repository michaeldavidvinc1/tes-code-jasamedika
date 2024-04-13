<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CarController;
use App\Http\Controllers\Admin\OrdersController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Orders;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", [HomeController::class, 'Home'])->name('home');
Route::get('/rent', [HomeController::class, 'rent'])->name('rent.page');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post("/rent", [HomeController::class, 'rent_post'])->name('rent.post');
});

Route::middleware("guest")->group(function() {
    Route::get("/login", [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
});

Route::prefix('admin')->middleware("admin")->group(function() {
    Route::get("/", [AdminController::class, 'index'])->name('admin.page');

    //Car Route
    Route::get("/car", [CarController::class, 'index'])->name("car.page");
    Route::get("/car/create", [CarController::class, 'create'])->name("car.create");
    Route::post("/car/create", [CarController::class, 'store'])->name("car.store");
    Route::get("/car/edit/{id}", [CarController::class, 'edit'])->name("car.edit");
    Route::put("/car/edit/{id}", [CarController::class, 'update'])->name("car.update");
    Route::delete("/car/{id}", [CarController::class, 'destroy'])->name("car.destroy");

    // Transaction Route
    Route::get("/transaction", [TransactionController::class, 'index'])->name('transaction.page');
    Route::put("/transaction/{transactionId}/approve", [TransactionController::class, 'approve'])->name('transaction.approve');
    
    // Order Route
    Route::get("/order", [OrdersController::class, 'index'])->name('order.page');
    Route::put("/order/{orderId}/returned", [OrdersController::class, 'returned'])->name('order.return');

    Route::get("/user", [UserController::class, 'index'])->name('user.page');
});


require __DIR__.'/auth.php';

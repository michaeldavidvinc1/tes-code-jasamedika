<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(){
        $user = User::paginate(5);
        return Inertia::render('Admin/User/Index', [
            'user' => $user
        ]);
    }
}

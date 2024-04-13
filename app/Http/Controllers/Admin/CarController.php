<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarResource;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CarController extends Controller
{
    public function index()
    {
        $query = Car::query();

        // Cek apakah terdapat pencarian
        if (request('search')) {
            $searchTerm = '%' . request('search') . '%';
            $query->where('name', 'LIKE', $searchTerm)
                ->orWhere('merk', 'LIKE', $searchTerm);
        }

        $car = $query->orderByDesc('created_at')->paginate(5);

        // Render view dengan hasil kueri
        return Inertia::render("Admin/Car/Index", [
            'car' => $car
        ]);
    }

    public function create()
    {
        return Inertia::render("Admin/Car/Create");
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'merk' => 'required',
            'plat' => 'required',
            'price' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $pathPhoto = $request->image->store('project/' . Str::random(), 'public');

        Car::create([
            'name' => $request->name,
            'merk' => $request->merk,
            'plat' => $request->plat,
            'price' => $request->price,
            'image' => $pathPhoto,
        ]);

        return redirect(route('car.page', absolute: false));
    }

    public function edit($id){
        $car = Car::findOrFail($id);

        return Inertia::render("Admin/Car/Edit", [
            'car' =>  new CarResource($car),
        ]);
    }

    public function update(Request $request, $id){
        $data = $request->validate([
            'name' => 'required',
            'merk' => 'required',
            'plat' => 'required',
            'price' => 'required',
            'image' => ['nullable', 'image'],
        ]);
        $car = Car::findOrFail($id);
        if ($request->image) {
            if ($car->image) {
                Storage::disk('public')->deleteDirectory(dirname($car->image));
            }
            $data['image'] = $request->image->store('project/' . Str::random(), 'public');
        } else {
            $data['image'] = $car->image;
        }

        $car->update($data);
        return redirect(route('car.page', absolute: false));
    }

    public function destroy($id)
    {
        $car = Car::findOrFail($id);
        $car->delete();
        if ($car->image) {
            Storage::disk('public')->deleteDirectory(dirname($car->image));
        }
        return redirect(route('car.page', absolute: false));
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Potential;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PotentialController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Potentials/Index', [
            'potentials' => Potential::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Potentials/Create', [
            // 'categories' => \App\Models\PotentialCategory::where('is_active', true)->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'contact_info' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('potentials', 'public');
        }

        Potential::create([
            'name' => $validated['name'],
            'potential_category_id' => null,
            'category' => 'other', // Fallback for backward compatibility
            'description' => $validated['description'],
            'location' => $validated['location'],
            'contact_info' => $validated['contact_info'],
            'image_path' => $path,
        ]);

        return redirect()->route('potentials.index')->with('success', 'Potensi berhasil ditambahkan.');
    }

    public function edit(Potential $potential)
    {
        return Inertia::render('Admin/Potentials/Edit', [
            'potential' => $potential,
            // 'categories' => \App\Models\PotentialCategory::where('is_active', true)->get()
        ]);
    }

    public function update(Request $request, Potential $potential)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'contact_info' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('potentials', 'public');
            $potential->image_path = $path;
        }

        $potential->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'contact_info' => $validated['contact_info'],
        ]);

        return redirect()->route('potentials.index')->with('success', 'Potensi berhasil diperbarui.');
    }

    public function destroy(Potential $potential)
    {
        $potential->delete();
        return redirect()->route('potentials.index')->with('success', 'Potensi berhasil dihapus.');
    }

}

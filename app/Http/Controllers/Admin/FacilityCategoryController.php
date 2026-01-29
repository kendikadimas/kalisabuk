<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FacilityCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Facilities/Index', [
            'categories' => FacilityCategory::withCount('items')->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Facilities/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        FacilityCategory::create($validated);

        return redirect()->route('facilities.index')->with('success', 'Kategori fasilitas berhasil dibuat.');
    }

    public function show(FacilityCategory $facility)
    {
        return Inertia::render('Admin/Facilities/Show', [
            'category' => $facility->load('items'),
        ]);
    }

    public function edit(FacilityCategory $facility)
    {
        return Inertia::render('Admin/Facilities/Edit', [
            'category' => $facility,
        ]);
    }

    public function update(Request $request, FacilityCategory $facility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $facility->update($validated);

        return redirect()->route('facilities.index')->with('success', 'Kategori fasilitas berhasil diperbarui.');
    }

    public function destroy(FacilityCategory $facility)
    {
        $facility->delete();

        return redirect()->route('facilities.index')->with('success', 'Kategori fasilitas berhasil dihapus.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Demographic;
use App\Models\VillageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DemographicController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Demographics/Index', [
            'villageInfo' => VillageInfo::first(),
        ]);
    }

    public function updateGeneralStats(Request $request)
    {
        $validated = $request->validate([
            'area_size' => 'nullable|string|max:255',
            'founded_year' => 'nullable|integer|min:1000|max:' . (date('Y')),
            'village_status' => 'nullable|string|max:255',
            'population' => 'required|integer|min:0',
            'rt_count' => 'nullable|integer|min:0',
            'rw_count' => 'nullable|integer|min:0',
            'hamlet_count' => 'nullable|integer|min:0',
            'boundary_north' => 'nullable|string|max:255',
            'boundary_south' => 'nullable|string|max:255',
            'boundary_east' => 'nullable|string|max:255',
            'boundary_west' => 'nullable|string|max:255',
        ]);

        $info = VillageInfo::first();
        if (!$info) {
            // Create dummy if not exists, though usually seeded
            $info = VillageInfo::create(['name' => 'Desa Kalisabuk']);
        }

        $info->update($validated);

        return back()->with('success', 'Statistik umum berhasil diperbarui.');
    }

    public function create()
    {
        return Inertia::render('Admin/Demographics/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|integer|min:0',
            'type' => 'required|in:gender,job,education,religion',
        ]);

        Demographic::create($validated);

        return redirect()->route('demographics.index')->with('success', 'Data demografi berhasil ditambahkan.');
    }

    public function edit(Demographic $demographic)
    {
        return Inertia::render('Admin/Demographics/Edit', [
            'demographic' => $demographic,
        ]);
    }

    public function update(Request $request, Demographic $demographic)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|integer|min:0',
            'type' => 'required|in:gender,job,education,religion',
        ]);

        $demographic->update($validated);

        return redirect()->route('demographics.index')->with('success', 'Data demografi berhasil diperbarui.');
    }

    public function destroy(Demographic $demographic)
    {
        $demographic->delete();
        return redirect()->route('demographics.index')->with('success', 'Data demografi berhasil dihapus.');
    }

}

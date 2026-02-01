<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Demographic;
use App\Models\DemographicType;
use App\Models\VillageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DemographicController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Demographics/Index', [
            'villageInfo' => VillageInfo::first(),
            // Eager load demographics sorted by value desc
            'types' => DemographicType::with([
                'demographics' => function ($q) {
                    $q->orderBy('value', 'desc');
                }
            ])->get(),
        ]);
    }

    public function create()
    {
        return redirect()->route('demographics.index')->with('info', 'Silakan kelola data demografi melalui kategori di halaman ini.');
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
            $info = VillageInfo::create(['name' => 'Desa Kalisabuk']);
        }

        $info->update($validated);

        return back()->with('success', 'Statistik umum berhasil diperbarui.');
    }

    // --- Type / Category / Card Management ---

    public function storeType(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        DemographicType::create(['name' => $request->name]);
        return back()->with('success', 'Kategori baru berhasil dibuat.');
    }

    public function updateType(Request $request, DemographicType $type)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $type->update(['name' => $request->name]);
        return back()->with('success', 'Nama kategori berhasil diperbarui.');
    }

    public function destroyType(DemographicType $type)
    {
        $type->delete();
        return back()->with('success', 'Kategori dan datanya berhasil dihapus.');
    }

    // --- Item Data Management ---

    public function store(Request $request)
    {
        $validated = $request->validate([
            'demographic_type_id' => 'required|exists:demographic_types,id',
            'label' => 'required|string|max:255',
            'value' => 'required|integer|min:0',
        ]);

        Demographic::create($validated);
        return back()->with('success', 'Data berhasil ditambahkan.');
    }

    public function update(Request $request, Demographic $demographic)
    {
        $validated = $request->validate([
            'label' => 'sometimes|string|max:255',
            'value' => 'sometimes|integer|min:0',
        ]);

        $demographic->update($validated);
        return back()->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(Demographic $demographic)
    {
        $demographic->delete();
        return back()->with('success', 'Data berhasil dihapus.');
    }

}

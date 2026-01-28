<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageOfficial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VillageOfficialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $officials = VillageOfficial::ordered()->get();

        return Inertia::render('Admin/VillageOfficials/Index', [
            'officials' => $officials,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/VillageOfficials/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'nip' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'education' => 'nullable|string|max:255',
            'periode_start' => 'nullable|date',
            'periode_end' => 'nullable|date',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'is_head' => 'boolean',
            'welcome_message' => 'nullable|string',
        ]);

        // If this is set as head, unset other heads
        if ($request->is_head) {
            VillageOfficial::where('is_head', true)->update(['is_head' => false]);
        }

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('village-officials', 'public');
            $validated['photo'] = $path;
        }

        VillageOfficial::create($validated);

        return redirect()->route('village-officials.index')
            ->with('success', 'Data perangkat desa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(VillageOfficial $villageOfficial)
    {
        return Inertia::render('Admin/VillageOfficials/Show', [
            'official' => $villageOfficial,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VillageOfficial $villageOfficial)
    {
        return Inertia::render('Admin/VillageOfficials/Edit', [
            'official' => $villageOfficial,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VillageOfficial $villageOfficial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'nip' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'education' => 'nullable|string|max:255',
            'periode_start' => 'nullable|date',
            'periode_end' => 'nullable|date',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'is_head' => 'boolean',
            'welcome_message' => 'nullable|string',
        ]);

        // If this is set as head, unset other heads
        if ($request->is_head) {
            VillageOfficial::where('is_head', true)
                ->where('id', '!=', $villageOfficial->id)
                ->update(['is_head' => false]);
        }

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($villageOfficial->photo) {
                Storage::disk('public')->delete($villageOfficial->photo);
            }

            $path = $request->file('photo')->store('village-officials', 'public');
            $validated['photo'] = $path;
        }

        $villageOfficial->update($validated);

        return redirect()->route('village-officials.index')
            ->with('success', 'Data perangkat desa berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VillageOfficial $villageOfficial)
    {
        // Delete photo if exists
        if ($villageOfficial->photo) {
            Storage::disk('public')->delete($villageOfficial->photo);
        }

        $villageOfficial->delete();

        return redirect()->route('village-officials.index')
            ->with('success', 'Data perangkat desa berhasil dihapus.');
    }
}

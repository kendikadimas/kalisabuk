<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstitutionController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Institutions/Index', [
            'institutions' => Institution::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Institutions/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abbreviation' => 'nullable|string|max:50',
            'leader_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048', // 2MB Max
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('institutions', 'public');
        }

        Institution::create($validated);

        return redirect()->route('institutions.index')->with('success', 'Lembaga berhasil ditambahkan.');
    }

    public function edit(Institution $institution)
    {
        return Inertia::render('Admin/Institutions/Edit', [
            'institution' => $institution,
        ]);
    }

    public function update(Request $request, Institution $institution)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abbreviation' => 'nullable|string|max:50',
            'leader_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('institutions', 'public');
        }

        $institution->update($validated);

        return redirect()->route('institutions.index')->with('success', 'Lembaga berhasil diperbarui.');
    }

    public function destroy(Institution $institution)
    {
        $institution->delete();
        return redirect()->route('institutions.index')->with('success', 'Lembaga berhasil dihapus.');
    }

}

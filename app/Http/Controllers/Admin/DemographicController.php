<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Demographic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DemographicController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Demographics/Index', [
            'demographics' => Demographic::latest()->paginate(10),
        ]);
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

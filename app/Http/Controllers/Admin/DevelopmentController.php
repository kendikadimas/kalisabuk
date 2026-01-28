<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Development;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class DevelopmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Developments/Index', [
            'developments' => Development::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Developments/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string',
            'budget' => 'nullable|numeric',
            'year' => 'required|string',
            'description' => 'nullable|string',
            'contractor' => 'nullable|string',
            'status' => 'required|in:planned,progress,completed',
            'image_before' => 'required|image|max:10240',
            'image_after' => 'nullable|image|max:10240',
        ]);

        $data = $validated;
        $data['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);

        if ($request->hasFile('image_before')) {
            $data['image_before'] = $request->file('image_before')->store('developments', 'public');
        }

        if ($request->hasFile('image_after')) {
            $data['image_after'] = $request->file('image_after')->store('developments', 'public');
        }

        Development::create($data);

        return redirect()->route('developments.index')->with('success', 'Data pembangunan berhasil disimpan.');
    }

    public function edit(Development $development)
    {
        return Inertia::render('Admin/Developments/Edit', [
            'development' => $development,
        ]);
    }

    public function update(Request $request, Development $development)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string',
            'budget' => 'nullable|numeric',
            'year' => 'required|string',
            'description' => 'nullable|string',
            'contractor' => 'nullable|string',
            'status' => 'required|in:planned,progress,completed',
            'image_before' => 'nullable|image|max:10240',
            'image_after' => 'nullable|image|max:10240',
        ]);

        $data = $validated;

        if ($request->hasFile('image_before')) {
            if ($development->image_before)
                Storage::disk('public')->delete($development->image_before);
            $data['image_before'] = $request->file('image_before')->store('developments', 'public');
        } else {
            unset($data['image_before']);
        }

        if ($request->hasFile('image_after')) {
            if ($development->image_after)
                Storage::disk('public')->delete($development->image_after);
            $data['image_after'] = $request->file('image_after')->store('developments', 'public');
        } else {
            unset($data['image_after']);
        }

        $development->update($data);

        return redirect()->route('developments.index')->with('success', 'Data pembangunan berhasil diperbarui.');
    }

    public function destroy(Development $development)
    {
        if ($development->image_before)
            Storage::disk('public')->delete($development->image_before);
        if ($development->image_after)
            Storage::disk('public')->delete($development->image_after);
        $development->delete();
        return redirect()->route('developments.index')->with('success', 'Data dihapus.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FacilityItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FacilityItemController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_category_id' => 'required|exists:facility_categories,id',
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('facilities', 'public');
        }

        FacilityItem::create($validated);

        return back()->with('success', 'Item fasilitas berhasil ditambahkan.');
    }

    public function update(Request $request, FacilityItem $item)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $validated['image'] = $request->file('image')->store('facilities', 'public');
        }

        $item->update($validated);

        return back()->with('success', 'Item fasilitas berhasil diperbarui.');
    }

    public function destroy(FacilityItem $item)
    {
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return back()->with('success', 'Item fasilitas berhasil dihapus.');
    }
}

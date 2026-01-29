<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::ordered()->get();
        return Inertia::render('Admin/HeroSlides/Index', [
            'slides' => $slides
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/HeroSlides/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image_path' => 'required|image|max:10240', // Max 10MB
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('hero-slides', 'public');
            $validated['image_path'] = $path;
        }

        HeroSlide::create($validated);

        return redirect()->route('hero-slides.index')
            ->with('success', 'Slide berhasil ditambahkan.');
    }

    public function edit(HeroSlide $heroSlide)
    {
        return Inertia::render('Admin/HeroSlides/Edit', [
            'slide' => $heroSlide
        ]);
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $validated = $request->validate([
            'image_path' => 'nullable|image|max:10240', // Max 10MB
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image_path')) {
            // Delete old image
            if ($heroSlide->image_path) {
                Storage::disk('public')->delete($heroSlide->image_path);
            }
            $path = $request->file('image_path')->store('hero-slides', 'public');
            $validated['image_path'] = $path;
        } else {
            unset($validated['image_path']);
        }

        $heroSlide->update($validated);

        return redirect()->route('hero-slides.index')
            ->with('success', 'Slide berhasil diperbarui.');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        if ($heroSlide->image_path) {
            Storage::disk('public')->delete($heroSlide->image_path);
        }

        $heroSlide->delete();

        return redirect()->route('hero-slides.index')
            ->with('success', 'Slide berhasil dihapus.');
    }
}

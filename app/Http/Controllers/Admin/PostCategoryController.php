<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Posts/Categories', [
            'categories' => PostCategory::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        PostCategory::create($validated);

        return back()->with('success', 'Kategori berita berhasil ditambahkan');
    }

    public function update(Request $request, PostCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);

        return back()->with('success', 'Kategori berita berhasil diperbarui');
    }

    public function destroy(PostCategory $category)
    {
        // Check if has related posts
        if ($category->posts()->exists()) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih digunakan oleh berita.');
        }

        $category->delete();

        return back()->with('success', 'Kategori berita berhasil dihapus');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use Inertia\Inertia;
use App\Models\VillageInfo;
use App\Models\Post;
use App\Models\Potential;
use App\Models\Institution;
use App\Models\Demographic;
use App\Models\Budget;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('Public/Home', [
            'villageInfo' => VillageInfo::first(),
            'latestNews' => Post::where('category', 'news')->latest()->take(3)->get(),
            'featuredPotentials' => Potential::latest()->take(3)->get(),
            'stats' => [
                'population' => Demographic::where('type', 'gender')->sum('value'),
                // Area could be added to DB, hardcoded for now or derived
                'area' => '120 Ha',
            ]
        ]);
    }

    public function profile()
    {
        return Inertia::render('Public/Profile', [
            'villageInfo' => VillageInfo::first(),
            // Organization structure usually implies an image or hierarchy, listing institutions for now
            'institutions' => Institution::all(),
        ]);
    }

    public function potentials()
    {
        return Inertia::render('Public/Potentials', [
            'potentials' => Potential::all(),
        ]);
    }

    public function data()
    {
        return Inertia::render('Public/Data', [
            'demographics' => Demographic::all(),
            'budgets' => Budget::orderBy('year', 'desc')->get(),
        ]);
    }

    public function institutions()
    {
        return Inertia::render('Public/Institutions', [
            'institutions' => Institution::all(),
        ]);
    }

    public function news()
    {
        return Inertia::render('Public/News/Index', [
            'posts' => Post::latest()->paginate(9),
        ]);
    }

    public function newsShow($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return Inertia::render('Public/News/Show', [
            'post' => $post,
            'related' => Post::where('id', '!=', $post->id)->latest()->take(3)->get(),
        ]);
    }
}

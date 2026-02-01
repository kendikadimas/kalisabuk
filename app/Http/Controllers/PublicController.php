<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use Inertia\Inertia;
use App\Models\VillageInfo;
use App\Models\Post;
use App\Models\Potential;
use App\Models\Institution;
use App\Models\Demographic;
use App\Models\VillageOfficial;
use App\Models\VillageStat;
use App\Models\Announcement;
use App\Models\Development;
use App\Models\DemographicType;


class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('Public/Home', [
            'villageInfo' => VillageInfo::first(),
            'villageHead' => VillageOfficial::active()->head()->first(),
            'villageOfficials' => VillageOfficial::active()->where('position', '!=', 'Kepala Desa')->ordered()->get(),
            'latestNews' => Post::where('category', 'news')->latest()->take(3)->get(),
            'featuredPotentials' => Potential::latest()->take(3)->get(),
            'announcements' => Announcement::where('is_active', true)
                ->orderBy('event_date', 'asc')
                ->take(5)
                ->get(),
            'developments' => Development::latest()
                ->take(6)
                ->get(),
            'stats' => [
                'population' => VillageInfo::first()->population ?? 0,
                'area' => VillageInfo::first()->area_size ?? '120 Ha',
            ],
            'heroSlides' => \App\Models\HeroSlide::active()->ordered()->get(),
            'facilities' => \App\Models\FacilityCategory::with([
                'items' => function ($query) {
                    $query->where('is_active', true);
                }
            ])->where('is_active', true)->get(),
        ]);
    }

    public function profile()
    {
        return Inertia::render('Public/Profile', [
            'villageInfo' => VillageInfo::first(),
            // Organization structure usually implies an image or hierarchy, listing institutions for now
            'institutions' => Institution::all(),
            'facilities' => \App\Models\FacilityCategory::with([
                'items' => function ($query) {
                    $query->where('is_active', true);
                }
            ])->where('is_active', true)->get(),
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
            'demographicTypes' => DemographicType::with([
                'demographics' => function ($q) {
                    $q->orderBy('value', 'desc');
                }
            ])->get(),
            'villageStats' => VillageStat::active()->ordered()->get(),
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

        $post->increment('views');

        // Check if user has liked this post in current session
        $hasLiked = in_array($post->id, session()->get('liked_posts', []));

        return Inertia::render('Public/News/Show', [
            'post' => $post,
            'related' => Post::where('id', '!=', $post->id)->latest()->take(3)->get(),
            'hasLiked' => $hasLiked,
        ]);
    }

    public function likePost($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();

        $likedPosts = session()->get('liked_posts', []);

        if (!in_array($post->id, $likedPosts)) {
            $post->increment('likes');
            session()->push('liked_posts', $post->id);
        }

        return back();
    }
}

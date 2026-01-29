<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\PublicController;
use App\Http\Controllers\Public\DevelopmentController as PublicDevelopmentController;
use App\Http\Controllers\Public\ServiceController as PublicServiceController;

Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/profile', [PublicController::class, 'profile'])->name('profile');
Route::get('/potentials', [PublicController::class, 'potentials'])->name('potentials');
Route::get('/data', [PublicController::class, 'data'])->name('data');
Route::get('/institutions', [PublicController::class, 'institutions'])->name('institutions');
Route::get('/news', [PublicController::class, 'news'])->name('news.index');
Route::get('/news/{slug}', [PublicController::class, 'newsShow'])->name('news.show');
Route::post('/news/{slug}/like', [PublicController::class, 'likePost'])->name('news.like');

Route::get('/pembangunan', [PublicDevelopmentController::class, 'index'])->name('public.developments.index');
Route::get('/pembangunan/{slug}', [PublicDevelopmentController::class, 'show'])->name('public.developments.show');

Route::get('/layanan', [PublicServiceController::class, 'index'])->name('public.services.index');
Route::post('/layanan', [PublicServiceController::class, 'store'])->name('public.services.store');
Route::get('/layanan/sukses/{ticket_code}', [PublicServiceController::class, 'success'])->name('public.services.success');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'stats' => [
                'posts' => \App\Models\Post::count(),
                'potentials' => \App\Models\Potential::count(),
                'users' => \App\Models\User::count(),
                'demographics' => \App\Models\Demographic::where('type', 'gender')->sum('value'),
            ],
            'latest_posts' => \App\Models\Post::latest()->take(3)->get(),
            'demographics_data' => \App\Models\Demographic::where('type', 'gender')->get(),
        ]);
    })->name('dashboard');

    Route::prefix('dashboard')->group(function () {
        Route::resource('posts', \App\Http\Controllers\Admin\PostController::class);
        Route::resource('post-categories', \App\Http\Controllers\Admin\PostCategoryController::class);
        Route::resource('potentials', \App\Http\Controllers\Admin\PotentialController::class);
        Route::resource('potential-categories', \App\Http\Controllers\Admin\PotentialCategoryController::class);
        Route::resource('institutions', \App\Http\Controllers\Admin\InstitutionController::class);
        Route::resource('demographics', \App\Http\Controllers\Admin\DemographicController::class);
        Route::resource('developments', \App\Http\Controllers\Admin\DevelopmentController::class);
        Route::resource('services', \App\Http\Controllers\Admin\ServiceTypeController::class); // Managing types
        Route::resource('service-requests', \App\Http\Controllers\Admin\ServiceRequestController::class);
        Route::resource('village-officials', \App\Http\Controllers\Admin\VillageOfficialController::class);
        Route::resource('village-stats', \App\Http\Controllers\Admin\VillageStatController::class);
        Route::resource('hero-slides', \App\Http\Controllers\Admin\HeroSlideController::class);
        Route::resource('announcements', \App\Http\Controllers\Admin\AnnouncementController::class);
        Route::resource('facilities', \App\Http\Controllers\Admin\FacilityCategoryController::class);
        Route::resource('facility-items', \App\Http\Controllers\Admin\FacilityItemController::class)->only(['store', 'update', 'destroy']);
        Route::post('stats/general', [\App\Http\Controllers\Admin\DemographicController::class, 'updateGeneralStats'])->name('stats.general.update');

        // User Management
        Route::get('users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
        Route::post('users/{user}/role', [\App\Http\Controllers\Admin\UserController::class, 'updateRole'])->name('users.role');
        Route::delete('users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('users.destroy');
    });
});

require __DIR__ . '/settings.php';

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\PublicController;

Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/profile', [PublicController::class, 'profile'])->name('profile');
Route::get('/potentials', [PublicController::class, 'potentials'])->name('potentials');
Route::get('/data', [PublicController::class, 'data'])->name('data');
Route::get('/institutions', [PublicController::class, 'institutions'])->name('institutions');
Route::get('/news', [PublicController::class, 'news'])->name('news.index');
Route::get('/news/{slug}', [PublicController::class, 'newsShow'])->name('news.show');

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
        Route::resource('potentials', \App\Http\Controllers\Admin\PotentialController::class);
        Route::resource('institutions', \App\Http\Controllers\Admin\InstitutionController::class);
        Route::resource('demographics', \App\Http\Controllers\Admin\DemographicController::class);
        Route::post('stats/general', [\App\Http\Controllers\Admin\DemographicController::class, 'updateGeneralStats'])->name('stats.general.update');
    });
});

require __DIR__ . '/settings.php';

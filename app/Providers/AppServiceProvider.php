<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \App\Models\Post::observe(\App\Observers\ActivityObserver::class);
        \App\Models\Potential::observe(\App\Observers\ActivityObserver::class);
        \App\Models\Announcement::observe(\App\Observers\ActivityObserver::class);
        \App\Models\Development::observe(\App\Observers\ActivityObserver::class);
        \App\Models\User::observe(\App\Observers\ActivityObserver::class);
        \App\Models\Demographic::observe(\App\Observers\ActivityObserver::class);
        \App\Models\VillageOfficial::observe(\App\Observers\ActivityObserver::class);
        \App\Models\Institution::observe(\App\Observers\ActivityObserver::class);
        \App\Models\VillageStat::observe(\App\Observers\ActivityObserver::class);
    }
}

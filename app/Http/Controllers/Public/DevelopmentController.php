<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Development;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DevelopmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Development::query();

        if ($request->has('year') && $request->year != 'all') {
            $query->where('year', $request->year);
        }

        if ($request->has('status') && $request->status != 'all') {
            $query->where('status', $request->status);
        }

        return Inertia::render('Public/Developments/Index', [
            'developments' => $query->latest()->paginate(9),
            'filters' => $request->only(['year', 'status']),
            'years' => Development::select('year')->distinct()->orderBy('year', 'desc')->pluck('year'),
        ]);
    }

    public function show($slug)
    {
        $development = Development::where('slug', $slug)->firstOrFail();
        return Inertia::render('Public/Developments/Show', [
            'development' => $development,
        ]);
    }
}

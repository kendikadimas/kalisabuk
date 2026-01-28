<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceTypeController extends Controller
{
    public function index()
    {
        // Using 'services.index' route name for resource 'services'
        return Inertia::render('Admin/Services/Types/Index', [
            'serviceTypes' => ServiceType::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Services/Types/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'requirements' => 'nullable|array',
            'requirements.*' => 'string',
            'processing_time' => 'nullable|string|max:255',
            'fee' => 'nullable|string|max:255',
        ]);

        ServiceType::create($validated);
        return redirect()->route('services.index')->with('success', 'Jenis layanan berhasil dibuat.');
    }

    public function edit(ServiceType $service)
    {
        return Inertia::render('Admin/Services/Types/Edit', [
            'serviceType' => $service,
        ]);
    }

    public function update(Request $request, ServiceType $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'requirements' => 'nullable|array',
            'requirements.*' => 'string',
            'processing_time' => 'nullable|string|max:255',
            'fee' => 'nullable|string|max:255',
        ]);

        $service->update($validated);
        return redirect()->route('services.index')->with('success', 'Jenis layanan berhasil diperbarui.');
    }

    public function destroy(ServiceType $service)
    {
        $service->delete();
        return redirect()->route('services.index')->with('success', 'Jenis layanan dihapus.');
    }
}

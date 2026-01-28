<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = ServiceRequest::with('serviceType')->latest();

        if ($request->search) {
            $query->where('ticket_code', 'like', "%{$request->search}%")
                ->orWhere('citizen_nik', 'like', "%{$request->search}%")
                ->orWhere('citizen_name', 'like', "%{$request->search}%");
        }

        return Inertia::render('Admin/Services/Requests/Index', [
            'requests' => $query->paginate(10),
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(ServiceRequest $service_request)
    {
        return $this->edit($service_request);
    }

    public function edit(ServiceRequest $service_request)
    {
        $service_request->load('serviceType');
        return Inertia::render('Admin/Services/Requests/Edit', [
            'serviceRequest' => $service_request,
        ]);
    }

    public function update(Request $request, ServiceRequest $service_request)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processed,completed,rejected',
        ]);

        $service_request->update($validated);

        return redirect()->route('service-requests.index')->with('success', 'Status permohonan diperbarui.');
    }

    public function destroy(ServiceRequest $service_request)
    {
        $service_request->delete();
        return redirect()->route('service-requests.index')->with('success', 'Permohonan dihapus.');
    }
}

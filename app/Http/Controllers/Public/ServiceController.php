<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ServiceType;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Services/Index', [
            'serviceTypes' => ServiceType::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_type_id' => 'required|exists:service_types,id',
            'citizen_nik' => 'required|string|size:16',
            'citizen_name' => 'required|string',
            'citizen_phone' => 'nullable|string',
            'details' => 'required|string',
        ]);

        $ticketCode = 'SR-' . date('Ymd') . '-' . strtoupper(Str::random(3));

        while (ServiceRequest::where('ticket_code', $ticketCode)->exists()) {
            $ticketCode = 'SR-' . date('Ymd') . '-' . strtoupper(Str::random(3));
        }

        $serviceRequest = ServiceRequest::create([
            'ticket_code' => $ticketCode,
            'service_type_id' => $validated['service_type_id'],
            'citizen_nik' => $validated['citizen_nik'],
            'citizen_name' => $validated['citizen_name'],
            'citizen_phone' => $validated['citizen_phone'],
            'details' => $validated['details'],
            'status' => 'pending',
        ]);

        return redirect()->route('public.services.success', $serviceRequest->ticket_code);
    }

    public function success($ticket_code)
    {
        $request = ServiceRequest::with('serviceType')->where('ticket_code', $ticket_code)->firstOrFail();
        return Inertia::render('Public/Services/Success', [
            'serviceRequest' => $request,
        ]);
    }
}

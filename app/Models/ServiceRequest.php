<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_code',
        'service_type_id',
        'citizen_nik',
        'citizen_name',
        'citizen_phone',
        'details',
        'status'
    ];

    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class);
    }
}

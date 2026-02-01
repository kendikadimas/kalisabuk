<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Demographic extends Model
{
    protected $fillable = [
        'demographic_type_id',
        'label',
        'value',
    ];

    public function type()
    {
        return $this->belongsTo(DemographicType::class, 'demographic_type_id');
    }
}
